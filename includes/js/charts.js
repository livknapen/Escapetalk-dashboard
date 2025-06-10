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
    Ad1: "Ad1: deze advertentie is voor de zomer",
    Ad2: "Ad2: deze advertentie is voor de winter",
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
};

// Automatisch datums sorteren
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".reviews-blok");
  const reviews = Array.from(container.querySelectorAll(".reviews-inhoud"));

  reviews.sort((a, b) => {
    const datumA = new Date(
      a.querySelector(".blok-review-datum").dataset.datum
    );
    const datumB = new Date(
      b.querySelector(".blok-review-datum").dataset.datum
    );
    return datumB - datumA;
  });

  reviews.forEach((review) => container.appendChild(review));
});

// Automatisch groen of rode pijl
document.addEventListener("DOMContentLoaded", () => {
  const statInhoudElements = document.querySelectorAll("[data-huidig]");
  const parseNumber = (str) =>
    parseFloat(
      str
        .toString()
        .replace(/[^0-9.,-]/g, "")
        .replace(",", ".")
    );

  const svgUp = `
    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.0919 1.17639C19.1015 1.10177 19.1015 1.02612 19.0919 0.951495C19.083 0.88862 19.0659 0.827347 19.0411 0.769438C19.0143 0.7171 18.9837 0.66698 18.9497 0.61951C18.935 0.593704 18.919 0.568826 18.9016 0.544984C18.8457 0.468046 18.7668 0.412328 18.6858 0.362489C18.643 0.32882 18.5967 0.300465 18.5479 0.277936C18.5122 0.26144 18.4728 0.255397 18.4334 0.255397C18.3416 0.255397 18.2559 0.214989 18.1799 0.163443C18.1718 0.157928 18.1635 0.152587 18.1552 0.147424C18.1053 0.116512 18.0463 0.105469 17.9876 0.105469H13.0006C12.7314 0.105469 12.4732 0.218298 12.2828 0.419134C12.0924 0.61997 11.9854 0.892362 11.9854 1.17639C11.9854 1.46041 12.0924 1.73281 12.2828 1.93364C12.4732 2.13448 12.7314 2.24731 13.0006 2.24731C14.1559 2.24731 14.7964 3.58535 14.072 4.48521L13.0251 5.78552C12.3338 6.64426 11.1092 6.84976 10.1754 6.26375L7.42717 4.53907C7.21944 4.40874 6.97445 4.36087 6.73625 4.40405C6.49805 4.44724 6.28227 4.57866 6.12771 4.77468L1.05169 11.2002C0.966208 11.3084 0.901804 11.4333 0.862165 11.5679C0.822527 11.7024 0.808434 11.8438 0.820694 11.9841C0.832953 12.1243 0.871324 12.2607 0.933609 12.3853C0.995894 12.5099 1.08087 12.6203 1.18367 12.7102C1.36631 12.8698 1.59619 12.957 1.8334 12.9565C1.98254 12.9568 2.12991 12.9223 2.26501 12.8557C2.40012 12.7891 2.51965 12.6919 2.6151 12.571L4.34188 10.3851C5.92829 8.37695 8.77495 7.89084 10.9379 9.25874L11.4677 9.59381C11.6733 9.72246 11.9153 9.77044 12.1512 9.7293C12.3871 9.68816 12.6016 9.56054 12.757 9.36892L15.5088 5.97999C16.0276 5.34103 17.0615 5.70791 17.0615 6.53098C17.0615 6.81501 17.1684 7.0874 17.3588 7.28824C17.5492 7.48907 17.8074 7.6019 18.0767 7.6019C18.3459 7.6019 18.6041 7.48907 18.7945 7.28824C18.9849 7.0874 19.0919 6.81501 19.0919 6.53098V1.17639Z" fill="#5ECA52"/>
    </svg>`;

  const svgDown = `
    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3606 11.4851C19.3705 11.5579 19.3705 11.6316 19.3606 11.7044C19.3515 11.7657 19.334 11.8254 19.3085 11.8819C19.281 11.9329 19.2497 11.9818 19.2148 12.0281C19.2001 12.0526 19.1841 12.0763 19.1668 12.0991C19.1086 12.1757 19.0272 12.2301 18.9441 12.2787C18.9002 12.3115 18.8527 12.3392 18.8027 12.3612C18.766 12.3773 18.7259 12.3831 18.6858 12.3831C18.5911 12.3831 18.5023 12.4237 18.4224 12.4746C18.4147 12.4796 18.4069 12.4843 18.399 12.489C18.3482 12.5188 18.289 12.5293 18.2301 12.5293H13.1134C12.8373 12.5293 12.5724 12.4193 12.3772 12.2235C12.1819 12.0276 12.0722 11.762 12.0722 11.4851C12.0722 11.2082 12.1819 10.9426 12.3772 10.7468C12.5724 10.5509 12.8373 10.4409 13.1134 10.4409C14.2766 10.4409 14.9075 9.07993 14.1558 8.19229L13.0699 6.91C12.3921 6.10961 11.2349 5.91679 10.3342 6.45416L7.39723 8.20638C7.18418 8.33346 6.93291 8.38014 6.68861 8.33803C6.44431 8.29592 6.22301 8.16779 6.06449 7.97666L0.858496 1.71157C0.770825 1.60606 0.704771 1.48424 0.664118 1.35308C0.623465 1.22193 0.609012 1.08402 0.621585 0.94726C0.634158 0.810496 0.673512 0.677566 0.737391 0.556078C0.801271 0.43459 0.888422 0.326933 0.993852 0.239275C1.18118 0.0836067 1.41694 -0.0013628 1.66022 -0.000886917C1.81318 -0.00113583 1.96432 0.0324183 2.10289 0.0973883C2.24146 0.162358 2.36405 0.25715 2.46194 0.37502L4.35197 2.64955C5.92998 4.54858 8.65792 5.01141 10.774 3.73913L11.5412 3.27785C11.7521 3.15241 12.0003 3.10563 12.2422 3.14574C12.4841 3.18585 12.7041 3.31029 12.8635 3.49712L15.7184 6.83965C16.2532 7.46573 17.2782 7.08757 17.2782 6.2642C17.2782 5.98727 17.3879 5.72168 17.5832 5.52586C17.7784 5.33004 18.0433 5.22002 18.3194 5.22002C18.5956 5.22002 18.8604 5.33004 19.0556 5.52586C19.2509 5.72168 19.3606 5.98727 19.3606 6.2642V11.4851Z" fill="#E04942"/>
    </svg>`;

  const svgNeutral = `
    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M1.77656 4.98503C3.08942 3.65548 5.28185 3.76177 8.77675 5.32624C12.3593 6.92954 14.108 7.01543 16.0303 5.68314C17.1991 4.87286 17.5535 4.14808 17.5535 2.56871C17.5535 0.268475 17.2365 0.0900259 15.7769 1.57017C14.4211 2.94482 12.9426 2.85109 8.69074 1.11954C3.26466 -1.0897 0 0.0127625 0 4.05513C0 6.28908 0.324448 6.4589 1.77656 4.98503Z"
        fill="#F2984F" />
    </svg>`;

  statInhoudElements.forEach((el) => {
    const iconSpan = el.querySelector(".stat-icon");
    if (!iconSpan) return;

    const huidig = parseNumber(el.dataset.huidig);
    const vorige = parseNumber(el.dataset.vorige);

    if (!isNaN(huidig) && !isNaN(vorige)) {
      if (huidig > vorige) {
        iconSpan.innerHTML = svgUp;
      } else if (huidig < vorige) {
        iconSpan.innerHTML = svgDown;
      } else {
        iconSpan.innerHTML = svgNeutral;
      }
    }
  });
});
