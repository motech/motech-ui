The MOTECH-UI is an administration user interface to be used with the [MOTECH Platform.](http://motechproject.org) Currently this UI package is underdevelopment, so it won't support all the functionality needed to administer the MOTECH Platform.

This article focuses on installing and developing the MOTECH-UI. To understand more about the MOTECH-UI and the styles that are implemented in it, visit the [MOTECH-UI Styleguide.](http://styleguide.motechproject.org)

To understand how this library creates a working UI, see the MOTECH-UI Overview.

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