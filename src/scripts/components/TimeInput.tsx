import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface ITimeInputProps extends React.HTMLProps<HTMLInputElement> {
    onChange?: (event: React.FormEvent<HTMLInputElement>) => (void | boolean);
    value?: string;
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

    render() {
        let {
            ...props
        } = this.props;
        return (
            <MaskedInput
                mask="[[0-23]]:[[0-59]]"
                value={this.state.timeString}
                {...props as any}
            />
        );
    }
}