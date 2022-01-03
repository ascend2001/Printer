import React, { useState, useEffect } from 'react';
import Post from './Post';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const PostDisplay = function () {
  const [entries, setEntries] = useState([]);

  const getPosts = function () {
    setEntries([]);
    base('Posts').select({
      view: 'Grid view',
    }).all().then((records) => { setEntries(records); });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="postBody">
      { entries.map((post) => <Post author={post.fields.Author} content={post.fields.Body} />)}

    </div>
  );
};

export default PostDisplay;
