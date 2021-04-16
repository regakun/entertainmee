
const initialState = {
    loading: false
}

function reducer(state = initialState, action) {
    const { type, payload } = action

    if (type === 'loading/start') {
        return { ...state, loading: true }
    }
    else if (type === 'loading/done') {
        return { ...state, loading: false }
    }
    return state
}

export default reducer