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

export default class Carousel extends React.Component<ICarouselProps, any> {
    container: React.RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        let node = this.container.current;
        let child = node.children[this.props.activeIndex];
        if (child) {
            child.className = 'carousel-selected';
        }
    }

    async componentDidUpdate(prevProps: ICarouselProps, prevState: any) {
        let { activeIndex } = this.props;
        let { activeIndex: oldActiveIndex } = prevProps;
        let node = this.container.current;

        activeIndex = activeIndex || 0;
        let children = node.children;
        activeIndex %= children.length;
        if (activeIndex < 0) {
            activeIndex += children.length;
            activeIndex %= children.length;
        }

        // increment runCount
        node['runCount'] = (node['runCount'] || 0) + 1;
        let runCount = node['runCount'];

        if (runCount === 1) {
            // Listen for transitionend
            node.addEventListener('transitionend', (event) => {
                if (event.target === node) {
                    node.classList.remove('carousel-run');
                    node.style.height = 'auto';
                }
            });
        }

        if (oldActiveIndex !== activeIndex) {
            let computedStyle = window.getComputedStyle(node, null);
            let paddingHeight =
                parseFloat(computedStyle.getPropertyValue('border-top')) +
                parseFloat(computedStyle.getPropertyValue('border-bottom')) +
                parseFloat(computedStyle.getPropertyValue('padding-top')) +
                parseFloat(computedStyle.getPropertyValue('padding-bottom'));
            let height = node.offsetHeight + 'px'

            node.style.height = height;
            node.classList.add('carousel-run');

            // Wait for the carousel-run class to be added
            await wait(30);
            if (runCount === node['runCount']) {

                let oldChild: Element = children[oldActiveIndex];
                /*
                for (var index = 0, length = children.length; index < length; index++) {
                    let child = children[index];
                    if (child.classList.contains('carousel-selected')) {
                        oldChild = child;
                        break;
                    }
                }
                */
                let activeChild = children[activeIndex];

                oldChild.classList.remove('carousel-selected');

                if (activeChild) {
                    activeChild.classList.add('carousel-selected');
                    height = paddingHeight + activeChild.clientHeight + 'px';
                } else {
                    height = 'auto';
                }

                node.style.height = height;
            }
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

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

        return (
            <div className={classNames.join(' ')} id={this.props.id} style={{ height: "auto" }} ref={this.container}>
                {this.props.children instanceof Array ? this.props.children.map((child, index) => {
                    return <div key={index}>{child}</div>
                }) : <div key={0}>{this.props.children}</div>}
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