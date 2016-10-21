interface Array<T> {
	last(): T;
}

Array.prototype.last = function () {
	return this[this.length - 1];
}


function hexToRgba(hex: string, a?: number) {
	if(!hex) return null;
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    	return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? 'rgba(' + 
    parseInt(result[1], 16) + ', ' +
    parseInt(result[2], 16) + ', ' + 
    parseInt(result[3], 16) + ', ' +
    (a ? a.toString() : '1') + ')' : null;
}
