import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Counter from "./apps/Counter";

function App() {
  return (
    <div className="App">
      <header className="w-full sticky top-0 bg-gray-300" >
        <Router>
          <nav >
            <ul className="flex w-full justify-evenly">
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/local-storage">Home</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/about">About</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/local-storage">
              <Counter defaultValue={3} />
            </Route>
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
