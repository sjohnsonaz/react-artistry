import * as React from 'react';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large';

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    // TODO: Change this to size when the React typings allow.
    screenSize?: FormSize;
    lockable?: boolean;
    locked?: boolean;
    onEnter?: (event: KeyboardEvent) => any;
    onEscape?: (event: KeyboardEvent) => any;
}

export default class Form extends React.Component<IFormProps, any> {
    onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 13:
                this.props.onEnter(event);
                break;
            case 27:
                this.props.onEscape(event);
                break;
        }
    }

    render() {
        let {
            id,
            className,
            screenSize,
            lockable,
            locked,
            onEnter,
            onEscape,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('form');
        if (locked) {
            classNames.push('form-lock');
        }

        switch (screenSize) {
            case 'small':
                classNames.push('form-sm');
                break;
            case 'medium':
                classNames.push('form-md');
                break;
            case 'large':
                classNames.push('form-lg');
                break;
            case 'x-large':
                classNames.push('form-xl');
                break;
        }

        let onKeyDown = (onEnter || onEscape) ? this.onKeyDown.bind(this) : undefined;
        return (
            <form className={classNames.join(' ')} onKeyDown={onKeyDown} {...props}>
                {lockable ?
                    <div className="form-lock-screen"></div> :
                    null}
                {this.props.children}
            </form>
        );
    }
}
