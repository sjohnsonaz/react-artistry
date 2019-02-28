import * as React from 'react';

import { Button, Form, FormAction, FormContainer, FormDivider, FormInput, FormText, Section, TimePicker } from '../../../../../scripts/modules/ArtistryReact';
import TimeInput from '../../../../../scripts/components/TimeInput';

export interface IFormViewProps {

}

export interface IFormViewState {
    date?: Date;
}

export default class FormView extends React.Component<IFormViewProps, any> {
    state: IFormViewState = {
        date: new Date(Date.now())
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
                        <FormInput type="text" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormContainer label="Time">
                        <FormInput mask="[[0-23]]:[[0-59]]" fill />
                    </FormContainer>
                    <FormContainer label="Phone">
                        <FormInput mask="(999) 999-9999" fill />
                    </FormContainer>
                    <FormContainer label="Color">
                        <FormInput mask="#000000" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormContainer label="99999">
                        <FormInput mask="99999" fill />
                    </FormContainer>
                    <FormContainer label="aaaaa">
                        <FormInput mask="aaaaa" fill />
                    </FormContainer>
                    <FormContainer label="nnnnn">
                        <FormInput mask="nnnnn" fill />
                    </FormContainer>
                    <FormContainer label="[[0-23]]00000">
                        <FormInput mask="[[0-23]]00000" fill />
                    </FormContainer>
                    <FormContainer label="99aa99aa99aa">
                        <FormInput mask="99aa99aa99aa" fill />
                    </FormContainer>
                    <FormDivider />
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
                    <FormDivider />
                    <FormAction>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </FormAction>
                </Form>
            </Section>
        );
    }
}
