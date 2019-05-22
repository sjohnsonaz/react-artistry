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
    bumper?: number;
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
    bumper?: number | string;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => void;
    onTop?: (event?: React.UIEvent<HTMLElement>) => void;
    onRight?: (event?: React.UIEvent<HTMLElement>) => void;
    onBottom?: (event?: React.UIEvent<HTMLElement>) => any
    onLeft?: (event?: React.UIEvent<HTMLElement>) => void;
}

export function scrollHandler(props: IScrollableExternalProps, event: React.UIEvent<HTMLElement>) {
    let element = event.currentTarget;

    let bumper = props.bumper || 0;
    if (props.onBottom) {
        if (element.scrollTop + element.clientHeight + bumper >= element.scrollHeight) {
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
    rightBumper: React.RefObject<HTMLDivElement> = React.createRef();
    bottomBumper: React.RefObject<HTMLDivElement> = React.createRef();
    leftBumper: React.RefObject<HTMLDivElement> = React.createRef();
    rootObserver: IntersectionObserver;

    topIntersected: boolean = false;
    rightIntersected: boolean = false;
    bottomIntersected: boolean = false;
    leftIntersected: boolean = false;

    onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }

    componentDidMount() {
        let root = this.root.current;
        let topBumper = this.topBumper.current;
        let rightBumper = this.rightBumper.current;
        let bottomBumper = this.bottomBumper.current;
        let leftBumper = this.leftBumper.current;
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
                            case 'scrollable-bumper-right':
                                if (this.props.onRight) {
                                    this.props.onRight();
                                }
                                break;
                            case 'scrollable-bumper-bottom':
                                if (this.props.onBottom) {
                                    this.props.onBottom();
                                }
                                break;
                            case 'scrollable-bumper-left':
                                if (this.props.onLeft) {
                                    this.props.onLeft();
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
        this.rootObserver.observe(rightBumper);
        this.rootObserver.observe(bottomBumper);
        this.rootObserver.observe(leftBumper);
    }

    componentWillUnmount() {
        if (this.rootObserver) {
            this.rootObserver.disconnect();
        }
    }

    render() {
        let {
            id,
            className,
            type,
            height,
            maxHeight,
            bumper
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('scrollable');

        if (typeof height === 'number') {
            height = height + 'px';
        }

        if (typeof maxHeight === 'number') {
            maxHeight = maxHeight + 'px';
        }

        if (typeof bumper === 'number') {
            bumper = bumper + 'px';
        }

        let style: React.CSSProperties = {};
        if (bumper) {
            style['--scrollable-bumper-size'] = bumper
        }
        if (height) {
            style.height = height;
        } else if (maxHeight) {
            style.maxHeight = maxHeight;
        }

        return (
            <div
                ref={this.root}
                className={classNames.join(' ')}
                id={id}
                data-scroll={ScrollableTypeEnum[type]}
                onScroll={this.onScroll}
                style={style}
            >
                <div className="scrollable-bumper">
                    <div
                        ref={this.topBumper}
                        className="scrollable-bumper-top"
                    ></div>
                    <div
                        ref={this.rightBumper}
                        className="scrollable-bumper-right"
                    ></div>
                    <div
                        ref={this.bottomBumper}
                        className="scrollable-bumper-bottom"
                    ></div>
                    <div
                        ref={this.leftBumper}
                        className="scrollable-bumper-left"
                    ></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}