import { Plugin, TFile, Notice } from "obsidian";
import {
	combineFileContents,
	generateTimestamp,
	generateOutputFileName,
	shouldIncludeFile,
	type FileContent,
} from "./combine-logic.js";

export default class BaseCombinePlugin extends Plugin {
	override async onload() {
		this.addCommand({
			id: "combine-base-files",
			name: "Combine all files from current Base",
			callback: () => {
				this.combineBaseFiles();
			},
		});
	}

	async combineBaseFiles() {
		const files = this.getBaseFiles();
		if (!files || files.length === 0) {
			new Notice("No files found in current Base view");
			return;
		}

		// Sort files by modification time (newest first)
		files.sort((a, b) => b.stat.mtime - a.stat.mtime);

		// Read file contents
		const fileContents: FileContent[] = [];
		for (const file of files) {
			const content = await this.app.vault.read(file);
			fileContents.push({ basename: file.basename, content });
		}

		// Combine content using pure function
		const combinedContent = combineFileContents(fileContents);

		// Create new file with timestamp
		const timestamp = generateTimestamp();
		const newFileName = generateOutputFileName(timestamp);

		await this.app.vault.create(newFileName, combinedContent);
		new Notice(`Created ${newFileName} with ${files.length} files`);
	}

	getBaseFiles(): TFile[] | null {
		// @ts-ignore - activeLeaf is not in the public API
		const activeView = this.app.workspace.activeLeaf?.view;

		if (!activeView) {
			new Notice("No active view found");
			return null;
		}

		if (activeView.getViewType() !== "bases") {
			new Notice("Current view is not a Base. Please open a Base view first.");
			return null;
		}

		const results: Map<unknown, unknown> | undefined =
			// @ts-ignore - controller.results is not in the public API
			activeView.controller?.results;

		if (!results || results.size === 0) {
			new Notice("No files found in current Base view");
			return null;
		}

		const files: TFile[] = [];
		for (const key of results.keys()) {
			if (typeof key !== "string") {
				continue;
			}
			if (!shouldIncludeFile(key)) {
				continue;
			}
			const file = this.app.vault.getAbstractFileByPath(key);
			if (file instanceof TFile) {
				files.push(file);
			}
		}

		if (files.length === 0) {
			new Notice("No files found in current Base view");
			return null;
		}

		return files;
	}
}
