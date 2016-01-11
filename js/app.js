// Javascript here

// var min=1;
// var max=10;
// console.log(0*(max-min +1) + min);
// console.log(1*(max-min +1) + min);

var capitolHill = {
  name: 'Capitol Hill',
  cupsPerCust: 3.2,
  lbsPerCust: .4,
  minCustPerHour: 32,
  maxCustPerHour: 48,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]'
      console.log(output);
    }
  }
}

var pikePlace = {
  name: 'Pike-Place Market',
  cupsPerCust:1.2,
  lbsPerCust:3.7,
  minCustPerHour: 14,
  maxCustPerHour: 55,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]'
      console.log(output);
    }
  }
}

var seattlePubLib = {
  name: 'Seattle Public Library',
  cupsPerCust:2.6,
  lbsPerCust:.2,
  minCustPerHour: 49,
  maxCustPerHour: 75,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]'
      console.log(output);
    }
  }
}

var southLakeUnion = {
  name: 'South Lake Union',
  cupsPerCust:1.3,
  lbsPerCust:3.7,
  minCustPerHour: 35,
  maxCustPerHour: 88,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]'
      console.log(output);
    }
  }
}

var seatac = {
  name: 'Sea-Tac Airport',
  cupsPerCust:1.1,
  lbsPerCust:2.7,
  minCustPerHour: 68,
  maxCustPerHour: 124,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]'
      console.log(output);
    }
  }
}

var website = {
  name: 'Website Sales',
  cupsPerCust:0,
  lbsPerCust:6.7,
  minCustPerHour: 3,
  maxCustPerHour: 6,
  poundsPerCup: .05,
  hours: ['8:00AM', '9:00AM', '10:00AM','11:00AM', '12 NOON', '1:00PM','2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'],
  getCustThisHour: function(){
    var customerNumber = Math.floor(Math.random()*(this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    //console.log('getCustThisHour ' + customerNumber);
    return customerNumber;
  },
  getLbsThisHour: function(){
    var customerNumber = this.getCustThisHour();
    var cups = Math.floor(this.cupsPerCust * customerNumber);
    var lbsInCups = Math.floor(cups * this.poundsPerCup);
    var lbsToGo = Math.floor(this.lbsPerCust * customerNumber);
    var totalLbs = lbsToGo + lbsInCups;
    //console.log('getLbsThisHour: ' + totalLbs);
    return [totalLbs, customerNumber, cups, lbsInCups, lbsToGo];
  },
  summarizeDay: function(){
    console.log(this.name + ': ');
    for(var i = 0; i < this.hours.length; i++){
      var lbsThisHour = this.getLbsThisHour();
      var output = this.hours[i] + ': ' + lbsThisHour[0] + ' lbs [' + lbsThisHour[1] + ' customers, ' + lbsThisHour[2] + ' cups (' + lbsThisHour[3] + '), ' + lbsThisHour[4] + ' lbs-to-go ]';
      console.log(output);
    }
  }
}

var locations = [capitolHill, pikePlace, seattlePubLib, seatac, website];
// capitolHill.summarizeDay();
// pikePlace.summarizeDay();
// seattlePubLib.summarizeDay();
// seatac.summarizeDay();
// website.summarizeDay();

for (var i = 0; i < locations.length; i++) {
  console.log(i);
  locations[i].summarizeDay();
}
