import "./App.css";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import { useDataLayerValue } from "./reducer/DataLayer";
function App() {
  const [{ token, user }, dispatch] = useDataLayerValue();
  return (
    <div className="App">
      {!token && <Login />}
      {token && <Main />}
    </div>
  );
}

export default App;
