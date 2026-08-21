/**
 * Service de chat isolé du composant UI : c'est le seul endroit à modifier
 * pour brancher un vrai backend de conversation plus tard.
 */

const canned = {
  fr: [
    "Merci pour votre message ! Un conseiller ZENER reviendra vers vous rapidement.",
    "Bonne question — vous trouverez plus de détails sur nos pages Services ou ZenCard.",
    "Je note votre demande. En attendant, n'hésitez pas à consulter notre FAQ.",
  ],
  en: [
    "Thank you for your message! A ZENER advisor will get back to you shortly.",
    "Good question — you'll find more details on our Services or ZenCard pages.",
    "I've noted your request. In the meantime, feel free to check our FAQ.",
  ],
};

const quickQuestions = {
  fr: [
    'Comment obtenir ma ZenCard ?',
    'Où se trouve la station la plus proche ?',
    'Comment vous contacter ?',
  ],
  en: [
    'How do I get my ZenCard?',
    'Where is the nearest station?',
    'How can I contact you?',
  ],
};

export function getQuickQuestions(lang) {
  return quickQuestions[lang] ?? quickQuestions.fr;
}

// TODO: remplacer par un vrai appel API (backend de conversation / LLM)
// une fois le service branché. La signature (Promise<string>) doit rester
// la même pour ne pas avoir à toucher au composant ChatWidget.
export function sendMessage(text, lang) {
  const replies = canned[lang] ?? canned.fr;
  return new Promise((resolve) => {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => resolve(reply), 600);
  });
}
