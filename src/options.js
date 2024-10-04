const options = {
  'merge-tabs': false,
  'hide-reminder': false,
  'hide-branch-name': false,
  'hide-branch-command': false,
  'hide-commit-message': false,
  'hide-commit-command': false,
};

const optionsForm = document.getElementById("options-form");

// Save options on checkbox change
Object.keys(options).forEach((option) => {
  optionsForm[option].addEventListener("change", (event) => {
    options[option] = event.target.checked;
    chrome.storage.sync.set(options);
  });
});

(async () => {
  const data = await chrome.storage.sync.get(options);
  Object.assign(options, data);

  Object.keys(options).forEach((option) => {
    optionsForm[option].checked = Boolean(options[option]);
  });
})();
