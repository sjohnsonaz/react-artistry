import React from 'react';
import { addContext, block } from '@artistry/abstract';
import { Paper, ShadowDepth, Box } from 'artistry';

export const classes = addContext(() => {
    const Card = block('card',
        Paper({
            padding: 0
        }),
        ShadowDepth(2)
    )
    const Card__Body = Card.element('body',
        Box({
            margin: [1]
        })
    );

    return {
        Card,
        Card__Body
    };
});

export interface ICardProps {
    children?: any;
    footer?: any
}

export const Card: React.FC<ICardProps> = ({
    children,
    footer
} = {}) => {
    return (
        <div className={classes.Card}>
            <div className={classes.Card__Body}>
                {children}
            </div>
            {footer}
        </div>
    );
}