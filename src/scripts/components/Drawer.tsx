import * as React from 'react';

import Draggable from './Draggable';
import BodyScroll from '../util/BodyScroll';

export interface IDrawerProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    lockScroll?: boolean;
}

export default class Drawer extends React.Component<IDrawerProps, any> {
    preventClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    close = (event: React.MouseEvent<HTMLDivElement>) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    render() {
        let {
            className,
            id,
            direction,
            open,
            full,
            onClose,
            lockScroll
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (open) {
            classNames.push('drawer-open');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        if (lockScroll) {
            BodyScroll.lock(open);
        }

        return (
            <div className={classNames.join(' ')} id={id} onClick={this.close}>
                <div className="drawer-content" onClick={this.preventClick}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
