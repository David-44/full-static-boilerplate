
# STATIC WEBSITES BOILERPLATE

## 1) BASICS
Simple development and production boilerplate for static websites.

This is tailored to be used with heroku.com for pushing only the content of /dist to the main site.

This is opinionated and adapted to static website projects only.



## 2) INITIALISING:

1. Add a title, author and description to both packge.json files (root and dist).
2. `$ npm run first`
- It deletes the current .git repo and modifies .gitignore to ignore /dist.
- It creates a git repo for the dev environment and for the live one.
- It installs necessary node modules for both dev and prod.




## 3) INTERFACE:

- `$ npm run first`: initialising (see above).
- `$ npm run watch`: runs sass watch.
- `$ npm run prod `: runs production site, access with http://localhost:3000.
- `$ gulp clean `: Cleans the public production folder.
- `$ gulp deploy`: Copies assets + html, css and js files to public folder.



## 4) CONTENT

### html
A very basic template.

### Sass
Needs node-watch (installed when initialising).

Runs with `npm run watch`.

- The folder organisation is heavily based on [Sass Guidelines](http://sass-guidelin.es/).
- The content of the _variables file is set to default value so that the watch command will work right away. These values are not here to match anything, they're just placeholders.
- There are a few heplful functions and mixins in /abstract.
- There is no CSS normalise or reset but some of the rules in /base/base are based on CSS normalise. Other rules are based on my experience.
- /base/typography and layout/container contain rules that I find useful but are opinionated.
- All other files are empty.

### A gulp file
Uses the command `gulp deploy` to:
- copy the content of /assets to /dist/public/assets/ and keep the folder structure.
- minify index.html, main.css and scripts.js and copy them to /dist/public.

### A node static server, only in /dist/app.js
It serves the content of /dist/public on port 3000 by default.

Runs with `npm run prod`.

### Other files
- robots.txt telling crawlers to do their job.
- procfile, used only by heroku.
