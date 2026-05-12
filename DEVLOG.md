## Day 1 :  7 May 2026
**Hours worked:** 6

**What I did:**  
Started the project setup and finalized the product direction for the AI Spend Audit tool. Brainstormed and selected the product name, designed the logo, and finalized the overall color theme and UI style. Created the initial UI layouts for the landing page, spend input form, and audit results page. Began implementing the frontend in React using reusable components and responsive layouts.

**What I learned:**  
Learned more about designing SaaS-style dashboards and creating a UI that balances clarity with visual appeal. Also explored better component structuring in React for scalable frontend development.

**Blockers / what I'm stuck on:**  
Still deciding the best structure for handling dynamic audit inputs and pricing logic cleanly.

**Plan for tomorrow:**  
Complete the remaining frontend implementation for the input form and start building the audit engine logic for calculating savings and recommendations.



## Date 2: 8 May 2026
Today I spent most of my time fixing the project structure and making the user interface work like it should. I wanted to turn the UI into a working workflow instead of just static pages.
---
# What I Worked On :

## Rebuilt the React setup

I started fresh with a React + Vite project because I had some issues with dependencies and hooks in the old setup.

### I. Set up:
- React Router DOM
- Tailwind CSS

I also organized the project into:
- pages
- components
- assets

This will make it easier to keep things clean and scale later.

---

# Added Routing Between Pages

I created navigation between:
- Home
- Audit
- Results

using React Router.

### I set up:
- BrowserRouter
- Routes
- Link
- useNavigate
- useLocation

Now the app works like a single-page SaaS application.

---

# Built the Home Page Layout

I connected all the components to the Home page:
- Navbar
- Hero section
- Features
- Trusted section
- CTA
- Footer

I also made the spacing, responsiveness and layout consistency.

---

# Fixed Tailwind Setup

I had some issues with Tailwind configuration and styling not showing.

### I fixed:
- Vite plugin configuration
- CSS imports
- Tailwind setup issues

I made sure that utility classes were working properly across the project.

---

# Developed the Audit Page

I worked on making the Audit page fully dynamic.

### Now users can:
- add AI tools
- select plans
- enter monthly costs
- assign seats
- choose use cases

### I added support for:
- adding and removing tools dynamically
- localStorage persistence
- live state updates using React hooks

---

# Connected Audit Data to Results Page

This was the biggest part of my work today.

I integrated navigation state so all audit data gets passed directly to the Results page.

### The app now sends:
- team size
- selected tools
- plans
- costs
- seats
- use cases

through React Router state.

---

# Built the Results Dashboard

I created a dashboard-style Results page that generates audit reports based on user input.

### I implemented:
- savings calculations
- optimization recommendations
- AI insight section
- tool-by-tool breakdown cards
- monthly savings estimates

The dashboard updates automatically depending on what the user entered in the Audit page.

---

# Challenges Faced

Some issues I had today were:
- invalid React hook errors
- Tailwind setup problems
- routing issues
- dynamic data mapping bugs
- passing state correctly between pages

I fixed most of these issues after rebuilding the setup.

---

# Current Status

The project is now working as a frontend prototype.

### The working features are:
- multi-page navigation
- dynamic audit form
- persistent data
- real-time results generation
- responsive SaaS-style UI

---

# Next Steps

I plan to improve:
- charts and visual analytics
- PDF export
- backend integration
- authentication
- database storage
- animations and transitions
- more realistic AI optimization logic

---

# Overall

Today was mainly about turning the project from a designed interface into a working product flow.

The AI Spend Audit Platform and results dashboard are now connected dynamically which makes the platform feel much closer to a real SaaS application instead of a static demo. The AI Spend Audit Platform is really starting to come together.



## Date 3: 9 May 2026
Today was about making our AI Spend Audit platform better. We want it to feel professional, not like a calculator with a fancy look.

### What I Worked On:
* I made the Audit page look cleaner like a business software page
* I fixed some navigation issues and broken links
* I added a feature to handle AI tools with customizable plan
* I worked on saving audit data
* I improved the process of adding and removing tools without breaking anything
* I made the Results page work better with navigation
* I started making the audit engine logic realistic

### Major Fixes : I
* fixed a problem that caused the screen to go white
* solved some errors when exporting and importing data
* corrected some routing issues
* fixed a problem with handling tools
* improved how data flows between the Audit and Results pages

### Optimization Engine Improvements
I focused on making calculations more believable:
* made utilization calculations better
* improved waste estimation to make it more realistic
* added overlap detection
* improved recommendation logic
* made numeric handling safer
* planned to make values look nicer like changing `15000` to `15,000`

### Biggest Learning Today
A looking dashboard is not enough if the logic, behind it produces unrealistic numbers. Good business analytics depend on calculations handling edge cases and consistent data flow.

### Current Status
* Audit page UI is done
* Navigation is fixed
* Dynamic tool management is working
* Optimization engine is being upgraded
* Results logic is being refined

### Tomorrow’s target:
* Finalize a scoring system
* Improve recommendation prioritization
* Add advanced insights and business-grade analytics
* Begin comprehensive engine testing ⚙️



## Day 4 :  10 May 2026
Today was focused on making the AI Spend Audit platform feel like a real product instead of just a polished spreadsheet. I worked on improving the audit engine, redesigning the UI, fixing navigation issues, integrating reporting features, and cleaning up a lot of bugs across the platform.

---
## Audit Engine Improvements
I improved the audit analysis system so it generates more realistic and useful recommendations.

### Changes made:
* Improved how the platform evaluates AI tool usage efficiency
* Enhanced detection of waste, redundancy, and overlapping subscriptions
* Refined savings estimation logic for more accurate projections
* Improved prioritization of recommendations so the most impactful insights appear first
---
## Audit Page UI Revamp
I redesigned the audit page to feel more like a modern enterprise dashboard.

### UI improvements:
* Introduced a clean card-based layout for AI tools
* Improved spacing, typography, and responsiveness across devices
* Redesigned forms for better usability and visual consistency
* Structured the layout so additional tools can scale easily without breaking the design
---
## Navigation & Routing Fixes
I fixed several routing and navigation issues throughout the application.

### Fixes included:
* Repaired broken links
* Resolved React Router path issues
* Improved navigation flow between the Home, Audit, and Results pages
---
## Report System Integration
I integrated the report export system and improved the reporting workflow.

### Features added:
* PDF report export
* CSV report export
* Report generation modal workflow
* Connected audit results directly to the export system
* Improved report generation reliability and formatting
---
## Home Page Styling Changes
I updated the homepage to better match a modern SaaS product experience.

### Design updates:
* Improved overall layout consistency
* Refined gradients, spacing, and visual hierarchy
* Modernized the UI styling for a cleaner and more professional look
---
## 🛠️ Debugging & Error Fixes

I fixed multiple issues across the platform, including:
* Missing export errors
* Undefined variable issues
* Component rendering problems
* Button rendering bugs
* Modal functionality issues
---


## Day 5 :  11 May 2026
## What I Worked On
Today I focused a lot on making the audit platform more like a real product that people can use. I did not want it to be a prototype that is held together with temporary fixes.

### Major Updates
* I changed the way the audit page looks to make it cleaner and more professional
* I made the homepage look nicer and easier to understand
* I fixed problems with the navigation menu
* I made the audit logic better so it can do realistic financial analysis
* I added a way to show money values with commas, like 15,000 of 15000
* I improved the way it detects overlap and waste
* I added a way to generate reports in CSV and PDF formats
* I made it possible to send reports by email using the backend API
* I set up the Nodemailer backend to send reports
* I added checks to make sure reports are sent correctly and to handle errors
* I created documents to help people understand the project:
* README.md
* ARCHITECTURE.md
* REFLECTION.md
* PRICING_DATA.md
* PROMPTS.md

---

## Bugs & Problems Solved

### React Issues
* I fixed errors that happened when the audit object was not defined
* I fixed problems with the SendReportButton component
* I fixed links in the navigation menu

### Backend Issues
* I solved problems with the API that said "Not Found"
* I fixed issues with the email endpoint
* I fixed problems with handling requests
* I fixed problems with generating blobs. Downloads

### Authentication Issues
* I had trouble with Gmail SMTP authentication
* I learned that Google does not allow password login
* I looked into setting up App Password and 2FA
---

## Key Improvements
The audit engine is now more realistic. The audit platform now does savings estimation, improved risk analysis, clearer recommendations, cleaner formatting and more believable enterprise scenarios.
The reporting system is also much better. The audit platform now has executive summary formatting, recommendation sections, downloadable reports and professional email templates.

---

## Biggest Learning Today
A feature that works is not the same as a feature that's easy to maintain.
Most of today was spent making the code improving reliability reducing fragile code and handling edge cases.
The project is slowly changing from something that just works to something that actually behaves like a product.
Small bugs can cause problems. One missing object reference caused half the report flow to break, like a JavaScript problem that caused big trouble.


## Day 6 :  12 May 2026
# DEVLOG_DAY_4.md

## Day 4 – Making the AI Spend Audit Platform Better

Today I worked on making the AI Spend Audit platform really ready for people to use. I wanted to make sure it is not just working, but easy to maintain and understand. The project is moving from being a prototype to something more organized.

### What I Did

#### 1. Setting Up Automated Tests

I set up tests for the optimization engine using Vitest. I made test files to cover things like:

* How we calculate waste

* How we generate risk scores

* How we calculate utilization

* How we project savings

* How we generate recommendations

This helped me make sure the core audit logic is correct and catch any mistakes before we deploy the AI Spend Audit platform.

---

#### 2. Fixing Test Environment Issues

I spent a lot of time fixing issues with the test environment like:

* When it said "describe is not defined"

* When there were problems with ES module imports

* When Babel and Vitest were not configured correctly

* When file paths were incorrect

I fixed these issues by setting up the test environment and updating the imports to match the project structure of the AI Spend Audit platform.

---

#### 3. Creating Documentation

I made documentation files for the AI Spend Audit platform like:

* `README.md`

* `ARCHITECTURE.md`

* `REFLECTION.md`

* `PRICING_DATA.md`

* `PROMPTS.md`

* `TESTS.md`

My goal was to document not just the AI Spend Audit platform itself but also why we made certain decisions how it is structured and the trade-offs we made during development.

---

#### 4. Setting Up GitHub and CI/CD

I set up the GitHub repository structure. Pushed the complete AI Spend Audit platform project to the remote repository.

I had some issues with Git like:

* When the branches did not match (`main` vs `master`)

* When pushes were rejected

* When there were histories

I fixed these issues by using force push and branch correction commands. I also prepared the file for automated tests and lint execution on every push.

---

#### 5. Improving Email and Report System

I kept working on improving the report delivery system of the AI Spend Audit platform:

* I got the CSV export working

* I improved the PDF fallback handling

* I debugged the email backend

* I cleaned up the integration between the frontend and backend

I had some issues with Gmail authentication and API routing while testing the report delivery functionality of the AI Spend Audit platform.

---

### What I Learned

* Automated tests for the AI Spend Audit platform help me find logic flaws faster than testing it manually.

* Git problems are easier to fix once I understand the concepts of branches and histories.

* Making documentation for the AI Spend Audit platform takes a lot of effort. It makes it much easier to maintain.

* Backend email systems for the AI Spend Audit platform are more complex than they seem because of authentication and security restrictions.

---

### Status of the AI Spend Audit Platform

✅ The audit engine is working

✅ The waste and risk analysis is working

✅ The recommendation system is working

✅ The CSV and PDF reports are working

✅ The automated tests are working

✅ The documentation is done

✅ The GitHub setup is done

⚠️ The email delivery is still being improved

The AI Spend Audit platform now feels more like a real product, with structure, testing and documentation rather than just loose code.
