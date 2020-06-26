import React from 'react';
import { block, addContext, FLEX_START, FLEX_END, CENTER, SPACE_BETWEEN, SPACE_AROUND, SPACE_EVENTLY } from '@artistry/abstract';
import { Attr, Box, FlexContainer, Rule } from 'artistry';
import { data } from '../util';

const DIRECTION = 'direction';
const JUSTIFY = 'justify';
let classes = addContext(() => {
    const ActionBar = block('action-bar',
        Box({
            padding: 0,
            margin: [1, 0.5]
        }),
        FlexContainer({
            justify: 'flex-end'
        }),
        Rule('& > *',
            Box({
                margin: [0, 0.5]
            })
        ),
        Attr(DIRECTION, {
            forward: FlexContainer({
                direction: 'row'
            }),
            reverse: FlexContainer({
                direction: 'row-reverse'
            })
        }),
        Attr(JUSTIFY, {
            start: FlexContainer({
                justify: FLEX_START
            }),
            end: FlexContainer({
                justify: FLEX_END
            }),
            center: FlexContainer({
                justify: CENTER
            }),
            'space-between': FlexContainer({
                justify: SPACE_BETWEEN
            }),
            'space-around': FlexContainer({
                justify: SPACE_AROUND
            }),
            'space-evenly': FlexContainer({
                justify: SPACE_EVENTLY
            }),
        })
    );
    return {
        ActionBar
    };
});

export interface IActionBarProps {
    children?: any;
    direction?: 'forward' | 'reverse';
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export const ActionBar: React.FC<IActionBarProps> = ({
    children,
    direction,
    justify
}) => {

    return (
        <div
            className={classes.ActionBar}
            {...{
                [data(DIRECTION)]: direction,
                [data(JUSTIFY)]: justify,
            }}>
            {children}
        </div>
    );
};