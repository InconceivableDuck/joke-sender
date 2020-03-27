# joke-sender
Sends an SMS with a random joke from the top 5,000 posts in [r/ProgrammerDadJokes](https://www.reddit.com/r/ProgrammerDadJokes/).

> My dentist started using Linux
> 
> Now he won't stop talking about how I need to use more FOSS


## Getting the Jokes
This repo contains a Node script in the `joke-getter` folder that uses the [Reddit API](https://www.reddit.com/dev/api/) to request entries from [r/ProgrammerDadJokes](https://www.reddit.com/r/ProgrammerDadJokes/), sorted by all time top posts.

The script skips posts that are not "self-contained", which means the post text is not the entire contents of the joke (images, videos, etc). The script runs until it finds 5,000 jokes, which are written to a `jokes.json` file.

You can find the resulting `jokes.json` file in this repo at `/joke-sender/files/jokes.json`.

## Sending the Jokes
The `joke-sender` folder in this repo is a [Losant Application Template](https://docs.losant.com/templates/overview/). This template contains the workflow that pulls a random joke from `jokes.json` and sends it via SMS.

If you want to use this template yourself:
1. Zip the `jokes-sender` folder.
2. Use Losant's [Application Import](https://docs.losant.com/applications/import-export/#importing-an-application) and upload the zip.

Disclaimer: I work for [Losant](https://www.losant.com).

## Some More Jokes

> What do you call importing a newly released Java package?
> 
> Robbing the Gradle.

---

> I am declaring a war
> 
> var war;

---

> Why did the node dev give up acting?
> 
> The callbacks were hell.

---

> What do you get when you drop a Linux box in boiling oil?
> 
> Kentucky Fried Kernel