import React from 'react';
import { block, addContext, COLUMN, FlexContainer, FlexItem } from '@artistry/abstract';

import MainBar from './MainBar';

let classes = addContext(() => {
    const page = block('page',
        FlexContainer({
            direction: COLUMN
        }), {
        height: '100vh'
    });
    const body = page.element('body',
        FlexItem({
            grow: 1
        })
    );
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

export function Page({ children, id, title, header, footer }: IPageProps) {
    return (
        <div id={id} className={classes.page}>
            <MainBar title={title}>
                {header}
            </MainBar>
            <div className={classes.body}>
                {children}
            </div>
            {footer &&
                <MainBar direction="reverse">
                    {footer}
                </MainBar>}
        </div>
    );
}

export default Page;