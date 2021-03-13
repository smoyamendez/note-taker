//  DEPENDENCIES
const express = require('express');
const path = require('path');

// EXPRESS CONFIG: tells node we are creating an express server
const app = express();

// PORT setup
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER: Points server to route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// LISTENER
app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT: ${PORT}`);
});