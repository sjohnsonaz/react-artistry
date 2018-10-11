import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface IFormInputProps<T = any> extends React.HTMLProps<HTMLInputElement> {
    fill?: boolean;
    mask?: string;
    model?: T;
    modelProp?: keyof T;
}

export default class FormInput<T = any> extends React.Component<IFormInputProps<T>, any> {
    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
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
            mask,
            model,
            modelProp,
            onChange,
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

        if (mask) {
            return (
                <MaskedInput
                    id={id}
                    className={classNames.join(' ')}
                    value={renderedValue}
                    onChange={onChange || this.onChange}
                    mask={mask}
                    {...props as any}
                />
            );
        } else {
            return (
                <input
                    id={id}
                    className={classNames.join(' ')}
                    value={renderedValue}
                    onChange={onChange || this.onChange}
                    {...props}
                />
            );
        }
    }
}
