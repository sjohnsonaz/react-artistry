import * as React from 'react';

export type GridSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IGridProps {
    className?: string;
    id?: string;
    columns?: number;
    size?: GridSize;
}

export default class Grid extends React.Component<IGridProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        gridConfig(classNames, this.props.columns, this.props.size);
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}

export function gridConfig(classNames: string[], columns: number, size?: GridSize) {
    columns = columns || 12;
    switch (size) {
        case 'x-small':
            classNames.push('grid-xs-' + columns);
            break;
        case 'small':
            classNames.push('grid-sm-' + columns);
            break;
        case 'medium':
            classNames.push('grid-md-' + columns);
            break;
        case 'large':
            classNames.push('grid-lg-' + columns);
            break;
        case 'x-large':
            classNames.push('grid-xl-' + columns);
            break;
        default:
            classNames.push('grid-' + columns);
            break;
    }
    return classNames;
}