import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PlayGame.css";
import { useAppContext } from "../libs/contextLib";
import { useLocation } from "react-router-dom";

export default function PlayGame() {

		const location = useLocation();

	return(
		<div className="Home">
                    <div className="lander">
                      <h1>Playing Game</h1>
                      <p className="text-muted">ID: {location.state.detail}</p>
                    </div>

               </div>

	);
}