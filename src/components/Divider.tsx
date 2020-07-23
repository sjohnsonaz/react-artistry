import React from 'react';

import ClassNames from 'util/ClassNames';
import { DividerStyle } from 'abstract/divider/Divider.style';

export interface IDividerProps {
    id?: string;
    className?: string;
}

export const Divider: React.FC<IDividerProps> = ({ id, className } = {}) => {
    const classNames = new ClassNames(DividerStyle.Divider, className);
    return <div className={classNames.toString()} id={id}></div>
}