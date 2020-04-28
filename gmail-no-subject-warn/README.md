# gmail-no-subject-warn
Give a warning when trying to send email in GMail without any subject - chrome plugin

I see many such emails daily, surprised that there is no solution readily available. 

At this point of time, been going through multiple options (none of them are perfectly working)

## Framework choices

1. Make use of the JavaScript standard MutationObserver. Thought this will be the cleaner/**standard** way to do things. But this is giving many problems, like its also capturing self events and easily going to infinite loops. Add to that the major problem is, the object which i want to observer is not created on page load so it will not be there too.
2. Make use of the MutationSummary, this seems to be a better option as it excluded the self events by default, but I am not able to find its documentation anywhere, so am a little afraid that this is going to be the **non-standard** solution.


## Problem Areas

1. Identifying when the compose email box is opened. Since I have to set a event listener over the "Send" button, I need to know immediatly when its displayed. For this, I have initially tried setting an observer over the "body" (because nothing else worked), which gave raise to performance issues there by pushing me to delay the load from **ready** to **load** 
2. Other option is to set a event listener over "Compose" button and eliminate the need for observers all together. But this may not work for keyboard shortcuts. 
3. "Send" is not a button, its a div object. yuck!! Finally got some workaround through stackoverflow.
4. Ability to generate a pop-up box similar to GMail and not the yucky alert boxes. I was able to load the original pop-up box (for no recipients in "To" field) and get a workaround to it.
5. The boss of all the problems, If the subject is empty, how in the world can i stop it from proceeding forward. The div on "Send" is having 7 "click" event listeneres, of which I am able to narrowdown to one for the specific. But how can i disable it when I am not able to enable it again (As i do not know the listener code for it). 
	So, I thought of superimposing a dummy Send div over the original div using all the original style guide and hide the original div. Once all the validations are through, we can re-enable that div and invoke it from the plugin.
6. Did I say about the keyboard shotcuts problem?
7. MAN!! you should look at the GMail generated code, its generating the classes on the fly and are not the same everytime and not all of them are having id's assigned. This is making it extremely difficult to identify objects using code.


## Useful links

- https://stackoverflow.com/questions/14032553/how-to-use-getelementsbyclassname-function-in-order-to-get-the-send-button-in?rq=1
- https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript/6158050