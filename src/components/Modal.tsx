import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from './Button';
import { IGridExternalProps, gridConfig } from '../abstract/grid/Grid';
import { IScrollableExternalProps } from './Scrollable';
import BodyScroll from '../util/BodyScroll';
import { waitAnimation } from '../util/PromiseUtil';
import Portal from '../util/Portal';
import DepthStack from '../util/DepthStack';
import ClassNames from 'util/ClassNames';

export type ModalSize = 'none' | 'all' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IModalProps extends IGridExternalProps, IScrollableExternalProps {
    className?: string;
    id?: string;
    open: boolean;
    onClose?: (event: React.MouseEvent<HTMLElement>) => void;
    onConfirm?: (event: React.MouseEvent<HTMLElement>) => void;
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
    screenSize?: ModalSize | ModalSize[];
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
            BodyScroll.lock(true);
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
        if (this.props.onClose) {
            return this.props.onClose(event);
        } else {
            return false;
        }
    }

    confirm = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.onConfirm) {
            return this.props.onConfirm(event);
        } else {
            return false;
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

    onScroll = (event: React.UIEvent<HTMLElement>) => {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }

    async componentDidUpdate(prevProps?: IModalProps) {
        if (this.props.open != prevProps.open) {
            if (this.props.open) {
                DepthStack.blur();
                let runCount = this.runCount;
                await this.setState({
                    remove: false
                });
                if (runCount !== this.runCount) {
                    return;
                }
                this.updateModalRoot();
                BodyScroll.lock(true);
                // Wait for two animation frames
                await waitAnimation();
                await waitAnimation();
                this.setState({
                    open: this.props.open
                });
                DepthStack.push(this.close, this.confirm);
            } else {
                BodyScroll.unlock();
                this.setState({
                    open: this.props.open
                });
                DepthStack.remove(this.close);
            }
        }
    }

    updateModalRoot() {
        let modalRoot = Portal.getElement('layer-overlay');

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
        let modalRoot = Portal.getElement('layer-overlay');
        if (modalRoot.contains(this.element)) {
            modalRoot.removeChild(this.element);
        }
    }

    render() {
        let {
            animation,
            background,
            screenSize,
            closeable,
            closeButton,
            title,
            header,
            footer
        } = this.props;

        let classNames = new ClassNames('modal', this.props.className);
        if (this.state.open) {
            classNames.add('modal-open');
        }

        if (background) {
            classNames.add('modal-background');
        }

        if (animation) {
            classNames.add('modal-animate-' + animation.trim());
        }

        if (screenSize) {
            let sizes = (screenSize instanceof Array) ? screenSize : [screenSize];

            sizes.forEach(size => {
                switch (size) {
                    case 'all':
                        classNames.add('modal-all');
                        break;
                    case 'x-small':
                        classNames.add('modal-xs');
                        break;
                    case 'small':
                        classNames.add('modal-sm');
                        break;
                    case 'medium':
                        classNames.add('modal-md');
                        break;
                    case 'large':
                        classNames.add('modal-lg');
                        break;
                    case 'x-large':
                        classNames.add('modal-xl');
                        break;
                }
            });
        }

        let modalContentClassNames = new ClassNames();
        if (this.props.lockable) {
            modalContentClassNames.add('lock-contents');
            if (this.props.locked) {
                modalContentClassNames.add('locked');
            }
        }
        if (this.props.space) {
            if (title || footer) {
                modalContentClassNames.add('modal-space');
            } else {
                modalContentClassNames.add('modal-space');
            }
        }

        if (this.props.grid) {
            gridConfig(modalContentClassNames, this.props);
        }

        let headerSection;
        if (title || header || closeable) {
            headerSection = (
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    {closeable ?
                        <div className="action-bar">
                            <Button
                                onClick={this.props.onClose}
                                displaySize="small"
                            >
                                {closeButton || 'Close'}
                            </Button>
                        </div> :
                        null}
                    <div>
                        {header}
                    </div>
                </div>
            );
        }

        return ReactDOM.createPortal((
            <div
                className={classNames.toString()}
                id={this.props.id}
                onTransitionEnd={this.transitionEnd}
                onScroll={this.onScroll}
            >
                <div className="modal-background">
                    {headerSection || footer ?
                        <div className="modal-content" onClick={this.preventClick}>
                            {headerSection}
                            <div
                                className={'modal-body ' + modalContentClassNames.toString()}
                                onScroll={this.onScroll}
                            >
                                {this.props.children}
                            </div>
                            {footer ?
                                <div className="modal-footer">
                                    {footer}
                                </div>
                                : undefined}
                        </div> :
                        <div className={'modal-content ' + modalContentClassNames.toString()} onClick={this.preventClick}>
                            {this.props.children}
                        </div>
                    }
                </div>
            </div>
        ), this.element);
    }
}