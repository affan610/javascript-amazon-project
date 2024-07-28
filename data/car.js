class Car {
    speed = 0;
    brand;
    model;
    overspeed;
    isTrunkOpen;
    constructor(carDetails) {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.isTrunkOpen = carDetails.isTrunkOpen;
    }
    go() {
        if (!this.isTrunkOpen) {
            this.speed += 5;
        }
        if (this.speed >= 200) {
            this.speed = 200;
        }
    }
    brake() {
        this.speed -= 5;
        if (this.speed <= 0) {
            this.speed = 0;
        }
    }
    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? "open" : "closed";
        console.log(
            ` ${this.brand} ${this.model} Speed: ${this.speed} km/h Trunk: ${trunkStatus}`
        );
    }
    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
}
class RaceCar extends Car {
    acceleration;
    constructor(productDetails) {
        super(productDetails);
        this.acceleration = productDetails.acceleration;
    }
    displayInfo() {
        console.log(` ${this.brand} ${this.model} Speed: ${this.speed} km/h`);
    }
    go() {
        this.speed += this.acceleration;

        if (this.speed >= 300) {
            this.speed = 300;
        }
    }
}
let toyotaCar = new Car({
    brand: "Toyota",
    model: "Corolla",
    isTrunkOpen: true,
});
let teslaCar = new Car({
    brand: "Tesla",
    model: "Model 3",
    isTrunkOpen: false,
});
let McLarenCar = new RaceCar({
    brand: "McLaren",
    model: "F1",
    acceleration: 20,
});
toyotaCar.displayInfo();
teslaCar.displayInfo();
McLarenCar.displayInfo();