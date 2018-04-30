import * as React from 'react';

export interface IListProps<T> {
    id?: string;
    className?: string;
    data: T[];
    template?: (item: T) => any;
}

export default class List<T> extends React.Component<IListProps<T>, any> {
    render() {
        let {
            className,
            id,
            data,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('list');

        return (
            <ul className={classNames.join(' ')} id={id}>
                {data ? data.map((item, index) => <li key={index}>
                    {template ? template(item) : item}
                </li>) : undefined}
            </ul>
        )
    }
}