import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import {useHistory} from "react-router-dom";
import { onError } from "./libs/errorLib";

function App() {
	const history = useHistory();
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    useEffect(() => {
      onLoad();
    }, []);


    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch(e) {
        if (e !== 'No current user') {
          onError(e);
        }
      }

      setIsAuthenticating(false);
    }
    async function handleLogout() {
      await Auth.signOut();

      userHasAuthenticated(false);
    }
    function handleLogout() {
      userHasAuthenticated(false);
      history.push("/login");
    }
    function makeGame() {
    try {
    const request = async () => {
        const response = await fetch('http://localhost:8080/api/v1/game/', {method: 'POST'});
        const json = await response.json();
        console.log(json);
    }

    request();
	}
		catch(e) {
			onError(e);
		}

    }
return (
  !isAuthenticating && (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
            	<>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              <Nav.Link onClick={makeGame}>Create Game</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  )
);
}
export default App;