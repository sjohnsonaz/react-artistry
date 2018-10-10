import * as React from 'react';
import Diff, { IDiffItem, DiffOperation } from '@cascade/diff';

//import FormInput, { IFormInputProps } from './FormInput';

export enum KeyboardMovement {
    none,
    home,
    end,
    left,
    right
}

export enum ValidCharacter {
    placeholder = '_',
    alpha = 'a',
    number = '9',
    alphanumeric = 'n',
    hexadecimal = '0'
}
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
    inputRef: React.RefObject<HTMLInputElement> = React.createRef();
    value: string = this.props.value;

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            mask,
            value
        } = this.props;

        this.state = {
        };
    }

    componentDidMount() {
        let input = this.inputRef.current;

        let {
            mask,
            value
        } = this.props;

        this.initValue(input, mask, value);
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            mask,
            value
        } = nextProps;
        if (this.props.mask !== mask) {
            this.setState({
            });
        } else {
            if (this.props.value !== value) {
                this.updateValue(this.inputRef.current, value);
            }
            this.setState({
            });
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        this.updateSelection(input, mask);
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        this.updateSelection(input, mask);
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        this.updateSelection(input, mask);
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        this.updateValue(input, mask);
        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
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
                this.deleteCharacter(this.inputRef.current, this.props.mask, false);
                break;
            case 35: // End
                event.preventDefault();
                this.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.end);
                break;
            case 36: // Home
                event.preventDefault();
                this.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.home);
                break;
            case 37: // Left
                event.preventDefault();
                this.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.left);
                break;
            case 39: // Right
                event.preventDefault();
                this.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.right);
                break;
            case 46: // Delete
                event.preventDefault();
                this.deleteCharacter(this.inputRef.current, this.props.mask, true);
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
                onSelect={this.onSelect}
                onInput={this.onInput}
                onChange={onChange || this.onChange}
                onKeyDown={this.onKeyDown}
                {...props}
            />
        );
    }

    isValidCharacter(character: string, placeholder: boolean = false) {
        switch (character) {
            case ValidCharacter.number:
            case ValidCharacter.alpha:
            case ValidCharacter.alphanumeric:
            case ValidCharacter.hexadecimal:
                return true;
            case ValidCharacter.placeholder:
                if (placeholder) {
                    return true;
                } else {
                    return false;
                }
            default:
                return false;
        }
    }

    getVirtualPosition(mask: string, position: number) {
        position = Math.min(position, mask.length);
        var valuePosition = 0;
        for (var index = 0; index < position; index++) {
            var character = mask[index];
            if (this.isValidCharacter(character)) {
                valuePosition++;
            }
        }
        return valuePosition;
    }

    getMaskPosition(mask: string, position: number) {
        var valueIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (this.isValidCharacter(character)) {
                valueIndex++;
                if (valueIndex > position) {
                    break;
                }
            }
        }
        return index;
    }

    getSelection(element: HTMLInputElement) {
        return {
            start: element.selectionStart,
            end: element.selectionEnd,
            direction: element.selectionDirection
        };
    }

    getVirtualSelection(element: HTMLInputElement, mask: string) {
        return {
            start: this.getVirtualPosition(mask, element.selectionStart),
            end: this.getVirtualPosition(mask, element.selectionEnd),
            direction: element.selectionDirection
        };
    }

    cleanValue(value: string) {
        if (typeof value === 'string') {
            return value.replace(/\W+/g, "");
        } else {
            return '';
        }
    }

    formatClean(mask: string, clean: string, allowLessValid: boolean = true) {
        let cleanMask = this.cleanValue(mask);
        let diff = Diff.compare(clean, cleanMask, compareChars);
        let lcs = createLCS(diff, false);
        if (lcs.length < clean.length) {
            throw 'Invalid Value';
        }

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (this.isValidCharacter(character)) {
                output += clean[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }
        return output;
    }

    updateSelection(element: HTMLInputElement, mask: string, keyboardMovement: KeyboardMovement = KeyboardMovement.none) {
        let clean = this.cleanValue(element.value);
        let virtualSelection = this.getVirtualSelection(element, mask);
        let selectionStart: number;
        let selectionEnd: number;
        switch (keyboardMovement) {
            case KeyboardMovement.none:
                selectionStart = this.getMaskPosition(mask, Math.min(clean.length, virtualSelection.start));
                selectionEnd = this.getMaskPosition(mask, Math.min(clean.length, virtualSelection.end));
                break;
            case KeyboardMovement.home:
                selectionStart = this.getMaskPosition(mask, 0);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.end:
                selectionStart = this.getMaskPosition(mask, clean.length);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.left:
                selectionStart = this.getMaskPosition(mask, virtualSelection.start - 1);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.right:
                selectionStart = this.getMaskPosition(mask, Math.min(clean.length, virtualSelection.start + 1));
                selectionEnd = selectionStart;
                break;
        }
        element.setSelectionRange(selectionStart, selectionEnd, 'none');
    }

    initValue(element: HTMLInputElement, mask: string, value: string) {
        let clean = this.cleanValue(value);
        let updatedValue = this.formatClean(mask, clean, true);
        this.value = updatedValue;
        element.value = updatedValue;
    }

    updateValue(element: HTMLInputElement, mask: string) {
        let clean = this.cleanValue(element.value);
        try {
            let value = this.formatClean(mask, clean);
            let virtualSelection = this.getVirtualSelection(element, mask);
            let selectionPosition = this.getMaskPosition(mask, virtualSelection.start);

            this.value = value;
            element.value = value;
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        }
        catch (e) {
            // Rollback
            let diff = Diff.compare(clean.split('').reverse().join(''), this.cleanValue(this.value).split('').reverse().join(''));
            let rollbackPosition = 0;
            for (let index = 0, length = diff.length; index < length; index++) {
                let diffItem = diff[index];
                if (diffItem.operation !== DiffOperation.NONE) {
                    rollbackPosition = index;
                    break;
                }
            }
            let selectionPosition = this.getMaskPosition(mask, rollbackPosition);

            element.value = this.value;
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        }
    }

    deleteCharacter(element: HTMLInputElement, mask: string, forward: boolean) {
        let clean = this.cleanValue(element.value);
        let virtualSelection = this.getVirtualSelection(element, mask);

        if (virtualSelection.start === virtualSelection.end) {
            let updatedClean = forward ?
                clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(mask, updatedClean, true);

            this.value = updatedValue;
            element.value = updatedValue;
            let selectionPosition = this.getMaskPosition(mask, forward ? virtualSelection.start : (virtualSelection.start - 1));
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        } else {
            let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(mask, updatedClean, true);

            this.value = updatedValue;
            element.value = updatedValue;
            let selectionPosition = this.getMaskPosition(mask, Math.min(updatedClean.length, virtualSelection.start));
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        }
    }
}

function compareChars(valueChar: string, maskChar: string) {
    switch (maskChar) {
        case '9':
            return !!valueChar.match(/[0-9]/);
        case 'a':
            return !!valueChar.match(/[a-zA-Z ]/);
        case 'n':
            return !!valueChar.match(/[0-9a-zA-Z ]/);
        case '0':
            return !!valueChar.match(/[0-9a-fA-F ]/);
    }
}

function createDiff<T>(diff: IDiffItem<T>[], showBlanks: boolean = false) {
    diff.reverse();
    var lcs = [];
    let blank: boolean = false;
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                lcs.push('(+' + diffItem.item + ')');
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.item);
                blank = false;
                break;
            case DiffOperation.REMOVE:
                lcs.push('(-' + diffItem.item + ')');
                break;
        }
    }
    return lcs.join('');
}

function createLCS<T>(diff: IDiffItem<T>[], showBlanks: boolean = false) {
    diff.reverse();
    var lcs = [];
    let blank: boolean = false;
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.item);
                blank = false;
                break;
            case DiffOperation.REMOVE:
                if (showBlanks) {
                    if (!blank) {
                        lcs.push('_');
                    }
                    //blank = true;
                }
                break;
        }
    }
    return lcs.join('');
}