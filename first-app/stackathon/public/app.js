    //firestore loading in data
    const list=document.querySelector('#listings')

    function renderList(doc){
        let li=document.createElement('li');
        let name=document.createElement('span')
        let description=document.createElement('span')

        li.setAttribute('data-id',doc.id)
        name.textContent=doc.data().name
        name.className = 'title';
        description.textContent=doc.data().description

        li.appendChild(name);
        li.appendChild(description)

        li.className='item'

        list.appendChild(li)
        list.className='listings'
    }
    
    
    db.collection('Restaurants').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            renderList(doc)
        })
    })
//-----------------------------------------------------


  // This will let you use the .remove() function later on
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NoYXBpcm8xIiwiYSI6ImNqejhtZjI5bTAzbDEzaGxvZnV3YWdtdG8ifQ.D_DGEoSj-_eFJ-0FBKJ2yQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9942, 40.7231],
    zoom: 13,
    // scrollZoom: false
  });
  //let restaurants= {type:'FeatureCollection',
//   features:[ restaurants.map(elem=>
//     {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: elem.coordinates
//         },
//         properties: {
//           name: elem.name,
//           description: elem.description,
//           phoneFormatted: '(212)941-7994',
//           phone: '2129417994',
//           address: '32 Spring St',
//           city: 'New York',
//           country: 'United States',
//           postalCode: '10012',
//           state: 'NY'
//         }
//       }
//   ])


  let stores = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
          -73.995631,
            40.72164
          ]
        },
        properties: {
          name: "Lombardi's",
          description: "Pizza Restaurant",
          phoneFormatted: '(212)941-7994',
          phone: '2129417994',
          address: '32 Spring St',
          city: 'New York',
          country: 'United States',
          postalCode: '10012',
          state: 'NY'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            -73.998454,
            40.717442
          ]
        },
        properties: {
          name: "Sapori d'Italia",
          description:'Italian restaurant',
          phoneFormatted: '(212)714-2113',
          phone: '2127142113',
          address: '105 Mulberry St',
          city: 'New York',
          country: 'United States',
          postalCode: '10013',
          state: 'NY'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
          -73.961475,
            40.711259
          ]
        },
        properties: {
          name:"Pies 'n' Thighs",
          description: "Southern Restaurant",
          phoneFormatted: '(347)529-6090',
          phone: '3475296090',
          address: '166 S 4th S',
          city: 'Brooklyn',
          country: 'United States',
          postalCode: '11211',
          state: 'NY'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
          -73.992764,
            40.697373
          ]
        },
        properties: {
          name:"Iron Chef House",
          description:"Japanese Restaurant",
          phoneFormatted: '(718) 858-8517',
          phone: '7188588517',
          address: '92 Clark St',
          city: 'Brooklyn',
          country: 'United States',
          postalCode: '11201',
          state: 'NY.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
          -73.987740,
            40.738078
          ]
        },
        properties: {
          name:"Farmer and the Fish",
          description:"Seafood Restaurant",
          phoneFormatted: '(646) 998-5991',
          phone: '6469985991',
          address: '245 Park Ave S',
          city: 'New York',
          country: 'United States',
          postalCode: '10003',
          state: 'NY'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            -73.983235,
            40.771134
          ]
        },
        properties: {
          name:"Rosa Mexicano",
          description:"Mexican Restaurant",
          phoneFormatted:"(212) 397 0666",
          phone:"2123970666",
          address: '61 Columbus Ave',
          city: 'New York',
          country: 'United States',
          postalCode: '10023',
          state: 'NY'
        },
      }]
  };


  // initializeMap(){
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(position=>{
  //       this.lat=position.coords.latitude;
  //       this.lng=position.coords.longitude;
  //     })
  //   }
  // }

//user location
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
  }));

  


  // This adds the stores to the map
  map.on('load', function(e) {
    map.addSource('places', {
      type: 'geojson',
      data: stores
    });
    buildLocationList(stores); // Initialize the list

    // Add `new mapboxgl.Geocoder` code here

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      bbox: [-74.037128, 40.680417, -73.906577, 40.837310] // Set the bounding box coordinates
    });

    map.addControl(geocoder, 'top-left');

    // Add the `map.addSource` and `map.addLayer` here
    map.addSource('single-point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [] // Notice that initially there are no features
      }
    });

    map.addLayer({
      id: 'point',
      source: 'single-point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff'
      }
    });

    // Add the `geocode` event listener here
    geocoder.on('result', function(ev) {
      var searchResult = ev.result.geometry;
      map.getSource('single-point').setData(searchResult);

      // Add `forEach` function here
      var options = { units: 'miles' };
      stores.features.forEach(function(store) {
        Object.defineProperty(store.properties, 'distance', {
          value: turf.distance(searchResult, store.geometry, options),
          writable: true,
          enumerable: true,
          configurable: true
        });
      });
       // Add `sort` function here
      stores.features.sort(function(a, b) {
        if (a.properties.distance > b.properties.distance) {
          return 1;
        }
        if (a.properties.distance < b.properties.distance) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      var listings = document.getElementById('listings');
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }

      buildLocationList(stores);


      // Add function that fits bounds to search and closest store here
      function sortLonLat(storeIdentifier) {
      var lats = [stores.features[storeIdentifier].geometry.coordinates[1], searchResult.coordinates[1]];
      var lons = [stores.features[storeIdentifier].geometry.coordinates[0], searchResult.coordinates[0]];

      var sortedLons = lons.sort(function(a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      var sortedLats = lats.sort(function(a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });

      map.fitBounds([
        [sortedLons[0], sortedLats[0]],
        [sortedLons[1], sortedLats[1]]
      ], {
        padding: 100
      });
    }

    sortLonLat(0);
    createPopUp(stores.features[0]);
    });
    
  });


  stores.features.forEach(function(marker, i) {
    var el = document.createElement('div'); // Create an img element for the marker
    el.id = 'marker-' + i;
    el.className = 'marker';
    // Add markers to the map at all points
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    el.addEventListener('click', function(e) {
      flyToStore(marker); // Fly to the point
      createPopUp(marker); // Close all other popups and display popup for clicked store
      var activeItem = document.getElementsByClassName('active'); // Highlight listing in sidebar (and remove highlight for all other listings)

      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }

      var listing = document.getElementById('listing-' + i);
      listing.classList.add('active');
    });
  });

  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<h3>'+currentFeature.properties.name+'</h3>' +
        '<h4>' + currentFeature.properties.description + '</h4>')
      .addTo(map);
  }


  function buildLocationList(data) {
    for (i = 0; i < data.features.length; i++) {
      var currentFeature = data.features[i];
      var prop = currentFeature.properties;

      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.name;

      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.address;
      if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      }

      // Add rounded distance here

      if (prop.distance) {
        var roundedDistance = Math.round(prop.distance * 100) / 100;
        details.innerHTML += '<p><strong>' + roundedDistance + ' miles away</strong></p>';
      }

      link.addEventListener('click', function(e) {
        var clickedListing = data.features[this.dataPosition]; // Update the currentFeature to the store associated with the clicked link
        flyToStore(clickedListing); // Fly to the point
        createPopUp(clickedListing); // Close all other popups and display popup for clicked store
        var activeItem = document.getElementsByClassName('active'); // Highlight listing in sidebar (and remove highlight for all other listings)
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
      });
    }
  }