document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    const trafficChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['North', 'South', 'East', 'West'],
            datasets: [{
                label: 'Traffic Volume',
                data: [120, 150, 180, 130], // Simulated data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
