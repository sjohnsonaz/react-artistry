import React from 'react';
import { addContext, block, Settings, NOWRAP } from '@artistry/abstract';
import { Paper, IDefaultSettings, Wrap } from 'artistry';

const classes = addContext(() => {
    let base = Settings.get<IDefaultSettings>();
    const button = block('button',
        Paper({
            color: base.colors.primary
        }),
        Wrap({
            whiteSpace: NOWRAP
        })
    );

    return {
        button
    }
});

export interface IButtonProps {
    children?: any
}

export const Button: React.FC<IButtonProps> = ({ children }) => {
    return (
        <button className={classes.button}>
            {children}
        </button>
    )
}

export default Button;