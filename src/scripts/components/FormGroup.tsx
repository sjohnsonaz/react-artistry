import * as React from 'react';

export interface IFormGroupProps {
    className?: string;
    id?: string;
    label?: any;
    text?: any;
    nonLabel?: boolean;
    inline?: boolean;
}

export default class FormGroup extends React.Component<IFormGroupProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-group');

        if (this.props.inline) {
            classNames.push('form-group-inline');
        }

        let input = (
            <div className="form-input">
                {this.props.children}
            </div>
        );

        let control;
        if (this.props.label) {
            if (this.props.nonLabel) {
                control = (
                    <div className="form-label">
                        <div className="form-title">
                            {this.props.label}
                        </div>
                        {input}
                    </div>
                );
            } else {
                control = (
                    <label className="form-label">
                        <div className="form-title">
                            {this.props.label}
                        </div>
                        {input}
                    </label>
                );
            }
        } else {
            control = input;
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                {this.props.text ?
                    <div className="form-text">{this.props.text}</div> :
                    null}
                {control}
            </div>
        );
    }
}