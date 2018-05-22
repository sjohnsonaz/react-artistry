import * as React from 'react';

import { Section, Toggle } from '../../../../../scripts/modules/ArtistryReact';

export interface IToggleViewProps {

}

export default class ToggleView extends React.Component<IToggleViewProps, any> {
    render() {
        return (
            <Section header="Toggle" space>
                <Toggle />
            </Section>
        );
    }
}
