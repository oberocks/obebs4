/*!
 * obebs4-dataTables.js
 */

jQuery(document).ready(function($) {

    // DataTables global settings (effects all instances sitewide)
    $.extend( true, $.fn.dataTable.defaults, {
        
        "dom": '<"row justify-content-center"<"col-sm-4 text-center text-sm-left"f>>rt<"row"<"col-sm-6"l><"col-sm-6"p>><"row justify-content-center"<"col-sm-6 text-center font-italic text-muted"i>>',
        language: {
            search: "_INPUT_",
            lengthMenu: '<select class="form-control w-100">'+
                '<option value="5">View 5 Table Rows</option>'+
                '<option value="10">View 10 Table Rows</option>'+
                '<option value="15">View 15 Table Rows</option>'+
                '<option value="25">View 25 Table Rows</option>'+
                '<option value="50">View 50 Table Rows</option>'+
                '</select>',
            paginate: {
                "next": "<i class='fa fa-chevron-right'></i>", 
                "previous": "<i class='fa fa-chevron-left'></i>"
            },
            searchPlaceholder: "Search Colors"
        }

    });
    // DEV NOTE: the line/option below is causing the page to reload when switching back to a view with less than "All" table rows on iOS devices
    //'<option value="-1">View All Table Rows</option>'+

});