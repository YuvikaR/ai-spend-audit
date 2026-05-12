# PROMPTS.md

## Overview

This document has all the prompts that were used when we were developing the AI Spend Audit platform. We used these prompts for debugging making the user interface better creating audit logic making reports and testing.

The goal of these prompts was to help the AI do the work but still have a person review the logic, structure and user experience decisions.

---

# 1. Audit Logic Improvement Prompt

## Prompt

```txt

We need to make the audit engine logic better so the analysis is more realistic and accurate with money.

Requirements:

- Do not change the names of the functions that already exist

- Do not change the way the components are structured

- Make sure there are no mistakes with numbers

- Format all money values with commas like this: 15000 becomes 15,000

- Add realistic audit insights, such as:

When seats are not used enough

When AI tools overlap

When we can combine things

When we waste money

When we can save money each year

- Make sure the calculations are always the same and can be explained

- Do not use fake or random AI scores

- Make the code easier to read and maintain

```

## Why This Prompt Was Written This Way

The project already had working functions that were connected to multiple components. If we changed the function names it would break the imports and navigation across the application.

We wrote the prompt to focus on:

* keeping the architecture the same

* making the audit more realistic

* preventing the AI from making up logic

We said the calculations had to be "deterministic and explainable" because before the AI-generated logic created random scores with no explanation.

---

# 2. Audit Page UI Redesign Prompt

## Prompt

```txt

We need to redesign the audit page user interface to make it look modern and professional.

Requirements:

- Keep all the existing functionality exactly the same

- Do not change the way tools are added or removed

- Keep the state handling the

- Keep using React and Tailwind

- Add:

Cards with rounded corners

More space between things

A layout that works on different devices

Bigger text

A better visual hierarchy

- Make it look like a modern software dashboard

- Do not overdesign it or add animations that make it hard to use

```

## Why This Worked

The important part of this prompt was:

> "Keep all existing functionality exactly the same"

If we did not say that the AI would rewrite the state logic and break the audit flow.

The prompt separated the responsibilities of:

* the user interface

* the business logic

That helped reduce the number of problems that occurred.

---

# 3. Test Case Generation Prompt

## Prompt

```txt

Create test cases for the AI spend audit engine.

Include:

- input data

- expected calculations

- waste estimation

- overlap detection

- yearly savings

- edge cases

- scenarios for big companies

- scenarios for startups

Output format:

1. Input

2. Expected Output

3. Why This Matters

```

## Why It Was Useful

This helped us validate:

* how we combined spending

* how we detected overlaps

* how we used seats

* how we estimated savings

The generated test cases showed us issues with:

* rounding numbers

* undefined fields

* incorrect totals

---

# 4. PDF / CSV Report Prompt

## Prompt

```txt

Create utilities to generate reports in production style for:

- exporting to CSV

- sending reports by email in HTML

- supporting PDF as a fallback

Requirements:

- professional formatting

- a summary for executives

- a section for recommendations

- a breakdown of finances

- downloadable files

- reusable helper functions

- maintainable code structure

```

## What Didn’t Work Initially

Before the prompts generated:

* very bloated code

* duplicated formatting logic

* chaotic inline styling

* broken file downloads

The final version worked better after we explicitly asked for:

* reusable helpers

* separation of responsibilities

---

# 5. Backend Email API Prompt

## Prompt

```txt

Create a backend email endpoint using Express and Nodemailer.

Requirements:

- a POST endpoint

- emails

- send HTML reports

- use environment variables

- error handling

- JSON responses

- a structure that is safe for production

```

## Why This Was Needed

Before the AI-generated versions:

* hardcoded credentials

* skipped validation

* mixed frontend and backend logic

* returned inconsistent responses

The improved prompt forced:

* separation of concerns

* configuration based on environment

* proper API patterns

---

# 6. Debugging Prompt

## Prompt

```txt

Carefully analyze this React error. Explain:

1. Why it is happening

2. Which line causes it

3. What assumptions are failing

4. The safest fix without changing the architecture

5. The exact corrected code

```

## Why This Was Extremely Helpful

This debugging structure prevented AI responses.

Without this style the AI often:

* guessed randomly

* rewrote large sections unnecessarily

* introduced new bugs

The numbered format forced targeted debugging.

---

# 7. Documentation Prompt

## Prompt

```txt

Write professional project documentation for a technical internship submission.

Keep it:

-

- concise

- technical

- reflective

- honest

Do not use marketing language or exaggerated claims.

```

## Why This Was Important

The default AI outputs sounded:

* corporate

* exaggerated

* unrealistic for a student-built system

This prompt kept the documentation believable and grounded.

---

# What I Did NOT Trust AI With

I did not fully trust the AI with:

* calculations

* waste percentages

* pricing accuracy

* routing architecture

* deployment configuration

* React state flow

* async debugging

All important logic was manually verified by me.

---

# One Specific Time AI Was Wrong

When we were integrating the report email system the AI suggested rendering a React component inside a button:

```jsx

<button onClick={SendReportButton}>

```

This was incorrect because:

* React components are not event handlers

* the component needed to be rendered in JSX

This caused:

* undefined audit state issues

* missing button rendering

* modal failures

The issue was fixed by:

* rendering `<SendReportButton />` directly

* passing props correctly

* controlling modal state through component rendering rather than button callbacks

---

# Biggest Lesson About Prompting

The quality of AI output improved dramatically when prompts:

* specified constraints clearly

* protected existing architecture

* separated UI from logic

* demanded deterministic calculations

* explicitly prevented rewrites

Small changes in the wording of the prompts created huge differences, in the quality of the output.
