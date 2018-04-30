import * as React from 'react';

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
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
            onEnter,
            onEscape,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('form');
        let onKeyDown = (onEnter || onEscape) ? this.onKeyDown.bind(this) : undefined;
        return (
            <form className={classNames.join(' ')} onKeyDown={onKeyDown} {...props}>{this.props.children}</form>
        );
    }
}
