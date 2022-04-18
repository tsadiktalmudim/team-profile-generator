//node modules required
const inquirer = require("inquirer");
const fs = require("fs");
// page template required
const generateHTML = require("./src/pageTemplate");
// classes required for the generation of team member objects
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");

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
        validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter your name!");
              return false;
            }
          },
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's employee ID?",
        validate: (idInput) => {
            if (isNaN(idInput)) {
                console.log("Please enter your employee ID!");
                return false;
            } else {
              return true;
            }
          },
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
        validate: (emailInput) => {
            if (emailInput) {
              return true;
            } else {
              console.log("Please enter your email address!");
              return false;
            }
          },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        validate: (numInput) => {
            if (isNaN(numInput)) {
                console.log("Please enter your email address!");
                return false;
            } else {
              return true;
            }
          },
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
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID number?",
        validate: (idInput) => {
            if (isNaN(idInput)) {
                console.log("Please enter your employee ID!");
                return false;
            } else {
              return true;
            }
          },
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: (emailInput) => {
            if (emailInput) {
              return true;
            } else {
              console.log("Please enter your email address!");
              return false;
            }
          },
      },
      {
        type: "input",
        name: "github",
        message: "What is the employee's github username?",
        when: (input) => input.role === "Engineer",
        validate: (userInput) => {
            if (userInput) {
              return true;
            } else {
              console.log("Please enter your github username!");
              return false;
            }
          },
      },
      {
        type: "input",
        name: "school",
        message: "What school is your intern attending?",
        when: (input) => input.role === "Intern",
        validate: (schoolInput) => {
            if (schoolInput) {
              return true;
            } else {
              console.log("Please enter the intern's school!");
              return false;
            }
          },
      },
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?",
        default: false,
      },
    ])
    .then((employeeInputs) => {
      // push data into chosen instantiation role choice
      const { name, id, email, github, school, addEmployee, role } =
        employeeInputs;
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
    });
};

// using "fs" to write the html file
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team has been successfully created and your webpage has been generated! Please check the index.html file located in the /dist folder."
      );
    }
  });
};

managerPrompt()
  .then(employeePrompt)
  .then((teamArr) => {
    console.log(teamArr);
    return generateHTML(teamArr);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
