import * as React from 'react';

import Closeable from './Closeable';
import { IGridExternalProps, gridConfig } from '../abstract/grid/Grid';
import { IDisableable, disabledClass } from '../abilities/Disabled';
import ClassNames from 'util/ClassNames';

export type CardType = 'default' | 'success' | 'info' | 'warning' | 'danger';

export type CardHandle = 'default' | 'top' | 'right' | 'bottom' | 'left';

export interface ICardProps extends IGridExternalProps, IDisableable {
    /** id of the root element */
    id?: string;

    /** classes to add to the root element */
    className?: string;

    /** JSX to display in the header */
    header?: any;

    /** JSX to display in the footer */
    footer?: any;

    /** determines whether the card should have padding*/
    space?: boolean;

    /** determines whether the card should fill horizontally */
    fill?: boolean;

    /** JSX to display in the nav section */
    nav?: any;

    type?: CardType;
    handle?: CardHandle;
    square?: boolean;

    /** determines whether the card is clickable */
    clickable?: boolean;

    /** the click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
}

/** Displays a Card */
export default class Card extends React.Component<ICardProps, any> {
    onClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
            type,
            handle,
            square,
            grid,
            clickable,
            disabled
        } = this.props;
        let classNames = new ClassNames('card', className);

        let innerClassNames = new ClassNames('card-content');
        if (space) {
            innerClassNames.add('card-content-space');
        }
        if (fill) {
            classNames.add('fill');
        }
        if (type) {
            classNames.add('card-type-' + type);
        }
        if (handle) {
            classNames.add('card-handle-' + handle);
        }
        if (square) {
            classNames.add('card-square');
        }
        if (grid) {
            gridConfig(innerClassNames, this.props);
        }
        if (clickable) {
            classNames.add('clickable');
        }
        disabledClass(disabled, classNames);

        return (
            <div className={classNames.toString()} id={id} onClick={this.onClick}>
                {header ? <header>{header}</header> : null}
                <div className={innerClassNames.toString()}>
                    {this.props.children}
                </div>
                {nav ? <nav className='card-nav'>{nav}</nav> : null}
                {footer ? <footer>{footer}</footer> : null}
            </div>
        );
    }
}