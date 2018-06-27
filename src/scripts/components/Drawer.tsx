import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IGridExternalProps, gridConfig } from './Grid';
import BodyScroll from '../util/BodyScroll';
import { waitAnimation } from '../util/PromiseUtil';
import Portal from '../util/Portal';

export interface IDrawerProps extends IGridExternalProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    background?: boolean;
}

export interface IDrawerState {
    open?: boolean;
}

export default class Drawer extends React.Component<IDrawerProps, IDrawerState> {
    element: HTMLDivElement;

    constructor(props: IDrawerProps) {
        super(props);
        this.state = {
            open: props.open
        };
        this.element = document.createElement('div');
    }

    preventClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    close = (event: React.MouseEvent<HTMLDivElement>) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    async componentWillReceiveProps(nextProps?: IDrawerProps) {
        if (this.props.open != nextProps.open) {
            if (nextProps.open) {
                BodyScroll.lock();
                let modalRoot = Portal.getElement('modal-root');
                modalRoot.appendChild(this.element);
                await waitAnimation();
                this.setState({
                    open: nextProps.open
                });
            } else {
                BodyScroll.unlock();
                this.setState({
                    open: nextProps.open
                });
            }
        }
    }

    componentDidMount() {
        let modalRoot = Portal.getElement('modal-root');
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        // If we were locked, unlock
        if (this.state.open) {
            BodyScroll.unlock();
        }
        let modalRoot = Portal.getElement('modal-root');
        modalRoot.removeChild(this.element);
    }

    render() {
        let {
            className,
            id,
            direction,
            full,
            onClose,
            background
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (this.state.open) {
            classNames.push('drawer-open');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        let innerClassNames = ['drawer-content'];
        if (this.props.grid) {
            gridConfig(innerClassNames, this.props);
        }

        return ReactDOM.createPortal((
            <div className={classNames.join(' ')} id={id} onClick={this.close}>
                <div className={innerClassNames.join(' ')} onClick={this.preventClick}>
                    {this.props.children}
                </div>
            </div>
        ), this.element);
    }
}
