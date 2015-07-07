# Testing Artifacts

## Test Cases
Artifact | Evidence 
--- | --- 
Test Cases | [User Test Case Template](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Testing/Files/Test Cases.pdf)
Test Cases | [Tester Completed](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Testing/Files/MedCheck Test Case Scenarios_Glau1.pdf)

## Run Unit Tests
- Navidate to Source directory 
- From a command prompt run: `$ grunt test`

Artifact | Evidence 
--- | --- 
Unit Test Begin | [Running Grunt Test](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Testing/Files/UnitTesting.png)
Unit Test Results | [Test Results](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Testing/Files/UnitTestingResult.png)


## Selenium/e2e Test Setup
- `npm install -g protractor`
- `webdriver-manager update`
- `webdriver-manager start`
- From the e2e test directory that you're using: `protractor conf.js`