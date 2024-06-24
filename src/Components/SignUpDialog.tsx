import React, { useState } from "react";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useCompilerStoreContext } from "./CompilerStore";
import {
	Button,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import { useStore } from "zustand";
import CloseIcon from "@mui/icons-material/Close";
import "./SignUpDialog.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUpDialog() {
	const store = useCompilerStoreContext();
	const openSignUpDialog = useStore(store, (state) => state.openSignUpDialog);
	const SetOpenSignUpDialog = store.getState().SetOpenSignUpDialog;
	const SetUserLogged = store.getState().setUserLogged;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleClose = () => {
		SetOpenSignUpDialog(false);
	};

	const handleSignUp = (e: any) => {
		e.preventDefault();
		if (password !== rePassword) {
			setMessage("Passwords do not match");
			return;
		}

		axios
			.post("https://codeground-backend.onrender.com/auth/register", {
				emailId: email,
				password: password,
			})
			.then((response) => {
				setMessage(response.data);
				if (response.status === 201) {
					SetUserLogged(true);
					SetOpenSignUpDialog(false);
				}
			})
			.catch((error) => {
				if (error.response) {
					setMessage(error.response.data || "Error occurred");
				} else {
					setMessage("No response from server");
				}
			});
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<div className="signup-dialog_container">
			<Dialog
				style={{ alignItems: "center" }}
				className="signup-dialog"
				onClose={handleClose}
				open={openSignUpDialog}>
				<CloseIcon className="signup-close_btn" onClick={handleClose} />
				<form
					id="signupdialog-form"
					onSubmit={handleSignUp}
					className="signup-form">
					<div className="signup-header">
						<DialogTitle className="signup-title">Register</DialogTitle>
					</div>

					<div className="signup-form_container">
						<InputLabel className="signup-label" htmlFor="email">
							{" "}
							Email
						</InputLabel>
						<div className="signup-input_container" style={{ width: "100%" }}>
							<TextField
								className="signup-input_email"
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<InputLabel className="signup-label" htmlFor="email">
							{" "}
							Password
						</InputLabel>
						<div className="signup-input_container" style={{ width: "100%" }}>
							<TextField
								className="signup-input_pword"
								type={"password"}
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<InputLabel className="signup-label" htmlFor="email">
							{" "}
							Re-Enter Password
						</InputLabel>
						<div className="signup-input_container" style={{ width: "100%" }}>
							<TextField
								className="signup-input_repword"
								type={showPassword ? "text" : "password"}
								name="repassword"
								id="repassword"
								value={rePassword}
								onChange={(e) => setRePassword(e.target.value)}
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
					<div className="dialog-checkbox_container">
						<input
							className="signup-checkbox"
							type="checkbox"
							value=""
							id="form2Example3cg"
							required
						/>
						<label className="signup-checkbox_label" htmlFor="form2Example3g">
							I agree all statements in{" "}
							<a href="#!" className="text-body">
								<u>Terms of service</u>
							</a>
						</label>
					</div>
					{message && <p>{message}</p>}
					<Button
						type="submit"
						variant="contained"
						className="signup-confirm_btn">
						Sign Up
					</Button>
				</form>
			</Dialog>
		</div>
	);
}
