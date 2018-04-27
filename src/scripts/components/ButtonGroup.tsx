import * as React from 'react';

export interface IButtonGroupProps {
    className?: string;
    id?: string;
}

export default class ButtonGroups extends React.Component<IButtonGroupProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('button-group');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}
