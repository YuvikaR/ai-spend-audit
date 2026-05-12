# METRICS.md

## North Star Metric

** Audits That Convert Into Credex Consultations**

Why this matters:

The tool is not something companies use every day.

Companies do not check their AI spend every morning like they check their emails.

The real value comes when a completed audit makes a company want to book a consultation with Credex.

A completed audit by itself is not very useful.

A consultation booking means a company is actually thinking about buying something from Credex.

North Star Formula:

`Consultation Conversion Rate = Consultations Booked / Completed Audits`

For example:

* 1,000 completed audits

* 120 consultation bookings

* North Star = 12%

This means the audit engine is successfully turning peoples interest into business opportunities.

---

## 3 Input Metrics That Drive the North Star

### 1. Audit Completion Rate

Formula:

`Completed Audits / Started Audits`

Why it matters:

If users stop the audit halfway the whole process falls apart before Credex even gets a chance to talk to them.

A good target to aim for is:

* 65% or more of users completing the audit

Things that affect this are:

* Making the sign-up process faster

* Making the interface cleaner and easier to use

* Asking for details from users

* Making the audit load faster

* Explaining how the audit can save users money in a way

---

### 2. "Savings Detected" Rate

Formula:

`Audits Showing >$500 Monthly Waste / Completed Audits`

Why it matters:

If the tool does not find any ways for users to save money users will not see any reason to talk to Credex.

A good target to aim for is:

* 70% or more of audits should show users ways to save an amount of money

This metric checks if the engine is really helping users save money.

---

### 3. CTA Clickthrough Rate

Formula:

`Consultation CTA Clicks / Completed Audits`

Why it matters:

This measures if the report really convinces users to take action, both financially.

A good target to aim for is:

* 15–20% of users clicking on the call to action such as:

* "Book Optimization Review”

* "Talk to Credex”

* "Get Savings Plan”

If users finish the audit but do not click on the call to action the report is not doing its job.

---

## What I’d Instrument First

The first things I would track are:

Event                    | Why It Matters                |

| ------------------------ | ----------------------------- |

| audit_started            | Measures how well we get users to start the audit

| audit_completed          | Checks if users complete the audit        |

| tool_added               | Shows how engaged users are with the tool        |

| report_downloaded        | Signals that users are really interested        |

| consultation_cta_clicked | Measures if users want to take the next step    |

| email_report_sent        | Indicates that users are sharing the report with others |

| consultation_booked      | The measure of success          |

I would use:

* PostHog for product analytics

* Mixpanel for tracking the funnel

* Vercel Analytics for performance

* Hotjar session recordings to see where users drop off

---

## Pivot Trigger

I would seriously think about changing the product direction if:

### After 500 completed audits:

* The rate of consultations booked stays below **5%**

*. The average savings found stays below **$300/month**

*. The rate of audits completed drops below **40%**

Why?

Because that would mean one of three things:

1. The problem we are trying to solve is not big enough

2. The audit results are not believable

3. We are targeting the audience

At that point I would consider changing the product to:

* A tool for comparing vendors

* A dashboard for buying AI

* A platform for optimizing enterprise licenses

* A tool for tracking the return, on investment of AI of reducing AI spend

The signal is simple:

If the audit just makes users curious but not eager to take action the business model is not working.
