The MOTECH-UI is an administration user interface to be used with the [MOTECH Platform.](http://motechproject.org) Currently this UI package is underdevelopment, so it won't support all the functionality needed to administer the MOTECH Platform.

Overview
--------
This UI package creates a single page [AngularJS](https://angularjs.org/) applicaiton that interacts with the REST API exposed by the MOTECH Server. Styles and components available in the UI are [documented in the MOTECH-UI Styleguide](http://styleguide.motechproject.org), which is generated from this package.

[NodeJS](https://nodejs.org) and [Gulp](http://gulpjs.com/) are used to generate the MOTECH-UI. [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/) are the package managers used in the project. [Sass](http://sass-lang.com/) & [Bourbon](http://bourbon.io/)

This application follows [John Papa structure guidelines](https://github.com/johnpapa/angular-styleguide) as closely as possible.

### Goals

#### Semantic Mark-up
Less markup on HTML elements makes it easier for the styles to be changed in one place. An example of this is that all images that are not primary content should be implemented in CSS.

#### Graceful Degredation
We support IE9 and up, meaning our interface must function in all browsers possible — but all experiences don't need to be exactly the same, just equally functional.

##### Internet Explorer 9: issues
To keep compatibility with IE9 it is best to follow these rules:

- IE9 doesn't support CSS3 animations and transitions, so it is best to use *.gif files for animations;
- IE9 filter supports only colours defined in 8 digit hexes (AARRGGBB). For more information see [Gradient Attributes and Properties](https://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx). Some frameworks don't use correctly defined colours for MS filter and it might lead to inconsistency between different browser UIs;
```javascript
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFE8E8E8', endColorstr='#FFF2F2F1');
```
- IE9 can't interpret 3 digit hexes for background-colour so it is best not to use it at all for better code management and code consistency.

#### Optimized for small screens and touchpads
MOTECH is used by people to configure health workflows. Many of these people use laptops and don't have access to a mouse.

Installation
------------
To use this UI package a working MOTECH Server is required. It is possible to run and work on this package without a MOTECH Server, but only the styleguide will fully work.

### Linux Installation
Stub

### Windows Installation
Stub

### OSX Installation
Stub

### Building and running
To build and run the MOTECH-UI package:

```javascript
gulp build
gulp server
```

Then visit http://localhost:5000/styleguide/ and you should see this page (assuming nothing went wrong).

Gulp Commands
-------------

### Build
Builds the main `index.html` and asset files for the MOTECH-UI, and places them in the `/build` directory.

The directory where files are built can be changed by passing the `--dest` option.

```javascript
gulp build --dest=./build
// Build only the app
gulp build:app
// Build only the style guide
gulp build:styleguide
```

### Watch
Watches the `/src` directory and runs build if any changes are made. Add the `--styleguide` option if you want the styleguilde to be regenerated when changes are made.

```javascript
gulp watch
```

### Development Server
```javascript
gulp server
```