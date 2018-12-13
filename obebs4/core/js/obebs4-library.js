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

    // HIJACK browser so it doesn't jump via url hash to the element id
    // setTimeout is used to allow time for the browser to collapse any dynamicly collapsed prism.js content to be collapsed. With this delay, the navigaiton using hashes to scroll to sections aligns correctly. Without this delay, the browser shows the position before the collapsing.
    setTimeout(function(){
        if(window.location.hash) {
            var hash = window.location.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 500, 'swing');
        }
    }, 500);
    
    
    // to scroll to a section from navigation click
    $(document).on('click', 'a[href^="#"]', function (event) {
        
        if ($(this).parents('.modal').hasClass('show')){
            $(this).parents('.modal').modal('hide');
        }

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 500, 'swing');

    });
    
    // Change cursor when hovering over an element with a hidden prism.js code block
    $('.js-prism').hover(function() {
        $(this).css('cursor','help');
    });

    // Prevent link action whenever a link is a child of a .js-prism element
    $('.js-prism a').on('click', function(e) {
        e.preventDefault();
    });

    // Script to generate and show prism.js code block generated from a clicked .js-prism element
    $('.js-prism').on('click', function() {
    
        if ($(this).hasClass('prism-visible')) {
        
            // If the element has a .prism-visible class
            // Hide the code block and adjust classes
            $(this).removeClass('prism-visible').addClass('prism-hidden');
            $(this).next('.code-toolbar').removeClass('show').addClass('collapse');
        
        } else if ($(this).hasClass('prism-hidden')) {
        
            // If the element has a .prism-hidden class
            // Reveal the code block and adjust classes
            $(this).removeClass('prism-hidden').addClass('prism-visible');
            $(this).next('.code-toolbar').addClass('show');
        
        } else {
    
            // No prism.js code block was generated yet, so generate it
        
            // Get the html to format for prism.js
            var content = $(this).html();
            content.replace(/</gi, '&lt;');
            content.replace(/>/gi, '&gt;');
    
            // Create DOM elements and add in formatted content
            var pre = document.createElement('pre');
            var code = document.createElement('code');
            var textNode = document.createTextNode(content);
    
            // Set any classes
            code.className = 'language-html'; // prism.js class
            pre.className = 'line-numbers';
    
            // Nest elements
            code.appendChild(textNode);
            pre.appendChild(code);
    
            // Insert nested elements after the clicked element
            $(pre).insertAfter($(this));
    
            // Trigger prism.js to run
            Prism.highlightAll();
    
            // Reveal final code block to user
            //pre.className += " show";
    
            // Add prism-visible class to clicked element
            $(this).addClass('prism-visible');
    
        } // end if/else
    
    }); // end on click

    // Script to toggle prism.js code block for FontAwesome 5 code block examples
    $('.js-prism-fa').on('click', function() {
        
        if ($(this).hasClass('prism-visible')) {
        
            // If the element has a .prism-visible class
            // Hide the code block and adjust classes
            $(this).removeClass('prism-visible').addClass('prism-hidden');
            $(this).next('.code-toolbar').removeClass('show').addClass('collapse');
        
        } else if ($(this).hasClass('prism-hidden')) {
        
            // If the element has a .prism-hidden class
            // Reveal the code block and adjust classes
            $(this).removeClass('prism-hidden').addClass('prism-visible');
            $(this).next('.code-toolbar').addClass('show');
        
        }
        
    }); // end on click

    // Script to toggle prism.js code block for FontAwesome 5 code block examples
    $('.js-prism-calendar').on('click', function() {
        
        if ($(this).hasClass('prism-visible')) {
        
            // If the element has a .prism-visible class
            // Hide the code block and adjust classes
            $(this).removeClass('prism-visible').addClass('prism-hidden');
            $(this).siblings('.code-toolbar').removeClass('show').addClass('collapse');
        
        } else if ($(this).hasClass('prism-hidden')) {
        
            // If the element has a .prism-hidden class
            // Reveal the code block and adjust classes
            $(this).removeClass('prism-hidden').addClass('prism-visible');
            $(this).siblings('.code-toolbar').addClass('show');
        
        }
        
    }); // end on click




    // Scripts to use with the right pinned navigation modal accordian component
    // -----------
    // When the modal nav accordian changes
    $('#nav-accord').on('shown.bs.collapse', function () {
        // update the height of the modal nav element
        $('#off-canvas-nav-right-modal').modal('handleUpdate');
    });
    // -----------
    // Script to toggle the +/- symbol when using the modal nav accordian
    $('#nav-accord .js-nav-handle').on('click', function () {
        
        // create a var to store the clicked item's symbol
        var currentSymbol = $(this).find('.js-nav-symbol').text().trim();
        // create a var for the parent of the accordian 
        var parent = $(this).parents('#nav-accord');

        // check to see if this accordian nav item is already expanded
        if (currentSymbol === '-') {
            
            // if so, then make the symbol + as the accordian closes
            $(this).find('.js-nav-symbol').text('+');

        } else {
            
            // return all accordian nav item symbols to the + symbol
            parent.find('.js-nav-symbol').each(function( index ) {
                $(this).text('+');
            });
            // change the just clicked accordian nav item to the - symbol
            $(this).find('.js-nav-symbol').text('-');

        }

    });









    // ------------------------
    // 
    // START NAV SEARCH SCRIPTS
    // 
    // 


    // set global array to hold the scrapped navigation options for the search functionality
    var navSearchList = [];
    
    // upon opening of the search modal, collect the nav links into the global array
    $('#search-modal').on('shown.bs.modal', function (e) {
        
        // if the global array has NOT already been filled with data
        if (navSearchList.length <= 0) {
        
            $('#nav-accord a').each(function( index ) {
                var tempObj = {};
                tempObj.href = $(this).attr('href');
                tempObj.text = $(this).text().toLowerCase().trim();
                navSearchList.push(tempObj);
            });

            //console.log(navSearchList);

        }

    });

    // utility function to create the inserted DOM elements for a user's search query results
    var createSearchItem = function(link, copy, outputElement){
        
        var anchor = document.createElement('a');
            anchor.href = link;
            anchor.className = 'd-block text-chartreuse text-capitalize mb-2';
        var anchor_text = document.createTextNode(copy);

        anchor.appendChild(anchor_text);
        outputElement.appendChild(anchor);

    };
    
    $('#search-modal-input').on( "keyup", function(e) {

        // if the user pressed enter
        if(e.keyCode == 13) {
            
            // prevent submission, blur the input and return false
            e.preventDefault();
            $(this).blur();
            return false;

        // else process the search query as needed
        } else {
            
            // get the user value
            var query = $(this).val().toLowerCase();
            
            // get the target element for any dynamically generated markup
            var outputTarget = document.getElementById('search-modal-results');

            // clear the displayed information on each new keyup
            outputTarget.innerHTML = '';

            // conditionally run the search and display results
            // only if the query has at least 1 char
            if (query.length >= 1) {
                // loop through the global array to check for matches
                for (var i = 0; i < navSearchList.length; i++) {
                    // if the user query string matches any of the links or link text
                    if (navSearchList[i]['href'].indexOf(query) >= 0 || navSearchList[i]['text'].indexOf(query) >= 0) {

                        createSearchItem(navSearchList[i]['href'], navSearchList[i]['text'], outputTarget);

                    }
                }
            }


            // loop through the output elements and add bold tags/classes to each occurance of the user query
            var searchLinks = outputTarget.getElementsByTagName('a');
            for (var j = 0; j < searchLinks.length; j++) {
                var tempStr = searchLinks[j].innerHTML;
                var markedUpStr = tempStr.split(query).join('<strong class="text-chartreuse-200">' + query + '</strong>');
                searchLinks[j].innerHTML = markedUpStr;
            }

            // update the modal height for the new content length
            $('#search-modal').modal('handleUpdate');

        }

    });

    // 
    // 
    // END NAV SEARCH SCRIPTS
    // 
    // ------------------------











    
    




    
}); // end document ready