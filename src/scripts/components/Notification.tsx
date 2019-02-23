import * as React from 'react';

import { wait } from '../util/PromiseUtil';
import { NotificationType, INotification } from '../util/NotificationUtil';
import ClassNames from '../util/ClassNames';

export interface INotificationProps extends INotification {
    id?: string;
    className?: string;
    clickable?: boolean;
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

        switch (type) {
            case 'success':
                classNames.add('notification-success');
                break;
            case 'info':
                classNames.add('notification-info');
                break;
            case 'warning':
                classNames.add('notification-warning');
                break;
            case 'danger':
                classNames.add('notification-danger');
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
                id={id}
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