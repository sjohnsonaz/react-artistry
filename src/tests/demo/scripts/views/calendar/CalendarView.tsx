import * as React from 'react';

import { DatePicker, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface ICalendarViewProps {

}

export default class CalendarView extends React.Component<ICalendarViewProps, any> {
    render() {
        return (
            <Section title="Calendar">
                <DatePicker date={new Date(Date.now())} onSelect={() => { }} />
            </Section>
        );
    }
}
