import * as React from 'react';

import { Button, Form, FormActions, FormContainer, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface IFormViewProps {

}

export default class FormView extends React.Component<IFormViewProps, any> {
    render() {
        return (
            <Section title="Form">
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
                    <FormContainer title="Value">
                        <input type="text" className="input" />
                    </FormContainer>
                    <FormActions>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </FormActions>
                </Form>
            </Section>
        );
    }
}
