This UI package creates a single page [AngularJS](https://angularjs.org/) applicaiton that interacts with the REST API exposed by the MOTECH Server. Styles and components available in the UI are [documented in the MOTECH-UI Styleguide](http://styleguide.motechproject.org), which is generated from this package.

[NodeJS](https://nodejs.org) and [Gulp](http://gulpjs.com/) are used to generate the MOTECH-UI. [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/) are the package managers used in the project. [Sass](http://sass-lang.com/) & [Bourbon](http://bourbon.io/)

### Goals

#### Semantic Mark-up
Less markup on HTML elements makes it easier for the styles to be changed in one place. An example of this is that all images that are not primary content should be implemented in CSS.

#### Graceful Degredation
We support IE9 and up, meaning our interface must function in all browsers possible — but all experiences don't need to be exactly the same, just equally functional.

View the [Issues and Workarounds section](#issues) for specific information on techniques used in this UI. 

#### Optimized for small screens and touchpads
MOTECH is used to configure health workflows, and is often used on a laptop without a mouse. We are currently working to optimize the UI to be most simple for these users.

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


### Structure and Build Process

The `/src/` directory is meant to be as flat as possible, and organized such that files that would be used together are listed next to eachother. When built, CSS and Javascript files are compiled into /css/motech.css and /js/motech.js, respectively. HTML templates and image assests are left in their source directory so that when writting paths in `/source/` they map to the same location in `/build/` (which I hope is easier to remember).

As a general rule, all files or directories pre-fixed by an underscore are ignored by the build process, unless there are specific files (or processes) that use the file directly.  

### Javascript
Since this applicaiton is written in Angular, it follows a build process to ensure that Angular components are loaded in a way to avoid conflicts. This means that module definitions are loaded first, followed by configurations, routes, and then all other Angular component types. This application follows [John Papa structure guidelines](https://github.com/johnpapa/angular-styleguide) as closely as possible.

#### File names
Javascript files should be annotated like so:
[component name]`.`[component type]`.js`

Component Name represents the name of the component, if the component is related to login, then it is named login.

Component Type represents the type of component that is used. This means Angular controllers should are type controller, and Angular service are type service.

#### Angular Application Conventions

#### Application Start Up


### Stylesheets (SASS & CSS)
The build process will group and process all SASS and CSS together into a single CSS file named `motech.css`. When compiled in production mode the CSS file is compressed, otherwise the CSS file will contain a source map. The file [motech.scss]() defines variables that are used throughout the application and is the first one included in the build process. Since SASS requires all mixins to be loaded before they are used, any file ending in `.mixins.scss`, will be loaded first.

#### File names

Stylesheet files should be named like so:
[prefix]`.`[component name]`.scss` (or `.css`)

#### CSS Conventions
SASS/CSS structure, naming conventions, and file layout the CSS components follow the [SMACSS CSS naming conventions.]() The main reason for adhering to the paradigm is because it makes guessing which file a specific CSS style is located easy, while maintaining semantic style names. SMACSS rules are not supposed to be absolutely strict, but are a reference to help shape the naming and organization of CSS styles. You will notice some file names reference concepts from SMACSS, but the CSS file naming convention doesn't aim to standardize on this.

The following are key definitions from SMACSS, and how we are applying them in the MOTECH-UI.

##### Base
The most basic layout styles, which generally are applied directly to HTML elements. These styles may concern font, color, or even animation. Base styles shouldn't apply size or positioning rules, these definitions should be written in layout sections.

##### Layout
Layout styles refer to how basic styles are laid out next to eachother. These styles don't reflect base styles like the color of an element, but rather the size and position of an element related to other elements. Keeping the layout styles seperate from base styles helps when creating a responsive interface.

##### Modifier
Modifier reflect the state of a element. Modifiers could include psudo-selectors like :disabled or :hover, but generally should be style names that are prefixed with `is`. Example modifier rules could include `is-running` or `is-changed`.

##### Module
Modules are groupings of code that only apply to a specific section of the UI. This would mean a drawing interface would have a module, and all styles for the drawing interface would be prefixed with with 'drawing-'. Modules can include their own specific base, layout, and modifier classes.

##### Media Queries
The MOTECH-UI is a responsive and "mobile first" meaning that all styles should be first written for small-screen devices, and then use media queries to progressively change the experience. We support the [four media sizes used in Bootstrap,](http://getbootstrap.com/css/#responsive-utilities) which are extra-small(no media query), small ($screen-sm), medium ($screen-md), and large ($screen-lg).

### Styleguide

This styleguide is generated from KSS documentation written in SASS and CSS files. As a general rule, a file should implement only one documentation section and the documentation should be at the top of the file.
