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
