import React from 'react';

import { Page, Area, Button, ActionBar, Container, Card } from '@abstract';

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
            <Container screenSize="md">
                <Area>
                    Paper
                    <Card footer={
                        <ActionBar direction="forward">
                            <Button>OK</Button>
                            <Button>OK</Button>
                            <Button>OK</Button>
                        </ActionBar>
                    }>
                        Card
                    </Card>
                </Area>
            </Container>
        </Page>
    );
}