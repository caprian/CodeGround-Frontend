import React from "react";
import "./Home.css";
import SignInDialog from "./SignInDialog";
import { useCompilerStoreContext } from "./CompilerStore";
import { useStore } from "zustand";
import SignUpDialog from "./SignUpDialog";
import java from "../Images/java-banner.png";
import compiler from "../Images/codeground-compiler.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "./Footer";

export default function Home() {
	const store = useCompilerStoreContext();
	const openSignInDialog = useStore(store, (state) => state.openSignInDialog);
	const openSignUpDialog = useStore(store, (state) => state.openSignUpDialog);

	return (
		<section className="home-contents">
			<div className="home-container_custom">
				<div className="featured-courses_banner">
					<div className="banner-text_parent">
						<h2 className="banner-text">
							Start Learing
							<br />
							Java
							<br />
							the CodeGround way...
						</h2>
						<p className="banner-text_para">
							Codeground is an interactive platform that teaches you Java from
							scratch. Read lessons and practice coding simultaneously in our
							built-in compiler.
						</p>
						<li className="navbar-list_lastitem">
							<Link className="start-learning_btn-link" to="/codeground">
								<Button className="start-learning_btn" variant="contained">
									{" "}
									Courses
								</Button>
							</Link>
						</li>
					</div>
				</div>
				<div className="home-diagram">
					<img className="home-diagram_image" src={java} alt={"logo"}></img>
				</div>
				{openSignInDialog && <SignInDialog />}
				{openSignUpDialog && <SignUpDialog />}
			</div>
			{/* //this is section 2 */}
			<div className="home-container_custom custom-sec_two">
				<div className="featured-courses_banner custom-sec_banner">
					<div className="banner-text_parent">
						<h2 className="banner-text">Why CodeGround is different?</h2>
						{/* <p className="banner-text_para">
							Codeground is an interactive platform that teaches you Java from
							scratch. Read lessons and practice coding simultaneously in our
							built-in compiler.
						</p> */}
					</div>
				</div>
				<div className="home-diagram">
					<p className="banner-text_para">
						Codeground offers a unique, interactive learning experience,
						allowing users to read lessons and practice coding simultaneously
						with a built-in code editor. While our current curriculum focuses on
						Java fundamentals and advanced topics, there is high demand for
						additional content on related technologies and frameworks. Join
						Codeground today and master Java with engaging lessons, practical
						exercises, and instant feedback!
						<p>
							Codeground offers a unique, interactive learning experience,
							allowing users to read lessons and practice coding simultaneously
							with a built-in code editor. While our current curriculum focuses
							on Java fundamentals and advanced topics, there is high demand for
							additional content on related technologies and frameworks. Join
							Codeground today and master Java with engaging lessons, practical
							exercises, and instant feedback!
						</p>
					</p>
				</div>
			</div>

			{/* //section 3  */}
			<div className="home-container_custom custom-sec_two">
				<div className="featured-courses_banner custom-sec_banner">
					<div className="banner-text_parent">
						<h2 className="banner-text">Interactive Coding Lessons</h2>
						<p className="banner-text_para">
							Explore our interactive in-browser lessons that cover Java
							essentials and straightforward Java DSA questions. By completing
							Lesson 1 in a single session, you'll acquire the fundamental
							skills needed to embark on your Java development journey.
						</p>
					</div>
				</div>
				<div className="home-diagram">
					<img
						className="home-diagram_image code-snippet"
						src={compiler}
						alt={"logo"}></img>
				</div>
			</div>
			{/* //footer area */}
			<div className="home-container_custom custom-sec_two">
				<Footer />
			</div>
			<div className="copyright-text">
				&copy; Copyright 2024 CodeGround All Rights Reserved{" "}
			</div>
		</section>
	);
}
