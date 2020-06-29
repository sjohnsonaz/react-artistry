import { Length, Media, MediaType, only, minWidth, FlexContainer, ROW, ROW_REVERSE, COLUMN } from "@artistry/abstract"

export interface IRowMixinProps {
    minWidth?: Length;
    reverse?: boolean;
}

export function RowMixin({
    minWidth: _minWidth,
    reverse
}: IRowMixinProps = {}) {
    if (_minWidth) {
        return [
            FlexContainer({
                direction: COLUMN
            }),
            Media(only(MediaType.Screen, minWidth(_minWidth)),
                FlexContainer({
                    direction: reverse ? ROW_REVERSE : ROW
                })
            )
        ];
    } else {
        return FlexContainer({
            direction: reverse ? ROW_REVERSE : ROW
        });
    }
}