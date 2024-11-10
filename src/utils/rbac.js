export const permissions = [
    {
        role: 'client',
        actions: [
            'get_profile',          // View their own profile
            'update_profile',       // Update their own profile
            'book_consultation',    // Book a consultation with a professional
            'cancel_consultation',  // Cancel their booked consultation
            'reschedule_consultation', // Reschedule their consultation
            'view_own_consultations', // View their consultation history
        ]
    },

    {
        role: 'professional',
        actions: [
            'get_profile',          // View their own profile
            'update_profile',       // Update their own profile
            'view_own_consultations', // View all consultations they've been booked for
            'update_consultation_status', // Update consultation status (Confirmed, Completed, Cancelled)
            'accept_decline_consultation', // Accept or decline consultation requests
            'view_earnings',        // View their earnings from consultations
            'update_payment_details' // Update payment details for receiving earnings
        ]
    },
    
    {
        role: 'admin',
        actions: [
            'get_profile',          // View any user's profile (admin privilege)
            'update_profile',       // Update any user's profile (admin privilege)
            'verify_professional',  // Verify or suspend a professional account
            'manage_consultations', // Update consultation status for oversight
            'view_earnings',        // View earnings of any professional for oversight
            'access_dashboard',     // Access admin dashboard with app analytics
            'view_all_users',       // View a list of all users and professionals
            'search_professionals'  // Search professionals (with full access to details)
        ]
    }
];
