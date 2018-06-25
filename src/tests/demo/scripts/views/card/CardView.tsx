import * as React from 'react';

import { Button, Card, Cell, Closeable, Grid, Row, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ICardViewProps {

}

export interface ICardViewState {
    closed?: boolean;
}

export default class CardView extends React.Component<ICardViewProps, any> {
    constructor(props?: ICardViewProps) {
        super(props);
        this.state = {
            closed: false
        };
    }

    toggle = () => {
        this.setState({
            closed: !this.state.closed
        });
    }

    render() {
        return (
            <Section header="Card" space>
                <h3>Card</h3>
                <Card grid space>
                    <Row>
                        <Cell>
                            Card Content
                        </Cell>
                        <Cell>
                            <Button onClick={this.toggle}>Expand</Button>
                        </Cell>
                    </Row>
                    <Closeable closed={this.state.closed}>
                        <Grid>
                            <Row>
                                <Cell>
                                    Card Content
                                </Cell>
                            </Row>
                        </Grid>
                    </Closeable>
                </Card>
            </Section>
        );
    }
}