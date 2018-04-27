import * as React from 'react';

import { ProgressBar, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends React.Component<IProgressBarViewProps, any> {
    render() {
        return (
            <Section title="Progress Bar">
                <ProgressBar value={50} />
            </Section>
        );
    }
}
