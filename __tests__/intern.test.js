// using the Intern class/constructor
const Intern = require("../lib/intern");

// creating intern object different from Employee
test("gets intern values different from Employee", () => {
    const intern = new Intern("Rick", 22, "ricky.ricardo@telemex.com", "Grand Canyon University");

    expect(intern.school).toEqual("Grand Canyon University");
});

test("gets school name from getSchool()", () => {
    const intern = new Intern("Rick", 22, "ricky.ricardo@telemex.com", "Grand Canyon University");

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test("gets role from getRole()", () => {
    const intern = new Intern("Rick", 22, "ricky.ricardo@telemex.com", "Grand Canyon University");

    expect(intern.getRole()).toEqual("Intern");
});