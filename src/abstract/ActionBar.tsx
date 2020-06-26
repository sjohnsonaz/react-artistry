import React from 'react';
import { block, addContext, FLEX_START, FLEX_END, CENTER, SPACE_BETWEEN, SPACE_AROUND, SPACE_EVENLY, ROW, ROW_REVERSE } from '@artistry/abstract';
import { Attr, Box, FlexContainer, Rule } from 'artistry';
import { data } from '../util';

const DIRECTION = 'direction';
const DIRECTION_FORWARD = 'forward';
const DIRECTION_REVERSE = 'reverse';

const JUSTIFY = 'justify';
const JUSTIFY_START = 'start';
const JUSTIFY_END = 'end';
const JUSTIFY_CENTER = 'center';
const JUSTIFY_SPACE_BETWEEN = 'space-between';
const JUSTIFY_SPACE_AROUND = 'space-around';
const JUSTIFY_SPACE_EVENLY = 'space-evenly';

let classes = addContext(() => {
    const ActionBar = block('action-bar',
        Box({
            padding: 0,
            margin: [1, 0.5]
        }),
        FlexContainer({
            justify: FLEX_END
        }),
        Rule('& > *',
            Box({
                margin: [0, 0.5]
            })
        ),
        Attr(DIRECTION, {
            [DIRECTION_FORWARD]: FlexContainer({
                direction: ROW
            }),
            [DIRECTION_REVERSE]: FlexContainer({
                direction: ROW_REVERSE
            })
        }),
        Attr(JUSTIFY, {
            [JUSTIFY_START]: FlexContainer({
                justify: FLEX_START
            }),
            [JUSTIFY_END]: FlexContainer({
                justify: FLEX_END
            }),
            [JUSTIFY_CENTER]: FlexContainer({
                justify: CENTER
            }),
            [JUSTIFY_SPACE_BETWEEN]: FlexContainer({
                justify: SPACE_BETWEEN
            }),
            [JUSTIFY_SPACE_AROUND]: FlexContainer({
                justify: SPACE_AROUND
            }),
            [JUSTIFY_SPACE_EVENLY]: FlexContainer({
                justify: SPACE_EVENLY
            }),
        })
    );
    return {
        ActionBar
    };
});

type Direction =
    typeof DIRECTION_FORWARD |
    typeof DIRECTION_REVERSE;
type Justify =
    typeof JUSTIFY_START |
    typeof JUSTIFY_END |
    typeof JUSTIFY_CENTER |
    typeof JUSTIFY_SPACE_BETWEEN |
    typeof JUSTIFY_SPACE_AROUND |
    typeof JUSTIFY_SPACE_EVENLY;

export interface IActionBarProps {
    children?: any;
    direction?: Direction;
    justify?: Justify;
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