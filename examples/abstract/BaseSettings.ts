import { DefaultSettings } from 'artistry';
import { hex, ColorPair, Settings, space } from '@artistry/abstract';

let settings = Settings.init(DefaultSettings);
settings.setData({
    space: space(12),
    borderWidth: 0,
    colors: {
        primary: new ColorPair(hex('#00f'))
    }
});
