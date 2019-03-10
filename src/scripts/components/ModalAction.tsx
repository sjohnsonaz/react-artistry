import * as React from 'react';

export interface IModalActionProps {
    id?: string;
    className?: string;
}

export default class ModalAction extends React.Component<IModalActionProps, any> {
    render() {
        let {
            id,
            className
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('modal');

        return (
            <div className={classNames.join(' ')} id={id}>
                {this.props.children}
            </div>
        )
    }
}