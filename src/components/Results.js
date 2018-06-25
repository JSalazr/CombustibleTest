import React from 'react';
import PropTypes from 'prop-types';

class Results extends React.Component {
    render(){
        return(<div>
            Total Llenado: {this.props.totalPositive}
            <br/>
            Total Consumo: {this.props.totalNegative}
            <br/>
            Combustible en Tanque: {this.props.totalPositive + this.props.totalNegative}
        </div>);
    }
}

Results.propTypes = {
    totalPositive: PropTypes.number.isRequired,
    totalNegative: PropTypes.number.isRequired
};

export default Results