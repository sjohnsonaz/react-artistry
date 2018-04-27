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
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form');
        let onKeyDown = (this.props.onEnter || this.props.onEscape) ? this.onKeyDown.bind(this) : undefined;
        return (
            <form className={classNames.join(' ')} onKeyDown={onKeyDown} {...this.props}>{this.props.children}</form>
        );
    }
}
