import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

const MODEL_ID = 'face-detection'; 

const returnClarifaiJSONRequest = (imageUrl) => {
    const PAT = '3dcc9a350c6a47939d302dfe2a001482';
    const USER_ID = 's7wdgaqd4df5gg';    
    const APP_ID = 'face-recognition-app';  
    const IMAGE_BYTES_STRING = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        }
    }

     calculateFaceLocation = (data) => {
        console.log(data);
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        console.log(imageWidth, imageHeight);
        return {
            leftCol: clarifaiFace.left_col * imageWidth,
            topRow: clarifaiFace.top_row * imageHeight,
            rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
            bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiJSONRequest(this.state.input))
        .then(response => response.json())
        .then(response => this.calculateFaceLocation(response))
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;