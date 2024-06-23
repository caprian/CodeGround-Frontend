import React from "react";
import CodeGround from "../Components/CodeGround";
import { CompilerStoreProvider } from "../Components/CompilerStore";
import CodeGroundHeader from "../Components/CodeGroundHeader";

export default function HomePage() {
	return (
		<div>
			<CompilerStoreProvider>
				<CodeGroundHeader
					headerCssClassName="codeground-header"
					isCodeGroundArea={true}
				/>
				<CodeGround />
			</CompilerStoreProvider>
		</div>
	);
}
