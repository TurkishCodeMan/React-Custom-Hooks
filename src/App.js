import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Counter from "./apps/Counter";
import HookFlow from "./apps/HookFlow";
import LiftingState from './apps/LiftingState';
import Tictactoe from './apps/Tictactoe';
import { ContextProvider } from './apps/utils/ContextProvider';
import Tilt from './apps/Tilt';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="w-full sticky top-0 bg-gray-300" >

          <nav>
            <ul className="sm:flex w-full justify-evenly">
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/local-storage">Local Storage(Custom Hook)</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/hook-flow">Hook Flow</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/lift-state">Lift State</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/tictactoe">Tictactoe</Link>
              </li>
              <li className="py-3 rounded-md bg-blue-100 px-6">
                <Link to="/tilt">Tilt</Link>
              </li>
            </ul>
          </nav>




        </header>

        <Switch>
          <Route path="/local-storage">
            <Counter defaultValue={3} />
          </Route>
          <Route path="/hook-flow">
            <HookFlow />
          </Route>
          <Route path="/lift-state">
            <LiftingState />
          </Route>
          <Route path="/tictactoe">
            <ContextProvider>
              <Tictactoe />
            </ContextProvider>
          </Route>
          <Route path="/tilt">
            <Tilt>VanillaTilt</Tilt>
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
