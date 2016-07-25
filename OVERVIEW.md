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
