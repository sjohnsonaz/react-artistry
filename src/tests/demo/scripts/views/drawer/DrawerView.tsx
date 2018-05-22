import * as React from 'react';

import { Button, Form, FormAction, FormContainer, Drawer, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface IDrawerViewProps {

}

export interface IDrawerViewState {
    drawerOpen: boolean;
}

export default class DrawerView extends React.Component<IDrawerViewProps, IDrawerViewState> {
    constructor(props?: IDrawerViewProps) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    openDrawer = () => {
        this.setState({ drawerOpen: true });
    }

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
    }

    render() {
        return (
            <Section header="Drawer" space>
                <Button onClick={this.openDrawer}>Open Drawer</Button>
                <Drawer open={this.state.drawerOpen} onClose={this.closeDrawer} lockScroll>
                    <Button onClick={this.closeDrawer} className="pull-right">Close</Button>
                    <p>Drawer Content</p>
                    <br />
                    <Form>
                        <FormContainer label="Input">
                            <input className="input" />
                        </FormContainer>
                        <FormAction>
                            <Button theme="primary">OK</Button>
                        </FormAction>
                    </Form>
                </Drawer>
            </Section>
        );
    }
}
