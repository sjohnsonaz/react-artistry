import * as React from 'react';

import { Section, Toggle } from '../../../../../scripts/modules/ReactArtistry';

export interface IToggleViewProps {

}

export default class ToggleView extends React.Component<IToggleViewProps, any> {
    render() {
        return (
            <Section title="Toggle">
                <Toggle />
            </Section>
        );
    }
}
