import React from "react";
import CodeGround from "./CodeGround";
import "./Dashboard.css";
import Home from "./Home";
import Header from "./Header";

export default function Dashboard() {
	return (
		// <div className="dashboard-container">
		// 	<CodeGround />
		// </div>
		<div>
			<Header />
			<Home />
			<Home />
		</div>
	);
}
