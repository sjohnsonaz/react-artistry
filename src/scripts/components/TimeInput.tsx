import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface ITimeInputProps extends React.HTMLProps<HTMLInputElement> {
    onChange?: (event: React.FormEvent<HTMLInputElement>, date?: Date) => (void | boolean);
    value?: string;
    seconds?: boolean;
}

export interface ITimeInputState {
    value?: Date;
    timeString?: string;
}

export default class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {
    constructor(props: ITimeInputProps, context?: any) {
        super(props, context);
        let {
            value
        } = this.props;

        let date = new Date(value);

        this.state = {
            value: date,
            timeString: date.toTimeString()
        };
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            let value = (event.target as any).value;
            let date = new Date(this.props.value);
            let parts = value.split(':').map(part => parseInt(part));
            if (parts) {
                if (this.props.seconds) {
                    date.setHours(parts[0], parts[1], parts[2]);
                } else {
                    date.setHours(parts[0], parts[1], 0);
                }
            }
            this.props.onChange(event, date);
        }
    }

    render() {
        let {
            seconds,
            onChange,
            ...props
        } = this.props;
        let mask: string;
        if (seconds) {
            mask = '[[0-23]]:[[0-59]]:[[0-59]]';
        } else {
            mask = '[[0-23]]:[[0-59]]';
        }
        return (
            <MaskedInput
                {...props as any}
                mask={mask}
                value={this.state.timeString}
                onChange={this.onChange}
            />
        );
    }
}