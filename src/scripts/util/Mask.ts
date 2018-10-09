class Mask {
    static createMask(element, pattern) {
        var regexPattern = createRegexWithWhitespace(pattern);
        element.value = formatPattern(pattern, element.value.replace(/\W+/g, ""));
        element.pattern = createRegexText(pattern);
        var firstPosition = getPosition(pattern, 0);
        var patternLength = pattern.replace(/\W+/g, "").length;
        var lastValue = element.value;
        var lastPosition = firstPosition;
        function keyDownListener(event) {
            switch (event.keyCode) {
                case 8:
                    event.preventDefault();
                    event.stopPropagation();
                    var startPosition = getValuePosition(pattern, element.selectionStart);
                    var endPosition = getValuePosition(pattern, element.selectionEnd);
                    if (endPosition > 0) {
                        var clean = element.value.replace(/\W+/g, "");
                        startPosition = Math.min(startPosition, clean.length);
                        endPosition = Math.min(endPosition, clean.length);
                        if (endPosition == startPosition) {
                            startPosition--;
                        }
                        var value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
                        element.value = value;
                        lastValue = value;
                    }
                    var startPosition = getPatternPosition(pattern, startPosition);
                    element.selectionStart = startPosition;
                    element.selectionEnd = startPosition;
                    break;
                case 46:
                    event.preventDefault();
                    event.stopPropagation();
                    var startPosition = getValuePosition(pattern, element.selectionStart);
                    var endPosition = getValuePosition(pattern, element.selectionEnd);
                    var clean = element.value.replace(/\W+/g, "");
                    startPosition = Math.min(startPosition, clean.length);
                    endPosition = Math.min(endPosition, clean.length);
                    if (endPosition == startPosition) {
                        endPosition++;
                    }
                    var value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
                    element.value = value;
                    lastValue = value;
                    var startPosition = getPatternPosition(pattern, startPosition);
                    element.selectionStart = startPosition;
                    element.selectionEnd = startPosition;
                    break;
                default:
                    lastPosition = element.selectionStart;
                    break;
            }
        }
        function inputListener(event) {
            runMask(element.value);
        }
        function runMask(value) {
            var updated = false;
            var selectionStart = element.selectionStart;
            if (selectionStart <= firstPosition) {
                selectionStart = firstPosition + 1;
            }
            var position = getPosition(pattern, selectionStart);
            var valuePosition = getValuePosition(pattern, selectionStart);
            var clean = value.replace(/\W+/g, "");
            if (clean.length <= patternLength) {
                if (valuePosition > clean.length) {
                    position = getPatternPosition(pattern, clean.length);
                }
                var output = formatPattern(pattern, clean);
                var match = output.match(regexPattern);
                if (match && match.length) {
                    element.value = output;
                    if (output != lastValue) {
                        element.selectionStart = position;
                        element.selectionEnd = position;
                    } else {
                        element.selectionStart = lastPosition;
                        element.selectionEnd = lastPosition;
                    }
                    lastValue = output;
                    updated = true;
                } else {
                    element.value = lastValue;
                    element.selectionStart = lastPosition;
                    element.selectionEnd = lastPosition;
                }
            } else {
                element.value = lastValue;
                element.selectionStart = lastPosition;
                element.selectionEnd = lastPosition;
            }
            return element.value;
        }
        function focusListener() {
            var selectionEnd = element.selectionEnd;
            if (selectionEnd <= firstPosition) {
                selectionEnd = firstPosition + 1;
            }
            var valuePosition = getValuePosition(pattern, selectionEnd);
            var clean = element.value.replace(/\W+/g, "");
            var position;
            if (valuePosition > clean.length) {
                position = getPatternPosition(pattern, clean.length);
            } else {
                position = getPosition(pattern, selectionEnd);
            }
            if (element.selectionStart > position) {
                element.selectionStart = position;
            } else {
                if (element.selectionStart == element.selectionEnd) {
                    element.selectionStart = position;
                }
            }
            element.selectionEnd = position;
        }
        function dispatchChange() {
            // TODO: Not supported in IE9.
            var validity = element.validity
            if ((!validity)) {
                var pattern = new RegExp(element.pattern, 'g');
                if (element.value.match(pattern)) {
                    element.dispatchEvent(new CustomEvent('change', {}));
                }
            } else if (validity.valid) {
                element.dispatchEvent(new CustomEvent('change', {}));
            }
        }
        function blurListener() {
            dispatchChange();
        }
        function destroyMask() {
            element.removeEventListener('keydown', keyDownListener);
            element.removeEventListener('input', inputListener);
            element.removeEventListener('focus', focusListener);
            element.removeEventListener('blur', blurListener);
        }
        element.addEventListener('keydown', keyDownListener);
        element.addEventListener('input', inputListener);
        element.addEventListener('focus', focusListener);
        element.addEventListener('blur', blurListener);
        return {
            element: element,
            runMask: runMask,
            destroyMask: destroyMask
        };
    }
}
function createRegexWithWhitespace(pattern) {
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

function createRegexText(pattern) {
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

function formatPattern(pattern, value) {
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

function getPosition(pattern, position) {
    for (var index = position, length = pattern.length; index < length; index++) {
        var character = pattern[index];
        if (character == '9' || character == 'a' || character == 'n' || character == '0') {
            break;
        }
    }
    return index;
}

function getValuePosition(pattern, position) {
    position = Math.min(position, pattern.length);
    var valuePosition = 0;
    for (var index = 0; index < position; index++) {
        var character = pattern[index];
        if (character == '9' || character == 'a' || character == 'n' || character == '0') {
            valuePosition++;
        }
    }
    return valuePosition;
}

function getPatternPosition(pattern, position) {
    var valueIndex = 0;
    for (var index = 0, length = pattern.length; index < length; index++) {
        var character = pattern[index];
        if (character == '9' || character == 'a' || character == 'n' || character == '0') {
            valueIndex++;
            if (valueIndex > position) {
                break;
            }
        }
    }
    return index;
}