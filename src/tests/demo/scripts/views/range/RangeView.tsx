import * as React from 'react';

import { Range, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface IRangeViewProps {

}

export default class RangeView extends React.Component<IRangeViewProps, any> {
    render() {
        return (
            <Section header="Range" space>
                <Range />
            </Section>
        );
    }
}
