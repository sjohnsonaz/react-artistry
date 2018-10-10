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
    //value?: string;
    pattern?: string;
    regex?: RegExp;
    //firstPosition?: number;
    //patternLength?: number;
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, IMaskedInputState> {
    inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            mask,
            value
        } = this.props;

        let regex = MaskedInput.createRegexWithWhitespace(mask);

        this.state = {
            regex: regex,
            //value: MaskedInput.formatPattern(mask, value || ''),
            pattern: MaskedInput.createRegexText(mask)
            //firstPosition: MaskedInput.getPosition(mask, 0),
            //patternLength: mask.replace(/\W+/g, "").length
        };
    }

    componentDidMount() {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        MaskedInput.updateValue(input, mask);
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            mask,
            value
        } = nextProps;
        if (this.props.mask !== mask) {
            let regex = MaskedInput.createRegexWithWhitespace(mask);
            this.setState({
                regex: regex,
                //value: MaskedInput.formatPattern(mask, value || ''),
                pattern: MaskedInput.createRegexText(mask)
                //firstPosition: MaskedInput.getPosition(mask, 0),
                //patternLength: mask.replace(/\W+/g, "").length
            });
        } else {
            if (this.props.value !== nextProps.value) {
                this.inputRef.current.value = MaskedInput.formatClean(mask, value || '');
            }
            this.setState({
                //value: MaskedInput.formatPattern(mask, value || ''),
            });
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        MaskedInput.updateSelection(input, mask);
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        MaskedInput.updateSelection(input, mask);
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        MaskedInput.updateSelection(input, mask);
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        let input = this.inputRef.current;

        let {
            mask
        } = this.props;

        MaskedInput.updateValue(input, mask);
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
                MaskedInput.deleteCharacter(this.inputRef.current, this.props.mask, false);
                break;
            case 35: // End
                event.preventDefault();
                MaskedInput.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.end);
                break;
            case 36: // Home
                event.preventDefault();
                MaskedInput.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.home);
                break;
            case 37: // Left
                event.preventDefault();
                MaskedInput.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.left);
                break;
            case 39: // Right
                event.preventDefault();
                MaskedInput.updateSelection(this.inputRef.current, this.props.mask, KeyboardMovement.right);
                break;
            case 46: // Delete
                event.preventDefault();
                MaskedInput.deleteCharacter(this.inputRef.current, this.props.mask, true);
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
                {...props}
            />
        );
    }

    static createRegexWithWhitespace(mask: string) {
        let cleanMask = MaskedInput.cleanValue(mask);
        return new RegExp(cleanMask.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function (match, other, numeric, alpha, alphanumeric, hexadecimal) {
            if (other) {
                return '\\' + other;
            }
            if (numeric) {
                return '[0-9 ]';
            }
            if (alpha) {
                return '[a-zA-Z ]';
            }
            if (alphanumeric) {
                return '[0-9a-zA-Z ]';
            }
            if (hexadecimal) {
                return '[0-9a-fA-F ]';
            }
        }), 'g');
    }

    static createRegexText(mask: string) {
        return mask.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function (match, other, numeric, alpha, alphanumeric, hexadecimal) {
            if (other) {
                return '\\' + other;
            }
            if (numeric) {
                return '[0-9]';
            }
            if (alpha) {
                return '[a-zA-Z]';
            }
            if (alphanumeric) {
                return '[0-9a-zA-Z]';
            }
            if (hexadecimal) {
                return '[0-9a-fA-F]';
            }
        });
    }

    static formatClean(mask: string, clean: string, flexible: boolean = true) {
        //let cleanMask = MaskedInput.cleanValue(mask);
        //let diff = Diff.compare(clean, cleanMask, compareChars);
        //clean = createLCS(diff, flexible);
        //console.log(createDiff(diff, true));

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (MaskedInput.isValidCharacter(character)) {
                output += clean[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }
        return output;
    }

    static cleanValue(value: string) {
        if (typeof value === 'string') {
            return value.replace(/\W+/g, "");
        } else {
            return '';
        }
    }

    static isValidCharacter(character: string, placeholder: boolean = false) {
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

    static getVirtualPosition(mask: string, position: number) {
        position = Math.min(position, mask.length);
        var valuePosition = 0;
        for (var index = 0; index < position; index++) {
            var character = mask[index];
            if (MaskedInput.isValidCharacter(character)) {
                valuePosition++;
            }
        }
        return valuePosition;
    }

    static getMaskPosition(mask: string, position: number) {
        var valueIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (MaskedInput.isValidCharacter(character)) {
                valueIndex++;
                if (valueIndex > position) {
                    break;
                }
            }
        }
        return index;
    }

    static getSelection(element: HTMLInputElement) {
        return {
            start: element.selectionStart,
            end: element.selectionEnd,
            direction: element.selectionDirection
        };
    }

    static getVirtualSelection(element: HTMLInputElement, mask: string) {
        return {
            start: MaskedInput.getVirtualPosition(mask, element.selectionStart),
            end: MaskedInput.getVirtualPosition(mask, element.selectionEnd),
            direction: element.selectionDirection
        };
    }

    static initValue(element: HTMLInputElement, mask: string, value: string) {
        let clean = MaskedInput.cleanValue(value);
        element.value = MaskedInput.formatClean(mask, clean);
    }

    static updateSelection(element: HTMLInputElement, mask: string, keyboardMovement: KeyboardMovement = KeyboardMovement.none) {
        let clean = MaskedInput.cleanValue(element.value);
        let virtualSelection = MaskedInput.getVirtualSelection(element, mask);
        let selectionStart: number;
        let selectionEnd: number;
        switch (keyboardMovement) {
            case KeyboardMovement.none:
                selectionStart = MaskedInput.getMaskPosition(mask, Math.min(clean.length, virtualSelection.start));
                selectionEnd = MaskedInput.getMaskPosition(mask, Math.min(clean.length, virtualSelection.end));
                break;
            case KeyboardMovement.home:
                selectionStart = MaskedInput.getMaskPosition(mask, 0);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.end:
                selectionStart = MaskedInput.getMaskPosition(mask, clean.length);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.left:
                selectionStart = MaskedInput.getMaskPosition(mask, virtualSelection.start - 1);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.right:
                selectionStart = MaskedInput.getMaskPosition(mask, Math.min(clean.length, virtualSelection.start + 1));
                selectionEnd = selectionStart;
                break;
        }
        element.setSelectionRange(selectionStart, selectionEnd, 'none');
    }

    static updateValue(element: HTMLInputElement, mask: string) {
        let clean = MaskedInput.cleanValue(element.value);
        let virtualSelection = MaskedInput.getVirtualSelection(element, mask);
        let selectionPosition = MaskedInput.getMaskPosition(mask, virtualSelection.start);
        element.value = MaskedInput.formatClean(mask, clean);
        element.setSelectionRange(selectionPosition, selectionPosition, 'none');
    }

    static deleteCharacter(element: HTMLInputElement, mask: string, forward: boolean) {
        let clean = MaskedInput.cleanValue(element.value);
        let virtualSelection = MaskedInput.getVirtualSelection(element, mask);

        if (virtualSelection.start === virtualSelection.end) {
            let updatedClean = forward ?
                clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
            let updatedValue = MaskedInput.formatClean(mask, updatedClean);

            element.value = updatedValue;
            let selectionPosition = MaskedInput.getMaskPosition(mask, forward ? virtualSelection.start : (virtualSelection.start - 1));
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        } else {
            let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
            let updatedValue = MaskedInput.formatClean(mask, updatedClean);

            element.value = updatedValue;
            let selectionPosition = MaskedInput.getMaskPosition(mask, Math.min(updatedClean.length, virtualSelection.start));
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