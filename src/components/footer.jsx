import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './custom.css';
import projectSound from '/sounds/Bolero.mp3';

const Footer = ({ showImage, setShowImage }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleImage = () => {
        setShowImage(!showImage);
    };

    const togglePlay = () => {
        const audio = document.getElementById('background_audio');
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="card-footer navbar-dark bg-dark footer fixed-bottom semi-transparent-footer" style={{ padding: '5px' }}>
            <div className="text-left" style={{ display: 'inline', float: 'left', paddingRight: '2px' }}>
                <button className="btn btn-outline-info btn-sm" onClick={toggleImage} id="background_image_btn">
                    Foreground toggle
                </button>
            </div>
            <div className="text-light center" style={{ display: 'inline' }}>
                <small>
                    Final Project for ReactJS Course&nbsp;&nbsp;
                    <a href="https://softuni.bg/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffa000' }}>
                        @SoftUni&nbsp;&nbsp;
                    </a>
                    by Takvor M. Garabedian - created July 2024&nbsp;&nbsp;&nbsp;
                </small>
                <small className="text-light text-center">
                    <Link to="/contact-us" style={{ color: '#f5deb3' }}>
                        Contact us
                    </Link>
                </small>
            </div>
            <div className="text-right" style={{ display: 'inline', float: 'right', paddingRight: '2px' }}>
                <audio hidden src={projectSound} datatype="audio/mp3" loop id="background_audio"></audio>
                <button className="btn btn-outline-info btn-sm" onClick={togglePlay}>
                    Background music
                </button>
            </div>
        </div>
    );
};

export default Footer;
