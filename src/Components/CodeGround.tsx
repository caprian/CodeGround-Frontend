import React from "react";
import ProblemArea from "./ProblemArea";
import CompilerArea from "./CompilerArea";
import "./CodeGround.css";
import {
	CompilerStoreProvider,
	useCompilerStoreContext,
} from "./CompilerStore";
import { Button } from "@mui/material";
import { chapters } from "./chapters";
import { useStore } from "zustand";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";

export default function CodeGround() {
	//const [chapter, setChapter] = useState<number>(1);
	const store = useCompilerStoreContext();
	const setChapter = store.getState().setChapter;
	const chapter = useStore(store, (state) => state.chapter);
	const openSignInDialog = useStore(store, (state) => state.openSignInDialog);
	const openSignUpDialog = useStore(store, (state) => state.openSignUpDialog);

	const chaptersLength = Object.keys(chapters).length;
	const handleNextButtonClick = () => {
		setChapter(chapter + 1);
	};

	const handlePrevButtonClick = () => {
		setChapter(chapter - 1);
	};
	return (
		<div className="code-ground_container">
			<div className="code-ground">
				<div className="problem-area">
					<ProblemArea chapter={chapter} />
				</div>
				<div className="compiler-area">
					<CompilerStoreProvider>
						<CompilerArea />
					</CompilerStoreProvider>
				</div>
			</div>
			<div className="button-container">
				<Button
					title="Previous"
					onClick={handlePrevButtonClick}
					variant="contained"
					disabled={chapter === 1}
					className="prev-btn">
					<NavigateBeforeIcon />
				</Button>
				<Button
					title="Next"
					onClick={handleNextButtonClick}
					variant="contained"
					disabled={chapter === chaptersLength}
					className="next-btn">
					<NavigateNextIcon />
				</Button>
			</div>
			{openSignInDialog && <SignInDialog />}
			{openSignUpDialog && <SignUpDialog />}
		</div>
	);
}
