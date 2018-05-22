import * as React from 'react';

import { DatePicker, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ICalendarViewProps {

}

export default class CalendarView extends React.Component<ICalendarViewProps, any> {
    render() {
        return (
            <Section header="Calendar">
                <DatePicker date={new Date(Date.now())} onSelect={() => { }} />
            </Section>
        );
    }
}
