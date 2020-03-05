// obe-input-grp-btn-toggle-plugins.js

var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {

    // Utility function
    // Source: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
    var obeEscapeHtml = function(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    };

    // Utility function
    // Source: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
    var obeUnescapeHtml = function(text) {
        return text.replace(/&amp;/g, '&').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    };
    
    // Grab all obe increment components in the DOM
    let componentsSelector = '[data-obe-input-data-toggle]';
    let components = document.querySelectorAll(componentsSelector);

    // Loop through all component instances and add event listners to each
    for (var i = 0; i < components.length; i++)
    {
        // set vars for this component
        let componentParent = components[i].parentNode;
        let toggleHiddenInput = componentParent.querySelector('input[type=hidden]');
        let hiddenValueOnLoad = obeUnescapeHtml(toggleHiddenInput.value);
        let textToggleElement = componentParent.querySelector('[data-obe-text-toggle]');
        let textToggleOnLoad_stored = obeUnescapeHtml(textToggleElement.dataset.obeTextToggle);
        let textToggleOnLoad_displayed = textToggleElement.textContent;

        // update the state of the text toggle trigger and it's data attribute if a value is found in the hidden input on page load
        if (hiddenValueOnLoad.length > 0)
        {
            // console.log('hiddenValueOnLoad: ' + hiddenValueOnLoad);
            if (hiddenValueOnLoad === textToggleOnLoad_stored && hiddenValueOnLoad != textToggleOnLoad_displayed)
            {
                textToggleElement.textContent = hiddenValueOnLoad;
                toggleHiddenInput.value = obeEscapeHtml(hiddenValueOnLoad);
                textToggleElement.dataset.obeTextToggle = obeEscapeHtml(textToggleOnLoad_displayed);
            }
        }

        components[i].addEventListener('before.text.toggle', function(event) {

            this.dispatchEvent( new CustomEvent('before.input.toggle', {
                bubbles: true,
                detail: {
                    data: {
                        displayed: event.detail.data.displayed,
                        stored: event.detail.data.stored
                    }
                }
            }));
            
        });
        
        components[i].addEventListener('after.text.toggle', function(event) {
            
            // get the parent of the the component (should generally be a .form-group element)
            let parent = this.closest(componentsSelector).parentNode;
            
            // grab the hidden input in the component
            let hiddenInput = parent.querySelector('input[type="hidden"]');

            // add the unescaped (IE displayed) value to the component's hidden input
            hiddenInput.value = event.detail.data.displayed;

            this.dispatchEvent( new CustomEvent('after.input.toggle', {
                bubbles: true,
                detail: {
                    data: {
                        displayed: event.detail.data.displayed,
                        stored: event.detail.data.stored
                    }
                }
            }));
            
        });
    } // end for loop

}); // end domReady()