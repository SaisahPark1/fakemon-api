const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadFakemon() {
    const response = await fetch(
        `http://localhost:5500/api/v1/fakemon/${id}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Fakemon: ${response.status}`);
    }

    const mon = await response.json();
    const fakemon = await mon.data;

    document.getElementById('head-image').src = fakemon.image
    document.getElementById('primary').innerHTML = fakemon.types[0]
    if (fakemon.types[1]){
        document.getElementById('secondary').innerHTML = fakemon.types[1]
    }
}

loadFakemon();