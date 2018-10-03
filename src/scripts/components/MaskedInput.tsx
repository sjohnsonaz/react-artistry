import * as React from 'react';
import FormInput, { IFormInputProps } from './FormInput';

export interface IMaskedInputProps<T> extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    className?: string;
    mask: string;
    fill?: boolean;
    model?: T;
    modelProp?: keyof T;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => (void | boolean);
    value?: any;
}

export interface IMaskedInputState {
    value?: string;
    maskedValue?: string;
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, IMaskedInputState> {
    state = {

    } as IMaskedInputState;

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            model,
            modelProp
        } = nextProps;
        let value: string;
        if (model && modelProp) {
            value = '' + model[modelProp];
        } else {
            value = '' + nextProps.value;
        }
        value += 'abcd';
        this.setState({
            value: value
        });
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        let { model, modelProp } = this.props;
        if (model && modelProp) {
            model[modelProp] = (event.target as HTMLInputElement).value as any;
        }
    }

    render() {
        let {
            id,
            className,
            value,
            fill,
            model,
            modelProp,
            onInput,
            ...props
        } = this.props;
        let renderedValue: string;
        if (model && modelProp) {
            renderedValue = model[modelProp] as any;
        } else {
            renderedValue = value as string;
        }

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <input
                id={id}
                className={classNames.join(' ')}
                value={renderedValue}
                onInput={onInput || this.onInput}
                {...props}
            />
        );
    }
}
