import * as React from 'react';

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    lockable?: boolean;
    locked?: boolean;
    onEnter?: (event: KeyboardEvent) => boolean | void;
    onEscape?: (event: KeyboardEvent) => boolean | void;
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
