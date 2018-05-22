import * as React from 'react';

export interface IMenuBarLinkProps {
    className?: string;
    id?: string;
    title?: any;
    href?: string;
    active?: boolean;
    noLink?: boolean;
}

export default class MenuBarLink extends React.Component<IMenuBarLinkProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-link');
        if (this.props.active) {
            classNames.push('menu-active');
        }
        return (
            <li className={classNames.join(' ')} id={this.props.id}>
                {!this.props.noLink ?
                    <a href={this.props.href || ''}>{this.props.title}</a> :
                    <span>{this.props.title}</span>}
            </li>
        );
    }
}
