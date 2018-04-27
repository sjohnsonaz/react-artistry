import * as React from 'react';

export interface IFormActionsProps {
    className?: string;
    id?: string;
}

export default class FormActions extends React.Component<IFormActionsProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-actions');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}