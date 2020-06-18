import * as React from 'react';

import Draggable from '../../../../src/scripts/components/Draggable';
import Sortable from '../../../../src/scripts/components/Sortable';

export interface ISortableViewProps {

}

export default class SortableView extends React.Component<ISortableViewProps, any>{
    render() {
        return (
            <Sortable items={[1]} />
        );
    }
}
