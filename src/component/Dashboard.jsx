import { useState } from "react";
import clsx from "clsx";
import { UseAuth } from "../router/Auth";
import { Link, Outlet, useNavigate } from "react-router-dom";


const ChatGroup = () => {
  const [isActive, SetIsActive] = useState(false)
  const [nav, setActiveNav] = useState('folder')
  const activateToggle = () => {
    SetIsActive(!isActive)
  }
  const setActiveNavFunc = (title) => {
    setActiveNav(title)
  }
  const navigate = useNavigate()
  const { logout } = UseAuth()
  const doLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="main-container">
      <div className="navbar">
        <div className="nav-left">
          <button className="toggle-btn" onClick={activateToggle}>
            <img src={window.location.origin + "/images/icon-menu.svg"} alt="" />
          </button>
          <img src={window.location.origin + "/images/logo.svg"} alt="" className="main-logo" />
        </div>
      </div>

      <div className="bottom-sec">
        <div className={clsx({ active: isActive, 'side-menu': true })} >
          <ul>
            <li>
              <Link to={'/dashboard'} className="ls">
                <img src={window.location.origin + "/images/open-folder.png"} alt="" />&nbsp;&nbsp;&nbsp;
                <button className={nav === 'folder' ? 'active' : ''} onClick={() => setActiveNavFunc("folder")}>Your Folder</button>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/chat'}>
                <img src={window.location.origin + "/images/chat-images.png"} alt="" />&nbsp;&nbsp;&nbsp;
                <button className={nav === 'chat' ? 'active' : ''} onClick={() => setActiveNavFunc('chat')}> Chat</button>
              </Link>
            </li>
            <li>
              <img src={window.location.origin + "/images/log-out.png"} alt="" />
              <button onClick={doLogout}>Logout</button>
            </li>
          </ul>
        </div>
        <Outlet></Outlet>
      </div>
    </div>);
}

export { ChatGroup }; 