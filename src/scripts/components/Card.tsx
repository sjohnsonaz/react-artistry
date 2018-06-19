import * as React from 'react';

import { GridSize, gridConfig } from './Grid';

export interface ICardProps {
    id?: string;
    className?: string;
    closed?: boolean;
    header?: any;
    footer?: any;
    space?: boolean;
    nav?: any;
    navAlign?: 'start' | 'end';
    grid?: boolean;
    gridColumns?: number;
    gridSize?: GridSize;
}

export default class Card extends React.Component<ICardProps, any> {
    render() {
        let {
            id,
            className,
            closed,
            header,
            footer,
            space,
            nav,
            navAlign,
            grid,
            gridColumns,
            gridSize,
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card');

        let innerClassNames = ['card-content'];
        if (space) {
            innerClassNames.push('card-content-space');
        }
        if (grid) {
            gridConfig(innerClassNames, gridColumns, gridSize);
        }

        return (
            <div className={classNames.join(' ')} id={id} data-closed={closed}>
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