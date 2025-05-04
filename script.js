fetch('progress.json')
  .then(response => response.json())
  .then(data => {
    const regionsContainer = document.getElementById('regions');
    data.forEach(region => {
      const defeatedCount = region.defeated_bosses.filter(Boolean).length;
      const percentage = ((defeatedCount / region.total) * 100).toFixed(1);

      const regionElement = document.createElement('div');
      regionElement.className = 'region-progress';
      regionElement.innerHTML = `
        <h3>${region.name}</h3>
        <div class="progress-bar-wrapper">
          <div class="progress-bar-fill" style="width: ${percentage}%;"><span class="progress-percent">${percentage}%</span></div>
        </div>
        <p>${defeatedCount} / ${region.total} bossów pokonanych</p>
      `;
      regionsContainer.appendChild(regionElement);
    });
  });