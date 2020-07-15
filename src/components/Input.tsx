import * as React from 'react';
import MaskedInput from './MaskedInput';
import ClassNames from 'util/ClassNames';
import { InputStyle } from 'abstract';

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
    fill?: boolean;
    mask?: string;
    displaySize?: 'default' | 'small' | 'large';
}

export default class Input extends React.Component<IInputProps, any> {
    render() {
        let {
            id,
            className,
            fill,
            mask,
            displaySize,
            ...props
        } = this.props;

        let classNames = new ClassNames(InputStyle.Input, className);

        if (fill) {
            classNames.add('fill-width');
        }

        let _displaySize: string;
        switch (displaySize) {
            case 'small':
                _displaySize = 'input-small';
                break;
            case 'large':
                _displaySize = 'input-large';
                break;
        }

        if (mask) {
            return (
                <MaskedInput
                    id={id}
                    className={classNames.toString()}
                    data-size={_displaySize}
                    mask={mask}
                    {...props as any}
                />
            );
        } else {
            return (
                <input
                    id={id}
                    className={classNames.toString()}
                    data-size={_displaySize}
                    {...props}
                />
            );
        }
    }
}
