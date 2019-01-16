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