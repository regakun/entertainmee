const initialState = {
    movies: [],
    movieDetails: {},
    movieRecommendation: [],
    page: 1
}

function reducer(state = initialState, action) {
    const { type, payload } = action

    if (type === 'movieDetails/set') {
        return { ...state, movieDetails: payload }
    }
    else if (type === 'movies/set') {
        return { ...state, movies: payload }
    }
    else if (type === 'moviesRecommendation/set') {
        return { ...state, moviesRecommendation: payload }
    }
    return state
}

export default reducer