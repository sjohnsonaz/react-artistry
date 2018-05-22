import * as React from 'react';

export interface IFormActionProps {
    className?: string;
    id?: string;
}

export default class FormAction extends React.Component<IFormActionProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-action');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}