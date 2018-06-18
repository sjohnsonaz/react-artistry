import * as React from 'react';

export interface ICellProps {
    className?: string;
    id?: string;
    columns?: number;
    offset?: number;
}

export default class Cell extends React.Component<ICellProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        if (this.props.columns) {
            classNames.push('col-' + this.props.columns);
        } else {
            classNames.push('col');
        }
        if (this.props.offset) {
            classNames.push('offset-' + this.props.offset);
        }
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}