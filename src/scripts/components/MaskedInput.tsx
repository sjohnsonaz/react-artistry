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
    selectionStart?: number;
    selectionEnd?: number;
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, IMaskedInputState> {
    inputRef: React.RefObject<HTMLInputElement> = React.createRef();
    command: boolean = false;

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            value
        } = this.props;

        this.state = {
            value: value,
            selectionStart: 0,
            selectionEnd: 0
        };
    }

    componentDidMount() {
        let {
            mask,
            value
        } = this.props;

        let clean = this.cleanValue(value);
        this.setState({
            value: this.formatClean(mask, clean, true)
        });
    }

    componentDidUpdate() {
        let input = this.inputRef.current;
        input.value = this.state.value;
        input.setSelectionRange(this.state.selectionStart, this.state.selectionEnd, 'none');
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            mask,
            value
        } = nextProps;
        if (this.props.value !== value) {
            this.updateValue(mask, value);
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();

        let {
            mask
        } = this.props;

        this.updateSelection(mask, event.target.value);
    }

    onBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
        this.command = false;
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();

        let {
            mask
        } = this.props;

        this.updateSelection(mask, (event.target as HTMLInputElement).value);
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();

        let {
            mask
        } = this.props;

        this.updateSelection(mask, (event.target as HTMLInputElement).value);
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        let {
            mask
        } = this.props;

        this.updateValue(mask, (event.target as HTMLInputElement).value);
        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        //event.preventDefault();

        let {
            mask
        } = this.props;

        this.updateValue(mask, (event.target as HTMLInputElement).value);
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                this.deleteCharacter(this.props.mask, (event.target as HTMLInputElement).value, false);
                break;
            case 35: // End
                event.preventDefault();
                this.updateSelection(this.props.mask, (event.target as HTMLInputElement).value, KeyboardMovement.end);
                break;
            case 36: // Home
                event.preventDefault();
                this.updateSelection(this.props.mask, (event.target as HTMLInputElement).value, KeyboardMovement.home);
                break;
            case 37: // Left
                event.preventDefault();
                this.updateSelection(this.props.mask,
                    (event.target as HTMLInputElement).value,
                    this.command ? KeyboardMovement.home : KeyboardMovement.left);
                break;
            case 39: // Right
                event.preventDefault();
                this.updateSelection(this.props.mask,
                    (event.target as HTMLInputElement).value,
                    this.command ? KeyboardMovement.end : KeyboardMovement.right);
                break;
            case 46: // Delete
                event.preventDefault();
                this.deleteCharacter(this.props.mask, (event.target as HTMLInputElement).value, true);
                break;
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = true;
                break;
        }
    }

    onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = false;
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
                onChange={onChange || this.onChange}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
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

    getSelection() {
        let input = this.inputRef.current;
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }

    getVirtualSelection(mask: string) {
        let input = this.inputRef.current;
        return {
            start: this.getVirtualPosition(mask, input.selectionStart),
            end: this.getVirtualPosition(mask, input.selectionEnd)
        };
    }

    cleanValue(value: string) {
        if (typeof value === 'string') {
            return value.replace(/[\W_]+/g, "");
        } else {
            return '';
        }
    }

    cleanValueWithSpaces(value: string) {
        if (typeof value === 'string') {
            let clean = value.replace(/[\W]+/g, "");
            let length = clean.replace(/[_]/g, ' ').trim().length;
            return clean.substring(0, length);
        } else {
            return '';
        }
    }

    formatClean(mask: string, clean: string, allowLessValid: boolean = false) {
        let cleanMask = this.cleanValue(mask);

        let diff = Diff.compare(cleanMask.split('').reverse().join(''), clean.split('').reverse().join(''), compareChars);

        let lcs = createLCS(diff);
        if (!allowLessValid && lcs.length < clean.length) {
            throw 'Invalid Value';
        }

        let cleanSpaces = createSpaces(diff);

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (this.isValidCharacter(character)) {
                output += cleanSpaces[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }
        return output;
    }

    updateSelection(mask: string, value: string, keyboardMovement: KeyboardMovement = KeyboardMovement.none) {
        let clean = this.cleanValueWithSpaces(value);
        let virtualSelection = this.getVirtualSelection(mask);
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
        this.setState({
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
        });
    }

    updateValue(mask: string, value: string) {
        let clean = this.cleanValue(value);
        try {
            let value = this.formatClean(mask, clean);

            let diff = Diff.compare(this.state.value, value);
            diff.reverse();
            let position = 0;
            for (let index = 0, length = diff.length; index < length; index++) {
                let diffItem = diff[index];
                if (diffItem.operation === -1) {

                }
                if (diffItem.operation === 0) {
                    position++;
                }
                if (diffItem.operation === 1) {
                    position++;
                    break;
                }
            }

            let virtualPosition = this.getVirtualPosition(mask, position);
            let selectionPosition = this.getMaskPosition(mask, virtualPosition);
            this.setState({
                value: value,
                selectionStart: selectionPosition,
                selectionEnd: selectionPosition
            });
        }
        catch (e) {
            // Rollback
            this.setState({
                value: this.state.value,
                selectionStart: this.state.selectionStart,
                selectionEnd: this.state.selectionEnd
            });
        }
    }

    deleteCharacter(mask: string, value: string, forward: boolean) {
        let clean = this.cleanValueWithSpaces(value);
        let virtualSelection = this.getVirtualSelection(mask);

        if (virtualSelection.start === virtualSelection.end) {
            let updatedClean = forward ?
                clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(mask, updatedClean, true);

            let selectionPosition = this.getMaskPosition(mask, forward ? virtualSelection.start : (virtualSelection.start - 1));
            this.setState({
                value: updatedValue,
                selectionStart: selectionPosition,
                selectionEnd: selectionPosition
            });
        } else {
            let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(mask, updatedClean, true);

            let selectionPosition = this.getMaskPosition(mask, Math.min(updatedClean.length, virtualSelection.start));
            this.setState({
                value: updatedValue,
                selectionStart: selectionPosition,
                selectionEnd: selectionPosition
            });
        }
    }
}

function compareChars(maskChar: string, valueChar: string) {
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

function createLCS<T>(diff: IDiffItem<T>[]) {
    var lcs = [];
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.item);
                break;
            case DiffOperation.REMOVE:
                break;
        }
    }
    return lcs.join('');
}

function createSpaces<T>(diff: IDiffItem<T>[]) {
    var lcs = [];
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.itemB);
                break;
            case DiffOperation.REMOVE:
                lcs.push('_');
                break;
        }
    }
    return lcs.join('');
}