import React from "react";
import "./Header.css";
import CodeGround from "../Images/CodeGround.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompilerStoreContext } from "./CompilerStore";
import { useStore } from "zustand";

interface IHeaderProps {
	isCodeGroundArea?: boolean;
	headerCssClassName?: string;
}

export default function Header(props: IHeaderProps) {
	const store = useCompilerStoreContext();
	const SetOpenSignInDialog = store.getState().SetOpenSignInDialog;
	const SetOpenSignUpDialog = store.getState().SetOpenSignUpDialog;
	const userLogged = useStore(store, (state) => state.userLogged);
	const SetUserLogged = store.getState().setUserLogged;

	const onSignInButtonClick = () => {
		SetOpenSignInDialog(true);
	};

	const onSignUpButtonClick = () => {
		SetOpenSignUpDialog(true);
	};

	const onLogOutClick = () => {
		SetUserLogged(false);
	};
	return (
		<section className="banner-area">
			<div className={`header-bar ${props.headerCssClassName}`}>
				<div className="logo">
					<Link to="/">
						<img className="header-logo" src={CodeGround} alt={"logo"}></img>
					</Link>
				</div>
				<div className="nav-bar">
					<ul className="navbar-list">
						{/* {!props.isCodeGroundArea && !userLogged && ( */}
						{!props.isCodeGroundArea && !userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onSignInButtonClick}>
									Log In
								</Button>
							</li>
						)}
						{/* {!props.isCodeGroundArea && !userLogged && ( */}
						{!props.isCodeGroundArea && !userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onSignUpButtonClick}>
									Register
								</Button>
							</li>
						)}

						{/* {!props.isCodeGroundArea && userLogged && ( */}
						{!props.isCodeGroundArea && userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onLogOutClick}>
									Log out
								</Button>
							</li>
						)}
						{/* {!props.isCodeGroundArea && (
							<li className="navbar-list_items">
								<Button style={{ color: "white" }} variant="text">
									About
								</Button>
							</li>
						)} */}
						{!props.isCodeGroundArea && (
							<li className="navbar-list_lastitem">
								<Link className="start-learning_btn-link" to="/codeground">
									<Button className="start-learning_btn" variant="contained">
										{" "}
										Start Learning
									</Button>
								</Link>
							</li>
						)}
						{props.isCodeGroundArea && !userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onSignInButtonClick}>
									Log In
								</Button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
}
