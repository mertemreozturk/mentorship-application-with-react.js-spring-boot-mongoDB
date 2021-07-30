import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/cjs/Button";
import AuthService from "../services/AuthService"

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state ={
            name:"",
            password:""
        }

        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    changeName = (e) =>{
        this.setState({name:e.target.value});
    }

    changePassword = (e) =>{
        this.setState({password:e.target.value});
    }

    handleLogin = (e) => {
        AuthService.login(this.state.name, this.state.password).then(
            () => {
                this.props.history.push("/dashboard");
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
        //window.location.reload();
    }

    render() {
        return (
            <div>
                <div>
                    <h3>
                        <Col className="panel-container" style={{opacity:0.9}}>
                            <Row>
                                <Col>
                                    Name:
                                    <input placeholder="What's your name" name="name" className="form-control"
                                           value={this.state.name} onChange={this.changeName}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}>
                                <Col>
                                    Password:
                                    <input placeholder="Enter your password" name="password" className="form-control"
                                           value={this.state.password} onChange={this.changePassword}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}>
                                <Button style={{width:250 ,margin:"auto"}} variant="outline-light"
                                        onClick={this.handleLogin}>Send Message</Button>
                            </Row>
                        </Col>
                    </h3>
                </div>

            </div>
        );
    }
}

export default Homepage;

