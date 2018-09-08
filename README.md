# Botbuilder Wolf Rive

As you build out your abilities with [Botbuilder Wolf](https://github.com/great-lakes/botbuilder-wolf), you'd want to test out your bot in an easy way.

** Now you can! **

With Wolf Rive, you can write readable test in one or multiple `.rive` files.

## How to use

**1. Install:**

```
npm install --save-dev botbuilder-wolf-rive jest
```


**2. Build your Rivescript Test File:**
> Note: Rivescript syntax is very easy to write  
`> topic` is the start of a test flow (Rivescript terminology: "topic").  
`+` is the start of a user utterance (Rivescript term: "trigger").  
`-` is the start of a bot response  
`^` is the start of a new line for the bot response

If you're using vscode, you can install the rivescript extension for language support.

Here is an example of two test flows:
```
> topic greeting
+ hi bot
- hello

> topic onboard
+ I need a flight
- where would you like to go?

+ Seattle, please
- ok! when would you like to leave?

+ tomorrow
- ok! Here are some flights:
^ * AA-2305 leaving 7am
^ * UA-103 leaving 9am
```

**3. Create your Test**
Behind the scenes, this test library is using Jest to run the tests.
And it needs to know a little more about your wolf configuration.

Create a new test files with the following code:

```js
/* global describe, test, expect */
import { parseRive, runWolfTests, createWolfRunner } from 'botbuilder-wolf-rive'
import abilities from '../abilities' // your abilities
import nlpWolf from '../nlp' // your nlp function

const wolfRunner = createWolfRunner(
  nlpWolf,
  () => abilities,
  'greet'
)

const demo = parseRive('./src/tests/demo.rive') // <=== Notice CWD is from the project root
// const sprint1 = parseRive('./src/tests/sprint1.rive')
// const sprint2 ...

describe('Testing Using Rivescripts!', () => {
  runWolfTests(demo, wolfRunner)
})
```

Both the nlp and ability functions can be async functions, however it will dramatically increase test duration if NLP is async.

## FAQ:
* **Why did you make this library?**
Testing is important, but testing a bot is not fun.  There seem to be a gap between unit testing very method of a bot and a full E2E test suite that requires the botbuilder.

This library aims to fill that gap for you.  It does not touch the bot `context`, and only test the wolf ability logic.

* **Why did you use Rivescript?**
It has an easy syntax that anyone can write.

* **Hey wolf-rive does not support feature X of Rivescript**
This library is not meant to replace wolf or botbuilder for that matter.  It is a way for a developer using Wolf to easily test the bot.