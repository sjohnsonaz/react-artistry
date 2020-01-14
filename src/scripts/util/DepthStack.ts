export interface ICloseHandle {
    (event: React.SyntheticEvent, confirm: boolean): boolean | void;
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

    static close(event: React.SyntheticEvent, confirm: boolean) {
        let item = this.items[this.items.length - 1];
        if (item) {
            let result = item(event, confirm);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item);
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 13: // Enter
                    this.close(event as any, true);
                    break;
                case 27: // Escape
                    // TODO: Fix this
                    this.close(event as any, false);
                    break;
                default:
                    break;
            }
        });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            // TODO: Fix this
            this.close(event as any, false);
        };
    }
}