# angular-toggle-switch

Toggle Switches for AngularJS.  Based off [Bootstrap switch](http://www.larentis.eu/switch/) by Matt Lartentis.

## Demo
[cgarvis.github.io/angular-toggle-switch](http://cgarvis.github.io/angular-toggle-switch)

## Installation

Download [angular-toggle-switch.min.js](https://raw.github.com/cgarvis/angular-toggle-switch/master/angular-toggle-switch.min.js) or install with bower.

```bash
$ bower install angular-toggle-switch --save
```

Load `angular-toggle-switch.min.js` then add the `toggle-switch` module to your Angular App.

```javascript
angular.module('app', ['toggle-switch']);
```

## Usage

```html
<toggle-switch model="switchStatus"></toggle-switch>
```

or

```html
<div toggle-switch model="switchStatus"></div>
```

### Custom Labels
```html
<toggle-switch model="switchStatus" on-label="True" off-label="False"></toggle-switch>
```

Development
----------

Testing is done using Karma Test Runner.

```bash
$ grunt karma:unit
```

Release
-------

```bash
$ grunt release
```
