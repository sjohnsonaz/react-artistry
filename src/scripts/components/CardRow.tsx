import * as React from 'react';

import { alignClass, AlignType } from '../util/Align';

export interface ICardRowProps {
    id?: string;
    className?: string;
    align?: AlignType;
}

export default class CardRow extends React.Component<ICardRowProps, any> {
    render() {
        let {
            id,
            className,
            align
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-row');

        if (align) {
            alignClass(align, classNames);
        }

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.props.children}
            </div>
        );
    }
}