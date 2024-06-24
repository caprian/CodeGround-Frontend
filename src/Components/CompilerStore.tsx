import { createStore, StoreApi } from "zustand";
import { createContext, useContext, ReactNode } from "react";
import { executeCode } from "./api";

interface ICompilerStore {
	chapter: number;
	code: string;
	output: string;
	theme: string;
	language: string;
	isLoading: boolean;
	openSignInDialog: boolean;
	openSignUpDialog: boolean;
	userLogged: boolean;
	editorRef: React.RefObject<any>;
	setEditorRef: (editorRef: React.MutableRefObject<null>) => void;
	setUserLogged: (userLogged: boolean) => void;
	setChapter: (chapter: number) => void;
	setCode: (code: string) => void;
	setOutput: (output: string) => void;
	setTheme: (theme: string) => void;
	setLanguage: (language: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	SetOpenSignInDialog: (openSignInDialog: boolean) => void;
	SetOpenSignUpDialog: (openSignUpDialog: boolean) => void;
	runCode: () => void;
}

const useCompilerStore = createStore<ICompilerStore>((set, get) => ({
	chapter: 1,
	code: "",
	output: "You must run your code first",
	theme: "vs-dark",
	language: "java",
	isLoading: false,
	openSignInDialog: false,
	openSignUpDialog: false,
	userLogged: false,
	editorRef: { current: null },
	setEditorRef: (editorRef: React.RefObject<any>) => set({ editorRef }),
	setUserLogged: (userLogged: boolean) => set({ userLogged }),
	setChapter: (chapter) => set({ chapter }),
	setCode: (code) => set({ code }),
	setOutput: (output) => set({ output }),
	setTheme: (theme) => set({ theme }),
	setLanguage: (language) => set({ language }),
	setIsLoading: (isLoading) => set({ isLoading }),
	SetOpenSignInDialog: (openSignInDialog) => set({ openSignInDialog }),
	SetOpenSignUpDialog: (openSignUpDialog) => set({ openSignUpDialog }),
	runCode: () => {
		const { code, language, setOutput, setIsLoading } = get();

		if (!code) return;
		setIsLoading(true);

		executeCode(language, code)
			.then((output) => {
				setOutput(output);
			})
			.catch((error) => {
				console.error("Error Executing Code", error);
				setOutput("Error Executing Code");
			})
			.finally(() => {
				setIsLoading(false);
			});
	},
}));

const CompilerStoreContext = createContext<StoreApi<ICompilerStore> | null>(
	null
);

export const useCompilerStoreContext = () => {
	const context = useContext(CompilerStoreContext);
	if (!context) {
		throw new Error(
			"useCompilerStoreContext must be used within a CompilerStoreProvider"
		);
	}
	return context;
};

export const CompilerStoreProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<CompilerStoreContext.Provider value={useCompilerStore}>
			{children}
		</CompilerStoreContext.Provider>
	);
};
