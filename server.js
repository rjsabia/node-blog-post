const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const blogRouter = require('./blog.router');
const app = express();
// log the http layer
app.use(morgan('common'));

app.use('/blog-post', blogRouter);

//port
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});