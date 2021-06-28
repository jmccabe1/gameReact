import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./JoinGame.css";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { AppContext } from "../libs/contextLib";

export default function JoinGame() {

	const [isLoading, setIsLoading] = useState(false);
	const [gameStatus, setGameStatus] = useState(null);
	const [fields, handleFieldChange] = useFormFields({
         gameID: ""
       });
       const [userEmail, setUserEmail] = useState();
   const { exportUserEmail } = useAppContext();
   const { setImportedGameID } = useAppContext();
   const history = useHistory();

   async function handleSubmit(event) {
       event.preventDefault();
		setUserEmail(exportUserEmail);
       setIsLoading(true);

       try {
         const requestOptions = {
         	method: 'GET',
         	headers: { 'Content-Type': 'application/json' }
         };
         const requestOptions2 = {
         	method: 'PUT',
            body: location.state.detail
         };
         const request = async () => {
         	const response = await fetch('http://localhost:8080/api/v1/game/' + fields.gameID + '/status', requestOptions)
					.then((response) => response.text())
         		.then((responseData) => {
         			if (responseData == 'ONLINE') {
							const request2 = async () => {
                     	const response2 = await fetch('http://localhost:8080/api/v1/game/' + fields.gameID + '/join', requestOptions2)
                        	.then((response) => response.json())
                        	.then((responseData) => {
										setImportedGameID(fields.gameID);
                           	history.push("/play")
                           	return responseData;
                        	})
                           .catch(error => console.warn(error));
         				};
         				request2();
         			} else {
         				alert("This game does not exist");
         				setIsLoading(false);
         			}
         			return responseData;
         		})
         		.catch(error => console.warn(error));
         };
         request();
       } catch (e) {
         onError(e);
         setIsLoading(false);
       }

 	}




	return(
		<div className="Login">
		<AppContext.Provider value={ exportUserEmail }>
			Joining as: {exportUserEmail}
         <Form onSubmit={handleSubmit}>
           <Form.Group size="lg" controlId="gameID">
             <Form.Label>Game ID</Form.Label>
                <Form.Control
                  autoFocus
                  type="gameID"
                  value={fields.gameID}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <LoaderButton
                block
                size="lg"
                type="submit"
                isLoading={isLoading}
              >
                Connect
              </LoaderButton>
            </Form>
            </AppContext.Provider>
          </div>
	);
}