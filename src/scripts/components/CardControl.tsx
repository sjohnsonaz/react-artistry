import * as React from 'react';

export interface ICardControlProps {
    id?: string;
    className?: string;
    title?: string;
    label?: boolean;
}

export default class CardControl extends React.Component<ICardControlProps, any> {
    render() {
        let {
            id,
            className,
            title,
            label
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-control');

        let content;
        if (title) {
            content = (
                <>
                    <div className="card-title">{title}</div>
                    <div className="card-data">{this.props.children}</div>
                </>
            );
        } else {
            content = this.props.children;
        }
        if (label) {
            return (
                <label className={classNames.join(' ')} id={id}>
                    {content}
                </label>
            );
        } else {
            return (
                <div className={classNames.join(' ')} id={id}>
                    {content}
                </div>
            );
        }
    }
}