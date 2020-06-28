import { VariableProperties, Length, Media, MediaType, only, minWidth, FlexContainer, ROW, ROW_REVERSE, COLUMN, merge } from "@artistry/abstract"

export interface IRowMixinProps {
    minWidth: Length;
    reverse?: boolean;
}

export const RowMixin = ({
    minWidth: _minWidth,
    reverse
}: IRowMixinProps): VariableProperties => {
    if (_minWidth) {
        return merge(
            FlexContainer({
                direction: COLUMN
            }),
            Media(only(MediaType.Screen, minWidth(_minWidth)),
                FlexContainer({
                    direction: reverse ? ROW_REVERSE : ROW
                })
            )
        );
    } else {
        return FlexContainer({
            direction: reverse ? ROW_REVERSE : ROW
        });
    }
}