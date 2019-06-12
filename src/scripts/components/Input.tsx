import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface IInputProps<T = any> extends React.HTMLProps<HTMLInputElement> {
    fill?: boolean;
    mask?: string;
    displaySize?: 'default' | 'small' | 'large';
}

export default class Input<T = any> extends React.Component<IInputProps<T>, any> {
    render() {
        let {
            id,
            className,
            fill,
            mask,
            displaySize,
            ...props
        } = this.props;

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
                    mask={mask}
                    {...props as any}
                />
            );
        } else {
            return (
                <input
                    id={id}
                    className={classNames.join(' ')}
                    {...props}
                />
            );
        }
    }
}
