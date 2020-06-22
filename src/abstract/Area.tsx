import React from 'react';
import { block, addContext, px, merge } from '@artistry/abstract';
import { Paper, ShadowDepth, Scroll, ScrollAttribute, ScrollType } from 'artistry';

let classes = addContext(() => {
    let area = block('modal', merge(
        Paper({
            borderWidth: 0,
            margin: px(8)
        }),
        Scroll({
            scrollType: 'Y'
        }),
        ShadowDepth(1),
    ));
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