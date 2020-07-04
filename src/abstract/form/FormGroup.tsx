import * as React from 'react';

import ClassNames from '../../util/ClassNames';
import { AlignType } from '../../util/Align';

import FormText, { FormTextTheme } from './FormText';
import { FormStyle } from './Form.style';

export interface IFormGroupProps {
    className?: string;
    id?: string;
    label?: any;
    text?: any;
    textAlign?: AlignType;
    theme?: FormTextTheme;
    nonLabel?: boolean;
    inline?: boolean;
    stacked?: boolean;
}

export default class FormGroup extends React.Component<IFormGroupProps, any> {
    render() {
        let classNames = new ClassNames(FormStyle.Form__Group, this.props.className);

        if (this.props.inline) {
            classNames.add('form-group-inline');
        }

        if (this.props.stacked) {
            classNames.add('form-group-stacked');
        }

        let input = (
            <div className={FormStyle.Form__Input}>
                {this.props.children}
            </div>
        );

        let label;
        if (this.props.label) {
            if (this.props.nonLabel) {
                label = (
                    <div className={FormStyle.Form__Title}>
                        {this.props.label}
                    </div>
                );
            } else {
                label = (
                    <label className={FormStyle.Form__Title}>
                        {this.props.label}
                    </label>
                );
            }
        }

        return (
            <div className={classNames.toString()} id={this.props.id}>
                {label}
                {input}
                {this.props.text ?
                    <FormText
                        theme={this.props.theme}
                        align={this.props.textAlign}
                    >
                        {this.props.text}
                    </FormText> :
                    null}
            </div>
        );
    }
}
