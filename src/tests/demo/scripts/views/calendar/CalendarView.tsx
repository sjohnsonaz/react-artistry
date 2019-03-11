import * as React from 'react';

import { DatePicker, FormContainer, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ICalendarViewProps {

}
export interface ICalendarViewState {
    date?: Date;
}
export default class CalendarView extends React.Component<ICalendarViewProps, any> {
    state: ICalendarViewState = {
        date: undefined
    };

    render() {
        return (
            <Section header="Calendar" space>
                <FormContainer label="Calendar">
                    <DatePicker date={this.state.date} onSelect={(date) => {
                        this.setState({
                            date: date
                        });
                    }} />
                </FormContainer>
            </Section>
        );
    }
}
