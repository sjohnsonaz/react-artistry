import * as React from 'react';

import Closeable from './Closeable';
import { IGridExternalProps, gridConfig } from './Grid';

export interface ICardProps extends IGridExternalProps {
    id?: string;
    className?: string;
    header?: any;
    footer?: any;
    space?: boolean;
    fill?: boolean;
    nav?: any;
    navAlign?: 'start' | 'end';
    clickable?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
}

export default class Card extends React.Component<ICardProps, any> {
    onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        let {
            id,
            className,
            header,
            footer,
            space,
            fill,
            nav,
            navAlign,
            grid,
            clickable
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card');

        let innerClassNames = ['card-content'];
        if (space) {
            innerClassNames.push('card-content-space');
        }
        if (fill) {
            classNames.push('fill');
        }
        if (grid) {
            gridConfig(innerClassNames, this.props);
        }
        if (clickable) {
            classNames.push('clickable');
        }

        return (
            <div className={classNames.join(' ')} id={id} onClick={this.onClick}>
                {header ? <header>{header}</header> : null}
                <div className={innerClassNames.join(' ')}>
                    {this.props.children}
                </div>
                {nav ? <nav className={navAlign === 'end' ? 'card-nav-align-end' : ''}>{nav}</nav> : null}
                {footer ? <footer>{footer}</footer> : null}
            </div>
        );
    }
}