import { DefaultSettings } from 'artistry';
import { hex, ColorPair, Settings, space } from '@artistry/abstract';

let settings = Settings.init(DefaultSettings);
settings.setData({
    space: space(12),
    borderWidth: 0,
    colors: {
        // background: new ColorPair(hex('#eee')),
        primary: new ColorPair(hex('#309')),
        background: new ColorPair(hex('#222')),
        surface: new ColorPair(hex('#333'))
    }
});
