const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.payload
        default:
            return state
    }
}

export const filter = (input) => {
    return {
        type: 'SEARCH',
        payload: input
    }
}

export default reducer