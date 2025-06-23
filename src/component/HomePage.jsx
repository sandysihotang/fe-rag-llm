import { Link } from "react-router";

export const HomePage = () => {

    return <div className="main-container">
        <div className="navbar">
            <div className="nav-left">
                <button className="toggle-btn">
                    <img src="images/icon-menu.svg" alt="" />
                </button>
                <img src="images/logo.svg" alt="" className="main-logo" />
            </div>
        </div>
        <div style={{ margin: 'auto', width: "50%", padding: "10px" }}>
            <h1 className="welcome">Chat Inventory Assistant</h1>
            <Link to={'/login'}>
                <button className="button-get-started button-get-started-hover">Get Started</button>
            </Link>
        </div>
    </div>;
}

