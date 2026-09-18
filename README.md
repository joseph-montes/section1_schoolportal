# Section 1 School Portal

A plain HTML, CSS, and JavaScript school portal backed by Firebase.

## Project structure

```text
frontend/
	index.html                    Main dashboard page
	css/style.css                 Shared visual styles
	js/app.js                     Page behavior and temporary dashboard data
	js/firebase-init.js           Firebase app, Auth, and Firestore initialization
	js/firebase-config.example.js Configuration template
	assets/                       School logo and campus images
backend/
	firebase.json                 Firebase Hosting and Firestore configuration
	firestore.rules               Firestore security rules
	firestore.indexes.json        Firestore index definitions
	README.md                     Firebase setup and deployment notes
```

## Local setup

1. Copy `frontend/js/firebase-config.example.js` to `frontend/js/firebase-config.js` and add your Firebase web app configuration.
2. Serve the repository through a local web server. ES modules and Firebase will not work reliably when opening `index.html` directly as a `file://` URL.
3. Open `frontend/index.html` through that server.

The dashboard currently uses sample announcements. The Firebase initialization module is ready for adding Authentication and Firestore queries. Keep `firebase-config.js` out of version control if your workflow requires it, and never commit Firebase Admin SDK credentials.

See [backend/README.md](backend/README.md) for Firebase CLI deployment steps.