function shopLocation (listInput){
  this.locName = listInput[0];
  this.cupsPerCust = listInput[1];
  this.lbsPerCust = listInput[2];
  this.minCustPerHour = listInput[3];
  this.maxCustPerHour = listInput[4];
  this.poundsPerCup = .05;
  this.hours = ['6:00AM', '7:00AM','8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
  this.getCustThisHour = function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  };
  this.getLbsThisHour = function(){
    var customerNumber = this.getCustThisHour();
    var cups = +(this.cupsPerCust * customerNumber).toFixed(1);
    var lbsInCups = +(cups * this.poundsPerCup).toFixed(1);
    var lbsToGo = +(this.lbsPerCust * customerNumber).toFixed(1);
    var totalLbs = +(lbsToGo + lbsInCups).toFixed(1);
    //console.log('getLbsThisHour= ' + totalLbs);
    return [totalLbs, customerNumber, cups + ' (' + lbsInCups + ' lbs)', lbsToGo];
  };
  this.renderActivityLog = function(){
    var headingsList = ['Time', 'Total Lbs', 'Number of Customers', 'Number of Cups', 'Lbs to-Go']
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
    //set up table body
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      lbsThisHour.unshift(this.hours[i]);
      var logRowEl = document.createElement('tr');
      table.appendChild(logRowEl);

      for (var j = 0; j < lbsThisHour.length; j++ ){
          tableItemEl = document.createElement('td');
          tableItemEl.textContent = lbsThisHour[j];
          logRowEl.appendChild(tableItemEl);
      }
    }
  }
}

var locations = [];
locations[0] = ['Capitol Hill', 3.2, .4, 32, 48];
locations[1] = ['Pike Place Market', 1.2, 3.7, 14, 55];
locations[2] = ['Seattle Public Library', 2.6, .2, 49, 75];
locations[3] = ['Sea Tac', 1.1, 2.7, 68, 124];
locations[4] = ['website', 0, 6.7, 3, 6];


function writeActivityLog(myLocations){
  for (var i = 0; i < myLocations.length; i++) {
    var locationObject = new shopLocation(myLocations[i]);
    myLocations[i] = locationObject;
    locationObject.renderActivityLog();
  }
  console.dir(myLocations);
}
writeActivityLog(locations);



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
