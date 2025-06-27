import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../router/Auth';
import { API } from '../external/Axios';
import { notification } from 'antd';
export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = UseAuth()
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        try {
            let response = await API.post('/user/register', {
                'email': email,
                'password': password
            })
            login(response.data.token)
            navigate('/dashboard')
        } catch (e) {
            console.log(e)
            api['error']({
                message: 'Error',
                description:
                    JSON.stringify(e.response.data),
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
        <form method="post" onSubmit={register}>
            <div class="container">
                <label for="uname"><b>Email</b></label>
                <input type="email" placeholder="Enter Username" name="uname" value={email} onChange={e => setEmail(e.target.value)} required />
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className="button-login">Register</button>
                <Link to={'/login'}>
                    <button className="button-login">Login</button>
                </Link>
            </div>
        </form>
    </div>;
}

