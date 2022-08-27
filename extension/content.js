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

    fetch(`http://localhost:10101`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branchName,
        pathToRepo: "/Users/gennadiipel/Work/chrome-git-branch",
      }),
    }).then((res) => {
      alert(res.body);
    });
  }
});
