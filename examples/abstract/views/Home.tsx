import React from 'react';

import { Page, Area, Button } from '@abstract';

export interface IHomeProps {
    id?: string;
    className?: string;
}

export default function Home({ id }: IHomeProps) {
    return (
        <Page title="Test"
            footer={<>
                <Button>OK</Button>
            </>}
        >
            <Area>Paper</Area>
        </Page>
    );
}