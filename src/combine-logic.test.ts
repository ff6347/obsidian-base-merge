// ABOUTME: Tests for the pure functions in combine-logic.ts.
// ABOUTME: No mocking needed - all functions are pure and independent.

import { describe, it, expect } from "vitest";
import {
	shouldIncludeFile,
	combineFileContents,
	generateOutputFileName,
	extractFilteredHrefs,
	type FileContent,
	type LinkElement,
} from "./combine-logic.js";

describe("shouldIncludeFile", () => {
	it("should include markdown files", () => {
		expect(shouldIncludeFile("note.md")).toBe(true);
		expect(shouldIncludeFile("path/to/note.md")).toBe(true);
	});

	it("should exclude canvas files", () => {
		expect(shouldIncludeFile("diagram.canvas")).toBe(false);
		expect(shouldIncludeFile("path/to/diagram.canvas")).toBe(false);
	});

	it("should exclude base files", () => {
		expect(shouldIncludeFile("database.base")).toBe(false);
		expect(shouldIncludeFile("path/to/database.base")).toBe(false);
	});

	it("should include files with other extensions", () => {
		expect(shouldIncludeFile("document.txt")).toBe(true);
		expect(shouldIncludeFile("data.json")).toBe(true);
	});

	it("should include files without extensions", () => {
		expect(shouldIncludeFile("README")).toBe(true);
	});

	it("should not filter uppercase extensions (case-sensitive)", () => {
		// Filtering is case-sensitive, so .CANVAS and .BASE are not filtered
		expect(shouldIncludeFile("DIAGRAM.CANVAS")).toBe(true);
		expect(shouldIncludeFile("DATABASE.BASE")).toBe(true);
	});

	it("should handle files with canvas or base in the name but different extension", () => {
		expect(shouldIncludeFile("canvas-notes.md")).toBe(true);
		expect(shouldIncludeFile("base-setup.md")).toBe(true);
		expect(shouldIncludeFile("my.canvas.backup.md")).toBe(true);
	});

	it("should handle deep nested paths", () => {
		expect(shouldIncludeFile("a/b/c/d/e/note.md")).toBe(true);
		expect(shouldIncludeFile("a/b/c/d/e/diagram.canvas")).toBe(false);
		expect(shouldIncludeFile("a/b/c/d/e/database.base")).toBe(false);
	});

	it("should handle paths with special characters", () => {
		expect(shouldIncludeFile("folder with spaces/note.md")).toBe(true);
		expect(shouldIncludeFile("folder-with-dashes/file_with_underscores.md")).toBe(
			true,
		);
	});

	it("should handle empty string", () => {
		expect(shouldIncludeFile("")).toBe(true);
	});

	it("should handle files that end with partial extension", () => {
		expect(shouldIncludeFile("file.canva")).toBe(true);
		expect(shouldIncludeFile("file.bas")).toBe(true);
		expect(shouldIncludeFile("file.canvas.md")).toBe(true);
		expect(shouldIncludeFile("file.base.txt")).toBe(true);
	});
});

describe("combineFileContents", () => {
	it("should combine single file correctly", () => {
		const files: FileContent[] = [
			{ basename: "note", content: "Hello world" },
		];

		const result = combineFileContents(files);

		expect(result).toBe(
			"<!-- <document> -->\n# note\n\nHello world\n<!-- </document> -->\n\n",
		);
	});

	it("should combine multiple files correctly", () => {
		const files: FileContent[] = [
			{ basename: "first", content: "First content" },
			{ basename: "second", content: "Second content" },
		];

		const result = combineFileContents(files);

		expect(result).toBe(
			"<!-- <document> -->\n# first\n\nFirst content\n<!-- </document> -->\n\n" +
				"<!-- <document> -->\n# second\n\nSecond content\n<!-- </document> -->\n\n",
		);
	});

	it("should handle empty content", () => {
		const files: FileContent[] = [{ basename: "empty", content: "" }];

		const result = combineFileContents(files);

		expect(result).toBe(
			"<!-- <document> -->\n# empty\n\n\n<!-- </document> -->\n\n",
		);
	});

	it("should handle empty array", () => {
		const files: FileContent[] = [];

		const result = combineFileContents(files);

		expect(result).toBe("");
	});

	it("should preserve multiline content", () => {
		const files: FileContent[] = [
			{ basename: "multiline", content: "Line 1\nLine 2\nLine 3" },
		];

		const result = combineFileContents(files);

		expect(result).toBe(
			"<!-- <document> -->\n# multiline\n\nLine 1\nLine 2\nLine 3\n<!-- </document> -->\n\n",
		);
	});

	it("should handle special characters in basename", () => {
		const files: FileContent[] = [
			{ basename: "file-name_123", content: "Content" },
		];

		const result = combineFileContents(files);

		expect(result).toBe(
			"<!-- <document> -->\n# file-name_123\n\nContent\n<!-- </document> -->\n\n",
		);
	});
});

describe("generateOutputFileName", () => {
	it("should generate correct filename with timestamp", () => {
		const timestamp = "2025-11-22T10-30-00";

		const result = generateOutputFileName(timestamp);

		expect(result).toBe("Combined Base 2025-11-22T10-30-00.md");
	});

	it("should handle different timestamp formats", () => {
		const timestamp = "2025-01-01T00-00-00";

		const result = generateOutputFileName(timestamp);

		expect(result).toBe("Combined Base 2025-01-01T00-00-00.md");
	});
});

describe("extractFilteredHrefs", () => {
	it("should extract hrefs from links and filter them", () => {
		const links: LinkElement[] = [
			{ href: "note1.md" },
			{ href: "diagram.canvas" },
			{ href: "note2.md" },
			{ href: "database.base" },
			{ href: "note3.md" },
		];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual(["note1.md", "note2.md", "note3.md"]);
	});

	it("should handle links with null href", () => {
		const links: LinkElement[] = [
			{ href: "note1.md" },
			{ href: null },
			{ href: "note2.md" },
		];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual(["note1.md", "note2.md"]);
	});

	it("should handle empty array", () => {
		const links: LinkElement[] = [];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual([]);
	});

	it("should filter out all canvas and base files", () => {
		const links: LinkElement[] = [
			{ href: "diagram1.canvas" },
			{ href: "database.base" },
			{ href: "diagram2.canvas" },
		];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual([]);
	});

	it("should handle mixed valid and invalid hrefs", () => {
		const links: LinkElement[] = [
			{ href: "note.md" },
			{ href: null },
			{ href: "" },
			{ href: "file.txt" },
			{ href: "diagram.canvas" },
		];

		const result = extractFilteredHrefs(links);

		// Empty strings are filtered out (falsy check before shouldIncludeFile)
		expect(result).toEqual(["note.md", "file.txt"]);
	});

	it("should preserve order of filtered hrefs", () => {
		const links: LinkElement[] = [
			{ href: "z-note.md" },
			{ href: "a-note.md" },
			{ href: "m-note.md" },
		];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual(["z-note.md", "a-note.md", "m-note.md"]);
	});

	it("should handle paths with special characters", () => {
		const links: LinkElement[] = [
			{ href: "folder with spaces/note.md" },
			{ href: "folder-with-dashes/file.txt" },
			{ href: "path/to/diagram.canvas" },
		];

		const result = extractFilteredHrefs(links);

		expect(result).toEqual([
			"folder with spaces/note.md",
			"folder-with-dashes/file.txt",
		]);
	});
});
