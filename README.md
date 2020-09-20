
**GIMME5**

**THE PITCH:**

Gimme10 is an exercise app for writers who feel like they never have the time to get a new project off the ground. The app takes advantage of small periods of down time and prompts the user to begin flexing their creative thinking skills by having them brainstorm lists of five responses to various questions generated around a single word. The user can then use these responses to create vibrant and wholly original works. Eventually, I want this app to work as a sort of Writing Workshop you can fit in your pocket -- a helping hand that the user can grasp as they work their way from a glimmer of inspiration to a full-fledged first draft. Right now it's but a whisper of that vision.

**TECHNOLOGY USED**
* HTML
* CSS
* JQuery
* JavaScript
* API (WordsAPI to be specific -- *UPDATE: I wasn't happy with the words the API was generating so I added a noun and adjective libary to the program, itself. I got these libraries from http://www.ashley-bovan.co.uk. And they are spectacular!*)
* Local Storage
* Browserify

**THE DETAILS**

Gimme5 is a serverless app that manages to make the user's data persist through the use of local storage. It allows for the saving of one project along with all of the responses the user generates. If their train pulls into the station before they've finished working on a section, there's nothing to be concerned about. They can simply submit their latest answer, close the app, and when they come back next time and log in with the name of their current project they can pick up where they left off.

**APPROACH**

The app begins by having the user create a new project. When they do, the project name is added to local storage so it can be referenced when the user returns at a later time. Currently, the app only stores one project which I hardcoded as "Proj1" in the JavaScript code. This app is merely a prototype of a much bigger mobile-app I plan on building in the future, so I'm not presently concerned by the limits of this hard-coded approach.

After beginning a project, the user is taken to the next page where they are provided a randomly-generated phrase (an adjective and noun) along with a randomly-generated question (from an array I wrote in JavaScript) which asks the user to personify the phrase in some way. The user is then required to type 5 answers to the prompt, forcing them to work through their initial, often cliched, responses and develop some fresh material. These answers are saved to local storage as the user submits them.

The final stage, for now, takes the user to a new page where they are provided all their previous answers and asked to write a character description inspired by them. This description is saved to local storage upon hitting submit, and can be returned to later if the user needs to take a break in the middle of working on their character.

**UNSOLVED PROBLEMS**

One current problem is the quality of the words that the API generates. I chose this API because it is capable of allowing random word generation AND has a great filtering capability so I could filter by parts of speech. I only wanted nouns because they are capable of prompting more visual imagery in the writing. However, the API generates a LOT of pronouns as well as some truly archaic words. I fear this will turn many users away.

*UPDATE: As noted above, I am no longer using this API and am instead relying on my own hard-coded word libraries.*

The styling needs to be entirely re-thought as well. My focus was on functionality. Thematically I was trying to create a "workout" vibe for the app -- using "reps" and "sets" to refer to answers and questions. But visually it reads more like a Mother's Day card than it does a workout journal. I also wanted to create a feature where it "shouts" out encouragement as the user nears the end of each set -- something like "three more reps" or "almost there, power through". But I ran out of time. After seeing how the styling turned out, I think it would've just confused matters.

**PROJECT LINK**

https://cox512.github.io/gimme5/index.html