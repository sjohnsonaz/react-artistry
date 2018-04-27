import * as React from 'react';

import { Code, Section } from '../../../../../scripts/modules/ReactArtistry';

export interface ICodeViewProps {

}

export default class CodeView extends React.Component<ICodeViewProps, any> {
    render() {
        return (
            <Section title="Code">
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </Section>
        );
    }
}
