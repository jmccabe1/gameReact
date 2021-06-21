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
import { useAppContext } from "./libs/contextLib";

function App() {
	const history = useHistory();
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [userEmail, setUserEmail] = useState();
    const [gameID, setGameID] = useState(null);
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
      setGameID(null);
      history.push("/login");
    }
    function makeGame() {
    try {
    if (userEmail == null) {
    	userHasAuthenticated(false);
    	history.push("/login");
    }
    else{
    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerID: userEmail })
        };
        const request = async () => {
        const response = await fetch('http://localhost:8080/api/v1/game/', requestOptions)
        .then((response) => response.json())
        .then((responseData) => {
							console.log(responseData);
                    setGameID(responseData.gameID);
                    return responseData;
             })
             .catch(error => console.warn(error));
            };
            request();
    }
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
			{gameID && isAuthenticated ? (
			<>
				<div className="font-weight-bold text-muted">
				{gameID}
				</div>
				<Nav.Link className="copyButton" onClick={() => {navigator.clipboard.writeText(gameID)}}>
          	 	Copy ID
  				</Nav.Link>
				</>
			) : (
          <Navbar.Brand className="font-weight-bold text-muted">
            Welcome
          </Navbar.Brand>
          )
			}
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
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userEmail, setUserEmail }}>
        <Routes />
      </AppContext.Provider>
    </div>
  )
);
}
export default App;