# KodeCamp 6.0 Student Enrollment Portal

A React + Vite app that loads a starter student roster from an API and lets users enroll new students with both controlled and uncontrolled form inputs.

## Features

- Fetches 6 students from the Random User API and merges them with local seed students.
- Shows loading and error states so the app does not crash if the API request fails.
- Displays student cards with avatar, name, email, track, score, grade, and active status.
- Enrolls new students through a form that uses controlled and uncontrolled input patterns.
- Uses reusable components with one component per file.

## Component Architecture and Virtual DOM

Component-based architecture means the UI is split into small reusable pieces. In this app, `Header`, `EnrollForm`, `StudentList`, `StudentCard`, `Button`, `ClassButton`, and `StatusMessage` each handle one clear part of the page. `App.jsx` owns the main data and passes values down through props.

The Virtual DOM is React's lightweight copy of the page structure. When state changes, React compares the new Virtual DOM with the previous one and updates only the parts of the real DOM that need to change. This makes updates easier to reason about and keeps the UI in sync with state.

## API and Error Handling

The app uses:

```txt
https://randomuser.me/api/?results=6&nat=us,gb
```

The roster request runs inside `useEffect` when the app first loads. The fetch function uses `async/await`, checks `response.ok`, and wraps the request in `try/catch/finally`. While the request is running, the app shows a loading message. If the request fails, it shows an error message and falls back to the seed students instead of crashing.

## Controlled vs Uncontrolled Forms

- Controlled fields store their current value in React state and update with `value` plus `onChange`.
- In this app, first name, last name, track, and score are controlled fields, which allows the live preview to update as the user types.
- Uncontrolled fields keep their value in the DOM and are read with refs when the form is submitted.
- In this app, email and active status are uncontrolled fields, which is useful when React does not need to track every keystroke.

## Project Structure

```txt
src/
├── App.jsx
├── App.css
├── components/
│   ├── Header.jsx
│   ├── Button.jsx
│   ├── ClassButton.jsx
│   ├── StudentCard.jsx
│   ├── StudentList.jsx
│   ├── EnrollForm.jsx
│   └── StatusMessage.jsx
└── main.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Submission Links

- GitHub repository: https://github.com/ezekielbroni15/student-enrollment-portal
- Hosted live link: https://student-enrollment-portal-seven.vercel.app/
