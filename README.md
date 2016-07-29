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

### Adding CORS headers
Before running MOTECH-UI package, you need to enable communication between MOTECH-UI and MOTECH Server. This can be done by adding CORS (Cross-Origin Resource Sharing) headers to your Tomcat configuration file. To understand how to achieve this, follow instructions for [adding CORS to Tomcat from MOTECH documentation](http://docs.motechproject.org/en/latest/deployment/CORS_Headers.html#tomcat-web-server-config).

If any changes were made while the Tomcat server was running, you should restart it.

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
Builds the main `index.html` and asset files for the MOTECH-UI, and places them in the `build/app/` directory. The build command will also build 

The directory where files are built can be changed by passing the `--dest` option.

```javascript
gulp build
// build to different directory
gulp build --dest=./build
// Build only the app
gulp build:app
// Build the documentation
gulp build:docs
```

### Watch
Watches the `/src` directory and runs build if any changes are made. This will build both the app and docs directories.

```javascript
gulp watch
```
### Development Server
Creates a local web server on port 5000, and serves either the app or docs directory. To change the port that the development server is served on, pass add the flag --port=`<port number>`

This serve doesn't need to be restarted when the app or documentation is rebuilt. 

```bash
// serve the applicaiton
gulp serve:app
// serve the documentation
gulp serve:docs
// serve the documentation on port 4999
gulp serve:docs --port=4999
```
