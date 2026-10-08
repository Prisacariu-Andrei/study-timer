# Putting Study Timer online

Study Timer works in two ways:

- **As a file:** open `index.html` from this folder. Data stays in that browser. No setup.
- **As a website:** people open a link, create an account with email and password, and their
  data is saved privately to that account. It works on phones too, and keeps working offline
  after the first visit.

The website needs two free services:
- **Firebase** (by Google) for accounts and the database.
- **Netlify** to host the page.

You only do this setup once. Plan on about 20 minutes.

---

## 1. Create the Firebase project

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project**, name it e.g. `study-timer`, and continue.
   Google Analytics isn't needed, so you can turn it off.
3. Wait until it says the project is ready, then click **Continue**.

## 2. Turn on email and password accounts

1. In the left menu: **Build → Authentication → Get started**.
2. Under **Sign-in method**, click **Email/Password**, switch on the first toggle, and click
   **Save**.

## 3. Create the database

1. Left menu: **Build → Firestore Database → Create database**.
2. For location, pick a European one (e.g. `eur3` or `europe-west`). You can't change it later.
3. Choose **Start in production mode** and click **Create**.
4. Open the **Rules** tab. Delete everything there, paste in the contents of `firestore.rules`
   from this folder, and click **Publish**.
   These rules mean each person can only see their own data.

## 4. Connect the app to Firebase

1. Click the gear icon next to **Project Overview → Project settings**.
2. Under **Your apps**, click the web icon `</>`. Name it `Study Timer` and leave "Firebase
   Hosting" unticked. Click **Register app**.
3. You'll see a block of code with `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
   Copy just the `{ ... }` part.
4. Open `index.html`, find the line `window.FIREBASE_CONFIG = null;`, and replace `null` with
   what you copied. Or paste it to Claude and ask Claude to put it in.

   These values aren't secret. Every website using Firebase has them in its page. The rules
   from step 3 are what protect the data.

## 5. Put the site online (Netlify)

1. Go to <https://app.netlify.com/drop> and sign up for a free account, so the site stays up.
2. Drag the whole **study-timer** folder onto the page.
3. You'll get an address like `https://something-random.netlify.app`. You can rename it under
   **Site configuration → Change site name**.

## 6. Allow that address to sign people in

1. Back in Firebase: **Authentication → Settings → Authorized domains → Add domain**.
2. Add your Netlify address without `https://`, e.g. `study-timer-andrei.netlify.app`.

That's it. Open the link, create your account, and share the link with anyone.

---

## Moving your data from the file to the website

1. Open the `index.html` file as usual and click **Export**. It saves a `.json` file.
2. Open the website, sign in, and click **Import**. Choose that file.

The same works in the other direction, and between devices.

## Putting an update online

When Claude changes the app, open your site on Netlify, go to **Deploys**, and drag the
**study-timer** folder onto the page again. People get the new version next time they open it
while online.

## On phones

- **iPhone:** open the link in Safari, tap **Share → Add to Home Screen**.
- **Android:** open it in Chrome, tap **⋮ → Add to Home screen** (or **Install app**).

It then opens full-screen like an app, and works offline after you've opened it once online.

## Good to know

- **Cost:** Firebase's free plan allows about 20,000 saves and 50,000 loads per day, which is
  plenty for you and your friends.
- **Same account on two devices while offline:** if you change things on both before either
  reconnects, the one that syncs last wins.
- **Forgotten passwords:** "Forgot password?" on the sign-in screen emails a reset link. The
  email comes from Firebase and may land in spam.
