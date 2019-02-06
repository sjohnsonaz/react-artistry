import * as React from 'react';

import { Cell, Grid, List, Search, Section, Row } from '../../../../../scripts/modules/ArtistryReact';

export interface IListViewProps {

}

export interface IListViewState {
    searchValue: string;
}

interface IListData {
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: IListData[] = [{
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

export default class ListView extends React.Component<IListViewProps, IListViewState> {
    constructor(props: IListViewProps, context: any) {
        super(props, context);
        this.state = {
            searchValue: ''
        };
    }

    onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchValue: event.target.value
        });
    }

    render() {
        return (
            <Section header="List">
                <Grid space>
                    <Row>
                        <Cell>
                            <Search
                                value={this.state.searchValue}
                                options={[
                                    'Option 1',
                                    'Option 2',
                                    'Option 3'
                                ]}
                                showOptions
                                onChange={this.onChangeSearch}
                                //onSelectOption={this.onSelectOption}
                                //onSearch={this.onSearch}
                                //onClose={this.onClose}
                                fill
                            />
                        </Cell>
                    </Row>
                </Grid>
                <List
                    data={data}
                    template={item => item.ingredient}
                />
            </Section>
        );
    }
}
