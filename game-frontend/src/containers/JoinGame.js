import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./JoinGame.css";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";

export default function JoinGame() {

	const [isLoading, setIsLoading] = useState(false);
	const [gameStatus, setGameStatus] = useState(null);
	const [fields, handleFieldChange] = useFormFields({
         gameID: ""
       });
   const { setReceivedGameID } = useAppContext();
   const history = useHistory();

   async function handleSubmit(event) {
       event.preventDefault();

       setIsLoading(true);

       try {
         const requestOptions = {
         	method: 'GET',
         	headers: { 'Content-Type': 'application/json' }
         };
         const request = async () => {
         	const response = await fetch('http://localhost:8080/api/v1/game/' + fields.gameID + '/status', requestOptions)
					.then((response) => response.text())
         		.then((responseData) => {
         			if (responseData == 'ONLINE') {
         				setReceivedGameID(fields.gameID);
                     history.push({
                     	pathname: "/play",
                       	state: { detail: fields.gameID }
                     })
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
          </div>
	);
}