# angular-toggle-switch [![Build Status](https://travis-ci.org/JumpLink/angular-toggle-switch.png?branch=master)](https://travis-ci.org/JumpLink/angular-toggle-switch)

Toggle Switches for AngularJS.  Based off [Bootstrap switch](http://www.larentis.eu/switch/) by Matt Lartentis.

## Demo
[jumplink.github.io/angular-toggle-switch](http://jumplink.github.io/angular-toggle-switch/)

## Installation

Download [angular-toggle-switch.min.js](https://raw.github.com/JumpLink/angular-toggle-switch/master/angular-toggle-switch.min.js) or install with bower.

```bash
$ bower install angular-toggle-switch --save
```

Load `angular-toggle-switch.min.js` then add the `toggle-switch` module to your Angular App.

```javascript
angular.module('app', ['toggle-switch']);
```

See [demo](http://jumplink.github.io/angular-toggle-switch) for usage.

## Less

If you want to use your bootstrap variables, include toggle-switch.less in your compilation stack. You can even choose among Bootstrap versions 2 or 3.. compatible source.

## Development

Testing is done using Karma Test Runner.

```bash
$ grunt test
```

## Release

```bash
$ grunt release
```
