class RoomService {

    static addRoom(room) {
        const db = Database.getData();
        db.rooms.push(room);
        Database.saveData(db);
    }

    static getRooms() {
        return Database.getData().rooms;
    }
}

class CustomerService {

    static addCustomer(customer) {
        const db = Database.getData();
        db.customers.push(customer);
        Database.saveData(db);
    }

    static getCustomers() {
        return Database.getData().customers;
    }
}
