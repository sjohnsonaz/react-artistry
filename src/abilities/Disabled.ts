import ClassNames from "util/ClassNames";

export interface IDisableable {
    disabled?: boolean
}

export function disabledClass(disabled: boolean, classNames: ClassNames) {
    if (disabled) {
        classNames.add('disabled');
    }
}