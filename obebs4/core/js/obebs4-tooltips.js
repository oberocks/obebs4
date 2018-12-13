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
    
    // Initialize Bootstrap Tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Inject OBEB4 color class into tooltip injected elements
    $('[data-toggle="tooltip"]').on('inserted.bs.tooltip', function () {
        
        var classname = '';
        if (typeof $(this).data('obe-color-class') !== 'undefined') {
            classname = $(this).data('obe-color-class').trim();
        }
        
        $('.tooltip').addClass(classname);
        //console.log('inserted.bs.tooltip was fired and ' + classname + ' was added!');
        
    }).on('hidden.bs.tooltip', function () {
        
        var classname = '';
        if (typeof $(this).data('obe-color-class') !== 'undefined') {
            classname = $(this).data('obe-color-class').trim();
        }
        $('.tooltip').removeClass(classname);
        
    });
    
}); // end document ready