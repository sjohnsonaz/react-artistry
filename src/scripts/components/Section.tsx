import * as React from 'react';

import Button from './Button';

export interface ISectionProps extends React.HTMLProps<HTMLElement> {
    header: any;
    footer?: any;
    lockable?: boolean;
    locked?: boolean;
    closeable?: boolean;
    closed?: boolean;
    space?: boolean;
    relative?: boolean;
    onClose?: (closed: boolean) => void;
}

export interface ISectionState {
    closed: boolean;
}

export default class Section extends React.Component<ISectionProps, ISectionState> {
    root: React.RefObject<HTMLElement> = React.createRef();
    innerDiv: React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props?: ISectionProps) {
        super(props);
        this.state = {
            closed: false
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

    componentDidUpdate(prevProps: ISectionProps, prevState: any) {
        let innerDiv = this.innerDiv.current;
        let node = this.root.current;
        // Get closed value
        let closed = typeof this.props.closed !== 'undefined' ?
            this.props.closed :
            (this.state.closed || false);

        // Clear toggleTimeout
        let toggleTimeout: number = (node as any).toggleTimeout;
        if (typeof toggleTimeout === 'number') {
            window.clearTimeout(toggleTimeout);
            (node as any).toggleTimeout = undefined;
        }

        let header = node.childNodes[0] as HTMLElement;
        let content = node.childNodes[1] as HTMLElement;
        node.classList.add('section-run');
        if (closed) {
            node.style.height = node.offsetHeight + 'px';
            node.style.height = header.offsetHeight + 'px';
            node.classList.add('section-closed');
            (node as any).toggleTimeout = window.setTimeout(function () {
                node.style.height = 'auto';
                node.classList.remove('section-run');
            }, 220);
        } else {
            var sectionBorder = node.offsetHeight - node.clientHeight;
            node.style.height = sectionBorder / 2 + header.offsetHeight + content.offsetHeight + 'px';
            node.classList.remove('section-closed');
            node.style.height = sectionBorder / 2 + header.offsetHeight + content.offsetHeight + 'px';
            (node as any).toggleTimeout = window.setTimeout(function () {
                node.style.height = 'auto';
                node.classList.remove('section-run');
            }, 220);
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
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('section');

        /*
        if (this.props.closed) {
            classNames.push('section-closed');
        }
        */
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

        return (
            <section className={classNames.join(' ')} id={id} {...props} ref={this.root}>
                <header>
                    {header}
                    {closeable ?
                        <Button className="section-toggle" onClick={this.close}>-</Button>
                        : undefined}
                </header>
                <div className={innerClassNames.join(' ')} ref={this.innerDiv}>{this.props.children}</div>
                {footer ?
                    <footer>{footer}</footer> :
                    null}
            </section>
        );
    }
}
