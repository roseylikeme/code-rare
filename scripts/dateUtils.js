function formatDateWithTime(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}