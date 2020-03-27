const axios = require('axios').default;
const fs = require('fs');

let getPage = async function(jokes, after) {

  const response = await axios.get(`https://www.reddit.com/r/ProgrammerDadJokes/top/.json?t=all&after=${after}`);

  let last = null;

  response.data.data.children.forEach((joke) => {

    joke = joke.data;
    last = joke.name;

    // Looking for completely self-contained jokes.
    // These filters remove links to images, other posts, etc.
    if(joke.crosspost_parent_list) { return; }
    if(joke.domain !== 'self.ProgrammerDadJokes') { return; }
    if(joke.selftext.indexOf('&') >= 0) { return; }
    if(joke.title.indexOf('&') >= 0) { return; }
    if(joke.title.indexOf('x-post') >= 0) { return; }
    if(joke.selftext.indexOf('x-post') >= 0) { return; }
    if(joke.title.indexOf('xpost') >= 0) { return; }
    if(joke.selftext.indexOf('xpost') >= 0) { return; }
    if(joke.selftext.indexOf('redd.it') >= 0) { return; }
    if(joke.selftext.indexOf('/u') >= 0) { return; }
    if(joke.selftext.indexOf('edit:') >= 0) { return; }
    if(joke.selftext.length > 100) { return; }
    if(joke.selftext.length > 0 && joke.selftext.length < 5) { return; }
    if(joke.selftext.length + joke.title.length < 12) { return; }

    jokes.push({
      title: joke.title,
      text: joke.selftext
    });

  });

  console.log(jokes.length);

  // If we haven't got enough jokes yet, request another page.
  if(jokes.length < 5000) {
    await getPage(jokes, last);
  }
};

let getAll = async function() {
  let jokes = [];
  await getPage(jokes, null);
  console.log(jokes);

  fs.writeFileSync('./jokes.json', JSON.stringify(jokes, undefined, 2));

};

getAll();