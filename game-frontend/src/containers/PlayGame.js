import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PlayGame.css";
import { useAppContext } from "../libs/contextLib";
import { useLocation } from "react-router-dom";
import { AppContext } from "../libs/contextLib";

export default function PlayGame() {

		const location = useLocation();
		const { userEmail } = useAppContext();

	return(
	<>
		<div className="Home">
                    <div className="lander">
                      <h1>Playing Game</h1>
                      <AppContext.Provider value={ userEmail }>
                      </AppContext.Provider>
                      <p className="text-muted">Playing as: {userEmail} </p>
                      <p className="text-muted">ID: {location.state.detail}</p>
                    </div>

               </div>

               </>

	);
}