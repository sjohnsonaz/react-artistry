import * as React from 'react';

export interface IFormTextProps {
    className?: string;
    id?: string;
}

export default class FormText extends React.Component<IFormTextProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-text');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}