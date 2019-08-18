import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import { Breadcrumb } from "antd";
import Loadable from "react-loadable";

import { history } from "./lib";

import ProtectedRoute from "./containers/protect";
// extra sample code begin
import ReduxForm from "./containers/redux-form";
import ReduxXlsx from "./containers/redux-xlsx";
// extra sample code end
import Nav from "./containers/nav";
import Layout from "./components/layout";
import Logo from "./components/logo";
import Loading from "./components/loading";

const { Content, Footer, Header } = Layout;

const Home = Loadable({
  loader: () => import("./containers/home"),
  loading: Loading,
});
const Login = Loadable({
  loader: () => import("./containers/login"),
  loading: Loading,
});

// extra sample code begin
const PetStore = Loadable({
  loader: () => import("./containers/pet-store"),
  loading: Loading,
});
const Github = Loadable({
  loader: () => import("./containers/github"),
  loading: Loading,
});
const ReduxUi = Loadable({
  loader: () => import("./containers/redux-ui"),
  loading: Loading,
});
// extra sample code end

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute component={Main} />
        </Switch>
      </Router>
    );
  }
}

const Main = () => (
  <Layout>
    <Header>
      <Logo />
      <Nav />
    </Header>
    <Content>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {/* extra sample code begin */}
        <Breadcrumb.Item>PetStore</Breadcrumb.Item>
        <Breadcrumb.Item>Github</Breadcrumb.Item>
        {/* extra sample code end */}
      </Breadcrumb>
      <Route path="/" exact component={Home} />
      {/* extra sample code begin */}
      <Route path="/github" component={Github} />
      <Route path="/pet-store" component={PetStore} />
      <Route path="/redux-ui" component={ReduxUi} />
      <Route path="/redux-form" component={ReduxForm} />
      <Route path="/redux-xlsx" component={ReduxXlsx} />
      {/* extra sample code end */}
    </Content>
    <Footer>Template-CRA-Redux ©2019 Created by 36node</Footer>
  </Layout>
);

export default (process.env.NODE_ENV === "development" ? hot(App) : App);
