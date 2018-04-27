import * as React from 'react';

export interface IContainerProps {
    className?: string;
    id?: string;
    menuBarTop?: boolean;
}

export default class Container extends React.Component<IContainerProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('container');
        if (this.props.menuBarTop) {
            classNames.push('container-menu-bar-top');
        }
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}
