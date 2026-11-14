document.querySelectorAll('.toggle').forEach(title =>
    title.addEventListener('click', () => title.nextElementSibling.classList.toggle('hidden')));
