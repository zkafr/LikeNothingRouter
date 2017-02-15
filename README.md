#LikeNothingRouter

## Introduction

This is a tiny (~1200 bytes) frontend web router (client side).
It is using hash routes.
It handles both static and dynamic routes and call a callback to do some stuff.

## Quick start with an example

``` html
<!DOCTYPE html>
<html>
<head>
  <!-- Include the librairie -->
  <script src="https://raw.githubusercontent.com/zkafr/LikeNothingRouter/master/dist/lnr.min.js"></script>
</head>
<body>
  <!-- Add some links in your HTML like this -->
  <a href="#/">Home</a>
  <a href="#/foo">Foo</a>
  <a href="#/user/bar">User : Bar</a>
  <!-- Next, create the routes (it can be writed here or anywhere) -->
  <script>
    LikeNothingRouter.define([
      // static index route
      {
        uri: '/',
        callback:function(){ console.log('/'); }
      },
      // static other route
      {
        uri: '/foo',
        callback:function(){ console.log('/foo'); }
      },
      // dynamic route
      {
        uri: '/user/:user',
        callback:function(user){ console.log('/user/'+user); }
      }
    ]).init();
</script>
</body>
</html>
```

## Documentation

### Note

You can make your calls chained if you want. Theses functions allows to be chained :

- enabledebug()
- define()
- init()

### HTML links

All links are affected by the event listeners but only those that have a href that begins by `#/` are processed.

``` html
<!-- Links processed -->
<a href="#/route">Go to route</a>
<a href="">Will work as index but is not W3C's rules compliant</a>

<!-- Links that are not processed -->
<a href="#anchor">Go to anchor</a>
<a href="page.html">Go to page</a>
<a href="http://external">Go to external site</a>
```

### Summary (LikeNothingRouter prototype)

``` javascript
{
  // You will use these functions
  enabledebug: function(){},  // Function to enable debug
  define: function(r){},      // Function to define your routes
  init: function(){},         // Function to start the router
  // You do not care about these functions and variables
  ready: function(){},        // Function that waiting for the DOM to be loaded
  route: function(href){}     // Function that do the routing
  debug: false,               // Flag to enable or disable console log debug
  routes: [],                 // Array that contains your routes    
}
```

### enabledebug()

Call this one first if you need to enable the console debug.
``` javascript
LikeNothingRouter.enabledebug();
```

### define(array)

#### Simple route

To define your routes, you need to give an array of objects like this :

``` javascript
// Explained
var routeA = {
  uri: '/',
  callback: function(){ console.log('index'); }
};
var routeB = {
  uri: '/foo',
  callback: function(){ console.log('foo'); }
};
var routes = [routeA, routeB];
LikeNothingRouter.define(routes);

// Summarized
LikeNothingRouter.define([
  {
    uri: '/',
    callback: function(){ console.log('index'); }
  },
  {
    uri: '/',
    callback: function(){ console.log('foo'); }
  }
]);
```

#### Route parameters (variable routing)

To define a parameter, you have to use a semicolon ":", let see how it works with a sample code

``` javascript
function logusername(name){
  console.log(name);
}
function logusernameandage(name, age){
  /*
  If you call the route "http://host/#/user/foo/21", the typeof(age) will be String.
  All parameters are string. So do not forget to parseInt(age) if you need it.
  */
  console.log(name+' '+age);
}
// Parameters
LikeNothingRouter.define([
  {
    /*
    The name of the parameter can by anything while it begins by a semicolon ":"
    In the following route, it works even if you write "uri: '/user/:x'"
    */
    uri: '/user/:name',
    callback: logusername
  },
  {
    uri: '/user/:name/:age',
    callback: logusernameandage
    /*
    The callback function must have the same parameter order as route :
      route --> :name/:age
      callback --> (name, age)
    */
  }
]);
```

### init()

Finally, you have to call init to trigger some event listeners and load the page for the requested URL (yes, it is bookmarks friendly cause the init function reads and loads the URL).

``` javascript
LikeNothingRouter.init();
```

## Issues

Feel free to open an [issue](https://github.com/zkafr/LikeNothingRouter/issues) for questions, bugs, features and ideas.

## Contribution

Any improvement is welcome ! Take a look on [the master branch code](https://github.com/zkafr/LikeNothingRouter/blob/master/src/lnr.js)
Do not forget to send a understandable message with any pull request, it helps me to accept faster

## License

This code is mine and is yours, so it is under [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt)
