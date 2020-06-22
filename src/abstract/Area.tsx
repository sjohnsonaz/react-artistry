import React from 'react';
import { block, addContext } from '@artistry/abstract';
import { Paper, ShadowDepth, Scroll, ScrollAttribute, ScrollType, getSettings } from 'artistry';

let classes = addContext(() => {
    let base = getSettings();
    let area = block('modal',
        Paper({
            borderWidth: 0,
            margin: base.space(1)
        }),
        Scroll({
            scrollType: 'Y'
        }),
        ShadowDepth(1),
    );
    ScrollAttribute(area, 'scroll', ScrollType.YAlways);
    return {
        area
    };
});


export interface IAreaProps {
    children?: any;
}

export const Area: React.FC<IAreaProps> = ({ children }) => {
    return (
        <div className={classes.area}>{children}</div>
    );
}

export default Area;