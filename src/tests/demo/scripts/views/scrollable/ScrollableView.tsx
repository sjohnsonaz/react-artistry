import * as React from 'react';
import { Scrollable } from '../../../../../scripts/modules/ArtistryReact';

export interface IScrollableViewProps {

}

export default class ScrollableView extends React.Component<IScrollableViewProps> {
    bottom = async () => {
        console.log('bottom!');
    }

    render() {
        let values = [];
        for (let index = 0; index < 100; index++) {
            values.push(index);
        }
        return (
            <div>
                <Scrollable type="y" height="100px" bumper={10} onBottom={this.bottom}>
                    <ul>
                        {values.map((value, index) => <li key={index}>{value}</li>)}
                    </ul>
                </Scrollable>
            </div>
        );
    }
}