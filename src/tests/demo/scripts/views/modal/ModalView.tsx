import * as React from 'react';

import { Button, ButtonBar, Modal, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface IModalViewProps {

}

export interface IModalViewState {
    modalOpen: boolean;
    modalLock: boolean;
    innerModalOpen: boolean;
}

export default class ModalView extends React.Component<IModalViewProps, IModalViewState> {
    constructor(props?: IModalViewProps) {
        super(props);
        this.state = {
            modalOpen: false,
            modalLock: false,
            innerModalOpen: false
        };
    }

    openModal = () => {
        this.setState({modalOpen :true});
    }

    closeModal = () => {
        this.setState({modalOpen :false});
    }

    openInnerModal = () => {
        this.setState({innerModalOpen : true});
    }

    closeInnerModal = () => {
        this.setState({innerModalOpen :false});
    }

    lockModal = () => {
        this.setState({modalLock : true});
        window.setTimeout(() => {
            this.setState({modalLock : false});
        }, 1000);
    }

    render() {
        return (
            <Section header="Modal" space>
                <Button onClick={this.openModal}>Open Modal</Button>
                <Modal open={this.state.modalOpen} onclose={this.closeModal} title="Modal" animation="top" lockable locked={this.state.modalLock} lockScroll>
                    <div>test</div>
                    <ButtonBar>
                        <Button onClick={this.openInnerModal}>Open Inner Modal</Button>
                        <Button onClick={this.lockModal}>Lock Modal</Button>
                    </ButtonBar>
                    <Modal open={this.state.innerModalOpen} onclose={this.closeInnerModal} title="Inner Modal" animation="center">
                        <div>inner test</div>
                    </Modal>
                </Modal>
            </Section>
        );
    }
}
