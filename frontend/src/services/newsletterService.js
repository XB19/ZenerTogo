// TODO: remplacer par un vrai appel au service d'emailing du client
// (Mailchimp, Brevo, ...) une fois choisi. La signature (Promise) doit
// rester la même pour ne pas avoir à toucher au composant NewsletterForm.
export function subscribe(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes('@')) resolve({ success: true });
      else reject(new Error('Adresse email invalide'));
    }, 700);
  });
}
