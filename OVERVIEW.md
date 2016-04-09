This UI package creates a single page [AngularJS](https://angularjs.org/) applicaiton that interacts with the REST API exposed by the MOTECH Server. Styles and components available in the UI are [documented in the MOTECH-UI Styleguide](http://styleguide.motechproject.org), which is generated from this package.

[NodeJS](https://nodejs.org) and [Gulp](http://gulpjs.com/) are used to generate the MOTECH-UI. [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/) are the package managers used in the project. [Sass](http://sass-lang.com/) & [Bourbon](http://bourbon.io/)

This application follows [John Papa structure guidelines](https://github.com/johnpapa/angular-styleguide) as closely as possible.

### Goals

#### Semantic Mark-up
Less markup on HTML elements makes it easier for the styles to be changed in one place. An example of this is that all images that are not primary content should be implemented in CSS.

#### Graceful Degredation
We support IE9 and up, meaning our interface must function in all browsers possible — but all experiences don't need to be exactly the same, just equally functional.

View the [Issues and Workarounds section](#issues) for specific information on techniques used in this UI. 

#### Optimized for small screens and touchpads
MOTECH is used by people to configure health workflows. Many of these people use laptops and don't have access to a mouse.

### <a name="issues"></a>Issues and Workarounds

#### Internet Explorer 9
To keep compatibility with IE9 it is best to follow these rules:

- IE9 doesn't support CSS3 animations and transitions, so it is best to use *.gif files for animations;
- IE9 filter supports only colours defined in 8 digit hexes (AARRGGBB). For more information see [Gradient Attributes and Properties](https://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx). Some frameworks don't use correctly defined colours for MS filter and it might lead to inconsistency between different browser UIs;
```javascript
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFE8E8E8', endColorstr='#FFF2F2F1');
```
- IE9 can't interpret 3 digit hexes for background-colour so it is best not to use it at all for better code management and code consistency.

#### Internet Explorer 8 and below
We don't support IE8 and below because AngularJS doesn't support IE8 and below. When a user visits the UI with an unsupported browser we alert the user that their browser is unsupported and disallow further use of the UI.


### File Structure and Build Process

The `/src/` directory is meant to be as flat as possible, and organized such that files that would be used together are listed next to eachother. When built, CSS and Javascript files are compiled into /css/motech.css and /js/motech.js, respectively. HTML templates and image assests are left in their source directory so that when writting paths in `/source/` they map to the same location in `/build/` (which I hope is easier to remember).

As a general rule, all files or directories pre-fixed by an underscore are ignored by the build process, unless there are specific files (or processes) that use the file directly.  

### Javascript
Since this applicaiton is written in Angular, it follows a build process to ensure that Angular components are loaded in a way to avoid conflicts. This means that module definitions are loaded first, followed by configurations, routes, and then all other Angular component types.

Javascript files should be annotated like so:
[component name]`.`[component type]`.js`

Component Name represents the name of the component, if the component is related to login, then it is named login.

Component Type represents the type of component that is used. This means Angular controllers should are type controller, and Angular service are type service.

### Stylesheets (SASS & CSS)
The build process will group and process all SASS and CSS together.

The motech.scss defines variables that are used throughout the application as well as load libraries from bower. This file is the first one included in the build process.

Sass requires all mixins to be loaded before they are used, so any file ending in `.mixins.scss`, will be loaded first.

Stylesheet files should be named like so:
[prefix]`.`[component name]`.scss` (or `.css`)

