# GitHub Repo Search

A small Angular app that searches GitHub repositories and lists the results. Built in 2020 as a front-end assessment project.

> **Status:** Early learning project. It targets Angular 7 and is not actively maintained. For my current work, see [Skymood](https://github.com/Nandha65/skymood-theme) and [DocuMind](https://github.com/Nandha65/documind).

## Tech

- Angular 7 (Angular CLI 7.1)
- TypeScript
- Karma and Protractor for tests

## Run locally

```bash
npm install
npx ng serve
```

Then open http://localhost:4200/. Because of its age, the project needs an older Node.js release (Node 10 or 12) to install cleanly.

## Project structure

- `src/app/github-repo-list/`: the search and results list component
- `src/app/app.component.*`: the app shell
