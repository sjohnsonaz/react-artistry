import React from 'react';
import { block, addContext, px, rgba, content, COLUMN, merge } from '@artistry/abstract';

import { ShadowDepth } from '../../../src/mixins/Shadow';
import { FlexContainer, FlexElement } from '../../../src/mixins/Flexbox';
import { Paper } from '../../../src/mixins/Paper';

import MainBar from './MainBar';

let classes = addContext(() => {
    const page = block('page', merge(
        FlexContainer({
            direction: COLUMN
        }), {
        height: '100vh'
    }));
    const body = page.element('body', merge(
        FlexElement({
            grow: 1
        })
    ));
    return {
        page,
        body
    };
});

export interface IPageProps {
    children?: any;
    id?: string;
    title?: any;
    header?: any;
    footer?: any;
}

export default function Page({ children, id, title, header, footer }: IPageProps) {
    return (
        <div id={id} className={classes.page}>
            <MainBar title={title}>
                {header}
            </MainBar>
            <div className={classes.body}>
                {children}
            </div>
            {footer &&
                <MainBar>
                    {footer}
                </MainBar>}
        </div>
    );
}