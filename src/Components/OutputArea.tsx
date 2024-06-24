import React from "react";
import TextField from "@mui/material/TextField";
import { useCompilerStoreContext } from "./CompilerStore";
import { useStore } from "zustand";
import "./OutputArea.css";

export default function OutputArea() {
	const store = useCompilerStoreContext();
	const output = useStore(store, (state) => state.output);

	return (
		<div className="outputarea-container">
			<div className="btn-run"></div>
			<TextField
				className="readonly-output-area"
				rows={5}
				size="medium"
				label="Output"
				variant="filled"
				value={output}
				// disabled={true}
				fullWidth={true}
				color="primary"
				multiline={true}
			/>
		</div>
	);
}
