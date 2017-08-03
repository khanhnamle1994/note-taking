const chalk = require('chalk');
const inquirer = require('inquirer');
const Random = require('meteor-random');
const Cosmic = require('cosmicjs');

var config = {};
config.bucket = {
  slug: process.env.COSMIC_BUCKET,
  read_key: '',
  write_key: ''
}

const MainMenu = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Main Menu',
      choices: [
        'New Note',
        'View Notes',
        new inquirer.Separator(),
        'Exit'
      ]
    }
  ).then((answers)=>{
    if(answers.mainMenu === "New Note"){
      NewNote()
    } else if(answers.mainMenu === "View Notes"){
      ViewNotes()
    } else {
      process.exit()
    }
  })
}
MainMenu()

const NewNote = () => {
  var question = {
    type: 'input',
    name: 'note_text',
    message: 'Note'
  } // 1
  inquirer.prompt(question).then((answers) => { // 2
    var params = {
      write_key: config.bucket.write_key,
      type_slug: 'notes',
      slug: Random.id().toLowerCase(),
      title: answers.note_text,
      content: ''
    } // 3
    if(answers.note_text === ''){
      console.log(chalk.red("You cannot add an empty note"))
      MainMenu()
      return;
    }
    Cosmic.addObject(config, params, (error, response) =>{ // 4
      if(response.object){
        console.log(chalk.green("\u2713" + " Success"))
      }
      if(error){
        console.log(error)
      }
      MainMenu() //5
    })
  })
}
