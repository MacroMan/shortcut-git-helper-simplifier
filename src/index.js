const options = {
  'merge-tabs': false,
  'hide-reminder': false,
  'hide-branch-name': false,
  'hide-branch-command': false,
  'hide-commit-message': false,
  'hide-commit-command': false,
};

const mergeTabs = () => {
  const tabs = document.querySelector(".git-branch-dialog .file-tabs");
  if (tabs) tabs.remove();

  ["#link-to-branch", "#link-to-commit"].forEach((selector) => {
    const element = document.querySelector(selector);
    element?.classList?.remove("hidden");
    if (element) element.style = "";
  });
}

const removeAttributeGroup = (name) => {
  const attributeGroup = document.querySelector(`.git-branch-dialog .${name}`)?.parentElement?.parentElement;
  attributeGroup?.previousSibling?.previousSibling?.remove();
  attributeGroup?.remove();
}

const actions = {
  'merge-tabs': mergeTabs,
  'hide-reminder': () => document.querySelector(".git-branch-dialog .mini-info")?.remove(),
  'hide-branch-name': () => removeAttributeGroup("git-branch"),
  'hide-branch-command': () => removeAttributeGroup("git-branch-command"),
  'hide-commit-message': () => removeAttributeGroup("git-commit-msg"),
  'hide-commit-command': () => removeAttributeGroup("git-link-story-to-commit"),
};

(async () => {
  const items = await chrome.storage.sync.get(options);
  Object.assign(options, items);

  const observer = new MutationObserver(() => {
    Object.keys(options).forEach((option) => {
      if (options[option]) {
        actions[option]();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
