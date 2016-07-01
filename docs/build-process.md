
# Structure and Build Process

The `/src/` directory is meant to be as flat as possible, and organized such that files that would be used together are listed next to eachother. When built, CSS and Javascript files are compiled into /css/motech.css and /js/motech.js, respectively. HTML templates and image assests are left in their source directory so that when writting paths in `/source/` they map to the same location in `/build/` (which I hope is easier to remember).

As a general rule, all files or directories pre-fixed by an underscore are ignored by the build process, unless there are specific files (or processes) that use the file directly.  

## Javascript
Since this applicaiton is written in Angular, it follows a build process to ensure that Angular components are loaded in a way to avoid conflicts. This means that module definitions are loaded first, followed by configurations, routes, and then all other Angular component types. This application follows [John Papa structure guidelines](https://github.com/johnpapa/angular-styleguide) as closely as possible.

### File names
Javascript files should be annotated like so:
[component name]`.`[component type]`.js`

Component Name represents the name of the component, if the component is related to login, then it is named login.

Component Type represents the type of component that is used. This means Angular controllers should are type controller, and Angular service are type service.

### Angular Application Conventions

### Application Start Up


### Stylesheets (SASS & CSS)
The build process will group and process all SASS and CSS together into a single CSS file named `motech.css`. When compiled in production mode the CSS file is compressed, otherwise the CSS file will contain a source map. The file [motech.scss]() defines variables that are used throughout the application and is the first one included in the build process. Since SASS requires all mixins to be loaded before they are used, any file ending in `.mixins.scss`, will be loaded first.

### File names

Stylesheet files should be named like so:
[prefix]`.`[component name]`.scss` (or `.css`)

### CSS Conventions
SASS/CSS structure, naming conventions, and file layout the CSS components follow the [SMACSS CSS naming conventions.]() The main reason for adhering to the paradigm is because it makes guessing which file a specific CSS style is located easy, while maintaining semantic style names. SMACSS rules are not supposed to be absolutely strict, but are a reference to help shape the naming and organization of CSS styles. You will notice some file names reference concepts from SMACSS, but the CSS file naming convention doesn't aim to standardize on this.

The following are key definitions from SMACSS, and how we are applying them in the MOTECH-UI.

#### Base
The most basic layout styles, which generally are applied directly to HTML elements. These styles may concern font, color, or even animation. Base styles shouldn't apply size or positioning rules, these definitions should be written in layout sections.

#### Layout
Layout styles refer to how basic styles are laid out next to eachother. These styles don't reflect base styles like the color of an element, but rather the size and position of an element related to other elements. Keeping the layout styles seperate from base styles helps when creating a responsive interface.

#### Modifier
Modifier reflect the state of a element. Modifiers could include psudo-selectors like :disabled or :hover, but generally should be style names that are prefixed with `is`. Example modifier rules could include `is-running` or `is-changed`.

#### Module
Modules are groupings of code that only apply to a specific section of the UI. This would mean a drawing interface would have a module, and all styles for the drawing interface would be prefixed with with 'drawing-'. Modules can include their own specific base, layout, and modifier classes.

#### Media Queries
The MOTECH-UI is a responsive and "mobile first" meaning that all styles should be first written for small-screen devices, and then use media queries to progressively change the experience. We support the [four media sizes used in Bootstrap,](http://getbootstrap.com/css/#responsive-utilities) which are extra-small(no media query), small ($screen-sm), medium ($screen-md), and large ($screen-lg).

