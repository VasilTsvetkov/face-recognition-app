import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const returnClarifaiJSONRequest = (imageUrl) => {
    const PAT = '3dcc9a350c6a47939d302dfe2a001482';
    const USER_ID = 's-x-p-g-t-v-l-w-u-y';    
    const APP_ID = 'face-recognition-app';
    const MODEL_ID = 'face-detection';   
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

const particlesOptions = {
    "fullScreen": {
        "enable": true,
        "zIndex": -1
    },
    "detectRetina": true,
    "fpsLimit": 120,
    "interactivity": {
        "events": {
            "onClick": {
                "enable": true,
                "mode": "push"
            },
            "onDiv": {
                "elementId": "repulse-div",
                "enable": false,
                "mode": "repulse"
            },
            "onHover": {
                "enable": true,
                "mode": "connect",
                "parallax": {
                    "enable": false,
                    "force": 60,
                    "smooth": 10
                }
            },
            "resize": true
        },
        "modes": {
            "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 40,
                "speed": 3
            },
            "connect": {
                "distance": 80,
                "lineLinked": {
                    "opacity": 0.5
                },
                "radius": 60
            },
            "grab": {
                "distance": 400,
                "lineLinked": {
                    "opacity": 1
                }
            },
            "push": {
                "quantity": 4
            },
            "remove": {
                "quantity": 2
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            }
        }
    },
    "particles": {
        "color": {
            "value": "random"
        },
        "lineLinked": {
            "blink": false,
            "color": "#ffffff",
            "consent": false,
            "distance": 150,
            "enable": false,
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "attract": {
                "enable": false,
                "rotate": {
                    "x": 600,
                    "y": 1200
                }
            },
            "bounce": false,
            "direction": "none",
            "enable": true,
            "outMode": "out",
            "random": false,
            "speed": 6,
            "straight": false
        },
        "number": {
            "density": {
                "enable": true,
                "area": 800
            },
            "limit": 500,
            "value": 300
        },
        "opacity": {
            "animation": {
                "enable": false,
                "minimumValue": 0.1,
                "speed": 1,
                "sync": false
            },
            "random": false,
            "value": 0.5
        },
        "shape": {
            "type": "circle"
        },
        "size": {
            "animation": {
                "enable": false,
                "minimumValue": 0.1,
                "speed": 40,
                "sync": false
            },
            "random": true,
            "value": 5
        }
    },
    "polygon": {
        "draw": {
            "enable": false,
            "lineColor": "#ffffff",
            "lineWidth": 0.5
        },
        "move": {
            "radius": 10
        },
        "scale": 1,
        "type": "none",
        "url": ""
    },
    "background": {
        "color": {
            "value": "transparent"
        },
        "image": "",
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    onButtonSubmit = () => {
        fetch("https://api.clarifai.com/v2/models/" + "/outputs", returnClarifaiJSONRequest(this.state.input))
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    particlesInit = async engine => {
        await loadSlim(engine);
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className="tsparticles"
                    init={this.particlesInit}
                    options={particlesOptions}
                />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                {/*<FaceRecognition/>*/}
            </div>
        );
    }
}

export default App;