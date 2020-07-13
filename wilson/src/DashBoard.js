import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import './dashBoard.css'
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import Loader from './Loader'
const config = {
    bucketName: 'prog-app',
    dirName: 'code_image', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIAIDUEQMBWJ3EPI7KQ',
    secretAccessKey: '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',
}
class DashBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            language: "Python",
            title: "",
            theory: "",
            code_img_url: "",
            loader:false
        }
    }
    handleChangeLanguage = (e) => {
        this.setState({
            language: e.target.value
        })
    }
    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleTheory = (e) => {
        this.setState({
            theory: e.target.value
        })
    }
    handleSubmit = (e) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                theory: this.state.theory,
                language: this.state.language,
                img_url: this.state.code_img_url
            })
        };
        fetch('http://15.206.132.187:8080/addContent', requestOptions)
            .then(async response => {
                const data = await response;

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("response", data)
                this.setState({ title:"",theory:"",code_img_url:"" ,language:"Python"})
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
            e.preventDefault();
       
    }
    upload = (e) => {
        //console.log(e.target.files[0]);
        this.setState({
            loader:true
        })
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data["location"]);
                this.setState({ code_img_url: data["location"],loader:false });

            })
            .catch((err) => {
                alert(err);
            })
    }
    render() {

        return (
            <html>
            <body>
                
                <div className="outer-div">
                    <div className="inner-div">
                        <div className="card1">
                            <h1 className="heading1">DASH BOARD</h1>
                            <Card className="card2">
                                <Col>
                                    <form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <label className="lang">
                                                Language:<br></br>
                                                </label>
                                                
                                                <select value={this.state.language} onChange={this.handleChangeLanguage}>
                                                    <option value="Java">Java</option>
                                                    <option value="Cpp">Cpp</option>
                                                    <option value="Python">Python</option>
                                                </select>
                                           
                                        </Row>
                                        <Row>
                                            <label className = "title_color">
                                                <br></br>Title:<br></br>
                                                </label>
                                                
                                                <input className="title" type="text" value={this.state.title} onChange={this.handleTitle}></input>
                                            
                                        </Row>
                                        <Row>
                                            <label>
                                                <h4 className="theory_color">Theory:</h4>
                                                <textarea className="theory" cols="50" rows="10" type="text" value={this.state.theory} onChange={this.handleTheory}></textarea>
                                            </label>
                                        </Row>
                                        <Row>
                                            <label className="code">
                                                Code:<br></br>
                                                </label>
                                            <input type="file" name="Code Image" onChange={this.upload}></input>
                                            
                                        </Row>
                                    <Row>
                                        {(this.state.loader) ? <Loader/> : <input className="submit" type="submit" ></input>}
                                        
                                    </Row>
                                </form>
                            </Col>
                        </Card>
                    </div>
                </div>
            </div>
            </body>
            </html>
        );
    }
}

export default DashBoard;