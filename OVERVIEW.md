This UI package creates a single page [AngularJS](https://angularjs.org/) applicaiton that interacts with the REST API exposed by the MOTECH Server. Styles and components available in the UI are [documented in the MOTECH-UI Styleguide](http://styleguide.motechproject.org), which is generated from this package.

[NodeJS](https://nodejs.org) and [Gulp](http://gulpjs.com/) are used to generate the MOTECH-UI. [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/) are the package managers used in the project. [Sass](http://sass-lang.com/) & [Bourbon](http://bourbon.io/)

### Goals

#### Semantic Mark-up
Less markup on HTML elements makes it easier for the styles to be changed in one place. An example of this is that all images that are not primary content should be implemented in CSS.

#### Supported browsers
MOTECH project uses new technologies (HTML 5, CSS3) and new frameworks like [AngularJS](https://angularjs.org/), [Bootstrap](http://getbootstrap.com/)
which means that the compatibility of the browsers depends on the extent to which these frameworks support old browsers.

We officialy support IE11 and up, Chrome, Firefox, Safari and Opera. We don't support older versions of Internet Explorer due to framework compatibility, as mentioned above.
                                                                                                                                                                              


#### Optimized for small screens and touchpads
MOTECH is used to configure health workflows, and is often used on a laptop without a mouse. We are currently working to optimize the UI to be most simple for these users.
