// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Configuration object
const config = {
    // Supabase settings
    supabase: {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
        client: supabase
    },
    
    // Contact form settings
    contact: {
        tableName: 'contact_messages',
        fields: ['name', 'email', 'subject', 'message', 'created_at']
    },
    
    // Projects settings
    projects: {
        tableName: 'projects',
        fields: ['id', 'title', 'description', 'technologies', 'image_url', 'live_url', 'github_url', 'created_at']
    },
    
    // Animation settings
    animations: {
        duration: 1000,
        delay: 200
    }
};

// Export for use in other files
window.config = config; 