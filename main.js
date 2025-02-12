const init = async () => {
    initLocalization()
    initMaterialize()
    //fetchLatestVersion()
}

const initMaterialize = () => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
}

const fetchLatestVersion = async () => {
    try {
        const response = await fetch(
            "https://api.github.com/repos/afaneca/myfin/releases/latest"
        );
        const data = await response.json();
        const latestVersion = data.tag_name; // Extracts latest version

        if (latestVersion) {
            const versionButton = document.querySelector(".btn.icon-right");
            versionButton.innerHTML = `<i class="material-icons">rocket_launch</i> ${i18next.t("versionText", {version: latestVersion})}`;
            versionButton.href = data.html_url; // Link to latest release
        }
    } catch (error) {
        console.error("Failed to fetch latest release:", error);
    }
}

const initLocalization = () => {
    const langSelector = document.getElementById("lang-selector");
    const mobileLangSelector = document.getElementById("mobile-lang-selector");

    // Initialize i18next
    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: getUserLang(),
            fallbackLng: "en",
            backend: {
                loadPath: "locales/{{lng}}.json"
            }
        })
        .then(() => {
            updateContent();
        });

    // Update language when the user selects one
    langSelector.addEventListener("change", changeLanguage);
    mobileLangSelector.addEventListener("change", changeLanguage);

    function changeLanguage(event) {
        const newLang = event.target.value;
        i18next.changeLanguage(newLang, updateContent);
        localStorage.setItem("lang", newLang);
        langSelector.value = newLang;
        mobileLangSelector.value = newLang;
        fetchLatestVersion();
    }

    function updateContent() {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            element.innerHTML = i18next.t(element.getAttribute("data-i18n"));
        });

        langSelector.value = i18next.language;
        mobileLangSelector.value = i18next.language;
        fetchLatestVersion();
    }

    function getUserLang() {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) return storedLang;

        const browserLang = navigator.language.slice(0, 2);
        return ["en", "pt"].includes(browserLang) ? browserLang : "en";
    }
}