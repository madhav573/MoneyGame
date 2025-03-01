<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDHoO5ztxmoWska9szg9jdjHdTEP4yv6JA",
    authDomain: "moneygamee-3446d.firebaseapp.com",
    projectId: "moneygamee-3446d",
    storageBucket: "moneygamee-3446d.firebasestorage.app",
    messagingSenderId: "232774460810",
    appId: "1:232774460810:web:33d30663b1de93ef531473",
    measurementId: "G-PZ31SXLM2W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
