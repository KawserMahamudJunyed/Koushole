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
    const groupSelect = document.getElementById('group');
    const classSelect = document.getElementById('class-level');
    const subjectSelect = document.getElementById('subject');

    // Use global getSubjects helper
    function updateSubjects() {
        const group = groupSelect.value;
        const className = classSelect ? classSelect.value : '9';

        // Use the smart helper from subjects.js
        // If script hasn't loaded yet, default to empty
        const subjects = window.getSubjects ? window.getSubjects(group, className) : [];

        // Fallback for debugging if script fails (optional)
        if (!window.getSubjects && window.subjectsByGroup) {
            const s = window.subjectsByGroup[group] || [];
            subjectSelect.innerHTML = s.map(sub => `<option value="${sub}">${sub}</option>`).join('');
            return;
        }

        subjectSelect.innerHTML = subjects.map(sub => `<option value="${sub}">${sub}</option>`).join('');
    }

    // Initial populate & Event Listeners
    if (groupSelect) groupSelect.addEventListener('change', updateSubjects);
    if (classSelect) classSelect.addEventListener('change', updateSubjects);
    updateSubjects();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        statusMsg.innerText = 'Uploading...';
        statusMsg.className = 'text-center text-sm text-yellow-500 animate-pulse';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';

        const version = document.getElementById('version').value;
        const group = document.getElementById('group').value;
        const subject = document.getElementById('subject').value;
        const classLevel = document.getElementById('class-level').value;
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        // Construct Title automatically
        let finalTitle = `${subject} - Class ${classLevel}`;
        if (group !== 'Common') {
            finalTitle += ` [${group}]`;
        }

        if (version === 'English') {
            finalTitle += ' (English Version)';
        } else {
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
            const fileName = `${classLevel}_${subject}_${group}_${version}_${Date.now()}.${fileExt}`;
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
                    title: finalTitle,
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
