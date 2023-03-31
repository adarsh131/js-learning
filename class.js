"use strict";
class Car{
    constructor(name,year)
    {
        this.name=name;
        this.year=year;
    }
    Cars()
    {
        console.log(this.name);
    }
}
var ob = new Car("audi",2020);
ob.Cars();