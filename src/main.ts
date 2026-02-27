import { Plugin, TFile, Notice } from "obsidian";
import {
	combineFileContents,
	generateTimestamp,
	generateOutputFileName,
	extractFilteredHrefs,
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

		try {
			// Get files from Base view by querying internal links
			const linkElements =
				activeView.containerEl.querySelectorAll("span.internal-link");

			// Extract and filter hrefs using pure function
			const links = Array.from(linkElements).map((element) => {
				const link = element as HTMLSpanElement;
				return { href: link.getAttribute("data-href") };
			});
			const filteredHrefs = extractFilteredHrefs(links);

			// Convert hrefs to TFile objects
			const files: TFile[] = [];
			for (const href of filteredHrefs) {
				const file = this.app.vault.getAbstractFileByPath(href);
				if (file instanceof TFile) {
					files.push(file);
				}
			}

			if (files.length > 0) {
				return files;
			}

			new Notice("No files found in current Base view");
			return null;
		} catch (error) {
			console.error("Error getting Base files:", error);
			new Notice("Error accessing Base data");
			return null;
		}
	}
}
