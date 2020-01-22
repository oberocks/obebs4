/*!
 * obebs4-fa5-animated-checkboxes.js
 */

var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {

    // grab all OBE Icon Checkbox elements currently in the DOM
    let obeIconCheckboxes = document.querySelectorAll('.obe-icon-checkbox');

    // loop through each checkbox element
    for (var i = 0; i < obeIconCheckboxes.length; i++)
    {
        // add a click event listener to the checkbox element
        obeIconCheckboxes[i].addEventListener('click', function(){ 
            
            // assign the current element to a var
            let el = this;

            // query the current element for the FA icon svg element (which has the current state class)
            let svg = el.querySelector('svg');

            // query the current element for the hidden input element
            let input = el.querySelector('input[type=hidden]');
            
            // check the state class of the svg element
            if (svg.classList.contains('unchecked'))
            {
                // set elements to a checked state
                svg.classList.remove('unchecked');
                svg.classList.add('checked');
                input.value = 'checked';
            }
            else
            {
                // set elements to an unchecked state
                svg.classList.remove('checked');
                svg.classList.add('unchecked');
                input.value = 'unchecked';

            }

        });

    }

}); // end domReady()