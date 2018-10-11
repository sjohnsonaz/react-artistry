import * as React from 'react';

import { Button, Form, FormAction, FormContainer, FormDivider, FormInput, FormText, Section, MaskedInput } from '../../../../../scripts/modules/ArtistryReact';

export interface IFormViewProps {

}

export default class FormView extends React.Component<IFormViewProps, any> {
    render() {
        return (
            <Section header="Form">
                <Form
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
                        <MaskedInput mask="[[0-23]]:[[0-59]]" fill />
                    </FormContainer>
                    <FormContainer label="Phone">
                        <MaskedInput mask="(999) 999-9999" fill />
                    </FormContainer>
                    <FormContainer label="Color">
                        <MaskedInput mask="#000000" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormContainer label="99999">
                        <MaskedInput mask="99999" fill />
                    </FormContainer>
                    <FormContainer label="aaaaa">
                        <MaskedInput mask="aaaaa" fill />
                    </FormContainer>
                    <FormContainer label="nnnnn">
                        <MaskedInput mask="nnnnn" fill />
                    </FormContainer>
                    <FormContainer label="[[0-23]]00000">
                        <MaskedInput mask="[[0-23]]00000" fill />
                    </FormContainer>
                    <FormContainer label="99aa99aa99aa">
                        <MaskedInput mask="99aa99aa99aa" fill />
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
