# Firebase backend

Firebase is the backend for this project. The `firebase.json` file configures Firebase Hosting and Cloud Firestore. Authentication, database access, and future Cloud Functions can be added here as the portal grows.

## Setup

1. Install the Firebase CLI: `npm install -g firebase-tools`.
2. Run `firebase login` and `firebase use --add` from this folder.
3. Enable Email/Password authentication in the Firebase console.
4. Deploy the rules and hosting configuration from this folder with `firebase deploy`.

## Firestore roles

Admin access is controlled by a user document at `users/{firebaseAuthUid}` with `role: "admin"`. Create that document from a trusted admin process or the Firebase console; do not let the browser assign its own admin role.

Students can read only their own private records. School-managed collections such as grades, attendance, payments, announcements, students, teachers, classes, and subjects can only be written by admins. Users can read published announcements and authenticated users can read subjects and classes.

The Firebase web configuration is not a secret. Keep service-account keys and other private credentials out of the repository.