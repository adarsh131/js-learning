const events = require("events");

let emitter=new events.EventEmitter();

emitter.on('abc',() => 
{
    console.log('hello');
});

emitter.emit('abc');