import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {

    const navigate = useNavigate();

    return (
        <div className="app-container" style={{ backgroundColor: 'aqua' }}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 style={{ fontFamily: 'fantasy' }}>You have successfully ordered a cheesecake!</h1>
                <h4 style={{ fontFamily: 'cursive' }}>You will recieve a confirmation email shortly.</h4>
            </div>
        </div>
    );
};

export default Success;