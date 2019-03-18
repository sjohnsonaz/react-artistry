export interface ICloseHandle {
    (event: React.SyntheticEvent): boolean | void;
}

export default class DepthStack {
    static items: ICloseHandle[] = [];

    static push(closeHandle: ICloseHandle) {
        this.items.push(closeHandle);
    }

    static remove(closeHandle: ICloseHandle) {
        let index = this.items.indexOf(closeHandle);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    static close(event: React.SyntheticEvent) {
        let item = this.items[this.items.length - 1];
        if (item) {
            let result = item(event);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item);
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                //case 13: // Enter
                //break;
                case 27: // Escape
                    // TODO: Fix this
                    this.close(event as any);
                    break;
                default:
                    break;
            }
        });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            // TODO: Fix this
            this.close(event as any);
        };
    }
}