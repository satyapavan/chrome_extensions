// This gets loaded when the entire page is loaded, so its good from a performance POV
// But if the page is stuck on something and if the user is able to "compose", then the plugin is failed
// $(document).load(function(){});

// this is loaded when the DOM is loaded and does not wait for the images and other stuff to be loaded.
// Hence its loaded earlier which is good, but the downside is, we see too many events as part of the imageloading dom changes, so a wouldbe performance hit.
$(document).ready(function(){ 

	// I would like to observe something else, but couldn't make it work. so its a todo
	var target = document.body;

	var config = {
		childList: true,
		subtree: true
	};

	observer.observe(target, config);
	console.log("Registed to observer");
});


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Below code is a copy paste from stackoverflow

function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


var isSubjectNullCheck = function() {
	console.log("Entering into isSubjectNullCheck for " + this);

	// We are at the send button. Lets find the current (which is also the closent) 'compose' email box.
	// Then from there, find the "subject" box. This is needed as there could be multiple emails in progress
	// and we do not want to cross through an error when the current subject is well but not the other.
	var subject_div = $(this).closest("div.inboxsdk__compose").find('[name="subjectbox"]')[0];

	// This is used later in the flow during send_anyway_obj event listener
	var send_anyway_obj = this;

	console.log(subject_div);

	// Lets check the length of the subject which is stored as the value of above subject_div object
	if(subject_div == undefined ) {
		console.log("Subject box not found...");

		subject_div = $(this).closest('[role="dialog"]').find('[name="subjectbox"]')[0];
		
		if(subject_div == undefined ) {	
			// throw new Error("Subject could not be located");
			console.log("Subject could not be located even in 2nd try, this may be a reply to existing email");
		} else {
			console.log("ah! found the subject in 2nd try");
		}
	}

	if(subject_div.value.length == 0){

		console.log(this);

		$("body").append('<div id="no_sub_alert_fade" class="Kj-JD-Jh" style="opacity: 0.75; top:0; right: 0; bottom: 0; left: 0;" aria-hidden="true"></div>\
			<div id="no_sub_alert" class="Kj-JD" tabindex="0" role="alertdialog" aria-labelledby=":qs" style="lposition: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 1;">\
				<div class="Kj-JD-K7 Kj-JD-K7-bsT">\
					<span class="Kj-JD-K7-K0" id=":qs" role="heading">Error</span>\
					<span class="Kj-JD-K7-Jq" role="button" tabindex="0" aria-label="Close"></span>\
				</div>\
				<div class="Kj-JD-Jz">Please specify a valid subject for the email.</div>\
				<div class="Kj-JD-Jl">\
					<button id="no_sub_alert_btn_dont_send" name="ok" class="J-at1-auR" \
					style="box-shadow: none; background-color: #4d90fe; background-image: -webkit-linear-gradient(top,#4d90fe,#4787ed); border: 1px solid #3079ed; color: #fff;">Don\'t Send</button>\
					<button id="no_sub_alert_btn_send_anyway" name="not-ok" class="J-at1-auR">Send anyway</button>\
				</div>\
			</div>'
			);

		console.log("After the appendChild" + document.getElementById("no_sub_alert_btn_dont_send"));

		document.getElementById("no_sub_alert_btn_dont_send").addEventListener("click", function() {
			// Lets remove the alerts we are created above and move the control back to the compose email.
			$("#no_sub_alert_fade").remove();
			$("#no_sub_alert").remove();
			$(subject_div).show();
		});

		document.getElementById("no_sub_alert_btn_send_anyway").addEventListener("click", function() {
			console.log("We have been forced to send the email, too bad")
			// Lets remove the alerts we are created above and move the control back to the compose email.
			$("#no_sub_alert_fade").remove();
			$("#no_sub_alert").remove();
			$(subject_div).show();

			// 'usage of this' here leads to send_anyway object, we are are using a copy of the object created above.
			simulate(document.getElementById(send_anyway_obj.id.replace("TEMP", "")), "click");
		});

	} else {
		console.log("All Good, simulaing the actual 'Send' button click for proceeding forward");

		simulate(document.getElementById(this.id.replace("TEMP", "")), "click");
	}

};

var observer = new MutationObserver(function(mutationRecords, observer) {
	console.log("Entered into observer.MutationObserver");

	var counter = 1;

	var xpath = '//div[@role="button" and text()="Send"]'
	var query = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var button = query.iterateNext()

	while( button != null) {

		// For some reason, below clone is not being displayed in caps 'SEND', hence below indexOf is to solve it
		if( (button.id.indexOf("TEMP") > -1 ) || (document.getElementById(button.id + "TEMP")) ) {
			console.log("	button.id[" + button.id + "] - This is already cloned.");

			try {
				button = query.iterateNext();
				continue;
			}
			catch(err){
				console.log("Inside Exception: " + err + "::" + button);
				break;
			}
		}

		console.log("	button.id[" + button.id + "] - Lets clone it.");

		// Since, we couldn't change the behaviour of the current send button, I am cloning it and hiding the actual.
		// so what is visible now is a clone created and controlled by me. Hence mischief managed!!
		var newBtn = button.cloneNode(true);
		newBtn.id = button.id + "TEMP";
		newBtn.innerHtml = "SEND..";  // Why is this not being reflected?
		newBtn.name = "SEND.."; // Why is this not being reflected?

		console.log(newBtn);

		// Lets make sure to hide the current btn before adding a new one, else there is a problem of layout change.
		button.style.display = "none";
		button.parentElement.appendChild(newBtn);
		newBtn.addEventListener("click", isSubjectNullCheck);

		// This is throwing error, so the dirty workaround is, above clone is going to trigger a new event, 
		// so indirectly we are invoking the function again and during that time the next event will be picked up 
		// as we are returning the call if the 1st obj is already cloned. a bad performance code, 
		// but works like a charm till i learn more.
		// button = query.iterateNext();

		// DO NOT 'continue' as the variable button is not updated and we are checking of it != null, 
		// so save me a infinite loop and break here.

		break;
	}
});
