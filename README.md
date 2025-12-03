# Base Combine
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Combine all files listed in an Obsidian Base view into a single markdown file, sorted newest to oldest. 

## Features

- Combine all files from your current Base view into a single markdown file (duh)
- Automatically excludes `.canvas` and `.base` files
- Files are sorted by modification time (latest change first)
- Each file is separated with headers and dividers

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

```bash
pnpm run dev
```

Edit the source files in the `src/` directory. The main plugin code is in `src/main.ts`. Uses the hotreload plugin for live reloading during development.


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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=128" width="128px;" alt="Fabian Morón Zirfas"/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/ff6347/obsidian-base-merge/commits?author=ff6347" title="Code">💻</a> <a href="#ideas-ff6347" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-ff6347" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-ff6347" title="Design">🎨</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!