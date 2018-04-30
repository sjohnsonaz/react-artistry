import * as React from 'react';

export interface IColumn<T> {
    property?: string;
    header?: string | (() => any);
    footer?: string | (() => any);
    template?: (item: T, index?: number) => any;
    hidden?: boolean;
}

export interface ITableProps<T> {
    className?: string;
    id?: string;
    data: T[];
    headers?: any[];
    footers?: any[];
    columns?: IColumn<T>[];
    template?: (item: T, index?: number) => any;
    list?: boolean;
}

export default class Table<T> extends React.Component<ITableProps<T>, any> {
    render() {
        let {
            className,
            id,
            data,
            headers,
            columns,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('table');

        let renderedTitles = headers || columns.map(column => {
            if (typeof column.header === 'function') {
                return column.header();
            } else {
                return column.header
            }
        });

        let renderedBody;
        if (template) {
            renderedBody = data.map(item => template(item));
        } else if (columns) {
            renderedBody = data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column, index) => {
                        if (column.template) {
                            return column.template(item);
                        } else if (column.property) {
                            return <td key={index}>{item[column.property]}</td>
                        } else {
                            return <td key={index}></td>
                        }
                    })}
                </tr>
            ));
        } else {
            renderedBody = data.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((value, index) => <td key={index}>{value}</td>)}
                </tr>
            ));
        }

        return (
            <table className={classNames.join(' ')} id={id}>
                {renderedTitles ?
                    <thead>
                        <tr>
                            {renderedTitles.map((title, index) => <th key={index}>{title}</th>)}
                        </tr>
                    </thead>
                    : undefined}
                <tbody className={this.props.list ? 'list' : ''}>
                    {renderedBody}
                </tbody>
                <tfoot>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        );
    }
}
