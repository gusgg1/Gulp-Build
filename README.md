## Gulp

This project uses [gulp](https://gulpjs.com/) to set up a Gulp build process to prepare the website for deployment.

The build process involves the following tasks:
* Concatenate and minify the JavaScript files
* Compile SCSS into CSS in a concatenated and minified file
* Generate JavaScript and CSS source maps
* Compress any JPEG or PNG files

All output for the build process will be piped in a *dist* folder for distribution or deployment.


`npm install` to install dependencies.


##### Commands 
`gulp scripts` command concatenates, minifies and copies all of the project's JavaScript files into an `all.min.js` file.
* This command also copies the `all.min.js` file into the `dist/scripts` folder. 
* This command also generates JavaScript source maps.

`gulp styles` command compiles the project’s SCSS files into CSS, and concatenates and minifies into an `all.min.css` file in `dist/styles`.
* This command also generates CSS source maps.

`gulp images` command copies the optimized images to the `dist/content`.

`gulp clean` command deletes all of the files and folders in the `dist` folder.

`gulp build` command properly runs the `clean`, `scripts`, `styles`, and `images` tasks.

`clean` task fully completes before the `scripts`, `styles`, and `images` tasks are ran.

`gulp` command properly runs the `build` task as a dependency.
* This command also serves the project using a local webserver.


##### Exceeds expectations:

The `gulp` command also listens for changes to any `.scss` file. When there is a change to any `.scss` file, the `gulp styles` command is run, the files are compiled, concatenated and minified to the dist folder, and the browser reloads, displaying the changes