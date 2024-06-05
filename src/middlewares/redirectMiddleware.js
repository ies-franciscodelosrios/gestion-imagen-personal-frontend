const redirectMiddleware = store => next => action => {
    if (action.type === 'appAuth/logout/fulfilled') {
        store.userData = {}
        store['accessToken'] = null
        store['refreshToken'] = null
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('token')
        localStorage.removeItem('stadistics')
        localStorage.removeItem('refreshToken')
    }
    return next(action)
  }
  
  export default redirectMiddleware;
  