import { addContext, block, UNSET } from "@artistry/abstract";
import { getSettings, Paper, ShadowDepth } from "artistry";

export const InputStyle = addContext(() => {
    const base = getSettings();
    const Input = block('input',
        Paper({
            padding: base.space(1),
            color: base.colors.background
        }),
        ShadowDepth(1), {
        fontSize: UNSET,
        // Flexbox fix
        minWidth: 0
    });
    Input.pseudoclass('focus',
        ShadowDepth(2), {
        outline: 'none',
        //borderColor: $input-focus-border-color;
        //box-shadow: $box-shadow-height-1;
    });
    Input.pseudoclass('required', {
        //border-color: $input-required-border-color;
    });
    Input.pseudoclass('invalid', {
        //background-color: $input-danger-background-color;
        //color: $input-danger-color;
    });
    Input.pseudoclass('read-only', {
        //filter: var(--input-locked);
        cursor: 'default'
    });
    Input.pseudoclass('disabled', {
        //filter: var(--input-locked);
        cursor: 'default'
    });

    // &[data-size="small"] {
    //     --input-padding: var(--input-padding-small);
    //     --input-font-size: var(--input-font-size-small);
    // }

    // &[data-size="large"] {
    //     --input-padding: var(--input-padding-large);
    //     --input-font-size: var(--input-font-size-large);
    // }

    // &[data-theme="success"] {
    //     background-color: $input-success-background-color;
    //     color: $input-success-color;
    // }
    // &[data-theme="info"] {
    //     background-color: $input-info-background-color;
    //     color: $input-info-color;
    // }
    // &[data-theme="warning"] {
    //     background-color: $input-warning-background-color;
    //     color: $input-warning-color;
    // }
    // &[data-theme="danger"] {
    //     background-color: $input-danger-background-color;
    //     color: $input-danger-color;
    // }
    return {
        Input
    }
});

// .input {
// }

// input[type=""],
// input[type="text"],
// input[type="password"],
// textarea {
//     &.input {
//         // iOS specific fix
//         appearance: none;
//     }
// }

// .label {
//     font-weight: bold;
// }