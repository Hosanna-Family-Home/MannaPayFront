import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Login from './Login';
import Home from './Home';
import AdminHome from './AdminHome';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/home"}>
              {true ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path={"/adminHome"}>
              {sessionStorage.getItem('userInfo') ? <AdminHome /> : <Redirect to="/home" />}
            </Route>
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
