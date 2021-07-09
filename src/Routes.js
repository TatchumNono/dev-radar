import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp.js";
import SignIn from "./Components/SignIn.js";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default Routes;
