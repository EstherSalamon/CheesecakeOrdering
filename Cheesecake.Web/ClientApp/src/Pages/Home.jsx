import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {

        const load = async () => {
            const { data } = await axios.get('/api/cheesecake/try');

            setMessage(data);
        };

        load();

    }, []);

    return (
        <div className="app-container" style={{backgroundColor: 'aqua'} }>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 style={{fontFamily: 'fantasy'} }>Welcome to the most awesome cheesecake ordering site!</h1>
                <button onClick={() => { navigate('/order') }} className="btn btn-light mb-3 w-50" style={{fontFamily: 'cursive'} }>Click here to order</button>
            </div>
        </div>
    );
};

export default Home;