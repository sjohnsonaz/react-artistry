import * as React from 'react';

import { ITemplate } from './ITemplate';
import Popover from './Popover';

export interface IUserThumbnailProps {
    className?: string;
    id?: string;
    src?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
    placeholder?: string;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverOpen?: boolean;
    popoverMenu?: boolean;
    menuBarTop?: boolean;
    onPopoverClose?: (event: React.MouseEvent<HTMLElement>) => boolean | void;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => boolean | void;
}

export default class UserThumbnail extends React.Component<IUserThumbnailProps, any> {
    onPopoverClose(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        if (this.props.onPopoverClose) {
            this.props.onPopoverClose(event);
        }
    }
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('thumbnail');

        switch (this.props.size) {
            case 'small':
                classNames.push('thumbnail-user-small');
                break;
            case 'large':
                classNames.push('thumbnail-user-large');
                break;
            default:
                //case 'medium':
                classNames.push('thumbnail-user-medium');
                break;
        }

        let thumbnail = this.props.src ?
            (
                <img className={classNames.join(' ')} src={this.props.src} />
            ) : (
                <span className={classNames.join(' ')}>{this.props.placeholder}</span>
            );

        if (this.props.popover) {
            let popover = (
                <Popover
                    align={this.props.popoverAlign}
                    direction={this.props.popoverDirection}
                    open={!this.props.popoverMenu ? this.props.popoverOpen : undefined}
                >
                    {typeof this.props.popover === 'function' ?
                        this.props.popover() :
                        this.props.popover
                    }
                </Popover>
            );
            if (this.props.popoverMenu) {
                let triggerClassNames = ['popover-trigger']
                if (this.props.popoverOpen) {
                    triggerClassNames.push('popover-open');
                } else {
                    triggerClassNames.push('popover-closed');
                }
                if (this.props.menuBarTop) {
                    triggerClassNames.push('popover-menu-bar-top');
                }
                let popOverMask = (
                    <div className="popover-mask" onClick={this.onPopoverClose.bind(this)}></div>
                );
                return (
                    <a href="#" className={triggerClassNames.join(' ')} id={this.props.id}
                        onClick={this.props.onClick}
                    >
                        {thumbnail}
                        {popOverMask}
                        {popover}
                    </a>
                )
            } else {
                return (
                    <span className="popover-trigger" id={this.props.id}
                        onClick={this.props.onClick} >
                        {thumbnail}
                        {popover}
                    </span>
                )
            }
        } else {
            (thumbnail.props as any).id = this.props.id;
            return thumbnail;
        }
    }
}