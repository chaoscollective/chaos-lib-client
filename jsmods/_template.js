define([], 
function(){
  var exports = {};
  var test1   = exports; 
  // --
  console.log("TEST 1 init.");
  exports.exampleFn = function(){
    console.log("example function.");
  };
  // --
  return exports;
});