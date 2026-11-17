# SoftUni Front-End Test Automation

Solutions for the SoftUni Front-End Test Automation course (QA track): Selenium IDE, Selenium WebDriver, Page Object
Model, Appium, SikuliX and security testing. Every lecture is a self-contained .NET 10 NUnit project; the Selenium IDE
exercises are `.side` files.

| #   | Lecture | Project | Covers |
| --- | ------- | ------- | ------ |
| 001 | Course Introduction | [CourseIntroductionTests](001-Course-Introduction/CourseIntroductionTests) | first Selenium test |
| 002 | Selenium Introduction | [SeleniumIntroductionTests](002-Selenium-Introduction/SeleniumIntroductionTests) | Wikipedia UI tests, waiting for elements |
| 003 | Exercise: Selenium Introduction (IDE) | [SeleniumIdeTests](003-Exercise-Selenium-Introduction-IDE/SeleniumIdeTests) · [Number Calculator](003-Exercise-Selenium-Introduction-IDE/1.%20Number%20Calculator.side) · [CURA Health Care](003-Exercise-Selenium-Introduction-IDE/2.%20CURA%20Health%20Care%20Service.side) · [Saucedemo](003-Exercise-Selenium-Introduction-IDE/3.%20Saucedemo.side) | recorded IDE suites exported to C# |
| 004 | Selenium WebDriver | [SeleniumWebDriverTests](004-Selenium-WebDriver/SeleniumWebDriverTests) | form inputs, drop-downs, web tables, date picker |
| 005 | Selenium WebDriver Waits | [SeleniumWaitTests](005-Selenium-WebDriver-Wait/SeleniumWaitTests) | implicit and explicit waits, alerts, frames, windows |
| 006 | Selenium WebDriver POM | [SeleniumPomTests](006-Selenium-WebDriver-POM/SeleniumPomTests) | Page Object Model for the Student Registry app |
| 007 | Exercise: Selenium WebDriver POM | [SeleniumPomExerciseTests](007-Exercise-Selenium-WebDriver-POM/SeleniumPomExerciseTests) | Saucedemo: login, inventory, cart, checkout, hidden menu |
| 008 | Appium Testing | [AppiumTests](008-Appium-Testing/AppiumTests) | Android Summator app |
| 009 | Appium Desktop | [AppiumDesktopTests](009-Appium-Desktop/AppiumDesktopTests) | Windows Summator app |
| 010 | Appium Mobile | [AppiumMobileTests](010-Appium-Mobile/AppiumMobileTests) | ColorNote app, Summator with POM |
| 011 | SikuliX | [SikuliTests](011-SIKULI/SikuliTests) | image-based calculator tests |
| 012 | Exercise: SikuliX Web & Desktop | [ExerciseSikuliWebDesktopTests](012-Exercise-SIKULI-Web-Desktop/ExerciseSikuliWebDesktopTests) | image matching on web and desktop |
| 013 | Exercise: SikuliX Mobile | [ExerciseSikuliMobileTests](013-Exercise-SIKULI-Mobile/ExerciseSikuliMobileTests) | image matching on a mirrored phone screen |
| 014 | Test Automation Architecture | [TestAutomationArchitectureTests](014-Test-Automation-Architecture/TestAutomationArchitectureTests) | driver factory, settings, test data, page objects |
| 015 | Workshop: CI with Selenium and Appium | [StudentRegistryTests](015-Workshop-Building-a-CI-System-with-Selenium-and-Appium-Automated-Tests/StudentRegistryTests) | POM suite for the Student Registry app |
| 016 | Workshop: CI with Selenium and Appium | [SeleniumIdeTests](016-Workshop-Building-a-CI-System-with-Selenium-and-Appium-Automated-Tests/SeleniumIdeTests) · [Jenkinsfile](016-Workshop-Building-a-CI-System-with-Selenium-and-Appium-Automated-Tests/Jenkinsfile) | Jenkins pipeline running the tests |
| 017 | Security and Types of Security Testing | [SecurityTests](017-Security-and-types-of-security-testing/SecurityTests) | HTTP security headers on OWASP Juice Shop |
| 018 | Exercise: Security, part 1 | [ExerciseSecurityPart1Tests](018-Exercise-Security/ExerciseSecurityPart1Tests) | Juice Shop UI: invalid login, SQL injection on the login form, reflected search input |
| 019 | Exercise: Security, part 2 | [ExerciseSecurityPart2Tests](019-Exercise-Security/ExerciseSecurityPart2Tests) | Juice Shop API: wrong credentials, SQL injection on login and product search, auth on user list |
| 020 | Exam Preparation | [IdeaCenterTests](020-Exam-Preparation/IdeaCenterTests) · [IDE suite](020-Exam-Preparation/IdeaCenterTestProject.side) | Idea Center: login, create, edit, delete ideas (POM) |
| 021 | Exam Preparation | [RevueCraftersTests](021-Exam-Preparation/RevueCraftersTests) · [IDE suite](021-Exam-Preparation/TheRevueCraftersTestProject.side) | Revue Crafters: create, search, edit, delete revues (POM) |

## Run

Needs the .NET 10 SDK and Chrome. Browsers start headless.

```bash
cd 007-Exercise-Selenium-WebDriver-POM/SeleniumPomExerciseTests
dotnet test
```

Tests skip themselves (`Assert.Ignore`) instead of failing when what they need is missing:

| Lectures | Needs |
| -------- | ----- |
| 006, 015 | the Student Registry app on `http://localhost:8080` – [nakov/MVC-app-integration-tests-example-mocha](https://github.com/nakov/MVC-app-integration-tests-example-mocha), `npm install && npm start` |
| 008–010 | an Appium server on `http://127.0.0.1:4723/` (plus an Android emulator or Windows for the desktop app) |
| 011–013 | SikuliX with `SIKULI_HOME` set and a display |
| others  | the public practice site they test being reachable |

Open a `.side` file in the [Selenium IDE](https://www.selenium.dev/selenium-ide/) browser extension to replay it.

## License

[MIT](LICENSE)
