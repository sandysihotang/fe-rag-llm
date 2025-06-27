import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../external/Axios";
import { UseAuth } from "../router/Auth";


export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = UseAuth()
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate()

    const doLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await API.post('/user/login', {
                'email': email,
                'password': password
            })
            login(response.data.token)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
            api['error']({
                message: 'File',
                description:
                    JSON.stringify(e.response),
            })
        }
    }

    return <div className="main-container">
        <div className="navbar">
            <div className="nav-left">
                <button className="toggle-btn">
                    <img src="images/icon-menu.svg" alt="" />
                </button>
                <img src="images/logo.svg" alt="" className="main-logo" />
            </div>
        </div>
        {contextHolder}
        <form className="container" onSubmit={doLogin} >
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="button-login">Login</button>
            <Link to={'/register'}>
                <button className="button-login">Register</button>
            </Link>
        </form>
    </div>;
}

