/*!
 * OBE:BS4 Calendar Datepicker jQuery Plugin v1.0.1 (https://library.mattmct.com)
 * Copyright 2018 by Matt McT Designs
 * Licensed under: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */
(function($) {
                
    $.fn.obeDatepicker = function( options ) {
        
        // Default Options
        var settings = $.extend({
            outputSelector : null,
            outputType : 'input', // choices are 'input' or 'text'
            outputFormat : 'MM/DD/YYYY', // choices are 'MM/DD/YYYY', 'MM-DD-YYYY', 'DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', or 'YYYY-MM-DD'
            compactMode : false,
            days : {
                letters: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                twoChars: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                threeChars: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                word: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            months : {
                threeChars: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                word : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                totalDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            },
            baseColors :    'bg-light text-dark',
            cellSpacing :   'p-2',
            selectedBg :    'bg-primary text-white',
            standardBg :    'text-dark',
            borders :       'border-dark',
            prevNextBg :    'bg-secondary text-light',
            theadClass :    'thead-dark',
            theadBg :       'text-light',
            leftArrow :     '‹',
            rightArrow :    '›',
            weekdayParentClasses :  'd-flex justify-content-center align-items-center text-center pt-4',
            weekdayMinusClasses :   'flex-fill text-right lead font-weight-bold pr-4 opacity-30',
            weekdayTextClasses :    'lead font-weight-bold p-0 m-0',
            weekdayPlusClasses :    'flex-fill text-left lead font-weight-bold pl-4 opacity-30',
            dayParentClasses :      'd-flex justify-content-center align-items-center text-center pb-2',
            dayMinusClasses :       'flex-fill display-1 pr-4 opacity-30',
            dayTextClasses :        'p-0 m-0 display-1 font-secondary',
            dayPlusClasses :        'flex-fill display-1 pl-4 opacity-30',
            monthParentClasses :    'd-flex justify-content-center align-items-center text-center',
            monthMinusClasses :     'flex-fill text-right lead font-weight-bold pr-4 opacity-30',
            monthTextClasses :      'lead font-weight-bold p-0 m-0',
            monthPlusClasses :      'flex-fill text-left lead font-weight-bold pl-4 opacity-30',
            yearParentClasses :     'd-flex justify-content-center align-items-center text-center pb-4',
            yearMinusClasses :      'flex-fill text-right lead font-weight-bold pr-4 opacity-30',
            yearTextClasses :       'lead font-weight-bold p-0 m-0',
            yearPlusClasses :       'flex-fill text-left lead font-weight-bold pl-4 opacity-30'
        }, options );

        // Utility Functions
        var isLeapYear = function (yearDigits) {
            return (yearDigits % 100 === 0) ? (yearDigits % 400 === 0) : (yearDigits % 4 === 0);
        }

        var addOptLeadZero = function (n) {
            return (n < 10) ? ("0" + n) : n;
        }
        const displayCalData = function (theDay, theMonth, theYear) {
            let tempDate = new Date(theYear, theMonth, theDay);
            //console.log('tempDate: ' + tempDate);
            let outputDay = addOptLeadZero(tempDate.getDate());
            let outputMonth = addOptLeadZero(Number(tempDate.getMonth()) + 1);
            let outputYear = tempDate.getFullYear();
            let output;
            if (settings.outputFormat === 'MM/DD/YYYY') {
                output = outputMonth + '/' + outputDay  + '/' + outputYear;
            } else if (settings.outputFormat === 'MM-DD-YYYY') {
                output = outputMonth + '-' + outputDay  + '-' + outputYear;
            } else if (settings.outputFormat === 'DD/MM/YYYY') {
                output = outputDay + '/' + outputMonth + '/' + outputYear;
            } else if (settings.outputFormat === 'DD-MM-YYYY') {
                output = outputDay + '-' + outputMonth + '-' + outputYear;
            } else if (settings.outputFormat === 'YYYY/MM/DD') {
                output = outputYear + '/' + outputMonth + '/' + outputDay;
            } else if (settings.outputFormat === 'YYYY-MM-DD') {
                output = outputYear + '-' + outputMonth + '-' + outputDay;
            }
            //console.log(output);
            return output;
        }
        const getDateParts = function (dateString) {
            let output = {};
            if (settings.outputFormat === 'MM/DD/YYYY') {
                let dateArr = dateString.split('/');
                output['month'] = dateArr[0];
                output['day'] = dateArr[1];
                output['year'] = dateArr[2];
            } else if (settings.outputFormat === 'MM-DD-YYYY') {
                let dateArr = dateString.split('-');
                output['month'] = dateArr[0];
                output['day'] = dateArr[1];
                output['year'] = dateArr[2];
            } else if (settings.outputFormat === 'DD/MM/YYYY') {
                let dateArr = dateString.split('/');
                output['month'] = dateArr[1];
                output['day'] = dateArr[0];
                output['year'] = dateArr[2];
            } else if (settings.outputFormat === 'DD-MM-YYYY') {
                let dateArr = dateString.split('-');
                output['month'] = dateArr[1];
                output['day'] = dateArr[0];
                output['year'] = dateArr[2];
            } else if (settings.outputFormat === 'YYYY/MM/DD') {
                let dateArr = dateString.split('/');
                output['month'] = dateArr[1];
                output['day'] = dateArr[2];
                output['year'] = dateArr[0];
            } else if (settings.outputFormat === 'YYYY-MM-DD') {
                let dateArr = dateString.split('-');
                output['month'] = dateArr[1];
                output['day'] = dateArr[2];
                output['year'] = dateArr[0];
            }
            return output;
        }


        return this.each(function(i, element) {
            
            var el = element;

            var finalWrapper = document.createElement('div');
                finalWrapper.className = settings.baseColors;
                finalWrapper.id = 'obe-calendar-datepicker-' + Math.floor(Math.random() * 100000) + 1;
            
            el.renderCalendar = function(year, monthIndex, day) {
                
                // Set Vars for Default Calendar Content
                var today;

                // if no values are defined
                if (year === undefined || monthIndex === undefined || day === undefined)
                {
                    // get (if any) current value from the outputSelector
                    var currentOutputSelectorVal = $(settings.outputSelector).val();

                    // if the outputSelector has a value already
                    if (currentOutputSelectorVal.length > 0)
                    {
                        // get the date parts based off the settings format
                        var myDateObj = getDateParts(currentOutputSelectorVal);
                        // extract vars from the returned object above
                        var ze_month = Number(myDateObj['month']) - 1;
                        var ze_year = myDateObj['year'];
                        var ze_day = myDateObj['day'];
                        // use the extracted values to create today's date
                        today = new Date(ze_year, ze_month, ze_day);
                    }
                    // else create a new raw date for today
                    else
                    {
                        today = new Date();
                    }
                }
                // Else use the defined values
                else
                {
                    today = new Date(year, monthIndex, day);
                }

                var dayIndex = today.getDay();
                var dd = today.getDate();
                var monthIndex = today.getMonth();
                var yyyy = today.getFullYear();
                var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                var firstDayIndex = firstDay.getDay();
                var lastDayIndex = lastDay.getDay();

                
                    
                
                if (settings.outputSelector != null && settings.outputType === 'input') {
                    $(settings.outputSelector).val( displayCalData(dd, monthIndex, yyyy) );
                } else if (settings.outputSelector != null && settings.outputType === 'text') {
                    $(settings.outputSelector).text( displayCalData(dd, monthIndex, yyyy) );
                }
                
                    

                // adjust the total days for February if yyyy is currently a leap year
                if (isLeapYear(yyyy)) {
                    settings.months.totalDays[1] = 29;
                } else {
                    settings.months.totalDays[1] = 28;
                }

                // set the total days of the previous month to use for calendar day cells for the prior month
                var prevTotalDays;
                if (monthIndex === 0) {
                    prevTotalDays = 31; // month is January so use December's total days
                } else {
                    prevTotalDays = settings.months.totalDays[monthIndex - 1];
                }

                // create array to hold all of the days to display in the calendar grid
                var daysArray = [];
                // create array to hold all of the class strings for each day in the daysArray
                var classesArray = [];
                // create array to hold all of the month indexes for each day in the daysArray
                var monthIndexesArray = [];
                // create array to hold all of the years for each day in the daysArray
                var yearsArray = [];
                // create array to hold a string defining the type of each day in the daysArray
                var cellTypeArray = [];

                // get the last days of the previous month and add them to the array
                for (var i = 0;  i < firstDayIndex; i++) {
                    daysArray.push(prevTotalDays - i);
                    var string = settings.cellSpacing + ' ' + settings.borders + ' ' + settings.prevNextBg;
                    classesArray.push(string);
                    if (monthIndex === 0) {
                        monthIndexesArray.push(11);
                        yearsArray.push(yyyy - 1);
                    } else {
                        monthIndexesArray.push(monthIndex - 1);
                        yearsArray.push(yyyy);
                    }
                    cellTypeArray.push('outofmonth');
                }
                // reverse the order of the array to prepare for current days of the month
                daysArray.reverse();

                // add a date value to the array for each day in the current month
                for (var i = 1;  i <= settings.months.totalDays[monthIndex]; i++) {
                    daysArray.push(i);
                    if (i === dd) {
                        var string = settings.cellSpacing + ' ' + settings.borders + ' ' + settings.selectedBg + ' js-cal-selected-day';
                        classesArray.push(string);
                    } else {
                        var string = settings.cellSpacing + ' ' + settings.borders + ' ' + settings.standardBg;
                        classesArray.push(string);
                    }
                    monthIndexesArray.push(monthIndex);
                    yearsArray.push(yyyy);
                    cellTypeArray.push('inmonth');
                }

                // add a date value to the array for each day after the last day of the current month
                var nextMonthCount = 1;
                for (var i = lastDayIndex;  i < 6; i++) {
                    daysArray.push(nextMonthCount);
                    var string = settings.cellSpacing + ' ' + settings.borders + ' ' + settings.prevNextBg;
                    classesArray.push(string);
                    nextMonthCount++;
                    if (monthIndex === 11) {
                        monthIndexesArray.push(0);
                        yearsArray.push(yyyy + 1);
                    } else {
                        monthIndexesArray.push(monthIndex + 1);
                        yearsArray.push(yyyy);
                    }
                    cellTypeArray.push('outofmonth');
                }

                // set variable for number of days in a week
                var arrSize = 7;

                // create arrays of arrays per the value of the number of days in a week
                var daysPerWeekArrays = new Array(Math.ceil(daysArray.length / arrSize)).fill("").map(function() { return this.splice(0, arrSize) }, daysArray.slice());

                var classesPerWeekArrays = new Array(Math.ceil(classesArray.length / arrSize)).fill("").map(function() { return this.splice(0, arrSize) }, classesArray.slice());

                var monthsPerWeekArrays = new Array(Math.ceil(monthIndexesArray.length / arrSize)).fill("").map(function() { return this.splice(0, arrSize) }, monthIndexesArray.slice());

                var yearsPerWeekArrays = new Array(Math.ceil(yearsArray.length / arrSize)).fill("").map(function() { return this.splice(0, arrSize) }, yearsArray.slice());

                var cellTypePerWeekArrays = new Array(Math.ceil(cellTypeArray.length / arrSize)).fill("").map(function() { return this.splice(0, arrSize) }, cellTypeArray.slice());

                var dayOfWeekPerWeekArrays = [
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6]
                ];

                // create the calendar table
                var table = document.createElement('table');
                table.className = 'table table-bordered w-100 mb-0';
                var thead = document.createElement('thead');
                thead.className = settings.theadClass;
                var thead_row = document.createElement('tr');

                // loop
                for (var i = 0;  i < settings.days.letters.length; i++) {
                    var th = document.createElement('th');
                    var string = settings.cellSpacing + ' ' + settings.borders + ' ' + settings.theadBg;
                    th.className = string;
                    var text = document.createTextNode(settings.days.letters[i]);
                    th.appendChild(text);
                    thead_row.appendChild(th);
                }

                thead.appendChild(thead_row);
                table.appendChild(thead);

                var tbody = document.createElement('tbody');

                // loop
                for (var i = 0;  i < daysPerWeekArrays.length; i++) {
                    
                    // DOM vars
                    var calendar_row = document.createElement('tr');

                    for (var j = 0;  j < daysPerWeekArrays[i].length; j++) {
                        
                        // create a cell for each day of week
                        var calendar_cell = document.createElement('td');
                            calendar_cell.className = classesPerWeekArrays[i][j];
                            calendar_cell.dataset.year = yearsPerWeekArrays[i][j];
                            calendar_cell.dataset.month = monthsPerWeekArrays[i][j];
                            calendar_cell.dataset.day = daysPerWeekArrays[i][j];
                            calendar_cell.dataset.weekday = dayOfWeekPerWeekArrays[i][j];
                            calendar_cell.dataset.type = cellTypePerWeekArrays[i][j];

                        // add double click to zoom interaction prevention to the table cell
                        calendar_cell.style.touchAction = 'manipulation';
                            
                        calendar_cell.onclick = function(){
                            
                            var parent = document.getElementById(finalWrapper.id);
                            
                            // var content = this.textContent.trim();
                            var year = this.dataset.year;
                            var month = this.dataset.month;
                            var day = this.dataset.day;
                            var weekday = this.dataset.weekday;
                            
                            var selectedCell = $(parent).find('.js-cal-selected-day');

                            if (selectedCell.data('type') === 'inmonth') {
                                selectedCell.removeClass(settings.selectedBg).addClass(settings.standardBg).removeClass('js-cal-selected-day');
                            } else if (selectedCell.data('type') === 'outofmonth') {
                                selectedCell.removeClass(settings.selectedBg).addClass(settings.prevNextBg).removeClass('js-cal-selected-day');
                            }

                            if ($(this).data('type') === 'inmonth') {
                                $(this).removeClass(settings.standardBg).addClass(' js-cal-selected-day ' + settings.selectedBg);
                            } else if ($(this).data('type') === 'outofmonth') {
                                $(this).removeClass(settings.prevNextBg).addClass(' js-cal-selected-day ' + settings.selectedBg);
                            }
                            
                            parent.dataset.day = day;
                            parent.dataset.month = month;
                            parent.dataset.year = year;
                            parent.dataset.weekday = weekday;

                            $(parent).find('.cal-day-display').text(day);
                            $(parent).find('.cal-year-display').text(year);
                            $(parent).find('.cal-month-display').text(settings.months.word[month].toUpperCase());
                            $(parent).find('.cal-weekday-display').text(settings.days.word[weekday].toUpperCase());

                            //displayCalData(day, month, year);
                            if (settings.outputSelector != null && settings.outputType === 'input') {
                                $(settings.outputSelector).val( displayCalData(day, month, year) );
                            } else if (settings.outputSelector != null && settings.outputType === 'text') {     
                                $(settings.outputSelector).text( displayCalData(day, month, year) );
                            }

                        };

                        var text = document.createTextNode(daysPerWeekArrays[i][j]);
                        
                        // attach data to grid
                        calendar_cell.appendChild(text);
                        calendar_row.appendChild(calendar_cell);

                    }

                    tbody.appendChild(calendar_row);
                    
                }

                table.appendChild(tbody);

                

                // Weekday UI Container
                var dayOfWeek_UI = document.createElement('div');
                dayOfWeek_UI.className = settings.weekdayParentClasses;
                
                // Weekday Minus Trigger
                var weekdayMinus = document.createElement('div');
                weekdayMinus.className = settings.weekdayMinusClasses;
                var weekdayMinus_text = document.createTextNode(settings.leftArrow);

                // add double click to zoom interaction prevention to the Weekday Minus Trigger
                weekdayMinus.style.touchAction = 'manipulation';

                weekdayMinus.onclick = function(){
                    //alert('weekdayMinus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = parent.dataset.month;
                    var day = Number(parent.dataset.day) - 1;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                weekdayMinus.appendChild(weekdayMinus_text);
                dayOfWeek_UI.appendChild(weekdayMinus);
                
                // Weekday Display Text
                var dayOfWeekDisplay = document.createElement('div');
                dayOfWeekDisplay.className = settings.weekdayTextClasses;
                dayOfWeekDisplay.className += ' cal-weekday-display';
                var dayOfWeek_text = document.createTextNode(settings.days.word[dayIndex].toUpperCase());
                dayOfWeekDisplay.appendChild(dayOfWeek_text);
                dayOfWeek_UI.appendChild(dayOfWeekDisplay);
                
                // Weekday Plus Trigger
                var weekdayPlus = document.createElement('div');
                weekdayPlus.className = settings.weekdayPlusClasses;
                var weekdayPlus_text = document.createTextNode(settings.rightArrow);

                // add double click to zoom interaction prevention to the Weekday Plus Trigger
                weekdayPlus.style.touchAction = 'manipulation';

                weekdayPlus.onclick = function(){
                    //alert('weekdayPlus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = parent.dataset.month;
                    var day = Number(parent.dataset.day) + 1;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                weekdayPlus.appendChild(weekdayPlus_text);
                dayOfWeek_UI.appendChild(weekdayPlus);


                
                // Day UI Container
                var calDay_UI = document.createElement('div');
                calDay_UI.className = settings.dayParentClasses;
                
                // Day Minus Trigger
                var dayMinus = document.createElement('div');
                dayMinus.className = settings.dayMinusClasses;
                var dayMinus_text = document.createTextNode(settings.leftArrow);

                // add double click to zoom interaction prevention to the Day Minus Trigger
                dayMinus.style.touchAction = 'manipulation';

                dayMinus.onclick = function(){
                    //alert('dayMinus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = parent.dataset.month;
                    var day = Number(parent.dataset.day) - 1;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                dayMinus.appendChild(dayMinus_text);
                calDay_UI.appendChild(dayMinus);
                
                // Day Display Text
                var dayDisplay = document.createElement('div');
                dayDisplay.className = settings.dayTextClasses;
                dayDisplay.className += ' cal-day-display';
                var day_text = document.createTextNode(dd);
                dayDisplay.appendChild(day_text);
                calDay_UI.appendChild(dayDisplay);
                
                // Day Plus Trigger
                var dayPlus = document.createElement('div');
                dayPlus.className = settings.dayPlusClasses;
                var dayPlus_text = document.createTextNode(settings.rightArrow);

                // add double click to zoom interaction prevention to the Day Plus Trigger
                dayPlus.style.touchAction = 'manipulation';

                dayPlus.onclick = function(){
                    //alert('dayPlus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = parent.dataset.month;
                    var day = Number(parent.dataset.day) + 1;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                dayPlus.appendChild(dayPlus_text);
                calDay_UI.appendChild(dayPlus);


                
                // Month UI Container
                var calMonth_UI = document.createElement('div');
                calMonth_UI.className = settings.monthParentClasses;
                
                // Month Minus Trigger
                var monthMinus = document.createElement('div');
                monthMinus.className = settings.monthMinusClasses;
                var monthMinus_text = document.createTextNode(settings.leftArrow);

                // add double click to zoom interaction prevention to the Month Minus Trigger
                monthMinus.style.touchAction = 'manipulation';

                monthMinus.onclick = function(){
                    //alert('monthMinus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = Number(parent.dataset.month) - 1;
                    var day = parent.dataset.day;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                monthMinus.appendChild(monthMinus_text);
                calMonth_UI.appendChild(monthMinus);
                
                // Month Display Text
                var monthDisplay = document.createElement('div');
                monthDisplay.className = settings.monthTextClasses;
                monthDisplay.className += ' cal-month-display';
                var month_text = document.createTextNode(settings.months.word[monthIndex].toUpperCase());
                monthDisplay.appendChild(month_text);
                calMonth_UI.appendChild(monthDisplay);
                
                // Month Plus Trigger
                var monthPlus = document.createElement('div');
                monthPlus.className = settings.monthPlusClasses;
                var monthPlus_text = document.createTextNode(settings.rightArrow);

                // add double click to zoom interaction prevention to the Month Plus Trigger
                monthPlus.style.touchAction = 'manipulation';

                monthPlus.onclick = function(){
                    //alert('monthPlus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = parent.dataset.year;
                    var month = Number(parent.dataset.month) + 1;
                    var day = parent.dataset.day;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                monthPlus.appendChild(monthPlus_text);
                calMonth_UI.appendChild(monthPlus);


                
                // Year UI Container
                var calYear_UI = document.createElement('div');
                calYear_UI.className = settings.yearParentClasses;
                
                // Year Minus Trigger
                var yearMinus = document.createElement('div');
                yearMinus.className = settings.yearMinusClasses;
                var yearMinus_text = document.createTextNode(settings.leftArrow);

                // add double click to zoom interaction prevention to the Year Minus Trigger
                yearMinus.style.touchAction = 'manipulation';

                yearMinus.onclick = function(){
                    //alert('yearMinus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = Number(parent.dataset.year) - 1;
                    var month = parent.dataset.month;
                    var day = parent.dataset.day;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                yearMinus.appendChild(yearMinus_text);
                calYear_UI.appendChild(yearMinus);
                
                // Year Display Text
                var yearDisplay = document.createElement('div');
                yearDisplay.className = settings.yearTextClasses;
                yearDisplay.className += ' cal-year-display';
                var year_text = document.createTextNode(yyyy);
                yearDisplay.appendChild(year_text);
                calYear_UI.appendChild(yearDisplay);
                
                // Year Plus Trigger
                var yearPlus = document.createElement('div');
                yearPlus.className = settings.yearPlusClasses;
                var yearPlus_text = document.createTextNode(settings.rightArrow);

                // add double click to zoom interaction prevention to the Year Plus Trigger
                yearPlus.style.touchAction = 'manipulation';

                yearPlus.onclick = function(){
                    //alert('yearPlus was clicked');
                    var parent = document.getElementById(finalWrapper.id);
                    parent.innerHTML = '';
                    var year = Number(parent.dataset.year) + 1;
                    var month = parent.dataset.month;
                    var day = parent.dataset.day;
                    el.renderCalendar(year, month, day);
                    displayCalData(day, month, year);
                };
                yearPlus.appendChild(yearPlus_text);
                calYear_UI.appendChild(yearPlus);


                
                finalWrapper.appendChild(dayOfWeek_UI);
                finalWrapper.appendChild(calDay_UI);
                finalWrapper.appendChild(calMonth_UI);
                finalWrapper.appendChild(calYear_UI);
                
                if (settings.compactMode === false) {
                    finalWrapper.appendChild(table);
                }
                
                finalWrapper.dataset.year = yyyy;
                finalWrapper.dataset.month = monthIndex;
                finalWrapper.dataset.day = dd;
                finalWrapper.dataset.weekday = dayIndex;

                
                
                el.appendChild(finalWrapper);

            };

            el.renderCalendar();

            // add functionality that re-renders the calendar to match any manual changes to the input value by a user
            if (settings.outputSelector != null && settings.outputType === 'input') {
                let target = document.querySelector(settings.outputSelector);
                const update_mdy_calendar = function(str, char) {
                    let array = str.split(char);
                    let d = array[1];
                    let m = Number(array[0]) - 1;
                    let y = array[2];
                    let canvas = el.children;
                    canvas[0].innerHTML = ''
                    el.renderCalendar(y, m, d);
                };
                const update_dmy_calendar = function(str, char) {
                    let array = str.split(char);
                    let d = array[0];
                    let m = Number(array[1]) - 1;
                    let y = array[2];
                    let canvas = el.children;
                    canvas[0].innerHTML = ''
                    el.renderCalendar(y, m, d);
                };
                const update_ymd_calendar = function(str, char) {
                    let array = str.split(char);
                    let d = array[2];
                    let m = Number(array[1]) - 1;
                    let y = array[0];
                    let canvas = el.children;
                    canvas[0].innerHTML = ''
                    el.renderCalendar(y, m, d);
                };
                target.onchange = function () {
                    //console.log('changed');
                    let value = target.value;
                    if (settings.outputFormat === 'MM/DD/YYYY') {
                        update_mdy_calendar(value, '/');
                    } else if (settings.outputFormat === 'MM-DD-YYYY') {
                        update_mdy_calendar(value, '-');
                    } else if (settings.outputFormat === 'DD/MM/YYYY') {
                        update_dmy_calendar(value, '/');
                    } else if (settings.outputFormat === 'DD-MM-YYYY') {
                        update_dmy_calendar(value, '-');
                    } else if (settings.outputFormat === 'YYYY/MM/DD') {
                        update_ymd_calendar(value, '/');
                    } else if (settings.outputFormat === 'YYYY-MM-DD') {
                        update_ymd_calendar(value, '-');
                    }
                };
            }

        });
        
    };

})(jQuery);