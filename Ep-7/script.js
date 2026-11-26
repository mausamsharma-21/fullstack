
const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const universityList = document.getElementById("universityList");
const statusText = document.getElementById("status");
const resultHeading = document.getElementById("resultHeading");

async function searchUniversities() {
  const country = countryInput.value.trim();

  if (!country) {
    statusText.textContent = "Please enter a country name.";
    countryInput.focus();
    return;
  }

  universityList.innerHTML = "";
  resultHeading.textContent = "";
  statusText.textContent = "Loading universities... 🎓";
  searchBtn.disabled = true;

  try {
    const apiURL =
      `https://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const universities = await response.json();

    if (universities.length === 0) {
      statusText.textContent =
        "No universities found. Check the country spelling and try again.";
      return;
    }

    statusText.textContent = "";
    resultHeading.textContent =
      `${universities.length} Universities Found`;

    universities.forEach((university) => {
      const card = document.createElement("div");
      card.className = "university-card";

      const name = document.createElement("h3");
      name.textContent = university.name || "Unknown University";

      const state = document.createElement("p");
      state.textContent =
        `State / Province: ${university["state-province"] || "Not available"}`;

      const websiteLabel = document.createElement("p");
      websiteLabel.textContent = "Official Website:";

      card.appendChild(name);
      card.appendChild(state);
      card.appendChild(websiteLabel);

      if (university.web_pages && university.web_pages.length > 0) {
        university.web_pages.forEach((url) => {
          try {
            const parsedURL = new URL(url);

            if (!["http:", "https:"].includes(parsedURL.protocol)) {
              return;
            }

            const link = document.createElement("a");
            link.href = parsedURL.href;
            link.textContent = parsedURL.hostname;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);
          } catch {
            // Ignore invalid website URLs.
          }
        });
      } else {
        const noWebsite = document.createElement("p");
        noWebsite.textContent = "Website not available";
        card.appendChild(noWebsite);
      }

      universityList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    statusText.textContent =
      "Unable to load universities. Please check your internet connection and try again.";
  } finally {
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", searchUniversities);

countryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchUniversities();
  }
});
