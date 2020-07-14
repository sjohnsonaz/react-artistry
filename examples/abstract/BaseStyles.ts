import { addContext, rule, important, block } from '@artistry/abstract';
import { getSettings } from 'artistry';

addContext(() => {
    const base = getSettings();
    rule('*', {
        borderStyle: 'solid',
        borderWidth: 0
    });
    rule('body', {
        margin: 0,
        backgroundColor: base.colors.background.color + '',
        fontFamily: 'system-ui'
    });
    block('explode', {
        margin: important(base.space(-1))
    });
});