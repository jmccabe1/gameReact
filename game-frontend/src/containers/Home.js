import React from "react";
import "./Home.css";
import LoaderButton from "../components/LoaderButton";


export default function Home() {
    return(
         <div className="Home">
              <div className="lander">
                <h1>The Game</h1>
                <p className="text-muted">A simple app</p>
              </div>
         </div>
    );
}