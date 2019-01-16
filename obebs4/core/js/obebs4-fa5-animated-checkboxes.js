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