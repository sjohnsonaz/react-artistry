import * as React from 'react';
import FormInput, { IFormInputProps } from './FormInput';

import Mask from '../util/Mask';

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
    pattern?: string;
    regex?: RegExp;
    firstPosition?: number;
    patternLength?: number;
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, IMaskedInputState> {
    inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            mask,
            value
        } = this.props;

        let regex = Mask.createRegexWithWhitespace(mask);

        this.state = {
            regex: regex,
            value: Mask.formatPattern(mask, value || ''),
            pattern: Mask.createRegexText(mask),
            firstPosition: Mask.getPosition(mask, 0),
            patternLength: mask.replace(/\W+/g, "").length
        };
    }

    componentDidMount() {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        Mask.updateValue(input, mask);
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            mask,
            value
        } = nextProps;
        if (this.props.mask !== mask) {
            let regex = Mask.createRegexWithWhitespace(mask);
            this.setState({
                regex: regex,
                value: Mask.formatPattern(mask, value || ''),
                pattern: Mask.createRegexText(mask),
                firstPosition: Mask.getPosition(mask, 0),
                patternLength: mask.replace(/\W+/g, "").length
            });
        } else {
            this.setState({
                value: Mask.formatPattern(mask, value || ''),
            });
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        Mask.updateSelection(input, mask);
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        Mask.updateSelection(input, mask);
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        Mask.updateValue(input, mask);
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        let input = this.inputRef.current;
        let value: string;
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                Mask.deleteCharacter(this.inputRef.current, this.props.mask, false);
                break;
            case 35: // End
            case 36: // Home
            case 37: // Left
            case 39: // Right
                Mask.updateSelection(this.inputRef.current, this.props.mask);
                break;
            case 46: // Delete
                event.preventDefault();
                Mask.deleteCharacter(this.inputRef.current, this.props.mask, true);
                break;
        }
    }

    render() {
        let {
            id,
            className,
            value,
            fill,
            onChange,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <input
                ref={this.inputRef}
                id={id}
                className={classNames.join(' ')}
                onFocus={this.onFocus}
                onClick={this.onClick}
                onChange={onChange || this.onChange}
                onKeyDown={this.onKeyDown}
                {...props}
            />
        );
    }
}
