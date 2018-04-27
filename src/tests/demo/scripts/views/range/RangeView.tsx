import * as React from 'react';

import { Range, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface IRangeViewProps {

}

export default class RangeView extends React.Component<IRangeViewProps, any> {
    render() {
        return (
            <Section title="Range">
                <Range />
            </Section>
        );
    }
}
