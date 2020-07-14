import React from 'react';
import { data } from 'util/';
import ClassNames from 'util/ClassNames';
import { ActionBarStyle, DIRECTION, JUSTIFY, Direction, Justify } from './ActionBar.style';

export interface IActionBarProps {
    id?: string;
    className?: string;
    children?: any;
    direction?: Direction;
    justify?: Justify;
}

export const ActionBar: React.FC<IActionBarProps> = ({
    id,
    className,
    children,
    direction,
    justify
}) => {
    const classNames = new ClassNames(ActionBarStyle.ActionBar, className)
    return (
        <div
            id={id}
            className={classNames.toString()}
            {...{
                [data(DIRECTION)]: direction,
                [data(JUSTIFY)]: justify,
            }}>
            {children}
        </div>
    );
};