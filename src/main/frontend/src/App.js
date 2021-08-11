
import './App.css';
import React, {Component} from 'react';
import Dashboard from "./components/Dashboard"
import { Switch, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AuthService from "./services/AuthService";
import Dropdown from "react-bootstrap/Dropdown";
import {IoLogOutOutline} from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./components/Detail";
import Planning from "./components/Planning";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showUserBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.roles.includes("ROLE_DEVELOPERS"),
                showAdminBoard: user.roles.includes("ROLE_MANAGERS"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }


    render() {
        const { currentUser, showAdminBoard } = this.state;

        return (
            <div className="container">
                {/*<nav className="navbar navbar-expand navbar-dark" style={{paddingBottom:-3}}>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="None" style={{color:"black"}} >
                                    {currentUser.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/login" onClick={this.logOut} style={{color:"#004FB1"}}>
                                        Çıkış Yap <IoLogOutOutline size={18} style={{marginBottom:3,marginRight:5}}/>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) :  (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item" >
                                <Link to={"/login"} className="nav-link" style={{color:"black"}}>
                                    LOGIN
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>*/}

                <div style={{marginTop:40,marginLeft:20,marginRight:20,color:"black"}}>
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path={["/","/login"]} component={LoginPage} />
                        <Route exact path= "/details" component={Detail} />
                        <Route exact path= "/planning" component={Planning}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
