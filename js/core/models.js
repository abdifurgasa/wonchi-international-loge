class Room {

    constructor(number, type, price, photo){

        this.id = Date.now();
        this.number = number;
        this.type = type;
        this.price = price;
        this.photo = photo;
        this.status = "available";
    }
}

class Customer {
    constructor(name, phone) {
        this.id = Date.now();
        this.name = name;
        this.phone = phone;
        this.date = new Date();
    }
}
