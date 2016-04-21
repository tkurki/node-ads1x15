var Ads1x15 = require('./')

var ads1x15 = new Ads1x15(1, 0x48)
ads1x15.readADCDifferential23(256, 32).then(function(d){
  console.log(d);
})
