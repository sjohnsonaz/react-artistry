import { addContext, block, rgba, Variables, Length, MediaContext, MediaType, query, px, value } from "@artistry/abstract";
import { getSettings } from "artistry";
import { UnitNum } from "@artistry/abstract/dist/unit/Unit";

export const FormStyle = addContext(() => {
    const base = getSettings();

    const FORM_COLUMNS = 'form-columns';
    const FORM_TITLE = 'form-title';
    const FORM_SPACING = 'form-spacing';
    const FORM_TITLE_SPAN = 'form-title-span';

    const Form = block('form', Variables({
        [FORM_COLUMNS]: 12,
        [FORM_TITLE]: 3,
        [FORM_SPACING]: base.space(1)
    }));
    const Form__Row = Form.element('row',
        Variables({
            [FORM_TITLE_SPAN]: 6
        }), {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        gap: value(FORM_SPACING),
        margin: value(FORM_SPACING)
    });
    const Form__LockScreen = Form.element('lock-screen');
    const Form__Group = Form.element('group');
    const Form__Title = Form.element('title');
    const Form__Control = Form.element('control');
    const Form__Text = Form.element('text');

    const Form$$XS = Form.modifierContext('xs', formStacked);
    const Form$$SM = Form.modifier('sm', formSize(base.sizes.small));
    const Form$$MD = Form.modifier('md', formSize(base.sizes.medium));
    const Form$$LG = Form.modifier('lg', formSize(base.sizes.large));
    const Form$$XL = Form.modifier('xl', formSize(base.sizes.xLarge));
    const Form$$Lock = Form.modifierContext('lock', () => {
        Form.update({
            position: 'relative'
        });
        Form__LockScreen.update({
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: rgba(0, 0, 0, 0.2) + '',
            zIndex: 100,
            verticalAlign: 'middle',
            textAlign: 'center'
        });
    });

    function formSize(maxWidth: Length) {
        let _maxWidth = maxWidth as UnitNum<Length>;
        return MediaContext(query(MediaType.Screen, `(max-width: ${px(_maxWidth - 1)})`),
            formStacked
        );
    }

    function formStacked() {
        Form__Group.update({
            gridTemplateColumns: '1fr',
            alignItems: 'start'
        });
        Form__Text.update({
            paddingInlineStart: 0
        });
        Form__Title.update({
            textAlign: 'start',
            margin: base.space(0.5, 0)
        });
        Form__Control.update({
            gridRow: 'auto',
            gridColumn: 1
        });
        Form__Text.update({
            gridRow: 'auto',
            gridColumn: 1
        });
    }

    return {
        Form,
        Form__LockScreen,
        Form__Group,
        Form__Title,
        Form__Control,
        Form__Text,
        Form$$XS,
        Form$$SM,
        Form$$MD,
        Form$$LG,
        Form$$XL,
        Form$$Lock
    };
});