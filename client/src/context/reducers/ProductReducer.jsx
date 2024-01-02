const productReducer = (state = null, action) => {
    switch(action.type) {
        case "GET_ALL_PRODUCTS":
        return state;

        case "sET_ALL_PRODUCTS":
        return state;

        default:
            return state
    }
}

export default productReducer;