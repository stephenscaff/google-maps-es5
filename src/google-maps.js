/**
 * LocationMaps
 * Defines map address data and passes it
 * to a renderMap() function. Supports muliple
 * map instances/objects.
 * @param {string} el - map selector
 */
function GMaps(el) {

  const mapEls   = document.querySelectorAll(el);

  Util.forEach ( mapEls, function (index, mapEl) {
    const data    = {
      lat:     parseFloat(mapEl.dataset.lat ? mapEl.dataset.lat : 0),
      lng:     parseFloat(mapEl.dataset.lng ? mapEl.dataset.lng : 0),
      address: mapEl.dataset.address,
      title:   mapEl.dataset.title ? mapEl.dataset.title: "Map",
      zoom:    parseFloat(mapEl.dataset.zoom ? mapEl.dataset.zoom: 12),
    }

    // Render Map
    renderMap(mapEl, data)
  });
}

/**
 * Render Map
 * @param {map obj} mapEl - Google Map
 * @param {obj} data - map data
 */
function renderMap(mapEl, data) {

  const options = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:    styles,
    zoom:      data.zoom,
    center:    {
      lat: data.lat,
      lng: data.lng
    }
  }

  const map = new google.maps.Map(mapEl, options)

  // RenderMarker
  renderMarker(map, data)
}

/**
 * Render Marker
 * Renders custom map marker and infowindow
 * @param {map element} mapEl
 * @param {object} data
 */
function renderMarker(map, data) {

  // const icon = {
  //   url:        stylers.icons.gold,
  //   scaledSize: new google.maps.Size(80, 80)
  // }

  const tmpl = markerTmpl(data)

  const marker = new google.maps.Marker({
    position:  new google.maps.LatLng(data.lat, data.lng),
    map:       map,
    title:     data.title,
    content:   tmpl,
    animation: google.maps.Animation.DROP
  })
                                                                                                                                                                                                                                                                                                                                          fc
  const infowindow = new google.maps.InfoWindow()

  // Handle Marker Click
  handleMarkerClick(map, marker, infowindow)
}

/**
 * Handle Marker Click
 *
 * @param {map obj} mapEl
 * @param {marker} marker
 * @param {infowindow} infoWindow
 */
function handleMarkerClick(map, marker, infowindow) {

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.content)
    infowindow.open(map, marker)
  })

  google.maps.event.addListener(map, 'click', function(event) {
    if (infowindow) {
      infowindow.close(map, infowindow)
    }
  })
}

/**
 * Marker Template
 * @param {obj} data - property data/json
 */
 function markerTmpl(data) {

   const url = encodeURIComponent(data.address)

   return `<article class="marker-box">
    <div class="marker-box__wrap">
      <div class="marker-box__grid">
        <div class="marker-box__main">
          <span class="marker-box__title">${data.title}</span>
          <address class="marker-box__address">
            <span class="marker-box__address">${data.address}</span>
          </address>
          <a class="marker-box__btn btn-line" target="_blank" href="https://www.google.com/maps/place/${url}/">Get Directions</a>
        </div>
      </div>
    </div>
  </article>`;
}

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
