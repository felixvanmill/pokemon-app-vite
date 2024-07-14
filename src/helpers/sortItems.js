// Helpers is used to sort items in the ItemsPage. Specifically when clicking columns it will sort.
export const sortItems = (items, field, isAscending) => {
    return [...items].sort((a, b) => {
        if (a[field] < b[field]) return isAscending ? -1 : 1;
        if (a[field] > b[field]) return isAscending ? 1 : -1;
        return 0;
    });
};
