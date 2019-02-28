import * as React from 'react';

export interface IProgressBarProps {
    id?: string;
    className?: string;
    value?: number;
    min?: number;
    max?: number;
    showPercentage?: boolean;
    decimal?: number;
    decimalFixed?: boolean;
}

export default class ProgressBar extends React.Component<IProgressBarProps, any> {
    render() {
        let {
            id,
            className,
            value,
            min,
            max,
            showPercentage,
            decimal,
            decimalFixed
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('progress-bar');
        if (this.props.children) {
            classNames.push('progress-bar-content');
        }

        min = parseNumber(min);
        max = parseNumber(max);
        let minOrZero = min || 0;
        let maxOrOne = max || 1;

        if (value < minOrZero) {
            value = minOrZero;
        }
        if (value > maxOrOne) {
            value = maxOrOne;
        }

        let percentage = 100 * (value - minOrZero) / (maxOrOne - minOrZero);
        let text = showPercentage ? numberToPercentage(percentage, decimal, decimalFixed) : undefined;

        let style = { "--progress-bar-progress": percentage + '%' };

        return (
            <div
                className={classNames.join(' ')}
                id={this.props.id}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuetext={text}
                style={style as any}
            >
                {this.props.children ?
                    <div>
                        {this.props.children}
                    </div> :
                    undefined}
            </div>
        );
    }
}

function parseNumber(value: string | number) {
    if (typeof value === 'number') {
        return value;
    } else {
        value = parseFloat(value);
        if (!isNaN(value) && isFinite(value)) {
            return value;
        } else {
            return undefined;
        }
    }
}

function numberToPercentage(value: number, decimals: number, fixed: boolean) {
    if (fixed || !Number.isInteger(value)) {
        return value.toFixed(decimals || 0) + '%';
    } else {
        return value + '%';
    }
}