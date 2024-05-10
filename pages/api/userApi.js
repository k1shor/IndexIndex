const API = "https://api.indexithub.com/api"


export const userRegister = (user) =>{
    return fetch (`${API}/user/register`, {
        method: 'POST',
        headers: {   
            "Content-Type":"applciation/json"
        },
        body:user
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//user email confirmation or verify email
export const emailConfirmation = (token) => {
    return fetch(`${API}/user/verifyEmail/${token}`)
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//forget password
export const forgetPassword = (email) =>{
    return fetch(`${API}/user/forgetpassword`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email})
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//reset password
export const resetPassword = (password,confirm_password, token) =>{
    return fetch(`${API}/user/resetpassword/${token}`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({password, confirm_password})
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//login
export const userLogin = ({email, password}) =>{
    return fetch(`${API}/user/login`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            Accept: "application/json"
        },
        body:JSON.stringify({email, password})
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//logout
export const userlogout = () =>{     
    localStorage.removeItem('token')    
    localStorage.removeItem('user')    
    return fetch(`${API}/user/logout`)
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

// get all users
export const alluser = (token) =>{
    return fetch(`${API}/user/userList`,{
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

// client side user view
export const alluserclient = () =>{
    let API = "http://localhost:8000/api"
    return fetch(`${API}/user/userlistclient`)
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

// delete user
export const deleteUser = (id, token) =>{
    return fetch(`${API}/user/delete_user/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//user detail
export const userDetail = (id, token) =>{
    return fetch(`${API}/user/userDetails/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }})
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

//update user
export const userUpdate = (id, user, token)=>{
    return fetch(`${API}/user/updateUser/${id}`,{
        method: "PUT",
        headers:{
            Authorization:`Bearer ${token}`
        },
        body: user
    })
    .then(response =>{return response.json()})
    .catch(error => console.log(error))
}

// authenticate to keep sigined in
export const authenticate = (logininfo) => {
    localStorage.setItem('token', logininfo.token)
    localStorage.setItem('user', JSON.stringify(logininfo.user))
} 

// to check if logged in 
export const isAuthenticated = async () =>{
    return localStorage.getItem("token")? localStorage.getItem("token") : false 
}