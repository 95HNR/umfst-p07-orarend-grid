// Ikonterkep oratipusokhoz
const ikonok = {
    eloadas: '📖',
    szeminarium: '💬',
    gyakorlat: '🔬',
    labor: '🧫'
};

// Idosav kiszamitasa sorindexbol (2 = 08:00)
function idosavFormazas(kezd, hossz) {
    const kezdKeresztPercek = 8 * 60 + (kezd - 2) * 30;
    const vegKeresztPercek = kezdKeresztPercek + hossz * 30;

    const formatPercek = (p) => {
        const h = Math.floor(p / 60).toString().padStart(2, '0');
        const m = (p % 60).toString().padStart(2, '0');
        return `${h}:${m}`;
    };

    return `${formatPercek(kezdKeresztPercek)} - ${formatPercek(vegKeresztPercek)}`;
}

// JSON adatok betoltese es orak kirajzolasa
async function orarendBetoltes() {
    try {
        const valasz = await fetch('orarend.json');
        const adatok = await valasz.json();
        const racs = document.querySelector('.racs');

        // Korabbi ora elemek eltavolitasa (ha vannak)
        document.querySelectorAll('.ora').forEach(el => el.remove());

        adatok.forEach(ora => {
            const article = document.createElement('article');
            article.className = `ora ${ora.atfedo ? 'atfedo' : ''}`;
            article.setAttribute('data-tipus', ora.tipus);

            let styleString = `--nap: ${ora.nap}; --kezd: ${ora.kezd}; --hossz: ${ora.hossz};`;
            if (ora.eltolas !== undefined) {
                styleString += ` --eltolas: ${ora.eltolas};`;
            }
            article.style.cssText = styleString;

            article.innerHTML = `
        <div class="ora-belso">
          <div class="ora-fejléc">
            <span class="ora-tipus-ikon">${ikonok[ora.tipus] || '📌'}</span>
            <span class="ora-kod">${ora.kod}</span>
          </div>
          <h3 class="ora-cim">${ora.cim}</h3>
          <p class="ora-helyszin">${ora.helyszin}</p>
          <time class="ora-ido">${idosavFormazas(ora.kezd, ora.hossz)}</time>
        </div>
      `;

            racs.appendChild(article);
        });

        mostVonalFrissites();
    } catch (hiba) {
        console.error('Hiba az orarend adatok betoltese soran:', hiba);
    }
}

// Aktualis idosav "Most" jelzo vonal pozicionalasa
function mostVonalFrissites() {
    const most = new Date();
    const ora = most.getHours();
    const perc = most.getMinutes();
    const nap = most.getDay(); // 1 = Hetfo, 5 = Penteik

    // Csak hetkoznap 8:00 es 20:00 kozott jelenik meg
    if (nap < 1 || nap > 5 || ora < 8 || ora >= 20) return;

    const elteltPercek = (ora - 8) * 60 + perc;
    const sorIndex = 2 + Math.floor(elteltPercek / 30);
    const eltolasSzazalek = ((elteltPercek % 30) / 30) * 100;

    let mostVonal = document.querySelector('.most-vonal');
    if (!mostVonal) {
        mostVonal = document.createElement('div');
        mostVonal.className = 'most-vonal';
        document.querySelector('.racs').appendChild(mostVonal);
    }

    mostVonal.style.gridColumn = `${nap + 1}`;
    mostVonal.style.gridRow = `${sorIndex}`;
    mostVonal.style.transform = `translateY(${eltolasSzazalek}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    orarendBetoltes();
    setInterval(mostVonalFrissites, 60000); // Percenkent frissul
});