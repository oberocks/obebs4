/*!
 * 
 * OBE:BS4 Library Design System v1.0.0 (https://library.mattmct.com)
 * The OBE:BS4 Design System is a self-reflexive reference library design system based on the most popular web framework in the world, Bootstrap! The OBE:BS4 system was built specifically to give all project stakeholders full visual, technical, and tactile access to every color, font, element, component and layout for any web project.
 * Copyright 2018 by Matt McT Designs
 * Licensed under: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 *
 */

$(function() {

    // dropdown selects javascript
    $('.dropdown-select').on( 'click', '.dropdown-select-option', function() {
        let value = $(this).data('option-value');
        let parent = $(this).parents('.dropdown-select');
        let content = $(this).clone();
        parent.siblings('input[type=hidden]').val(value).trigger('change');
        parent.find('.dropdown-select-target').html(content);
    });
    
}); // end document ready