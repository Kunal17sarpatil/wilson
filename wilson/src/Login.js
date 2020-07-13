import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import './Login.css'
import './dashBoard.css'
import DashBoard from './DashBoard';
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            resp: "",
            flag:0
        }
    }
    handleChangePass = (e) => {
        //console.log(e.target.value)
        this.setState({
            password: e.target.value
        })

        //this.state.password=e.target.value
        //console.log(this.password)
    }

    handleChangeUser = (e) => {
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            })
        };
        fetch('http://15.206.132.187:8080/login', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("response---", data)
                this.setState({ resp: data['status'] })
                console.log('My res--')
                console.log(this.state.resp)
                if (this.state.resp== "success") {
                    console.log('in if')
                    this.setState({
                        flag:1
                    })
                   
                } else{
                    this.setState({
                        flag:2
                    })
                }

            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });



    
        

        e.preventDefault()

    }
    render() {
        if (this.state.flag=== 1) {
            return(
                <DashBoard/>
            )
            
        }else if(this.state.flag==2){
            alert('Login Failed')
            return(<Login/>)
        }
         else {
            return (
               
                <div className="Login">
                    <h1 className="login_color">Login</h1>
                    <Card className="card3">
                        <Col>
                            <form onSubmit={this.handleSubmit}>

                                <Row>
                                    <label className = "username_color">
                                        UserName:<br></br>
                                <input className="title" type="text" value={this.state.userName} onChange={this.handleChangeUser}></input>
                                    </label>
                                </Row>
                                <Row>
                                    <label className = "password_color">
                                        Password:<br></br>
                                <input className="theory" type="text" value={this.state.password} onChange={this.handleChangePass}></input>
                                    </label>
                                </Row>

                                <Row>
                                    <input className="submit" type="submit" ></input>
                                </Row>
                            </form>
                        </Col>
                    </Card>
                </div>
              
            );
        }
    }
}

export default Login;