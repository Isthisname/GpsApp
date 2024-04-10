let userMarker: google.maps.Marker | null = null; // Variable to store the user's marker
let map: google.maps.Map | null = null; // Variable to store the map
let userPath: google.maps.Polyline | null = null; // Variable to store the user's path
let drawingManager: google.maps.drawing.DrawingManager | null = null; // Variable to store the drawing manager
let geofence: google.maps.Polygon | null = null; // Variable to store the geofence

function initMap(): void {
  // Try HTML5 geolocation
  if (navigator.geolocation) {
    // Get the initial user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Create the map centered at the user's location
        map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: userLocation,
            zoom: 14,
          }
        );

        // Create the marker at the user's location
        userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          title: "Your Location",
        });

        // Create the path polyline
        userPath = new google.maps.Polyline({
          path: [userLocation],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map
        });

        // Create the drawing manager
        drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: null,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
          markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          },
          circleOptions: {
            fillColor: "#ffff00",
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        });

        drawingManager.setMap(map);

        // Listen for drawing complete event
        google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
          if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            if (geofence) {
              geofence.setMap(null); // Remove the existing geofence if any
            }
            geofence = event.overlay as google.maps.Polygon;
            checkGeofence(userLocation); // Check if the user is initially inside the geofence
          }
        });

        // Watch for changes in the user's location
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const updatedUserLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Update the marker's position
            if (userMarker) {
              userMarker.setPosition(updatedUserLocation);
            } else {
              userMarker = new google.maps.Marker({
                position: updatedUserLocation,
                map: map,
                icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                title: "Your Location",
              });
            }

            // Update the path polyline
            if (userPath) {
              const path = userPath.getPath();
              (path as google.maps.MVCArray<google.maps.LatLng>).push(new google.maps.LatLng(updatedUserLocation.lat, updatedUserLocation.lng));
            }

            // Check if the user is inside the geofence
            checkGeofence(updatedUserLocation);
          },
          () => {
            handleLocationError(true);
          }
        );
      },
      () => {
        handleLocationError(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}

function checkGeofence(userLocation: google.maps.LatLngLiteral): void {
  if (geofence) {
    const isInside = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(userLocation.lat, userLocation.lng), geofence);
    if (!isInside) {
      alert("Warning: You've left the area!");
    }
  }
}

function handleLocationError(browserHasGeolocation: boolean): void {
  const errorMessage = browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.";
  console.error(errorMessage);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
