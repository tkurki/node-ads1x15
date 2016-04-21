var i2c = require('i2c-bus');
var Promise = require('bluebird');

function I2C(address) {
  this.address = address;
  this.wirePromise = new Promise(function(resolve, reject) {
    var theWire = i2c.open(1, function(err) {
      if (err)
        reject(err);
      else {
        resolve(theWire);
      }
    })
  })
}

I2C.prototype.writeBytes = function(command, bytes, cb) {
  var addr = this.addr;
  this.wirePromise.then(function(wire) {
    var buffer = new Buffer(bytes);
    wire.writeI2cBlock(0x48, command, bytes.length, buffer, cb);
  })
}

I2C.prototype.readBytes = function(command, length, cb) {
  this.wirePromise.then(function(wire) {
    var buffer = new Buffer(length);
    wire.readI2cBlock(0x48, command, length, buffer, function(err) {
      cb(err, buffer);
    })
  })
}
module.exports = I2C;
