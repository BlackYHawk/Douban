  /*global fetch*/
  const LOAD_DATA = 'LOAD_DATA'
  const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS'
  const LOAD_DATA_FAILED = 'LOAD_DATA_FAILED'

  const initialState = {
    loading: true,
    error: null,
    movies: {}
  }

  export default function reducer (state = initialState, action) {
    switch (action.type) {
      case LOAD_DATA:
        return {
          ...state,
          loading: true,
          error: null
        }
      case LOAD_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          movies: action.movies
        }
      case LOAD_DATA_FAILED:
        return {
          ...state,
          loading: false,
          error: action.error
        }
      default:
        return state
    }
  }

  export function loadData (api) {
    return {
      types: [LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED],
      promise: fetch(api)
    }
  }
