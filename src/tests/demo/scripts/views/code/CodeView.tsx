import * as React from 'react';

import { Code, Section } from '../../../../../scripts/modules/ArtistryReact';

export interface ICodeViewProps {

}

export default class CodeView extends React.Component<ICodeViewProps, any> {
    render() {
        return (
            <Section header="Code" space>
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </Section>
        );
    }
}
