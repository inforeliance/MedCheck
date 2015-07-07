# Development Artifacts

### Whiteboard & Brainstorming
Artifact | Evidence 
--- | --- 
Page Functions | [Page Functionality Breakdown](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/PageFunctionWhiteboard.JPG)
Architecture Whiteboard | [Overall Architecture](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/ArchitectureWhiteboard.jpg)
IaaS Planning | [AWS IaaS Planning](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/IaaSplanWhiteboard.jpg)
Final Diagram | [Final Diagram](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/ArchitecturalDiagram.png)

### Continuous Monitoring
Artifact | Evidence 
--- | --- 
Code Climate | [Screenshot](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/CodeClimateMonitoring.png)
Code Climate | [Live Link](https://codeclimate.com/github/inforeliance/MedCheck)

### Analytics
Artifact | Evidence 
--- | --- 
Google | [Daily Report](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/GoogleAnalytics.pdf)
Google Dashboard | [Overview](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/GoogleAnalyticsOverview.png)
Google Dashboard | [Location Reporting](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/GoogleAnalyticsLocation.png)
Google Dashboard | [Mobile Devices](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/GoogleAnalyticsMobile.png)

### Development Setup

MedCheck requires the following software is installed:

MongoDB, NodeJS, npm (ships with NodeJS), Bower and Grunt-CLI.  To check you have the latest or greater version, run the following command from terminal:

`$  mongo --version && node --version && npm --version && bower --version && grunt --version`

At the time of this document, the following are the versions used to build:

`MongoDB shell version: 3.0.4
node v0.12.3
npm 2.10.1
bower 1.4.1
grunt-cli v0.1.13
grunt v0.4.5`

Download the MedCheck repo to your local development environment.  In Terminal, navigate to the `Source` directory and begin updating the project dependencies using the following commands:

`$ npm update`

`$ bower update`

To run MedCheck in a browser run the following Grunt command:

`$ grunt serve`

To build MedCheck, run the following Grunt command:

`$ grunt build`

For Testing using Karma which will install on nmp update, verify unit tests with:

`$ grunt test`


### Development Environment Container Deployment 

On Windows, run docker commands inside `boot2docker` or a similar system.

- Clone the git repo: `git clone https://github.com/inforeliance/MedCheck`
- In the `MedCheck/Source` directory, run `docker build -t inforeliance/medcheck .`. The first run will take a while.
- Start a mongo container with `docker run -d --name medcheckdb mongo`
- Start the MedCheck container just built with `docker run -d --name medcheck --link medcheckdb:db -p 9000:9000 inforeliance/medcheck`
- You can visit the MedCheck web UI in a browser (for me, it's at `http://192.168.59.103:9000`) on port 9000


