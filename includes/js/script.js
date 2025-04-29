window.onload = function() {
    const reviewCtx = document.getElementById('reviewChart');
    const visitorCtx = document.getElementById('visitorChart');
  
    // Data voor reviews
    const reviewWeekLabels = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
    const reviewWeekDataJij = [15, 18, 16, 23, 25, 27, 26];
    const reviewWeekDataGemiddeld = [12, 15, 17, 18, 13, 15, 25];
  
    const reviewMonthLabels = ['week 1', 'week 2', 'week 3', 'week 4'];
    const reviewMonthDataJij = [110, 140, 135, 160];
    const reviewMonthDataGemiddeld = [100, 120, 115, 140];

    // Totale reviews
    const weekTotalReviews = 150;
    const monthTotalReviews = 600;
  
    // Data voor bezoekers
    const visitorWeekLabels = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
    const visitorWeekDataJij = [20, 25, 15, 26, 20, 21, 28];
    const visitorWeekDataGemiddeld = [15, 20, 17, 18, 16, 12, 29];
  
    const visitorMonthLabels = ['week 1', 'week 2', 'week 3', 'week 4'];
    const visitorMonthDataJij = [120, 130, 125, 140];
    const visitorMonthDataGemiddeld = [110, 120, 115, 125];

    // Converieratio
    const weekVisitorConversion = 10;    
    const monthVisitorConversion = 43;   
  
    // reviewChart
    const reviewChart = new Chart(reviewCtx, {
      type: 'bar',
      data: {
        labels: reviewWeekLabels,
        datasets: [
          {
            type: 'bar',
            label: 'Jij',
            data: reviewWeekDataJij,
            backgroundColor: '#3585ED',
            barThickness: 20,
            borderRadius: 20,
            borderSkipped: false,
            order: 1
          },
          {
            type: 'line',
            label: 'Gemiddelde van concurrenten',
            data: reviewWeekDataGemiddeld,
            backgroundColor: '#B8B8B8',
            borderColor: '#B8B8B8',
            pointRadius: 0,
            borderWidth: 2,
            fill: false,
            order: 2
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            border: { color: '#000000' }
          },
          y: {
            grid: { display: false },
            border: { color: '#000000' },
            title: {
              display: true,
              text: 'Aantal reviews',
              color: '#666',
              font: { size: 12, weight: '300' }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: function(ctx) {
                const dataset = ctx.dataset || {};
                return dataset.type === 'line' ? 'line' : 'rect';
              }
            }
          }
        }
      }
    });
  
    // visitorChart
    const visitorChart = new Chart(visitorCtx, {
      type: 'line',
      data: {
        labels: visitorWeekLabels,
        datasets: [
          {
            label: 'Jij',
            data: visitorWeekDataJij,
            borderColor: '#3585ED',
            pointRadius: 0,
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Gemiddelde van concurrenten',
            data: visitorWeekDataGemiddeld,
            borderColor: '#B8B8B8',
            pointRadius: 0,
            borderWidth: 3,
            fill: false
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            border: { color: '#000000' }
          },
          y: {
            grid: { display: false },
            border: { color: '#000000' },
            title: {
              display: true,
              text: 'Aantal kliks',
              color: '#666',
              font: { size: 12, weight: '300' }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'line'
            }
          }
        }
      }
    });
  
    // Filter-buttons activeren
    const allGroups = document.querySelectorAll('.filter-buttons');
  
    allGroups.forEach(group => {
      const buttons = group.querySelectorAll('.filter-button');
  
      buttons.forEach(button => {
        button.addEventListener('click', function() {
          buttons.forEach(btn => btn.classList.add('inactive'));
          this.classList.remove('inactive');
  
          const parent = group.getAttribute('id');
          const isWeek = this.innerText === 'Week';
  
          if (parent === 'review-filter') {
            reviewChart.data.labels = isWeek ? reviewWeekLabels : reviewMonthLabels;
            reviewChart.data.datasets[0].data = isWeek ? reviewWeekDataJij : reviewMonthDataJij;
            reviewChart.data.datasets[1].data = isWeek ? reviewWeekDataGemiddeld : reviewMonthDataGemiddeld;
            reviewChart.update();
          
            document.getElementById('review-total').innerText = isWeek ? weekTotalReviews : monthTotalReviews;          
          }
  
          if (parent === 'visitor-filter') {
            visitorChart.data.labels = isWeek ? visitorWeekLabels : visitorMonthLabels;
            visitorChart.data.datasets[0].data = isWeek ? visitorWeekDataJij : visitorMonthDataJij;
            visitorChart.data.datasets[1].data = isWeek ? visitorWeekDataGemiddeld : visitorMonthDataGemiddeld;
            visitorChart.update();

            document.getElementById('visitor-total').innerText = (isWeek ? weekVisitorConversion : monthVisitorConversion) + '%';
            
          }
        });
        document.getElementById('review-total').innerText = weekTotalReviews;
        document.getElementById('visitor-total').innerText = weekVisitorConversion + '%';
      });
    });
  
  
    //  adChart
    const adCtx = document.getElementById('adChart');
    new Chart(adCtx, {
      type: 'bar',
      data: {
        labels: ['Ad 1', 'Ad 2'],
        datasets: [{
          label: 'Aantal klikken',
          data: [120, 80],
          backgroundColor: '#4477C2'
        }]
      },
      options: {
        indexAxis: 'y'
      }
    });
  };

  