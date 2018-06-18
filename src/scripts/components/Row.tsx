import * as React from 'react';

export interface IRowProps {
    className?: string;
    id?: string;
}

export default class Row extends React.Component<IRowProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('row');
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}