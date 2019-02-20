import * as React from 'react';

import { alignClass, AlignType } from '../util/Align';

export interface ICellProps {
    className?: string;
    id?: string;
    columns?: number;
    offset?: number;
    align?: AlignType;
    width?: number | string;
}

export default class Cell extends React.Component<ICellProps, any> {
    render() {
        let {
            id,
            className,
            columns,
            offset,
            align,
            width
        } = this.props;

        let classNames = className ? [className] : [];
        if (columns) {
            classNames.push('col-' + columns);
        } else {
            classNames.push('col');
        }
        if (offset) {
            classNames.push('offset-' + offset);
        }
        if (align) {
            alignClass(align, classNames);
        }
        if (width && typeof width === 'number') {
            width += 'px' as any;
        }

        return <div
            className={classNames.join(' ')}
            id={id}
            style={{ '--col-width': width } as any}
        >
            {this.props.children}
        </div>
    }
}