import React from 'react';
import { addContext, block, merge } from '@artistry/abstract';
import { Paper } from '../../../src/mixins/Paper';

const classes = addContext(() => {
    const button = block('button', merge(
        Paper({

        })
    ));

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