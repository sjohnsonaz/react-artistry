import * as React from 'react';

import Button from './Button';

type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

var monthNames: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export interface ICalendarProps {
    date?: Date;
    onSelect?: (date: Date) => any;
}

export interface ICalendarState {
    month: number;
    year: number;
    date: Date;
}

export default class Calendar extends React.Component<ICalendarProps, any> {

    constructor(props?: ICalendarProps) {
        super(props);
        var date = this.props.date || new Date(Date.now());
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date
        };
    }

    increaseMonth = () => {
        this.setState({ month: (this.state.month + 1) % 12 });
    }

    decreaseMonth = () => {
        this.setState({ month: (this.state.month + 11) % 12 });
    }

    increaseYear = () => {
        this.setState({ year: this.state.year + 1 });
    }

    decreaseYear = () => {
        this.setState({ year: this.state.year - 1 });
    }

    selectDay = (day) => {
        if (this.props.onSelect) {
            this.props.onSelect(day);
        }
    }

    getDays(year: number, month: number) {
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);

        var days = [firstDay];
        for (var index = 2, length = lastDay.getDate(); index < length; index++) {
            days.push(new Date(year, month, index));
        }
        days.push(lastDay);

        return days;
    }

    getWeeks(year: number, month: number) {
        var days = this.getDays(year, month);

        var weeks: Date[][] = [];
        var week: Date[];

        if (days[0].getDay() !== 0) {
            week = [];
            weeks.push(week);
        }
        days.forEach(function (day) {
            if (day.getDay() === 0) {
                week = [];
                weeks.push(week);
            }
            week.push(day);
        });

        return weeks;
    }

    render() {
        var weeks = this.getWeeks(this.state.year, this.state.month);
        return (
            <div className="calendar">
                <div className="calendar-title">
                    <div className="calendar-year-title">
                        <Button className="calendar-year-down" onClick={this.decreaseYear} />
                        <strong className="calendar-year-name">{this.state.year}</strong>
                        <Button className="calendar-year-up" onClick={this.increaseYear} />
                    </div>
                    <div className="calendar-month-title">
                        <Button className="calendar-month-down" onClick={this.decreaseMonth} />
                        <strong className="calendar-month-name">{monthNames[this.state.month]}</strong>
                        <Button className="calendar-month-up" onClick={this.increaseMonth} />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>T</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map((week, index, array) => {
                            return (
                                <tr key={this.state.year + ' ' + this.state.month + ' ' + index}>
                                    {index === 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                    {week.map((day, index, array) => {
                                        var selected = this.props.date && this.props.date.getTime() === day.getTime();
                                        return (
                                            <td className={selected ? 'calendar-day-selected' : undefined} key={this.state.year + ' ' + this.state.month + ' ' + index}>
                                                <a onClick={this.selectDay.bind(this, day)}>{day.getDate()}</a>
                                            </td>
                                        );
                                    })}
                                    {index > 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
