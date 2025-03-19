import React, { useState, useEffect } from "react";
import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper";
import AppRouter from "./routes/router";
import ContactForm from "@/components/PopUpForm"; 
import "@/assets/scss/style.scss";
import configureFakeBackend from "./helpers/fake-backend";
import WhatsAppButton from "@/components/WhatsAppButton";

configureFakeBackend();

function App() {
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const hasFormBeenShown = sessionStorage.getItem("contactFormShown");
    if (!hasFormBeenShown) {
      setShowContactForm(true);
      sessionStorage.setItem("contactFormShown", "true"); 
    }
  }, []);

  return (
    <AppProvidersWrapper>
      <ContactForm show={showContactForm} handleClose={() => setShowContactForm(false)} />
      <AppRouter />
      <WhatsAppButton />
    </AppProvidersWrapper>
  );
}

export default App;
