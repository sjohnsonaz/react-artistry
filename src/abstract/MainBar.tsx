import React from 'react';
import { block, addContext, px, STICKY, merge, ROW_REVERSE } from '@artistry/abstract';
import { Paper, ShadowDepth, FlexContainer, Position } from 'artistry';
import ClassNames from 'util/ClassNames';

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
    const mainBar_right = mainBar.mod('right', FlexContainer({
        direction: ROW_REVERSE
    }));
    const title = mainBar.element('title', {
        margin: 0
    });
    return {
        mainBar,
        mainBar_right,
        title
    };
});

export interface IMainBarProps {
    children?: any;
    id?: string;
    className?: string;
    title?: any;
    direction?: 'forward' | 'reverse';
}

export default function MainBar({ children, id, className, title, direction }: IMainBarProps) {
    let classNames = new ClassNames(className, classes.mainBar);
    switch (direction) {
        case 'reverse':
            classNames.add(classes.mainBar + '--right');
            break;
        case 'forward':
        default:
            break;
    }
    return (
        <div id={id} className={classNames.toString()}>
            {title && <h1 className={classes.title}>{title}</h1>}
            {children}
        </div>
    );
}