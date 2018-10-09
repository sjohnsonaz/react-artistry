import * as React from 'react';
import FormInput, { IFormInputProps } from './FormInput';

export interface IMaskedInputProps<T> extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    className?: string;
    mask: string;
    fill?: boolean;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => (void | boolean);
    value?: any;
}

export interface IMaskedInputState {
    value?: string;
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, IMaskedInputState> {
    state = {
        value: this.props.value
    } as IMaskedInputState;

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            value
        } = nextProps;
        //value += 'abcd';
        this.setState({
            value: value
        });
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        let target = event.target as HTMLInputElement;
        let value = target.value;
        value += 'abcd';
        target.value = value;
    }

    render() {
        let {
            id,
            className,
            value,
            fill,
            onInput,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <input
                id={id}
                className={classNames.join(' ')}
                value={this.props.value}
                onInput={onInput || this.onInput}
                {...props}
            />
        );
    }
}
