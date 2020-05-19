# File Explorer Enhancements Plug-in

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-file-explorer-enhancements-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-file-explorer-enhancements-plugin)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-file-explorer-enhancements-plugin.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-file-explorer-enhancements-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-file-explorer-enhancements-plugin)

Plug-in for the [Canvas LMS theme app](https://github.com/artevelde-uas/canvas-lms-app) that adds some enhancements to the file explorer.

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-file-explorer-enhancements-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-file-explorer-enhancements-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@artevelde-uas/canvas-lms-app';
import fileExplorerEnhancementsPlugin from '@artevelde-uas/canvas-lms-file-explorer-enhancements-plugin';

canvas.addPlugin(fileExplorerEnhancementsPlugin);

canvas.run();
```
