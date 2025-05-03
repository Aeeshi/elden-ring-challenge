
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
      regionDiv.innerHTML = `<h2>${region.name}</h2><ul>`;

      region.bosses.forEach((boss, i) => {
        const isDefeated = region.defeated_bosses[i];
        regionDiv.innerHTML += `<li>${isDefeated ? "✅" : "❌"} ${boss}</li>`;
      });

      regionDiv.innerHTML += "</ul>";
      container.appendChild(regionDiv);
    });

    const percent = total === 0 ? 0 : Math.round((defeated / total) * 100);
    progressFill.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    progressLabel.textContent = `🔥 Postęp globalny: ${defeated} / ${total} bossów pokonanych`;
  });
