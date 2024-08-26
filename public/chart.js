fetch('/data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('myPieChart').getContext('2d');

        const chartData = {
            labels: data.labels, // Use the labels from the API response
            datasets: [{
                label: 'Amount',
                data: data.dataValues, // Use the data values from the API response
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const totalPlugin = { //totalPlugin shows the total at the end
            id: 'totalPlugin',
            afterDraw: function(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
        
                // Calculate the total sum of data
                const total = chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
        
                // Set font style for the total text
                ctx.save();
                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
        
                // Position the total text at the bottom center of the chart
                ctx.fillText('Total: ' + total, (chartArea.left + chartArea.right) / 2, chartArea.bottom + 30);
        
                ctx.restore();
            }
        };

        const config = {
            type: 'pie',
            data: chartData, 
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels:{
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: 'Statement Data Chart'
                    }
                },
                layout: {
                    padding: {
                        bottom: 50 // Increase bottom padding to make space for the total
                    }
                }
            },
            plugins: [totalPlugin] //Plugin
        };

        // Create the chart with Chart.js
        const myPieChart = new Chart(ctx, config);
    })
    .catch(error => console.error('Error fetching data:', error));
