prefix = '/api/v1'

module.exports = async function loadStuff(route){
    const res = await fetch(prefix+route)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)

    const body = await res.json()
    const fakemon = body.data    // your response is { "data": ... }

    const container = document.getElementById('fakemon-holder');
    const first = container.firstElementChild;
    container.innerHTML = '';
    container.appendChild(first);

    if (fakemon.length > 0){
        document.getElementById("no-any").style.display = 'none';
    }

    for (const mon of fakemon) {
        let fakeCard = container.firstElementChild.cloneNode(true)
        fakeCard.style.display = '' // make sure the clone is visible
        fakeCard.id = mon.id
        fakeCard.querySelector('#image').src = mon.image
        fakeCard.querySelector('#name').innerHTML = mon.name

        container.appendChild(fakeCard)
        console.log("Fakemon Loaded: "+mon.name)

        document.getElementById(mon.id).addEventListener("click", function() {
            loadFakemonPage(mon.id)
        });
    }

    first.style.display = 'none';
}