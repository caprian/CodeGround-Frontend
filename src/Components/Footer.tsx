import React from "react";
import "./Footer.css";
import CodeGround from "../Images/CodeGround.png";

export default function Footer() {
	return (
		<section className="footer-section">
			<div className="footer-container">
				<div className="footer-logo-container">
					<img className="footer-logo" src={CodeGround} alt={"logo"}></img>
					<p className="footer-logo-text">Learn Java the CodeGround way</p>
				</div>
			</div>

			<div className="footer-container">
				<div className="footer-start-container">
					<div className="footer-text-header">Get Started</div>
					<p className="footer-start-text">About</p>
					<p className="footer-start-text">Courses</p>
					<p className="footer-start-text">Blogs</p>
					<p className="footer-start-text">Why CodeGround</p>
				</div>
			</div>

			<div className="footer-container">
				<div className="footer-contact-container">
					<div className="footer-text-header">Contact us</div>
					<p className="footer-start-text">Linkdin</p>
					<p className="footer-start-text">Instagram</p>
					<p className="footer-start-text">Email</p>
				</div>
			</div>
		</section>
	);
}
