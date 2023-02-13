const handleSubmit = (email, pass) => {
    //reqres registered sample user
    const loginPayload = {
      email: 'admin@iestablero',
      password: 'root'
    }
  
    axios.post("http://127.0.0.1:8000/api/login", loginPayload)
      .then(response => {
        //get token from response
        const token  =  response.data.token;
  
        //set JWT token to local
        localStorage.setItem("token", token);
  
        //set token to axios common header
        setAuthToken(token);
  
 //redirect user to home page
        window.location.href = '/'
      })
      .catch(err => console.log(err));
  };