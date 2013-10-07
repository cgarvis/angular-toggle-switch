angular-toggle-switch
=====================

Toggle Switches for AngularJS. Based off [Bootstrap switch](http://www.larentis.eu/switch/) by Matt Lartentis. Forked from Christopher Garvis.

Demo
----
From Christopher Garvis [cgarvis.github.io/angular-toggle-switch](http://cgarvis.github.io/angular-toggle-switch)

Installation
------------

```bash
bower install https://github.com/nathantsoi/angular-toggle-switch.git --save
```

Load `angular-toggle-switch.js` then add the `toggle-switch` module to your Angular App.

```javascript
angular.module('app', ['toggle-switch']);
```

Usage
-----

```html
<toggle-switch model="switchStatus" on-label="Yes" off-label="No"><toggle-switch>
```
