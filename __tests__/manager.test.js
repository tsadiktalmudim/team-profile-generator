// Using manager class/constructor
const Manager = require("../lib/manager");

// creating tests for manager object, different from Employee
test("creates new manager object", () => {
    const manager = new Manager("Mike", 42, "michael.manning@iservworld.com");

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets role from getRole()", () => {
    const manager = new Manager("Mike", 42, "michael.manning@iservworld.com");

    expect(manager.getRole()).toEqual("Manager");
});