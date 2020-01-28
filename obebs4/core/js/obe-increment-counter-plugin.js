// obe-increment-counter-plugin.js

var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {

    // Grab all obe increment components in the DOM
    let components = document.querySelectorAll('[data-obe-increment-component]');

    // utility function
    const sanitizeValue = function(val, preUnits, postUnits){
        let output = val.replace(preUnits, '').replace(postUnits, '').replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1').replace(/(?!^)-/g, '');
        return Number(output);
    };

    // utility function
    const addZeroes = function (num, decimals, seperatorsBool) {
        let output = num;
        if (decimals)
        {
            output = num.toFixed(decimals);
        }
        if (seperatorsBool)
        {
            let commas = output.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            output = commas;
        }
        return output;
    };

    // Loop through all component instances and add event listners to each
    for (var i = 0; i < components.length; i++)
    {
        // assign the current component to a var
        let component = components[i];

        // grab the elements needed for event listners and assign them to vars
        let upBtn = component.querySelector('[data-obe-increment-up]');
        let downBtn = component.querySelector('[data-obe-increment-down]');
        let input = component.querySelector('input');

        // disable double tap click to zoom functionality for mobile devices
        upBtn.style.touchAction = 'manipulation';
        downBtn.style.touchAction = 'manipulation';
        upBtn.querySelector('button').style.touchAction = 'manipulation';
        downBtn.querySelector('button').style.touchAction = 'manipulation';

        // collect, process and assign string values from component data attributes
        let min = input.dataset.min ? Number(input.dataset.min) : 0;
        let max = input.dataset.max ? Number(input.dataset.max) : 10;
        let increment = input.dataset.increment ? Number(input.dataset.increment) : 1;
        let leadingUnits = input.dataset.leadingUnits ? input.dataset.leadingUnits : null;
        let trailingUnits = input.dataset.trailingUnits ? input.dataset.trailingUnits : null;
        let decimalPlaces = input.dataset.decimalPlaces ? Number(input.dataset.decimalPlaces) : null;
        let seperators = input.dataset.useSeperators ? true : false;

        // set calculation vars according to collected values
        let decimals = decimalPlaces === null ? false : decimalPlaces;
        let leading = leadingUnits === null ? '' : leadingUnits;
        let trailing = trailingUnits === null ? '' : trailingUnits;

        // initialize vars to hold data through calculations for use in custom event details data values
        let eventData = {
            value: {
                initial: null,
                cleaned: null,
                number: null,
                final: null,
                min: min,
                max: max,
                increment: increment,
                leadingUnits: leadingUnits,
                trailingUnits: trailingUnits,
                decimalPlaces: decimalPlaces
            }
        };

        // add the event listner functinality to the component's increment up button
        upBtn.addEventListener("click", function(){

            // grab the current value and clean it
            var value = input.value;
            let cleanValue = sanitizeValue(value, leading, trailing);

            // init a var to hold for the final output value
            let output = cleanValue;

            // conditionally check the cleaned value against the min and max values
            if (cleanValue >= min && cleanValue < max)
            {
                output = Math.round((cleanValue + increment) * 1e12) / 1e12;
            }
            else if (cleanValue >= max)
            {
                output = max;
            }

            // double check the output for any calculations that may have pushed the output value over the max value
            if (output > max)
            {
                output = max;
            }

            // update the component input with the new value
            let finalStr = leading + addZeroes(output, decimals, seperators) + trailing;
            input.value = finalStr;

            // set event data for this interaction
            eventData.value.initial = value;
            eventData.value.cleaned = cleanValue;
            eventData.value.number = output;
            eventData.value.final = finalStr;

            this.dispatchEvent( new CustomEvent('increment.up.clicked', {
                bubbles: true,
                detail: eventData
            }));

        });

        // add the event listner functinality to the component's increment down button
        downBtn.addEventListener("click", function(){

            // grab the current value and clean it
            var value = input.value;
            let cleanValue = sanitizeValue(value, leading, trailingUnits);

            // init a var to hold for the final output value
            let output = cleanValue;

            // conditionally check the cleaned value against the min and max values
            if (cleanValue > min && cleanValue <= max)
            {
                output = Math.round((cleanValue - increment) * 1e12) / 1e12;
            }
            else if (cleanValue <= min)
            {
                output = min;
            }

            // double check the output for any calculations that may have pushed the output value under the min value
            if (output < min)
            {
                output = min;
            }

            // update the component input with the new value
            let finalStr = leading + addZeroes(output, decimals, seperators) + trailing;
            input.value = finalStr;

            // set event data for this interaction
            eventData.value.initial = value;
            eventData.value.cleaned = cleanValue;
            eventData.value.number = output;
            eventData.value.final = finalStr;

            this.dispatchEvent( new CustomEvent('increment.down.clicked', {
                bubbles: true,
                detail: eventData
            }));

        });

        // add the event listner functinality to the component's input to handle use cases where a user types in a value directly into the input element
        input.addEventListener("change", function(){

            // grab the current value and clean it
            var value = this.value;
            let cleanValue = sanitizeValue(value, leading, trailing);

            // init a var to hold for the final output value
            let output = cleanValue;
            
            // conditionally check the cleaned value against the min and max values
            if (cleanValue >= max)
            {
                output = Math.round((max) * 1e12) / 1e12;
            }
            else if (cleanValue <= min)
            {
                output = Math.round((min) * 1e12) / 1e12;
            }

            // update the component input with the new value
            let finalStr = leading + addZeroes(output, decimals, seperators) + trailing;
            this.value = finalStr;

            // set event data for this interaction
            eventData.value.initial = value;
            eventData.value.cleaned = cleanValue;
            eventData.value.number = output;
            eventData.value.final = finalStr;

            this.dispatchEvent( new CustomEvent('increment.input.changed', {
                bubbles: true,
                detail: eventData
            }));

        });

        let componentEventStr = 'after.counter.incremented';
        
        component.addEventListener('increment.up.clicked', function(e) {
            let data = e.detail;
            data.value.trigger = 'increment.up.clicked';
            this.dispatchEvent( new CustomEvent(componentEventStr, {
                bubbles: true,
                detail: data
            }));
        });

        component.addEventListener('increment.down.clicked', function(e) {
            let data = e.detail;
            data.value.trigger = 'increment.down.clicked';
            this.dispatchEvent( new CustomEvent(componentEventStr, {
                bubbles: true,
                detail: data
            }));
        });

        component.addEventListener('increment.input.changed', function(e) {
            let data = e.detail;
            data.value.trigger = 'increment.input.changed';
            this.dispatchEvent( new CustomEvent(componentEventStr, {
                bubbles: true,
                detail: data
            }));
        });

    }

}); // end domReady()