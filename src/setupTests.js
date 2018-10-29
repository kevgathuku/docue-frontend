import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const sessionstorage = require('sessionstorage');
const localStorage = require('localStorage');

global.localStorage = localStorage;
global.sessionStorage = sessionstorage;

Enzyme.configure({ adapter: new Adapter() });
