import * as React from 'react';
import ClassNames from 'util/ClassNames';
import { GridStyle } from './Grid.style';

export interface IRowProps {
    className?: string;
    id?: string;
    reverse?: boolean;
}

export default class Row extends React.Component<IRowProps, any> {
    render() {
        let classNames = new ClassNames(GridStyle.Grid__Row, this.props.className);
        // if (!this.props.reverse) {
        //     classNames.push('row');
        // } else {
        //     classNames.push('row-reverse');
        // }
        return <div
            className={classNames.toString()}
            id={this.props.id}>
            {this.props.children}
        </div>
    }
}