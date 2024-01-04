// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use body-parser to parse JSON data from the request body
app.use(bodyParser.json());
// Use cors to handle CORS errors
app.use(cors());

// Create list of comments
const commentsByPostId = {};

// Create route for getting comments by post id
app.get('/posts/:id/comments', (req, res) => {
  // Get the post id from the request params
  const { id } = req.params;
  // Return the comments for the post id
  res.send(commentsByPostId[id] || []);
});

// Create route for creating a comment
app.post('/posts/:id/comments', (req, res) => {
  // Get the post id from the request params
  const { id } = req.params;
  // Get the content from the request body
  const { content } = req.body;
  // Create an id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the comments for the post id
  const comments = commentsByPostId[id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content });
  // Update the comments for the post id
  commentsByPostId[id] = comments;
  // Return the comments for the post id
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});