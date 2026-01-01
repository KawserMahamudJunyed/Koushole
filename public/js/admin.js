document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const session = await window.supabaseClient.auth.getSession();
    if (!session.data.session) {
        alert("You must be logged in to access this page.");
        window.location.href = '/';
        return;
    }

    const form = document.getElementById('upload-form');
    const statusMsg = document.getElementById('status-msg');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        statusMsg.innerText = 'Uploading...';
        statusMsg.className = 'text-center text-sm text-yellow-500 animate-pulse';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';

        const titleInput = document.getElementById('title').value;
        const version = document.getElementById('version').value;
        const subject = document.getElementById('subject').value;
        const classLevel = document.getElementById('class-level').value;
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        // Auto-append version to title if not already present
        let finalTitle = titleInput;
        if (version === 'English' && !finalTitle.toLowerCase().includes('english')) {
            finalTitle += ' (English Version)';
        } else if (version === 'Bangla' && !finalTitle.toLowerCase().includes('bangla') && !finalTitle.match(/[\u0980-\u09FF]/)) {
            // Optional: Don't append if it already looks like Bangla text, but simple is better
            // finalTitle += ' (Bangla)'; 
            // Actually, usually Bangla is default, so maybe only mark English?
            // User asked "Should we mention this?". Let's be explicit.
            finalTitle += ' (Bangla Medium)';
        }

        if (!file) {
            showStatus('Please select a PDF file.', 'text-red-500');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            return;
        }

        try {
            // 1. Upload File to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${classLevel}_${subject}_${version}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data: uploadData, error: uploadError } = await window.supabaseClient
                .storage
                .from('official-books')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = window.supabaseClient
                .storage
                .from('official-books')
                .getPublicUrl(filePath);

            // 3. Insert into Database
            const { error: dbError } = await window.supabaseClient
                .from('official_resources')
                .insert({
                    title: finalTitle, // Use the version-appended title
                    subject: subject,
                    class_level: classLevel,
                    file_url: publicUrl,
                    cover_url: null
                });

            if (dbError) throw dbError;

            showStatus('✅ Upload Successful!', 'text-green-500 font-bold');
            form.reset();

        } catch (error) {
            console.error('Upload failed:', error);
            showStatus(`❌ Error: ${error.message}`, 'text-red-500');
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });

    function showStatus(msg, classes) {
        statusMsg.innerText = msg;
        statusMsg.className = `text-center text-sm ${classes}`;
    }
});
