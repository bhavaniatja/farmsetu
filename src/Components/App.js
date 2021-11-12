import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"
import Register from "./Register";
import Reset from "./Reset";
import Login from "./Login"
import FarmerDashBoard from "./FarmerDashBoard";
import JeevamrutDashBoard from "./JeevamrutDashBoard";
import B2bDashBoard from "./B2bDashBoard";
import B2bOrdersDashBoard from "./B2bOrdersDashBoard";
import B2bRegister from "./B2bRegister";
function App() {
  function DashCheck() {
    const [user] = useAuthState(auth);
    console.log("dash");
    if (!user) { return <Redirect to="/" /> }
    else { return <JeevamrutDashBoard /> }
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/farmerdb" component={FarmerDashBoard} />
          <Route exact path="/jeevamrutdb" component={JeevamrutDashBoard} />
          <Route exact path="/b2bdb" component={B2bDashBoard} />
          <Route exact path="/b2bregister" component={B2bRegister} />
          <Route exact path="/b2borders" component={B2bOrdersDashBoard} />
          <Route exact path="/dashboard">
            <DashCheck />
          </Route>
          <Route exact path="/reset" component={Reset} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}
export default App