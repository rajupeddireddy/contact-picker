
import './App.css';
import ContactPicker from './components/contactPicker';

function App() {
  return (
    <div className="App">
      <ContactPicker/>
      <footer style={{position:'fixed', bottom:'0px', width:'100%',  padding:'10px', textAlign:'center', fontSize:'12px',}}>
        All rights reserved &copy;Raju Peddireddi
      </footer>
    </div>
  );
}

export default App;
