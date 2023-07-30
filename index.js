// required packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// connect to utils folder
const generateMarkdown = require("./utils/generateMarkdown");
const licenseBadge = require("./utils/licenseBadge").licenseBadge;
//Allows for use of async await
const writeFileAsync = util.promisify(fs.writeFile);

// questions
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a short description of your project:",
  },
  {
    type: "input",
    name: "installation",
    message: "Installation instructions for your project?",
  },
  {
    type: "input",
    name: "clone",
    message: "Link to clone the repo?",
  },
  {
    type: "list",
    name: "license",
    message: "What license did you use?",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla",
      "MIT",
      "Apache",
      "Boost",
    ],
  },
  {
    type: "input",
    name: "test",
    message: "What testing protocols did you use?",
  },
  {
    type: "input",
    name: "author",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "userName",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "userEmail",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "URL",
    message: "What is the URL of your deployed site?",
  },
  {
    type: "input",
    name: "repo",
    message: "What is the URL of the github repo?",
  },
];

// function to create readme
async function init() {
  try {
    const answers = await inquirer.prompt(questions);
    answers.licenseBadge = licenseBadge(answers.license);
    let readMeData = generateMarkdown(answers);
    await writeFileAsync("created-README.md", readMeData);
  } catch (err) {
    throw err;
  }
}

// function call to initialize program
init();