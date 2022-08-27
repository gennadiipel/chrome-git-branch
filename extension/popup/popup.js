chrome.storage.local.get(["pathToRepo"], ({ pathToRepo }) => {
  document.getElementById("path-to-repo").value = pathToRepo || "";
});

document.getElementById("create-branch").addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { command: "copyBranchName" });
  });
});

document.getElementById("path-to-repo").addEventListener("blur", () => {
  const pathToRepo = document.getElementById("path-to-repo").value;
  chrome.storage.local.set({ pathToRepo });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.command === "branchNameGenerated") {
    const branchName = message.branchName;
    chrome.storage.local.get(["pathToRepo"], ({ pathToRepo }) => {
      fetch(`http://localhost:10101`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branchName,
          pathToRepo,
        }),
      }).then(() => {
        document.getElementById(
          "success-message"
        ).innerHTML = `Branch <b>${branchName}</b> created`;
        document.getElementById("success-message").style.display = "block";
        document.getElementById("create-branch").style.display = "none";
      });
    });
  }
});
