# Base Combine

Combine all files from an Obsidian Base view into a single markdown file, sorted newest to oldest.

## Features

- **One-click export**: Combine all files from your current Base view into a single markdown file
- **Smart filtering**: Automatically excludes `.canvas` and `.base` files
- **Sorted output**: Files are sorted by modification time (newest first)
- **Clean formatting**: Each file is separated with headers and dividers

## Installation

This plugin is not yet available in the Obsidian Community Plugins directory. You can install it manually using one of the methods below:

### Method 1: Using BRAT (Recommended)

1. Install the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat) if you haven't already
2. Open Command Palette (Ctrl/Cmd + P)
3. Run command: `BRAT: Add a beta plugin for testing`
4. Enter the repository URL: `ff6347/obsidian-base-merge`
5. Click "Add Plugin"
6. Enable "Base Combine" in Settings → Community Plugins

### Method 2: Manual Installation from GitHub Releases

1. Download the latest release from [GitHub Releases](https://github.com/ff6347/obsidian-base-merge/releases)
2. Extract the release files
3. Copy `main.js`, `manifest.json`, and `styles.css` (if present) to your vault's plugins folder:
   ```
   YOUR_VAULT/.obsidian/plugins/base-combine/
   ```
4. Reload Obsidian
5. Enable "Base Combine" in Settings → Community Plugins

### Method 3: Manual Installation from Source

1. Clone this repository into your vault's plugins folder:
   ```bash
   cd YOUR_VAULT/.obsidian/plugins/
   git clone https://github.com/ff6347/obsidian-base-merge base-combine
   cd base-combine
   ```
2. Install dependencies and build:
   ```bash
   pnpm install
   pnpm build
   ```
3. Reload Obsidian
4. Enable "Base Combine" in Settings → Community Plugins

## Usage

1. Open a Base view with the files you want to combine
2. Open Command Palette (Ctrl/Cmd + P)
3. Run command: `Combine all files from current Base`
4. A new file will be created at the root of your vault with a timestamp in the filename

The combined file will contain all files from the Base view, with:
- Each file separated by headers (`# filename`)
- Original content preserved
- Horizontal dividers between files (`---`)
- Sorted by modification time (newest to oldest)

## Requirements

- Obsidian v1.7.0 or higher
- Base view must be open and active

## Development

### Building

```bash
pnpm install
pnpm build
```

### Testing

```bash
pnpm test
pnpm test:watch
```

### Type Checking

```bash
pnpm typecheck
```

## License

MIT

## Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/ff6347/obsidian-base-merge/issues) on GitHub.
