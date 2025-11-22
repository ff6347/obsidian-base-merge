# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Obsidian plugin called "Base Combine" that combines all files from a Base view into a single markdown file, sorted newest to oldest. The plugin integrates with Obsidian's Base view feature and exports content with file metadata.

## Development Commands

**Package Manager**: This project uses `pnpm` (version 10.15.1). Use `pnpm` for all package operations.

**Build & Development**:
- `pnpm dev` - Start development build with watch mode
- `pnpm build` - Production build (outputs to `main.js`)
- `pnpm typecheck` - Run TypeScript type checking without emitting files

**Testing**:
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:watch` - Run tests in watch mode

**Code Quality**:
- `pnpm lint` - Run oxlint with tsconfig
- `pnpm format` - Format code with Prettier

## Build System

- **Bundler**: Uses Rolldown (beta version) configured in `build.js`
- **Entry point**: `src/main.ts` → compiles to `main.js` (CommonJS)
- **External dependencies**: Obsidian API and CodeMirror modules are marked as external
- **Source maps**: Inline in dev, disabled in production
- **Watch mode**: Supports hot reload during development (creates `.hotrelead` file)

## TypeScript Configuration

Strict TypeScript configuration with:
- `noUncheckedIndexedAccess: true` - Array/index access requires undefined checks
- `exactOptionalPropertyTypes: true` - Optional properties must be explicitly undefined
- `verbatimModuleSyntax: true` - Import/export syntax is preserved
- `noEmit: true` - No compilation output (handled by Rolldown)
- Module system: NodeNext with ESNext target

## Plugin Architecture

**Main Plugin Class**: `BaseCombinePlugin` extends Obsidian's `Plugin`

**Core Functionality**:
1. **Command Registration**: Single command `combine-base-files` that triggers file combination
2. **Base View Detection**: Uses `@ts-ignore` to access Obsidian's internal Base view API (not in official types)
3. **File Extraction Methods**:
   - Primary: `getBaseData()` method from Base view
   - Fallback: DOM scraping via `[data-file]` and `[data-path]` selectors
4. **File Processing**: Sorts by mtime (newest first), combines with headers and separators
5. **Output**: Creates timestamped markdown file at vault root

**Key Implementation Details**:
- Heavy use of `@ts-ignore` for accessing undocumented Base view internals
- DOM fallback strategy when direct API access fails
- ISO timestamp format for output filenames (colons and dots replaced with dashes)

## Release Process

- Uses semantic-release with conventional commits
- `version-bump.js` script updates `manifest.json` and `versions.json`
- Release assets: `main.js`, `manifest.json`, `versions.json`
- Branches: `main` (stable), `beta` (prerelease)

## Code Style

- Tabs for indentation (except YAML files use spaces)
- Semicolons required
- Double quotes for strings
- Print width: 80 characters
- Prettier enforced via lint-staged on commit

## Testing Setup

- Vitest with jsdom environment for DOM testing
- Test files: `src/**/*.test.ts`
- Path alias: `@` → `./src`
