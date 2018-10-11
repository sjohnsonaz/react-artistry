export class MaskUnit {
    type: UnitTypes;
    definition: string;
    value: string;
}

export default class Mask {
    units: MaskUnit[];

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
                set: string,
                range: string
            ) => {
                let unit = new MaskUnit();
                if (numeric) {
                    unit.type = UnitTypes.numeric;
                    unit.definition = numeric;
                } else if (alpha) {
                    unit.type = UnitTypes.alpha;
                    unit.definition = alpha;
                } else if (alphanumeric) {
                    unit.type = UnitTypes.alphanumeric;
                    unit.definition = alphanumeric;
                } else if (hexidecimal) {
                    unit.type = UnitTypes.hexidecimal;
                    unit.definition = hexidecimal;
                } else if (escaped) {
                    unit.type = UnitTypes.escaped;
                    unit.definition = escaped;
                } else if (set) {
                    unit.type = UnitTypes.set;
                    unit.definition = set;
                } else if (range) {
                    unit.type = UnitTypes.range;
                    unit.definition = range;
                }
                this.units.push(unit);
                return substring;
            });
        }
    }

    fill(value: string) {
        let remainder = value;
        return remainder;
    }
}

enum UnitTypes {
    numeric = 'numeric',
    alpha = 'alpha',
    alphanumeric = 'alphanumeric',
    hexidecimal = 'hexidecimal',
    escaped = 'escaped',
    set = 'set',
    range = 'range'
}

enum UnitRegexes {
    numeric = '(9)',
    alpha = '(a)',
    alphanumeric = '(n)',
    hexidecimal = '(0)',
    escaped = '(\\\\.)',
    set = '\\[([^\\[\\]]*)\\]',
    range = '\\[\\[([^\\[\\]]*)\\]\\]'
}

let regex = new RegExp([
    UnitRegexes.numeric,
    UnitRegexes.alpha,
    UnitRegexes.alphanumeric,
    UnitRegexes.hexidecimal,
    UnitRegexes.escaped,
    UnitRegexes.set,
    UnitRegexes.range
].join('|'), 'g');