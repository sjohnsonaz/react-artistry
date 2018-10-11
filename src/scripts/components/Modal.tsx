import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ITemplate } from './ITemplate';
import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import BodyScroll from '../util/BodyScroll';
import { waitAnimation } from '../util/PromiseUtil';
import Portal from '../util/Portal';
import DepthStack from '../util/DepthStack';

export interface IModalProps extends IGridExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onclose: (event: React.MouseEvent<HTMLElement>) => void;
    title?: ITemplate;
    footer?: ITemplate;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
    lockable?: boolean;
    locked?: boolean;
    space?: boolean;
    background?: boolean;
}

export interface IModalState {
    open?: boolean;
    remove?: boolean;
}

export default class Modal extends React.Component<IModalProps, IModalState> {
    element: HTMLDivElement;
    runCount: number = 0;

    constructor(props: IModalProps) {
        super(props);
        this.state = {
            open: props.open,
            remove: !props.open
        };
        this.element = document.createElement('div');
        if (props.open) {
            BodyScroll.lock();
            DepthStack.push(this.close);
        }
    }

    preventClick(event: React.MouseEvent<HTMLElement>) {
        // This will let us close Modals inside Modals.
        let target = event.target as HTMLElement;
        if (!target.classList || !(target.classList.contains('modal') || target.classList.contains('drawer'))) {
            event.stopPropagation();
        }
    }

    close = (event: React.MouseEvent<HTMLElement>) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onclose) {
            this.props.onclose(event);
        }
    }

    transitionEnd = async (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName === 'transform') {
            if (!this.props.open) {
                await this.setState({
                    remove: true
                });
                this.updateModalRoot();
            }
        }
    }

    async componentWillReceiveProps(nextProps?: IModalProps) {
        if (this.props.open != nextProps.open) {
            if (nextProps.open) {
                let runCount = this.runCount;
                await this.setState({
                    remove: false
                });
                if (runCount !== this.runCount) {
                    return;
                }
                this.updateModalRoot();
                BodyScroll.lock();
                await waitAnimation();
                this.setState({
                    open: nextProps.open
                });
                DepthStack.push(this.close);
            } else {
                BodyScroll.unlock();
                this.setState({
                    open: nextProps.open
                });
                DepthStack.remove(this.close);
            }
        }
    }

    updateModalRoot() {
        let modalRoot = Portal.getElement('modal-root');

        if (!modalRoot.contains(this.element)) {
            if (!this.state.remove) {
                modalRoot.appendChild(this.element);
            }
        } else {
            if (this.state.remove) {
                modalRoot.removeChild(this.element);
            }
        }
    }

    componentWillUnmount() {
        // If we were locked, unlock
        if (this.state.open) {
            BodyScroll.unlock();
            DepthStack.remove(this.close);
        }
        let modalRoot = Portal.getElement('modal-root');
        if (modalRoot.contains(this.element)) {
            modalRoot.removeChild(this.element);
        }
    }

    render() {
        let {
            animation,
            background
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('modal');
        if (this.state.open) {
            classNames.push('modal-open');
        }

        if (background) {
            classNames.push('modal-background');
        }

        if (animation) {
            classNames.push('modal-animate-' + animation.trim());
        }

        if (this.props.title) {
            var title;
            if (typeof this.props.title === 'function') {
                title = this.props.title();
            } else {
                title = this.props.title;
            }
        }

        if (this.props.footer) {
            var footer;
            if (typeof this.props.footer === 'function') {
                footer = this.props.footer();
            } else {
                footer = this.props.footer;
            }
        }

        let modalContentClassNames = [];
        if (this.props.lockable) {
            modalContentClassNames.push('lock-contents');
            if (this.props.locked) {
                modalContentClassNames.push('locked');
            }
        }
        if (this.props.space) {
            if (title || footer) {
                modalContentClassNames.push('modal-body-space');
            } else {
                modalContentClassNames.push('modal-content-space');
            }
        }

        if (this.props.grid) {
            gridConfig(modalContentClassNames, this.props);
        }

        let modalContentClassName = modalContentClassNames.join(' ');

        return ReactDOM.createPortal((
            <div className={classNames.join(' ')} id={this.props.id} onTransitionEnd={this.transitionEnd}>
                {title || footer ?
                    <div className="modal-content" onClick={this.preventClick}>
                        {title ?
                            <div className="modal-header">
                                <h1 className="modal-title">{title}</h1>
                                <div className="modal-controls">
                                    <Button onClick={this.props.onclose}>Close</Button>
                                </div>
                            </div>
                            : undefined}
                        <div className={'modal-body ' + modalContentClassName}>{this.props.children}</div>
                        {footer ?
                            <div className="modal-footer">{footer}</div>
                            : undefined}
                    </div> :
                    <div className={'modal-content ' + modalContentClassName} onClick={this.preventClick}>
                        {this.props.children}
                    </div>
                }
            </div>
        ), this.element);
    }
}
