
// NCTB Subject List - Comprehensive & Class Specific

// SSC (Class 9-10)
const subjects_9_10 = {
    'Common': [
        'Bangla 1st Paper',
        'Bangla 2nd Paper',
        'English 1st Paper',
        'English 2nd Paper',
        'ICT',
        'Religion (Islam)',
        'Religion (Hindu)',
        'Religion (Christian)',
        'Religion (Buddhist)',
        'Career Education',
        'Physical Education',
        'Arts & Crafts'
    ],
    'Science': [
        'Physics',
        'Chemistry',
        'Higher Mathematics',
        'Biology',
        'Agriculture Studies',
        'Bangladesh & Global Studies'
    ],
    'Business Studies': [
        'Accounting',
        'Finance & Banking',
        'Business Org & Mgt',
        'Marketing',
        'Production Mgt',
        'Statistics',
        'Science (General)'
    ],
    'Humanities': [
        'Economics',
        'Civics & Good Governance',
        'History',
        'Geography',
        'Sociology',
        'Science (General)'
    ]
};

// HSC (Class 11-12) - Most subjects have 1st & 2nd Papers
const subjects_11_12 = {
    'Common': [
        'Bangla 1st Paper',
        'Bangla 2nd Paper',
        'English 1st Paper',
        'English 2nd Paper',
        'ICT' // ICT is single paper
    ],
    'Science': [
        'Physics 1st Paper',
        'Physics 2nd Paper',
        'Chemistry 1st Paper',
        'Chemistry 2nd Paper',
        'Higher Mathematics 1st Paper',
        'Higher Mathematics 2nd Paper',
        'Biology 1st Paper',
        'Biology 2nd Paper'
    ],
    'Business Studies': [
        'Accounting 1st Paper',
        'Accounting 2nd Paper',
        'Finance, Banking & Ins 1st Paper',
        'Finance, Banking & Ins 2nd Paper',
        'Business Org & Mgt 1st Paper',
        'Business Org & Mgt 2nd Paper',
        'Marketing 1st Paper',
        'Marketing 2nd Paper'
    ],
    'Humanities': [
        'Economics 1st Paper',
        'Economics 2nd Paper',
        'Logic 1st Paper',
        'Logic 2nd Paper',
        'Sociology 1st Paper',
        'Sociology 2nd Paper',
        'Social Work 1st Paper',
        'Social Work 2nd Paper',
        'Geography 1st Paper',
        'Geography 2nd Paper',
        'History 1st Paper',
        'History 2nd Paper',
        'Islamic History & Culture 1st Paper',
        'Islamic History & Culture 2nd Paper',
        'Civics & Good Governance 1st Paper',
        'Civics & Good Governance 2nd Paper',
        'Psychology 1st Paper',
        'Psychology 2nd Paper'
    ]
};

// Helper: Check if class is HSC
function isHSC(className) {
    return ['11', '12', '11-12'].includes(String(className));
}

// Function to get subjects for a specific class/group combo
function getSubjects(group, className) {
    // Default to SSC if unknown
    const data = isHSC(className) ? subjects_11_12 : subjects_9_10;

    // Always include Common subjects
    let list = [...(data['Common'] || [])];

    // Add Group specific subjects
    if (group && data[group]) {
        list = [...list, ...data[group]];
    }

    // Remove duplicates
    return [...new Set(list)];
}

// Export global
if (typeof window !== 'undefined') {
    window.subjects_9_10 = subjects_9_10;
    window.subjects_11_12 = subjects_11_12;
    window.getSubjects = getSubjects;
}
