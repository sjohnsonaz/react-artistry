import * as React from 'react';

export interface ICardContainerProps {
    id?: string;
    className?: string;
}

export default class CardContainer extends React.Component<ICardContainerProps, any> {
    render() {
        let {
            id,
            className
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.props.children}
            </div>
        )
    }
}