import * as React from 'react';

import ClassNames from '../util/ClassNames';

export interface IActionBarBreadcrumbProps {
    className?: string;
    id?: string;
    direction?: 'forward' | 'reverse';
    align?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    displaySize?: 'default' | 'small' | 'large';
}

export default class ActionBarBreadcrumb extends React.Component<IActionBarBreadcrumbProps, any> {
    ref: React.RefObject<HTMLDivElement> = React.createRef();
    hiddenCount: number = 0;
    observer: IntersectionObserver;

    componentDidMount() {
        let breadcrumbHeader = this.ref.current;
        //let breadcrumbDropdown = document.querySelector('.action-bar-dropdown');

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                        entry.target.classList.remove('action-bar-breadcrumb-item-hidden');
                        this.hiddenCount--;
                    }
                } else {
                    if (!entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                        entry.target.classList.add('action-bar-breadcrumb-item-hidden');
                        this.hiddenCount++;
                    }
                }
            });
            if (this.hiddenCount > 0) {
                breadcrumbHeader.setAttribute('data-align', 'end');
                //breadcrumbDropdown.classList.remove('action-bar-breadcrumb-item-hidden');
            } else {
                breadcrumbHeader.removeAttribute('data-align');
                //breadcrumbDropdown.classList.add('action-bar-breadcrumb-item-hidden');
            }
        }, {
            root: breadcrumbHeader,
            rootMargin: '0px',
            threshold: 1
        });

        breadcrumbHeader.childNodes.forEach(child => {
            if (child instanceof Element) {
                this.observer.observe(child);
            }
        });
    }

    componentDidUpdate() {
        this.ref.current.childNodes.forEach(child => {
            if (child instanceof Element) {
                this.observer.observe(child);
            }
        });
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    render() {
        let {
            id,
            className,
            direction,
            align,
            displaySize
        } = this.props;

        let classNames = new ClassNames(className, 'action-bar', 'action-bar-breadcrumb');

        return (
            <div
                ref={this.ref}
                className={classNames.toString()}
                id={id}
                data-direction={direction}
                data-align={align}
                data-size={displaySize}
            >
                {this.props.children}
            </div>
        );
    }
}