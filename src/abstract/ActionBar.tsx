import React from 'react';
import { block, addContext } from '@artistry/abstract';
import { Paper, getSettings, FlexContainer, Flex } from 'artistry';

let classes = addContext(() => {
    const base = getSettings();
    const ActionBar = block('action-bar',
        Paper({
            padding: 0,
            margin: base.space(1, 0.5)
        }),
        FlexContainer({
            justify: 'flex-end'
        })
    );
    ActionBar.rule('& > *', {
        margin: base.space(0, 0.5)
    });
    ActionBar.attr('direction', {
        forward: Flex({
            direction: 'row'
        }),
        reverse: Flex({
            direction: 'row-reverse'
        })
    });

    return {
        ActionBar
    };
});

export interface IActionBarProps {
    children?: any;
    direction?: 'forward' | 'reverse';
}

export const ActionBar: React.FC<IActionBarProps> = ({ children, direction }) => {
    return (
        <div
            className={classes.ActionBar}
            data-direction={direction}
        >{children}</div>
    );
};