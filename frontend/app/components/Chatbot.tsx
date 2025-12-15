"use client";

import React, { useState } from "react";

type Message = {
	role: "user" | "ai";
	text: string;
};

const Chatbot: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const toggleOpen = () => setOpen((v) => !v);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input.trim() || loading) return;

		const userText = input.trim();
		setMessages((prev) => [...prev, { role: "user", text: userText }]);
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("http://localhost:3000/chat/ask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: userText }),
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			const data = (await res.text()) || "";
			setMessages((prev) => [...prev, { role: "ai", text: data }]);
		} catch (err) {
			const fallback = err instanceof Error ? err.message : "Something went wrong";
			setMessages((prev) => [...prev, { role: "ai", text: fallback }]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 50 }}>
			<button className="btn" onClick={toggleOpen}>
				{open ? "Close Chat" : "Chat"}
			</button>

			{open && (
				<div className="card" style={{ marginTop: "0.75rem", width: "320px" }}>
					<div style={{ maxHeight: "320px", overflowY: "auto", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
						{messages.length === 0 && <div className="text-sm text-muted">Start the conversation...</div>}
						{messages.map((m, idx) => (
							<div
								key={idx}
								className="card"
								style={{
									background: m.role === "user" ? "#eef2ff" : "#f8fafc",
									padding: "0.5rem 0.75rem",
								}}
							>
								<strong style={{ marginRight: "0.35rem" }}>{m.role === "user" ? "You" : "AI"}:</strong>
								<span>{m.text}</span>
							</div>
						))}
					</div>

					<form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
						<input
							className="input"
							type="text"
							placeholder={loading ? "Waiting for response..." : "Ask anything"}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							disabled={loading}
							style={{ flex: 1 }}
						/>
						<button className="btn" type="submit" disabled={loading || !input.trim()}>
							{loading ? "..." : "Send"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
