// obe-input-grp-btn-toggle-plugins.js

var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {

    // Grab all obe increment components in the DOM
    let componentsSelector = '[data-obe-input-data-toggle]';
    let components = document.querySelectorAll(componentsSelector);

    // Loop through all component instances and add event listners to each
    for (var i = 0; i < components.length; i++)
    {
        components[i].addEventListener('after.text.toggle', function(event) {
            
            // get the parent of the the component (should generally be a .form-group element)
            let parent = this.closest(componentsSelector).parentNode;
            
            // grab the hidden input in the component
            let hiddenInput = parent.querySelector('input[type="hidden"]');

            // add the unescaped (IE displayed) value to the component's hidden input
            hiddenInput.value = event.detail.data.displayed;
            
        });
    }

}); // end domReady()