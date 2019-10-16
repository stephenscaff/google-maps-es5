#GoogleMaps - ES5

An es5 approach to google maps, cause sometimes you still need to keep stufff es5.

Injects the google map library with a callback to init the map or maps.
Uses data-attributes to build the map and provide content for the custom infowindow. Allows for multiple map instances if that's your thing.

Refrains from Geocoding address to keep api costs down.


##Usage

Load the js and styles json.

The, provide markup with the following structure.
Note that data attributes, which are used to establish the map's lat lng, and build the custom infowindow.

###HTML
```
<section class="locations">
  <div class="locations__map js-map"
      data-lat="45.5540735"
      data-lng="-122.66690189999997"
      data-address="4203 N Williams Ave, Portland, OR 97217, USA"
      data-title="Shine Distillery &amp; Grill"
      data-zoom="14">
  </div>
</section>
```

##Styles

Don't forget the required css to render your map(s).

###CSS
```
.locations__map {
  height: 100%;
  min-height: 30em;
  margin: 0;
  padding: 0;
}
```

##About

`google-maps.js` just includes as series of functions to handle rendering the map, build the marker and infowindow (with custom template), center on resize, etc.

An anonymous IIFE kicks things off my adding injecting the google maps library to the page, with a callback that calls an init function.

```
// google-maps.js

/**
 * Load Gmap Script
 * IFEE  to injects our gmap script
 * with callback on map pages
 */
(function() {
  if (document.querySelector('.js-map')) {
    var tag = document.createElement('script');
    tag.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initLocationMaps";
    tag.defer = true;
    var scriptTag = document.getElementsByTagName('script')[0];
    scriptTag.parentNode.insertBefore(tag, scriptTag);
  }
})()

/**
 * InitLocationMaps
 * Init function called from gmaps callback.
 * Calls GMaps, passing in map selectors
 */
function initGMaps() {
  GMaps('.js-map')
}

```
