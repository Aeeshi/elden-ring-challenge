fetch("progress.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("regions-container");
    const progressFill = document.getElementById("progress-fill");
    const progressLabel = document.getElementById("global-progress-label");
    const progressPercent = document.getElementById("progress-percent");

    let total = 0;
    let defeated = 0;

    data.forEach((region) => {
      total += region.total;
      defeated += region.defeated;

      // Utworzenie kontenera dla regionu
      const regionDiv = document.createElement("div");
      regionDiv.classList.add("region-container");

      // Dodanie nagłówka regionu
      const regionHeader = document.createElement("h2");
      regionHeader.classList.add("region-header");
      regionHeader.textContent = region.name;
      regionDiv.appendChild(regionHeader);

      // Utworzenie listy bossów
      const regionBossList = document.createElement("ul");
      region.bosses.forEach((boss, i) => {
        const listItem = document.createElement("li");
        const isDefeated = region.defeated_bosses[i];
        listItem.innerHTML = `${isDefeated ? "✅" : "❌"} ${boss}`;
        regionBossList.appendChild(listItem);
      });
      regionDiv.appendChild(regionBossList);

      // Utworzenie paska postępu dla regionu
      const regionProgressContainer = document.createElement("div");
      regionProgressContainer.classList.add("region-progress-container");
      const regionProgressBar = document.createElement("div");
      regionProgressBar.classList.add("region-progress-bar");
      const defeatedRegion = region.defeated;
      const regionPercent = region.total === 0 ? 0 : Math.round((defeatedRegion / region.total) * 100);
      regionProgressBar.style.width = regionPercent + "%";
      regionProgressBar.textContent = `${defeatedRegion} / ${region.total} bossów`;
      regionProgressContainer.appendChild(regionProgressBar);
      regionDiv.appendChild(regionProgressContainer);

      // Dodanie kontenera regionu do głównego kontenera
      container.appendChild(regionDiv);
    });

    // Globalny postęp
    const percent = total === 0 ? 0 : Math.round((defeated / total) * 100);
    progressFill.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    progressLabel.textContent = `🔥 Postęp globalny: ${defeated} / ${total} bossów pokonanych`;
  });
