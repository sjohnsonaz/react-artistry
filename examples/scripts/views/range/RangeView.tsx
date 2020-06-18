import * as React from 'react';

import { Range, Section } from '@artistry-react';

export interface IRangeViewProps {

}

export default class RangeView extends React.Component<IRangeViewProps, any> {
    render() {
        return (
            <Section header="Range" space headerSpace>
                <Range />
            </Section>
        );
    }
}
