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

    // obe fontawesome 5 animated checkboxes javascript
    $('.obe-icon-checkbox').on('click', function () {
        var parent = $(this);
        var target = parent.find('svg');
        var input = parent.siblings('input[type=hidden]');
        if (target.hasClass('unchecked')) {
            target.removeClass('unchecked').addClass('checked');
            input.val('checked');
        } else {
            target.removeClass('checked').addClass('unchecked');
            input.val('unchecked');
        }
    });
    
}); // end document ready