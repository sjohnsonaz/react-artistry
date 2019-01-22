import * as React from 'react';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
}

export default class CardContainer extends React.Component<ICardContainerProps, any> {
    render() {
        let {
            id,
            className,
            space
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.props.children}
            </div>
        )
    }
}