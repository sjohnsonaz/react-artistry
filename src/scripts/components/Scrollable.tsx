import * as React from 'react';

export type ScrollableType =
    'auto' |
    'both' |
    'none' |
    'x' |
    'y' |
    'xAlways' |
    'yAlways' |
    'xNever' |
    'yNever';

export enum ScrollableTypeEnum {
    auto = "auto",
    both = "both",
    none = "none",
    x = "x",
    y = "y",
    xAlways = "x-always",
    yAlways = "y-always",
    xNever = "x-never",
    yNever = "y-never"
}

export interface IScrollableExternalProps {
    scrollType?: ScrollableType;
    buffer?: number;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => void;
    onTop?: (event?: React.UIEvent<HTMLElement>) => void;
    onRight?: (event?: React.UIEvent<HTMLElement>) => void;
    onBottom?: (event?: React.UIEvent<HTMLElement>) => any
    onLeft?: (event?: React.UIEvent<HTMLElement>) => void;
}

export interface IScrollableProps {
    id?: string;
    className?: string;
    type?: ScrollableType;
    height?: number | string;
    buffer?: number;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => void;
    onTop?: (event?: React.UIEvent<HTMLElement>) => void;
    onRight?: (event?: React.UIEvent<HTMLElement>) => void;
    onBottom?: (event?: React.UIEvent<HTMLElement>) => any
    onLeft?: (event?: React.UIEvent<HTMLElement>) => void;
}

export function scrollHandler(props: IScrollableExternalProps, event: React.UIEvent<HTMLElement>) {
    let element = event.currentTarget;

    let buffer = props.buffer || 0;
    if (props.onBottom) {
        if (element.scrollTop + element.clientHeight + buffer >= element.scrollHeight) {
            props.onBottom(event);
        }
    }

    if (props.onScroll) {
        props.onScroll(event);
    }
}

export default class Scrollable extends React.Component<IScrollableProps, any> {
    onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        scrollHandler(this.props, event);
    }

    render() {
        let {
            id,
            className,
            type,
            height,
            onScroll,
            onTop,
            onRight,
            onBottom,
            onLeft
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('scrollable');

        let scrollHandler = undefined;
        if (onScroll || onTop || onRight || onBottom || onLeft) {
            scrollHandler = this.onScroll;
        }

        if (typeof height === 'number') {
            height = height + 'px';
        }

        let style;
        if (height) {
            style = { height: height }
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-scroll={ScrollableTypeEnum[type]}
                onScroll={scrollHandler}
                style={style}
            >
                {this.props.children}
            </div>
        );
    }
}