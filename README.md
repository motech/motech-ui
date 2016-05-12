The MOTECH-UI is an administration user interface to be used with the [MOTECH Platform.](http://motechproject.org) Currently this UI package is underdevelopment, so it won't support all the functionality needed to administer the MOTECH Platform.

This article focuses on installing and developing the MOTECH-UI. To understand more about the MOTECH-UI and the styles that are implemented in it, visit the [MOTECH-UI Styleguide.](http://styleguide.motechproject.org)

To understand how this library creates a working UI, see the MOTECH-UI Overview.

Installation
------------
To use this UI package a working MOTECH Server is required. It is possible to run and work on this package without a MOTECH Server, but only the styleguide will fully work.

### Linux Installation
Install NodeJS, NPM, Bower, and Gulp

````bash
sudo apt-get install curl npm
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g bower gulp
````

### Windows Installation
Stub

### OSX Installation
Install [HomeBrew,](http://brew.sh/) then install NodeJS, NPM, Bower, and Gulp.

````bash
brew install node
npm install -g bower gulp
````

### Building and running
To build and run the MOTECH-UI package, first make sure you have MOTECH 0.29 or greater built and running.

```bash
npm install
bower install

gulp build
# if your MOTECH is located at anything other than http://localhost:8080/motech-platform-server/
gulp build --motechServerURL=http://whereMOTECH.is/located

gulp serve:app
```

The app should be running at http://localhost:5000


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