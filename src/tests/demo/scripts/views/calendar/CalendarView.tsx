import * as React from 'react';

import { DatePicker, FormContainer, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ICalendarViewProps {

}

export default class CalendarView extends React.Component<ICalendarViewProps, any> {
    render() {
        return (
            <Section header="Calendar" space>
                <FormContainer label="Calendar">
                    <DatePicker date={new Date(Date.now())} onSelect={() => { }} />
                </FormContainer>
            </Section>
        );
    }
}
