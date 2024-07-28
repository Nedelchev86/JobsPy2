export function formatDate(dateString) {
    if (!dateString) return "";

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Create an array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract components from the date
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digit format
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Format the date string
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
}
