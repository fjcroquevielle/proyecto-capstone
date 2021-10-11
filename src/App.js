import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';

import {
  FreeDownload, 
  Home, 
  LoggedHome,
  SignUp, 
  SignIn,
  MyPage,
  UsersRoute,
  User,
  Projects,
  Project
} from "./routes";
import './App.css';
import { ROUTES } from './constants';
import store from './store';
import { VerifyAccount } from './routes/VerifyAccount';
import { ProjectList, RvipLayout } from './components';
import "../src/components/styles/List.css"

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} /> 
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <RvipLayout>
                <Route path={ROUTES.FREE_DOWNLOADS} component={FreeDownload} />
                <Route path={ROUTES.LOGGED_HOME} component={LoggedHome} />
                <Route path={ROUTES.MY_ORG} component={UsersRoute} />
                <Route path={ROUTES.MY_ACCOUNT} component={MyPage} />
              {/* <Route path={ROUTES.MY_PAGE} component={User}/> */}
                <Route path={ROUTES.USER_PAGE} component={User} />
                <Route path={ROUTES.PROJECT_PAGE_VIEW} component={Project} />
                <Route path={ROUTES.PROJECT_PAGE} component={Project} />
                <Route path={ROUTES.PROJECTS} component={ProjectList} />
                {/* <Route path={ROUTES.VERIFY_ACCOUNT} component={VerifyAccount} /> */}     
          </RvipLayout>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
