import * as React from 'react';

import { wait } from '../util/PromiseUtil';
import { INotification } from '../util/NotificationUtil';
import ClassNames from '../util/ClassNames';

export interface INotificationProps extends INotification {
    id?: string;
    className?: string;
    clickable?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => any;
    onClose?: () => any;
}

export interface INotificationState {
    hide?: boolean;
}

export default class Notification extends React.Component<INotificationProps, INotificationState> {
    state: INotificationState = {
        hide: false
    };

    constructor(props: INotificationProps, context: any) {
        super(props, context);
        this.startDecay();
    }

    async startDecay() {
        if (this.props.decay) {
            await wait(this.props.decay);
            this.setState({
                hide: true
            }, () => {
                if (this.props.onClose) {
                    this.props.onClose();
                }
            });
        }
    }

    render() {
        let {
            id,
            className,
            type,
            title,
            clickable
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('notification', 'animatable');

        let theme: string;
        switch (type) {
            case 'success':
                theme = 'success';
                break;
            case 'info':
                theme = 'info';
                break;
            case 'warning':
                theme = 'warning';
                break;
            case 'danger':
                theme = 'danger';
                break;
        }

        if (clickable) {
            classNames.add('clickable');
        }

        let direction = 'in';
        if (this.state.hide) {
            direction = 'out';
        }

        return (
            <aside
                className={classNames.toString()}
                data-animation="fade-right"
                data-direction={direction}
                data-theme={theme}
                id={id}
                onClick={this.props.onClick}
                aria-role="button"
            >
                {title ?
                    <header>{title}</header> :
                    undefined}
                <div className="notification-content">
                    {this.props.children}
                </div>
            </aside>
        );
    }
}