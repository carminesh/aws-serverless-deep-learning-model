import { useEffect, useState } from 'react';
import '../Style/App.css';
import ImageUploader from './ImageUploader';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';



function App() {
  const [userToken, setUserToken] = useState();


  

  async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      setUserToken(idToken.toString())
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
      currentSession()
  }, [])

  useEffect(() => {
    if(userToken) {
      //postData(userToken)
    }
  }, [userToken])


   
  return(
    <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
              <header className="Header">
                <h2>Wildfire Prediction</h2>
                <p id="user-text">Welcome {user.username}</p>
                <Button sx={{position: 'absolute', top: 60, right: 200}} startIcon={<ExitToAppIcon sx={{height: 40, width: 40}}/>} onClick={signOut}></Button>
              </header>
              <ImageUploader accessToken={userToken}/> {/* I should store the token within Redux, but for this simple app i would not */}
          </div>  
        )}
    </Authenticator>
  )
}

export default App;
