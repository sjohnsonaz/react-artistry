import { DefaultSettings } from 'artistry';
import { px, hex, ColorPair, Settings } from '@artistry/abstract';

let settings = Settings.init(DefaultSettings);
settings.setData({
    spacing: px(12),
    colors: {
        primary: new ColorPair(hex('#00f'))
    }
});
