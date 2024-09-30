import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Capture the event for prompting PWA installation
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        } else {
          console.log("PWA installation dismissed");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="App">
      <h1>Welcome to My PWA</h1>
      <p>Scan the QR code below to install the app:</p>
      <QRCodeCanvas value={window.location.href} /> {/* Use QRCodeCanvas */}
      {deferredPrompt && (
        <button onClick={handleInstallClick}>Install App</button>
      )}
    </div>
  );
}

export default App;
