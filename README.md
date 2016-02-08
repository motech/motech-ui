The MOTECH-UI is an administration user interface to be used with the MOTECH Platform. Currently this UI package is underdevelopment, and doesn't fully support all the actions that are available in the MOTECH Platform.

Guidelines
----------
This UI package creates a single page AngularJS applicaiton that interacts with the REST API exposed by the MOTECH Server.

The AngularJS application follows John Papa structure guidelines to implement a modular codebase. This is done so that MOTECH Server Modules can extend the UI, or other projects can fork this project and create novel interfaces for the MOTECH Platform.

The styles and components for this UI are documented in the StyleGuide which is avaiable here, and can also be created and run locally.

How to Build
------------
To use this UI package, you will need to have a working MOTECH Server instance running at an accessiable IP Address.

Building this interface required the use of NodeJS, NPM, Bower, Gulp, and Sass.

### Linux Installation
Stub

### Windows Installation
Stub

### OSX Installation
Stub

Gulp Commands
-------------

### Build
Builds the main `index.html` and asset files for the MOTECH-UI, and places them in the `/build` directory.

The directory where files are built can be changed by passing the `--dest` option.

```javascript
gulp build --dest=./build
```

### Watch
Watches the `/src` directory and runs build if any changes are made. Add the `--styleguide` option if you want the styleguilde to be regenerated when changes are made.

```javascript
gulp watch --dest=./build --styleguide
```

### Serve
```javascript
gulp serve
```

### Styleguide
```javascript
gulp styleguide:generate
```