import React from 'react';

import { Page, Area, Button, ActionBar, Container, Card } from '@abstract';
import { Form, FormText, FormGroup, Row, Grid, Cell } from '@artistry-react';

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
                    <Form screenSize="medium">
                        <FormText>Test</FormText>
                        <FormGroup label="Form Group"></FormGroup>
                    </Form>
                    <Grid>
                        <Row>
                            <Cell>Cell</Cell>
                            <Cell>Cell</Cell>
                            <Cell>Cell</Cell>
                            <Cell>Cell</Cell>
                        </Row>
                    </Grid>
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