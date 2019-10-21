# SpaceApp
SpaceApp challenge 2019

## Security
The Google Maps key used in this webapp has been deactivated for security reasons

## WARNING
Some changes have been made to the required `google-maps-react`, in particular, in `aquagang/node_modules/google-maps-react/dist/components/HeatMap.js` line

	return new google.maps.LatLng(pos.lat, pos.lng);

has been modified to
	
	return {location: new google.maps.LatLng(pos.lat, pos.lng), weight:pos.weight};

