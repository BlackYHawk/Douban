
export default store => next => {
    return action => {
        const {promise, types, ...rest} = action
        if (!promise) {
            return next(action)
        }

        const [REQUEST, SUCCESS, FAILED] = types
        next({...rest, type: REQUEST})

        return promise.then(response => response.json())
            .then(responseData => {
                next({
                    ...rest,
                    type: SUCCESS,
                    movies: responseData
                })
            })
            .catch(error => next({
                ...rest,
                type: FAILED,
                error
            }))
    };
}
