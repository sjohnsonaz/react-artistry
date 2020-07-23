import React from 'react';

import { Page, Area, Button, ActionBar, Container, Card } from '@abstract';
import { Form, FormText, FormGroup, Row, Grid, Cell, Input } from '@artistry-react';
import { Divider } from 'components/Divider';

export interface IHomeProps {
    id?: string;
    className?: string;
}

export default function Home({ id }: IHomeProps) {
    return (
        <Page title="Test"
            footer={<Container screenSize="md">
                <ActionBar className="explode">
                    <Button>OK</Button>
                    <Button>OK</Button>
                </ActionBar>
            </Container>}
        >
            <Container screenSize="md">
                <Area>
                    Paper
                    <Form screenSize="medium">
                        <FormText>Test</FormText>
                        <FormGroup label="Form Group">
                            <Input />
                        </FormGroup>
                    </Form>
                    <Grid>
                        <Row>
                            <Cell>Cell</Cell>
                            <Cell columns={2}>Cell</Cell>
                            <Cell>Cell</Cell>
                            <Cell>Cell</Cell>
                        </Row>
                    </Grid>
                    <Card footer={
                        <>
                            <Divider />
                            <ActionBar direction="forward">
                                <Button>OK</Button>
                                <Button>OK</Button>
                                <Button>OK</Button>
                            </ActionBar>
                        </>
                    }>
                        Card
                    </Card>
                </Area>
            </Container>
        </Page>
    );
}