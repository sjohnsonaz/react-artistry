import * as React from 'react';

export interface IGridProps {
    className?: string;
    id?: string;
    columns?: number;
    size?: 'small' | 'medium' | 'large';
}

export default class Grid extends React.Component<IGridProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        let columns = this.props.columns || 12;
        switch (this.props.size) {
            case 'small':
                classNames.push('grid-sm-' + columns);
                break;
            case 'medium':
                classNames.push('grid-md-' + columns);
                break;
            case 'large':
                classNames.push('grid-lg-' + columns);
                break;
            default:
                classNames.push('grid-' + columns);
                break;
        }
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}