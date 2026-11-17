let parent = document.getElementById('parentElement');

let childElement = document.createElement('div');
childElement.id = 'childElement';
childElement.textContent = 'Child';
parent.appendChild(childElement);

// HTMLCollection is live, NodeList from querySelectorAll is a static snapshot
let liveBoxes = document.getElementsByClassName('box');
let staticBoxes = document.querySelectorAll('.box');

function showCounts() {
    document.getElementById('counts').textContent =
        `live: ${liveBoxes.length}, static: ${staticBoxes.length}`;
}

document.getElementById('addBox').addEventListener('click', () => {
    let box = document.createElement('div');
    box.className = 'box';
    box.textContent = `Box ${liveBoxes.length + 1}`;
    document.body.appendChild(box);
    showCounts();
});

document.getElementById('removeChild').addEventListener('click', () => {
    let child = document.getElementById('childElement');
    if (child) {
        parent.removeChild(child);
    }
});

document.getElementById('button').addEventListener('click', (event) => {
    let child = document.getElementById('childElement');
    if (child) {
        child.textContent = 'UpdatedChild';
    }
    event.currentTarget.textContent = 'Updated';
});

showCounts();
