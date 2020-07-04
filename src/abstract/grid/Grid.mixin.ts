import { VariableProperties, Variables } from "@artistry/abstract"

export interface IGridMixinProps {
    columns?: number;
}

export const GRID_COLUMNS = 'grid-columns';

export const GridMixin = ({
    columns = 12
}: IGridMixinProps): VariableProperties => {
    return Variables({
        [GRID_COLUMNS]: columns
    });
}