# RememberThis App

The **RememberThis App** is a React Native application designed to help users create, manage, and be reminded of their daily, weekly, and monthly tasks. Featuring push notifications and calendar integration, this app ensures you never miss a task. The app is cross-platform and works seamlessly on mobile and web via Expo.

## ✨ Features

- **Task Categories:** Manage tasks for daily, weekly, and monthly schedules.
- **Push Notifications:** Receive reminders based on scheduled times.
- **Calendar Integration:** View tasks assigned to specific dates.
- **CRUD functionality:** Create, edit, and delete tasks with ease.
- **Cross-Platform:** Runs smoothly on both mobile and web.

## 🚀 Technologies

- **React Native:** For building the user interface on mobile and web.
- **Expo:** Simplifies push notifications and other functionalities.
- **TypeScript:** Ensures code reliability with type checking.
- **React Navigation:** Handles navigation between views and screens.
- **Axios:** Facilitates API requests to a local JSON server.
- **React Native Calendars:** Adds calendar support.
- **Expo Notifications:** Manages push notifications.

## 🔧 Installation

To get started, clone the repository and install the dependencies.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/RobinNygren/RememberThis-app
   ```
2. Navigate into the project directory:
   ```bash
   cd <project-folder>
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the JSON Server (for local data management):
   ```bash
   npx json-server db.json
   ```
5. Start the Expo Project:
   ```bash
   npx expo start
   ```

Open the app on your mobile device using the Expo Go app or in your web browser.

## 🔑 Key Components and Utilities

### Push Notifications

Push notifications are managed via `expo-notifications`. Key functions are implemented in the file `utils/notifications.ts`:

- **`registerForPushNotificationsAsync`**: Requests permissions to enable push notifications.
- **`scheduleNotification`**: Schedules notifications based on the specified task time and date.

---

### Navigation

The app utilizes `React Navigation` to handle seamless navigation between views:

- **Drawer Navigator**: Provides a side menu for accessing major features such as task addition and calendar view.
- **Bottom Tabs Navigator**: Enables quick navigation between Daily, Weekly, and Monthly task categories.

---

### Context and Reducers

- **`TasksContext`**: A global state management solution for handling task-related data across the app.
- **`tasksReducer`**: Processes actions like adding, editing, and deleting tasks to update the global state efficiently.

---

### Calendar

The `react-native-calendars` library is integrated for task scheduling and visualization. It displays tasks on a calendar with custom markers to indicate the presence of tasks for specific dates.

---

## ⚙️ API Configuration

The API_BASE_URL (base URL for the API) is stored in a config.ts file for security and flexibility. This file is excluded from version control (using .gitignore) to ensure sensitive information, such as IP addresses, is not pushed to the repository.

### Steps to Configure:

1. If the file is not already present, create a new file in the src or utils folder:
   ```bash
   src/config.ts
   ```
2. Add the API URL:
   Inside config.ts, set the base URL to your local server:
   ```bash
   export const API_BASE_URL = "http://<your-ip-address>:3000";
   ```
