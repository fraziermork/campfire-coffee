var totalLbsForAllShops = 0;

function shopLocation (listInput){
  this.locName = listInput[0];
  this.cupsPerCust = listInput[1];
  this.lbsPerCust = listInput[2];
  this.minCustPerHour = listInput[3];
  this.maxCustPerHour = listInput[4];
  this.poundsPerCup = .05;
  this.dailyLbs = 0;
  this.hours = ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
  this.getCustThisHour = function(){
    var customerNumber = Math.round(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  };
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
  this.renderActivityLog = function(){
    //set up summary table
    var summaryTableEl = document.getElementById('summaryTable');
    var summaryRowEl = document.createElement('tr');
    summaryTableEl.appendChild(summaryRowEl);
    var summaryRowFirstDatumEl = document.createElement('td');
    summaryRowFirstDatumEl.innerHTML = '<strong>' + this.locName + '</strong>';
    summaryRowEl.appendChild(summaryRowFirstDatumEl);

    //set up the individual activity logs
    var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go'];
    var containerEl = document.createElement('div');
    containerEl.className = 'logContainer';
    var titleEl = document.createElement('h3');
    titleEl.textContent = this.locName + ': ';
    document.body.appendChild(containerEl);
    containerEl.appendChild(titleEl);
    var table = document.createElement('table');
    table.className = 'activityLog';
    var headRowEl = document.createElement('tr');
    containerEl.appendChild(table);
    table.appendChild(headRowEl);
    //set up head row
    for (var i = 0; i < headingsList.length; i++){
      var tableHeadEl = document.createElement('th')
      tableHeadEl.textContent = headingsList[i];
      headRowEl.appendChild(tableHeadEl);
    }
    //set up table body and summary table body
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      lbsThisHour.unshift(this.hours[i]);
      var logRowEl = document.createElement('tr');
      table.appendChild(logRowEl);
      var summaryRowDatumEl = document.createElement('td');
      summaryRowDatumEl.textContent = lbsThisHour[1];
      summaryRowEl.appendChild(summaryRowDatumEl);

      for (var j = 0; j < lbsThisHour.length; j++ ){
          tableItemEl = document.createElement('td');
          tableItemEl.textContent = lbsThisHour[j];
          logRowEl.appendChild(tableItemEl);
      }
    }
    var summaryRowLastDatumEl = document.createElement('td');
    summaryRowLastDatumEl.textContent = this.dailyLbs.toFixed(1);
    summaryRowEl.appendChild(summaryRowLastDatumEl);

    var totalEl = document.createElement('h2');
    totalEl.textContent = 'For a total of ' + this.dailyLbs.toFixed(1) + ' pounds today.';
    containerEl.appendChild(totalEl);
    return this.dailyLbs;
  }
}

//set up summary table
function summarySetUp(){
  var hours = ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
  var summaryHeadRowEl = document.createElement('tr');
  var summaryTableEl = document.getElementById('summaryTable');
  summaryTableEl.appendChild(summaryHeadRowEl);
  for (var i = 0; i < hours.length + 2; i++){
    var summaryTableHeadDatum = document.createElement('td');
    if (i === hours.length+1) {
      summaryTableHeadDatum.textContent = 'Totals';
    } else if (i !== 0){
      summaryTableHeadDatum.textContent = hours[i-1];
    }
    summaryHeadRowEl.appendChild(summaryTableHeadDatum);
  }
}
summarySetUp();

//set up location list and generate location summaries
var locations = [];
locations[0] = ['Capitol Hill', 3.2, .4, 32, 48];
locations[1] = ['Pike Place Market', 1.2, 3.7, 14, 55];
locations[2] = ['Seattle Public Library', 2.6, .2, 49, 75];
locations[3] = ['Sea Tac', 1.1, 2.7, 68, 124];
locations[4] = ['Website', 0, 6.7, 3, 6];
function writeActivityLog(myLocations){
  for (var i = 0; i < myLocations.length; i++) {
    var locationObject = new shopLocation(myLocations[i]);
    myLocations[i] = locationObject;
    totalLbsForAllShops += locationObject.renderActivityLog();
  }
  var summaryTotal = document.getElementById('summaryTotal');
  summaryTotal.textContent = 'The total pounds consumed by all shops today is ' + Number(totalLbsForAllShops.toFixed(1)) + " lbs.";
  console.log('The total for all shops today is:' + totalLbsForAllShops);
  console.dir(myLocations);
}
writeActivityLog(locations);

function onSubmit(){
  //console.log('working');
  var newName = document.getElementById('newLocationName').value;
  var newMin = +document.getElementById('newLocationMin').value;
  var newMax = +document.getElementById('newLocationMax').value;
  var newCups = +document.getElementById('newLocationCups').value;
  var newLbs = +document.getElementById('newLocationLbs').value;

  newLocation = new shopLocation([newName, newCups, newLbs, newMin, newMax,]);
  totalLbsForAllShops += newLocation.renderActivityLog();
  var summaryTotal = document.getElementById('summaryTotal');
  summaryTotal.textContent = 'The total pounds consumed by all shops today is ' + Number(totalLbsForAllShops.toFixed(1)) + " lbs.";
  locations.push(newLocation);
}

// var capitolHill = {
//   name: 'Capitol Hill',
//   cupsPerCust: 3.2,
//   lbsPerCust: .4,
//   minCustPerHour: 32,
//   maxCustPerHour: 48,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }
//
// var pikePlace = {
//   name: 'Pike-Place Market',
//   cupsPerCust:1.2,
//   lbsPerCust:3.7,
//   minCustPerHour: 14,
//   maxCustPerHour: 55,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }
//
// var seattlePubLib = {
//   name: 'Seattle Public Library',
//   cupsPerCust:2.6,
//   lbsPerCust:.2,
//   minCustPerHour: 49,
//   maxCustPerHour: 75,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }
//
// var southLakeUnion = {
//   name: 'South Lake Union',
//   cupsPerCust:1.3,
//   lbsPerCust:3.7,
//   minCustPerHour: 35,
//   maxCustPerHour: 88,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }
//
// var seatac = {
//   name: 'Sea-Tac Airport',
//   cupsPerCust:1.1,
//   lbsPerCust:2.7,
//   minCustPerHour: 68,
//   maxCustPerHour: 124,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }
//
// var website = {
//   name: 'Website Sales',
//   cupsPerCust:0,
//   lbsPerCust:6.7,
//   minCustPerHour: 3,
//   maxCustPerHour: 6,
//   poundsPerCup: .05,
//   hours: ['6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
//   getCustThisHour: function(){
//     var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
//     //console.log('getCustThisHour ' + customerNumber);
//     return customerNumber;
//   },
//   getLbsThisHour: function(){
//     var customerNumber = this.getCustThisHour();
//     var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
//     var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
//     var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
//     var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
//     //console.log('getLbsThisHour: ' + totalLbs);
//     return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
//   },
//   summarizeDay: function(){
//     var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
//     var container = document.createElement('div');
//     container.className = 'logContainer';
//     var title = document.createElement('h3');
//     title.textContent = this.name + ': ';
//     document.body.appendChild(container);
//     container.appendChild(title);
//     var table = document.createElement('table');
//     table.className = 'activityLog';
//     var headRow = document.createElement('tr');
//     container.appendChild(table);
//     table.appendChild(headRow);
//     //set up head row
//     for (var i = 0; i < headingsList.length; i++){
//       var tableHead = document.createElement('th')
//       tableHead.textContent = headingsList[i];
//       headRow.appendChild(tableHead);
//     }
//     //set up table body
//     for(var i = 0; i < this.hours.length; i++){
//       var lbsThisHour = this.getLbsThisHour();
//       lbsThisHour.unshift(this.hours[i]);
//       var logRow = document.createElement('tr');
//       table.appendChild(logRow);
//
//       for (var j = 0; j < lbsThisHour.length; j++ ){
//           tableItem = document.createElement('td');
//           tableItem.textContent = lbsThisHour[j];
//           logRow.appendChild(tableItem);
//       }
//     }
//   }
// }

// website.summarizeDay();
