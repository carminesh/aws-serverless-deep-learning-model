import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.css';
import App from './Components/App';
import { Amplify } from 'aws-amplify';



  const REGION = process.env.REACT_APP_REGION
  const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID
  const USER_POOL_APP_CLIENT_ID = process.env.REACT_APP_USER_POOL_APP_CLIENT_ID


  Amplify.configure({
    Auth: {
      Cognito: {
        region: REGION,
        userPoolId: USER_POOL_ID,
        userPoolClientId: USER_POOL_APP_CLIENT_ID
      }
    }
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

