import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Rahasia from "./components/Rahasia";

// redux
import { useReducer } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

// reducer
const initEmail = "";
const emailReducer = (state = initEmail, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return action.email;

    case "LOGOUT":
      return "";

    default:
      return state;
  }
};

// store
const store = createStore(emailReducer);

function App() {
  const [stateEmail, dispatchEmail] = useReducer(emailReducer, initEmail);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav stateEmail={stateEmail} dispatchEmail={dispatchEmail} />
        <div className="container mt-5 mb-5">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/rahasia" component={Rahasia} />
            <Route path="/account/verify-email" component={Verify} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
