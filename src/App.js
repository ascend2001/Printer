import React, { useState } from 'react';
import PostDisplay from './PostDisplay';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const App = function () {
  const [post, setPost] = useState({
    author: '',
    body: '',
  });

  const HandleChange = function (event) {
    if (event.target.name === 'author') {
      setPost((prevValue) => ({ author: event.target.value, body: prevValue.body }));
    } else if (event.target.name === 'body') {
      setPost((prevValue) => ({ author: prevValue.author, body: event.target.value }));
    }
  };

  const HandleSubmit = function (event) {
    event.preventDefault();
    base('Posts').create([
      {
        fields: {
          Body: post.body,
          Author: post.author,
        },
      },
    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.getId());
      });
    });
  };
  return (
    <div className="printer-wrapper">
      <div>
        <p className="font-face-rblack">Printer </p>
        <form className="form-wrapper" onSubmit={HandleSubmit}>
          <input className="name-wrapper" placeholder="Your Name" type="text" name="author" value={post.author} onChange={HandleChange} />
          <textarea className="content-wrapper" name="body" rows="5" cols="105" value={post.body} placeholder="What's happening" onChange={HandleChange} />
          <br />
          <button className="submit-button" type="submit">Print</button>
        </form>
      </div>
      <PostDisplay />
    </div>
  );
};

export default App;
