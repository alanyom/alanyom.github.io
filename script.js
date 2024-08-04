let model;
const trainingData = [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
    { input: [0, 1], output: [1] },
    { input: [1, 1], output: [0] }
];

async function trainModel() {
    // Define a simple neural network model
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 4, activation: 'relu', inputShape: [2] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    // Convert training data to tensors
    const inputs = tf.tensor2d(trainingData.map(d => d.input));
    const outputs = tf.tensor2d(trainingData.map(d => d.output));

    // Train the model
    await model.fit(inputs, outputs, {
        epochs: 10,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                console.log(`Epoch ${epoch}: ${log.acc}`);
            }
        }
    });

    document.getElementById('accuracy').innerText = `Accuracy: ${await evaluateModel()}`;
}

async function evaluateModel() {
    const inputs = tf.tensor2d(trainingData.map(d => d.input));
    const outputs = tf.tensor2d(trainingData.map(d => d.output));
    const evaluation = model.evaluate(inputs, outputs);
    const [loss, accuracy] = await Promise.all(evaluation);
    return accuracy.dataSync();
}

async function predict() {
    if (!model) {
        alert('Please train the model first.');
        return;
    }

    const inputValue = document.getElementById('inputValue').value.split(',').map(Number);
    const inputTensor = tf.tensor2d([inputValue]);
    const prediction = model.predict(inputTensor).arraySync();
    document.getElementById('prediction').innerText = `Prediction: ${prediction[0][0].toFixed(2)}`;
}
