import * as React from 'react';

import { ProgressBar, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends React.Component<IProgressBarViewProps, any> {
    render() {
        return (
            <Section header="Progress Bar" space>
                <ProgressBar value={50} />
            </Section>
        );
    }
}
