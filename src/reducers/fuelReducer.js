import {ADD_QUANTITY} from '../constants/actionTypes'

var initialState = {
    quantities: []
};

const fuel = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUANTITY:
            let tempState = state.quantities.slice();
            tempState.push(action.quantity);
            return {
                ...state,
                "quantities": tempState
            };
        default:
            return state
    }
}

export default fuel;