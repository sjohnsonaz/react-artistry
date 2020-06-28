import { Length, Media, MediaType, only, minWidth, FlexContainer, ROW, ROW_REVERSE, COLUMN, merge, FlexItem, percent, BlockDefinition } from "@artistry/abstract"
import { Box } from "artistry";

export interface IColumnMixinProps {
    minWidth: Length;
    total?: number;
    span?: number;
    offset?: number;
}

export const ColumnMixin = ({
    minWidth: _minWidth,
    total = 1,
    span = total,
    offset = total
}: IColumnMixinProps): BlockDefinition[] => {
    if (_minWidth) {
        return [
            FlexItem({
                grow: 0,
                shrink: 0
            }),
            {
                width: percent(100),
                marginInlineStart: 0
            },
            Media(only(MediaType.Screen, minWidth(_minWidth)), {
                width: percent(100 * span / total),
                marginInlineStart: percent(100 * offset / total)
            })
        ];
    } else {
        return [
            FlexItem({
                grow: 0,
                shrink: 0
            }),
            {
                width: percent(100 * span / total),
                marginInlineStart: percent(100 * offset / total)
            }
        ]
    }
}