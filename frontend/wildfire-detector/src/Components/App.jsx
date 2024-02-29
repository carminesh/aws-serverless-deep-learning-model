import '../Style/App.css';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="Header">
        <h2>Wildfire Prediction</h2>
      </header>

      <ImageUploader/>
    </div>
  );
}

export default App;
