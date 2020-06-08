import * as authActions from "../actions/authActions"

const fetchToRegister = (data) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL

    const response = await fetch(`${API_URL}/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    try {
      const token = await response.headers.get('authorization').split(' ')[1]
      const user = await response.json()
      const userToRegister = { token, user }
      dispatch(authActions.registerSuccess(userToRegister))
    } catch (error) {
      console.log(error)
      alert("Erreur d'enregistrement")
      dispatch(authActions.registerFail())
      return false
    }
  }
}

const fetchToLogin = (data) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL

    const response = await fetch(`${API_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    try {
      const token = await response.headers.get('authorization').split(' ')[1]
      const user = await response.json()
      const userToLog = { token, user }
      dispatch(authActions.loginSuccess(userToLog))
    } catch (error) {
      console.log(error)
      alert("Aucun utilisateur correspondant")
      dispatch(authActions.loginFail())
      return false
    }
  }
}

const fetchToLoadUser = (token) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL
    const response = await fetch(`${API_URL}/api/v1/profile`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    try {
      const userToLoad = await response.json()
      dispatch(authActions.loadUser(userToLoad))

    } catch (error) {
      console.log(error)
    }
  }
}

export { fetchToRegister, fetchToLogin, fetchToLoadUser }