# Firebase backend

Firebase is the backend for this project. The `firebase.json` file configures Firebase Hosting and Cloud Firestore. Authentication, database access, and future Cloud Functions can be added here as the portal grows.

## Setup

1. Install the Firebase CLI: `npm install -g firebase-tools`.
2. Run `firebase login` and `firebase use --add` from this folder.
3. Copy `frontend/js/firebase-config.example.js` to `frontend/js/firebase-config.js` and add the Firebase project settings.
4. Replace the deny-all Firestore rules with rules designed around your authenticated user roles before adding data.
5. Deploy from this folder with `firebase deploy`.

The Firebase web configuration is not a secret. Keep service-account keys and other private credentials out of the repository.