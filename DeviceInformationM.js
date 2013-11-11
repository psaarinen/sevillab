var util = require('util');

var bleno = require('./index');


var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

console.log('bleno');



var ManufacturerName = function(){
	ManufacturerName.super_.call(this, {
		uuid:'2A29',
		properties: ['read'],
		value: new Buffer('Smartifier LLC'),
	});
}
util.inherits(ManufacturerName, BlenoCharacteristic);


var ModelNumber = function(){
	ModelNumber.super_.call(this, {
		uuid:'2A24',
		properties: ['read'],
		value: new Buffer('00001'),
	});
}
util.inherits(ModelNumber, BlenoCharacteristic);

var SerialNumber = function(){
	SerialNumber.super_.call(this, {
		uuid:'2A25',
		properties: ['read'],
		value: new Buffer('123456'),
	});
}
util.inherits(SerialNumber, BlenoCharacteristic);

var HardwareRevision = function(){
	HardwareRevision.super_.call(this, {
		uuid:'2A27',
		properties: ['read'],
		value: new Buffer('SM001'),
	});
}
util.inherits(HardwareRevision, BlenoCharacteristic);

var FirmwareRevision = function(){
	FirmwareRevision.super_.call(this, {
		uuid:'2A26',
		properties: ['read'],
		value: new Buffer('SFM001'),
	});
}
util.inherits(FirmwareRevision, BlenoCharacteristic);

var SoftwareRevision = function(){
	SoftwareRevision.super_.call(this, {
		uuid:'2A28',
		properties: ['read'],
		value: new Buffer('SM001'),
	});
}
util.inherits(SoftwareRevision, BlenoCharacteristic);

var SystemID = function(){
	SystemID.super_.call(this, {
		uuid:'2A23',
		properties: ['read'],
		value: new Buffer('123456FFFE9ABCDE', 'hex'),
	});
}
util.inherits(SystemID, BlenoCharacteristic);

// var RegulatoryCertification = function(){
//	RegulatoryCertification.super_.call(this, {
//		uuid:'2A2A',
//		properties: ['read'],
//		value: new Buffer('Experimental'),

//	});
//}
//util.inherits(RegulatoryCertification, BlenoCharacteristic);

//var DeviceName = function(){
//	DeviceName.super_.call(this, {
//		uuid:'2A00',
//		properties: ['read'],
//		value: new Buffer('SmartMotion'),
//
//	});
//}
//util.inherits(DeviceName, BlenoCharacteristic);

// var Appereance = function(){
//	Appereance.super_.call(this, {
//		uuid:'2A01',
//		properties: ['read'],
//		value: new Buffer('161'),

//	});
//}
//util.inherits(Appereance, BlenoCharacteristic);






function DeviceInformationService(){
	DeviceInformationService.super_.call(this, {
	uuid: '180A',
	characteristics: [
	new ManufacturerName(),
	new ModelNumber(),
	new SerialNumber(),
	new HardwareRevision(),
	new FirmwareRevision(),
	new SoftwareRevision(),
	new SystemID()
//	new RegulatoryCertification()
	]
});
}

util.inherits(DeviceInformationService, BlenoPrimaryService);

//function GenericAccessService(){
//	GenericAccessService.super_.call(this, {
//	uuid: '1800',
//	characteristics: [
//	new DeviceName()
//	new Appereance()
//	]
//});
//}

//util.inherits(GenericAccessService, BlenoPrimaryService);

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
//   new GenericAccessService(),
    new DeviceInformationService()

  ]);
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function() {
  console.log('on -> servicesSet');
});
