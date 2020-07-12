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
    Grid__Cell.attributes('span', {
        1: Variables({
            [GRID_SPAN]: 1
        }),
        2: Variables({
            [GRID_SPAN]: 2
        }),
        3: Variables({
            [GRID_SPAN]: 3
        }),
        4: Variables({
            [GRID_SPAN]: 4
        }),
        5: Variables({
            [GRID_SPAN]: 5
        }),
        6: Variables({
            [GRID_SPAN]: 6
        }),
        7: Variables({
            [GRID_SPAN]: 7
        }),
        8: Variables({
            [GRID_SPAN]: 8
        }),
        9: Variables({
            [GRID_SPAN]: 9
        }),
        10: Variables({
            [GRID_SPAN]: 10
        }),
        11: Variables({
            [GRID_SPAN]: 11
        }),
        12: Variables({
            [GRID_SPAN]: 12
        }),
    });

    return {
        Grid,
        Grid__Row,
        Grid__Cell
    };
});