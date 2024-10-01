import React, { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "./logo.svg";
import { PWAInstallElement } from "@khmyznikov/pwa-install";

// Define the custom element only once
if (!customElements.get("pwa-install")) {
  customElements.define("pwa-install", PWAInstallElement);
}

function App() {
  const pwaInstallRef = useRef(null);
  const pwaURL = window.location.href;

  useEffect(() => {
    const showInstallPrompt = () => {
      if (pwaInstallRef.current) {
        pwaInstallRef.current.showDialog();
      }
    };

    // Show the install prompt after a short delay
    const timer = setTimeout(showInstallPrompt, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to My PWA</h1>
      <p>Scan the QR code below to open the app in your browser:</p>
      <QRCodeCanvas value={pwaURL} />
      <pwa-install
        ref={pwaInstallRef}
        name="MyPWA"
        icon={logo}
        description="Install our awesome PWA for a better experience!"
        manifestUrl="manifest.json"
      ></pwa-install>
    </div>
  );
}

export default App;
