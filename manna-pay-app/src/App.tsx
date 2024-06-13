import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import Login from './Login';
import Home from './Home';
import AdminHome from './AdminHome';
import { userState } from './atom/Users';

function App() {
  const user = useRecoilValue(userState);

  return (
    <>
        <BrowserRouter>
          <Switch>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/home"}>
              {user.loginFlag || sessionStorage.getItem('userInfo') ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path={"/adminHome"}>
              {user.loginFlag || sessionStorage.getItem('userInfo') ? <AdminHome /> : <Redirect to="/home" />}
            </Route>
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
