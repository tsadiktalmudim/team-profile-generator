class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        if (!this.name) {
            console.log("Please enter the employee's name")
        }
        return this.name;
    }

    getId() {
        if (isNaN(this.name))
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;