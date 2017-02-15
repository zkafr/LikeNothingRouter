var LikeNothingRouter = {
  debug: false,
  routes: [],
  enabledebug: function(){
    this.debug = true;
    return this;
  },
  define: function(r){
    if (this.debug) { console.log('define()'); }
    this.routes = r;
    return this;
  },
  ready: function(){
    if (this.debug){ console.log('ready'); }
    var e = document.getElementsByTagName('a');
    for(var i = 0, len = e.length; i < len; i++) {
      e[i].onclick = function () {
        LikeNothingRouter.route(this.hash);
      }
    }
  },
  init: function(){
    if (this.debug) { console.log('init'); }
    if (this.routes.length < 1){
      console.log('You forget to define() routes before init...');
      return;
    }
    this.route(document.location.hash);
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
      this.ready();
    } else {
      document.addEventListener("DOMContentLoaded", this.ready());
    }
  },
  route: function(href){
    if (this.debug) { console.log('route('+href+')'); }
    href = (typeof(href) !== 'undefined') ? href : '';
    if (href.substring(0,2) === '#/'){
      var argv = href.substring(2).split('/');
      for (var i=0; i<this.routes.length; i++) {
        var argvr = this.routes[i]['uri'].substring(1).split('/');
        var args = [];
        var match = [];
        if (argvr.length === argv.length){
          args = [];
          for (var j=0; j<argv.length; j++){
            if (argvr[j] === argv[j] || argvr[j].substring(0,1) === ':'){
              match[j] = true;
              if (argvr[j].substring(0,1) === ':'){
                args.push(argv[j]);
              }
            } else {
              match[j] = false;
            }
          }
          if (match.indexOf(false) === -1){
            this.routes[i]['callback'].apply(null, args);
            break;
          }
        }
      }
    }
    if (href === '/' || href === ''){
      for (var i=0; i<this.routes.length; i++){
        if (this.routes[i]['uri'] === '/'){
          this.routes[i]['callback'].apply(null, []);
        }
      }
    }
  }
}