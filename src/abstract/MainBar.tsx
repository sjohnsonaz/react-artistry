import React from 'react';
import { block, addContext, px, STICKY, merge } from '@artistry/abstract';
import { Paper, ShadowDepth, FlexContainer, Position } from 'artistry';

let classes = addContext(() => {
    const mainBar = block('main-bar', merge(
        Paper({
            borderRadius: 0,
            borderWidth: 0
        }),
        ShadowDepth(2),
        FlexContainer(),
        Position({
            position: STICKY,
            top: 0,
            bottom: 0
        })
    ));
    const title = mainBar.element('title', {
        margin: 0
    });
    return {
        mainBar,
        title
    };
});

export interface IMainBarProps {
    children?: any;
    id?: string;
    title?: any;
}

export default function MainBar({ children, id, title }: IMainBarProps) {
    return (
        <div id={id} className={classes.mainBar}>
            {title && <h1 className={classes.title}>{title}</h1>}
            {children}
        </div>
    );
}