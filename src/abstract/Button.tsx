import React from 'react';
import { addContext, block, NOWRAP, brightness, PseudoClass, contrast, filter, ColorPair, rgba, Wrap, PClass, Attribute, Variables, value } from '@artistry/abstract';
import { Paper, ShadowDepth, getSettings } from 'artistry';

const classes = addContext(() => {
    const ACTIVE_FILTER = 'active-filter';
    const HOVER_FILTER = 'hover-filter';
    const FOCUS_FILTER = 'focus-filter';

    let base = getSettings();
    const button = block('button',
        Variables({
            [HOVER_FILTER]: filter(contrast(0.5), brightness(2.5)),
            [ACTIVE_FILTER]: filter(contrast(0.5), brightness(2)),
            [FOCUS_FILTER]: filter(contrast(0.5), brightness(1.5)),
        }),
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
        // These are order-dependent
        PClass(PseudoClass.FOCUS, {
            filter: value(FOCUS_FILTER)
        }),
        PClass(PseudoClass.HOVER,
            ShadowDepth(1), {
            filter: value(HOVER_FILTER)
        }),
        PClass(PseudoClass.ACTIVE, {
            filter: value(ACTIVE_FILTER)
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