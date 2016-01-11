var locationNames = ['Capitol Hill', 'Pike-Place Market', 'Seattle Public Library', 'South Lake Union', 'Sea-Tac Airport'];


function addLocations(){
  var container = document.createElement('div');
  container.className = 'locationListing';
  document.body.appendChild(container);
  var locationString = '';
  for(i = 0; i < locationNames.length; i++){
    locationString = locationString + " " + locations[i];
  }
  locationString = locationString + " : Open 6AM-9PM";

  var locationList = document.createElement('h3');
  locationList.textContent = 'hello world';
  container.appendChild(locationList);
}

addLocations();

// a particular image of a campfire that she likes (to be provided later)
// listing of locations and kiosk hours (6:00am to 9:00pm, 7 days a week)
// a color palette that reflects the experience of going camping
// custom font via Google Fonts
// more details coming later, she'll get them to you soon, she promises (seems like it is always coming "tomorrow")
