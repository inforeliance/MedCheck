<img src="https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Project/IR%20MedCheck.png"
 alt="InforReliance and MedCheck logo" height="120px" title="InfoReliance MedCheck" align="left" /><BR><BR><BR><BR><BR><BR>

 ![build image](https://travis-ci.org/inforeliance/MedCheck.svg "Build status") [![Code Climate](https://codeclimate.com/github/inforeliance/MedCheck/badges/gpa.svg)](https://codeclimate.com/github/inforeliance/MedCheck)

## MedCheck
http://elb-medcheck-2043620629.us-east-1.elb.amazonaws.com/

## Introduction
We are very pleased to respond to this unique Request for Quotation 4QTFHS150004 for Agile Delivery Services (ADS I). Headquartered in Fairfax Virginia, InfoReliance is a leader in iterative development methodologies and experts in delivering user-centered design, agile software development and Development Operations for the Federal Government.  Today we are a prime BPA holder on contracts worth over $100M for the Department of Health and Human Services, the Department of Labor and the Department of Homeland Security. We have a history of solving difficult problems in creative ways for our clients and we are very proud to present our prototype and approach.   

## Approach
During the kickoff we evaluated the project design requirements and established a [project vision](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Project Planning/MedCheck Project Planning.docx). We wanted to build a prototype that would meet the needs of this solicitation and potentially have real-world application. In other words, pass the “I would use that” test. With this in mind, our prototype, MedCheck is designed to enable users to confirm if FDA-approved drugs are safe. The prototype lets the user enter allergens, age, and pregnancy status, then enter a drug name or scan the barcode to instantly view personal risks. 

Our [development approach](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Project Planning/MedCheck Project Planning.docx) included implementing four (4 day) sprints with one release to production.  We held twice-daily scrum meetings due to the short timeline. During the meetings, we discussed our progress, our goals and any issues.  The team used Agilefant as the sprint planning tool. 

![Sprint Plan](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Project Planning/MedCheckHighLevelSchedule.png)


## Staffing
When the RFQ was released we immediately identified the team and set up a project kickoff.  Given the scope and timeframe we kept the team lean with [6 multidiscipline individuals](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Project Planning/MedCheck Project Team.docx). The Product Manager (PM) had full authority, was responsible for delivering the prototype, established prototype goals, and translated them into user stories for the project backlog. The PM also obtained the project resources. The Business Analyst also served as the ScrumMaster and tester.  The BA worked with the PM to elaborate user stories, clarified questions from the team, helped resolve issues, and performed verification and usability tests with stakeholders. The Technical Architect (TA) established the technology stack and built the foundation for the application. The TA led the development team for each sprint. The Interaction Designer/User Researcher/Usability Tester translated the backlog items into visual diagrams and was responsible for overall branding and design. Frontend/Backend developers worked to ensure development fulfilled acceptance criteria for each sprint.

## Design
In our design phase, we utilized user personas, interviews, and co-creation for a human-centered design. We assigned colleagues (not on the project) to represent target audience groups. The patient and parent users were authentic, while the medical professional persona was designed through research and second-hand experience. We conducted [interviews](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Design/Design.md#interviews) to gather information about their technology usage and medication concerns. To keep their needs and stories in mind during design and development, we factored the interview answers into user personas and developed a back-story including demographics, psychographics, and primary-use cases. Then, we conducted a co-creation session with our users and design team. Immediately, we validated our medication criteria options (allergies, age restrictions, nursing, and pregnancy warnings). Additionally, users brainstormed a feature to recommend alternative medication if search criterion resulted in a flag. For example, if a user searched for cough medicine not approved for their age, MedCheck would recommend another cough medication that met the age restriction. We also white-boarded the process for identifying users and launched a search and result display. The results fed into wireframe prototypes. We used the [InVision App](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Design/Design.md#invision-tool) App team and user collaboration as well as [Axure](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Design/Design.md#wire-frames) for wireframe prototyping and iterating. The Axure tool allowed medium to high fidelity wireframes, tested information and design, and was publically accessible. Users tested three iterations of wireframes and prioritized features for initial release. 

Then, we defined MedCheck’s branding. Given the potential stress of dealing with illness, we determined MedCheck should have a soothing color palette with simple icons. Furthermore, we incorporated the Bootstrap framework for modern UI components. This simplified and clearly guided users through each task. 

The home page for MedCheck received a full visual design. All other pages were kept consistent by defining common rules for components in a style guide. Our visual designer worked with developers to ensure the style guide captured all components and could grow with future features.



## Development
The creative team provided the frontend development team landing, sub-page and a style-guide sheet to reference for developing the MedCheck interfaces.  The developers spliced the comps into responsive design interfaces leveraged Bower as the front-end dependency manager implemented such packages as Bootstrap UI, Font Awesome and Toastr to deliver the final response and design of the vision style.  We provided our user group the opportunity to test working software during each sprint. This gave us immediate feedback on the usability of our code. An example of this was during Sprint 2 we quickly realized we needed to offer a better solution to inputting UPC information. As a result we leveraged quaggajs open source barcode scanner that exceeded user’s expectations.  


![Architecture Diagram](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/ArchitecturalDiagram.png)

During each sprint, MedCheck leveraged GitHub to capture, respond and track issues and new features to the system.  On a daily basis the team reviewed the backlog and addressed test defects/recommendations which once approved were entered into the sprint.  MedCheck continues to support this process by providing users information on the App Feedback page, to submit feedback and suggestions to improve the system. 
To build a prototype that works on multiple devices and presents a responsive design, we leveraged Bootstrap’s grid system. As a result, MedCheck was developed with a responsive design and does not depreciate form or function when viewed through fragmentation of mobile devices and standard web browsers. Our use of modern and open-source technologies include the following: 


Technology | Use 
--- | --- 
QuaggaJS | Barcode-scanner entirely written in JavaScript supporting real- time localization and decoding of various types of barcodes such as EAN, CODE 128, CODE 39, EAN 8, UPC-A, UPC-C and CODABAR.  Quagga is used to allow users the alternative ability to scan UPC codes 
MongoDB | Document oriented database used to manage MedCheck user’s saved profiles.
NodeJS | Cross-platform runtime environment used to run MedCheck RESTful API
Jasmine | Behavior-driven JavaScript testing framework used to test MedCheck during development and continuous build process. 
GruntJS | JavaScript task runner to automate project tasks and dependencies used to build MedCheck

The prototype and underlying platforms are openly licensed, under the apache or creative commons license. You may find the full list of MedCheck’s Open-source technologies in the [SOFTWARE.txt](https://github.com/inforeliance/MedCheck/blob/master/SOFTWARE.txt).

We deployed the prototype on Amazon Web Services IaaS using the Elastic Cloud Compute (EC2) service. Test and production environments are fronted by an Elastic Load Balancer (ELB) and have a friendly name managed by the Amazon Route 53 service. We wrote unit tests and used GitHub to track all changes to the source code and deployed code using AWS CodeDeploy. We configured the AWS CodeDeploy service to reference the GitHub repository for continuous integration. We also configured a service hook to initiate a deployment on check-in to GitHub for both test and production environments.

Amazon CloudWatch service provides continuous monitoring for performance metrics (e.g., disk I/o, cpu, network, availability). We configured CloudWatch alarms on the Elastic Load Balancers to send notices in the event of a failure. An AMI is configured to rapidly replace a failing instance in the event of an issue. We logged issues into GitHub for tracking, verification, and resolution. Deployment is available in two ways: the AWS CodeDeploy configuration as specified in appspec.yml or via a container as specified in Source/Dockerfile. 

Our end-to-end testing was supported through the Karma testing framework runner and Jasmine to get feedback on unit tests for front-end and back-end testing.  In addition, the MedCheck code deploy process includes an additional testing process during the build before integrating to production.  For automated web browser testing, Selenium is used to perform regression testing. 

MedCheck’s code deploy and testing to a [IaaS](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/IaaSplanWhiteboard.jpg) is completely automated, simply invoked after each commit is pushed to GitHub by a developer. GitHub triggers our YAML script, which pushes the source to AWS Code Deploy Services where the code is routed and staged on an EC2 instance for testing using Jasmine and Karma.  Once testing passes, the source is built and moved to production.  The overall process takes less than 54 seconds to complete.  

AWS Elastic Load Balancers are configured for continues monitor for both the Test and Production environments.  Each ELB monitors the health of the EC2 instances and fault reports are triggered to the administrator in the event a fault is detected.

In addition to CodeDeploy services, we also leverage CodeClimate to monitor overall code health of MedCheck, our live health status can be found [HERE](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/Development/Development.md#continuous-monitoring).


## Conclusion
This prototype is the product of a highly talented team using proven Agile processes to deliver real-world capability. Each member of the MedCheck team thoroughly enjoyed responding to this RFQ and we would consider it an honor to partner with 18F in support of your mission. 

## Criteria Evidence

[Full Stack Pool Evidence](https://github.com/inforeliance/MedCheck/blob/master/Artifacts/CriteriaEvidence.md)


