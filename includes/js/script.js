window.onload = function() {
    const reviewCtx = document.getElementById('reviewChart');
    new Chart(reviewCtx, {
        type: 'bar',
      data: {
        labels: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'],
        datasets: [
        {
            type: 'bar',
            label: 'Jij',
            data: [15, 18, 16, 23, 25, 27, 26],
            backgroundColor: '#3585ED',
            barThickness: 20,
            borderRadius: 20,
            borderSkipped: false,
            order: 1,
            
        },
        {
            type: 'line',
            label: 'Gemiddelde van concurrenten',
            data: [12, 15, 17, 18, 13, 15, 25],
            backgroundColor: '#B8B8B8',
            pointRadius: 0,
            order: 2
        }
        ]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Aantal views',
              color: '#666',
              font: {
                size: 12,
                weight: '300'
              }
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
  
    const visitorCtx = document.getElementById('visitorChart');
    new Chart(visitorCtx, {
      type: 'line',
      data: {
        labels: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'],
        datasets: [
        {
          label: 'Jij',
          data: [20, 25, 15, 26, 20, 21, 28],
          borderColor: '#3585ED',
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Gemiddelde van concurrenten',
          data: [15, 20, 17, 18, 16, 12, 29],
          borderColor: '#B8B8B8',
          pointRadius: 0,
          fill: false
        }
        ]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Aantal views',
              color: '#666',
              font: {
                size: 12,
                weight: '300'
              }
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
  