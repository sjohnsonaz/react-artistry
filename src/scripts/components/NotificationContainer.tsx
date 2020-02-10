import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Portal from '../util/Portal';
import ClassNames from '../util/ClassNames';
import { NotificationType } from '../util/NotificationUtil';
import Notification from './Notification';

export type NotificationLocation = 'default' | 'top' | 'right' | 'bottom' | 'left' | 'center-horizontal' | 'center-vertical' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

export interface INotificationContainerProps {
    id?: string;
    className?: string;
    items?: {
        type?: NotificationType;
        title?: string;
        text?: string;
        decay?: number;
    }[];
    location?: NotificationLocation;
}

export default class NotificationContainer extends React.Component<INotificationContainerProps, any> {
    element: HTMLDivElement;

    constructor(props: INotificationContainerProps, context: any) {
        super(props, context);
        this.element = document.createElement('div');
    }

    componentDidMount() {
        let flyoutLayer = Portal.getElement('layer-flyout');

        if (!flyoutLayer.contains(this.element)) {
            flyoutLayer.appendChild(this.element);
        }
    }

    componentWillUnmount() {
        let flyoutLayer = Portal.getElement('layer-flyout');

        if (flyoutLayer.contains(this.element)) {
            flyoutLayer.removeChild(this.element);
        }
    }

    render() {
        let {
            id,
            className,
            items,
            location
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('notification-container');

        if (!items || !items.length) {
            classNames.add('hidden');
        }

        switch (location) {
            case 'top':
                classNames.add('notification-top');
                break;
            case 'right':
                classNames.add('notification-right');
                break;
            case 'bottom':
                classNames.add('notification-bottom');
                break;
            case 'left':
                classNames.add('notification-left');
                break;
            case 'center-horizontal':
                classNames.add('notification-center-horizontal');
                break;
            case 'center-vertical':
                classNames.add('notification-center-vertical');
                break;
            case 'top-right':
                classNames.add('notification-top-right');
                break;
            case 'bottom-right':
                classNames.add('notification-bottom-right');
                break;
            case 'bottom-left':
                classNames.add('notification-bottom-left');
                break;
            case 'top-left':
                classNames.add('notification-top-left');
                break;
        }

        return ReactDOM.createPortal((
            <div className={classNames.toString()} id={id}>
                {items ? items.map((item, index) => (
                    <Notification
                        type={item.type}
                        title={item.title}
                        decay={item.decay}
                        key={index}
                    >
                        {item.text}
                    </Notification>
                )) : undefined}
            </div>
        ), this.element);
    }
}