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

      const regionDiv = document.createElement("div");
      regionDiv.innerHTML = `<h2 class="region-name">${region.name}</h2>`;

      // Dodaj liczbowy postęp
      const regionProgressLabel = document.createElement("div");
      regionProgressLabel.classList.add("region-progress-label");
      regionProgressLabel.textContent = `${region.defeated} / ${region.total} bossów pokonanych`;
      regionDiv.appendChild(regionProgressLabel);

      // Dodaj pasek postępu dla regionu
      const regionProgressContainer = document.createElement("div");
      regionProgressContainer.classList.add("region-progress-container");

      const regionProgressBar = document.createElement("div");
      regionProgressBar.classList.add("region-progress-bar");

      // Oblicz postęp procentowy regionu
      const regionPercent = region.total === 0 ? 0 : Math.round((region.defeated / region.total) * 100);
      regionProgressBar.style.width = `${regionPercent}%`;
      regionProgressBar.textContent = `${regionPercent}%`;

      regionProgressContainer.appendChild(regionProgressBar);
      regionDiv.appendChild(regionProgressContainer);

      // Dodaj listę bossów
      const regionList = document.createElement("ul");
      region.bosses.forEach((boss, i) => {
        const isDefeated = region.defeated_bosses[i];
        const listItem = document.createElement("li");
        listItem.innerHTML = `${isDefeated ? "✅" : "❌"} ${boss}`;
        regionList.appendChild(listItem);
      });

      regionDiv.appendChild(regionList);
      container.appendChild(regionDiv);
    });

    const percent = total === 0 ? 0 : Math.round((defeated / total) * 100);
    progressFill.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    progressLabel.textContent = `🔥 Postęp globalny: ${defeated} / ${total} bossów pokonanych`;
  });
