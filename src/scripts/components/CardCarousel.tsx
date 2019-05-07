import * as React from 'react';

import Carousel, { ICarouselProps } from './Carousel';
//import Card from './Card';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {


}

export interface ICardCarouselState {
    rendered?: boolean;
}

export default class CardCarousel extends React.Component<ICardCarouselProps, ICardCarouselState> {
    element: React.Ref<HTMLDivElement> = React.createRef();
    state: ICardCarouselState = {
        rendered: false
    };

    componentDidMount() {
        this.setState({
            rendered: true
        });
    }

    render() {
        let {
            id,
            className,
            children,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-carousel');

        let wrappedChildren: React.ReactNode[][] = [];

        let innerWrapper: React.ReactNode[];
        React.Children.forEach(children, (child, index) => {
            if (index % 3 === 0) {
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