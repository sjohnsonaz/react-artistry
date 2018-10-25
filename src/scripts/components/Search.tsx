import * as React from 'react';

export interface ISearchProps {
    buttonText?: any;
    options?: string[];
    altAction?: (option: string) => any;
    altActionText?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onSelectOption?: (event: React.KeyboardEvent<HTMLInputElement>) => any;
}

export interface ISearchState {
    activeOption?: number;
    value?: string;
    baseValue?: string;
}

export default class Search extends React.Component<ISearchProps, any> {
    state: ISearchState = {
        activeOption: -1
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        let options = this.props.options || [];
        let activeOption: number;
        switch (event.keyCode) {
            case 38: // Up
                activeOption = this.state.activeOption;
                activeOption--;
                if (activeOption < -1) {
                    activeOption = -1;
                }
                this.setState({
                    activeOption: activeOption,
                    value: options[activeOption]
                });
                break;
            case 40: // Down
                activeOption = this.state.activeOption;
                activeOption++;
                if (activeOption >= options.length) {
                    activeOption = options.length - 1;
                }
                this.setState({
                    activeOption: activeOption,
                    value: options[activeOption]
                });
                break;
        }
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: (event.target as HTMLInputElement).value
        });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    componentWillReceiveProps(nextProps: ISearchProps) {
        this.setState({
            value: nextProps.value
        });
        if (nextProps.options) {
            if (nextProps.options.length > this.state.activeOption) {
                this.setState({
                    activeOption: nextProps.options.length - 1
                });
            }
        } else {
            this.setState({
                activeOption: -1
            });
        }
    }

    render() {
        let {
            buttonText,
            options,
            altAction,
            altActionText
        } = this.props;
        return (
            <div className="search">
                <div className="button-group search-button-group">
                    <input
                        className="input search-input fill-width"
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        value={this.state.value}
                    />
                    <button className="button search-button">{buttonText || 'Search'}</button>
                </div>
                <div className="search-option-box">
                    <ul role="listbox" className="search-option-list">
                        {!options ? undefined : options.map((option, index) => {
                            let optionClassName = ['search-option'];
                            if (index === this.state.activeOption) {
                                optionClassName.push('search-option-active');
                            }
                            return (
                                <li className={optionClassName.join(' ')} role="presentation" key={option}>
                                    <div className="search-option-action" role="option">
                                        <div className="search-option-action-text">
                                            <span><b>{option}</b></span>
                                        </div>
                                    </div>
                                    {altAction && altActionText ?
                                        <div className="search-option-alt-action" onClick={altAction.bind(this, option)}>
                                            <div className="search-option-alt-action-text">{altActionText}</div>
                                        </div> :
                                        undefined}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}