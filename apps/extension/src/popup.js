// Get current tab info when popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab) return;
  
  // Display site info
  document.getElementById('favicon').src = tab.favIconUrl || 'icon16.png';
  document.getElementById('title').textContent = tab.title || 'Untitled';
  document.getElementById('url').textContent = tab.url || '';
  
  // Set up save button
  const saveBtn = document.getElementById('save-btn');
  const tagsInput = document.getElementById('tags');
  const noteInput = document.getElementById('note');
  const successMsg = document.getElementById('success-message');
  
  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    // Prepare data
    const siteData = {
      url: tab.url,
      title: tab.title,
      favicon: tab.favIconUrl,
      tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean),
      note: noteInput.value.trim(),
      collectedAt: new Date().toISOString()
    };
    
    // Save to chrome.storage
    chrome.storage.local.get(['sites'], (result) => {
      const sites = result.sites || [];
      sites.push(siteData);
      
      chrome.storage.local.set({ sites }, () => {
        // Show success message
        successMsg.classList.remove('hidden');
        saveBtn.textContent = 'Added!';
        
        // Close popup after a delay
        setTimeout(() => {
          window.close();
        }, 1500);
      });
    });
  });
  
  // Handle Enter key in inputs
  [tagsInput, noteInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target === tagsInput) {
        noteInput.focus();
      } else if (e.key === 'Enter' && e.target === noteInput && !e.shiftKey) {
        e.preventDefault();
        saveBtn.click();
      }
    });
  });
  
  // Auto-focus tags input
  tagsInput.focus();
});