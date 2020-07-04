import * as React from 'react';
import ClassNames from 'util/ClassNames';
import { GridStyle } from './Grid.style';

export type GridSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IGridProps {
    className?: string;
    id?: string;
    columns?: number;
    screenSize?: GridSize;
    fillWidth?: boolean;
    space?: boolean;
}

export default class Grid extends React.Component<IGridProps, any> {
    render() {
        let classNames = new ClassNames(GridStyle.Grid, this.props.className);
        grid(classNames, this.props.columns, this.props.screenSize, this.props.space);

        if (this.props.fillWidth) {
            classNames.add('fill-width');
        }

        return <div className={classNames.toString()} id={this.props.id}>{this.props.children}</div>
    }
}

function grid(classNames: ClassNames, columns: number, screenSize?: GridSize, space?: boolean) {
    columns = columns || 12;
    switch (screenSize) {
        case 'x-small':
            classNames.add('grid-xs-' + columns);
            break;
        case 'small':
            classNames.add('grid-sm-' + columns);
            break;
        case 'medium':
            classNames.add('grid-md-' + columns);
            break;
        case 'large':
            classNames.add('grid-lg-' + columns);
            break;
        case 'x-large':
            classNames.add('grid-xl-' + columns);
            break;
        default:
            classNames.add('grid-' + columns);
            break;
    }

    if (space) {
        classNames.add('grid-space');
    }
}

export interface IGridExternalProps {
    grid?: boolean;
    gridColumns?: number;
    gridSize?: GridSize;
    gridSpace?: boolean;
}

export function gridConfig(classNames: ClassNames, props: IGridExternalProps) {
    grid(classNames, props.gridColumns, props.gridSize, props.gridSpace);
}