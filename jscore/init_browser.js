
// POLYFILL FOR BROWSER STILL IN FLUX.
(function() {
  var DEBUG     = true;
  var lastTime  = 0;
  var vendors   = ['', 'ms', 'moz', 'webkit', 'o'];
  var winProps  = [
    "requestFileSystem",
    "storageInfo",
    "resolveLocalFileSystemURL",
    // --
    "requestAnimationFrame",
    "cancelAnimationFrame",
    // --
    "OfflineAudioContext",
    "AudioContext",
    // --
    "RTCPeerConnection",
    "RTCIceCandidate",
    "RTCPeerConnection",
    "RTCSessionDescription",
    // --
    "notifications",
    // --
    "URL"
  ];
  var navProps  = [
    "getUserMedia",
    "temporaryStorage",
    "persistentStorage"
  ];
  var docProps  = [
    "visibilityState"
  ];
  // --
  if(!navigator) window.navigator = {};
  if(!console)   window.console   = {
    log:    function(){},
    warn:   function(){},
    error:  function(){}
  };
  // --
  for(var x=0; x < vendors.length; x++) {
    for(var y=0; y < winProps.length; y++) {
      var prop  = winProps[y];
      var propB = prop.charAt(0).toUpperCase() + prop.substring(1);
      if(!window[prop]){
        window[prop] = window[vendors[x]+propB];
        if(window[prop] && DEBUG){
          console.log("POLYFILL(window):", prop+" --> "+vendors[x]+propB);
        }
      }
    }
    for(var y=0; y < navProps.length; y++) {
      var prop  = navProps[y];
      var propB = prop.charAt(0).toUpperCase() + prop.substring(1);
      if(!navigator[prop]){
        navigator[prop] = navigator[vendors[x]+propB];
        if(navigator[prop] && DEBUG){
          console.log("POLYFILL(navigator):", prop+" --> "+vendors[x]+propB);
        }
      }
    }
    for(var y=0; y < docProps.length; y++) {
      var prop  = docProps[y];
      var propB = prop.charAt(0).toUpperCase() + prop.substring(1);
      if(!document[prop]){
        document[prop] = document[vendors[x]+propB];
        if(document[prop] && DEBUG){
          console.log("POLYFILL(document):", prop+" --> "+vendors[x]+propB);
        }
      }
    }
  }
  // FALLBACKS...
  //* 
  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {clearTimeout(id);};
  // --
  document.getVisibilityState = function(){
    var prop  = "visibilityState";
    var propB = prop.charAt(0).toUpperCase() + prop.substring(1);
    var v = "visible";
    for(var x=0; x < vendors.length; x++) {
      if(document[vendors[x]+propB]){
        v = document[vendors[x]+propB];
      }
    }
    return v;
  };
  document.onvisibilitychange = function(cb){
    for(var i=0; i<vendors.length; i++){
      $(document).on(vendors[i]+"visibilitychange", cb);
    }
  };
  // --
  if(!navigator.temporaryStorage && window.storageInfo){
    console.warn("SHIM: storageInfo -> temporaryStorage");
    navigator.temporaryStorage = {};
    navigator.temporaryStorage.queryUsageAndQuota = function(success, error){
      window.storageInfo.queryUsageAndQuota("TEMPORARY", success, error); 
    }
  }
  //  */
}());
// --
window.isMobile   = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|mobile)/); 
window.isInIFrame = (window.location != window.parent.location) ? true : false;
window.myRand     = window.myRand ||Math.random().toString(32).substring(2);
window.getUUID    = window.getUUID||function(){
  return (new Date().getTime().toString(36))+"_"+myRand+"_"+Math.random().toString(32).substring(2); 
};
window.getWindowName  = function(){
  var n = window.name||"";
  if(!n || n.length < 1){
    n = getUUID();
    window.name = n;
  }
  return n;
};
window.changeCSS      = function(myclass,element,value) {
  var CSSRules;
  if (document.all) {
    CSSRules = 'rules';
  }
  else if (document.getElementById) {
    CSSRules = 'cssRules';
  }
  var foundMatch = false;
  var s = 0;
  if(!document.styleSheets) return console.warn("no document.styleSheets");
  for(s=0; s<document.styleSheets.length; s++){
    if(!document.styleSheets[s][CSSRules]){
      //console.warn("no inner styleSheet rule.", CSSRules, document.styleSheets[s]); 
      continue;
    }
    for (var i = 0; i < document.styleSheets[s][CSSRules].length; i++) {
      if (document.styleSheets[s][CSSRules][i].selectorText == myclass) {
        document.styleSheets[s][CSSRules][i].style[element] = value;
        foundMatch = true;
      }
    }  
  }
  if(!foundMatch){
    s = document.styleSheets.length-1;
    var newStyle = myclass+" { "+element+": "+value+";}";
    if(!document.styleSheets[s][CSSRules]) return console.warn("no inner stylesheet rule 2."); 
    document.styleSheets[s].insertRule(newStyle, document.styleSheets[s][CSSRules].length);   
    //console.log("inserting rule: ", myclass, element, value, newStyle);
  }
};
window.escapeHTML     = function(msg){
  return (msg||"").replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
};
window.logErrCB       = function(err,cb){
  console.error(err);
  if(!cb) return console.warn("no callback in logErrCB. You should change that.");
  cb(err);
};
window.appReady       = function(){
  $(".showif_notready").hide();
  $(".showif_ready").show();
};
// --
window.settings       = window.settings||{};
// --
// basic jquery addons; if this gets large, we can break it out separately.
$.fn.dontScrollParent = function(exceptions){
  this.bind('mousewheel DOMMouseScroll',function(e){
    var me = this;
    if(exceptions){
      if($(e.target).parents(exceptions).length > 0){
        console.log("a parent was an exception.");
        me = $(e.target).parents(exceptions).get(0);
        //return true;
      }
      if($(e.target).parent().children(exceptions).length > 0){
        console.log("self or sibling was exception.");
        me = $(e.target).parent().children(exceptions).get(0);
        //return true;
      }
    }
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if (delta > 0 && $(me).scrollTop() <= 0)
      return false;
    if (delta < 0 && $(me).scrollTop() >= me.scrollHeight - $(me).innerHeight())
      return false;
    return true;
  });
};
// --

