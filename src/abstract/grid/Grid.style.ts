import { addContext, block, FlexContainer, FlexItem, px, percent, Media, only, MediaType, minWidth, calc, value, Variables, SPACE_EVENLY, COLUMN, UNSET } from "@artistry/abstract";
import { GridMixin, GridColumnMixin, GridRowMixin } from "./Grid.mixin";

export const GRID_COLUMNS = 'grid-columns';
export const GRID_MIN_WIDTH = 'grid-min-width';
export const GRID_SPAN = 'grid-span';
export const GRID_OFFSET = 'grid-offset';

const grid_columns = px(500);

export const GridStyle = addContext(() => {
    const Grid = block('grid',
        GridMixin({
            columns: 12
        })
    );
    const Grid__Row = Grid.element('row',
        GridRowMixin({
        })
    );
    const Grid__Cell = Grid.element('cell',
        GridColumnMixin({
            span: 1
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