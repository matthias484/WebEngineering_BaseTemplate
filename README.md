# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file. 

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

Present your findings here...
``` JS
console.log('Make use of markdown codesnippets to show and explain good/bad practices!')
```


### Bad Coding Practices and How They Were Fixed

#### 1. **Callback Hell (Deeply Nested `.then()` Chains)**
**Problem**: The original code relied heavily on `.then()` methods, leading to deeply nested callbacks, commonly known as "callback hell." This made the code harder to read, maintain, and debug.

**Why it’s bad**: Callback hell reduces readability and increases cognitive load, making it difficult to follow asynchronous operations. It also makes debugging more complex as the nesting grows.

**Fix**: Replaced the `.then()` chains with `async/await` to flatten the structure and make the code easier to follow, improving readability and manageability.

---

#### 2. **Repeated Use of `function` Syntax**
**Problem**: The original code used the traditional `function` keyword instead of modern arrow functions. While not incorrect, it's considered outdated in modern JavaScript development.

**Why it’s bad**: The `function` keyword does not bind `this` to the lexical context, which can cause issues with scope in asynchronous code or event handlers. Arrow functions provide a more concise syntax and avoid `this` binding issues.

**Fix**: Replaced traditional function declarations with arrow functions for more modern and concise syntax, while preventing potential scope issues.

---

#### 3. **Inefficient UI Updates**
**Problem**: The original code updated the UI every time a bear's image URL was fetched, causing multiple DOM manipulations, which is inefficient.

**Why it’s bad**: Frequent DOM updates can lead to performance issues, particularly when rendering a large amount of data. Each manipulation can cause the browser to repaint or reflow the page, resulting in slower performance.

**Fix**: Refactored the code to first collect all the bear data and then update the UI once after all data processing is complete. This reduces the number of DOM manipulations and improves performance.

---

#### 4. **Lack of Proper Error Handling**
**Problem**: The original code lacked proper error handling for fetch requests. If an error occurred (e.g., network issues or an invalid API response), the program could fail silently, leaving users unaware of the problem.

**Why it’s bad**: Without proper error handling, errors may go unnoticed, leading to unpredictable behavior and making debugging difficult. It can also degrade user experience by not informing them of issues.

**Fix**: Added `try/catch` blocks around asynchronous calls to catch and handle errors properly, ensuring meaningful feedback for both users and developers. Also, added checks for image URL availability, using a fallback image if the URL is not accessible.

---

#### 5. **Lack of Modularity**
**Problem**: The original code mixed different responsibilities (e.g., UI manipulation and data fetching) in the same functions.

**Why it’s bad**: Mixing concerns violates the principle of separation of concerns, making the code harder to test, maintain, and scale. It also makes debugging and modifying specific functionality more difficult.

**Fix**: Split the logic into separate modules to handle different concerns, such as fetching data, manipulating the UI, and handling events, resulting in more modular, testable, and maintainable code.

---

#### 6. **Use of `var` Instead of `const` or `let`**
**Problem**: The original code used `var` for variable declarations, which is outdated and can lead to issues due to function-level scoping and hoisting.

**Why it’s bad**: `var` can cause unintended variable reassignments and hoisting issues, making the code harder to reason about. Modern JavaScript uses `const` and `let`, which provide block-level scope, reducing the risk of such bugs.

**Fix**: Replaced `var` with `const` for variables that don’t change, and `let` for variables that may be reassigned. This improves code clarity and reduces potential bugs related to scoping.








## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

Present your findings here...

### Key Improvements Introduced by Using TypeScript Instead of JavaScript

1. **Static Typing**
  - **Why it's better**: TypeScript provides static typing, meaning you define variable types upfront. This helps catch errors early, during development, by preventing type mismatches.
  - **Example**: When a function expects a string, like `fileName: string`, TypeScript ensures only strings are passed, reducing the chances of runtime issues.

2. **Early Error Detection**
  - **Why it's better**: The TypeScript compiler checks for errors such as incorrect types or undefined/null values before the code runs, reducing bugs at runtime.
  - **Example**: When accessing elements like `moreBearsSection`, TypeScript ensures that you handle the case where it might be `null`, avoiding unexpected errors.

3. **Improved Code Readability**
  - **Why it's better**: TypeScript serves as in-line documentation by clearly defining variable and function types, making the code easier for developers to read and understand.
  - **Example**: A function that returns `Promise<string | undefined>` tells future developers exactly what to expect without needing additional comments.

4. **Safer DOM Manipulation**
  - **Why it's better**: TypeScript forces you to account for the possibility of `null` or `undefined` when accessing DOM elements, making it safer to manipulate the page structure.
  - **Example**: When manipulating `toggleComments`, TypeScript ensures elements like `showHideBtn` are present before trying to modify them.

5. **Better Refactoring Support**
  - **Why it's better**: TypeScript's strong typing system makes it easier to refactor code, ensuring any changes you make are reflected throughout the codebase, reducing the risk of breaking other parts.
  - **Example**: If you rename a variable or function, TypeScript will alert you to any broken references elsewhere in the code.

By using TypeScript, your code becomes more reliable, safer, and easier to maintain, leading to fewer bugs and a smoother development process.


## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

*Present your reports here.*


### Findings
When testing the current color contrast between text and background, several low-contrast cases were identified, particularly with navigation links and the search field label. These low-contrast issues affect readability and accessibility for users with visual impairments.

### Fixes
To meet color contrast requirements, the following adjustments were made:
1. **Navigation**: The background color was set to a bold dark blue (#1e40af), with white text (#ffffff) in the navigation links to ensure high contrast.
2. **Search Field**: A more visible label with higher contrast (#ffffff on #1e40af) was added to the search field to improve accessibility.



**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

*Present your reports here.*

**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

*Present your findings and fixes here.*

The `<audio>` element is inaccessible to deaf or hearing-impaired users, as there is no alternative representation of the audio content. To improve this, a text transcript of the audio should be provided to fully describe its content.

### Fixes
A written transcript was added below the `<audio>` element to make the audio content accessible. The transcript provides key information discussed in the audio, allowing users with hearing impairments to access the information.


**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

*Present your findings and fixes here.*

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

*Present your findings and fixes here.*

#### Findings
The "Show comments" control button was not accessible via keyboard. This meant that users could not navigate to it using the `Tab` key or activate it with the `Enter` key. This lack of keyboard accessibility made it difficult for users relying on keyboard navigation to interact with the comments section.

#### Fixes
To address this issue, the following adjustments were made:
1. **Tab Focusability**: Added `tabindex="0"` to the button to make it accessible via the `Tab` key.
2. **Keyboard Activation**: Implemented an `onkeydown` event listener to allow activation with the `Enter` key, enabling users to toggle the comments section without a mouse.
3. **ARIA Role and State**: Added `role="button"` and `aria-pressed` attributes to improve screen reader accessibility. The `aria-pressed` attribute dynamically updates to indicate the expanded or collapsed state of the comments section.

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

*Present your findings and fixes here.*
#### Findings
The data table is not currently accessible for screen reader users. There are two main issues:
1. **Lack of Accessible Summary**: The table does not have a summary or caption to describe its content, making it unclear for users who rely on screen readers.
2. **Association Between Data and Headers**: While the column headers use `<th>` elements with `scope="col"`, which helps screen readers recognize the headers, additional context, such as row headers and captions, could improve accessibility.

#### Fixes
To address these issues, the following changes were made:
1. **Table Caption**: Added a `<caption>` element to provide a clear description of the table's purpose.
2. **Row Headers**: Converted the first column cells in each row (`Bear Type`) to `<th scope="row">` elements, helping screen readers associate each row with the "Bear Type" header.


**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`