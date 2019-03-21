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
    xAlways = "xAlways",
    yAlways = "yAlways",
    xNever = "xNever",
    yNever = "yNever"
}

export interface IScrollableProps {
    id?: string;
    className?: string;
    type?: ScrollableType;
    buffer?: number;
    height?: number | string;
    onScroll?: (event?: React.UIEvent<HTMLDivElement>) => void;
    onTop?: (event?: React.UIEvent<HTMLDivElement>) => void;
    onRight?: (event?: React.UIEvent<HTMLDivElement>) => void;
    onBottom?: (event?: React.UIEvent<HTMLDivElement>) => any
    onLeft?: (event?: React.UIEvent<HTMLDivElement>) => void;
}

export default class Scrollable extends React.Component<IScrollableProps, any> {
    onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        let element = event.currentTarget;

        let buffer = this.props.buffer || 0;
        if (this.props.onBottom) {
            if (element.scrollTop + element.clientHeight + buffer >= element.scrollHeight) {
                this.props.onBottom(event);
            }
        }

        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
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
                data-scroll={type}
                onScroll={scrollHandler}
                style={style}
            >
                {this.props.children}
            </div>
        );
    }
}