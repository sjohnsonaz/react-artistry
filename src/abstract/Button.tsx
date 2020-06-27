import React from 'react';
import { addContext, block, Settings, NOWRAP, brightness, PseudoClass, contrast, filter, ColorPair, rgba, Wrap, PClass, Attribute } from '@artistry/abstract';
import { Paper, IDefaultSettings, ShadowDepth } from 'artistry';

const classes = addContext(() => {
    let base = Settings.get<IDefaultSettings>();
    const button = block('button',
        Paper({
            color: base.colors.primary
        }),
        Wrap({
            whiteSpace: NOWRAP
        }),
        ShadowDepth(1),
        {
            cursor: 'pointer',
            outline: 'none'
        },
        PClass(PseudoClass.HOVER,
            ShadowDepth(1), {
            filter: filter(contrast(0.5), brightness(1.5))
        }),
        PClass(PseudoClass.ACTIVE, {
            filter: brightness(3.5) + ''
        }),
        PClass(PseudoClass.FOCUS, {

        }),
        Attribute('display', {
            textonly: Paper({
                color: new ColorPair(rgba(0, 0, 0, 0))
            })
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