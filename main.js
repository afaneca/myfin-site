const init = async () => {
    const elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    
        try {
          const response = await fetch(
            "https://api.github.com/repos/afaneca/myfin/releases/latest"
          );
          const data = await response.json();
          const latestVersion = data.tag_name; // Extracts latest version
    
          if (latestVersion) {
            const versionButton = document.querySelector(".btn.icon-right");
            versionButton.innerHTML = `<i class="material-icons">rocket_launch</i> Version ${latestVersion} is live!`;
            versionButton.href = data.html_url; // Link to latest release
          }
        } catch (error) {
          console.error("Failed to fetch latest release:", error);
        }
}