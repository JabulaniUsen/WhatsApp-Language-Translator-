// Function to translate text using an API (replace this with a real API if needed)
function translateText(text, targetLang) {
    // For now, just return the text with "[Translated]" to simulate translation
    return "[Translated to " + targetLang + "]: " + text;
  }
  
  // Inject translation functionality into WhatsApp Web
  chrome.storage.sync.get("preferredLanguage", function (data) {
    const preferredLanguage = data.preferredLanguage || "en";
  
    // Monitor chat messages and translate them
    const chatObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const addedNodes = mutation.addedNodes;
        addedNodes.forEach((node) => {
          if (node && node.nodeType === 1) {
            // Detect message text
            const messageTextElement = node.querySelector(".selectable-text span");
            if (messageTextElement) {
              const originalText = messageTextElement.innerText;
              const translatedText = translateText(originalText, preferredLanguage);
              messageTextElement.innerText = translatedText;
            }
          }
        });
      });
    });
  
    const chatContainer = document.querySelector("#main .copyable-area");
    if (chatContainer) {
      chatObserver.observe(chatContainer, { childList: true, subtree: true });
    }
  });
  
  // Detect when the user sends a message
  const inputObserver = new MutationObserver(() => {
    const inputBox = document.querySelector("div[title='Type a message']");
  
    if (inputBox) {
      inputBox.addEventListener("input", () => {
        const userMessage = inputBox.innerText;
  
        // Translate the message before sending it
        chrome.storage.sync.get("preferredLanguage", function (data) {
          const preferredLanguage = data.preferredLanguage || "en";
          const translatedMessage = translateText(userMessage, preferredLanguage);
  
          inputBox.innerText = translatedMessage;
        });
      });
    }
  });
  
  // Start observing the message input area
  const inputArea = document.querySelector("#main footer");
  if (inputArea) {
    inputObserver.observe(inputArea, { childList: true, subtree: true });
  }
  