import React from 'react';
import { addContext, block, Settings } from '@artistry/abstract';
import { Paper, IDefaultSettings } from 'artistry';

const classes = addContext(() => {
    let base = Settings.get<IDefaultSettings>();
    const button = block('button',
        Paper({
            color: base.colors.primary
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