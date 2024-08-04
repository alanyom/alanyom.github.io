const ctx = document.getElementById('elbowChart').getContext('2d');
let elbowChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Model Loss',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Epochs' } },
            y: { title: { display: true, text: 'Loss' }, beginAtZero: true }
        }
    }
});

async function updateModel() {
    const batchSize = parseInt(document.getElementById('batchSize').value);
    const epochs = parseInt(document.getElementById('epochs').value);

    // Define the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });

    // Generate some synthetic data
    const xs = tf.tensor1d(Array.from({ length: 100 }, (_, i) => i));
    const ys = xs.mul(2).add(1);  // y = 2x + 1

    // Train the model with different batch sizes and epochs
    const history = await model.fit(xs, ys, {
        epochs: epochs,
        batchSize: batchSize,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                // Update the chart with the loss
                elbowChart.data.labels.push(epoch + 1);
                elbowChart.data.datasets[0].data.push(logs.loss);
                elbowChart.update();
            }
        }
    });
}
