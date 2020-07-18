import React from 'react';
import { addContext, block, px, percent } from '@artistry/abstract';
import { ShadowDepth, getSettings } from 'artistry';

const style = addContext(() => {
    const base = getSettings();
    const circle = block('circle', ShadowDepth(1), {
        backgroundColor: base.colors.surface.color + '',
        width: px(32),
        paddingBottom: percent(100),
        borderRadius: percent(50)
    });
    return {
        circle
    };
});

export interface ICircleProps {

}

export const Circle: React.FC<ICircleProps> = ({ }) => {
    return <div className={style.circle}></div>
}