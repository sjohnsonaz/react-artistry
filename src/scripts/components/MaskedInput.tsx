import * as React from 'react';
import Mask, { ISelection, KeyboardMovement } from '../util/Mask';

export interface IMaskedInputProps<T> extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    className?: string;
    mask: string;
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
            value: this.mask.formatValue(value, true)
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
            try {
                this.setState(this.mask.updateValue(
                    value,
                    this.state.value
                ));
            }
            catch (e) {
                this.rollback();
            }
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState(this.mask.updateSelection(
            event.target.value,
            this.getSelection()
        ));
    }

    onBlur = () => {
        this.command = false;
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        try {
            this.setState(this.mask.updateValue(
                (event.target as HTMLInputElement).value,
                this.state.value
            ));
        }
        catch (e) {
            this.rollback();
        }
        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        //event.preventDefault();
        try {
            this.setState(this.mask.updateValue(
                (event.target as HTMLInputElement).value,
                this.state.value
            ));
        }
        catch (e) {
            this.rollback();
        }
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                try {
                    this.setState(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        false
                    ));
                }
                catch (e) {
                    this.rollback();
                }
                break;
            case 35: // End
                event.preventDefault();
                this.setState(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.end
                ));
                break;
            case 36: // Home
                event.preventDefault();
                this.setState(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.home
                ));
                break;
            case 37: // Left
                event.preventDefault();
                this.setState(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.home : KeyboardMovement.left
                ));
                break;
            case 39: // Right
                event.preventDefault();
                this.setState(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.end : KeyboardMovement.right
                ));
                break;
            case 46: // Delete
                event.preventDefault();
                try {
                    this.setState(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        true
                    ));
                }
                catch (e) {
                    this.rollback();
                }
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

    rollback() {
        this.setState({
            value: this.state.value,
            selectionStart: this.state.selectionStart,
            selectionEnd: this.state.selectionEnd
        });
    }

    render() {
        let {
            id,
            className,
            value,
            onChange,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

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