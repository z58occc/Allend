import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


function CallbackHandler() {
    const navigate = useNavigate();
    const { client_id, redirect_uri, scope, response_type } = useParams();
    console.log(client_id)
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`http://localhost/Allend/backend/public/auth/google/callback?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`);
                console.log(response)
                const token = await response.data;
                console.log(token)
                Cookies.set('token', token)
                // navigate('/')
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

            fetchToken();
        }, []);

    return <div>處理中...</div>;
}


export default CallbackHandler;