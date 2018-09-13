import * as React from 'react';

import { FileUpload, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ITableViewProps {

}

export default class TableView extends React.Component<ITableViewProps, any> {
    upload = async (files: FileList) => {
        console.log('files:', files);
        return undefined;
    }
    render() {
        return (
            <Section
                header="File Upload"
                space
            >
                <FileUpload onUpload={this.upload} />
            </Section>
        );
    }
}
