import { addContext, rule, hex } from '@artistry/abstract';

addContext(() => {
    rule('*', {
        borderStyle: 'solid',
        borderWidth: 0
    });
    rule('body', {
        margin: 0,
        backgroundColor: hex('#eee') + '',
        fontFamily: 'system-ui'
    });
});