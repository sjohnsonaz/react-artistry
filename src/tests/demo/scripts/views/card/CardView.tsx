import * as React from 'react';

import { Button, Card, CardContainer, CardControl, CardSection, Cell, Closeable, Fillable, Grid, Row, Section } from '../../../../../scripts/modules/ArtistryReact';

import VerticalCard from './VerticalCard';

export interface ICardViewProps {

}

export interface ICardViewState {
    closed?: boolean;
    filled?: boolean;
}

export default class CardView extends React.Component<ICardViewProps, ICardViewState> {
    constructor(props?: ICardViewProps) {
        super(props);
        this.state = {
            closed: false
        };
    }

    toggleClosed = () => {
        this.setState({
            closed: !this.state.closed
        });
    }

    toggleFilled = () => {
        this.setState({
            filled: !this.state.filled
        });
    }

    render() {
        return (
            <Section header="Card" space>
                <h3>Card</h3>
                <CardContainer>
                    <VerticalCard />
                    <Fillable card filled={this.state.filled}>
                        <Card grid space fill>
                            <Row>
                                <Cell>
                                    Card Content
                            </Cell>
                                <Cell>
                                    <Button onClick={this.toggleClosed}>Expand</Button>
                                    <Button onClick={this.toggleFilled}>Fill</Button>
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
                    </Fillable>
                </CardContainer>
                <Card type="success" handle="left">
                    <CardSection multiColumn>
                        <CardControl title="Title 1">Data 1</CardControl>
                        <CardControl title="Title 2">Data 2</CardControl>
                        <CardControl title="Title 3">Data 3</CardControl>
                        <CardControl title="Title 4">Data 4</CardControl>
                    </CardSection>
                </Card>
            </Section>
        );
    }
}