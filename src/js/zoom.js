let zoom={
	'evCache':new Array(),
	'prevDiff':-1,
	'logEvents': false,
	'init':function(){
	    // Install event handlers for the pointer target
	    var el=document.getElementById("viewer");
	    el.onpointerdown = zoom.pointerdown_handler;
	    el.onpointermove = zoom.pointermove_handler;
	    // Use same handler for pointer{up,cancel,out,leave} events since
	    // the semantics for these events - in this app - are the same.
	    el.onpointerup = zoom.pointerup_handler;
	    el.onpointercancel = zoom.pointerup_handler;
	    el.onpointerout = zoom.pointerup_handler;
	    el.onpointerleave = zoom.pointerup_handler;
	},
	'pointerdown_handler':function(ev){
	    // The pointerdown event signals the start of a touch interaction.
	    // This event is cached to support 2-finger gestures
	    zoom.evCache.push(ev);
	    //zoom.log("pointerDown", ev);
	},
	'pointermove_handler':function(ev){
		// This function implements a 2-pointer horizontal pinch/zoom gesture.
		//
		// If the distance between the two pointers has increased (zoom in),
		// the target element's background is changed to "pink" and if the
		// distance is decreasing (zoom out), the color is changed to "lightblue".
		//zoom.log("pointerMove", ev);
		// Find this event in the cache and update its record with this event
		for (var i = 0; i < zoom.evCache.length; i++) {
			if (ev.pointerId == zoom.evCache[i].pointerId) {
				zoom.evCache[i] = ev;
				break;
			}
		}
		// If two pointers are down, check for pinch gestures
		if (zoom.evCache.length == 2) {
		    // Calculate the distance between the two pointers
		    var curDiff = Math.abs(zoom.evCache[0].clientX - zoom.evCache[1].clientX);
		    if (zoom.prevDiff > 0) {
		    	if (curDiff > zoom.prevDiff) {
		    	// The distance between the two pointers has increased
		    	//zoom.log("Pinch moving OUT -> Zoom in", ev);
		    	PDFViewerApplication.zoomIn();
		    }
		    if (curDiff < zoom.prevDiff) {
		        // The distance between the two pointers has decreased
		        //zoom.log("Pinch moving IN -> Zoom out",ev);
		        PDFViewerApplication.zoomOut();
		    }
		    }// Cache the distance for the next move event
		    zoom.prevDiff = curDiff;
		}
	},
	'pointerup_handler':function(ev){
		zoom.log(ev.type, ev);
		// Remove this pointer from the cache and reset the target's
		// background and border
		zoom.remove_event(ev);
		// If the number of pointers down is less than two then reset diff tracker
		if (zoom.evCache.length < 2) {
			zoom.prevDiff = -1;
		}
	},
	'remove_event':function(ev){
	    // Remove this event from the target's cache
	    for (var i = 0; i < zoom.evCache.length; i++) {
	    	if (zoom.evCache[i].pointerId == ev.pointerId) {
	    		zoom.evCache.splice(i, 1);
	    		break;
	    	}
	    }
	},
	'enableLog':function(ev){
		zoom.logEvents = zoom.logEvents ? false : true;
	},
	'log':function(prefix, ev) {
		if (!zoom.logEvents) return;
		var o = document.getElementsByTagName('output')[0];
		var s = prefix + ": pointerID = " + ev.pointerId +" ; pointerType = " + ev.pointerType +" ; isPrimary = " + ev.isPrimary;
		o.innerHTML += s + "";
	},
	'clearLog':function(event) {
		var o = document.getElementsByTagName('output')[0];
		o.innerHTML = "";
	},
}
export default zoom;

