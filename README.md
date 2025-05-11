# OnlineExam
An advanced Angular-based web application for testing users’ knowledge in various front-end technologies like HTML, CSS, JavaScript, TypeScript, and Angular. Built with clean architecture and dynamic API integration, this project simulates a real-world online exam system with authentication, scoring, and subjects filtering


##  Technologies Used

- **Angular 19**
- **Angular libraries** (for authentication)
- **TypeScript**
- **NgRx**
- **RxJS**
- **Signals**
- **SCSS**
- **Bootstrap 5**
- **ngx-skeleton-loader** (for loading UI)
- **Toastr** (for notifications)

---

## Features

### Authentication
- User **register** and **login**
- Token stored securely in localStorage
- Decoded token stored in store of **NgRX**
- Route protection with AuthGuard

### Home Page
- Clean UI with technology subjects
- Each card represents a quiz subject
- Responsive design and intuitive navigation

### Exam Functionality
- **Subject-based quiz selection**
- **Multiple-choice questions** (MCQ)
- Option to **submit answers**
- Instant result calculation with:
  - Total number of questions
  - Number of correct and wrong answers
  - Final score display

### Exam Flow Summary
- Register/Login:
  - The user must create an account or log in to access exams.

- Navigate to Home Page:
  - After logging in, the user sees a list of technology categories (e.g., HTML, CSS, JS).

- Choose a Category:
  - Clicking on a category card (like Angular) starts the exam for that subject by click on start btn.

- Answer Questions:
  - The user sees a series of multiple-choice questions. They select answers and click Next and click Submit at the last question to see the score.

- Final score
  - The user can see the correct and incorrect answers and the score with percentage value in a native chart
  - Option to show result

- View Results:
  - On click on show result, the app displays:

    **Correct vs. wrong answers**


### Retake Exam / Retry
- Option to retake the exam after finishing
- Clears previous answers

### Filtering & Navigation
- Categories fetched from the backend
- Routing with Angular Router

### State & User Experience
- Loading skeleton loader for some HTTP calls like subjects 
- Form validations with user-friendly messages
- Error handling for failed requests
- Smooth animations and transitions in **navbar** in small screens

---



### [LinkedIn](https://www.linkedin.com/in/mohammed-ashraf0/)

### [Live Demo](https://online-exam-tau.vercel.app/#/)
