import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function CallbackHandler() {
  const navigate = useNavigate();
  const urlLocation = useLocation();
  const queryParams = new URLSearchParams(urlLocation.search);
  const authuser = queryParams.get('authuser');
  const code = queryParams.get('code');
  const prompt = queryParams.get('prompt');
  const scope = queryParams.get('scope');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          `http://localhost/Allend/backend/public/auth/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`
        );
        const objData = await response.json();
        Cookies.set('token', objData.token);
        navigate('/');
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return <div>處理中...</div>;
}

export default CallbackHandler;
