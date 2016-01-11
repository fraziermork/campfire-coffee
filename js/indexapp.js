var locations = [capitolHill, pikePlace, seattlePubLib, seatac, website];


function addLocations(){
  var container = document.createElement('div');
  document.body.appendChild(container);
  var locationString = '';
  for(i = 0; i < locations.length; i++){
    locationString = locationString + " " + locations[i];
  }
}

// a particular image of a campfire that she likes (to be provided later)
// listing of locations and kiosk hours (6:00am to 9:00pm, 7 days a week)
// a color palette that reflects the experience of going camping
// custom font via Google Fonts
// more details coming later, she'll get them to you soon, she promises (seems like it is always coming "tomorrow")
