import * as React from 'react';

export interface IFormInputProps extends React.HTMLProps<HTMLInputElement> {
    model: Object;
    modelProp: string;
}

export default class FormInput extends React.Component<IFormInputProps, any> {
    onInput = (event?: React.FormEvent<HTMLInputElement>) => {
        let { model, modelProp } = this.props;
        if (model) {
            model[modelProp] = (event.target as HTMLInputElement).value;
        }
    }

    render() {
        let { model, modelProp } = this.props;
        return <input {...this.props} value={model ? model[modelProp] : undefined} onInput={this.onInput} />
    }
}
