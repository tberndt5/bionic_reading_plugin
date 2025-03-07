document.addEventListener('DOMContentLoaded', () => {
    const boldFraction = document.getElementById('boldFraction');
    const fontWeight = document.getElementById('fontWeight');
    const scaleTransform = document.getElementById('scaleTransform');
    const saveBtn = document.getElementById('saveBtn');
  
    // Load existing settings
    chrome.storage.sync.get(['boldFraction', 'fontWeight', 'scaleTransform'], (result) => {
      boldFraction.value = result.boldFraction || 3;
      fontWeight.value = result.fontWeight || 900;
      scaleTransform.value = result.scaleTransform || 1.15;
    });
  
    // Save and apply settings
    saveBtn.addEventListener('click', () => {
      chrome.storage.sync.set({
        boldFraction: parseInt(boldFraction.value, 10),
        fontWeight: parseInt(fontWeight.value, 10),
        scaleTransform: parseFloat(scaleTransform.value)
      }, () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.reload(tabs[0].id);
        });
      });
    });
  });
