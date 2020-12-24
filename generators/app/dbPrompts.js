const validate = (input) => input.length > 0 || 'Please input a value';
const shouldPromptDb = ({ hasDb }) => hasDb;

module.exports = [
  {
    name: 'dbHost',
    type: 'input',
    when: shouldPromptDb,
    default: '',
    message: 'Input your database host',
    validate,
  },
  {
    name: 'dbPort',
    type: 'input',
    when: shouldPromptDb,
    default: '30023',
    message: 'Input your database port',
    validate,
  },
  {
    name: 'dbName',
    type: 'input',
    when: shouldPromptDb,
    default: '',
    message: 'Input your database name',
    validate,
  },
  {
    name: 'dbUser',
    type: 'input',
    when: shouldPromptDb,
    default: '',
    message: 'Input your database user',
    validate,
  },
  {
    name: 'dbPassword',
    type: 'input',
    when: shouldPromptDb,
    default: '',
    message: 'Input your database password',
  },
  {
    name: 'repository',
    type: 'confirm',
    when: shouldPromptDb,
    default: true,
    message: 'Would you like to generate an example repository for your database?',
  },
];
