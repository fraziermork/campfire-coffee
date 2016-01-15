//set up the pretty header at the top
var indexHeader = document.getElementById('indexHeader');
indexHeader.style.backgroundImage = "url(img/campsite-tent-night.jpg)";
indexHeader.style.backgroundSize = "960px 540px"


//global variables
var totalLbsForAllShops = 0;
var newShops = 0;
var locationsObjectArray = [];
var locations = [];
locations[0] = ['Capitol Hill', 3.2, .4, 32, 48, 'capitolHill'];
locations[1] = ['Pike Place Market', 1.2, 3.7, 14, 55, 'pikePlace'];
locations[2] = ['Seattle Public Library', 2.6, .2, 49, 75, 'seattlePubLib'];
locations[3] = ['Sea Tac', 1.1, 2.7, 68, 124, 'seaTac'];
locations[4] = ['Website', 0, 6.7, 3, 6, 'website'];


//constructor function for a new shop location
function shopLocation (listInput){
  //initial variable
  this.locName = listInput[0];
  this.cupsPerCust = listInput[1];
  this.lbsPerCust = listInput[2];
  this.minCustPerHour = listInput[3];
  this.maxCustPerHour = listInput[4];
  this.poundsPerCup = .05;
  this.dailyLbs = 0;
  this.hours = ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
  //find number of customers
  this.getCustThisHour = function(){
    var customerNumber = Math.round(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  };
  //find amount purchased by customers
  this.getLbsThisHour = function(){
    var customerNumber = this.getCustThisHour();
    var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
    var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
    var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
    var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
    this.dailyLbs += +totalLbs;
    //console.log('getLbsThisHour= ' + totalLbs);
    return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
  };
  //add a log to the body of the page for that store, update the summary table
  this.renderActivityLog = function(){
    //set up summary table
    var summaryTableEl = document.getElementById('summaryTable'); //grab the summary table
    var summaryRowEl = document.createElement('tr'); //the row we are writing to
    summaryTableEl.appendChild(summaryRowEl);
    var summaryRowFirstDatumEl = document.createElement('td'); //the first element of the row with the name
    summaryRowFirstDatumEl.innerHTML = '<strong>' + this.locName + '</strong>';
    summaryRowEl.appendChild(summaryRowFirstDatumEl);

    //set up the individual activity logs
    var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go'];
    var containerEl = document.createElement('div'); //the div that contain's this location's log
    containerEl.className = 'logContainer';

    var activityLogTableEl = document.getElementById('activityLogTable');
    activityLogTableEl.appendChild(containerEl);
    var titleEl = document.createElement('h3'); // the title of this location's log
    titleEl.textContent = this.locName + ': ';
    containerEl.appendChild(titleEl);
    var table = document.createElement('table'); //the table for this location
    table.className = 'activityLog';
    var headRowEl = document.createElement('tr'); //the head row for this location's table
    containerEl.appendChild(table);
    table.appendChild(headRowEl);

    //set up head row of the activity log
    for (var i = 0; i < headingsList.length; i++){
      var tableHeadEl = document.createElement('th'); //the table header element
      tableHeadEl.textContent = headingsList[i];
      headRowEl.appendChild(tableHeadEl);
    }
    //set up table body and summary table body
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      lbsThisHour.unshift(this.hours[i]);
      var logRowEl = document.createElement('tr'); //the row of the activity log to write to for this hour
      table.appendChild(logRowEl);
      var summaryRowDatumEl = document.createElement('td'); //the summary table entry for this hour
      summaryRowDatumEl.textContent = lbsThisHour[1];
      summaryRowEl.appendChild(summaryRowDatumEl);

      for (var j = 0; j < lbsThisHour.length; j++ ){
          tableItemEl = document.createElement('td'); //the activity log entry
          tableItemEl.textContent = lbsThisHour[j];
          logRowEl.appendChild(tableItemEl);
      }
    }
    var summaryRowLastDatumEl = document.createElement('td'); //the total for today in the summary table
    summaryRowLastDatumEl.textContent = this.dailyLbs.toFixed(1);
    summaryRowEl.appendChild(summaryRowLastDatumEl);

    var totalEl = document.createElement('h2'); //the total for today at the bottom of the activity log
    totalEl.textContent = 'For a total of ' + this.dailyLbs.toFixed(1) + ' pounds today.';
    containerEl.appendChild(totalEl);
    return this.dailyLbs;
  }
}

//set up summary table head
function summarySetUp(){
  var hours = ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
  var summaryHeadRowEl = document.createElement('tr');
  var summaryTableEl = document.getElementById('summaryTable');
  summaryTableEl.appendChild(summaryHeadRowEl);
  for (var i = 0; i < hours.length + 2; i++){
    var summaryTableHeadDatum = document.createElement('td'); //needs to have first element blank, last table is totals, in between is hours elements
    if (i === hours.length+1) {
      summaryTableHeadDatum.textContent = 'Totals';
    } else if (i !== 0){
      summaryTableHeadDatum.textContent = hours[i-1];
    }
    summaryHeadRowEl.appendChild(summaryTableHeadDatum);
  }
}
summarySetUp();



//generate location summaries
function writeActivityLog(myLocations){
  for (var i = 0; i < myLocations.length; i++) {
    var locationObject = new shopLocation(myLocations[i]);
    locationsObjectArray[i] = locationObject;
    // myLocations[i] = locationObject; //from old code when locations was being rewritten to contain objects instead
    totalLbsForAllShops += locationObject.renderActivityLog();
  }
  //write the total amount sold in the bottom of the summary
  var summaryTotal = document.getElementById('summaryTotal');
  summaryTotal.textContent = '(Running in writeActivityLog) The total pounds consumed by all shops today is ' + Number(totalLbsForAllShops.toFixed(1)) + " lbs.";
  // console.log('The total for all shops today is:' + totalLbsForAllShops);
  // console.log('(Running inside myActivityLog)the locations array is ');
  // console.dir(locations);
  // console.log('(Running inside myActivityLog) the locationsObjectArray is ');
  // console.dir(locationsObjectArray);
}
writeActivityLog(locations);
console.log('(Running just after writeActivityLog) This locations array is ');
console.dir(locations);





//executes on click of submit button for form
//submits a new store based on information typed into the form at the top, adds log, updates summary
function onSubmit(event){
  var rewriteFlag = false;
  var rewriteLocation = locations.length;
  console.log(event);
  event.preventDefault();
  if (!event.target.newLocationName.value || !event.target.newLocationMin.value || !event.target.newLocationMax.value || !event.target.newLocationCups.value || !event.target.newLocationLbs.value ){
    return alert('Fields cannot be empty')
  }
  var newName = event.target.newLocationName.value;
  var newMin = +event.target.newLocationMin.value;
  var newMax = +event.target.newLocationMax.value;
  var newCups = +event.target.newLocationCups.value;
  var newLbs = +event.target.newLocationLbs.value;

  console.log('newName is ' + newName);
  console.log('newMin is ' + newMin);
  console.log('newMax is ' + newMax);
  console.log('newCups is ' + newCups);
  console.log('newLbs is ' + newLbs);

  //Check to see if the new shop is named the same as an old one
  for(var i = 0; i < locations.length; i++){
    if (newName.toLowerCase() === locations[i][0].toLowerCase()){
      rewriteFlag = true;
      rewriteLocation = i;
      console.log('rewriteFlag is ' + rewriteFlag);
    }
  }
  //update the locations array
  locations[rewriteLocation] = [newName, newCups, newLbs, newMin, newMax];
  console.log('(Running inside of onSubmit) the new locations array is ');
  console.log(locations);


  //if the name is the same as an existing object
  if (rewriteFlag){
    //update the object in the location array with the new object
    console.log('(running inside onsubmit) rewrite triggered, the locations  array before is');
    console.log(locations);
    console.log('(running inside onsubmit) rewrite triggered, the locationsObjectArray to be erased is');
    console.dir(locationsObjectArray);
    //reinitialize the object array
    locationsObjectArray = [];
    console.log('(running inside onsubmit) rewrite triggered, the locationsObjectArray after erasing is');
    console.log(locationsObjectArray);
    // grab summarytable and delete all content
    var summaryTableEl = document.getElementById('summaryTable');
    summaryTableEl.innerHTML = '';
    //grab the tableActivityLog and delete all content
    var activityLogTableEl = document.getElementById('activityLogTable');
    activityLogTableEl.innerHTML = '';
    //reinitialize the summary table
    summarySetUp();
    //write the whole table over again
    writeActivityLog(locations);

  //if we are writing a new location
  } else {
    newLocation = new shopLocation([newName, newCups, newLbs, newMin, newMax]);
    console.log('(running inside onsubmit) the new location that was built is');
    console.log(newLocation);
    //write the activity log for new entry, return total daily lbs for that location and add to total for all shops
    totalLbsForAllShops += newLocation.renderActivityLog();
    //update the summary to account for new entry
    var summaryTotal = document.getElementById('summaryTotal');
    summaryTotal.textContent = 'The total pounds consumed by all shops today is ' + Number(totalLbsForAllShops.toFixed(1)) + " lbs.";
    locationsObjectArray.push(newLocation);
    console.log('(running inside onsubmit) a new location was made, the locations array is ');
    console.log(locations);
    console.log('(running inside onsubmit) a new location was made, the locationsObjectArray is ');
    console.dir(locationsObjectArray);
  }


}

var storage = document.getElementById("submitForm");
storage.addEventListener('submit', onSubmit, true);


//figure out how to write things in place -- can write fast one to delete all and rebuild, slow one with rewrite method
