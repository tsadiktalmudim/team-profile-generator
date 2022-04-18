//node modules required
const inquirer = require("inquirer");
const fs = require("fs");
// page template required
const generatePage = require("./src/pageTemplate");
// classes required for the generation of team member objects
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const { off } = require("process");
const pageTemplate = require("../portfolio-generator/src/page-template");

// empty array to hold team within
const teamArr = [];

// start of prompts, adding the manager first
const managerPrompt = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
      },
    ])
    .then((managerInputs) => {
      const { name, id, email, officeNumber } = managerInputs;
      const manager = new Manager(name, id, email, officeNumber);

      teamArr.push(manager);
      console.log(manager);
    });
};

const employeePrompt = () => {
  return inquirer
  .prompt([
    {
      type: "list",
      name: "role",
      message: "What is this employee's role?",
      choices: ["Engineer", "Intern"],
    },
    {
      type: "input",
      name: "name",
      message: "What is the employee's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the employee's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the employee's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the employee's github username?",
      when: (input) => input.role === "Engineer",
    },
    {
      type: "input",
      name: "school",
      message: "What school is your intern attending?",
      when: (input) => input.role === "Intern",
    },
    {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?",
        default: false
    }
  ]).then(employeeInputs => {
      // push data into chosen instantiation role choice
    const { name, id, email, github, school, addEmployee } = employeeInputs;
    let employee;

    if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);

        console.log(employee);
    } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);

        console.log(employee);
    }
    teamArr.push(employee);

    if (addEmployee) {
        return employeePrompt(teamArr);
    } else {
        return teamArr;
    }
  })
};

// using "fs" to write the html file
const writeFile = data => {
    fs.writeFile("./dist/index.html", data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team has been successfully create and your webpage has been generated! Please check the index.html file located in the /dist folder.");
        }
    });
};

managerPrompt()
.then(employeePrompt)
.then(teamArr => {
    return pageTemplate(teamArr);
})
.then(pageTemplate => {
    return writeFile(pageTemplate);
})
.catch(err => {
    console.log(err);
});