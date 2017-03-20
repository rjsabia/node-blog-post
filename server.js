const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();
// log the http layer
app.use(morgan('common'));
//GET request
app.get('/blog-post', (req, res) => {
  res.json(Blogposts.get());
});
//CREATE
app.post('/blog-post', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, 
  		req.body.author, req.body.publishDate);
  res.status(201).json(item);
});
//PUT
app.put('/blog-post/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    name: req.body.title,
    budget: req.body.content,
    author: req.body.author,
    publishDate: publishDate
  });
  res.status(204).json(updatedItem);
});
//DELETE
app.delete('/blog-post/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post item \`${req.params.ID}\``);
  res.status(204).end();
});

//port
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});