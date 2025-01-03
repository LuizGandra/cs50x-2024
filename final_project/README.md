# Am I The Asshole?

## Links
[Video Demo](https://youtu.be/xiHhJdtKCQE)
[Site](https://amitheasshole.vercel.app/)

## Description
"Am I The Asshole?" is a very popular subreddit where people share their own stories so that forum members can vote on whether or not the person was an asshole. The subreddit currently has 23 million users.

With this in mind, I decided to build a Daily Game web application based on the forum using **React with Vite** and **Node.js** for the API, using **Redis and MongoDB** for storage. Every day, there is a new story that players can vote on and see how others voted.

### Front-end (aita-game-web)
**Technologies used:** React with Vite, HTML, CSS with Styled Components, JavaScript and Bootstrap components.

#### Featured Files
*Important files for the project, which I thought would be interesting to comment on! I left out standard Vite configuration files, such as package.json.*

- `src/App.js` is the main component of the project.
- `src/i18n.js` is the configuration file for i18n, an internationalization library that I used to support more than one language on the site.
- `src/styles.js` is the stylesheet for App.js. It was created using the Styled Components library.
- `src/styles/global.css` is the style sheet with general styles for the entire application.
- `src/styles/queries.css` is the style sheet that takes care of media queries, ensuring the site's responsiveness for all screen sizes.
- `src/store/languages.js` contains the Select component used to select languages ​​in the settings.
- `src/store/api-urls.js` contains the API routes.
- `src/store/locales` contains the JSON files with the texts for the supported languages, Brazilian Portuguese and English.
- `src/components` contains the folders of the components that I reused in various places in the project. Each component folder has an index.js file, which is the main component file, a styles.js file, which is the styling file using Styled Components, and perhaps an additional styles.css file used to override some of the default styles for Bootstrap modals.
- `src/components/Button` is the folder that contains the button component files. It has been used in different files.
- `src/components/CustomModal` is the folder that contains the customizable modal component files, used mainly for configuration and help modals.
- `src/components/ResultsModal` is the folder that contains the files for the modal that displays the voting results in a chart.
- `src/components/Spinner` is the folder that contains the loading spinner files that may appear when opening the website if the server is slow.
-`public/` is the public folder for Vite. It contains the favicon file, the site's base index.html, and other files related to Google AdSense, which I was just learning how to use.

### Database
**Technologies used:** MongoDB and Redis.
For data storage, I used **MongoDB** and **Redis**. Redis is used to store the day's story votes in real time. At the end of the day, using a NodeCron task in the API, the story votes that are in Redis are stored in MongoDB definitively. Redis is then reset and prepared for the next story.

The use of Redis was designed to reduce the number of updates made directly to the database. Thus, the history undergoes a single update, at the end of the day, when voting ends. In Redis, therefore, there are three keys, one for each possible vote: vote-yes, vote-mi and vote-no.

#### Collections
The MongoDB database has a single collection, called Story. It has the following fields:

- _id: the document ID.
- day: the day on which the story will be displayed.
- titleEn: the story title in English.
- titlePtbr: the story title in Portuguese.
- textEn: the story text in English.
- textPtbr: the story text in Portuguese.
- results: an array with three values, containing the voting values ​​for the three possible votes.

### Back-end (aita-game-api)
**Technologies used:** Node.js with JavaScript.

#### Featured Files
*Important files for the project, which I thought would be interesting to comment on! I left out default configuration files like package.json and the node_modules folder.*

- `day.json` is the JSON file that controls which day the game is on. This way, it is possible to know which story should be pulled from the database.
- `.env` is the hidden file that contains the environment variables. The only variables present in it are those needed by Redis.
- `src/tasks/scheduler.js` is the file that contains the logic to get the data from Redis and save it to MongoDB using NodeCron.
- `src/database/index.js` is the connection file to MongoDB.
- `src/config/redisConfig.js` is the Redis connection file.
- `src/app/controllers/` is the folder that contains the API controller layer files. 
- `src/app/controllers/index.js` is a file to automate the export of modules.
- `src/app/controllers/storyController` is the controller file of the Story model. It contains the routes related to Story (the only model in the application).
- `src/app/models/` is the folder that contains the API model layer files.
- `src/app/models/story.js` is the Story model file.
- `src/app/utils/index.js` is a file that contains helper functions for other parts of the code. It only has one function, getVoteKey, which associates a string with a specific key that I used in Redis to store the votes.