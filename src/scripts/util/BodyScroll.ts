export default class BodyScroll {
    static lockCount: number = 0;

    static lock() {
        this.lockCount++;

        let body = document.body;
        let root = document.querySelector('body > .root');
        if (root) {
            // We must query multiple objects for the scrollTop.
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
            body.classList.add('body-scroll-lock');
            root.scrollTop = scrollTop;
        }
    }

    static unlock() {
        this.lockCount--;
        if (this.lockCount < 0) {
            this.lockCount = 0;
        }

        let body = document.body;
        let root = document.querySelector('body > .root');
        if (root && this.lockCount === 0) {
            let scrollTop = root.scrollTop || window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
            body.classList.remove('body-scroll-lock');
            // We must set both of these for Chrome and Firefox.
            body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
        }
    }

    static init() {
        window.addEventListener('beforeunload', () => {
            this.lockCount = 1;
            this.unlock();
        });
    }
}