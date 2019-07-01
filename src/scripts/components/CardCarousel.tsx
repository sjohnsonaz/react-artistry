import * as React from 'react';

import Carousel, { ICarouselProps } from './Carousel';
//import Card from './Card';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {
    minWidth?: number;
    maxWidth?: number;
}

export interface ICardCarouselState {
    rendered?: boolean;
    slideSize?: number;
}

export default class CardCarousel extends React.Component<ICardCarouselProps, ICardCarouselState> {
    element: React.RefObject<HTMLDivElement> = React.createRef();
    state: ICardCarouselState = {
        rendered: false,
        slideSize: 1
    };

    componentDidMount() {
        let {
            minWidth,
            maxWidth
        } = this.props;

        let slideSize = 1;
        let element = this.element.current;
        if (element) {
            minWidth = minWidth || 300;
            let width = element.clientWidth;
            if (width > minWidth) {
                let remainder = width % minWidth;
                slideSize = (width - remainder) / minWidth;
            }
        }

        this.setState({
            rendered: true,
            slideSize: slideSize
        });
    }

    componentDidUpdate() {
        let {
            minWidth
        } = this.props;

        let slideSize = 1;
        let element = this.element.current;
        if (element) {
            minWidth = minWidth || 300;
            let width = element.clientWidth;
            if (width > minWidth) {
                let remainder = width % minWidth;
                slideSize = (width - remainder) / minWidth;
            }
        }

        if (slideSize !== this.state.slideSize) {
            this.setState({
                slideSize: slideSize
            });
        }
    }

    render() {
        let {
            id,
            className,
            minWidth,
            maxWidth,
            children,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-carousel');

        let wrappedChildren: React.ReactNode[][] = [];

        let innerWrapper: React.ReactNode[];
        React.Children.forEach(children, (child, index) => {
            if (index % this.state.slideSize === 0) {
                innerWrapper = [];
                wrappedChildren.push(innerWrapper);
            }
            innerWrapper.push(child);
        });

        return (
            <div
                ref={this.element}
                id={id}
                className={classNames.join(' ')}
            >
                {this.state.rendered ?
                    <Carousel
                        {...props}
                    >
                        {wrappedChildren.map((children, index) => {
                            return (
                                <CardContainer
                                    className="space"
                                    minWidth={minWidth}
                                    maxWidth={maxWidth}
                                    key={index}>
                                    {children}
                                </CardContainer>
                            );
                        })}
                    </Carousel> :
                    undefined}
            </div>
        );
    }
}