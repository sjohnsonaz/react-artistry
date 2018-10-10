import * as React from 'react';

import { Button, Form, FormAction, FormContainer, FormDivider, FormInput, Section, MaskedInput } from '../../../../../scripts/modules/ArtistryReact';

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
                    <FormContainer label="Value">
                        <MaskedInput mask="(999) 999-9999" fill />
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
