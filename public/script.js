const API = '/api/v1'

async function loadAnyFakemon() {
    showContainer('any')

    const res = await fetch(API+"/fakemon")
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)

    const body = await res.json()
    const fakemon = body.data    // your response is { "data": ... }

    const container = document.getElementById('any-fakemon-holder');
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

async function loadFakemonPage(id) {
    const res = await fetch(API)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
}

async function loadFavorites(){
    showContainer('fav')
    const res = {"data": []}
    if (res.data.length > 0){
        document.getElementById("no-fav").style.display = 'none';
    }
    // Once authentication is added

    document.getElementById('any-fakemon-holder').firstElementChild.style.display = 'none';
    return
}

function showContainer(name){
    document.querySelector('.pressed').classList.add('unpressed')
    document.querySelector('.pressed').classList.remove('pressed')
    document.getElementById("button-"+name).classList.remove('unpressed');
    document.getElementById("button-"+name).classList.add('pressed');
    document.querySelectorAll('.container').forEach(el => el.classList.remove('visible'))
    document.querySelectorAll('.container').forEach(el => el.classList.add('invisible'))
    document.getElementById(name+'-fakemon-holder').classList.remove('invisible');
    document.getElementById(name+'-fakemon-holder').classList.add('visible');
}

loadAnyFakemon()