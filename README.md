# KodeCamp 6.0 Student Enrollment Portal

A React + Vite student enrollment app upgraded with client-side routing using React Router.

## Stage 4 Approach

The existing enrollment portal was updated in place rather than rebuilt. Roster state remains lifted to `App.jsx`, allowing a student enrolled on the `/enroll` page to appear immediately on the home roster after the form redirects to `/`.

`BrowserRouter` wraps the app in `main.jsx`, while `App.jsx` defines the routes and keeps the shared `Navbar` outside `Routes` so it appears on every page.

## Routes

- `/` — displays the student roster and refresh action.
- `/students/:id` — uses `useParams()` to find and display one student's full details.
- `/enroll` — displays the existing enrollment form and uses `useNavigate()` to return home after a successful enrollment.
- `*` — displays a friendly 404 page for unknown URLs.

All internal navigation uses `Link` or `NavLink`, so navigation happens without a full page reload. The navbar uses `NavLink`'s `isActive` callback to style the current route.

## Existing Features

- Fetches six students from the Random User API and merges them with local seed students.
- Shows loading and error states and falls back to seed students if the request fails.
- Displays avatar, name, email, track, score, grade, and active status.
- Enrolls students with controlled and uncontrolled form inputs.
- Validates names, email, and score before enrollment.

## Project Structure

```txt
src/
├── App.jsx
├── App.css
├── main.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Header.jsx
│   ├── Button.jsx
│   ├── ClassButton.jsx
│   ├── StudentCard.jsx
│   ├── StudentList.jsx
│   ├── EnrollForm.jsx
│   └── StatusMessage.jsx
└── pages/
    ├── HomePage.jsx
    ├── StudentDetailPage.jsx
    ├── EnrollPage.jsx
    └── NotFoundPage.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

## Build and Lint

```bash
npm run build
npm run lint
```

## Submission Links

- GitHub repository: https://github.com/ezekielbroni15/student-enrollment-portal
- Hosted live link: https://student-enrollment-portal-seven.vercel.app/
