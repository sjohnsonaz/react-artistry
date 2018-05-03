import * as React from 'react';

import ClassNames from '../util/ClassNames';
import { wait } from '../util/PromiseUtil';

export interface ICarouselProps {
    className?: string;
    id?: string;
    activeIndex: number;
    animation?: 'slide' | 'slide-fade' | 'fade' | 'flip';
    safe?: boolean;
}

export interface ICarouselState {
    height: string;
    activeIndex: number;
    previousActiveIndex: number;
    animating: boolean;
    selected: boolean;
    runCount: number;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState> {
    container: React.RefObject<HTMLDivElement> = React.createRef();
    state = {
        height: 'auto',
        activeIndex: 0,
        previousActiveIndex: 0,
        animating: false,
        selected: true,
        runCount: 0
    };
    observer = new MutationObserver((mutationList, observer) => {
        for (var mutation of mutationList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let target: HTMLElement = mutation.target as any;
                if (target.classList.contains('carousel-run')) {
                    this.setState({ selected: true }, () => {
                        let computedStyle = window.getComputedStyle(target, null);
                        let paddingHeight =
                            parseFloat(computedStyle.getPropertyValue('border-top-width')) +
                            parseFloat(computedStyle.getPropertyValue('border-bottom-width')) +
                            parseFloat(computedStyle.getPropertyValue('padding-top')) +
                            parseFloat(computedStyle.getPropertyValue('padding-bottom'));
                        let activeChild = target.querySelector('.carousel-selected');
                        if (activeChild) {
                            this.setState({ height: paddingHeight + activeChild.clientHeight + 'px' });
                        }
                    });
                } else {
                    this.setState({
                        animating: false,
                        height: 'auto',
                        previousActiveIndex: this.state.activeIndex
                    });
                }
            }
        }
    });

    componentDidMount() {
        let node = this.container.current;
        this.observer.observe(node, {
            attributes: true
        });
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    async startAnimation(): Promise<void> {
    }

    componentWillReceiveProps(nextProps?: ICarouselProps) {
        let { activeIndex } = nextProps;
        let { activeIndex: previousActiveIndex } = this.props;

        activeIndex = activeIndex || 0;
        previousActiveIndex = previousActiveIndex || 0;
        let children = this.props.children;
        if (children instanceof Array) {
            activeIndex %= children.length;
            previousActiveIndex %= children.length;
            if (activeIndex < 0) {
                activeIndex += children.length;
                activeIndex %= children.length;
            }
            if (previousActiveIndex < 0) {
                previousActiveIndex += children.length;
                previousActiveIndex %= children.length;
            }
        }

        if (activeIndex !== this.state.activeIndex) {
            let node = this.container.current;

            this.setState({ height: node.offsetHeight + 'px' }, () => {
                this.setState({ animating: true }, () => {
                    this.setState({
                        activeIndex: activeIndex,
                        previousActiveIndex: previousActiveIndex,
                        selected: false
                    });
                });
            });
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        if (this.state.animating) {
            classNames.push('carousel-run');
        }

        switch (this.props.animation) {
            case 'slide':
                break;
            case 'slide-fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'flip':
                classNames.push('carousel-animate-flip');
                break;
            default:
                break;
        }

        if (this.props.safe) {
            classNames.push('carousel-safe');
        }

        let children;

        if (this.props.children instanceof Array) {
            if (this.state.activeIndex !== this.state.previousActiveIndex) {
                if (this.state.activeIndex < this.state.previousActiveIndex) {
                    children = <>
                        <div
                            key={this.state.activeIndex}
                            className={this.state.selected ? "carousel-selected" : ""}
                        >{this.props.children[this.state.activeIndex]}</div>
                        <div
                            key={this.state.previousActiveIndex}
                            className={this.state.selected ? "" : "carousel-selected"}
                        >{this.props.children[this.state.previousActiveIndex]}</div>
                    </>
                } else {
                    children = <>
                        <div
                            key={this.state.previousActiveIndex}
                            className={this.state.selected ? "" : "carousel-selected"}
                        >{this.props.children[this.state.previousActiveIndex]}</div>
                        <div
                            key={this.state.activeIndex}
                            className={this.state.selected ? "carousel-selected" : ""}
                        >{this.props.children[this.state.activeIndex]}</div>
                    </>
                }
            } else {
                children = <>
                    <div key={this.state.activeIndex} className={this.state.selected ? "carousel-selected" : ""}>{this.props.children[this.state.activeIndex]}</div>
                </>
            }
        } else {
            children = <>
                <div key={this.state.activeIndex} className={this.state.selected ? "carousel-selected" : ""}>{this.props.children}</div>
            </>
        }


        return (
            <div
                className={classNames.join(' ')}
                id={this.props.id}
                style={{ height: this.state.height }}
                ref={this.container}
            >
                {children}
            </div>
        );
    }
}

function clearTimeoutBinding(container: any, property: string) {
    let timeout: number = container[property];
    if (typeof timeout === 'number') {
        window.clearTimeout(timeout);
        container[property] = undefined;
    }
}

function setTimeoutBinding(container: any, property: string, callback: Function, time?: number) {
    container[property] = window.setTimeout(callback, time);
    return container[property];
}