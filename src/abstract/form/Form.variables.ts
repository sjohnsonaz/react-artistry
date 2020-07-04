import { addContext, Variables, value, calc, rule, ROOT } from "@artistry/abstract";
import { getSettings } from "artistry";

export const FORM_COLUMNS = 'form-columns';
export const FORM_TITLE = 'form-title';
export const FORM_SPACING = 'form-spacing';
export const FORM_TITLE_SPAN = 'form-title-span';
export const FORM_TITLE_WIDTH = 'form-title-width';

addContext(() => {
    const base = getSettings();

    rule(ROOT,
        Variables({
            [FORM_COLUMNS]: 12,
            [FORM_TITLE]: 3,
            [FORM_TITLE_SPAN]: 6,
            [FORM_SPACING]: base.space(1),
            [FORM_TITLE_WIDTH]: calc(`${value(FORM_TITLE_SPAN)} / ${value(FORM_COLUMNS)} * (100% - ${value(FORM_SPACING)})`)
        })
    );
});