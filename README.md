URL - Phishing Detection Chrome Extension

🚀 Overview

URL is a Chrome extension that helps users identify and avoid phishing websites. Using machine learning (Random Forest) and website feature analysis, it detects fraudulent sites in real-time and alerts users with a clear risk indicator.

🎯 Features

✅ Real-time Phishing Detection – Scans web pages to detect phishing attempts.

✅ Machine Learning Model – Uses a trained Random Forest classifier.

✅ UI Popup – Displays a phishing risk score (0-100%) when the extension is clicked.

✅ Feature Extraction – Analyzes URL structure, HTTPS presence, and login forms.

✅ Background Processing – Runs silently to monitor and classify webpages.

✅ Offline Mode – Works without an internet connection (model runs locally).




📊 Model & Detection Logic:

-URL uses a Random Forest model trained on various website attributes:
-URL-Based Features: Length, number of dots, presence of ‘@’, etc.
-HTML & Form Features: Login form detection, multiple redirects, etc.
-Security Features: Presence of HTTPS, SSL certificate validation.
-When a user visits a site, these features are extracted and passed through the model, which classifies the site as legitimate (✔️) or phishing (❌).


🏗️ Installation
Open Chrome and go to chrome://extensions/.
Enable Developer Mode (toggle in the top-right corner).
Click Load Unpacked and select the project frontend folder.
The URL extension should now be visible in your Chrome toolbar!
