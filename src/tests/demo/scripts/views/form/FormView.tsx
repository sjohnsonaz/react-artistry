import * as React from 'react';

import { ActionBar, AmountInput, Button, Divider, Form, FormContainer, Input, FormText, Section, TimePicker } from '../../../../../scripts/modules/ArtistryReact';
import TimeInput from '../../../../../scripts/components/TimeInput';

export interface IFormViewProps {

}

export interface IFormViewState {
    date?: Date;
    amount: number;
}

export default class FormView extends React.Component<IFormViewProps, any> {
    state: IFormViewState = {
        date: new Date(Date.now()),
        amount: 0
    }

    render() {
        return (
            <Section header="Form">
                <Form
                    screenSize="small"
                    onEnter={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('enter')
                    }}
                    onEscape={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('escape')
                    }}
                >
                    <FormContainer label="Value">
                        <Input type="text" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormContainer label="Time">
                        <Input mask="[[0-23]]:[[0-59]]" fill />
                    </FormContainer>
                    <FormContainer label="Phone">
                        <Input mask="(999) 999-9999" fill />
                    </FormContainer>
                    <FormContainer label="Color">
                        <Input mask="#000000" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormContainer label="99999">
                        <Input mask="99999" fill />
                    </FormContainer>
                    <FormContainer label="aaaaa">
                        <Input mask="aaaaa" fill />
                    </FormContainer>
                    <FormContainer label="nnnnn">
                        <Input mask="nnnnn" fill />
                    </FormContainer>
                    <FormContainer label="[[0-23]]00000">
                        <Input mask="[[0-23]]00000" fill />
                    </FormContainer>
                    <FormContainer label="99aa99aa99aa">
                        <Input mask="99aa99aa99aa" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h3>Advanced Input</h3>
                    </FormText>
                    <FormContainer label="Time Input">
                        <TimeInput
                            fill
                            value={this.state.date.toUTCString()}
                            onChange={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.state.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1]);
                                }
                                this.setState({
                                    date: date
                                });
                                console.log(date);
                            }}
                        />
                    </FormContainer>
                    <FormContainer label="Time Picker">
                        <TimePicker
                            value={this.state.date}
                            onChange={(event, date?: Date) => {
                                event;
                                if (date) {
                                    this.setState({
                                        date: date
                                    });
                                    console.log(date);
                                }
                            }}
                        />
                    </FormContainer>
                    <FormContainer label="Time with Seconds">
                        <TimeInput
                            fill
                            seconds
                            value={this.state.date.toUTCString()}
                            onChange={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.state.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1], parts[2]);
                                }
                                this.setState({
                                    date: date
                                });
                                console.log(date);
                            }}
                        />
                    </FormContainer>
                    <FormContainer label="Amount" nonLabel>
                        <AmountInput value={this.state.amount} minimum={1} maximum={10} onChange={(value) => {
                            this.setState({
                                amount: value
                            });
                        }} />
                    </FormContainer>
                    <Divider />
                    <ActionBar>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </ActionBar>
                </Form>
            </Section>
        );
    }
}
