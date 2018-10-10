export default class Mask {
    static createRegexWithWhitespace(pattern: string) {
        return new RegExp(pattern.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function (match, other, numeric, alpha, alphanumeric, hexadecimal) {
            if (other) {
                return '\\' + other;
            }
            if (numeric) {
                return '[0-9 ]';
            }
            if (alpha) {
                return '[a-zA-Z ]';
            }
            if (alphanumeric) {
                return '[0-9a-zA-Z ]';
            }
            if (hexadecimal) {
                return '[0-9a-fA-F ]';
            }
        }), 'g');
    }

    static createRegexText(pattern: string) {
        return pattern.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function (match, other, numeric, alpha, alphanumeric, hexadecimal) {
            if (other) {
                return '\\' + other;
            }
            if (numeric) {
                return '[0-9]';
            }
            if (alpha) {
                return '[a-zA-Z]';
            }
            if (alphanumeric) {
                return '[0-9a-zA-Z]';
            }
            if (hexadecimal) {
                return '[0-9a-fA-F]';
            }
        });
    }

    static formatPattern(pattern: string, value: string) {
        var output = '';
        var valueIndex = 0;
        for (var index = 0, length = pattern.length; index < length; index++) {
            var character = pattern[index];
            if (character == '9' || character == 'a' || character == 'n' || character == '0') {
                output += value[valueIndex] || ' ';
                valueIndex++;
            } else {
                output += character;
            }
        }
        return output;
    }

    static getCleanValue(value: string) {
        if (typeof value === 'string') {
            return value.replace(/\W+/g, "");
        } else {
            return '';
        }
    }

    static getPosition(pattern, position) {
        for (var index = position, length = pattern.length; index < length; index++) {
            var character = pattern[index];
            if (character == '9' || character == 'a' || character == 'n' || character == '0') {
                break;
            }
        }
        return index;
    }

    static getVirtualPosition(mask: string, position: number) {
        position = Math.min(position, mask.length);
        var valuePosition = 0;
        for (var index = 0; index < position; index++) {
            var character = mask[index];
            if (character == '9' || character == 'a' || character == 'n' || character == '0') {
                valuePosition++;
            }
        }
        return valuePosition;
    }

    static getMaskPosition(mask: string, position: number) {
        var valueIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (character == '9' || character == 'a' || character == 'n' || character == '0') {
                valueIndex++;
                if (valueIndex > position) {
                    break;
                }
            }
        }
        return index;
    }

    static getSelection(element: HTMLInputElement) {
        return {
            start: element.selectionStart,
            end: element.selectionEnd,
            direction: element.selectionDirection
        };
    }

    static getVirtualSelection(element: HTMLInputElement, mask: string) {
        return {
            start: Mask.getVirtualPosition(mask, element.selectionStart),
            end: Mask.getVirtualPosition(mask, element.selectionEnd),
            direction: element.selectionDirection
        };
    }

    static deleteCharacter(element: HTMLInputElement, mask: string, forward: boolean) {
        let clean = Mask.getCleanValue(element.value);
        let virtualSelection = Mask.getVirtualSelection(element, mask);

        if (virtualSelection.start === virtualSelection.end) {
            let updatedClean = forward ?
                clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
            let updatedValue = Mask.formatPattern(mask, updatedClean);

            element.value = updatedValue;
            let selectionPosition = Mask.getMaskPosition(mask, forward ? virtualSelection.start : (virtualSelection.start - 1));
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        } else {
            let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
            let updatedValue = Mask.formatPattern(mask, updatedClean);

            element.value = updatedValue;
            let selectionPosition = Mask.getMaskPosition(mask, Math.min(updatedClean.length, virtualSelection.start));
            element.setSelectionRange(selectionPosition, selectionPosition, 'none');
        }
    }

    static updateValue(element: HTMLInputElement, mask: string) {
        let clean = Mask.getCleanValue(element.value);
        let virtualSelection = Mask.getVirtualSelection(element, mask);
        let selectionPosition = Mask.getMaskPosition(mask, virtualSelection.start);
        element.value = Mask.formatPattern(mask, clean);
        element.setSelectionRange(selectionPosition, selectionPosition, 'none');
    }

    static updateSelection(element: HTMLInputElement, mask: string) {
        let clean = Mask.getCleanValue(element.value);
        let virtualSelection = Mask.getVirtualSelection(element, mask);
        let selectionStart = Mask.getMaskPosition(mask, Math.min(clean.length, virtualSelection.start));
        let selectionEnd = Mask.getMaskPosition(mask, Math.min(clean.length, virtualSelection.end));
        element.setSelectionRange(selectionStart, selectionEnd, 'none');
    }
}