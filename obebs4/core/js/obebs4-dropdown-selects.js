/*
$(function() {

    // dropdown selects javascript
    $('.dropdown-select').on( 'click', '.dropdown-select-option', function() {
        let value = $(this).data('option-value');
        let parent = $(this).parents('.dropdown-select');
        let content = $(this).clone(true, true);
        parent.siblings('input[type=hidden]').val(value).trigger('change');
        parent.find('.dropdown-select-target').html(content);
    });
    
}); // end document ready
*/