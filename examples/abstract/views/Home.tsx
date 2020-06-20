import React from 'react';

import Page from '../components/Page';
import Area from '../components/Area';
import Button from '../components/Button';

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