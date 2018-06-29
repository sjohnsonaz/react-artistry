export interface ICloseHandle {
    (event: Event): boolean | void;
}

export default class DepthStack {
    static items: ICloseHandle[] = [];

    static push(closeHandle: ICloseHandle) {
        this.items.push(closeHandle);
    }

    static close(event: Event) {
        let item = this.items[0];
        if (item) {
            let result = item(event);
            if (result) {
                this.items.pop();
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                //case 13: // Enter
                //break;
                case 27: // Escape
                    this.close(event);
                    break;
                default:
                    break;
            }
        });
        window.addEventListener('click', (event: MouseEvent) => {
            this.close(event);
        });
    }
}