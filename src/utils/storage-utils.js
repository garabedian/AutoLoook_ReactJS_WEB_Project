export const clearStorageAndReload = () => {
    sessionStorage.clear();

    localStorage.clear();

    // window.location.reload();
};