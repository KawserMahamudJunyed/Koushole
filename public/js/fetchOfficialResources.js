

async function fetchOfficialResources() {
    if (!window.supabaseClient) return;

    console.log("📚 Fetching Official Resources...");
    const container = document.getElementById('official-books-list');
    if (!container) return; // Should not happen if UI is loaded

    try {
        const { data: { user } } = await window.supabaseClient.auth.getUser();

        // 1. Determine User Class (Priority: LocalStorage -> User Metadata -> DB Profile -> Default)
        let userClass = localStorage.getItem('userClass');

        if (!userClass && user) {
            // Try Metadata
            userClass = user.user_metadata?.class;
        }

        if (!userClass && user) {
            // Try DB Profile as last resort
            const { data: profile } = await window.supabaseClient
                .from('profiles')
                .select('class')
                .eq('user_id', user.id)
                .single();
            if (profile) userClass = profile.class;
        }

        // Default if still nothing
        if (!userClass) {
            console.warn("⚠️ User class not found, defaulting to '10'");
            userClass = '10';
        }

        console.log(`👤 User Class identified as: ${userClass}`);

        // 2. Determine Target Classes (Logic: specific class + shared ranges)
        let targetClasses = [userClass];

        // Add ranges
        if (['9', '10'].includes(userClass)) {
            targetClasses.push('9-10');
        } else if (['11', '12'].includes(userClass)) {
            targetClasses.push('11-12');
        }

        // University/Other handling
        if (userClass === 'University') targetClasses.push('University');

        console.log(`🎯 Querying books for classes: ${JSON.stringify(targetClasses)}`);

        // 3. Execute Query
        const { data, error } = await window.supabaseClient
            .from('official_resources')
            .select('*')
            .in('class_level', targetClasses)
            .order('created_at', { ascending: false });

        if (error) throw error;

        console.log(`✅ Found ${data ? data.length : 0} books.`);

        // 4. Render
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
            container.innerHTML = `
                <div class="text-center text-text-secondary text-xs py-4 opacity-50">
                    No official books found for Class ${userClass}. <br>
                    (Try uploading some in Admin panel!)
                </div>`;
        }
    } catch (err) {
        console.error("❌ Error fetching official resources:", err);
        container.innerHTML = `<div class="text-center text-rose text-xs py-4">Failed to load resources: ${err.message}</div>`;
    }
}
