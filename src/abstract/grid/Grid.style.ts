import { addContext, block, FlexContainer, FlexItem, px, percent, Media, only, MediaType, minWidth, calc, value, Variables, SPACE_EVENLY, COLUMN, UNSET } from "@artistry/abstract";

export const GRID_COLUMNS = 'grid-columns';
export const GRID_MIN_WIDTH = 'grid-min-width';
export const GRID_SPAN = 'grid-span';
export const GRID_OFFSET = 'grid-offset';

const grid_columns = px(500);

export const GridStyle = addContext(() => {
    const Grid = block('grid',
        Variables({
            [GRID_COLUMNS]: 12,
            [GRID_MIN_WIDTH]: grid_columns,
            [GRID_SPAN]: 12,
            [GRID_OFFSET]: 0
        })
    );
    const Grid__Row = Grid.element('row',
        FlexContainer({
            justify: SPACE_EVENLY,
            direction: COLUMN
        }),
        Media(only(MediaType.Screen, minWidth(grid_columns)),
            FlexContainer({
                direction: UNSET
            })
        )
    );
    const Grid__Cell = Grid.element('cell',
        FlexItem({
            grow: 0,
            shrink: 0
        })
    );
    const Grid__Cell$$1 = Grid__Cell.modifier('1', 
        Variables({
            [GRID_SPAN]: 1
        }),
        {
            width: percent(100),
            marginInlineStart: 0
        },
        Media(only(MediaType.Screen, minWidth(grid_columns)), {
            width: calc(`${percent(100)} * ${value(GRID_SPAN)} / ${value(GRID_COLUMNS)}`),
            marginInlineStart: calc(`${percent(100)} * ${value(GRID_OFFSET)} / ${value(GRID_COLUMNS)}`)
        })
    );

    return {
        Grid,
        Grid__Row,
        Grid__Cell
    };
});