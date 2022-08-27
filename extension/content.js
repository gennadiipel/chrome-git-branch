const getTaskHeading = () => {
  return document.querySelector(
    '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
  ).textContent;
};

const getTaskId = () => {
  return document.location.href.split("/").at(-1);
};

const generateBranchName = (heading, id) => {
  return `${id}-${heading
    .toLowerCase()
    .replace(/ *\[[^)]*\] */g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .replace(/\s\s+/g, " ")
    .replaceAll(" ", "-")}`;
};

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.command === "copyBranchName") {
    const branchName = generateBranchName(getTaskHeading(), getTaskId());
    chrome.runtime.sendMessage({
      command: "branchNameGenerated",
      branchName,
    });
  }
});
