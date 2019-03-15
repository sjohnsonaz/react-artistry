import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface IInputProps<T = any> extends React.HTMLProps<HTMLInputElement> {
    number?: boolean;
    fill?: boolean;
    mask?: string;
    model?: T;
    modelProp?: keyof T;
    displaySize?: 'default' | 'small' | 'large';
}

export default class Input<T = any> extends React.Component<IInputProps<T>, any> {
    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        let { number, model, modelProp } = this.props;
        if (model && modelProp) {
            let value = (event.target as HTMLInputElement).value;
            if (number) {
                value = parseFloat(value) as any;
            }
            model[modelProp] = value as any;
        }
        if (this.props.onChange) {
            this.props.onChange(event);
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
            displaySize,
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

        switch (displaySize) {
            case 'small':
                classNames.push('input-small');
                break;
            case 'large':
                classNames.push('input-large');
                break;
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
