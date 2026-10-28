import { loadStuff } from './shared.js'

document.getElementById('sort').addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    loadStuff('http://localhost:5500/api/v1/fakemon?sort='+selectedValue)
});

loadStuff('http://localhost:5500/api/v1/fakemon?sort=postedOn')