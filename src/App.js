import './App.css';
import Grid from './components/Grid'
import Settings from './components/Settings'

const App = () => {
  return (
    <div className="App">
      <Grid cols={16} rows={16} />
      <Settings />
    </div>
  );
}

export default App;
