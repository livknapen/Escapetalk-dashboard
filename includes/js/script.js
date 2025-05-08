window.onload = function () {
  const reviewCtx = document.getElementById("reviewChart");
  const visitorCtx = document.getElementById("visitorChart");

  // Data voor reviews
  const reviewWeekLabels = ["ma", "di", "wo", "do", "vr", "za", "zo"];
  const reviewWeekDataJij = [15, 18, 16, 23, 25, 27, 26];
  const reviewWeekDataGemiddeld = [12, 15, 17, 18, 13, 15, 25];

  const reviewMonthLabels = ["week 1", "week 2", "week 3", "week 4"];
  const reviewMonthDataJij = [110, 140, 135, 160];
  const reviewMonthDataGemiddeld = [100, 120, 115, 140];

  // Review score
  const weekReviewScore = 7.5;
  const monthReviewScore = 8.2;

  // Totale reviews
  const weekTotalReviews = 150;
  const monthTotalReviews = 600;

  // Data voor bezoekers
  const visitorWeekLabels = ["ma", "di", "wo", "do", "vr", "za", "zo"];
  const visitorWeekDataJij = [20, 25, 15, 26, 20, 21, 28];
  const visitorWeekDataGemiddeld = [15, 20, 17, 18, 16, 12, 29];

  const visitorMonthLabels = ["week 1", "week 2", "week 3", "week 4"];
  const visitorMonthDataJij = [120, 130, 125, 140];
  const visitorMonthDataGemiddeld = [110, 120, 115, 125];

  // Aantal views
  const weekAantalViews = 152;
  const monthAantalViews = 515;

  // Converieratio
  const weekVisitorConversion = 10;
  const monthVisitorConversion = 43;

  // Data voor aantal kliks
  const adWeekLabels = ["Ad1", "Ad2"];
  const adUitleg = {
    Ad1: "ad1: deze advertentie is voor de zomer",
    Ad2: "ad2: deze advertentie is voor de winter",
  };
  const adAantalKliks = [76, 103];

  // Click Through Rate
  const adClickThroughRate = 20;

  // reviewChart
  const reviewChart = new Chart(reviewCtx, {
    type: "bar",
    data: {
      labels: reviewWeekLabels,
      datasets: [
        {
          type: "bar",
          label: "Jij",
          data: reviewWeekDataJij,
          backgroundColor: "#3585ED",
          barThickness: 20,
          borderRadius: 20,
          borderSkipped: false,
          order: 1,
        },
        {
          type: "line",
          label: "Gemiddelde van concurrenten",
          data: reviewWeekDataGemiddeld,
          backgroundColor: "#B8B8B8",
          borderColor: "#B8B8B8",
          pointRadius: 0,
          borderWidth: 2,
          fill: false,
          order: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          border: { color: "#000000" },
        },
        y: {
          grid: { display: false },
          border: { color: "#000000" },
          title: {
            display: true,
            text: "Aantal reviews",
            color: "#666",
            font: { size: 12, weight: "300" },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: function (ctx) {
              const dataset = ctx.dataset || {};
              return dataset.type === "line" ? "line" : "rect";
            },
          },
        },
      },
    },
  });

  // visitorChart
  const visitorChart = new Chart(visitorCtx, {
    type: "line",
    data: {
      labels: visitorWeekLabels,
      datasets: [
        {
          label: "Jij",
          data: visitorWeekDataJij,
          borderColor: "#3585ED",
          pointRadius: 0,
          borderWidth: 3,
          fill: false,
        },
        {
          label: "Gemiddelde van concurrenten",
          data: visitorWeekDataGemiddeld,
          borderColor: "#B8B8B8",
          pointRadius: 0,
          borderWidth: 3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          border: { color: "#000000" },
        },
        y: {
          grid: { display: false },
          border: { color: "#000000" },
          title: {
            display: true,
            text: "Aantal kliks",
            color: "#666",
            font: { size: 12, weight: "300" },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "line",
          },
        },
      },
    },
  });

  // Filter-buttons activeren
  const allGroups = document.querySelectorAll(".filter-buttons");

  allGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".filter-button");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.add("inactive"));
        this.classList.remove("inactive");

        const parent = group.getAttribute("id");
        const isWeek = this.innerText === "Week";

        if (parent === "review-filter") {
          reviewChart.data.labels = isWeek
            ? reviewWeekLabels
            : reviewMonthLabels;
          reviewChart.data.datasets[0].data = isWeek
            ? reviewWeekDataJij
            : reviewMonthDataJij;
          reviewChart.data.datasets[1].data = isWeek
            ? reviewWeekDataGemiddeld
            : reviewMonthDataGemiddeld;
          reviewChart.update();

          document.getElementById("review-total").innerText = isWeek
            ? weekTotalReviews
            : monthTotalReviews;
          document.getElementById("review-score").innerText = isWeek
            ? weekReviewScore
            : monthReviewScore;
        }

        if (parent === "visitor-filter") {
          visitorChart.data.labels = isWeek
            ? visitorWeekLabels
            : visitorMonthLabels;
          visitorChart.data.datasets[0].data = isWeek
            ? visitorWeekDataJij
            : visitorMonthDataJij;
          visitorChart.data.datasets[1].data = isWeek
            ? visitorWeekDataGemiddeld
            : visitorMonthDataGemiddeld;
          visitorChart.update();

          document.getElementById("aantal-views").innerText = isWeek
            ? weekAantalViews
            : monthAantalViews;
          document.getElementById("visitor-total").innerText =
            (isWeek ? weekVisitorConversion : monthVisitorConversion) + "%";
        }
      });
      document.getElementById("review-total").innerText = weekTotalReviews;
      document.getElementById("review-score").innerText = weekReviewScore;
      document.getElementById("visitor-total").innerText =
        weekVisitorConversion + "%";
      document.getElementById("aantal-views").innerText = weekAantalViews;
      document.getElementById("aantal-ctr").innerText =
        adClickThroughRate + "%";
    });
  });

  //  adChart
  const adCtx = document.getElementById("adChart");
  new Chart(adCtx, {
    type: "bar",
    data: {
      labels: adWeekLabels,
      datasets: [
        {
          type: "bar",
          label: "Jij",
          data: adAantalKliks,
          backgroundColor: adAantalKliks.map(() => "#3585ED"),
          barThickness: 30,
          borderRadius: 20,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          border: { color: "#000000" },
          title: {
            display: true,
            text: "Aantal views",
            color: "#666",
            font: { size: 12, weight: "300" },
          },
        },
        y: {
          grid: { display: false },
          border: { color: "#000000" },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            generateLabels: function (chart) {
              return chart.data.labels.map((label, index) => {
                return {
                  text: adUitleg[label] || label,
                  fillStyle:
                    chart.data.datasets[0].backgroundColor[index] || "#3585ED",
                  strokeStyle:
                    chart.data.datasets[0].backgroundColor[index] || "#3585ED",
                  lineWidth: 0,
                  hidden: false,
                  index: index,
                };
              });
            },
          },
        },
      },
    },
  });
};

// Sidebar active link
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar a");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Locked review-statistieken
// const heeftVriendAbonnement = false;

// const reviewStatistieken = document.querySelector('.review-statistieken');

// if (!heeftVriendAbonnement) {
//   reviewStatistieken.classList.add('locked');
// } else {
//   reviewStatistieken.classList.remove('locked');
// }

let scrollPosition = 0;

function openModal(modal) {
  scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Bepaal scrollbarbreedte
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // Vergrendel body en compenseer voor scrollbar
  document.body.classList.add("modal-open");
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  modal.classList.add("visible");
}

function closeModal(modal) {
  modal.classList.remove("visible");
  document.body.classList.remove("modal-open");

  // Herstel scroll en layout
  const scrollY = parseInt(document.body.style.top || "0") * -1;
  document.body.style.top = "";
  document.body.style.paddingRight = "";

  // Scroll terug
  window.scrollTo(0, scrollY);
}

// Open knop
document.querySelectorAll(".open-modal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn
      .closest(".blok-button-reageren")
      .querySelector(".popup-modal");
    openModal(modal);
  });
});

// Sluit via x
document.querySelectorAll(".popup-modal .close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".popup-modal");
    closeModal(modal);
  });
});

// Sluit bij klik buiten popup
window.addEventListener("click", (e) => {
  document.querySelectorAll(".popup-modal.visible").forEach((modal) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Sluit bij Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup-modal.visible").forEach((modal) => {
      closeModal(modal);
    });
  }
});

document.querySelectorAll('.textarea-popup').forEach((textarea) => {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto'; // reset eerst
      textarea.style.height = textarea.scrollHeight + 'px'; // stel hoogte opnieuw in
    });
  });