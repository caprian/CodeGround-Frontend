import React, { useEffect, useRef, useState } from "react";
import "./CompilerArea.css";
import Editor from "@monaco-editor/react";
// import LanguageSelector from "./LanguageSelector";
import { getCodeSnippets } from "./Constants";
import OutputArea from "./OutputArea";
import FormLabel from "@mui/material/FormLabel";
import { useCompilerStoreContext } from "./CompilerStore";
import RunButton from "./RunButton";
import { useStore } from "zustand";

export default function CompilerArea() {
	const store = useCompilerStoreContext();
	const { language, theme, chapter } = useStore(store, (state) => ({
		language: state.language,
		theme: state.theme,
		code: state.code,
		output: state.output,
		chapter: state.chapter,
	}));
	const setEditorRef = store.getState().setEditorRef;

	const [javaCode, setJavaCode] = useState(getCodeSnippets(chapter));
	// const [value, setValue] = useState(javaCode);

	useEffect(() => {
		const javaCodeSnippet = getCodeSnippets(chapter);
		setJavaCode(javaCodeSnippet);
		store.setState({ code: javaCodeSnippet });
	}, [chapter, store]);

	// useEffect(() => {
	// 	setValue(code);
	// }, [code]);

	const editorRef = useRef(null);

	const handleEditorChange = (newValue: string | undefined) => {
		if (newValue !== undefined) {
			// setValue(newValue);
			store.setState({ code: newValue });
		}
	};

	const handleEditorMount = (editor: any) => {
		editorRef.current = editor;
		editor.focus();
		setEditorRef(editor);
		//console.log(editor);
	};
	useEffect(() => {
		setEditorRef(editorRef);
	}, [editorRef, setEditorRef]);

	// const onSelect = (language: string) => {
	// 	store.setState({ language });
	// 	const newCode = CODE_SNIPPETS[language];
	// 	setValue(newCode);
	// 	store.setState({ code: newCode });
	// 	console.log(language);
	// };

	return (
		<div>
			<div className="compiler-area-container">
				{/* <LanguageSelector language={language} onSelect={onSelect} /> */}
				{/* <div className="btn-run">
					<RunButton className="run-btn" name="Run" editorRef={editorRef} />
				</div> */}
				<FormLabel
					id="editorform-label"
					style={{ color: "white" }}
					component="legend">
					Main.java
				</FormLabel>
				<Editor
					language={language}
					theme={theme}
					height="40vh"
					//defaultValue={javaCode}
					value={javaCode}
					onChange={handleEditorChange}
					onMount={handleEditorMount}
				/>
			</div>
			<div className="btn-run">
				<RunButton className="run-btn" name="Run" editorRef={editorRef} />
			</div>
			<div style={{ marginTop: 10 }}>
				<OutputArea />
			</div>
		</div>
	);
}
