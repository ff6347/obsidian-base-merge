// ABOUTME: Pure functions for combining Base files into a single markdown file.
// ABOUTME: These functions are independent of Obsidian APIs for easy testing.

export interface FileContent {
	basename: string;
	content: string;
}

export function shouldIncludeFile(filePath: string): boolean {
	return !filePath.endsWith(".canvas") && !filePath.endsWith(".base");
}

const DOCUMENT_START = "<!-- <document> -->";
const DOCUMENT_END = "<!-- </document> -->";

export function combineFileContents(files: FileContent[]): string {
	let combined = "";

	for (const file of files) {
		combined += `${DOCUMENT_START}\n# ${file.basename}\n\n${file.content}\n${DOCUMENT_END}\n\n`;
	}

	return combined;
}

export function generateTimestamp(): string {
	return new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
}

export function generateOutputFileName(timestamp: string): string {
	return `Combined Base ${timestamp}.md`;
}

export interface LinkElement {
	href: string | null;
}

export function extractFilteredHrefs(links: LinkElement[]): string[] {
	const hrefs: string[] = [];

	for (const link of links) {
		const href = link.href;

		if (href && shouldIncludeFile(href)) {
			hrefs.push(href);
		}
	}

	return hrefs;
}
