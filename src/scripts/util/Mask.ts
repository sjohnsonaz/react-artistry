export enum UnitValid {
    valid = 1,
    invalid = 0,
    incomplete = -1
}

export class MaskUnit {
    type: UnitTypes;
    definition: string;
    mask: string;
    value: string;

    constructor(type: UnitTypes, definition: string) {
        this.type = type;
        this.definition = definition;
        this.mask = MaskUnit.getMask(this.type, this.definition);
    }

    fill(value: string) {
        this.value = value.substring(0, this.mask.length);
        return value.substring(this.mask.length);
    }

    isValid() {
        if (this.value) {
            let clean = this.value.replace(/[\W_]+/g, "");
            if (clean.length < this.mask.length) {
                return UnitValid.incomplete;
            } else {
                if (this.type === UnitTypes.range) {
                    return MaskUnit.isRangeValid(this.definition, this.value) ? UnitValid.valid : UnitValid.invalid;
                } else {
                    return UnitValid.valid;
                }
            }
        } else {
            return UnitValid.incomplete;
        }
    }

    static isRangeValid(definition: string, value: string) {
        let parts = definition.split('-');
        if (parts && parts.length > 1) {
            let top = parseInt(parts[1] || parts[0]);
            let bottom = parseInt(parts[0]) || 0;
            let valueNumber = parseInt(value);
            if (bottom <= valueNumber && valueNumber <= top) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static getMask(type: UnitTypes, definition: string) {
        switch (type) {
            case UnitTypes.numeric:
                return '9';
            case UnitTypes.alpha:
                return 'a';
            case UnitTypes.alphanumeric:
                return 'n';
            case UnitTypes.hexidecimal:
                return '0';
            case UnitTypes.escaped:
                return '*';
            case UnitTypes.range:
                return MaskUnit.getRangeMask(definition);
                break;
        }
    }

    static getRangeMask(definition: string) {
        let parts = definition.split('-');
        if (parts && parts.length > 1) {
            let top = parts[1] || parts[0];
            let characters = [];
            for (let index = 0, length = top.length; index < length; index++) {
                characters.push('9');
            }
            return characters.join('');
        } else {
            return '';
        }
    }
}

export default class Mask {
    units: MaskUnit[];
    mask: string;

    constructor(mask: string) {
        this.parse(mask);
    }

    parse(mask: string) {
        this.units = [];
        if (mask) {
            mask.replace(regex, (
                substring: string,
                numeric: string,
                alpha: string,
                alphanumeric: string,
                hexidecimal: string,
                escaped: string,
                //set: string,
                range: string
            ) => {
                if (numeric) {
                    let unit = new MaskUnit(UnitTypes.numeric, numeric);
                    this.units.push(unit);
                } else if (alpha) {
                    let unit = new MaskUnit(UnitTypes.alpha, alpha);
                    this.units.push(unit);
                } else if (alphanumeric) {
                    let unit = new MaskUnit(UnitTypes.alphanumeric, alphanumeric);
                    this.units.push(unit);
                } else if (hexidecimal) {
                    let unit = new MaskUnit(UnitTypes.hexidecimal, hexidecimal);
                    this.units.push(unit);
                } else if (escaped) {
                    let unit = new MaskUnit(UnitTypes.escaped, escaped);
                    this.units.push(unit);
                    //} else if (set) {
                    //let unit = new MaskUnit(UnitTypes.set, set);
                    //this.units.push(unit);
                } else if (range) {
                    let unit = new MaskUnit(UnitTypes.range, range);
                    this.units.push(unit);
                }
                return substring;
            });
        }

        let cleanMask = this.units.map(unit => unit.mask).join('');

        mask = mask.replace(new RegExp(UnitRegexes.range, 'g'), (searchValue: string, range: string) => {
            return MaskUnit.getRangeMask(range);
        });

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (Mask.isValidCharacter(character)) {
                output += cleanMask[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }

        this.mask = output;
        return output;
    }

    fill(value: string) {
        let remainder = value;
        this.units.forEach(unit => {
            remainder = unit.fill(remainder);
        });
        return remainder;
    }

    isValid() {
        for (let unit of this.units) {
            if (unit.isValid() === UnitValid.invalid) {
                return false;
            }
        }
        return true;
    }

    static isValidCharacter(character: string, placeholder: boolean = false) {
        switch (character) {
            case ValidCharacter.number:
            case ValidCharacter.alpha:
            case ValidCharacter.alphanumeric:
            case ValidCharacter.hexadecimal:
                return true;
            case ValidCharacter.placeholder:
                if (placeholder) {
                    return true;
                } else {
                    return false;
                }
            default:
                return false;
        }
    }
}

enum UnitTypes {
    numeric = 'numeric',
    alpha = 'alpha',
    alphanumeric = 'alphanumeric',
    hexidecimal = 'hexidecimal',
    escaped = 'escaped',
    //set = 'set',
    range = 'range'
}

enum UnitRegexes {
    numeric = '(9)',
    alpha = '(a)',
    alphanumeric = '(n)',
    hexidecimal = '(0)',
    escaped = '(\\\\.)',
    //set = '\\[([^\\[\\]]*)\\]',
    range = '\\[\\[([^\\[\\]]*)\\]\\]'
}

let regex = new RegExp([
    UnitRegexes.numeric,
    UnitRegexes.alpha,
    UnitRegexes.alphanumeric,
    UnitRegexes.hexidecimal,
    UnitRegexes.escaped,
    //UnitRegexes.set,
    UnitRegexes.range
].join('|'), 'g');

export enum ValidCharacter {
    placeholder = '_',
    alpha = 'a',
    number = '9',
    alphanumeric = 'n',
    hexadecimal = '0'
}