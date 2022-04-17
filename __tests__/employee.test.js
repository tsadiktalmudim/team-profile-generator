// Using employee class
const Employee = require("../lib/employee");

// instantitating employee object
test("creates an employee object", () => {
    const employee = new Employee("Dave", 34, "daveb06@gmail.com");

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test("gets employee name from getName()", () => {
    const employee = new Employee("Dave", 34, "daveb06@gmail.com");

    expect(employee.getName()).toEqual(expect.any(String));
});

test("gets employee ID from getId()", () => {
    const employee = new Employee("Dave", 34, "daveb06@gmail.com");

    expect(employee.getId()).toEqual(expect.any(Number));
});

test("gets email from getEmail()", () => {
    const employee = new Employee("Dave", 34, "daveb06@gmail.com");

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

test("gets role from getRole()", () => {
    const employee = new Employee("Dave", 34, "daveb06@gmail.com");

    expect(employee.getRole()).toEqual("Employee");
});