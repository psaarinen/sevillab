var util = require('util');

var bleno = require('./index');


var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

console.log('bleno');







var DeviceName = function(){
DeviceName.super_.call(this, {
	uuid:'2A00',
		properties: ['read'],
		value: new Buffer('SmartMotion'),

	});
}
util.inherits(DeviceName, BlenoCharacteristic);

 var Appereance = function(){
	Appereance.super_.call(this, {
		uuid:'2A01',
		properties: ['read'],
		value: new Buffer('0x0200')

	});
}
util.inherits(Appereance, BlenoCharacteristic);








function GenericAccessService(){
	GenericAccessService.super_.call(this, {
	uuid: 'fffffffffffffffffffffffffffffff1',
	characteristics: [
	new DeviceName(),
	new Appereance()
	]
});
}

util.inherits(GenericAccessService, BlenoPrimaryService);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('test', ['fffffffffffffffffffffffffffffff0']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function() {
  console.log('on -> advertisingStart');

  bleno.setServices([
   new GenericAccessService()
//    new DeviceInformationService()

  ]);
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function() {
  console.log('on -> servicesSet');
});
