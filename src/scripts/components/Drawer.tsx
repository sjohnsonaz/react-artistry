import * as React from 'react';

import { IGridExternalProps, gridConfig } from './Grid';
import BodyScroll from '../util/BodyScroll';

export interface IDrawerProps extends IGridExternalProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    lockScroll?: boolean;
    background?: boolean;
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
            lockScroll,
            background
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (open) {
            classNames.push('drawer-open');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        if (lockScroll) {
            BodyScroll.lock(open);
        }

        let innerClassNames = ['drawer-content'];
        if (this.props.grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <div className={classNames.join(' ')} id={id} onClick={this.close}>
                <div className={innerClassNames.join(' ')} onClick={this.preventClick}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
