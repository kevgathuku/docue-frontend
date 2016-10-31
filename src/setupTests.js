const sessionstorage = require('sessionstorage');
const localStorage = require('localStorage');

global.localStorage = localStorage;
global.sessionStorage = sessionstorage;
