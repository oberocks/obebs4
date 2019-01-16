/*!
 * OBE:BS4 Dropdown Select jQuery Plugin v1.0.0 (https://library.mattmct.com)
 * Copyright 2018 by Matt McT Designs
 * Licensed under: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */
(function($) {
                
    $.fn.obeDropdownSelect = function( options ) {
        
        // Default Options
        let settings = $.extend({
            formMode :            true,
            parentSelector :      '.dropdown-select',
            optionSelector :      '.dropdown-select-option',
            cloneTargetSelector : '.dropdown-select-target',
            dataAttributeString : 'option-value',
            hiddenInputSelector : 'input[type=hidden]',
            customEventString :   'dropdown.select.selected'
        }, options );

        return this.each(function(i, element) {
            
            let el = element;

            el.init = function() {
                
                $(this).on( 'click', settings.optionSelector, function() {
                    
                    // clone the selection and replace the original dropdown select content with the selected markup

                    let parent;
                    let err = false;
                    
                    if ($(this).parents(settings.parentSelector)) {
                        parent = $(this).parents(settings.parentSelector);
                    } else {
                        console.log('ERROR: The matching parent selector: ' + settings.parentSelector + ' was not found.');
                        err = true;
                    }
                    
                    let content = $(this).clone(true, true);
                    
                    if (parent.find(settings.cloneTargetSelector)) {
                        parent.find(settings.cloneTargetSelector).html(content);
                        // trigger a custom event to hook onto the clone of a selected option
                        $(content).trigger(settings.customEventString);
                    } else {
                        console.log('ERROR: The matching clone target selector: ' + settings.cloneTargetSelector + ' was not found.');
                        err = true;
                    }

                    // get the faux select option value and apply value to hidden input + trigger a change event
                    let value;
                    if ($(this).data(settings.dataAttributeString)) {
                        value = $(this).data(settings.dataAttributeString);
                    } else {
                        console.log('ERROR: The data value attribute selector: ' + settings.dataAttributeString + ' was not found.');
                        err = true;
                    }
                   
                    let input;
                    if (settings.formMode === true) {
                        if (parent.parent().find(settings.hiddenInputSelector)) {
                            input = parent.parent().find(settings.hiddenInputSelector);
                            // set the value of the input for the dropdown select to be used in forms
                            input.val(value);
                            // trigger a change event for the input
                            input.trigger('change');
                        } else {
                            console.log('ERROR: The input selector: ' + settings.hiddenInputSelector + ' was not found.');
                            err = true;
                        }
                    }

                    if (err) {
                        console.log('FINAL ERROR: A dropdown select element interaction failed. Please check that your markup selectors match your javascript options or use the .dropdown-select defaults.');
                    }
                    
                });

            };

            el.init();

        });
        
    };

    $('.dropdown-select').obeDropdownSelect();

})(jQuery);