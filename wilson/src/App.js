import React from 'react';
import './App.css';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';

const config = {
  bucketName: 'prog-app',
  dirName: 'code_image', /* optional */
  region: 'ap-south-1',
  accessKeyId: 'AKIAIDUEQMBWJ3EPI7KQ',
  secretAccessKey: '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',
}

class App extends React.Component{
  constructor(){
    super();

  }
  handleSubmit=(e)=>{
    console.log("Form works")
    alert(this.state.title+"::"+this.state.theory)
    
    e.preventDefault();
  }
  handleChangetitle=(e) =>{
    this.setState({title: e.target.value});
  }
  handleChangetheory=(e) =>{
    this.setState({theory: e.target.value});
  }
  handleChange=(e)=>{
    this.setState({language:e.target.value});
  }
  upload(e){
    //console.log(e.target.files[0]);
    S3FileUpload.uploadFile(e.target.files[0],config)
    .then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      alert(err);
    })
  }
  render(){
    return (
      <div>
        <h1>AWS File upload</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
          <label>
          Pick your favorite flavor:
          <select value={this.state.language} onChange={this.handleChangeLanguage}>
            <option value="Cpp">Cpp</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
           
          </select>
        </label>
            <input type="text" value={this.state.title} onChange={this.handleChangetitle}></input>
            <input type="text" value={this.state.theory} onChange={this.handleChangetheory}></input>
            <input type="file" onChange={this.upload}></input>
            <input type="submit" value="Submit"  />
          </form>
        </div>
      </div>
      );
    }
  }
  export default App;
