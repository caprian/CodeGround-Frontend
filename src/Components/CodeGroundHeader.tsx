import React from "react";
import { useCompilerStoreContext } from "./CompilerStore";
import { useStore } from "zustand";
import { Link } from "react-router-dom";
import CodeGround from "../Images/CodeGround.png";
import { Button } from "@mui/material";

interface ICodeGroundHeaderProps {
	isCodeGroundArea?: boolean;
	headerCssClassName?: string;
}

export default function CodeGroundHeader(props: ICodeGroundHeaderProps) {
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
						{!userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onSignInButtonClick}>
									Log In
								</Button>
							</li>
						)}
						{!userLogged && (
							<li className="navbar-list_items">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onSignUpButtonClick}>
									Register
								</Button>
							</li>
						)}

						{userLogged && (
							<li className="navbar-list_lastitem">
								<Button
									style={{ color: "white" }}
									variant="text"
									onClick={onLogOutClick}>
									Log out
								</Button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
}
