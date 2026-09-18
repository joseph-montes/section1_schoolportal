# Section 1 School Portal

A plain HTML, CSS, and JavaScript school portal backed by Firebase.

## Project structure

```text
frontend/
	index.html                    Main dashboard page
	css/style.css                 Shared visual styles
	js/app.js                     Page behavior and temporary dashboard data
	js/firebase-init.js           Firebase app, Auth, and Firestore initialization
	js/firebase-config.js       Firebase web app configuration
	js/firebase-config.example.js Configuration template
	assets/                       School logo and campus images
backend/
	firebase.json                 Firebase Hosting and Firestore configuration
	firestore.rules               Firestore security rules
	firestore.indexes.json        Firestore index definitions
	README.md                     Firebase setup and deployment notes
```

## Local setup

1. Serve the repository through a local web server. ES modules and Firebase will not work reliably when opening `index.html` directly as a `file://` URL.
2. Open `frontend/index.html` through that server.

The dashboard currently uses sample announcements and local demo authentication. Firebase is initialized for Analytics, Authentication, and Firestore; the next step is replacing the demo handlers with Firebase Auth and Firestore queries. The web configuration is safe to expose in browser code, but never commit Firebase Admin SDK credentials.

See [backend/README.md](backend/README.md) for Firebase CLI deployment steps.