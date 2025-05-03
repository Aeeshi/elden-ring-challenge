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

      // Dodajemy nazwę regionu
      regionDiv.innerHTML = `<h2 class="region-name">${region.name}</h2>`;

      // Dodajemy liczbowy postęp
      regionDiv.innerHTML += `
        <div class="region-progress-label">
          ${region.defeated} / ${region.total} bossów pokonanych
        </div>
      `;

      // Dodajemy pasek postępu regionu
      regionDiv.innerHTML += `
        <div class="region-progress-container">
          <div class="region-progress-bar" style="width: ${(region.defeated / region.total) * 100}%;">
            ${(region.defeated / region.total) * 100}%
          </div>
        </div>
      `;

      // Dodajemy listę bossów
      regionDiv.innerHTML += "<ul>";
      region.bosses.forEach((boss, i) => {
        const isDefeated = region.defeated_bosses[i];
        regionDiv.innerHTML += `<li>${isDefeated ? "✅" : "❌"} ${boss}</li>`;
      });
      regionDiv.innerHTML += "</ul>";

      container.appendChild(regionDiv);
    });

    // Obliczamy i aktualizujemy globalny postęp
    const percent = total === 0 ? 0 : Math.round((defeated / total) * 100);
    progressFill.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    progressLabel.textContent = `🔥 Postęp globalny: ${defeated} / ${total} bossów pokonanych`;
  });
