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
				
	// Initialize Bootstrap Popovers
    $('[data-toggle="popover"]').popover();
    
    // Inject OBEB4 color class into popover injected elements
    $('[data-toggle="popover"]').on('inserted.bs.popover', function () {
        
        var headBg = '';
        if (typeof $(this).data('popover-header-bg') !== 'undefined') {
            headBg = $(this).data('popover-header-bg').trim();
        }

        var headTextCol = '';
        if (typeof $(this).data('popover-header-text') !== 'undefined') {
            headTextCol = $(this).data('popover-header-text').trim();
        }

        var bodyTextCol = '';
        if (typeof $(this).data('popover-body-text') !== 'undefined') {
            bodyTextCol = $(this).data('popover-body-text').trim();
        }
        
        $('.popover .popover-header').last().addClass(headBg);
        $('.popover .popover-header').last().addClass(headTextCol);
        $('.popover .popover-body').last().addClass(bodyTextCol);
        
    });
    
}); // end document ready