import { VariableProperties, Variables, Media, only, MediaType, minWidth, px, GRID, value } from "@artistry/abstract"

export interface IGridMixinProps {
    columns?: number;
    span?: number;
    offset?: number;
}

export const GRID_COLUMNS = 'grid-columns';
export const GRID_SPAN = 'grid-span';
export const GRID_OFFSET = 'grid-offset';

export const GridMixin = ({
    columns = 12,
    span,
    offset
}: IGridMixinProps): VariableProperties => {
    return Variables({
        [GRID_COLUMNS]: columns,
        [GRID_SPAN]: span,
        [GRID_OFFSET]: offset
    });
};

export interface IGridRowMixinProps {

}

export const GridRowMixin = ({

}: IGridRowMixinProps): VariableProperties[] => {
    return [
        {
            display: GRID,
            gridTemplateColumns: '1fr'
        },
        Media(only(MediaType.Screen, minWidth(px(500))), {
            gridTemplateColumns: `repeat(${value(GRID_COLUMNS)}, 1fr)`
        })
    ];
}

export interface IGridColumnMixinProps {
    span?: number;
    offset?: number;
}

export const GridColumnMixin = ({
    span = 12,
    offset
}: IGridColumnMixinProps): VariableProperties => {
    return {
        gridColumnStart: typeof offset === 'number' ? offset + 1 : undefined,
        gridColumnEnd: `span ${value(GRID_SPAN)}`,
    }
}