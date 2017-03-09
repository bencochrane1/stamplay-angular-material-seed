# Stamplay Angular Material Seed Project
A starter project for Stamplay apps built with AngularJS and uses Material Design UI

### Setup Instructions

- Clone project : `git clone https://github.com/bencochrane1/stamplay-angular-material-seed`

- NOTE! : If you want to use version 1.x of the Stamplay JavaScript SDK, checkout the branch after cloning with the following command:
	`git checkout v1-sdk`

- Install the project dependencies : `npm install` & `bower install`

- Configure Stamplay Project : Input your `APP ID` and `API KEY` from your Stamplay app dashboard in the corresponding properties in the `stamplay.json` file in the root of the seed project.

- Create a new **Object** schema on Stamplay, named "**note**", with a properties of **title**, **image** and **link** all as a *string*.


### Running locally for development

- Start development build : `gulp dev`

- Start development server : `stamplay start` & navigate to `localhost:8080`

### Deploying the project

- Start production build : `gulp build`

- Run Stamplay CLI command : `stamplay deploy`


#### Preview
<img src="https://preview.ibb.co/e3KnVa/screencapture_localhost_8080_1489051232103.png" style="border:2px solid #eee;"/>
