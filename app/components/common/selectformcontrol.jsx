import React from 'react';

class SelectFormControl extends React.Component {
    constructor(){
        super()

        this.renderOptions = this.renderOptions.bind(this);
    }
    renderOptions(options){
        return options.map(function (item) {
            return (
                    <option key={item.id} value={item.id}>{item.name}</option>
            );
        }, this);
    }
    render(){
        let wrapperClass = "form-group";
        if(this.props.error && this.props.error.length > 0){
            wrapperClass += " has-error";
        }
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select className="form-control" name={this.props.name} 
                        placeholder={this.props.placeholder} ref={this.props.name}
                        value={this.props.value} onChange={this.props.onChangeEvent}>
                        {this.renderOptions(this.props.options)}
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        )
    }
}

SelectFormControl.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onChangeEvent: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.number,
    error: React.PropTypes.string
};

export default SelectFormControl;