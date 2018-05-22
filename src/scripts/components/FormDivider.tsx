import * as React from 'react';

export interface IFormDividerProps {
    className?: string;
    id?: string;
}

export default class FormDivider extends React.Component<IFormDividerProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-divider');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}