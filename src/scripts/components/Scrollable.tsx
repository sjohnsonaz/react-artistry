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
    maxHeight?: number | string;
    buffer?: number;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => void;
    onTop?: (event?: React.UIEvent<HTMLElement>) => void;
    onRight?: (event?: React.UIEvent<HTMLElement>) => void;
    onBottom?: (event?: React.UIEvent<HTMLElement>) => any
    onLeft?: (event?: React.UIEvent<HTMLElement>) => void;
    onFitHeight?: () => void;
    onFitWidth?: () => void;
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
    root: React.RefObject<HTMLDivElement> = React.createRef();
    topBumper: React.RefObject<HTMLDivElement> = React.createRef();
    bottomBumper: React.RefObject<HTMLDivElement> = React.createRef();
    rootObserver: IntersectionObserver;

    onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        scrollHandler(this.props, event);
    }

    componentDidMount() {
        let root = this.root.current;
        let topBumper = this.topBumper.current;
        let bottomBumper = this.bottomBumper.current;
        this.rootObserver = new IntersectionObserver(
            (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        switch (entry.target.className) {
                            case 'scrollable-bumper-top':
                                if (this.props.onTop) {
                                    this.props.onTop();
                                }
                                break;
                            case 'scrollable-bumper-bottom':
                                if (this.props.onBottom) {
                                    this.props.onBottom();
                                }
                                break;
                        }
                    }
                });
            }, {
                root: root,
                rootMargin: '0px',
                threshold: [0]
            });
        this.rootObserver.observe(topBumper);
        this.rootObserver.observe(bottomBumper);
    }

    componentWillUnmount() {
        if (this.rootObserver) {
            this.rootObserver.disconnect();
        }
    }

    componentDidUpdate() {
        let root = this.root.current;
        if (root.scrollHeight === root.clientHeight) {
            if (this.props.onFitHeight) {
                this.props.onFitHeight();
            }
        }
        if (root.scrollWidth === root.clientWidth) {
            if (this.props.onFitWidth) {
                this.props.onFitWidth();
            }
        }
    }

    render() {
        let {
            id,
            className,
            type,
            height,
            maxHeight,
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
            style = { height: height };
        } else if (maxHeight) {
            style = { maxHeight: maxHeight };
        }

        return (
            <div
                ref={this.root}
                className={classNames.join(' ')}
                id={id}
                data-scroll={ScrollableTypeEnum[type]}
                onScroll={scrollHandler}
                style={style}
            >
                <div
                    ref={this.topBumper}
                    className="scrollable-bumper-top"
                    style={{
                        height: '30px'
                    }}
                ></div>
                {this.props.children}
                <div
                    ref={this.bottomBumper}
                    className="scrollable-bumper-bottom"
                    style={{
                        height: '30px'
                    }}
                ></div>
            </div>
        );
    }
}