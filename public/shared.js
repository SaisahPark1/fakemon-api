export async function loadStuff(route){
    const res = await fetch(route)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)

    const body = await res.json()
    const fakemon = body.data    // response is { "data": ... }

    const container = document.getElementById('fakemon-holder');
    const example = document.getElementById('fakemon-example');

    for (const item of container.children){
        if (item.id != 'fakemon-example' && item.id != 'no-content'){
            item.style.display = 'none'
        }
    }

    if (fakemon.length > 0){
        document.getElementById("no-content").style.visibility = 'hidden';
        document.getElementById("no-content").style.position = 'absolute';
        example.style.visibility = 'visible';
        example.style.position = 'static';
    } else {
        example.style.visibility = 'hidden';
        example.style.position = 'absolute';
        document.getElementById("no-content").style.visibility = 'visible';
        document.getElementById("no-content").style.position = 'static';
        return
    }

    for (const mon of fakemon) {
        let fakeCard = example.cloneNode(true)
        fakeCard.style.display = '' // make sure the clone is visible
        fakeCard.id = mon._id
        fakeCard.querySelector('#image').src = mon.image
        fakeCard.querySelector('#name').innerHTML = mon.name

        container.appendChild(fakeCard)
        console.log("Fakemon Loaded: "+mon.name)

        document.getElementById(mon._id).addEventListener("click", function() {
            loadFakemonPage(mon.id)
        });
    }
    example.style.visibility = 'hidden';
    example.style.position = 'absolute';
}