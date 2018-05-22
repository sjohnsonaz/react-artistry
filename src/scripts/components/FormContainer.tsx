import * as React from 'react';

export interface IFormContainerProps {
    className?: string;
    id?: string;
    label: any;
    inline?: boolean;
}

export default class Formcontainer extends React.Component<IFormContainerProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-container');

        if (this.props.inline) {
            classNames.push('form-container-inline');
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                <label className="form-label">
                    <div className="form-title">
                        {this.props.label}
                    </div>
                    <div className="form-input">
                        {this.props.children}
                    </div>
                </label>
            </div>
        );
    }
}
