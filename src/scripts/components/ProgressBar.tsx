import * as React from 'react';

export interface IProgressBarProps {
    className?: string;
    id?: string;
    value: number;
    title?: any;
}

export default class ProgressBar extends React.Component<IProgressBarProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('progress-bar');
        classNames.push('progress-bar-content')

        let value = this.props.value;
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }
        let style = { "--progress-bar-progress": value + '%' };

        let title = this.props.title || value + '%'

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                <div style={style as any}>
                    {title}
                </div>
            </div>
        );
    }
}
