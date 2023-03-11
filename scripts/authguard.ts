// Define a list of routes that require authentication
const protectedRoutes = ['/contact-list'];

// Function to check if the user is authenticated
function isAuthenticated() {
    // Code to check if user is authenticated
    // Return true if authenticated, else false
    return true; // Placeholder code, replace with actual authentication check
}

// Function to check if a route requires authentication
function requiresAuth({route}: { route: any }) {
    return protectedRoutes.includes(route);
}

// Function to guard routes that require authentication
function authGuard() {
    const currentRoute = window.location.pathname;
    if (requiresAuth({route: currentRoute}) && !isAuthenticated()) {
        window.location.href = '/login'; // Redirect to login page if not authenticated
    }
}

// Call authGuard on page load and on hashchange (SPA)
window.addEventListener('load', authGuard);
window.addEventListener('hashchange', authGuard);
