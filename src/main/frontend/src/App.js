
import './App.css';
import React, {Component} from 'react';
import Dashboard from "./components/Dashboard"
import { Switch, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AuthService from "./services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./components/User/Detail";
import Planning from "./components/User/Planning";
import Rate from "./components/User/Rate";
import CommentsPage from "./components/User/CommentsPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
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


        return (
            <div className="container">

                <div style={{marginTop:40,marginLeft:20,marginRight:20,color:"black"}}>
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path={["/","/login"]} component={LoginPage} />
                        <Route exact path= "/details/:myId/:myNick" component={Detail} />
                        <Route exact path= "/planning" component={Planning}/>
                        <Route exact path= "/rate" component={Rate}/>
                        <Route exact path= "/comments" component={CommentsPage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
