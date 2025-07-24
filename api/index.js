// api/index.js
require('dotenv').config();
console.log('🔍 ENV – MONGODB_URI:', process.env.MONGODB_URI);
const app = require('../server'); // or '../app'
module.exports = app;
