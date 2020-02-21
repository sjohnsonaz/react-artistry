import * as React from 'react';

export interface ISpacerProps {
    className?: string;
    id?: string;
}

export default class Spacer extends React.Component<ISpacerProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('spacer');
        return (
            <li className={classNames.join(' ')} id={this.props.id}></li>
        );
    }
}
