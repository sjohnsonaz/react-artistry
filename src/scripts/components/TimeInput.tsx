import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface ITimeInputProps<T = any> extends React.HTMLProps<HTMLInputElement> {
    onChange?: (event: React.FormEvent<HTMLInputElement>, date?: Date) => (void | boolean);
    seconds?: boolean;
    value?: string;
    fill?: boolean;
    model?: T;
    modelProp?: keyof T;
}

export interface ITimeInputState {
}

export default class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
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
        let { model, modelProp } = this.props;
        if (model && modelProp) {
            model[modelProp] = (event.target as HTMLInputElement).value as any;
        }
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    render() {
        let {
            seconds,
            fill,
            model,
            modelProp,
            onChange,
            value,
            ...props
        } = this.props;

        let renderedValue: string;
        if (model && modelProp) {
            renderedValue = model[modelProp] as any;
        } else {
            renderedValue = value as string;
        }
        let date = new Date(renderedValue);

        let timeString = date.toTimeString();

        let mask: string;
        if (seconds) {
            timeString = timeString.substr(0, 8);
            mask = '[[0-23]]:[[0-59]]:[[0-59]]';
        } else {
            timeString = timeString.substr(0, 5);
            mask = '[[0-23]]:[[0-59]]';
        }

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <MaskedInput
                {...props as any}
                className={classNames.join(' ')}
                mask={mask}
                value={timeString}
                onChange={this.onChange}
            />
        );
    }
}