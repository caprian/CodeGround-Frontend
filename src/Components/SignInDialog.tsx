import React, { useState } from "react";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useCompilerStoreContext } from "./CompilerStore";
import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import { useStore } from "zustand";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignInDialog.css";

export default function SignInDialog() {
	const store = useCompilerStoreContext();
	const openSignInDialog = useStore(store, (state) => state.openSignInDialog);
	const SetOpenSignInDialog = store.getState().SetOpenSignInDialog;
	const SetUserLogged = store.getState().setUserLogged;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => {
		SetOpenSignInDialog(false);
	};

	const handleLogIn = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post(
				"https://codeground-backend.onrender.com/auth/login",
				{
					emailId: email,
					password: password,
				}
			);
			if (response.status === 200) {
				SetUserLogged(true);
				SetOpenSignInDialog(false);
			} else if (response.status === 401) {
				setMessage("Invalid Credentials");
			}
		} catch (error: any) {
			if (error.response) {
				setMessage(error.response.data);
			} else if (error.request) {
				setMessage("No response from server");
			} else {
				setMessage("Error: " + error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<div className="signin-dialog_container">
			<Dialog
				className="signin-dialog"
				style={{ alignItems: "center" }}
				onClose={handleClose}
				open={openSignInDialog}>
				<CloseIcon className="signin-close_btn" onClick={handleClose} />
				<form
					id="signindialog-form"
					className="signin-form"
					onSubmit={isLoading ? undefined : handleLogIn}>
					<div className="signin-header">
						<DialogTitle className="signin-title">
							Log in to your account
						</DialogTitle>
					</div>
					{message && <p>{message}</p>}
					<div className="signin-form_container">
						{/* <label className="signin-label" htmlFor="email">
							Email
						</label> */}
						{/* <input
							className="signin-input"
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/> */}
						<InputLabel className="signin-label" htmlFor="email">
							{" "}
							Email
						</InputLabel>
						<div className="signin-input_container" style={{ width: "100%" }}>
							<TextField
								className="signin-input_email"
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<InputLabel className="signin-label" htmlFor="email">
							{" "}
							Password
						</InputLabel>
						<div className="signin-input_container" style={{ width: "100%" }}>
							<TextField
								className="signin-input_pword"
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end">
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</div>
					</div>
					{/* <div className="dialog-checkbox_container">
						<input
							className="signin-checkbox"
							type="checkbox"
							value=""
							id="form2Example3cg"
						/>
						<label className="signin-checkbox_label" htmlFor="form2Example3g">
							Remember Me!
						</label>
					</div> */}
					<Button
						type="submit"
						variant="contained"
						className="signin-confirm_btn">
						{isLoading ? (
							<CircularProgress style={{ color: "white" }} size={24} />
						) : (
							"Log In"
						)}
					</Button>
				</form>
			</Dialog>
		</div>
	);
}
