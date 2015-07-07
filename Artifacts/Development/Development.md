# Development Artifacts

### Whiteboard & Brainstorming
Artifact | Evidence 
--- | --- 
Page Functions | [Page Functionality Breakdown](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/PageFunctionWhiteboard.JPG)
Architecture Whiteboard | [Overall Architecture](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/ArchitectureWhiteboard.jpg)
PaaS Planning | [AWS IaaS Planning](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Files/IaaSplanWhiteboard.jpg)
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


### PaaS Deployment

### Development Environment Container Deployment 

On Windows, run docker commands inside `boot2docker` or a similar system.

- Clone the git repo: `git clone https://github.com/inforeliance/MedCheck`
- In the `MedCheck/Source` directory, run `docker build -t inforeliance/medcheck .`. The first run will take a while.
- Start a mongo container with `docker run -d --name medcheckdb mongo`
- Start the MedCheck container just built with `docker run -d --name medcheck --link medcheckdb:db -p 9000:9000 inforeliance/medcheck`
- You can visit the MedCheck web UI in a browser (for me, it's at `http://192.168.59.103:9000`) on port 9000


