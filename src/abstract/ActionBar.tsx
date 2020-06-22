import React from 'react';
import { block, addContext } from '@artistry/abstract';
import { Paper } from 'artistry';

let classes = addContext(() => {
    const ActionBar = block('action-bar',
        Paper({
        }), {
    });
    return {
        ActionBar
    };
});

export interface IActionBarProps {
    children?: any;
}

export const ActionBar: React.FC<IActionBarProps> = ({ children }) => {
    return (
        <div className={classes.ActionBar}>{children}</div>
    );
};