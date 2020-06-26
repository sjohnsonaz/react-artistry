import React from 'react';
import { block, addContext, AUTO, percent, only, MediaType, minWidth, calc, value, Block, px } from '@artistry/abstract';
import { Box, getSettings } from 'artistry';
import ClassNames from 'util/ClassNames';

function containerSize<T extends ReturnType<typeof getSettings>['sizes'], U extends keyof T>(block: Block, ...sizes: T[U][]) {
    sizes.forEach(size => {
        block.media(only(MediaType.Screen, minWidth(size as any)), {
            width: calc(`${size} - ${value('scrollbar-width', px(0))}`)
        });
    });
}

enum ContainerSize {
    all = 'container-all',
    xs = 'container-xs',
    sm = 'container-sm',
    md = 'container-md',
    lg = 'container-lg',
    xl = 'container-xl'
}

type ContainerSizeType = keyof typeof ContainerSize;

const classes = addContext(() => {
    const Container = block('container',
        Box({
            width: percent(100),
            padding: 0,
            margin: [0, AUTO]
        })
    );

    const base = getSettings();
    const { xSmall, small, medium, large, xLarge } = base.sizes;

    const ContainerAll = Container.extend(ContainerSize.all);
    const ContainerXSmall = Container.extend(ContainerSize.xs);
    const ContainerSmall = Container.extend(ContainerSize.sm);
    const ContainerMedium = Container.extend(ContainerSize.md);
    const ContainerLarge = Container.extend(ContainerSize.lg);
    const ContainerXLarge = Container.extend(ContainerSize.xl);

    containerSize(ContainerAll, xSmall, small, medium, large, xLarge);
    containerSize(ContainerXSmall, xSmall);
    containerSize(ContainerSmall, small);
    containerSize(ContainerMedium, medium);
    containerSize(ContainerLarge, large);
    containerSize(ContainerXLarge, xLarge);

    return {
        Container,
        ContainerAll,
        ContainerXSmall,
        ContainerSmall,
        ContainerMedium,
        ContainerLarge,
        ContainerXLarge
    };
});

export interface IContainerProps {
    children?: any;
    className?: string;
    id?: string;
    screenSize?: ContainerSizeType | ContainerSizeType[];
}

export const Container: React.FC<IContainerProps> = ({
    children,
    className,
    id,
    screenSize
}) => {

    let classNames = new ClassNames(classes.Container, className);

    if (screenSize) {
        let sizes = screenSize instanceof Array ? screenSize : [screenSize];
        sizes.forEach(size => {
            switch (size) {
                case 'all':
                    classNames.add(classes.ContainerAll);
                    break;
                case 'xs':
                    classNames.add(classes.ContainerXSmall);
                    break;
                case 'sm':
                    classNames.add(classes.ContainerSmall);
                    break;
                case 'md':
                    classNames.add(classes.ContainerMedium);
                    break;
                case 'lg':
                    classNames.add(classes.ContainerLarge);
                    break;
                case 'xl':
                    classNames.add(classes.ContainerXLarge);
                    break;
            }
        });
    }

    return (
        <div
            className={classNames.toString()}
            id={id}>
            {children}
        </div>
    );
}