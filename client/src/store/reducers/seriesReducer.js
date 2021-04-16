
const initialState = {
    series: [],
    serieDetails: {},
    page: 1
}

function reducer(state = initialState, action) {
    const { type, payload } = action

    if (type === 'serieDetails/set') {
        return { ...state, serieDetails: payload }
    }
    else if (type === 'series/set') {
        return { ...state, series: payload }
    }
    return state
}

export default reducer