import * as React from 'react';

import { FormStyle } from './Form.style';
import ClassNames from 'util/ClassNames';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'stacked';

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    // TODO: Change this to size when the React typings allow.
    screenSize?: FormSize;
    lockable?: boolean;
    locked?: boolean;
    nonForm?: boolean;
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
            nonForm,
            onEnter,
            onEscape,
            ...props
        } = this.props;

        const classNames = new ClassNames(FormStyle.Form, className);

        if (locked) {
            classNames.add(FormStyle.Form$$Lock);
        }

        switch (screenSize) {
            case 'small':
                classNames.add(FormStyle.Form$$SM);
                break;
            case 'medium':
                classNames.add(FormStyle.Form$$MD);
                break;
            case 'large':
                classNames.add(FormStyle.Form$$LG);
                break;
            case 'x-large':
                classNames.add(FormStyle.Form$$XL);
                break;
            case 'stacked':
                classNames.add('form-stacked');
                break;
        }

        let onKeyDown = (onEnter || onEscape) ? this.onKeyDown.bind(this) : undefined;
        if (nonForm) {
            return (
                <div id={id} className={classNames.toString()} onKeyDown={onKeyDown} {...props as any}>
                    {lockable ?
                        <div className={FormStyle.Form__LockScreen}></div> :
                        null}
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <form id={id} className={classNames.toString()} onKeyDown={onKeyDown} {...props}>
                    {lockable ?
                        <div className={FormStyle.Form__LockScreen}></div> :
                        null}
                    {this.props.children}
                </form>
            );
        }
    }
}
