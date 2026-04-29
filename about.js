document.addEventListener('DOMContentLoaded', function () {

    // ── Read lang from localStorage (shared with index.html) ──────────────────
    let currentLang = localStorage.getItem('lang') || 'th';

    function t() { return LANG[currentLang]; }

    // ── Render team grid ───────────────────────────────────────────────────────
    function renderTeam() {
        const grid = document.getElementById('team-grid');
        grid.innerHTML = '';
        t().team.forEach(member => {
            const socialIcons = buildSocialIcons(member);
            grid.innerHTML += `
                <div class="team-member">
                    <div class="member-image-container">
                        <img src="${member.img}" alt="${member.alt}">
                        <div class="social-icons">${socialIcons}</div>
                    </div>
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <h4>${member.faculty}</h4>
                </div>
            `;
        });
    }

    function buildSocialIcons(member) {
        let icons = '';
        if (member.facebook)  icons += `<a href="${member.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>`;
        if (member.instagram) icons += `<a href="${member.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
        if (member.github)    icons += `<a href="${member.github}" target="_blank"><i class="fab fa-github"></i></a>`;
        if (member.email)     icons += `<a href="https://mail.google.com/mail/?view=cm&to=${member.email}" target="_blank"><i class="fas fa-envelope"></i></a>`;
        return icons;
    }

    // ── Apply language to static elements ─────────────────────────────────────
    function applyLang() {
        const L = t();
        document.getElementById('about-title').textContent = L.aboutTitle;
        document.getElementById('about-h2').textContent    = L.aboutH2;
        document.getElementById('about-desc').textContent  = L.aboutDesc;
        document.getElementById('team-title').textContent  = L.teamTitle;
        document.getElementById('back-button').textContent = L.backToHome;

        const footer = document.getElementById('about-footer');
        if (footer) {
            const ps = footer.querySelectorAll('p');
            if (ps[0]) ps[0].innerHTML = L.footerCopyright;
            if (ps[1]) ps[1].innerHTML = L.footerDev;
        }

        renderTeam();
    }

    // ── Initial render ─────────────────────────────────────────────────────────
    applyLang();

    // ── Scroll effect on header ────────────────────────────────────────────────
    const header = document.querySelector('.about-header');
    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100) {
            header.style.opacity   = 1 - (currentScrollY - 100) / 400;
            header.style.transform = `translateY(-${(currentScrollY - 100) / 5}px)`;
            if (parseFloat(header.style.opacity) <= 0) {
                header.style.opacity   = '0';
                header.style.transform = 'translateY(-100px)';
            }
        } else {
            header.style.opacity   = '1';
            header.style.transform = 'translateY(0)';
        }
    });
});
