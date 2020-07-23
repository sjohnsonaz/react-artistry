import { addContext, block, unit } from "@artistry/abstract";
import { getSettings } from "artistry";

export const DividerStyle = addContext(() => {
    const base = getSettings();
    const Divider = block('divider', {
        margin: 0,
        borderWidth: unit(base.dividerWidth, 0, 0, 0),
        borderColor: base.colors.border.color + '',
        borderStyle: 'solid'
    });

    return {
        Divider
    };
});

/*
.divider,
.divider-horizontal {
    margin: 0;
    border-width: $default-divider-width 0 0 0;
    border-color: $default-border-color;
    border-style: solid;
}

.divider-vertical {
    margin: 0;
    border-width: 0 $default-divider-width 0 0;
    border-color: $default-border-color;
    border-style: solid;
}
*/