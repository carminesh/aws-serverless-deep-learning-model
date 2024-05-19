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
  const [predictionResult, setPredictionResult] = useState();


  useEffect(() => {
     console.log('predictionResult: ', predictionResult)
  }, [predictionResult])



  async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      console.log('ID TOKEN : ', idToken);
      setUserToken(idToken.toString())
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
      currentSession()
  }, [])

  

   
  return(
    <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
              <header className="Header">
                <h2>Wildfire Prediction</h2>
                <Button sx={{position: 'absolute', top: 60, right: 200}} id="logout-btn" startIcon={<ExitToAppIcon id="logout-icon"/>} onClick={signOut}></Button>
              </header>
              
              <div className="AppBody">
                <p id="user-text">Welcome {user.username}</p>
                <ImageUploader id="uploader-div" accessToken={userToken} setPredictionResult={setPredictionResult}/> {/* I should store the token within Redux, but for this simple app i would not */}
                { predictionResult && 
                <div id="result-div">
                  <p>Predicted image: {predictionResult.predicted_label}</p>{/* <p>Prediction confidence: {predictionResult.confidence}</p> */}
                </div>
                }
              </div>
          </div>  
        )}
    </Authenticator>
  )
}

export default App;
