/*!
 * obebs4-popovers.js
 */

jQuery(document).ready(function($) {
				
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