import { block, addContext, FLEX_START, FLEX_END, CENTER, SPACE_BETWEEN, SPACE_AROUND, SPACE_EVENLY, ROW, ROW_REVERSE, FlexContainer, Selector, Attribute } from '@artistry/abstract';
import { Box } from 'artistry';

export const DIRECTION = 'direction';
export const DIRECTION_FORWARD = 'forward';
export const DIRECTION_REVERSE = 'reverse';

export const JUSTIFY = 'justify';
export const JUSTIFY_START = 'start';
export const JUSTIFY_END = 'end';
export const JUSTIFY_CENTER = 'center';
export const JUSTIFY_SPACE_BETWEEN = 'space-between';
export const JUSTIFY_SPACE_AROUND = 'space-around';
export const JUSTIFY_SPACE_EVENLY = 'space-evenly';

export const ActionBarStyle = addContext(() => {
    const ActionBar = block('action-bar',
        Box({
            margin: 0,
            padding: [1, 0.5]
        }),
        FlexContainer({
            justify: FLEX_END
        }),
        Selector('& > *',
            Box({
                margin: [0, 0.5]
            })
        ),
        Attribute(DIRECTION, {
            [DIRECTION_FORWARD]: FlexContainer({
                direction: ROW
            }),
            [DIRECTION_REVERSE]: FlexContainer({
                direction: ROW_REVERSE
            })
        }),
        Attribute(JUSTIFY, {
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

export type Direction =
    typeof DIRECTION_FORWARD |
    typeof DIRECTION_REVERSE;
export type Justify =
    typeof JUSTIFY_START |
    typeof JUSTIFY_END |
    typeof JUSTIFY_CENTER |
    typeof JUSTIFY_SPACE_BETWEEN |
    typeof JUSTIFY_SPACE_AROUND |
    typeof JUSTIFY_SPACE_EVENLY;