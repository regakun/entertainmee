// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ApolloProvider } from '@apollo/client/react'
import client from './config/graphql'
import Home from './components/home'
import List from './components/list'
// import Favorites from './components/favorites'
import Details from './components/details'
import Form from './components/form'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Entertain Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/movies">
                  Movies
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/series">
                  Series
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/create">
                  Create
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/favorites">
                  Favorites
                </Link>
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/movies/update/:id">
              <Form types="update" keys="movie"/>
            </Route>
            <Route path="/series/update/:id">
              <Form types="update" keys="series"/>
            </Route>
            <Route path="/series/details/:id">
              <Details types="series" />
            </Route>
            <Route path="/movies/details/:id">
              <Details types="movies" />
            </Route>
            <Route path="/series/">
              <List types="series" />
            </Route>
            <Route path="/movies/">
              <List types="movies" />
            </Route>
            <Route path="/create/">
              <Form types="create" />
            </Route>
            <Route path="/favorites">
              <Home types="favorite" />
            </Route>
            <Route exact path="/">
              <Home types="home" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

