import React from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./JoinGame.css";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

export default function JoinGame() {

	return(
		<div className="Home">
                          <div className="lander">
                            <h1>Joining Game</h1>
                            <p className="text-muted">ID: globalGameID</p>
                          </div>

                     </div>
	);
}