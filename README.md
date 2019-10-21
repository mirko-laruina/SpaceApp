# SpaceApp
SpaceApp challenge 2019

WARNING: some changes have been made to the required `google-maps-react`, in particular, in `aquagang/node_modules/google-maps-react/dist/components/HeatMap.js` line

	return new google.maps.LatLng(pos.lat, pos.lng);

has been modified to
	
	return {location: new google.maps.LatLng(pos.lat, pos.lng), weight:pos.weight};

