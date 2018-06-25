import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Table} from 'antd';
import { connect } from 'react-redux';
import {ADD_QUANTITY} from '../constants/actionTypes';
import Results from './Results';

class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: {},
            totalPositive: 0,
            totalNegative: 0,
            currentKey: 0
        };
    }

    handleChange = (value) => {
        let d = new Date();
        let time = "" + d.getHours() + ":";
        if(d.getMinutes() < 10){
            time = time + "0" + d.getMinutes();
        }else{
            time = time + d.getMinutes();
        }
        const new_quantity = {
            value: parseInt(value, 10),
            time: time,
            key: this.state.currentKey
        }
        this.setState({ quantity: new_quantity });
    };

    handleSubmit = () => {
        this.props.addQuantity(this.state.quantity);
        if(this.state.quantity.value >= 0) {
            let newPos = this.state.totalPositive + this.state.quantity.value;
            this.setState({totalPositive: newPos});
        }else{
            let newNeg = this.state.totalNegative + this.state.quantity.value;
            this.setState({totalNegative: newNeg});
        }
        this.setState({currentKey: this.state.currentKey + 1})
    }

    render() {
        const columns = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
          }, {
            title: 'Amount',
            dataIndex: 'value',
            key: 'value'
          }];
        return(
            <div>
                <Input onChange={(event) => this.handleChange(event.target.value)}/>
                <Button onClick={this.handleSubmit}>
                    ADD
                </Button>
                <Table dataSource={this.props.quantities} columns={columns} />

                <Results totalPositive={this.state.totalPositive} totalNegative= {this.state.totalNegative} />
            </div>
        );
    }
}

Car.propTypes = {
    quantities: PropTypes.array.isRequired,
    addQuantity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        "quantities": state.fuel.quantities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addQuantity: (quantity) => {
            dispatch({ type: ADD_QUANTITY, quantity: quantity });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Car);