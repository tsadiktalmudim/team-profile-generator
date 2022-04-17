const Engineer = require("../lib/engineer");

// testing engineer object different from Employee
test("gets ingineer object", () => {
    const engineer = new Engineer("Darth", 38, "darth.vader84@gmail.com", "masterofthesith");

    expect(engineer.github).toEqual(expect.any(String));
});

test("gets engineer's github from getGithub()", () => {
    const engineer = new Engineer("Darth", 38, "darth.vader84@gmail.com", "masterofthesith");

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test("gets role from getRole()", ()=> {
    const engineer = new Engineer("Darth", 38, "darth.vader84@gmail.com", "masterofthesith");

    expect(engineer.getRole()).toEqual("Engineer");
});