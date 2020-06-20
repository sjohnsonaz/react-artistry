import React from 'react';
import { block, addContext, px, rgb, merge } from '@artistry/abstract';
import { Paper } from '../../../src/mixins/Paper';
import { ShadowDepth } from '../../../src/mixins/Shadow';
import { Scroll, ScrollAttribute, ScrollType } from '../../../src/mixins/Scroll';

let classes = addContext(() => {
    let area = block('modal', merge(
        Paper({
            backgroundColor: rgb(255, 255, 255),
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

const Area: React.FC<IAreaProps> = ({ children }) => {
    return (
        <div className={classes.area}>{children}</div>
    );
}

export default Area;