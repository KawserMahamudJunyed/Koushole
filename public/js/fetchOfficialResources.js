
async function fetchOfficialResources() {
    if (!window.supabaseClient) return;
    try {
        const { data, error } = await window.supabaseClient
            .from('official_resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const container = document.getElementById('official-books-list');
        if (!container) return;

        if (data && data.length > 0) {
            container.innerHTML = data.map(book => `
                <div class="flex items-center gap-4 bg-surface p-3 rounded-xl border border-divider hover:border-amber/50 transition-colors group cursor-pointer" onclick="window.open('${book.file_url}', '_blank')">
                    <div class="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center text-amber text-lg shrink-0 group-hover:scale-110 transition-transform">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-text-primary font-bold text-sm truncate">${book.title}</h4>
                        <p class="text-text-secondary text-xs truncate">${book.subject} • Class ${book.class_level}</p>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-surface border border-divider flex items-center justify-center text-text-secondary group-hover:text-amber group-hover:border-amber transition-all">
                        <i class="fas fa-external-link-alt text-xs"></i>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = `<div class="text-center text-text-secondary text-xs py-4 opacity-50">No official resources available yet.</div>`;
        }
    } catch (err) {
        console.error("Error fetching official resources:", err);
        const container = document.getElementById('official-books-list');
        if (container) container.innerHTML = `<div class="text-center text-rose text-xs py-4">Failed to load resources.</div>`;
    }
}
