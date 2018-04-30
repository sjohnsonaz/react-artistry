import * as React from 'react';

import { Table, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface ITableViewProps {

}

interface ITableData {
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: ITableData[] = [{
    ingredient: 'Potato',
    quantity: '8 - 10',
    unit: 'potato'
}, {
    ingredient: 'Salt',
    quantity: 1,
    unit: 'teaspoon'
}, {
    ingredient: 'Butter',
    quantity: '2',
    unit: 'tablespoon'
}, {
    ingredient: 'Pepper',
    quantity: 1,
    unit: 'dash'
}, {
    ingredient: 'Hot Milk',
    quantity: '1/4',
    unit: 'cup'
}];

export default class TableView extends React.Component<ITableViewProps, any> {
    render() {
        return (
            <Section title="Table">
                <Table
                    id="table-component"
                    data={data}
                    columns={[{
                        header: 'Ingredient',
                        property: 'ingredient'
                    }, {
                        header: 'Quantity',
                        property: 'quantity',
                        template: item => <th><strong>{item.quantity}</strong></th>
                    }, {
                        header: 'Unit',
                        property: 'unit'
                    }]}
                />
            </Section>
        );
    }
}
