# OBE:BS4 Design System

The OBE:BS4 Design System is the world's first self-reflexive design system for web production. OBE:BS4 is based on the most popular/robust front-end web framework in the world, Bootstrap! The OBE:BS4 system was designed & built to give all project stakeholders total visual, technical, and tactile access to every color, font, element, component and layout in a web project... *before the project enters any design phases!*

THE OBE:BS4 Design System was designed to bridge the gaps between web project owners, designers, and developers. OBE:BS4 achieves this goal by fostering a more healthy understanding of both code and design *constraints* in the context of the final output medium(s)... the web browsers!

> **Please Note:** *This project is fully functional as far as the generated CSS, JS, and library HTML files are concerned. However it will receive some _substantial changes_ before being ready for all to use. Keep an eye on this page to learn more about how everything works as documentation is added. Once the project is ready, an offical release will follow!*


---


## Table of Contents

* [About](#about)
    * [Project Color Wheel](#project-color-wheel)
        * [List of Color Wheel Colors](#list-of-color-wheel-colors)
        * [Example of Color Tints and Shades](#example-of-color-tints-and-shades)
        * [Accessing Colors with JavaScript](#accessing-colors-with-javascript)
    * [Project Directory Structure](#project-directory-structure)
    * [Project Build Tooling](#project-build-tooling)
* [Installation](#installation)
    * [Installing with NPM](#installing-with-npm)
    * [Installing with Zip](#installing-with-zip)
* [Roadmap](#roadmap)


---


## About

The OBE:BS4 Design System is meant to nudge web projects, web teams, and even entire web organizations towards making both strategic and design related decisions about their projects *exclusively within* the contexts of the browsers. This approach has tremendous value, especially when seeking a device agnostic user experience.

In a sense, this system was made to theoretically replace design-centric tooling that insists on a designer "never writing a line of code." Instead, OBE:BS4 doesn't assume designers are incapable of learning how to hack a little markup or copy/paste HTML snippets. Thus the OBE:BS4 design system arms designers with both visual and markup examples of anything/everything a designer might need to solve a web-based design issue.

> *"OBE:BS4 assumes that everyone working on a web project needs transparent access to each option and each limitation for the client-facing side of the project at all times."* - Matt McT

Accomplishing this was done through a surprisingly simple operational tweak. The secret was creating a system where the front-end specialists are required to provide the designers a complete reference of all possible design options that are cross-browser optimized and are ready "to play with" on any device. All of this needs to happen **_before_** any design work begins.

This operational change forces front-end specialists to strategically plan ahead for their eventual handoff(s). What's magical about this situation is how it gives front-end specialists an unheard of opportunity to refactor and templatize elements/components at a production level, before **_any_** design sprints get started.

> *"The aspect of this project that excites me the most, is how much further a team's strategic thinking and prototyping can reach upon embracing the OBE:BS4 process. It becomes clear after using the system for the first time, that somehow we've all been doing this web stuff in the wrong order! SMH!"* - Matt McT

The OBE:BS4 Design System forces **_all_** project stakeholders to think more strategically about *responsive* content issues, by abstracting the design options to proactively to solve those issues into a giant digital "toolbox" of fully responsive and designer-ready pieces.

If each piece is in-turn *proactively* optimized for production (IE valid, semantic, cross-browser, ARIA accessibile, and refactored for reuse), teams can finally provide themselves with an abundance of cognative room to focus on the most difficult goals of any given web project(s). Stuff like:
1. Device Agnostic Designs
1. Improving User Content Consumption
1. Increasing eCommerce Conversions
1. 508 Compliance
1. Device Agnostic & Accessible SaaS Services
1. Ensuring Projects Are Maintainable/Reusable (For Devs)

### Project Color Wheel

To work with the OBE:BS4 Design System, it is imperative that you understand the system's "color wheel." Before we dive into that though, let's cover why a color wheel was necessary to begin with!

Long story short, it started with the "contextual" color classes popularized by the Bootstrap framework (primary, secondary, danger, etc.) which were combined with Google's Material Design color guidelines. Next, branding was factored in, including concerns for both digital and analog collateral design needs. To organize all of that complexity into a universal brand solution, and to provide contingency color options for both digital and analog design edge cases, the color wheel system emerged!

You'll want to use the wheel to integrate any current branding into the OBE:BS4 system. Then by using the Design System's built-in settings tool (Example: [OBE:BS4 Settings Page](https://library.mattmct.com/settings.html)), you can specify your settings, grab the generated JSON, replace your existing settings file with your new JSON data, and finally re-generate your library site (HTML, CSS, & JS files) according to your settings... all in a few seconds!

Your team now has a complete reference for web site/app design options, and each option is "on-brand" visually as well as ready for production use! Very cool!

#### List of Color Wheel Colors

PRO TIP: If possible, try to memorize these! Knowing these by memory will let you iterate VERY rapidly!

| Name | CSS Slug | JS Slug |
| --- | --- | --- |
| Red | red | red |
| Rose | rose | rose |
| Magenta | magenta | magenta |
| Violet | violet | violet |
| Blue | blue | blue |
| Azure | azure | azure |
| Cyan | cyan | cyan |
| Spring Green | spring-green | springGreen |
| Green | green | green |
| Chartreuse | chartreuse | chartreuse |
| Yellow | yellow | yellow |
| Orange | orange | orange |
| Orange Gray | orange-gray | orangeGray |
| Dark Gray Orange | dark-gray-orange | darkGrayOrange |
| Blue Gray | blue-gray | blueGray |
| Light Gray Azure | light-gray-azure | lightGrayAzure |
| White | white | white |
| Light Gray | light-gray | lightGray |
| Gray | gray | gray |
| Dark Gray | dark-gray | darkGray |
| Black | black | black |

#### Example of Color Tints and Shades

PRO TIP: When using the Design System's tints and shades, each color gets a set of tint and shade values like the example for Blue below. Also and for all color options with tints and shades, using the color slug without any numbers is equal to the 500 variation of that color. So for example, "Blue" is equal to "Blue 500" and so fourth!

| Name | CSS Slug | JS Slug |
| --- | --- | --- |
| Blue 50 | blue-50 | blue50 |
| Blue 100 | blue-100 | blue100 |
| Blue 200 | blue-200 | blue200 |
| Blue 300 | blue-300 | blue300 |
| Blue 400 | blue-400 | blue400 |
| Blue | blue | blue |
| Blue 500 | blue-500 | blue500 |
| Blue 600 | blue-600 | blue600 |
| Blue 700 | blue-700 | blue700 |
| Blue 800 | blue-800 | blue800 |
| Blue 900 | blue-900 | blue900 |

#### Accessing Colors with JavaScript

The OBE:BS4 design system allows you to centralize your brand colors across design disciplines and for web projects, too. This makes keeping brand colors consistent acrosss both projects and mediums trivial. Since your color wheel colors pass through SASS (via gulp-sass) to generate the CSS classes that control element colors in the system, it's important to use a the fewest possible color conversion scripts to keep all generated color values consistent *with each other*.

However, this makes passing consistent brand color values over to JavaScript a bit problematic. Sure, we could force every color wheel color and tint and shade onto a page as CSS3 variables. The base wheel colors already are! ;) But that's not yet consistent, and the necessary fallbacks are just as much code. Plus it's extra CSS weight on an already heavy file.

To solve this problem, the site's generated Color Reference Table, and client-side generated JavaScript/JSON Snippets, allow you to bring your brand colors into your project in minutes. Having your complete color system available in JavaScript makes things like charts, SVG manipulation, and more very easy to iterate upon, while never running out of colors for a vast majority of design challenges.

Generally, you'll want to make a seperate JavaScript file, and include/require it on pages as needed to bring your colors into the dynamic side of things. Here's a super simple way to demonstrate how to use OBE:BS4 color wheel colors in JavaScript:

```javascript
// EXAMPLE: An external .js file named brandColors.js
const brandColors = JSON.parse('PASTE_RGBa_JSON_INSIDE_THESE_QUOTES');
```

```javascript
// EXAMPLE: Utility function to customize the alpha value of an rgba string
// NOTE: The Default alpha value for all RGBa strings is: '0.5'
const setRGBa = function (rgbaString, alphaValue) {
    return alphaValue ? rgbaString.replace('0.5', alphaValue) : rgbaString;
}

// EXAMPLE IN ACTION:
let darkGray = setRGBa( myColors.darkGray.rgba, '0.75' );
```

### Project Directory Structure

This project consists of 3 project directories and a handful of process files, that are intended to be a part of your project's root directory:

- obebs4
    - core
        - css
        - images
        - js
    - data
    - prismjs
        - css
        - js
    - scss
        - mixins
        - settings
        - utilities
- library
    - css
    - images
        - favicons
    - js
- nunjucks
    - data
    - pages
    - templates
        - partials
            - boilerplates
            - colors
            - defaults
            - extensions
            - icons
            - layouts
            - macros
            - reference
            - settings
- gulpfile.js

### Project Build Tooling

(Coming Soon!)


---


## Installation

There are two basic ways to install the OBE:BS4 Design System. One method is to use Node.js/NPM to install the project as a node module from your console. The other way is to 'old school' download the project zip from here on GitHub, and then copying any necessary extracted files/directories into your project's root folder.

To really start using your Design System however, you'll need to somehow use an OBE:BS4 Settings Tool page to get the JSON settings to customize your Design System. (Coversely you could also get your JSON settings from the project's offical example [OBE:BS4 Settings Page](https://library.mattmct.com/settings.html)).

Then you'll need to use Gulp to run the scripts needed to apply your settings and re-generate the HTML, CSS, and JS files for your library. Then you are ready to use your Design System to make amazing web stuff!

*NOTE: This project uses Gulp to manage and generate the Design System Library Site. So if you are already using Gulp, be sure to not override your gulpfile.js file with the OBE:BS4 gulpfile!*

### Installing with NPM

**Step 1**: Create a directory for your project, navigate to it in your console, nitialize NPM, and fill out your project info for your package.json file as prompted by NPM.
```bash
npm init
```

**Step 2**: Install obebs4-design-system from GitHub (NPM will install all dependencies and this codebase inside the 'node_modules' directory)
```bash
npm install --save oberocks/obebs4#master
```

<!---
**Step 3**: Use the following series of command line scripts to move the starting library files into your working directory
```bash
npm run create-obebs4-directories
```
-->

### Installing with Zip

(Coming Soon!)


---


## Roadmap

(Coming Soon!)
