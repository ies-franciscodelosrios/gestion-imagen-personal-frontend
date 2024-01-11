export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  if (token === null) return ''
  else return token
}
