import * as React from 'react';
import Diff from '@cascade/diff';
import Mask, { ISelection } from '../util/Mask';

export enum KeyboardMovement {
    none,
    home,
    end,
    left,
    right
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
    mask: Mask;

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            value
        } = this.props;

        this.mask = new Mask(this.props.mask);

        this.state = {
            value: value,
            selectionStart: 0,
            selectionEnd: 0
        };
    }

    componentDidMount() {
        let {
            value
        } = this.props;

        this.setState({
            value: this.mask.formatClean(Mask.cleanValue(value), true)
        });
    }

    componentDidUpdate() {
        let input = this.inputRef.current;
        input.value = this.state.value;
        input.setSelectionRange(this.state.selectionStart, this.state.selectionEnd, 'none');
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>, nextContext: any): void {
        let {
            value
        } = nextProps;
        if (this.props.value !== value) {
            this.updateValue(value);
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateSelection(event.target.value);
    }

    onBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
        this.command = false;
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateSelection((event.target as HTMLInputElement).value);
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateSelection((event.target as HTMLInputElement).value);
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateValue((event.target as HTMLInputElement).value);
        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        //event.preventDefault();
        this.updateValue((event.target as HTMLInputElement).value);
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                this.deleteCharacter((event.target as HTMLInputElement).value, false);
                break;
            case 35: // End
                event.preventDefault();
                this.updateSelection((event.target as HTMLInputElement).value, KeyboardMovement.end);
                break;
            case 36: // Home
                event.preventDefault();
                this.updateSelection((event.target as HTMLInputElement).value, KeyboardMovement.home);
                break;
            case 37: // Left
                event.preventDefault();
                this.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.command ? KeyboardMovement.home : KeyboardMovement.left);
                break;
            case 39: // Right
                event.preventDefault();
                this.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.command ? KeyboardMovement.end : KeyboardMovement.right);
                break;
            case 46: // Delete
                event.preventDefault();
                this.deleteCharacter((event.target as HTMLInputElement).value, true);
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

    getSelection(): ISelection {
        let input = this.inputRef.current;
        return {
            start: input.selectionStart,
            end: input.selectionEnd,
            direction: input.selectionDirection as any
        };
    }

    updateSelection(value: string, keyboardMovement: KeyboardMovement = KeyboardMovement.none) {
        let clean = Mask.cleanValueWithSpaces(value);
        let selection = this.getSelection();
        let virtualSelection = this.mask.getVirtualSelection(selection);
        let selectionStart: number;
        let selectionEnd: number;
        switch (keyboardMovement) {
            case KeyboardMovement.none:
                selectionStart = this.mask.getMaskPosition(Math.min(clean.length, virtualSelection.start));
                selectionEnd = this.mask.getMaskPosition(Math.min(clean.length, virtualSelection.end));
                break;
            case KeyboardMovement.home:
                selectionStart = this.mask.getMaskPosition(0);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.end:
                selectionStart = this.mask.getMaskPosition(clean.length);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.left:
                selectionStart = this.mask.getMaskPosition(virtualSelection.start - 1);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.right:
                selectionStart = this.mask.getMaskPosition(Math.min(clean.length, virtualSelection.start + 1));
                selectionEnd = selectionStart;
                break;
        }
        this.setState({
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
        });
    }

    updateValue(value: string) {
        let clean = Mask.cleanValue(value);
        try {
            let value = this.mask.formatClean(clean);

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

            let virtualPosition = this.mask.getVirtualPosition(position);
            let selectionPosition = this.mask.getMaskPosition(virtualPosition);
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

    deleteCharacter(value: string, forward: boolean) {
        let clean = Mask.cleanValueWithSpaces(value);
        let selection = this.getSelection();
        let virtualSelection = this.mask.getVirtualSelection(selection);

        try {
            if (virtualSelection.start === virtualSelection.end) {
                let updatedClean = forward ?
                    clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                    clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
                let updatedValue = this.mask.formatClean(updatedClean, true);

                let selectionPosition = this.mask.getMaskPosition(forward ? virtualSelection.start : (virtualSelection.start - 1));
                this.setState({
                    value: updatedValue,
                    selectionStart: selectionPosition,
                    selectionEnd: selectionPosition
                });
            } else {
                let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
                let updatedValue = this.mask.formatClean(updatedClean, true);

                let selectionPosition = this.mask.getMaskPosition(Math.min(updatedClean.length, virtualSelection.start));
                this.setState({
                    value: updatedValue,
                    selectionStart: selectionPosition,
                    selectionEnd: selectionPosition
                });
            }
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
}