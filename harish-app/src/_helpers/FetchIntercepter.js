export function configureFetchIntercepter() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Fetch intercepted: ${url}`);
                realFetch(url, opts).then(response => resolve(response));
            }, 500);
        });
    }
};