import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ITemplate } from './ITemplate';
import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';
import BodyScroll from '../util/BodyScroll';
import { waitAnimation } from '../util/PromiseUtil';
import Portal from '../util/Portal';
import DepthStack from '../util/DepthStack';

export type ModalSize = 'none' | 'all' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IModalProps extends IGridExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onclose: (event: React.MouseEvent<HTMLElement>) => void;
    closeable?: boolean;
    closeButton?: any;
    title?: any;
    header?: any;
    footer?: any;
    animation?: 'center' | 'top' | 'right' | 'bottom' | 'left';
    lockable?: boolean;
    locked?: boolean;
    space?: boolean;
    background?: boolean;
    size?: ModalSize | ModalSize[];
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
            background,
            size,
            closeable,
            closeButton,
            title,
            header,
            footer
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

        if (size) {
            let sizes = (size instanceof Array) ? size : [size];

            sizes.forEach(size => {
                switch (size) {
                    case 'all':
                        classNames.push('modal-all');
                        break;
                    case 'small':
                        classNames.push('modal-sm');
                        break;
                    case 'medium':
                        classNames.push('modal-md');
                        break;
                    case 'large':
                        classNames.push('modal-lg');
                        break;
                    case 'x-large':
                        classNames.push('modal-xl');
                        break;
                }
            });
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
                modalContentClassNames.push('modal-space');
            } else {
                modalContentClassNames.push('modal-space');
            }
        }

        if (this.props.grid) {
            gridConfig(modalContentClassNames, this.props);
        }

        let modalContentClassName = modalContentClassNames.join(' ');

        let headerSection;
        if (title || header || closeable) {
            headerSection = (
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    {closeable ?
                        <div className="modal-action">
                            <Button onClick={this.props.onclose}>{closeButton || 'Close'}</Button>
                        </div> :
                        null}
                    <div>
                        {header}
                    </div>
                </div>
            );
        }

        return ReactDOM.createPortal((
            <div className={classNames.join(' ')} id={this.props.id} onTransitionEnd={this.transitionEnd}>
                <div className="modal-background">
                    {headerSection || footer ?
                        <div className="modal-content" onClick={this.preventClick}>
                            {headerSection}
                            <div className={'modal-body ' + modalContentClassName}>
                                {this.props.children}
                            </div>
                            {footer ?
                                <div className="modal-footer">
                                    {footer}
                                </div>
                                : undefined}
                        </div> :
                        <div className={'modal-content ' + modalContentClassName} onClick={this.preventClick}>
                            {this.props.children}
                        </div>
                    }
                </div>
            </div>
        ), this.element);
    }
}