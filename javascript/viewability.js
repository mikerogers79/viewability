

/*****************
STANDARD FUNCTIONS
******************/

if (!window.console) console = {};
console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};


//get the size of the current window
//This method is specific to IE
function displayWindowSize() {
  
  var windowSize = Array();
  windowSize.height = document.documentElement.clientHeight;
  windowSize.width = document.documentElement.clientWidth;

  
return windowSize;
}


//This is a more generic method
function displayWindowSizeGeneric() {
 
  var windowSize = Array();
  windowSize.height = window.innerHeight;
  windowSize.width = window.innerWidth;
  
  
  
return windowSize;
}

//extract details of where the top and the bottom of the element are in relation to the viewport
function extractClientRect(element, viewport) {
 
  var rects = element.getClientRects();
  
  //loop through rects
  for (var i = 0, l = rects.length; i < l; i++) {
    
     var currentRect = rects[i];
     var elementTop = currentRect.top;
     var elementBottom = currentRect.bottom;
     var x = Math.floor(currentRect.left);
     var x_max = Math.ceil(currentRect.right);
     //var y = Math.floor(r.top);
     //var y_max = Math.ceil(r.bottom);    
    
    
     // Check that the top of the Ad is in view or if it is hanging off the bottom of the screen then check the bottom measurement. 
    var in_viewport = elementTop > 0 ? elementTop <= viewport.height : (elementBottom > 0 && elementBottom <= viewport.height);
    
    currentRect.isViewable = in_viewport;
    
    return currentRect;
  }
  
  
  //return element.getClientRects();
  
}

//extract the details of the parent node if available
function getParentNode(element) {

	if (element) {
	
		var parentNode = element.parent;
		
		if (parentNode) {
		
			return parentNode;
			
		}
		else {
		
			return false;
			
		}
	}
	else {
	
		return false;
		
	}
}






//This kicks everything off
(function() {
  
  var counter = 1;
  setInterval(function() {
    
   var ieSize = displayWindowSize();
   var chromeSize = displayWindowSizeGeneric();
   var statusBox = document.getElementById("status");
   var parentNode = getParentNode(statusBox);
  
  
	console.log('--' + counter + '--');
    //viewport stats
    
	console.log("IE viewport: " + ieSize.height + " x " + ieSize.width);
    console.log("Generic viewport: " + chromeSize.height + " x " + chromeSize.width);    
  
  //clientRect details
  var contentDiv = document.getElementById("content");
  var clientRectIE = extractClientRect(contentDiv, ieSize);
  
    console.log("Top Offset: " + clientRectIE.top);
       
    console.log("Bottom Offset: " + clientRectIE.bottom);
    console.log("Viewable: " + clientRectIE.isViewable);
	console.log("parentNode: " + parentNode);
 
   counter++;
    
    
  },1000);
  
}());