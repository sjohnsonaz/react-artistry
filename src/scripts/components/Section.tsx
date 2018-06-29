import * as React from 'react';

import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import { setState } from '../util/PromiseUtil';

export interface ISectionProps extends React.HTMLProps<HTMLElement>, IGridExternalProps {
    header: any;
    footer?: any;
    lockable?: boolean;
    locked?: boolean;
    closeable?: boolean;
    closed?: boolean;
    space?: boolean;
    relative?: boolean;
    grid?: boolean;
    onClose?: (closed: boolean) => void;
}

export interface ISectionState {
    closed?: boolean;
    running?: boolean;
    animating?: boolean;
    height?: string;
    runCount?: number;
}

export default class Section extends React.Component<ISectionProps, ISectionState> {
    root: React.RefObject<HTMLElement> = React.createRef();
    header: React.RefObject<HTMLElement> = React.createRef();
    content: React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props?: ISectionProps) {
        super(props);
        this.state = {
            closed: props.closed,
            running: false,
            animating: false,
            height: undefined,
            runCount: 0
        };
    }

    close = () => {
        if (this.props.onClose) {
            // Get closed value
            let closed = typeof this.props.closed !== 'undefined' ?
                this.props.closed :
                (this.state.closed || false);
            this.props.onClose(closed);
        } else {
            this.setState({ closed: !this.state.closed });
        }
    }

    transitionEnd = async (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName === 'height') {
            let animating = this.state.animating;
            if (!animating) {
                if (this.state.closed) {
                    await setState({
                        running: false
                    }, this);
                } else {
                    await setState({
                        height: undefined,
                        running: false
                    }, this);
                }
            }
        }
    }

    async componentWillReceiveProps(nextProps: ISectionProps) {
        if (this.props.closed !== nextProps.closed) {
            let node = this.root.current;
            let header = this.header.current;
            let content = this.content.current;

            let runCount = this.state.runCount;

            await setState({
                running: true,
                animating: true,
            }, this);
            if (runCount !== this.state.runCount) {
                return;
            }

            if (nextProps.closed) {
                await setState({
                    height: node.offsetHeight + 'px'
                }, this);
                if (runCount !== this.state.runCount) {
                    return;
                }

                await setState({
                    height: header.offsetHeight + 'px',
                    closed: true,
                }, this);
                if (runCount !== this.state.runCount) {
                    return;
                }

                await setState({
                    animating: false
                }, this);
            } else {
                let border = node.offsetHeight - node.clientHeight;
                await setState({
                    height: border / 2 + header.offsetHeight + content.offsetHeight + 'px'
                }, this);
                if (runCount !== this.state.runCount) {
                    return;
                }

                await setState({
                    closed: false
                }, this);
                if (runCount !== this.state.runCount) {
                    return;
                }

                await setState({
                    height: border / 2 + header.offsetHeight + content.offsetHeight + 'px'
                }, this);
                if (runCount !== this.state.runCount) {
                    return;
                }

                await setState({
                    animating: false
                }, this);
            }
        }
    }

    render() {
        let {
            id,
            className,
            header,
            footer,
            closeable,
            closed,
            lockable,
            locked,
            space,
            relative,
            grid,
            gridColumns,
            gridSize,
            gridSpace,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('section');

        if (this.state.closed) {
            classNames.push('section-closed');
        }

        if (this.state.running) {
            classNames.push('section-run');
        }

        let innerClassNames = ['section-content'];
        if (lockable) {
            innerClassNames.push('lock-contents');
        }

        if (locked) {
            innerClassNames.push('locked');
        }

        if (space) {
            innerClassNames.push('section-content-space');
        }

        if (relative) {
            innerClassNames.push('section-content-relative');
        }

        if (grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <section
                className={classNames.join(' ')}
                id={id}
                {...props}
                style={{ height: this.state.height }}
                ref={this.root}
            >
                <header ref={this.header}>
                    {header}
                    {closeable ?
                        <Button className="section-toggle" onClick={this.close}>-</Button>
                        : undefined}
                </header>
                <div className={innerClassNames.join(' ')} ref={this.content}>{this.props.children}</div>
                {footer ?
                    <footer>{footer}</footer> :
                    null}
            </section>
        );
    }
}
