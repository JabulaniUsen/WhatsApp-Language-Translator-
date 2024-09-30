document.getElementById("save-language").addEventListener("click", function () {
    const selectedLanguage = document.getElementById("language-select").value;
    
    // Save the selected language to Chrome storage
    chrome.storage.sync.set({ preferredLanguage: selectedLanguage }, function () {
      alert("Preferred language saved: " + selectedLanguage);
    });
  });
  