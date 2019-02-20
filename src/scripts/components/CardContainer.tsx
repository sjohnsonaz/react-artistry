import * as React from 'react';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
    width?: number | string;
}

export default class CardContainer extends React.Component<ICardContainerProps, any> {
    render() {
        let {
            id,
            className,
            space,
            width
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        if (width && typeof width === 'number') {
            width += 'px' as any;
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                style={{ '--card-min-width': width } as any}
            >
                {this.props.children}
            </div>
        )
    }
}