const container = document.getElementById('diaryContainer');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('diaryModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Merender tombol ke HTML
function renderButtons(entries) {
    container.innerHTML = '';

    if (entries.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%;">Tidak ada judul yang cocok.</p>';
        return;
    }

    entries.forEach(entry => {
        const btn = document.createElement('button');
        btn.className = 'diary-btn';
        btn.textContent = entry.title;
        btn.onclick = () => openModal(entry);
        container.appendChild(btn);
    });
}

// Buka modal dan ambil isi .txt dari direktori assets/text/
async function openModal(entry) {
    modalTitle.textContent = entry.title;
    modalBody.textContent = "Memuat isi diary...";
    modal.style.display = 'flex'; // Tampilkan modal

    try {
        const response = await fetch(`assets/text/${entry.file}`);
        if (!response.ok) throw new Error('File tidak ditemukan');

        const text = await response.text();
        modalBody.textContent = text;
    } catch (error) {
        modalBody.textContent = `Gagal memuat. Pastikan file "${entry.file}" ada di dalam folder "assets/text/".`;
    }
}

// Tutup modal ketika tombol X ditekan
closeBtn.onclick = () => {
    modal.style.display = 'none';
};

// Tutup modal ketika area luar modal diklik
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

// Fitur Search berdasarkan judul
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = diaryEntries.filter(entry =>
    entry.title.toLowerCase().includes(keyword)
    );
    renderButtons(filtered);
});

// Jalankan saat pertama kali web dimuat
renderButtons(diaryEntries);
