import Header from "./components/Header";
import initialEmails from "./data/emails";
import "./App.css";
import { useState } from "react";

function App() {
	// Use initialEmails for state
	const [emails, setEmails] = useState(initialEmails);

  //Hide Read Emails
	const [hideReadEmails, setHideReadEmails] = useState(false);

  // Insert in the Tab
	const [tab, setTab] = useState("inbox");
  
	let emailsToDisplay = emails;

	if (hideReadEmails) {
		emailsToDisplay = emailsToDisplay.filter((email) => !email.read);
	}
	if (tab === "starred") {
		emailsToDisplay = emailsToDisplay.filter((email) => email.starred);
	}

	function toggleRead(targetEmail) {
		const newEmails = emails.map((email) => {
			if (email.id === targetEmail.id) {
				email.read = !email.read;
			}
			return email;
		});
		setEmails(newEmails);
	}
	function toggleStar(targetEmail) {
		const newEmails = emails.map((email) => {
			if (email.id === targetEmail.id) {
				email.starred = !email.starred;
			}
			return email;
		});
		setEmails(newEmails);
	}

	return (
		<div className="app">
			<Header />
			<nav className="left-menu">
				<ul className="inbox-list">
					<li
						className={tab === "inbox" ? "item active" : "item"}
						onClick={() => {
							setTab("inbox");
						}}
					>
						<span className="label">Inbox</span>
						<span className="count">{emails.length}</span>
					</li>
					<li
						className={tab === "starred" ? "item active" : "item"}
						onClick={() => {
							setTab("starred");
						}}
					>
						<span className="label">Starred</span>
						<span className="count">{emails.filter((email) => email.starred).length}</span>
					</li>

					<li className="item toggle">
						<label htmlFor="hide-read">Hide read</label>
						<input
							id="hide-read"
							type="checkbox"
							defaultChecked={hideReadEmails}
							onChange={() => {
								setHideReadEmails(!hideReadEmails);
							}}
						/>
					</li>
				</ul>
			</nav>
			<main className="emails">
				{emailsToDisplay.map((email) => {
					return (
						<li key={email.id} className={email.read ? "email read" : "email unread"}>
							<input type="checkbox" defaultChecked={email.read} onClick={() => toggleRead(email)} />
							{<input type="checkbox" className="star-checkbox" defaultChecked={email.starred} onClick={() => toggleStar(email)} />}
							<span>{email.sender}</span>
							<span>{email.title}</span>
						</li>
					);
				})}
			</main>
		</div>
	);
}

export default App;