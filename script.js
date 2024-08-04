function displayName() {
    const name = document.getElementById('nameInput').value;
    const greeting = document.getElementById('greeting');
    if (name) {
        greeting.textContent = `Hello, ${name}!`;
    } else {
        greeting.textContent = 'Please enter your name.';
    }
}
