(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Main$GotItemShopMsg = function (a) {
	return {$: 'GotItemShopMsg', a: a};
};
var $author$project$Main$ItemShopTab = {$: 'ItemShopTab'};
var $author$project$Main$UnsetPage = {$: 'UnsetPage'};
var $author$project$Main$UrlPageInfo = F4(
	function (key, url, route, page) {
		return {key: key, page: page, route: route, url: url};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$ItemShop$Ascending = {$: 'Ascending'};
var $author$project$ItemShop$AutomaticGPM = function (a) {
	return {$: 'AutomaticGPM', a: a};
};
var $author$project$ItemShop$BattleTabType = {$: 'BattleTabType'};
var $author$project$Interface$BrightTheme = {$: 'BrightTheme'};
var $author$project$ItemShop$NoHoveredTooltip = {$: 'NoHoveredTooltip'};
var $author$project$ItemShop$PlayerParty = {$: 'PlayerParty'};
var $author$project$ItemShop$ShopParty = {$: 'ShopParty'};
var $author$project$ItemShop$ShopTabType = {$: 'ShopTabType'};
var $author$project$ItemShop$SortByName = {$: 'SortByName'};
var $author$project$ItemShop$TickSecond = function (a) {
	return {$: 'TickSecond', a: a};
};
var $author$project$ItemShop$WelcomeMessageActionLog = {$: 'WelcomeMessageActionLog'};
var $author$project$ItemShop$CharacterParty = function (a) {
	return {$: 'CharacterParty', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$ItemShop$empty_item_sentiments = $elm$core$Dict$empty;
var $author$project$ItemShop$empty_trend_tolerance = {buy: $elm$core$Dict$empty, sell: $elm$core$Dict$empty};
var $author$project$ItemShop$createCharacter = F2(
	function (char_id, name) {
		return {
			action_log: _List_Nil,
			char_id: char_id,
			displayedItemType: $elm$core$Maybe$Nothing,
			held_blood: 0,
			held_gold: 0,
			held_items: _List_Nil,
			hide_zero_qty_inv_rows: false,
			item_types_desired: $author$project$ItemShop$empty_item_sentiments,
			name: name,
			party: $author$project$ItemShop$CharacterParty(char_id),
			trend_tolerance: $author$project$ItemShop$empty_trend_tolerance
		};
	});
var $TSFoster$elm_uuid$UUID$UUID = F4(
	function (a, b, c, d) {
		return {$: 'UUID', a: a, b: b, c: c, d: d};
	});
var $TSFoster$elm_uuid$UUID$dnsNamespace = A4($TSFoster$elm_uuid$UUID$UUID, 1806153744, 2645365201, 2159280320, 1339306184);
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 'I8':
			return 1;
		case 'I16':
			return 2;
		case 'I32':
			return 4;
		case 'U8':
			return 1;
		case 'U16':
			return 2;
		case 'U32':
			return 4;
		case 'F32':
			return 4;
		case 'F64':
			return 8;
		case 'Seq':
			var w = builder.a;
			return w;
		case 'Utf8':
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = {$: 'LE'};
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 'I8':
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 'I16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'I32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U8':
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 'U16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F64':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f64,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'Seq':
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 'Utf8':
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Encode$Bytes = function (a) {
	return {$: 'Bytes', a: a};
};
var $elm$bytes$Bytes$Encode$bytes = $elm$bytes$Bytes$Encode$Bytes;
var $elm$bytes$Bytes$BE = {$: 'BE'};
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 'Seq', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $elm$bytes$Bytes$Encode$U32 = F2(
	function (a, b) {
		return {$: 'U32', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt32 = $elm$bytes$Bytes$Encode$U32;
var $TSFoster$elm_uuid$UUID$encoder = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return $elm$bytes$Bytes$Encode$sequence(
		_List_fromArray(
			[
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, a),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, b),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, c),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, d)
			]));
};
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0.a;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0.a;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (step.$ === 'Loop') {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return $elm$bytes$Bytes$Decode$Decoder(
			A2($elm$bytes$Bytes$Decode$loopHelp, state, callback));
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v1 = A2(decodeA, bites, offset);
					var aOffset = _v1.a;
					var a = _v1.b;
					return _Utils_Tuple2(
						aOffset,
						func(a));
				}));
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (_v0, offset) {
				return _Utils_Tuple2(offset, a);
			}));
};
var $TSFoster$elm_sha1$SHA1$loopHelp = F2(
	function (step, _v0) {
		var n = _v0.a;
		var state = _v0.b;
		return (n > 0) ? A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(n - 1, _new));
			},
			step(state)) : $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(state));
	});
var $TSFoster$elm_sha1$SHA1$iterate = F3(
	function (n, step, initial) {
		return A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(n, initial),
			$TSFoster$elm_sha1$SHA1$loopHelp(step));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 'U8', a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $elm$bytes$Bytes$width = _Bytes_width;
var $TSFoster$elm_sha1$SHA1$padBuffer = function (bytes) {
	var byteCount = $elm$bytes$Bytes$width(bytes);
	var paddingSize = 4 + A2(
		$elm$core$Basics$modBy,
		64,
		56 - A2($elm$core$Basics$modBy, 64, byteCount + 1));
	var message = $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					$elm$bytes$Bytes$Encode$bytes(bytes),
					$elm$bytes$Bytes$Encode$unsignedInt8(128),
					$elm$bytes$Bytes$Encode$sequence(
					A2(
						$elm$core$List$repeat,
						paddingSize,
						$elm$bytes$Bytes$Encode$unsignedInt8(0))),
					A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, byteCount << 3)
				])));
	return message;
};
var $elm$bytes$Bytes$Decode$map4 = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var decodeA = _v0.a;
		var decodeB = _v1.a;
		var decodeC = _v2.a;
		var decodeD = _v3.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v4 = A2(decodeA, bites, offset);
					var aOffset = _v4.a;
					var a = _v4.b;
					var _v5 = A2(decodeB, bites, aOffset);
					var bOffset = _v5.a;
					var b = _v5.b;
					var _v6 = A2(decodeC, bites, bOffset);
					var cOffset = _v6.a;
					var c = _v6.b;
					var _v7 = A2(decodeD, bites, cOffset);
					var dOffset = _v7.a;
					var d = _v7.b;
					return _Utils_Tuple2(
						dOffset,
						A4(func, a, b, c, d));
				}));
	});
var $elm$bytes$Bytes$Decode$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var decodeA = _v0.a;
		var decodeB = _v1.a;
		var decodeC = _v2.a;
		var decodeD = _v3.a;
		var decodeE = _v4.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v5 = A2(decodeA, bites, offset);
					var aOffset = _v5.a;
					var a = _v5.b;
					var _v6 = A2(decodeB, bites, aOffset);
					var bOffset = _v6.a;
					var b = _v6.b;
					var _v7 = A2(decodeC, bites, bOffset);
					var cOffset = _v7.a;
					var c = _v7.b;
					var _v8 = A2(decodeD, bites, cOffset);
					var dOffset = _v8.a;
					var d = _v8.b;
					var _v9 = A2(decodeE, bites, dOffset);
					var eOffset = _v9.a;
					var e = _v9.b;
					return _Utils_Tuple2(
						eOffset,
						A5(func, a, b, c, d, e));
				}));
	});
var $TSFoster$elm_sha1$SHA1$map16 = function (f) {
	return function (b1) {
		return function (b2) {
			return function (b3) {
				return function (b4) {
					return function (b5) {
						return function (b6) {
							return function (b7) {
								return function (b8) {
									return function (b9) {
										return function (b10) {
											return function (b11) {
												return function (b12) {
													return function (b13) {
														return function (b14) {
															return function (b15) {
																return function (b16) {
																	var d1 = A5(
																		$elm$bytes$Bytes$Decode$map4,
																		F4(
																			function (a, b, c, d) {
																				return A4(f, a, b, c, d);
																			}),
																		b1,
																		b2,
																		b3,
																		b4);
																	var d2 = A6(
																		$elm$bytes$Bytes$Decode$map5,
																		F5(
																			function (h, a, b, c, d) {
																				return A4(h, a, b, c, d);
																			}),
																		d1,
																		b5,
																		b6,
																		b7,
																		b8);
																	var d3 = A6(
																		$elm$bytes$Bytes$Decode$map5,
																		F5(
																			function (h, a, b, c, d) {
																				return A4(h, a, b, c, d);
																			}),
																		d2,
																		b9,
																		b10,
																		b11,
																		b12);
																	var d4 = A6(
																		$elm$bytes$Bytes$Decode$map5,
																		F5(
																			function (h, a, b, c, d) {
																				return A4(h, a, b, c, d);
																			}),
																		d3,
																		b13,
																		b14,
																		b15,
																		b16);
																	return d4;
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$DeltaState = function (a) {
	return {$: 'DeltaState', a: a};
};
var $TSFoster$elm_sha1$SHA1$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $TSFoster$elm_sha1$SHA1$rotateLeftBy = F2(
	function (amount, i) {
		return ((i >>> (32 - amount)) | (i << amount)) >>> 0;
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk = F3(
	function (index, _int, _v0) {
		var a = _v0.a.a;
		var b = _v0.a.b;
		var c = _v0.a.c;
		var d = _v0.a.d;
		var e = _v0.a.e;
		var shiftedA = (a >>> (32 - 5)) | (a << 5);
		var f = function () {
			var _v1 = (index / 20) | 0;
			switch (_v1) {
				case 0:
					return ((b & c) | ((~b) & d)) + 1518500249;
				case 1:
					return (b ^ (c ^ d)) + 1859775393;
				case 2:
					return ((b & (c | d)) | (c & d)) + 2400959708;
				default:
					return (b ^ (c ^ d)) + 3395469782;
			}
		}();
		var newA = (((shiftedA + f) + e) + _int) >>> 0;
		return $TSFoster$elm_sha1$SHA1$DeltaState(
			{
				a: newA,
				b: a,
				c: A2($TSFoster$elm_sha1$SHA1$rotateLeftBy, 30, b),
				d: c,
				e: d
			});
	});
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltas = function (remaining) {
	return function (index) {
		return function (a) {
			return function (b) {
				return function (c) {
					return function (d) {
						return function (e) {
							return function (v1) {
								return function (v2) {
									return function (v3) {
										return function (v4) {
											return function (v5) {
												return function (v6) {
													return function (v7) {
														return function (v8) {
															calculateDigestDeltas:
															while (true) {
																if (!remaining) {
																	return $TSFoster$elm_sha1$SHA1$DeltaState(
																		{a: a, b: b, c: c, d: d, e: e});
																} else {
																	var shiftedA = (a >>> (32 - 5)) | (a << 5);
																	var _int = v1;
																	var f = function () {
																		var _v0 = (index / 20) | 0;
																		switch (_v0) {
																			case 0:
																				return ((b & c) | ((~b) & d)) + 1518500249;
																			case 1:
																				return (b ^ (c ^ d)) + 1859775393;
																			case 2:
																				return ((b & (c | d)) | (c & d)) + 2400959708;
																			default:
																				return (b ^ (c ^ d)) + 3395469782;
																		}
																	}();
																	var newA = (((shiftedA + f) + e) + _int) >>> 0;
																	var $temp$remaining = remaining - 1,
																		$temp$index = index + 1,
																		$temp$a = newA,
																		$temp$b = a,
																		$temp$c = A2($TSFoster$elm_sha1$SHA1$rotateLeftBy, 30, b),
																		$temp$d = c,
																		$temp$e = d,
																		$temp$v1 = v2,
																		$temp$v2 = v3,
																		$temp$v3 = v4,
																		$temp$v4 = v5,
																		$temp$v5 = v6,
																		$temp$v6 = v7,
																		$temp$v7 = v8,
																		$temp$v8 = 0;
																	remaining = $temp$remaining;
																	index = $temp$index;
																	a = $temp$a;
																	b = $temp$b;
																	c = $temp$c;
																	d = $temp$d;
																	e = $temp$e;
																	v1 = $temp$v1;
																	v2 = $temp$v2;
																	v3 = $temp$v3;
																	v4 = $temp$v4;
																	v5 = $temp$v5;
																	v6 = $temp$v6;
																	v7 = $temp$v7;
																	v8 = $temp$v8;
																	continue calculateDigestDeltas;
																}
															}
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $TSFoster$elm_sha1$SHA1$rotateLeftBy1 = function (i) {
	return (i >>> 31) | (i << 1);
};
var $TSFoster$elm_sha1$SHA1$reduceWords = function (i) {
	return function (deltaState) {
		return function (b16) {
			return function (b15) {
				return function (b14) {
					return function (b13) {
						return function (b12) {
							return function (b11) {
								return function (b10) {
									return function (b9) {
										return function (b8) {
											return function (b7) {
												return function (b6) {
													return function (b5) {
														return function (b4) {
															return function (b3) {
																return function (b2) {
																	return function (b1) {
																		reduceWords:
																		while (true) {
																			var a = deltaState.a.a;
																			var b = deltaState.a.b;
																			var c = deltaState.a.c;
																			var d = deltaState.a.d;
																			var e = deltaState.a.e;
																			if (i !== 64) {
																				var value3 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b14 ^ (b12 ^ (b6 ^ b1)));
																				var value6 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b11 ^ (b9 ^ (b3 ^ value3)));
																				var value2 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b15 ^ (b13 ^ (b7 ^ b2)));
																				var value5 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b12 ^ (b10 ^ (b4 ^ value2)));
																				var value8 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b9 ^ (b7 ^ (b1 ^ value5)));
																				var value1 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b16 ^ (b14 ^ (b8 ^ b3)));
																				var value4 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b13 ^ (b11 ^ (b5 ^ value1)));
																				var value7 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b10 ^ (b8 ^ (b2 ^ value4)));
																				var newState = $TSFoster$elm_sha1$SHA1$calculateDigestDeltas(8)(i + 16)(a)(b)(c)(d)(e)(value1)(value2)(value3)(value4)(value5)(value6)(value7)(value8);
																				var $temp$i = i + 8,
																					$temp$deltaState = newState,
																					$temp$b16 = b8,
																					$temp$b15 = b7,
																					$temp$b14 = b6,
																					$temp$b13 = b5,
																					$temp$b12 = b4,
																					$temp$b11 = b3,
																					$temp$b10 = b2,
																					$temp$b9 = b1,
																					$temp$b8 = value1,
																					$temp$b7 = value2,
																					$temp$b6 = value3,
																					$temp$b5 = value4,
																					$temp$b4 = value5,
																					$temp$b3 = value6,
																					$temp$b2 = value7,
																					$temp$b1 = value8;
																				i = $temp$i;
																				deltaState = $temp$deltaState;
																				b16 = $temp$b16;
																				b15 = $temp$b15;
																				b14 = $temp$b14;
																				b13 = $temp$b13;
																				b12 = $temp$b12;
																				b11 = $temp$b11;
																				b10 = $temp$b10;
																				b9 = $temp$b9;
																				b8 = $temp$b8;
																				b7 = $temp$b7;
																				b6 = $temp$b6;
																				b5 = $temp$b5;
																				b4 = $temp$b4;
																				b3 = $temp$b3;
																				b2 = $temp$b2;
																				b1 = $temp$b1;
																				continue reduceWords;
																			} else {
																				return deltaState;
																			}
																		}
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$reduceChunkHelp = function (_v0) {
	return function (b1) {
		return function (b2) {
			return function (b3) {
				return function (b4) {
					return function (b5) {
						return function (b6) {
							return function (b7) {
								return function (b8) {
									return function (b9) {
										return function (b10) {
											return function (b11) {
												return function (b12) {
													return function (b13) {
														return function (b14) {
															return function (b15) {
																return function (b16) {
																	var initial = _v0.a;
																	var initialDeltaState = A3(
																		$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																		15,
																		b16,
																		A3(
																			$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																			14,
																			b15,
																			A3(
																				$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																				13,
																				b14,
																				A3(
																					$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																					12,
																					b13,
																					A3(
																						$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																						11,
																						b12,
																						A3(
																							$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																							10,
																							b11,
																							A3(
																								$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																								9,
																								b10,
																								A3(
																									$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																									8,
																									b9,
																									A3(
																										$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																										7,
																										b8,
																										A3(
																											$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																											6,
																											b7,
																											A3(
																												$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																												5,
																												b6,
																												A3(
																													$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																													4,
																													b5,
																													A3(
																														$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																														3,
																														b4,
																														A3(
																															$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																															2,
																															b3,
																															A3(
																																$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																																1,
																																b2,
																																A3(
																																	$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk,
																																	0,
																																	b1,
																																	$TSFoster$elm_sha1$SHA1$DeltaState(initial)))))))))))))))));
																	var _v1 = $TSFoster$elm_sha1$SHA1$reduceWords(0)(initialDeltaState)(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10)(b11)(b12)(b13)(b14)(b15)(b16);
																	var a = _v1.a.a;
																	var b = _v1.a.b;
																	var c = _v1.a.c;
																	var d = _v1.a.d;
																	var e = _v1.a.e;
																	return $TSFoster$elm_sha1$SHA1$State(
																		{a: initial.a + a, b: initial.b + b, c: initial.c + c, d: initial.d + d, e: initial.e + e});
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_u32(
			_Utils_eq(endianness, $elm$bytes$Bytes$LE)));
};
var $TSFoster$elm_sha1$SHA1$u32 = $elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE);
var $TSFoster$elm_sha1$SHA1$reduceChunk = function (state) {
	return $TSFoster$elm_sha1$SHA1$map16(
		$TSFoster$elm_sha1$SHA1$reduceChunkHelp(state))($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32)($TSFoster$elm_sha1$SHA1$u32);
};
var $TSFoster$elm_sha1$SHA1$Digest = function (a) {
	return {$: 'Digest', a: a};
};
var $TSFoster$elm_sha1$SHA1$stateToDigest = function (_v0) {
	var a = _v0.a.a;
	var b = _v0.a.b;
	var c = _v0.a.c;
	var d = _v0.a.d;
	var e = _v0.a.e;
	return $TSFoster$elm_sha1$SHA1$Digest(
		{a: a >>> 0, b: b >>> 0, c: c >>> 0, d: d >>> 0, e: e >>> 0});
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $TSFoster$elm_sha1$SHA1$hashBytes = F2(
	function (state, bytes) {
		var message = $TSFoster$elm_sha1$SHA1$padBuffer(bytes);
		var numberOfChunks = ($elm$bytes$Bytes$width(message) / 64) | 0;
		var hashState = A3($TSFoster$elm_sha1$SHA1$iterate, numberOfChunks, $TSFoster$elm_sha1$SHA1$reduceChunk, state);
		return $TSFoster$elm_sha1$SHA1$stateToDigest(
			A2(
				$elm$core$Maybe$withDefault,
				state,
				A2($elm$bytes$Bytes$Decode$decode, hashState, message)));
	});
var $TSFoster$elm_sha1$SHA1$Tuple5 = F5(
	function (a, b, c, d, e) {
		return {a: a, b: b, c: c, d: d, e: e};
	});
var $TSFoster$elm_sha1$SHA1$initialState = $TSFoster$elm_sha1$SHA1$State(
	A5($TSFoster$elm_sha1$SHA1$Tuple5, 1732584193, 4023233417, 2562383102, 271733878, 3285377520));
var $TSFoster$elm_sha1$SHA1$fromBytes = $TSFoster$elm_sha1$SHA1$hashBytes($TSFoster$elm_sha1$SHA1$initialState);
var $TSFoster$elm_sha1$SHA1$toInt32s = function (_v0) {
	var digest = _v0.a;
	return digest;
};
var $TSFoster$elm_uuid$UUID$forceUnsigned = $elm$core$Bitwise$shiftRightZfBy(0);
var $TSFoster$elm_uuid$UUID$toVariant1 = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4(
		$TSFoster$elm_uuid$UUID$UUID,
		a,
		b,
		$TSFoster$elm_uuid$UUID$forceUnsigned(2147483648 | (1073741823 & c)),
		d);
};
var $TSFoster$elm_uuid$UUID$toVersion = F2(
	function (v, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var d = _v0.d;
		return A4(
			$TSFoster$elm_uuid$UUID$UUID,
			a,
			$TSFoster$elm_uuid$UUID$forceUnsigned((v << 12) | (4294905855 & b)),
			c,
			d);
	});
var $TSFoster$elm_uuid$UUID$forBytes = F2(
	function (bytes, namespace) {
		return $TSFoster$elm_uuid$UUID$toVariant1(
			A2(
				$TSFoster$elm_uuid$UUID$toVersion,
				5,
				function (_v0) {
					var a = _v0.a;
					var b = _v0.b;
					var c = _v0.c;
					var d = _v0.d;
					return A4($TSFoster$elm_uuid$UUID$UUID, a, b, c, d);
				}(
					$TSFoster$elm_sha1$SHA1$toInt32s(
						$TSFoster$elm_sha1$SHA1$fromBytes(
							$elm$bytes$Bytes$Encode$encode(
								$elm$bytes$Bytes$Encode$sequence(
									_List_fromArray(
										[
											$TSFoster$elm_uuid$UUID$encoder(namespace),
											$elm$bytes$Bytes$Encode$bytes(bytes)
										]))))))));
	});
var $elm$bytes$Bytes$Encode$Utf8 = F2(
	function (a, b) {
		return {$: 'Utf8', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$string = function (str) {
	return A2(
		$elm$bytes$Bytes$Encode$Utf8,
		_Bytes_getStringWidth(str),
		str);
};
var $TSFoster$elm_uuid$UUID$forName = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $TSFoster$elm_uuid$UUID$forBytes, $elm$bytes$Bytes$Encode$encode),
	$elm$bytes$Bytes$Encode$string);
var $author$project$Battle$DeliverItemToShop = {$: 'DeliverItemToShop'};
var $author$project$Battle$Forest = {$: 'Forest'};
var $author$project$Battle$LivingMonster = function (a) {
	return {$: 'LivingMonster', a: a};
};
var $author$project$Battle$Mountains = {$: 'Mountains'};
var $author$project$Battle$Plains = {$: 'Plains'};
var $author$project$Battle$maxMonstersPerLocation = 10;
var $author$project$Battle$createLocation = F3(
	function (locationType, locationId, name) {
		return {locationId: locationId, locationType: locationType, monstersLeft: $author$project$Battle$maxMonstersPerLocation, name: name};
	});
var $author$project$Battle$NoDefeatAction = {$: 'NoDefeatAction'};
var $author$project$Battle$initStat = function (maxVal) {
	return {curVal: maxVal, initialVal: maxVal, maxVal: maxVal};
};
var $author$project$Battle$createMonster = F4(
	function (name, hpMax, pwrMax, protMax) {
		return {
			level: 1,
			name: name,
			onDefeat: $author$project$Battle$NoDefeatAction,
			statHP: $author$project$Battle$initStat(hpMax),
			statPower: $author$project$Battle$initStat(pwrMax),
			statProtection: $author$project$Battle$initStat(protMax),
			statStamina: $author$project$Battle$initStat(10),
			xp: 0
		};
	});
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $author$project$Battle$monsterStatMap = F4(
	function (statGetter, statSetter, statFunc, monster) {
		var intStat = statGetter(monster);
		var newStat = statFunc(intStat);
		return A2(statSetter, monster, newStat);
	});
var $author$project$Battle$setStatHP = F2(
	function (monster, newStatHP) {
		return _Utils_update(
			monster,
			{statHP: newStatHP});
	});
var $author$project$Battle$monsterStatMapHP = F2(
	function (statFunc, monster) {
		return A4(
			$author$project$Battle$monsterStatMap,
			function ($) {
				return $.statHP;
			},
			$author$project$Battle$setStatHP,
			statFunc,
			monster);
	});
var $author$project$Battle$setOnDefeat = F2(
	function (defeatAction, monster) {
		return _Utils_update(
			monster,
			{onDefeat: defeatAction});
	});
var $author$project$Battle$setStatCurVal = F2(
	function (newCurVal, stat) {
		return _Utils_update(
			stat,
			{curVal: newCurVal});
	});
var $author$project$Battle$init = function (_v0) {
	var held_blood = _v0.held_blood;
	var held_gold = _v0.held_gold;
	var locations = {
		forest: A3($author$project$Battle$createLocation, $author$project$Battle$Forest, 0, 'The Forest'),
		mountains: A3($author$project$Battle$createLocation, $author$project$Battle$Mountains, 1, 'The Mountains'),
		plains: A3($author$project$Battle$createLocation, $author$project$Battle$Plains, 2, 'The Plains')
	};
	return {
		battleSeed: $elm$random$Random$initialSeed(123456),
		currentLocationId: locations.forest.locationId,
		enemyMonster: $elm$core$Maybe$Just(
			$author$project$Battle$LivingMonster(
				A2(
					$author$project$Battle$setOnDefeat,
					$author$project$Battle$DeliverItemToShop,
					A2(
						$author$project$Battle$monsterStatMapHP,
						$author$project$Battle$setStatCurVal(4),
						A4($author$project$Battle$createMonster, 'Slime', 10, 2, 5))))),
		fightLogs: _List_Nil,
		golem: $author$project$Battle$LivingMonster(
			A4($author$project$Battle$createMonster, 'Golem', 25, 10, 0)),
		locations: locations,
		player: {held_blood: held_blood, held_gold: held_gold},
		secondsWaitedSince: {lastLocationMonsterRefill: 0, lastSpRefill: 0},
		shouldShowLocationTypeMenu: false,
		showExpandedLogs: false
	};
};
var $author$project$ItemShop$Spellbook = {$: 'Spellbook'};
var $author$project$ItemShop$Weapon = {$: 'Weapon'};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$ItemShop$generate_uuid = function (str) {
	return A2($TSFoster$elm_uuid$UUID$forName, str, $TSFoster$elm_uuid$UUID$dnsNamespace);
};
var $author$project$ItemShop$item_type_to_id = function (item_type) {
	switch (item_type.$) {
		case 'Weapon':
			return 1;
		case 'Armor':
			return 2;
		case 'Spellbook':
			return 3;
		case 'Furniture':
			return 4;
		default:
			return 5;
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$ItemShop$Armor = {$: 'Armor'};
var $author$project$ItemShop$unset_item_frame = {
	description: 'An unset item description for debugging',
	id: A2($TSFoster$elm_uuid$UUID$forName, 'unset item ', $TSFoster$elm_uuid$UUID$dnsNamespace),
	item_type: $author$project$ItemShop$Armor,
	name: 'UNSET ITEM',
	raw_gold_cost: 5
};
var $author$project$ItemShop$lookup_item_id_str_default = F2(
	function (item_db, item_id_str) {
		var _v0 = A2($elm$core$Dict$get, item_id_str, item_db);
		if (_v0.$ === 'Just') {
			var db_record = _v0.a;
			return db_record.item;
		} else {
			return $author$project$ItemShop$unset_item_frame;
		}
	});
var $author$project$ItemShop$Free = {$: 'Free'};
var $author$project$ItemShop$Price = function (a) {
	return {$: 'Price', a: a};
};
var $author$project$ItemShop$setPrice = function (qty) {
	if (!qty) {
		return $author$project$ItemShop$Free;
	} else {
		return $author$project$ItemShop$Price(qty);
	}
};
var $author$project$ItemShop$reset_avg_price_to_default = function (inventory_record) {
	var item = inventory_record.item;
	return _Utils_update(
		inventory_record,
		{
			avg_price: $author$project$ItemShop$setPrice(item.raw_gold_cost)
		});
};
var $author$project$ItemShop$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var $author$project$ItemShop$setQuantity = function (qty) {
	return $author$project$ItemShop$Quantity(qty);
};
var $author$project$ItemShop$initial_characters = function (item_db) {
	var base_character_2 = A2(
		$author$project$ItemShop$createCharacter,
		$author$project$ItemShop$generate_uuid('character 2'),
		'Mitchell');
	var base_character_1 = A2(
		$author$project$ItemShop$createCharacter,
		$author$project$ItemShop$generate_uuid('character 1'),
		'Billy');
	return _List_fromArray(
		[
			_Utils_update(
			base_character_1,
			{
				held_gold: 100,
				held_items: A2(
					$elm$core$List$map,
					$author$project$ItemShop$reset_avg_price_to_default,
					_List_fromArray(
						[
							{
							avg_price: $author$project$ItemShop$setPrice(20),
							item: A2($author$project$ItemShop$lookup_item_id_str_default, item_db, '6b7e301d-ab12-5e81-acfc-547e63004ffa'),
							quantity: $author$project$ItemShop$setQuantity(8)
						}
						])),
				item_types_desired: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							$author$project$ItemShop$item_type_to_id($author$project$ItemShop$Weapon),
							0.0)
						]))
			}),
			_Utils_update(
			base_character_2,
			{
				held_gold: 200,
				held_items: A2(
					$elm$core$List$map,
					$author$project$ItemShop$reset_avg_price_to_default,
					_List_fromArray(
						[
							{
							avg_price: $author$project$ItemShop$setPrice(25),
							item: A2($author$project$ItemShop$lookup_item_id_str_default, item_db, 'a41ae9d3-61f0-54f9-800e-56f53ed3ac98'),
							quantity: $author$project$ItemShop$setQuantity(12)
						}
						])),
				item_types_desired: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							$author$project$ItemShop$item_type_to_id($author$project$ItemShop$Spellbook),
							0.0)
						]))
			})
		]);
};
var $author$project$ItemShop$Food = {$: 'Food'};
var $author$project$ItemShop$Furniture = {$: 'Furniture'};
var $author$project$ItemShop$ItemDbTradeStats = F3(
	function (times_you_sold, times_you_bought, times_others_traded) {
		return {times_others_traded: times_others_traded, times_you_bought: times_you_bought, times_you_sold: times_you_sold};
	});
var $author$project$ItemShop$createItemDbTradeStats = A3($author$project$ItemShop$ItemDbTradeStats, 0, 0, 0);
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$String$fromList = _String_fromList;
var $TSFoster$elm_uuid$UUID$toHex = F2(
	function (acc, _int) {
		toHex:
		while (true) {
			if (!_int) {
				return $elm$core$String$fromList(acc);
			} else {
				var _char = function () {
					var _v0 = 15 & _int;
					switch (_v0) {
						case 0:
							return _Utils_chr('0');
						case 1:
							return _Utils_chr('1');
						case 2:
							return _Utils_chr('2');
						case 3:
							return _Utils_chr('3');
						case 4:
							return _Utils_chr('4');
						case 5:
							return _Utils_chr('5');
						case 6:
							return _Utils_chr('6');
						case 7:
							return _Utils_chr('7');
						case 8:
							return _Utils_chr('8');
						case 9:
							return _Utils_chr('9');
						case 10:
							return _Utils_chr('a');
						case 11:
							return _Utils_chr('b');
						case 12:
							return _Utils_chr('c');
						case 13:
							return _Utils_chr('d');
						case 14:
							return _Utils_chr('e');
						default:
							return _Utils_chr('f');
					}
				}();
				var $temp$acc = A2($elm$core$List$cons, _char, acc),
					$temp$int = _int >>> 4;
				acc = $temp$acc;
				_int = $temp$int;
				continue toHex;
			}
		}
	});
var $TSFoster$elm_uuid$UUID$toStringWith = F2(
	function (sep, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var d = _v0.d;
		return _Utils_ap(
			A3(
				$elm$core$String$padLeft,
				8,
				_Utils_chr('0'),
				A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, a)),
			_Utils_ap(
				sep,
				_Utils_ap(
					A3(
						$elm$core$String$padLeft,
						4,
						_Utils_chr('0'),
						A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, b >>> 16)),
					_Utils_ap(
						sep,
						_Utils_ap(
							A3(
								$elm$core$String$padLeft,
								4,
								_Utils_chr('0'),
								A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, 65535 & b)),
							_Utils_ap(
								sep,
								_Utils_ap(
									A3(
										$elm$core$String$padLeft,
										4,
										_Utils_chr('0'),
										A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, c >>> 16)),
									_Utils_ap(
										sep,
										_Utils_ap(
											A3(
												$elm$core$String$padLeft,
												4,
												_Utils_chr('0'),
												A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, 65535 & c)),
											A3(
												$elm$core$String$padLeft,
												8,
												_Utils_chr('0'),
												A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, d)))))))))));
	});
var $TSFoster$elm_uuid$UUID$toString = $TSFoster$elm_uuid$UUID$toStringWith('-');
var $author$project$ItemShop$create_db_entry = function (_v0) {
	var is_unlocked = _v0.a;
	var item = _v0.b;
	return _Utils_Tuple2(
		$TSFoster$elm_uuid$UUID$toString(item.id),
		{is_unlocked: is_unlocked, item: item, trade_stats: $author$project$ItemShop$createItemDbTradeStats});
};
var $author$project$ItemShop$initial_item_db = function () {
	var initial_items = _List_fromArray(
		[
			_Utils_Tuple2(
			false,
			{
				description: 'An pair of anklets',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'anklets', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Armor,
				name: 'Anklet',
				raw_gold_cost: 6
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'An old pair of boots',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'boots', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Armor,
				name: 'Boots',
				raw_gold_cost: 5
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Lightly-colored tanned leather',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'leather armor', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Armor,
				name: 'Leather Armor',
				raw_gold_cost: 15
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'Medium armor, afford some protection',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'iron armor', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Armor,
				name: 'Iron Armor',
				raw_gold_cost: 23
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'A helmet made of iron',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'iron helm', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Armor,
				name: 'Iron Helm',
				raw_gold_cost: 20
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'A rusted sword',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'rusted sword', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Weapon,
				name: 'Sword',
				raw_gold_cost: 15
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'A small weapon that fits in your pocket',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'small dagger', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Weapon,
				name: 'Dagger',
				raw_gold_cost: 10
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'A broad-headed axe, commonly used to fell great trees',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'broadheaded axe', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Weapon,
				name: 'Broad-headed axe',
				raw_gold_cost: 19
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Bound in leather, this book has a skull for a cover',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'book of the dead', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Spellbook,
				name: 'Book of the Dead',
				raw_gold_cost: 20
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'Light bounces off strangely, as if it imperceptibly shuddered',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'book of the magi', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Spellbook,
				name: 'Book of the Magi',
				raw_gold_cost: 50
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'Gently pulses.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'book of the mender', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Spellbook,
				name: 'Book of the Mender',
				raw_gold_cost: 30
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Looks like grass.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'green herb', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Green Herb',
				raw_gold_cost: 10
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Looks like angry grass.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'red herb', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Red Herb',
				raw_gold_cost: 30
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Looks like sad grass.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'blue herb', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Blue Herb',
				raw_gold_cost: 50
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Looks like asphyxiated grass.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'purple herb', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Purple Herb',
				raw_gold_cost: 40
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'You\'d like to eat one of these.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'meatpie', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Meatpie',
				raw_gold_cost: 25
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'You\'d not like to eat one of these.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'veggiepie', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Food,
				name: 'Veggiepie',
				raw_gold_cost: 15
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Would be great to sit on.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'iron stool', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Furniture,
				name: 'Iron Stool',
				raw_gold_cost: 32
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Would be okay to sit on.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'wooden stool', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Furniture,
				name: 'Wooden Stool',
				raw_gold_cost: 23
			}),
			_Utils_Tuple2(
			true,
			{
				description: 'Would be better than great to sit on.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'steel stool', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Furniture,
				name: 'Steel Stool',
				raw_gold_cost: 38
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'Would be the one sitting on you.',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'strong stool', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Furniture,
				name: 'Strong Stool',
				raw_gold_cost: 55
			}),
			_Utils_Tuple2(
			false,
			{
				description: 'You\'d crush this if you had to sit on it',
				id: A2($TSFoster$elm_uuid$UUID$forName, 'weak stool', $TSFoster$elm_uuid$UUID$dnsNamespace),
				item_type: $author$project$ItemShop$Furniture,
				name: 'Weak Stool',
				raw_gold_cost: 25
			})
		]);
	return $elm$core$Dict$fromList(
		A2($elm$core$List$map, $author$project$ItemShop$create_db_entry, initial_items));
}();
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$ItemShop$lookup_item_id_str = F2(
	function (item_db, item_id_str) {
		return A2($elm$core$Dict$get, item_id_str, item_db);
	});
var $elm$core$Debug$todo = _Debug_todo;
var $author$project$ItemShop$initial_items_for_sale = function (item_db) {
	var seed = $elm$random$Random$initialSeed(12345);
	var item_configs = _List_fromArray(
		[
			_Utils_Tuple2(
			'a41ae9d3-61f0-54f9-800e-56f53ed3ac98',
			$author$project$ItemShop$Quantity(3)),
			_Utils_Tuple2(
			'c3c38323-1743-5a47-a8e3-bf6ec28137f9',
			$author$project$ItemShop$Quantity(5)),
			_Utils_Tuple2(
			'6b7e301d-ab12-5e81-acfc-547e63004ffa',
			$author$project$ItemShop$Quantity(4)),
			_Utils_Tuple2(
			'48e66792-4c97-598f-8937-3a7042f00591',
			$author$project$ItemShop$Quantity(1))
		]);
	var item_records = A2(
		$elm$core$List$filterMap,
		function (_v1) {
			var item_id_str = _v1.a;
			var qty = _v1.b;
			var _v2 = A2($author$project$ItemShop$lookup_item_id_str, item_db, item_id_str);
			if (_v2.$ === 'Just') {
				var db_record = _v2.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(db_record, qty));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		},
		item_configs);
	var just_items = A2(
		$elm$core$List$filterMap,
		function (_v0) {
			var db_record = _v0.a;
			var qty = _v0.b;
			return db_record.is_unlocked ? $elm$core$Maybe$Just(
				{
					avg_price: $author$project$ItemShop$setPrice(db_record.item.raw_gold_cost),
					item: db_record.item,
					quantity: qty
				}) : $elm$core$Maybe$Nothing;
		},
		item_records);
	var debug = _Utils_eq(
		$elm$core$List$length(item_records),
		$elm$core$List$length(item_configs)) ? $elm$core$Result$Ok('') : A2(
		_Debug_todo(
			'ItemShop',
			{
				start: {line: 967, column: 17},
				end: {line: 967, column: 27}
			}),
		'THERE WAS AN ERROR IN INITIAL ITEM SETUP!!!!',
		$elm$core$Result$Err(''));
	return just_items;
};
var $author$project$ItemShop$initial_owned_items = function (item_db) {
	return A2(
		$elm$core$List$map,
		$author$project$ItemShop$reset_avg_price_to_default,
		_List_fromArray(
			[
				{
				avg_price: $author$project$ItemShop$setPrice(9999),
				item: A2($author$project$ItemShop$lookup_item_id_str_default, item_db, 'a41ae9d3-61f0-54f9-800e-56f53ed3ac98'),
				quantity: $author$project$ItemShop$Quantity(12)
			}
			]));
};
var $author$project$ItemShop$initial_shop_trends = {
	item_trade_logs: _List_Nil,
	item_type_sentiment: $elm$core$Dict$fromList(
		A2(
			$elm$core$List$map,
			function (it) {
				return _Utils_Tuple2(
					$author$project$ItemShop$item_type_to_id(it),
					1.0);
			},
			_List_fromArray(
				[$author$project$ItemShop$Weapon, $author$project$ItemShop$Armor, $author$project$ItemShop$Spellbook, $author$project$ItemShop$Furniture, $author$project$ItemShop$Food])))
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$ItemShop$ItemsUnlockedTabType = {$: 'ItemsUnlockedTabType'};
var $author$project$ItemShop$stringToTabType = function (hash) {
	switch (hash) {
		case 'shop':
			return $author$project$ItemShop$ShopTabType;
		case 'items':
			return $author$project$ItemShop$ItemsUnlockedTabType;
		case 'battle':
			return $author$project$ItemShop$BattleTabType;
		default:
			return $author$project$ItemShop$ShopTabType;
	}
};
var $author$project$ItemShop$init = F2(
	function (hash, key) {
		var shop_base_char = A2(
			$author$project$ItemShop$createCharacter,
			A2($TSFoster$elm_uuid$UUID$forName, 'shop character', $TSFoster$elm_uuid$UUID$dnsNamespace),
			'Shop');
		var player_base_char = A2(
			$author$project$ItemShop$createCharacter,
			A2($TSFoster$elm_uuid$UUID$forName, 'player character', $TSFoster$elm_uuid$UUID$dnsNamespace),
			'Player');
		var item_db = $author$project$ItemShop$initial_item_db;
		var player = _Utils_update(
			player_base_char,
			{
				held_blood: 100,
				held_gold: 25,
				held_items: $author$project$ItemShop$initial_owned_items(item_db),
				party: $author$project$ItemShop$PlayerParty
			});
		var shop = _Utils_update(
			shop_base_char,
			{
				held_gold: 999999999,
				held_items: $author$project$ItemShop$initial_items_for_sale(item_db),
				party: $author$project$ItemShop$ShopParty
			});
		var initial_tab_type = $author$project$ItemShop$stringToTabType(hash);
		var characters = _Utils_ap(
			_List_fromArray(
				[player, shop]),
			$author$project$ItemShop$initial_characters(item_db));
		var battleModel = $author$project$Battle$init(player);
		var initModel = {
			ai_tick_time: $elm$time$Time$millisToPosix(-1),
			ai_updates_paused: (_Utils_eq(initial_tab_type, $author$project$ItemShop$ShopTabType) || _Utils_eq(initial_tab_type, $author$project$ItemShop$BattleTabType)) ? false : true,
			battleModel: battleModel,
			browserNavKey: key,
			cached_tooltip_offsets: $elm$core$Dict$empty,
			characters: characters,
			colorTheme: $author$project$Interface$BrightTheme,
			globalViewport: $elm$core$Maybe$Nothing,
			global_seed: $elm$random$Random$initialSeed(4),
			historical_player_actions: _List_fromArray(
				[$author$project$ItemShop$WelcomeMessageActionLog]),
			historical_shop_trends: _List_Nil,
			hovered_item_in_character: $elm$core$Maybe$Nothing,
			hovered_tooltip: $author$project$ItemShop$NoHoveredTooltip,
			hovered_trend_chart: _List_Nil,
			inventorySortDir: $author$project$ItemShop$Ascending,
			inventorySortType: $author$project$ItemShop$SortByName,
			item_db: item_db,
			player_id: player.char_id,
			player_upgrades: _List_fromArray(
				[
					$author$project$ItemShop$AutomaticGPM(1)
				]),
			shiftIsPressed: false,
			shop_id: shop.char_id,
			shop_trends: $author$project$ItemShop$initial_shop_trends,
			shop_trends_hovered: false,
			shouldDisplayShowDebugInventoriesOverlay: false,
			showDebugInventoriesElement: $elm$core$Maybe$Nothing,
			show_charts_in_hovered_item: false,
			show_debug_inventories: true,
			show_main_chart: true,
			tab_type: initial_tab_type
		};
		return _Utils_Tuple2(
			initModel,
			A2($elm$core$Task$perform, $author$project$ItemShop$TickSecond, $elm$time$Time$now));
	});
var $author$project$Sfxr$Square = {$: 'Square'};
var $author$project$Sfxr$initSoundConfig = {
	arpeggiation: {mod: 0, speed: 0},
	duty: {duty: 0, ramp: 0},
	envelope: {attack: 0, decay: 0.4, punch: 0, sustain: 0.3},
	flanger: {offset: 0, ramp: 0},
	frequency: {base: 0.3, dramp: 0, limit: 0, ramp: 0.0},
	highPassFilter: {frequency: 0, ramp: 0},
	lowPassFilter: {frequency: 1, ramp: 0, resonance: 0},
	misc: {sampleRate: 44100, sampleSize: 8, volume: 0.05},
	retrigger: {repeatSpeed: 0.0},
	shape: $author$project$Sfxr$Square,
	vibrato: {speed: 0, strength: 0}
};
var $author$project$Sfxr$init = {
	globalSeed: $elm$random$Random$initialSeed(12345),
	soundConfig: $author$project$Sfxr$initSoundConfig
};
var $author$project$Main$HomePage = {$: 'HomePage'};
var $author$project$Main$NotFoundPage = {$: 'NotFoundPage'};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$initCurrentPage = function (_v0) {
	var model = _v0.a;
	var existingCmds = _v0.b;
	var page_info = model.page_info;
	var _v1 = function () {
		var _v2 = model.page_info.route;
		switch (_v2.$) {
			case 'TabRoute':
				var tab_type = _v2.a;
				var fragment = _v2.b;
				return _Utils_Tuple2($author$project$Main$HomePage, $elm$core$Platform$Cmd$none);
			case 'NotFound':
				return _Utils_Tuple2($author$project$Main$NotFoundPage, $elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2($author$project$Main$NotFoundPage, $elm$core$Platform$Cmd$none);
		}
	}();
	var currentPage = _v1.a;
	var mappedPageCmds = _v1.b;
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				page_info: _Utils_update(
					page_info,
					{page: currentPage})
			}),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[existingCmds, mappedPageCmds])));
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Main$TabRoute = F2(
	function (a, b) {
		return {$: 'TabRoute', a: a, b: b};
	});
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$fragment = function (toFrag) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			return _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						toFrag(frag)))
				]);
		});
};
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.visited;
		var unvisited = _v0.unvisited;
		var params = _v0.params;
		var frag = _v0.frag;
		var value = _v0.value;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0.a;
		return $elm$url$Url$Parser$Parser(
			function (_v1) {
				var visited = _v1.visited;
				var unvisited = _v1.unvisited;
				var params = _v1.params;
				var frag = _v1.frag;
				var value = _v1.value;
				return A2(
					$elm$core$List$map,
					$elm$url$Url$Parser$mapState(value),
					parseArg(
						A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				$elm$core$List$concatMap,
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						$elm$url$Url$Parser$State,
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $author$project$Main$matchRoute = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Main$TabRoute($author$project$Main$ItemShopTab),
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('item_shop_tab'),
				$elm$url$Url$Parser$fragment($elm$core$Basics$identity))),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Main$TabRoute($author$project$Main$ItemShopTab),
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s(''),
				$elm$url$Url$Parser$fragment($elm$core$Basics$identity))),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Main$TabRoute($author$project$Main$ItemShopTab),
			$elm$url$Url$Parser$fragment($elm$core$Basics$identity))
		]));
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $author$project$Main$parseUrl = function (url) {
	var _v0 = A2($elm$url$Url$Parser$parse, $author$project$Main$matchRoute, url);
	if (_v0.$ === 'Just') {
		var route = _v0.a;
		if (route.$ === 'TabRoute') {
			var tab_type = route.a;
			var hash = route.b;
			return A2($author$project$Main$TabRoute, tab_type, hash);
		} else {
			return A2($author$project$Main$TabRoute, $author$project$Main$ItemShopTab, $elm$core$Maybe$Nothing);
		}
	} else {
		return A2($author$project$Main$TabRoute, $author$project$Main$ItemShopTab, $elm$core$Maybe$Nothing);
	}
};
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Main$init = F3(
	function (_v0, url, navKey) {
		var parsedRoute = $author$project$Main$parseUrl(url);
		var page_info = A4($author$project$Main$UrlPageInfo, navKey, url, parsedRoute, $author$project$Main$UnsetPage);
		var initial_tab = function () {
			if (parsedRoute.$ === 'TabRoute') {
				var tab_type = parsedRoute.a;
				var hsh = parsedRoute.b;
				return tab_type;
			} else {
				return $author$project$Main$ItemShopTab;
			}
		}();
		var hash = function () {
			if ((parsedRoute.$ === 'TabRoute') && (parsedRoute.b.$ === 'Just')) {
				var tab_type = parsedRoute.a;
				var hash_ = parsedRoute.b.a;
				return hash_;
			} else {
				return '';
			}
		}();
		var _v1 = A2(
			$author$project$ItemShop$init,
			hash,
			$elm$core$Maybe$Just(navKey));
		var item_shop_model = _v1.a;
		var item_shop_cmds = _v1.b;
		var existingCmds = $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Platform$Cmd$map, $author$project$Main$GotItemShopMsg, item_shop_cmds)
				]));
		var initial_model = {
			content: 'ASD',
			count: 0,
			current_tab: initial_tab,
			item_shop_model: item_shop_model,
			page_info: page_info,
			sfxrModel: $author$project$Sfxr$init,
			time: $elm$time$Time$millisToPosix(0),
			zone: $elm$time$Time$utc
		};
		return $author$project$Main$initCurrentPage(
			_Utils_Tuple2(initial_model, existingCmds));
	});
var $author$project$Main$GotSfxrMsg = function (a) {
	return {$: 'GotSfxrMsg', a: a};
};
var $author$project$Main$RecvFromPort = function (a) {
	return {$: 'RecvFromPort', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$map = _Platform_map;
var $author$project$ItemShop$GotBattleMsg = function (a) {
	return {$: 'GotBattleMsg', a: a};
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$ItemShop$KeyPressedMsg = function (a) {
	return {$: 'KeyPressedMsg', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$ItemShop$KeyEventAlt = {$: 'KeyEventAlt'};
var $author$project$ItemShop$KeyEventControl = {$: 'KeyEventControl'};
var $author$project$ItemShop$KeyEventLetter = function (a) {
	return {$: 'KeyEventLetter', a: a};
};
var $author$project$ItemShop$KeyEventMeta = {$: 'KeyEventMeta'};
var $author$project$ItemShop$KeyEventShift = {$: 'KeyEventShift'};
var $author$project$ItemShop$KeyEventUnknown = function (a) {
	return {$: 'KeyEventUnknown', a: a};
};
var $author$project$ItemShop$toKey = function (event_key_string) {
	switch (event_key_string) {
		case 'Control':
			return $author$project$ItemShop$KeyEventControl;
		case 'Shift':
			return $author$project$ItemShop$KeyEventShift;
		case 'Alt':
			return $author$project$ItemShop$KeyEventAlt;
		case 'Meta':
			return $author$project$ItemShop$KeyEventMeta;
		default:
			var string_ = event_key_string;
			var _v1 = $elm$core$String$uncons(string_);
			if ((_v1.$ === 'Just') && (_v1.a.b === '')) {
				var _v2 = _v1.a;
				var _char = _v2.a;
				return $author$project$ItemShop$KeyEventLetter(_char);
			} else {
				return $author$project$ItemShop$KeyEventUnknown(event_key_string);
			}
	}
};
var $author$project$ItemShop$keyPressedDecoder = A2(
	$elm$json$Json$Decode$map,
	A2($elm$core$Basics$composeR, $author$project$ItemShop$toKey, $author$project$ItemShop$KeyPressedMsg),
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $author$project$ItemShop$KeyReleasedMsg = function (a) {
	return {$: 'KeyReleasedMsg', a: a};
};
var $author$project$ItemShop$keyReleasedDecoder = A2(
	$elm$json$Json$Decode$map,
	A2($elm$core$Basics$composeR, $author$project$ItemShop$toKey, $author$project$ItemShop$KeyReleasedMsg),
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Basics$not = _Basics_not;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $author$project$Battle$TickSecond = function (a) {
	return {$: 'TickSecond', a: a};
};
var $author$project$Battle$subscriptions = function (model) {
	return A2($elm$time$Time$every, 1000, $author$project$Battle$TickSecond);
};
var $author$project$ItemShop$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				(!model.ai_updates_paused) ? A2($elm$time$Time$every, 1000, $author$project$ItemShop$TickSecond) : $elm$core$Platform$Sub$none,
				$elm$browser$Browser$Events$onKeyDown($author$project$ItemShop$keyPressedDecoder),
				$elm$browser$Browser$Events$onKeyUp($author$project$ItemShop$keyReleasedDecoder),
				A2(
				$elm$core$Platform$Sub$map,
				$author$project$ItemShop$GotBattleMsg,
				$author$project$Battle$subscriptions(model.battleModel))
			]));
};
var $author$project$Sfxr$FromPort = function (a) {
	return {$: 'FromPort', a: a};
};
var $author$project$Sfxr$sfxrIn = _Platform_incomingPort('sfxrIn', $elm$json$Json$Decode$string);
var $author$project$Sfxr$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Sfxr$sfxrIn($author$project$Sfxr$FromPort)
			]));
};
var $author$project$Main$test_port_receiving = _Platform_incomingPort('test_port_receiving', $elm$json$Json$Decode$string);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$test_port_receiving($author$project$Main$RecvFromPort),
				A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$GotItemShopMsg,
				$author$project$ItemShop$subscriptions(model.item_shop_model)),
				A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$GotSfxrMsg,
				$author$project$Sfxr$subscriptions(model.sfxrModel))
			]));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$exec_jsonp = _Platform_outgoingPort('exec_jsonp', $elm$json$Json$Encode$string);
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Debug$log = _Debug_log;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Main$test_port_sending = _Platform_outgoingPort('test_port_sending', $elm$json$Json$Encode$string);
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Interface$DarkTheme = {$: 'DarkTheme'};
var $author$project$ItemShop$GotShowDebugElement = function (a) {
	return {$: 'GotShowDebugElement', a: a};
};
var $author$project$ItemShop$GotTooltipSize = function (a) {
	return {$: 'GotTooltipSize', a: a};
};
var $author$project$ItemShop$GotViewport = function (a) {
	return {$: 'GotViewport', a: a};
};
var $author$project$ItemShop$HoveredTooltipWithOffset = function (a) {
	return {$: 'HoveredTooltipWithOffset', a: a};
};
var $author$project$ItemShop$HoveredTooltipWithoutOffset = function (a) {
	return {$: 'HoveredTooltipWithoutOffset', a: a};
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$ItemShop$allItemTypes = _List_fromArray(
	[$author$project$ItemShop$Weapon, $author$project$ItemShop$Armor, $author$project$ItemShop$Spellbook, $author$project$ItemShop$Furniture, $author$project$ItemShop$Food]);
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $elm_community$list_extra$List$Extra$elemIndex = function (x) {
	return $elm_community$list_extra$List$Extra$findIndex(
		$elm$core$Basics$eq(x));
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$ItemShop$getCharacter = F2(
	function (characters, char_id) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.char_id;
					},
					$elm$core$Basics$eq(char_id)),
				characters));
	});
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $author$project$ItemShop$getPlayer = function (_v0) {
	var characters = _v0.characters;
	var player_id = _v0.player_id;
	return A2($author$project$ItemShop$getCharacter, characters, player_id);
};
var $author$project$ItemShop$getShop = function (_v0) {
	var characters = _v0.characters;
	var shop_id = _v0.shop_id;
	return A2($author$project$ItemShop$getCharacter, characters, shop_id);
};
var $author$project$ItemShop$getTradeContext = function (trade_record) {
	if (trade_record.$ === 'IncompleteTradeRecord') {
		var context = trade_record.a;
		return context;
	} else {
		var context = trade_record.a;
		return context;
	}
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$ItemShop$getQuantity = function (qty) {
	var val = qty.a;
	return val;
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$ItemShop$get_adjusted_item_cost = F3(
	function (shop_trends, _v0, qty) {
		var item_type = _v0.item_type;
		var raw_gold_cost = _v0.raw_gold_cost;
		var scaled_raw_cost = raw_gold_cost * $author$project$ItemShop$getQuantity(qty);
		var item_sentiment = A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2(
				$elm$core$Dict$get,
				$author$project$ItemShop$item_type_to_id(item_type),
				shop_trends.item_type_sentiment));
		return $elm$core$Basics$round(scaled_raw_cost * item_sentiment);
	});
var $author$project$ItemShop$isElementOnScreen = F2(
	function (gvp, _v0) {
		var element = _v0.element;
		var _v1 = gvp.viewport;
		var y = _v1.y;
		var height = _v1.height;
		return _Utils_cmp(y, element.y + element.height) > 0;
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$ItemShop$withCharacter = F2(
	function (new_char, model) {
		var new_characters = A2(
			$elm$core$List$map,
			function (_char) {
				return _Utils_eq(_char.char_id, new_char.char_id) ? new_char : _char;
			},
			model.characters);
		return _Utils_update(
			model,
			{characters: new_characters});
	});
var $author$project$ItemShop$mapPlayer = F2(
	function (callback, model) {
		var _v0 = $author$project$ItemShop$getPlayer(model);
		if (_v0.$ === 'Just') {
			var player = _v0.a;
			return A2(
				$author$project$ItemShop$withCharacter,
				callback(player),
				model);
		} else {
			return model;
		}
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$ItemShop$subQuantity = F2(
	function (qty, other_qty) {
		var orig_val = qty.a;
		return $author$project$ItemShop$Quantity(
			orig_val - $author$project$ItemShop$getQuantity(other_qty));
	});
var $author$project$ItemShop$reduce_if_matched = F4(
	function (item, qty, total_cost, inventory_record) {
		var avg_price = inventory_record.avg_price;
		if (_Utils_eq(inventory_record.item, item) && (_Utils_cmp(
			$author$project$ItemShop$getQuantity(inventory_record.quantity),
			$author$project$ItemShop$getQuantity(qty)) > -1)) {
			var newQty = A2($author$project$ItemShop$subQuantity, inventory_record.quantity, qty);
			return {
				avg_price: (!$author$project$ItemShop$getQuantity(newQty)) ? $author$project$ItemShop$setPrice(0) : avg_price,
				item: inventory_record.item,
				quantity: newQty
			};
		} else {
			return inventory_record;
		}
	});
var $author$project$ItemShop$remove_item_from_inventory_records = F4(
	function (records, item, qty, total_cost) {
		return A2(
			$elm$core$List$map,
			A3($author$project$ItemShop$reduce_if_matched, item, qty, total_cost),
			records);
	});
var $author$project$ItemShop$CompletedTradeRecord = F2(
	function (a, b) {
		return {$: 'CompletedTradeRecord', a: a, b: b};
	});
var $author$project$ItemShop$IncompleteTradeRecord = function (a) {
	return {$: 'IncompleteTradeRecord', a: a};
};
var $author$project$ItemShop$getPrice = function (qty) {
	if (qty.$ === 'Price') {
		var val = qty.a;
		return val;
	} else {
		return 0;
	}
};
var $author$project$ItemShop$addGold = F2(
	function (character, price) {
		return _Utils_update(
			character,
			{
				held_gold: character.held_gold + $author$project$ItemShop$getPrice(price)
			});
	});
var $author$project$ItemShop$calc_transaction_fee = function (total_cost) {
	return 1;
};
var $author$project$ItemShop$can_afford_item = F3(
	function (shop_trends, held_gold, _v0) {
		var item = _v0.item;
		var qty = _v0.qty;
		return _Utils_cmp(
			held_gold,
			A3($author$project$ItemShop$get_adjusted_item_cost, shop_trends, item, qty)) > -1;
	});
var $author$project$ItemShop$find_matching_records = F2(
	function (to_match, _v0) {
		var item = _v0.item;
		return _Utils_eq(to_match, item);
	});
var $author$project$ItemShop$has_items_to_sell = F3(
	function (inventory_records, item, qty) {
		return $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (ir) {
					return (_Utils_cmp(
						$author$project$ItemShop$getQuantity(ir.quantity),
						$author$project$ItemShop$getQuantity(qty)) > -1) && A2($author$project$ItemShop$find_matching_records, item, ir);
				},
				inventory_records)) > 0;
	});
var $author$project$ItemShop$subGold = F2(
	function (character, price) {
		return _Utils_update(
			character,
			{
				held_gold: character.held_gold - $author$project$ItemShop$getPrice(price)
			});
	});
var $author$project$ItemShop$addQuantity = F2(
	function (qty, other_qty) {
		var orig_val = qty.a;
		return $author$project$ItemShop$Quantity(
			orig_val + $author$project$ItemShop$getQuantity(other_qty));
	});
var $author$project$ItemShop$add_to_average = F4(
	function (old_avg, old_count, new_value, new_count) {
		return (((old_count * old_avg) + new_value) / (old_count + new_count)) | 0;
	});
var $author$project$ItemShop$add_item_to_inventory_records = F4(
	function (records, item, qty, total_cost) {
		var _v0 = A2(
			$elm$core$List$filter,
			$author$project$ItemShop$find_matching_records(item),
			records);
		if (!_v0.b) {
			return _Utils_ap(
				records,
				_List_fromArray(
					[
						{
						avg_price: $author$project$ItemShop$setPrice(
							A4(
								$author$project$ItemShop$add_to_average,
								0,
								0,
								total_cost,
								$author$project$ItemShop$getQuantity(qty))),
						item: item,
						quantity: qty
					}
					]));
		} else {
			var matching_records = _v0;
			var updated_records = A2(
				$elm$core$List$map,
				function (ir) {
					var quantity = ir.quantity;
					var avg_price = ir.avg_price;
					return {
						avg_price: $author$project$ItemShop$setPrice(
							A4(
								$author$project$ItemShop$add_to_average,
								$author$project$ItemShop$getPrice(avg_price),
								$author$project$ItemShop$getQuantity(quantity),
								total_cost,
								$author$project$ItemShop$getQuantity(
									A2($author$project$ItemShop$addQuantity, quantity, qty)))),
						item: ir.item,
						quantity: A2($author$project$ItemShop$addQuantity, quantity, qty)
					};
				},
				matching_records);
			var remaining_records = A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Basics$not,
					$author$project$ItemShop$find_matching_records(item)),
				records);
			return _Utils_ap(remaining_records, updated_records);
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$ItemShop$takeLast = F2(
	function (count, list) {
		return $elm$core$List$reverse(
			A2(
				$elm$core$List$take,
				count,
				$elm$core$List$reverse(list)));
	});
var $author$project$ItemShop$update_item_type_sentiment = F3(
	function (item_type_sentiment, item_type, sentiment_delta) {
		return A3(
			$elm$core$Dict$update,
			$author$project$ItemShop$item_type_to_id(item_type),
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$withDefault(1.0),
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Basics$add(sentiment_delta),
					A2(
						$elm$core$Basics$composeR,
						function (sent) {
							return (sent <= 0.1) ? 0.1 : sent;
						},
						$elm$core$Maybe$Just))),
			item_type_sentiment);
	});
var $author$project$ItemShop$trade_items_from_party_to_other = F4(
	function (shop_trends, from_character, to_character, _v0) {
		var item = _v0.item;
		var qty = _v0.qty;
		var total_cost = A3($author$project$ItemShop$get_adjusted_item_cost, shop_trends, item, qty);
		var sentiment_delta = _Utils_eq(from_character.party, $author$project$ItemShop$ShopParty) ? 0.05 : (_Utils_eq(to_character.party, $author$project$ItemShop$ShopParty) ? (-0.05) : 0.0);
		var new_to_items = A4($author$project$ItemShop$add_item_to_inventory_records, to_character.held_items, item, qty, total_cost);
		var new_its = A3($author$project$ItemShop$update_item_type_sentiment, shop_trends.item_type_sentiment, item.item_type, sentiment_delta);
		var new_from_items = A4($author$project$ItemShop$remove_item_from_inventory_records, from_character.held_items, item, qty, total_cost);
		var log_entry = {from_party: from_character.party, gold_cost: total_cost, item_id: item.id, quantity: qty, to_party: to_character.party};
		var new_item_trade_logs = _Utils_ap(
			shop_trends.item_trade_logs,
			_List_fromArray(
				[log_entry]));
		return A2(
			$author$project$ItemShop$CompletedTradeRecord,
			{
				from_party: _Utils_update(
					from_character,
					{held_items: new_from_items}),
				shop_trends: _Utils_update(
					shop_trends,
					{
						item_trade_logs: A2($author$project$ItemShop$takeLast, 100, new_item_trade_logs),
						item_type_sentiment: new_its
					}),
				to_party: _Utils_update(
					to_character,
					{held_items: new_to_items})
			},
			log_entry);
	});
var $author$project$ItemShop$sell_items_from_party_to_other = F2(
	function (orig_trade_context, _v0) {
		var item = _v0.item;
		var qty = _v0.qty;
		var _v1 = orig_trade_context;
		var shop_trends = _v1.shop_trends;
		var from_party = _v1.from_party;
		var to_party = _v1.to_party;
		var has_items = A3($author$project$ItemShop$has_items_to_sell, from_party.held_items, item, qty);
		var can_afford = A3(
			$author$project$ItemShop$can_afford_item,
			shop_trends,
			to_party.held_gold,
			{item: item, qty: qty});
		if (has_items && can_afford) {
			var trade_record = A4(
				$author$project$ItemShop$trade_items_from_party_to_other,
				shop_trends,
				from_party,
				to_party,
				{item: item, qty: qty});
			var trade_context = $author$project$ItemShop$getTradeContext(trade_record);
			var total_cost = A3($author$project$ItemShop$get_adjusted_item_cost, shop_trends, item, qty);
			var transaction_fee = $author$project$ItemShop$calc_transaction_fee(total_cost);
			var new_to_party_ = trade_context.to_party;
			var new_to_party = A2(
				$author$project$ItemShop$subGold,
				new_to_party_,
				$author$project$ItemShop$setPrice(total_cost));
			var new_from_party_ = trade_context.from_party;
			var new_from_party = A2(
				$author$project$ItemShop$addGold,
				new_from_party_,
				$author$project$ItemShop$setPrice(total_cost - transaction_fee));
			var new_trade_context = _Utils_update(
				trade_context,
				{from_party: new_from_party, to_party: new_to_party});
			if (trade_record.$ === 'CompletedTradeRecord') {
				var tc = trade_record.a;
				var tl = trade_record.b;
				return A2($author$project$ItemShop$CompletedTradeRecord, new_trade_context, tl);
			} else {
				var tc = trade_record.a;
				return $author$project$ItemShop$IncompleteTradeRecord(tc);
			}
		} else {
			return $author$project$ItemShop$IncompleteTradeRecord(orig_trade_context);
		}
	});
var $author$project$ItemShop$tabTypeToString = function (tabType) {
	switch (tabType.$) {
		case 'ShopTabType':
			return 'shop';
		case 'ItemsUnlockedTabType':
			return 'items';
		default:
			return 'battle';
	}
};
var $author$project$ItemShop$transferFromBattleModel = F2(
	function (model, newBattleModel) {
		return A2(
			$author$project$ItemShop$mapPlayer,
			function (player) {
				return _Utils_update(
					player,
					{held_blood: newBattleModel.player.held_blood, held_gold: newBattleModel.player.held_gold});
			},
			_Utils_update(
				model,
				{battleModel: newBattleModel}));
	});
var $author$project$ItemShop$transferToBattleModel = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		model.battleModel,
		A2(
			$elm$core$Maybe$map,
			function (p) {
				var _v0 = model;
				var battleModel = _v0.battleModel;
				var battlePlayer = battleModel.player;
				var newPlayer = _Utils_update(
					battlePlayer,
					{held_blood: p.held_blood, held_gold: p.held_gold});
				return _Utils_update(
					battleModel,
					{player: newPlayer});
			},
			$author$project$ItemShop$getPlayer(model)));
};
var $author$project$Battle$FoundNewMonster = function (a) {
	return {$: 'FoundNewMonster', a: a};
};
var $author$project$Battle$NoOutMsg = {$: 'NoOutMsg'};
var $author$project$Battle$PlayerHealedGolem = function (a) {
	return {$: 'PlayerHealedGolem', a: a};
};
var $author$project$Battle$PlayerRevivedGolem = {$: 'PlayerRevivedGolem'};
var $author$project$Battle$addMonsterXp = F2(
	function (toAdd, monster) {
		return _Utils_update(
			monster,
			{xp: monster.xp + toAdd});
	});
var $author$project$Battle$levelUpXpCost = 100;
var $author$project$Battle$addMonsterLevel = F2(
	function (toAdd, monster) {
		var xp = monster.xp;
		var level = monster.level;
		return A2(
			$author$project$Battle$addMonsterXp,
			-($author$project$Battle$levelUpXpCost * toAdd),
			_Utils_update(
				monster,
				{level: level + toAdd}));
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Battle$addToStatCurVal = F2(
	function (addedCurVal, stat) {
		return _Utils_update(
			stat,
			{
				curVal: A2($elm$core$Basics$min, stat.maxVal, stat.curVal + addedCurVal)
			});
	});
var $author$project$Battle$addToStatMaxVal = F2(
	function (addedMaxVal, stat) {
		return _Utils_update(
			stat,
			{maxVal: stat.maxVal + addedMaxVal});
	});
var $author$project$Battle$getLocationsList = function (locations) {
	return _List_fromArray(
		[locations.forest, locations.mountains, locations.plains]);
};
var $author$project$Battle$getCurrentLocation = function (_v0) {
	var currentLocationId = _v0.currentLocationId;
	var locations = _v0.locations;
	var potentialLocations = $author$project$Battle$getLocationsList(locations);
	return A2(
		$elm$core$Maybe$withDefault,
		locations.forest,
		A3(
			$elm$core$List$foldl,
			F2(
				function (pl, acc) {
					return _Utils_eq(pl.locationId, currentLocationId) ? $elm$core$Maybe$Just(pl) : acc;
				}),
			$elm$core$Maybe$Nothing,
			potentialLocations));
};
var $author$project$Battle$healGolemBloodCost = 5;
var $author$project$Battle$DeadMonster = function (a) {
	return {$: 'DeadMonster', a: a};
};
var $author$project$Battle$monsterIdentityMap = F2(
	function (callback, damagedMonster) {
		if (damagedMonster.$ === 'LivingMonster') {
			var monster = damagedMonster.a;
			return $author$project$Battle$LivingMonster(
				callback(monster));
		} else {
			var monster = damagedMonster.a;
			return $author$project$Battle$DeadMonster(
				callback(monster));
		}
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$constant = function (value) {
	return $elm$random$Random$Generator(
		function (seed) {
			return _Utils_Tuple2(value, seed);
		});
};
var $elm_community$random_extra$Random$List$get = F2(
	function (index, list) {
		return $elm$core$List$head(
			A2($elm$core$List$drop, index, list));
	});
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm_community$random_extra$Random$List$choose = function (list) {
	if ($elm$core$List$isEmpty(list)) {
		return $elm$random$Random$constant(
			_Utils_Tuple2($elm$core$Maybe$Nothing, list));
	} else {
		var lastIndex = $elm$core$List$length(list) - 1;
		var gen = A2($elm$random$Random$int, 0, lastIndex);
		var front = function (i) {
			return A2($elm$core$List$take, i, list);
		};
		var back = function (i) {
			return A2($elm$core$List$drop, i + 1, list);
		};
		return A2(
			$elm$random$Random$map,
			function (index) {
				return _Utils_Tuple2(
					A2($elm_community$random_extra$Random$List$get, index, list),
					A2(
						$elm$core$List$append,
						front(index),
						back(index)));
			},
			gen);
	}
};
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $author$project$Battle$pickMonsterToSpawn = F2(
	function (seed, _v0) {
		var locationType = _v0.locationType;
		var skeleton = A4($author$project$Battle$createMonster, 'Skeleton', 15, 5, 5);
		var monsters = _Utils_ap(
			_List_fromArray(
				[
					skeleton,
					A4($author$project$Battle$createMonster, 'Ogre', 15, 8, 2),
					A4($author$project$Battle$createMonster, 'Goblin', 10, 2, 0),
					A4($author$project$Battle$createMonster, 'Mimic', 20, 3, 0),
					A4($author$project$Battle$createMonster, 'Titan', 50, 5, 3),
					A4($author$project$Battle$createMonster, 'Fae', 10, 2, 0),
					A4($author$project$Battle$createMonster, 'Rat', 12, 3, 0),
					A4($author$project$Battle$createMonster, 'Water Elemental', 12, 0, 2),
					A4($author$project$Battle$createMonster, 'Fire Elemental', 11, 4, 2),
					A4($author$project$Battle$createMonster, 'Earth Elemental', 9, 6, 2)
				]),
			function () {
				switch (locationType.$) {
					case 'Forest':
						return _List_fromArray(
							[
								A4($author$project$Battle$createMonster, 'Forest Elf', 10, 3, 1),
								A4($author$project$Battle$createMonster, 'Dire Wolf', 15, 5, 0),
								A4($author$project$Battle$createMonster, 'Ursa', 20, 4, 3)
							]);
					case 'Mountains':
						return _List_fromArray(
							[
								A4($author$project$Battle$createMonster, 'Hillock', 30, 1, 3),
								A4($author$project$Battle$createMonster, 'Valley Goat', 15, 2, 0),
								A4($author$project$Battle$createMonster, 'Elephant', 40, 4, 4)
							]);
					default:
						return _List_fromArray(
							[
								A4($author$project$Battle$createMonster, 'Mole', 10, 2, 1),
								A4($author$project$Battle$createMonster, 'Ferret', 20, 3, 1),
								A4($author$project$Battle$createMonster, 'Plainshawk', 30, 2, 3)
							]);
				}
			}());
		var _v1 = A2(
			$elm$random$Random$step,
			$elm_community$random_extra$Random$List$choose(monsters),
			seed);
		var _v2 = _v1.a;
		var maybeChosen = _v2.a;
		var unChosen = _v2.b;
		var newSeed = _v1.b;
		return _Utils_Tuple2(
			A2($elm$core$Maybe$withDefault, skeleton, maybeChosen),
			newSeed);
	});
var $author$project$Battle$reviveGolemBloodCost = 25;
var $author$project$Battle$setStatToMax = function (intStat) {
	return _Utils_update(
		intStat,
		{curVal: intStat.maxVal});
};
var $author$project$Battle$MonsterKilledGolem = F2(
	function (a, b) {
		return {$: 'MonsterKilledGolem', a: a, b: b};
	});
var $author$project$Battle$enemyKillsGolem = F4(
	function (model, golem, enemy, existingFightLogs) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					enemyMonster: $elm$core$Maybe$Just(
						$author$project$Battle$LivingMonster(enemy)),
					fightLogs: _Utils_ap(
						model.fightLogs,
						_Utils_ap(
							existingFightLogs,
							_List_fromArray(
								[
									A2($author$project$Battle$MonsterKilledGolem, golem, enemy)
								]))),
					golem: $author$project$Battle$DeadMonster(golem)
				}),
			$author$project$Battle$NoOutMsg);
	});
var $author$project$Battle$GolemKilledMonster = F3(
	function (a, b, c) {
		return {$: 'GolemKilledMonster', a: a, b: b, c: c};
	});
var $author$project$Battle$OnMonsterDefeat = function (a) {
	return {$: 'OnMonsterDefeat', a: a};
};
var $author$project$Battle$calculateXpValue = function (monster) {
	return A2(
		$elm$core$Basics$max,
		1,
		$elm$core$Basics$round(
			function (val) {
				return val / 10;
			}(monster.statPower.maxVal * monster.statHP.maxVal)));
};
var $author$project$Battle$addMonsterXpByMonster = F2(
	function (monster, otherMonster) {
		var gainedXp = $author$project$Battle$calculateXpValue(otherMonster);
		return _Utils_Tuple2(
			A2($author$project$Battle$addMonsterXp, gainedXp, monster),
			gainedXp);
	});
var $author$project$Battle$mapCurrentLocation = F2(
	function (model, locationUpdater) {
		var currentLocation = $author$project$Battle$getCurrentLocation(model);
		var _v0 = model;
		var currentLocationId = _v0.currentLocationId;
		var locations = _v0.locations;
		return _Utils_eq(currentLocationId, locations.forest.locationId) ? _Utils_update(
			locations,
			{
				forest: locationUpdater(locations.forest)
			}) : (_Utils_eq(currentLocationId, locations.mountains.locationId) ? _Utils_update(
			locations,
			{
				mountains: locationUpdater(locations.mountains)
			}) : (_Utils_eq(currentLocationId, locations.plains.locationId) ? _Utils_update(
			locations,
			{
				plains: locationUpdater(locations.plains)
			}) : locations));
	});
var $author$project$Battle$golemKillsEnemy = F4(
	function (model, golem, deadEnemy, fightLogs) {
		var decrementMonstersLeft = function (curLocation) {
			return _Utils_update(
				curLocation,
				{monstersLeft: curLocation.monstersLeft - 1});
		};
		var _v0 = A2($author$project$Battle$addMonsterXpByMonster, golem, deadEnemy);
		var victorGolem = _v0.a;
		var gainedXp = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					enemyMonster: $elm$core$Maybe$Just(
						$author$project$Battle$DeadMonster(deadEnemy)),
					fightLogs: _Utils_ap(
						model.fightLogs,
						_Utils_ap(
							fightLogs,
							_List_fromArray(
								[
									A3($author$project$Battle$GolemKilledMonster, golem, deadEnemy, gainedXp)
								]))),
					golem: $author$project$Battle$LivingMonster(victorGolem),
					locations: A2($author$project$Battle$mapCurrentLocation, model, decrementMonstersLeft)
				}),
			$author$project$Battle$OnMonsterDefeat(deadEnemy.onDefeat));
	});
var $author$project$Battle$MonsterAttackedMonster = function (a) {
	return {$: 'MonsterAttackedMonster', a: a};
};
var $author$project$Battle$setStatStamina = F2(
	function (monster, newStatStamina) {
		return _Utils_update(
			monster,
			{statStamina: newStatStamina});
	});
var $author$project$Battle$monsterStatMapStamina = F2(
	function (statFunc, monster) {
		return A4(
			$author$project$Battle$monsterStatMap,
			function ($) {
				return $.statStamina;
			},
			$author$project$Battle$setStatStamina,
			statFunc,
			monster);
	});
var $author$project$Battle$monsterTakeDamage = F2(
	function (damageToTake, monster) {
		var newMonster = A2(
			$author$project$Battle$monsterStatMapHP,
			$author$project$Battle$addToStatCurVal(-damageToTake),
			monster);
		return (newMonster.statHP.curVal > 0) ? $author$project$Battle$LivingMonster(newMonster) : $author$project$Battle$DeadMonster(newMonster);
	});
var $author$project$Battle$monsterFightsMonster = F2(
	function (attacker, defender) {
		var staminaCostToAttack = -1;
		var newAttacker = $author$project$Battle$LivingMonster(
			A2(
				$author$project$Battle$monsterStatMapStamina,
				$author$project$Battle$addToStatCurVal(staminaCostToAttack),
				attacker));
		var defenderProtection = defender.statProtection.curVal;
		var attackerPower = attacker.statPower.curVal;
		var damageToTake = A2($elm$core$Basics$max, 1, attackerPower - defenderProtection);
		var newDefender = A2($author$project$Battle$monsterTakeDamage, damageToTake, defender);
		var fightLog = $author$project$Battle$MonsterAttackedMonster(
			{attacker: attacker, attackerPower: attackerPower, damageTaken: damageToTake, defender: defender, defenderProtection: defenderProtection});
		return _Utils_Tuple3(
			newAttacker,
			newDefender,
			_List_fromArray(
				[fightLog]));
	});
var $author$project$Battle$monsterCounterAttacks = F4(
	function (model, golem, enemy, existingFightLogs) {
		var _v0 = A2($author$project$Battle$monsterFightsMonster, enemy, golem);
		if ((_v0.a.$ === 'LivingMonster') && (_v0.b.$ === 'DeadMonster')) {
			var killingEnemy = _v0.a.a;
			var deadGolem = _v0.b.a;
			var secondFightLogs_ = _v0.c;
			return A4(
				$author$project$Battle$enemyKillsGolem,
				model,
				deadGolem,
				killingEnemy,
				_Utils_ap(existingFightLogs, secondFightLogs_));
		} else {
			var e = _v0.a;
			var g = _v0.b;
			var secondFightLogs_ = _v0.c;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						enemyMonster: $elm$core$Maybe$Just(e),
						fightLogs: _Utils_ap(
							model.fightLogs,
							_Utils_ap(existingFightLogs, secondFightLogs_)),
						golem: g
					}),
				$author$project$Battle$NoOutMsg);
		}
	});
var $author$project$Battle$updateFightWithLivingGolemAndEnemy = F2(
	function (model, _v0) {
		var golem = _v0.a;
		var livingMonster = _v0.b;
		if (golem.statStamina.curVal > 0) {
			var currentLocation = $author$project$Battle$getCurrentLocation(model);
			var _v1 = function () {
				var _v2 = A2($author$project$Battle$monsterFightsMonster, golem, livingMonster);
				if (_v2.a.$ === 'LivingMonster') {
					if (_v2.b.$ === 'DeadMonster') {
						var newGolem_ = _v2.a.a;
						var deadEnemy = _v2.b.a;
						var firstFightLogs_ = _v2.c;
						return A4($author$project$Battle$golemKillsEnemy, model, newGolem_, deadEnemy, firstFightLogs_);
					} else {
						var newGolem_ = _v2.a.a;
						var survivingEnemy = _v2.b.a;
						var firstFightLogs_ = _v2.c;
						return A4($author$project$Battle$monsterCounterAttacks, model, newGolem_, survivingEnemy, firstFightLogs_);
					}
				} else {
					if (_v2.b.$ === 'LivingMonster') {
						var newGolem_ = _v2.a.a;
						var killingEnemy = _v2.b.a;
						var firstFightLogs_ = _v2.c;
						return A4($author$project$Battle$enemyKillsGolem, model, newGolem_, killingEnemy, firstFightLogs_);
					} else {
						var g = _v2.a;
						var e = _v2.b;
						var firstFightLogs_ = _v2.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									enemyMonster: $elm$core$Maybe$Just(e),
									fightLogs: _Utils_ap(model.fightLogs, firstFightLogs_),
									golem: g
								}),
							$author$project$Battle$NoOutMsg);
					}
				}
			}();
			var newModel = _v1.a;
			var newOutMsg = _v1.b;
			return _Utils_Tuple3(newModel, $elm$core$Platform$Cmd$none, newOutMsg);
		} else {
			return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
		}
	});
var $author$project$Battle$updateFight = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg),
		A2(
			$elm$core$Maybe$map,
			function (enemyMonster) {
				var _v0 = _Utils_Tuple2(model.golem, enemyMonster);
				if ((_v0.a.$ === 'LivingMonster') && (_v0.b.$ === 'LivingMonster')) {
					var golem = _v0.a.a;
					var livingMonster = _v0.b.a;
					return A2(
						$author$project$Battle$updateFightWithLivingGolemAndEnemy,
						model,
						_Utils_Tuple2(golem, livingMonster));
				} else {
					return A2(
						$elm$core$Debug$log,
						'dead something',
						_Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg));
				}
			},
			model.enemyMonster));
};
var $author$project$Battle$monsterLivingMap = F2(
	function (callback, damagedMonster) {
		if (damagedMonster.$ === 'LivingMonster') {
			var monster = damagedMonster.a;
			return $author$project$Battle$LivingMonster(
				callback(monster));
		} else {
			var monster = damagedMonster.a;
			return damagedMonster;
		}
	});
var $author$project$Battle$secondsRequiredForLocationMonsterRefill = 60;
var $author$project$Battle$secondsRequiredForSpRefill = 5;
var $author$project$Battle$updateTick = F2(
	function (model, time) {
		var origSecondsWaitedSince = model.secondsWaitedSince;
		var incrSecondsWaitedSince = _Utils_update(
			origSecondsWaitedSince,
			{lastLocationMonsterRefill: origSecondsWaitedSince.lastLocationMonsterRefill + 1, lastSpRefill: origSecondsWaitedSince.lastSpRefill + 1});
		var newModel = function (m) {
			var secondsWaitedSince = m.secondsWaitedSince;
			var locations = m.locations;
			if (_Utils_cmp(m.secondsWaitedSince.lastLocationMonsterRefill, $author$project$Battle$secondsRequiredForLocationMonsterRefill) > -1) {
				var newSecondsWaitedSince = _Utils_update(
					secondsWaitedSince,
					{lastLocationMonsterRefill: 0});
				var locationsList = $author$project$Battle$getLocationsList(m.locations);
				var locationRefiller = function (location) {
					return (_Utils_cmp(location.monstersLeft, $author$project$Battle$maxMonstersPerLocation) < 0) ? _Utils_update(
						location,
						{monstersLeft: location.monstersLeft + 1}) : location;
				};
				var newLocations = _Utils_update(
					locations,
					{
						forest: locationRefiller(locations.forest),
						mountains: locationRefiller(locations.mountains),
						plains: locationRefiller(locations.plains)
					});
				return _Utils_update(
					m,
					{locations: newLocations, secondsWaitedSince: newSecondsWaitedSince});
			} else {
				return m;
			}
		}(
			function (m) {
				var secondsWaitedSince = m.secondsWaitedSince;
				if (_Utils_cmp(secondsWaitedSince.lastSpRefill, $author$project$Battle$secondsRequiredForSpRefill) > -1) {
					var newSecondsWaitedSince = _Utils_update(
						secondsWaitedSince,
						{lastSpRefill: 0});
					var newGolem = A2(
						$author$project$Battle$monsterLivingMap,
						$author$project$Battle$monsterStatMapStamina(
							$author$project$Battle$addToStatCurVal(1)),
						m.golem);
					return _Utils_update(
						m,
						{golem: newGolem, secondsWaitedSince: newSecondsWaitedSince});
				} else {
					return m;
				}
			}(
				function (m) {
					var secondsWaitedSince = m.secondsWaitedSince;
					return _Utils_update(
						m,
						{secondsWaitedSince: incrSecondsWaitedSince});
				}(model)));
		return _Utils_Tuple3(newModel, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
	});
var $author$project$Battle$update = F2(
	function (model, battleMsg) {
		switch (battleMsg.$) {
			case 'Noop':
				return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
			case 'Fight':
				return $author$project$Battle$updateFight(model);
			case 'FindNewEnemy':
				var _v1 = A2(
					$author$project$Battle$pickMonsterToSpawn,
					model.battleSeed,
					$author$project$Battle$getCurrentLocation(model));
				var newMonster = _v1.a;
				var newSeed = _v1.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{
							battleSeed: newSeed,
							enemyMonster: $elm$core$Maybe$Just(
								$author$project$Battle$LivingMonster(newMonster)),
							fightLogs: _Utils_ap(
								model.fightLogs,
								_List_fromArray(
									[
										$author$project$Battle$FoundNewMonster(newMonster)
									]))
						}),
					$elm$core$Platform$Cmd$none,
					$author$project$Battle$NoOutMsg);
			case 'ToggleShowExpandedLogs':
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{showExpandedLogs: !model.showExpandedLogs}),
					$elm$core$Platform$Cmd$none,
					$author$project$Battle$NoOutMsg);
			case 'HealGolem':
				if (_Utils_cmp(model.player.held_blood, $author$project$Battle$healGolemBloodCost) > -1) {
					var _v2 = model.golem;
					if (_v2.$ === 'LivingMonster') {
						var golem = _v2.a;
						if (!_Utils_eq(golem.statHP.curVal, golem.statHP.maxVal)) {
							var maxHP = golem.statHP.maxVal;
							var currentHP = golem.statHP.curVal;
							return _Utils_Tuple3(
								_Utils_update(
									model,
									{
										fightLogs: _Utils_ap(
											model.fightLogs,
											_List_fromArray(
												[
													$author$project$Battle$PlayerHealedGolem(maxHP - currentHP)
												])),
										golem: $author$project$Battle$LivingMonster(
											A2($author$project$Battle$monsterStatMapHP, $author$project$Battle$setStatToMax, golem)),
										player: function (p) {
											return _Utils_update(
												p,
												{held_blood: p.held_blood - $author$project$Battle$healGolemBloodCost});
										}(model.player)
									}),
								$elm$core$Platform$Cmd$none,
								$author$project$Battle$NoOutMsg);
						} else {
							return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
						}
					} else {
						var golem = _v2.a;
						return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
				}
			case 'ReviveGolem':
				if (_Utils_cmp(model.player.held_blood, $author$project$Battle$reviveGolemBloodCost) > -1) {
					var _v3 = model.golem;
					if (_v3.$ === 'DeadMonster') {
						var golem = _v3.a;
						var newPlayer = function (p) {
							return _Utils_update(
								p,
								{held_blood: p.held_blood - $author$project$Battle$reviveGolemBloodCost});
						}(model.player);
						var newGolem = $author$project$Battle$LivingMonster(
							A2(
								$author$project$Battle$monsterStatMapHP,
								$author$project$Battle$setStatCurVal(1),
								golem));
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{
									fightLogs: _Utils_ap(
										model.fightLogs,
										_List_fromArray(
											[$author$project$Battle$PlayerRevivedGolem])),
									golem: newGolem,
									player: newPlayer
								}),
							$elm$core$Platform$Cmd$none,
							$author$project$Battle$NoOutMsg);
					} else {
						return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $author$project$Battle$NoOutMsg);
				}
			case 'SendOutMsg':
				var out_msg = battleMsg.a;
				return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, out_msg);
			case 'TickSecond':
				var time = battleMsg.a;
				return A2($author$project$Battle$updateTick, model, time);
			case 'ToggleShowLocationTypeMenu':
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{shouldShowLocationTypeMenu: !model.shouldShowLocationTypeMenu}),
					$elm$core$Platform$Cmd$none,
					$author$project$Battle$NoOutMsg);
			case 'ChangeLocation':
				var newLocationId = battleMsg.a;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{currentLocationId: newLocationId, enemyMonster: $elm$core$Maybe$Nothing, shouldShowLocationTypeMenu: false}),
					$elm$core$Platform$Cmd$none,
					$author$project$Battle$NoOutMsg);
			default:
				var newGolem = A2(
					$author$project$Battle$monsterIdentityMap,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Battle$addMonsterLevel(1),
						A2(
							$elm$core$Basics$composeR,
							$author$project$Battle$monsterStatMapHP(
								$author$project$Battle$addToStatMaxVal(3)),
							$author$project$Battle$monsterStatMapHP(
								$author$project$Battle$addToStatCurVal(3)))),
					model.golem);
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{golem: newGolem}),
					$elm$core$Platform$Cmd$none,
					$author$project$Battle$NoOutMsg);
		}
	});
var $author$project$ItemShop$MonsterDeliveredItemToShop = function (a) {
	return {$: 'MonsterDeliveredItemToShop', a: a};
};
var $author$project$ItemShop$add_inventory_record_to_character = F2(
	function (_v0, character) {
		var item = _v0.item;
		var quantity = _v0.quantity;
		var avg_price = _v0.avg_price;
		return _Utils_update(
			character,
			{
				held_items: A4($author$project$ItemShop$add_item_to_inventory_records, character.held_items, item, quantity, item.raw_gold_cost)
			});
	});
var $author$project$ItemShop$append_player_action_log = F2(
	function (new_player_action_log, model) {
		return _Utils_update(
			model,
			{
				historical_player_actions: A2(
					$elm$core$List$append,
					model.historical_player_actions,
					_List_fromArray(
						[new_player_action_log]))
			});
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$ItemShop$pick_random_unlocked_item_from_db = F2(
	function (item_db, seed) {
		var _v0 = function (gen) {
			return A2($elm$random$Random$step, gen, seed);
		}(
			$elm_community$random_extra$Random$List$choose(
				A2(
					$elm$core$List$filter,
					function ($) {
						return $.is_unlocked;
					},
					$elm$core$Dict$values(item_db))));
		var _v1 = _v0.a;
		var maybe_item = _v1.a;
		var new_seed = _v0.b;
		return _Utils_Tuple2(
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.item;
				},
				maybe_item),
			new_seed);
	});
var $author$project$ItemShop$updateBattleOutMsg = F2(
	function (battleOutMsg, model) {
		switch (battleOutMsg.$) {
			case 'OnMonsterDefeat':
				var defeatAction = battleOutMsg.a;
				if (defeatAction.$ === 'NoDefeatAction') {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var _v2 = A2($author$project$ItemShop$pick_random_unlocked_item_from_db, model.item_db, model.global_seed);
					var mbNewItem = _v2.a;
					var newSeed = _v2.b;
					return function (m) {
						return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
					}(
						A2(
							$elm$core$Maybe$withDefault,
							model,
							A3(
								$elm$core$Maybe$map2,
								F2(
									function (shop, newItem) {
										return A2(
											$author$project$ItemShop$append_player_action_log,
											$author$project$ItemShop$MonsterDeliveredItemToShop(newItem.id),
											A2(
												$author$project$ItemShop$withCharacter,
												A2(
													$author$project$ItemShop$add_inventory_record_to_character,
													{
														avg_price: $author$project$ItemShop$setPrice(newItem.raw_gold_cost),
														item: newItem,
														quantity: $author$project$ItemShop$setQuantity(1)
													},
													shop),
												_Utils_update(
													model,
													{global_seed: newSeed})));
									}),
								$author$project$ItemShop$getShop(model),
								mbNewItem)));
				}
			case 'ReturnToShop':
				var _v3 = model.browserNavKey;
				if (_v3.$ === 'Just') {
					var key = _v3.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{tab_type: $author$project$ItemShop$ShopTabType}),
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							key,
							'#' + $author$project$ItemShop$tabTypeToString($author$project$ItemShop$ShopTabType)));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$ItemShop$updateTradeStats = F2(
	function (item_db_record, new_trade_stats) {
		return _Utils_update(
			item_db_record,
			{trade_stats: new_trade_stats});
	});
var $author$project$ItemShop$update_item_db = F3(
	function (item_db, item_id, updater) {
		return A3(
			$elm$core$Dict$update,
			$TSFoster$elm_uuid$UUID$toString(item_id),
			updater,
			item_db);
	});
var $author$project$ItemShop$increment_item_trade_count = F3(
	function (record_updater, inventory_record, item_db) {
		var item = inventory_record.item;
		var added_qty = $author$project$ItemShop$getQuantity(inventory_record.quantity);
		return A3(
			$author$project$ItemShop$update_item_db,
			item_db,
			item.id,
			function (mb_item_db_record) {
				if (mb_item_db_record.$ === 'Just') {
					var item_db_record = mb_item_db_record.a;
					var trade_stats = item_db_record.trade_stats;
					return $elm$core$Maybe$Just(
						A2(
							$author$project$ItemShop$updateTradeStats,
							item_db_record,
							A2(record_updater, trade_stats, added_qty)));
				} else {
					return $elm$core$Maybe$Just(
						{
							is_unlocked: false,
							item: item,
							trade_stats: _Utils_update(
								$author$project$ItemShop$createItemDbTradeStats,
								{times_others_traded: added_qty})
						});
				}
			});
	});
var $author$project$ItemShop$lookup_item_id_default = F2(
	function (item_db, item_id) {
		return A2(
			$author$project$ItemShop$lookup_item_id_str_default,
			item_db,
			$TSFoster$elm_uuid$UUID$toString(item_id));
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$ItemShop$updateItemDbFromTradeRecord = F3(
	function (item_db, record_updater, trade_record) {
		if (trade_record.$ === 'IncompleteTradeRecord') {
			return item_db;
		} else {
			var trade_context = trade_record.a;
			var item_trade_log = trade_record.b;
			return A3(
				$elm$core$List$foldl,
				$author$project$ItemShop$increment_item_trade_count(record_updater),
				item_db,
				$elm$core$List$singleton(
					function (itr) {
						return {
							avg_price: $author$project$ItemShop$setPrice(itr.gold_cost),
							item: A2($author$project$ItemShop$lookup_item_id_default, item_db, itr.item_id),
							quantity: itr.quantity
						};
					}(item_trade_log)));
		}
	});
var $author$project$ItemShop$updateTimesYouBought = F2(
	function (item_db_record_trades, new_times_you_bought) {
		var old_times_you_bought = item_db_record_trades.times_you_bought;
		return _Utils_update(
			item_db_record_trades,
			{times_you_bought: old_times_you_bought + new_times_you_bought});
	});
var $author$project$ItemShop$updateTimesYouSold = F2(
	function (item_db_record_trades, new_times_you_sold) {
		var old_times_you_sold = item_db_record_trades.times_you_sold;
		return _Utils_update(
			item_db_record_trades,
			{times_you_sold: old_times_you_sold + new_times_you_sold});
	});
var $author$project$ItemShop$exclude_player_and_shop = F2(
	function (_v0, characters) {
		var player_id = _v0.player_id;
		var shop_id = _v0.shop_id;
		return A2(
			$elm$core$List$filter,
			function (c) {
				return (!_Utils_eq(c.char_id, player_id)) && (!_Utils_eq(c.char_id, shop_id));
			},
			characters);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $author$project$ItemShop$DidNothing = {$: 'DidNothing'};
var $author$project$ItemShop$Traded = function (a) {
	return {$: 'Traded', a: a};
};
var $author$project$ItemShop$WantedButCouldntTrade = function (a) {
	return {$: 'WantedButCouldntTrade', a: a};
};
var $author$project$ItemShop$WantedToBuy = {$: 'WantedToBuy'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$ItemShop$append_to_character_action_log = F2(
	function (character, new_log) {
		var new_action_log = $elm$core$List$reverse(
			A2(
				$elm$core$List$take,
				100,
				$elm$core$List$reverse(
					_Utils_ap(
						character.action_log,
						_List_fromArray(
							[new_log])))));
		return _Utils_update(
			character,
			{action_log: new_action_log});
	});
var $author$project$ItemShop$get_sentiment_for_item_type = F2(
	function (item_type_sentiment, item_type) {
		return A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2(
				$elm$core$Dict$get,
				$author$project$ItemShop$item_type_to_id(item_type),
				item_type_sentiment));
	});
var $author$project$ItemShop$check_can_afford_one = F3(
	function (character, shop_trends, item) {
		return A3(
			$author$project$ItemShop$can_afford_item,
			shop_trends,
			character.held_gold,
			{
				item: item,
				qty: $author$project$ItemShop$Quantity(1)
			});
	});
var $author$project$ItemShop$get_sentiment_for_item = F2(
	function (item_type_sentiment, item) {
		return A2($author$project$ItemShop$get_sentiment_for_item_type, item_type_sentiment, item.item_type);
	});
var $author$project$ItemShop$check_nonzero_desire = F2(
	function (character, item) {
		var desire = A2($author$project$ItemShop$get_sentiment_for_item, character.item_types_desired, item);
		return desire > 0.0;
	});
var $author$project$ItemShop$nonzero_qty = function (inventory_record) {
	return $author$project$ItemShop$getQuantity(inventory_record.quantity) > 0;
};
var $author$project$ItemShop$get_wanted_items = F3(
	function (character, shop, shop_trends) {
		return A2(
			$elm$core$List$filter,
			function (inventory_record) {
				return $author$project$ItemShop$nonzero_qty(inventory_record) && (A3($author$project$ItemShop$check_can_afford_one, character, shop_trends, inventory_record.item) && A2($author$project$ItemShop$check_nonzero_desire, character, inventory_record.item));
			},
			shop.held_items);
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2($elm$core$List$drop, step, xs);
		var okayXs = $elm$core$List$length(xs) > 0;
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayXs) ? A2(
			$elm$core$List$cons,
			A2($elm$core$List$take, size, xs),
			A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $elm_community$random_extra$Random$List$anyInt = A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt);
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $elm$random$Random$independentSeed = $elm$random$Random$Generator(
	function (seed0) {
		var makeIndependentSeed = F3(
			function (state, b, c) {
				return $elm$random$Random$next(
					A2($elm$random$Random$Seed, state, (1 | (b ^ c)) >>> 0));
			});
		var gen = A2($elm$random$Random$int, 0, 4294967295);
		return A2(
			$elm$random$Random$step,
			A4($elm$random$Random$map3, makeIndependentSeed, gen, gen, gen),
			seed0);
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm_community$random_extra$Random$List$shuffle = function (list) {
	return A2(
		$elm$random$Random$map,
		function (independentSeed) {
			return A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$sortBy,
					$elm$core$Tuple$second,
					A3(
						$elm$core$List$foldl,
						F2(
							function (item, _v0) {
								var acc = _v0.a;
								var seed = _v0.b;
								var _v1 = A2($elm$random$Random$step, $elm_community$random_extra$Random$List$anyInt, seed);
								var tag = _v1.a;
								var nextSeed = _v1.b;
								return _Utils_Tuple2(
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(item, tag),
										acc),
									nextSeed);
							}),
						_Utils_Tuple2(_List_Nil, independentSeed),
						list).a));
		},
		$elm$random$Random$independentSeed);
};
var $author$project$ItemShop$group_shuffle_items = F2(
	function (seed, items) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (grp, _v0) {
					var old_seed = _v0.a;
					var acc = _v0.b;
					var _v1 = A2(
						$elm$random$Random$step,
						$elm_community$random_extra$Random$List$shuffle(grp),
						old_seed);
					var shuffled = _v1.a;
					var new_seed = _v1.b;
					return _Utils_Tuple2(
						new_seed,
						_Utils_ap(acc, shuffled));
				}),
			_Utils_Tuple2(seed, _List_Nil),
			A2($elm_community$list_extra$List$Extra$greedyGroupsOf, 6, items)).b;
	});
var $author$project$ItemShop$id_to_item_type = function (type_id) {
	switch (type_id) {
		case 1:
			return $elm$core$Maybe$Just($author$project$ItemShop$Weapon);
		case 2:
			return $elm$core$Maybe$Just($author$project$ItemShop$Armor);
		case 3:
			return $elm$core$Maybe$Just($author$project$ItemShop$Spellbook);
		case 4:
			return $elm$core$Maybe$Just($author$project$ItemShop$Furniture);
		case 5:
			return $elm$core$Maybe$Just($author$project$ItemShop$Food);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$ItemShop$lookup_item_id = F2(
	function (item_db, item_id) {
		return A2(
			$author$project$ItemShop$lookup_item_id_str,
			item_db,
			$TSFoster$elm_uuid$UUID$toString(item_id));
	});
var $author$project$ItemShop$seed_from_time = function (time) {
	return $elm$random$Random$initialSeed(
		$elm$time$Time$posixToMillis(time));
};
var $author$project$ItemShop$ai_buy_item_from_shop = F5(
	function (ai_tick_time, item_db, shop_trends, character, shop) {
		var wanted_items = A3($author$project$ItemShop$get_wanted_items, character, shop, shop_trends);
		var sentiment_above_zero = function (item_type_id) {
			var maybe_item_type = $author$project$ItemShop$id_to_item_type(item_type_id);
			var desire = function () {
				if (maybe_item_type.$ === 'Just') {
					var item_type = maybe_item_type.a;
					return A2($author$project$ItemShop$get_sentiment_for_item_type, character.item_types_desired, item_type);
				} else {
					return 1.0;
				}
			}();
			return desire > 0;
		};
		var qty_to_buy = $author$project$ItemShop$Quantity(1);
		var max_trend = 1.4;
		var is_item_wanted = F2(
			function (_v6, buyable_item) {
				var item_type = _v6.a;
				var trend = _v6.b;
				if (buyable_item.$ === 'Just') {
					var buyable = buyable_item.a;
					return $elm$core$Maybe$Just(buyable);
				} else {
					var _v5 = A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.item;
							},
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.item_type;
								},
								$elm$core$Basics$eq(item_type))),
						wanted_items);
					if (!_v5.b) {
						return $elm$core$Maybe$Nothing;
					} else {
						var item = _v5.a.item;
						var rest_sentiments = _v5.b;
						return $elm$core$Maybe$Just(item);
					}
				}
			});
		var is_item_trendy_enough = function (_v3) {
			var it_id = _v3.a;
			var trd = _v3.b;
			return A2(
				$elm$core$Maybe$andThen,
				(_Utils_cmp(trd, max_trend) < 0) ? function (item_type) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(item_type, trd));
				} : $elm$core$Basics$always($elm$core$Maybe$Nothing),
				$author$project$ItemShop$id_to_item_type(it_id));
		};
		var least_trendy_items = A2(
			$elm$core$List$filterMap,
			is_item_trendy_enough,
			A2(
				$elm$core$List$sortBy,
				$elm$core$Tuple$second,
				A2(
					$elm$core$List$filter,
					A2($elm$core$Basics$composeR, $elm$core$Tuple$first, sentiment_above_zero),
					$elm$core$Dict$toList(shop_trends.item_type_sentiment))));
		var maybe_item_to_buy = A3(
			$elm$core$List$foldl,
			is_item_wanted,
			$elm$core$Maybe$Nothing,
			A2(
				$author$project$ItemShop$group_shuffle_items,
				$author$project$ItemShop$seed_from_time(ai_tick_time),
				least_trendy_items));
		var trade_record = function () {
			if (maybe_item_to_buy.$ === 'Nothing') {
				return $author$project$ItemShop$IncompleteTradeRecord(
					{
						from_party: shop,
						shop_trends: shop_trends,
						to_party: A2(
							$author$project$ItemShop$append_to_character_action_log,
							character,
							{
								log_type: $author$project$ItemShop$WantedButCouldntTrade($author$project$ItemShop$WantedToBuy),
								time: ai_tick_time
							})
					});
			} else {
				var item = maybe_item_to_buy.a;
				return A2(
					$author$project$ItemShop$sell_items_from_party_to_other,
					{from_party: shop, shop_trends: shop_trends, to_party: character},
					{item: item, qty: qty_to_buy});
			}
		}();
		if (trade_record.$ === 'IncompleteTradeRecord') {
			var trade_context_ = trade_record.a;
			return {character: trade_context_.to_party, shop: trade_context_.from_party, shop_trends: trade_context_.shop_trends, traded_items: _List_Nil};
		} else {
			var trade_context_ = trade_record.a;
			var log = trade_record.b;
			return {
				character: A2(
					$author$project$ItemShop$append_to_character_action_log,
					trade_context_.to_party,
					{
						log_type: $author$project$ItemShop$Traded(log),
						time: ai_tick_time
					}),
				shop: trade_context_.from_party,
				shop_trends: trade_context_.shop_trends,
				traded_items: function () {
					var _v1 = A2($author$project$ItemShop$lookup_item_id, item_db, log.item_id);
					if (_v1.$ === 'Just') {
						var item_trade_log = _v1.a;
						return _List_fromArray(
							[
								{
								avg_price: $author$project$ItemShop$Price(log.gold_cost),
								item: item_trade_log.item,
								quantity: log.quantity
							}
							]);
					} else {
						return _Debug_todo(
							'ItemShop',
							{
								start: {line: 2689, column: 25},
								end: {line: 2689, column: 35}
							})('');
					}
				}()
			};
		}
	});
var $author$project$ItemShop$FetchedItem = function (a) {
	return {$: 'FetchedItem', a: a};
};
var $author$project$ItemShop$ai_fetch_item = F5(
	function (ai_tick_time, item_db, shop_trends, character, shop) {
		var held_items = character.held_items;
		var _v0 = A2(
			$author$project$ItemShop$pick_random_unlocked_item_from_db,
			item_db,
			$author$project$ItemShop$seed_from_time(ai_tick_time));
		var mbNewItem = _v0.a;
		var newSeed = _v0.b;
		return {
			character: function () {
				if (mbNewItem.$ === 'Just') {
					var newItem = mbNewItem.a;
					return function (c) {
						return A2(
							$author$project$ItemShop$append_to_character_action_log,
							c,
							{
								log_type: $author$project$ItemShop$FetchedItem(newItem.id),
								time: ai_tick_time
							});
					}(
						function (c) {
							return _Utils_update(
								c,
								{
									held_items: A4(
										$author$project$ItemShop$add_item_to_inventory_records,
										held_items,
										newItem,
										$author$project$ItemShop$setQuantity(1),
										newItem.raw_gold_cost)
								});
						}(character));
				} else {
					return character;
				}
			}(),
			shop: shop,
			shop_trends: shop_trends,
			traded_items: _List_Nil
		};
	});
var $author$project$ItemShop$WantedToSell = {$: 'WantedToSell'};
var $author$project$ItemShop$get_single_adjusted_item_cost = F2(
	function (shop_trends, item) {
		return A3(
			$author$project$ItemShop$get_adjusted_item_cost,
			shop_trends,
			item,
			$author$project$ItemShop$Quantity(1));
	});
var $author$project$ItemShop$get_trend_for_item = F2(
	function (shop_trends, item) {
		return A2($author$project$ItemShop$get_sentiment_for_item, shop_trends.item_type_sentiment, item);
	});
var $author$project$ItemShop$ai_sell_item_to_shop = F5(
	function (ai_tick_time, item_db, shop_trends, character, shop) {
		var wanted_to_sell_but_couldnt = {
			log_type: $author$project$ItemShop$WantedButCouldntTrade($author$project$ItemShop$WantedToSell),
			time: ai_tick_time
		};
		var sellable_trend = 0.8;
		var untrendy_enough = function (_v6) {
			var item = _v6.item;
			return _Utils_cmp(
				A2($author$project$ItemShop$get_trend_for_item, shop_trends, item),
				sellable_trend) > -1;
		};
		var sellable_items = A2(
			$elm$core$List$filter,
			function (_v5) {
				var quantity = _v5.quantity;
				return $author$project$ItemShop$getQuantity(quantity) > 0;
			},
			character.held_items);
		var untrendy_items = A2($elm$core$List$filter, untrendy_enough, sellable_items);
		var qty_to_sell = $author$project$ItemShop$Quantity(1);
		var profitable_enough = function (_v4) {
			var item = _v4.item;
			return A2($author$project$ItemShop$get_single_adjusted_item_cost, shop_trends, item) > 0;
		};
		var shuffled_items_to_sell = A2(
			$author$project$ItemShop$group_shuffle_items,
			$author$project$ItemShop$seed_from_time(ai_tick_time),
			function () {
				if (!untrendy_items.b) {
					return A2($elm$core$List$filter, profitable_enough, sellable_items);
				} else {
					return untrendy_items;
				}
			}());
		var trade_record = function () {
			var _v2 = $elm$core$List$head(shuffled_items_to_sell);
			if (_v2.$ === 'Nothing') {
				return $author$project$ItemShop$IncompleteTradeRecord(
					{
						from_party: A2($author$project$ItemShop$append_to_character_action_log, character, wanted_to_sell_but_couldnt),
						shop_trends: shop_trends,
						to_party: shop
					});
			} else {
				var item = _v2.a.item;
				return A2(
					$author$project$ItemShop$sell_items_from_party_to_other,
					{from_party: character, shop_trends: shop_trends, to_party: shop},
					{item: item, qty: qty_to_sell});
			}
		}();
		if (trade_record.$ === 'IncompleteTradeRecord') {
			var trade_context_ = trade_record.a;
			return {character: trade_context_.from_party, shop: trade_context_.to_party, shop_trends: trade_context_.shop_trends, traded_items: _List_Nil};
		} else {
			var trade_context_ = trade_record.a;
			var log = trade_record.b;
			return {
				character: A2(
					$author$project$ItemShop$append_to_character_action_log,
					trade_context_.from_party,
					{
						log_type: $author$project$ItemShop$Traded(log),
						time: ai_tick_time
					}),
				shop: trade_context_.to_party,
				shop_trends: trade_context_.shop_trends,
				traded_items: function () {
					var _v1 = A2($author$project$ItemShop$lookup_item_id, item_db, log.item_id);
					if (_v1.$ === 'Just') {
						var item_trade_log = _v1.a;
						return _List_fromArray(
							[
								{
								avg_price: $author$project$ItemShop$Price(log.gold_cost),
								item: item_trade_log.item,
								quantity: log.quantity
							}
							]);
					} else {
						return A2(
							_Debug_todo(
								'ItemShop',
								{
									start: {line: 2782, column: 25},
									end: {line: 2782, column: 35}
								}),
							'',
							_List_Nil);
					}
				}()
			};
		}
	});
var $author$project$ItemShop$NoActionChoice = {$: 'NoActionChoice'};
var $author$project$ItemShop$WantsToBuy = {$: 'WantsToBuy'};
var $author$project$ItemShop$WantsToFetchItem = {$: 'WantsToFetchItem'};
var $author$project$ItemShop$WantsToSell = {$: 'WantsToSell'};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$ItemShop$pickAiActionChoice = function (ai_tick_seed) {
	return A2(
		$elm$core$Tuple$mapFirst,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Tuple$first,
			$elm$core$Maybe$withDefault($author$project$ItemShop$NoActionChoice)),
		function (choices) {
			return A2($elm$random$Random$step, choices, ai_tick_seed);
		}(
			$elm_community$random_extra$Random$List$choose(
				_Utils_ap(
					A2($elm$core$List$repeat, 10, $author$project$ItemShop$WantsToSell),
					_Utils_ap(
						A2($elm$core$List$repeat, 10, $author$project$ItemShop$WantsToBuy),
						_Utils_ap(
							A2($elm$core$List$repeat, 2, $author$project$ItemShop$WantsToFetchItem),
							A2($elm$core$List$repeat, 5, $author$project$ItemShop$NoActionChoice)))))));
};
var $author$project$ItemShop$updateTimesOthersTraded = F2(
	function (item_db_record_trades, new_times_others_traded) {
		var old_times_others_traded = item_db_record_trades.times_others_traded;
		return _Utils_update(
			item_db_record_trades,
			{times_others_traded: old_times_others_traded + new_times_others_traded});
	});
var $author$project$ItemShop$update_ai = F4(
	function (ai_tick_time, shop_char_id, char_id, original_ai_update_data) {
		var shop_trends = original_ai_update_data.shop_trends;
		var historical_shop_trends = original_ai_update_data.historical_shop_trends;
		var characters = original_ai_update_data.characters;
		var ai_tick_seed = original_ai_update_data.ai_tick_seed;
		var item_db = original_ai_update_data.item_db;
		var maybe_shop = A2($author$project$ItemShop$getCharacter, characters, shop_char_id);
		var maybe_character = A2($author$project$ItemShop$getCharacter, characters, char_id);
		var _v0 = _Utils_Tuple2(maybe_character, maybe_shop);
		if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
			var character = _v0.a.a;
			var shop = _v0.b.a;
			var _v1 = $author$project$ItemShop$pickAiActionChoice(ai_tick_seed);
			var chosen_action = _v1.a;
			var new_seed = _v1.b;
			var ai_update_record = function () {
				switch (chosen_action.$) {
					case 'WantsToSell':
						return A5($author$project$ItemShop$ai_sell_item_to_shop, ai_tick_time, item_db, shop_trends, character, shop);
					case 'WantsToBuy':
						return A5($author$project$ItemShop$ai_buy_item_from_shop, ai_tick_time, item_db, shop_trends, character, shop);
					case 'WantsToFetchItem':
						return A5($author$project$ItemShop$ai_fetch_item, ai_tick_time, item_db, shop_trends, character, shop);
					default:
						return {
							character: A2(
								$author$project$ItemShop$append_to_character_action_log,
								character,
								{log_type: $author$project$ItemShop$DidNothing, time: ai_tick_time}),
							shop: shop,
							shop_trends: shop_trends,
							traded_items: _List_Nil
						};
				}
			}();
			var new_characters = A2(
				$elm$core$List$map,
				function (c) {
					return _Utils_eq(c.char_id, character.char_id) ? ai_update_record.character : (_Utils_eq(c.char_id, shop.char_id) ? ai_update_record.shop : c);
				},
				characters);
			var new_historical_shop_trends = A2(
				$elm$core$List$append,
				historical_shop_trends,
				_List_fromArray(
					[ai_update_record.shop_trends]));
			var new_item_db = function () {
				var _v2 = ai_update_record.traded_items;
				if (!_v2.b) {
					return item_db;
				} else {
					var inventory_records = _v2;
					return A3(
						$elm$core$List$foldl,
						$author$project$ItemShop$increment_item_trade_count($author$project$ItemShop$updateTimesOthersTraded),
						item_db,
						inventory_records);
				}
			}();
			return {ai_tick_seed: new_seed, characters: new_characters, historical_shop_trends: new_historical_shop_trends, item_db: new_item_db, shop_trends: ai_update_record.shop_trends};
		} else {
			return A2($elm$core$Debug$log, 'ERRORRRRR no matching characters', original_ai_update_data);
		}
	});
var $author$project$ItemShop$update_ai_chars = function (model) {
	var old_shop_trends = model.shop_trends;
	var old_historical_shop_trends = model.historical_shop_trends;
	var old_characters = model.characters;
	var ai_tick_seed = $elm$random$Random$initialSeed(
		$elm$time$Time$posixToMillis(model.ai_tick_time));
	var _v0 = model;
	var ai_tick_time = _v0.ai_tick_time;
	var item_db = _v0.item_db;
	var shop_id = _v0.shop_id;
	var first_ai_update_data = {ai_tick_seed: ai_tick_seed, characters: old_characters, historical_shop_trends: old_historical_shop_trends, item_db: item_db, shop_trends: old_shop_trends};
	var new_ai_data = A3(
		$elm$core$List$foldl,
		A2($author$project$ItemShop$update_ai, ai_tick_time, shop_id),
		first_ai_update_data,
		A2(
			$elm$core$List$map,
			function ($) {
				return $.char_id;
			},
			A2($author$project$ItemShop$exclude_player_and_shop, model, old_characters)));
	return _Utils_update(
		model,
		{characters: new_ai_data.characters, historical_shop_trends: new_ai_data.historical_shop_trends, item_db: new_ai_data.item_db, shop_trends: new_ai_data.shop_trends});
};
var $author$project$ItemShop$add_player_gpm = F2(
	function (player, to_add) {
		var max_gold = 50;
		var _v0 = player;
		var held_gold = _v0.held_gold;
		return (_Utils_cmp(held_gold, max_gold) < 0) ? _Utils_update(
			player,
			{
				held_gold: A2($elm$core$Basics$min, max_gold, held_gold + to_add)
			}) : player;
	});
var $author$project$ItemShop$apply_upgrade = F2(
	function (upgrade, _v0) {
		var player = _v0.a;
		var model = _v0.b;
		var new_player = function () {
			var to_add = upgrade.a;
			return A2($author$project$ItemShop$add_player_gpm, player, to_add);
		}();
		return _Utils_Tuple2(
			new_player,
			A2($author$project$ItemShop$withCharacter, new_player, model));
	});
var $author$project$ItemShop$apply_upgrades = F2(
	function (player, model) {
		var _v0 = A3(
			$elm$core$List$foldl,
			$author$project$ItemShop$apply_upgrade,
			_Utils_Tuple2(player, model),
			model.player_upgrades);
		var new_player = _v0.a;
		var new_model = _v0.b;
		return new_model;
	});
var $author$project$ItemShop$update_player = function (model) {
	var _v0 = $author$project$ItemShop$getPlayer(model);
	if (_v0.$ === 'Just') {
		var player = _v0.a;
		return A2($author$project$ItemShop$apply_upgrades, player, model);
	} else {
		return A2($elm$core$Debug$log, 'error: cant find player', model);
	}
};
var $author$project$ItemShop$TookSpecialActionTogglePauseAi = {$: 'TookSpecialActionTogglePauseAi'};
var $author$project$ItemShop$TookSpecialActionInviteTrader = {$: 'TookSpecialActionInviteTrader'};
var $author$project$ItemShop$addQuantityInt = F2(
	function (qty, val) {
		var orig_val = qty.a;
		return $author$project$ItemShop$Quantity(orig_val + val);
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$ItemShop$pick_item = F3(
	function (item_db, _v0, _v1) {
		var prev_seed = _v1.a;
		var folded_items = _v1.b;
		var _v2 = A2($author$project$ItemShop$pick_random_unlocked_item_from_db, item_db, prev_seed);
		var maybe_item = _v2.a;
		var seed_ = _v2.b;
		var result = A2(
			$elm$core$Maybe$map,
			function (item) {
				return {
					avg_price: $author$project$ItemShop$setPrice(item.raw_gold_cost),
					item: item,
					quantity: $author$project$ItemShop$Quantity(1)
				};
			},
			maybe_item);
		return _Utils_Tuple2(
			seed_,
			A2($elm$core$List$cons, result, folded_items));
	});
var $author$project$ItemShop$handle_invite_trader = function (model) {
	var name = 'Character ' + $elm$core$String$fromInt(
		$elm$core$List$length(model.characters) + 1);
	var invited_character = A2(
		$author$project$ItemShop$createCharacter,
		$author$project$ItemShop$generate_uuid(name),
		name);
	var incr_if_matches = F2(
		function (item, ir) {
			return _Utils_eq(ir.item.id, item.id) ? {
				avg_price: ir.avg_price,
				item: ir.item,
				quantity: A2($author$project$ItemShop$addQuantityInt, ir.quantity, 1)
			} : {avg_price: ir.avg_price, item: ir.item, quantity: ir.quantity};
		});
	var _v0 = model;
	var characters = _v0.characters;
	var item_db = _v0.item_db;
	var global_seed = _v0.global_seed;
	var _v1 = A2(
		$elm$random$Random$step,
		A2($elm$random$Random$int, 1, 5),
		global_seed);
	var num_items = _v1.a;
	var _v2 = A3(
		$elm$core$List$foldl,
		$author$project$ItemShop$pick_item(item_db),
		_Utils_Tuple2(global_seed, _List_Nil),
		A2($elm$core$List$repeat, num_items, _Utils_Tuple0));
	var new_global_seed = _v2.a;
	var held_maybe_item_frames = _v2.b;
	var held_items = A3(
		$elm$core$List$foldl,
		F2(
			function (_v3, prev_items) {
				var item = _v3.item;
				var quantity = _v3.quantity;
				var avg_price = _v3.avg_price;
				return A2(
					$elm$core$List$any,
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.item;
						},
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.id;
							},
							$elm$core$Basics$eq(item.id))),
					prev_items) ? A2(
					$elm$core$List$map,
					incr_if_matches(item),
					prev_items) : A2(
					$elm$core$List$cons,
					{avg_price: avg_price, item: item, quantity: quantity},
					prev_items);
			}),
		_List_Nil,
		A2($elm$core$List$filterMap, $elm$core$Basics$identity, held_maybe_item_frames));
	return A2(
		$author$project$ItemShop$append_player_action_log,
		$author$project$ItemShop$TookSpecialActionInviteTrader,
		_Utils_update(
			model,
			{
				characters: A2(
					$elm$core$List$append,
					characters,
					_List_fromArray(
						[
							_Utils_update(
							invited_character,
							{held_gold: 50, held_items: held_items})
						])),
				global_seed: new_global_seed
			}));
};
var $author$project$ItemShop$EventLeastDesiredItemType = function (a) {
	return {$: 'EventLeastDesiredItemType', a: a};
};
var $author$project$ItemShop$EventVeryDesiredItemType = function (a) {
	return {$: 'EventVeryDesiredItemType', a: a};
};
var $author$project$ItemShop$TookSpecialActionTriggerEvent = function (a) {
	return {$: 'TookSpecialActionTriggerEvent', a: a};
};
var $author$project$ItemShop$setGlobalSeed = F2(
	function (new_seed, model) {
		return _Utils_update(
			model,
			{global_seed: new_seed});
	});
var $author$project$ItemShop$set_item_type_sentiment = F3(
	function (item_type_sentiment, item_type, new_val) {
		return A3(
			$elm$core$Dict$update,
			$author$project$ItemShop$item_type_to_id(item_type),
			$elm$core$Basics$always(
				$elm$core$Maybe$Just(new_val)),
			item_type_sentiment);
	});
var $author$project$ItemShop$update_shop_trends = F2(
	function (model, update_st_func) {
		var new_shop_trends = update_st_func(model.shop_trends);
		var new_historical_shop_trends = A2(
			$elm$core$List$append,
			model.historical_shop_trends,
			_List_fromArray(
				[new_shop_trends]));
		return _Utils_update(
			model,
			{historical_shop_trends: new_historical_shop_trends, shop_trends: new_shop_trends});
	});
var $author$project$ItemShop$handle_special_event = F2(
	function (model, spec_event) {
		var choose_item_type = function (seed) {
			return A2(
				$elm$random$Random$step,
				$elm_community$random_extra$Random$List$choose(
					_Utils_ap(
						A2($elm$core$List$repeat, 10, $author$project$ItemShop$Weapon),
						_Utils_ap(
							A2($elm$core$List$repeat, 10, $author$project$ItemShop$Armor),
							A2($elm$core$List$repeat, 10, $author$project$ItemShop$Spellbook)))),
				seed);
		};
		var _v0 = model;
		var shop_trends = _v0.shop_trends;
		var historical_shop_trends = _v0.historical_shop_trends;
		var _v1 = shop_trends;
		var item_type_sentiment = _v1.item_type_sentiment;
		if (spec_event.$ === 'EventVeryDesiredItemType') {
			var item_type = spec_event.a;
			var _v3 = choose_item_type(model.global_seed);
			var _v4 = _v3.a;
			var maybe_chosen_item_type = _v4.a;
			var new_seed = _v3.b;
			return A2(
				$author$project$ItemShop$append_player_action_log,
				$author$project$ItemShop$TookSpecialActionTriggerEvent(
					$author$project$ItemShop$EventVeryDesiredItemType(maybe_chosen_item_type)),
				A2(
					$author$project$ItemShop$setGlobalSeed,
					new_seed,
					A2(
						$author$project$ItemShop$update_shop_trends,
						model,
						function (st) {
							return _Utils_update(
								st,
								{
									item_type_sentiment: A3(
										$author$project$ItemShop$set_item_type_sentiment,
										st.item_type_sentiment,
										A2($elm$core$Maybe$withDefault, $author$project$ItemShop$Weapon, maybe_chosen_item_type),
										1.5)
								});
						})));
		} else {
			var _v5 = choose_item_type(model.global_seed);
			var _v6 = _v5.a;
			var maybe_chosen_item_type = _v6.a;
			var new_seed = _v5.b;
			return A2(
				$author$project$ItemShop$append_player_action_log,
				$author$project$ItemShop$TookSpecialActionTriggerEvent(
					$author$project$ItemShop$EventLeastDesiredItemType(maybe_chosen_item_type)),
				A2(
					$author$project$ItemShop$setGlobalSeed,
					new_seed,
					A2(
						$author$project$ItemShop$update_shop_trends,
						model,
						function (st) {
							return _Utils_update(
								st,
								{
									item_type_sentiment: A3(
										$author$project$ItemShop$set_item_type_sentiment,
										st.item_type_sentiment,
										A2($elm$core$Maybe$withDefault, $author$project$ItemShop$Weapon, maybe_chosen_item_type),
										0.5)
								});
						})));
		}
	});
var $author$project$ItemShop$hasEnoughGold = F2(
	function (character, price) {
		return _Utils_cmp(
			character.held_gold,
			$author$project$ItemShop$getPrice(price)) > -1;
	});
var $author$project$ItemShop$scale_increase_income_cost = function (current_level) {
	return $author$project$ItemShop$setPrice(20 + (((5 * current_level) * current_level) * 2));
};
var $author$project$ItemShop$special_action_increase_income = function (model) {
	var _v0 = $author$project$ItemShop$getPlayer(model);
	if (_v0.$ === 'Nothing') {
		return model;
	} else {
		var player = _v0.a;
		var automaticGpmLevel = A2(
			$elm$core$Maybe$withDefault,
			1,
			$elm$core$List$head(
				A2(
					$elm$core$List$filterMap,
					function (_v2) {
						var level = _v2.a;
						return $elm$core$Maybe$Just(level);
					},
					model.player_upgrades)));
		var upgradeCost = $author$project$ItemShop$scale_increase_income_cost(automaticGpmLevel);
		return A2($author$project$ItemShop$hasEnoughGold, player, upgradeCost) ? function (m) {
			return _Utils_update(
				m,
				{
					player_upgrades: A2(
						$elm$core$List$map,
						function (_v1) {
							var level = _v1.a;
							return $author$project$ItemShop$AutomaticGPM(level + 1);
						},
						m.player_upgrades)
				});
		}(
			A2(
				$author$project$ItemShop$withCharacter,
				A2($author$project$ItemShop$subGold, player, upgradeCost),
				model)) : model;
	}
};
var $author$project$ItemShop$TookSpecialActionUnlockItem = function (a) {
	return {$: 'TookSpecialActionUnlockItem', a: a};
};
var $author$project$ItemShop$pick_random_locked_item_from_db = F2(
	function (item_db, seed) {
		var _v0 = function (gen) {
			return A2($elm$random$Random$step, gen, seed);
		}(
			$elm_community$random_extra$Random$List$choose(
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$Basics$not,
						function ($) {
							return $.is_unlocked;
						}),
					$elm$core$Dict$values(item_db))));
		var _v1 = _v0.a;
		var maybe_item = _v1.a;
		var new_seed = _v0.b;
		return _Utils_Tuple2(
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.item;
				},
				maybe_item),
			new_seed);
	});
var $author$project$ItemShop$special_action_unlock_item = function (model) {
	var _v0 = model;
	var item_db = _v0.item_db;
	var ai_tick_time = _v0.ai_tick_time;
	var _v1 = A2(
		$author$project$ItemShop$pick_random_locked_item_from_db,
		item_db,
		$author$project$ItemShop$seed_from_time(ai_tick_time));
	var mb_item_to_unlock = _v1.a;
	var new_seed = _v1.b;
	return function () {
		if (mb_item_to_unlock.$ === 'Just') {
			var item_to_unlock = mb_item_to_unlock.a;
			return $author$project$ItemShop$append_player_action_log(
				$author$project$ItemShop$TookSpecialActionUnlockItem(item_to_unlock.id));
		} else {
			return $elm$core$Basics$identity;
		}
	}()(
		_Utils_update(
			model,
			{
				item_db: function () {
					if (mb_item_to_unlock.$ === 'Just') {
						var item_to_unlock = mb_item_to_unlock.a;
						return A3(
							$author$project$ItemShop$update_item_db,
							item_db,
							item_to_unlock.id,
							$elm$core$Maybe$map(
								function (idbr) {
									return _Utils_update(
										idbr,
										{is_unlocked: true});
								}));
					} else {
						return item_db;
					}
				}()
			}));
};
var $author$project$ItemShop$update_special_action = F3(
	function (special_action, price, model) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(model, $elm$core$Platform$Cmd$none),
			A2(
				$elm$core$Maybe$map,
				function (player) {
					return function (new_model) {
						switch (special_action.$) {
							case 'InviteTrader':
								return _Utils_Tuple2(
									$author$project$ItemShop$handle_invite_trader(
										$author$project$ItemShop$handle_invite_trader(
											$author$project$ItemShop$handle_invite_trader(
												$author$project$ItemShop$handle_invite_trader(
													$author$project$ItemShop$handle_invite_trader(
														$author$project$ItemShop$handle_invite_trader(
															$author$project$ItemShop$handle_invite_trader(
																$author$project$ItemShop$handle_invite_trader(new_model)))))))),
									$elm$core$Platform$Cmd$none);
							case 'TriggerEvent':
								var event = special_action.a;
								return _Utils_Tuple2(
									A2($author$project$ItemShop$handle_special_event, new_model, event),
									$elm$core$Platform$Cmd$none);
							case 'TogglePauseAi':
								return _Utils_Tuple2(
									A2(
										$author$project$ItemShop$append_player_action_log,
										$author$project$ItemShop$TookSpecialActionTogglePauseAi,
										_Utils_update(
											new_model,
											{ai_updates_paused: !new_model.ai_updates_paused})),
									$elm$core$Platform$Cmd$none);
							case 'UnlockItem':
								return _Utils_Tuple2(
									$author$project$ItemShop$special_action_unlock_item(model),
									$elm$core$Platform$Cmd$none);
							default:
								return _Utils_Tuple2(
									$author$project$ItemShop$special_action_increase_income(model),
									$elm$core$Platform$Cmd$none);
						}
					}(
						A2(
							$author$project$ItemShop$withCharacter,
							A2($author$project$ItemShop$subGold, player, price),
							model));
				},
				A2(
					$elm$core$Maybe$andThen,
					function (player) {
						return A2($author$project$ItemShop$hasEnoughGold, player, price) ? $elm$core$Maybe$Just(player) : $elm$core$Maybe$Nothing;
					},
					$author$project$ItemShop$getPlayer(model))));
	});
var $author$project$ItemShop$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'MouseEnterShopItem':
				var context = msg.a;
				var item = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hovered_item_in_character: $elm$core$Maybe$Just(item)
						}),
					$elm$core$Platform$Cmd$none);
			case 'MouseLeaveShopItem':
				var context = msg.a;
				var item = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{hovered_item_in_character: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'PlayerBuyItemFromShop':
				var item = msg.a;
				var qty = msg.b;
				var _v1 = _Utils_Tuple2(
					$author$project$ItemShop$getShop(model),
					$author$project$ItemShop$getPlayer(model));
				if ((_v1.a.$ === 'Just') && (_v1.b.$ === 'Just')) {
					var shop = _v1.a.a;
					var player = _v1.b.a;
					var trade_record = A2(
						$author$project$ItemShop$sell_items_from_party_to_other,
						{from_party: shop, shop_trends: model.shop_trends, to_party: player},
						{item: item, qty: qty});
					var new_trade_context = $author$project$ItemShop$getTradeContext(trade_record);
					var new_item_db = A3($author$project$ItemShop$updateItemDbFromTradeRecord, model.item_db, $author$project$ItemShop$updateTimesYouBought, trade_record);
					return _Utils_Tuple2(
						A2(
							$author$project$ItemShop$withCharacter,
							new_trade_context.from_party,
							A2(
								$author$project$ItemShop$withCharacter,
								new_trade_context.to_party,
								_Utils_update(
									model,
									{
										historical_shop_trends: A2(
											$elm$core$List$append,
											model.historical_shop_trends,
											_List_fromArray(
												[model.shop_trends])),
										item_db: new_item_db,
										shop_trends: new_trade_context.shop_trends
									}))),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'PlayerSellItemToShop':
				var item = msg.a;
				var qty = msg.b;
				var _v2 = _Utils_Tuple2(
					$author$project$ItemShop$getShop(model),
					$author$project$ItemShop$getPlayer(model));
				if ((_v2.a.$ === 'Just') && (_v2.b.$ === 'Just')) {
					var shop = _v2.a.a;
					var player = _v2.b.a;
					var trade_order = {item: item, qty: qty};
					var orig_trade_context = {from_party: player, shop_trends: model.shop_trends, to_party: shop};
					var trade_record = A2($author$project$ItemShop$sell_items_from_party_to_other, orig_trade_context, trade_order);
					var new_trade_context = $author$project$ItemShop$getTradeContext(trade_record);
					var new_item_db = A3($author$project$ItemShop$updateItemDbFromTradeRecord, model.item_db, $author$project$ItemShop$updateTimesYouSold, trade_record);
					return _Utils_Tuple2(
						A2(
							$author$project$ItemShop$withCharacter,
							new_trade_context.to_party,
							A2(
								$author$project$ItemShop$withCharacter,
								new_trade_context.from_party,
								_Utils_update(
									model,
									{
										historical_shop_trends: A2(
											$elm$core$List$append,
											model.historical_shop_trends,
											_List_fromArray(
												[model.shop_trends])),
										item_db: new_item_db,
										shop_trends: new_trade_context.shop_trends
									}))),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'StartTrendsHover':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{shop_trends_hovered: true}),
					$elm$core$Platform$Cmd$none);
			case 'EndTrendsHover':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{shop_trends_hovered: false}),
					$elm$core$Platform$Cmd$none);
			case 'TickSecond':
				var time = msg.a;
				return (!model.ai_updates_paused) ? _Utils_Tuple2(
					$author$project$ItemShop$update_ai_chars(
						$author$project$ItemShop$update_player(
							_Utils_update(
								model,
								{ai_tick_time: time}))),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'ToggleShowMainChart':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{show_main_chart: !model.show_main_chart}),
					$elm$core$Platform$Cmd$none);
			case 'OnTrendChartHover':
				var hovered = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{hovered_trend_chart: hovered}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleShowDebugInventories':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{show_debug_inventories: !model.show_debug_inventories}),
					$elm$core$Platform$Cmd$none);
			case 'KeyPressedMsg':
				var key_event_msg = msg.a;
				if (key_event_msg.$ === 'KeyEventShift') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{shiftIsPressed: true, show_charts_in_hovered_item: true}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'KeyReleasedMsg':
				var key_event_msg = msg.a;
				if (key_event_msg.$ === 'KeyEventShift') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{shiftIsPressed: false, show_charts_in_hovered_item: false}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'StartTooltipHover':
				var tooltip_id = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hovered_tooltip: $author$project$ItemShop$HoveredTooltipWithoutOffset(
								A2(
									$elm$core$Maybe$withDefault,
									{hovered_tooltip_id: tooltip_id, offset_x: 0, offset_y: 0},
									A2($elm$core$Dict$get, tooltip_id, model.cached_tooltip_offsets)))
						}),
					A2(
						$elm$core$Task$attempt,
						$author$project$ItemShop$GotTooltipSize,
						$elm$browser$Browser$Dom$getElement('tooltip__' + tooltip_id)));
			case 'EndTooltipHover':
				var tooltip_id = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{hovered_tooltip: $author$project$ItemShop$NoHoveredTooltip}),
					$elm$core$Platform$Cmd$none);
			case 'GotTooltipSize':
				var tooltip_size_result = msg.a;
				if (tooltip_size_result.$ === 'Ok') {
					var sizes = tooltip_size_result.a;
					var viewport_width = sizes.viewport.width;
					var viewport_height = sizes.viewport.height;
					var _v6 = sizes.element;
					var x = _v6.x;
					var y = _v6.y;
					var width = _v6.width;
					var height = _v6.height;
					var offset_x = (x < 0) ? $elm$core$Basics$floor(
						$elm$core$Basics$abs(x) + 10) : ((_Utils_cmp(x + width, viewport_width) > 0) ? $elm$core$Basics$floor((viewport_width - (x + width)) - 10) : $elm$core$Basics$floor(0));
					var offset_y = (y < 0) ? $elm$core$Basics$floor(
						$elm$core$Basics$abs(y) + 10) : ((_Utils_cmp(y + height, viewport_height) > 0) ? $elm$core$Basics$floor((viewport_height - (y + height)) - 10) : $elm$core$Basics$floor(0));
					var _v7 = model.hovered_tooltip;
					switch (_v7.$) {
						case 'NoHoveredTooltip':
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						case 'HoveredTooltipWithoutOffset':
							var old_tooltip_data = _v7.a;
							var new_tooltip_data = {hovered_tooltip_id: old_tooltip_data.hovered_tooltip_id, offset_x: offset_x + old_tooltip_data.offset_x, offset_y: offset_y + old_tooltip_data.offset_y};
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										cached_tooltip_offsets: A3($elm$core$Dict$insert, old_tooltip_data.hovered_tooltip_id, new_tooltip_data, model.cached_tooltip_offsets),
										hovered_tooltip: $author$project$ItemShop$HoveredTooltipWithOffset(new_tooltip_data)
									}),
								$elm$core$Platform$Cmd$none);
						default:
							var old_tooltip_data = _v7.a;
							var new_tooltip_data = _Utils_update(
								old_tooltip_data,
								{offset_x: offset_x, offset_y: offset_y});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										hovered_tooltip: $author$project$ItemShop$HoveredTooltipWithOffset(new_tooltip_data)
									}),
								$elm$core$Platform$Cmd$none);
					}
				} else {
					var error = tooltip_size_result.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'OnSpecialAction':
				var special_action = msg.a;
				var price = msg.b;
				return A3($author$project$ItemShop$update_special_action, special_action, price, model);
			case 'ToggleHideNonZeroRows':
				var char_id = msg.a;
				var new_characters = A2(
					$elm$core$List$map,
					function (_char) {
						return (!_Utils_eq(_char.char_id, char_id)) ? _char : _Utils_update(
							_char,
							{hide_zero_qty_inv_rows: !_char.hide_zero_qty_inv_rows});
					},
					model.characters);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{characters: new_characters}),
					$elm$core$Platform$Cmd$none);
			case 'ChangeTabType':
				var tab_type = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tab_type: tab_type}),
					function () {
						var _v8 = model.browserNavKey;
						if (_v8.$ === 'Just') {
							var key = _v8.a;
							return A2(
								$elm$browser$Browser$Navigation$pushUrl,
								key,
								'#' + $author$project$ItemShop$tabTypeToString(tab_type));
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}());
			case 'CycleFilterDisplayedItemsForward':
				var character_id = msg.a;
				var mb_item_type = msg.b;
				var maybeCharacter = A2($author$project$ItemShop$getCharacter, model.characters, character_id);
				if (maybeCharacter.$ === 'Just') {
					var character = maybeCharacter.a;
					var getIdx = function (idx) {
						return A2($elm_community$list_extra$List$Extra$getAt, idx, $author$project$ItemShop$allItemTypes);
					};
					var newItemType = function () {
						if (mb_item_type.$ === 'Nothing') {
							return getIdx(0);
						} else {
							var item_type = mb_item_type.a;
							var curIdx = A2($elm_community$list_extra$List$Extra$elemIndex, item_type, $author$project$ItemShop$allItemTypes);
							return A2(
								$elm$core$Maybe$andThen,
								getIdx,
								A2(
									$elm$core$Maybe$map,
									$elm$core$Basics$add(1),
									curIdx));
						}
					}();
					return _Utils_Tuple2(
						A2(
							$author$project$ItemShop$withCharacter,
							_Utils_update(
								character,
								{displayedItemType: newItemType}),
							model),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'CycleFilterDisplayedItemsBackward':
				var character_id = msg.a;
				var mb_item_type = msg.b;
				var maybeCharacter = A2($author$project$ItemShop$getCharacter, model.characters, character_id);
				if (maybeCharacter.$ === 'Just') {
					var character = maybeCharacter.a;
					var getIdx = function (idx) {
						return A2($elm_community$list_extra$List$Extra$getAt, idx, $author$project$ItemShop$allItemTypes);
					};
					var newItemType = function () {
						if (mb_item_type.$ === 'Nothing') {
							return getIdx(0);
						} else {
							var item_type = mb_item_type.a;
							var curIdx = A2($elm_community$list_extra$List$Extra$elemIndex, item_type, $author$project$ItemShop$allItemTypes);
							return A2(
								$elm$core$Maybe$andThen,
								getIdx,
								A2(
									$elm$core$Debug$log,
									'curIdx',
									A2(
										$elm$core$Maybe$map,
										function (i) {
											return i - 1;
										},
										curIdx)));
						}
					}();
					return _Utils_Tuple2(
						A2(
							$author$project$ItemShop$withCharacter,
							_Utils_update(
								character,
								{displayedItemType: newItemType}),
							model),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'ScrollViewport':
				return _Utils_Tuple2(
					model,
					A2($elm$core$Task$perform, $author$project$ItemShop$GotViewport, $elm$browser$Browser$Dom$getViewport));
			case 'GotViewport':
				var viewport = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							globalViewport: $elm$core$Maybe$Just(viewport)
						}),
					A2(
						$elm$core$Task$attempt,
						$author$project$ItemShop$GotShowDebugElement,
						$elm$browser$Browser$Dom$getElement('show_debug_inventories')));
			case 'GotShowDebugElement':
				var attemptedElement = msg.a;
				var _v13 = function () {
					if (attemptedElement.$ === 'Ok') {
						var element = attemptedElement.a;
						var shouldDisplay = A2(
							$elm$core$Maybe$withDefault,
							false,
							A2(
								$elm$core$Maybe$map,
								function (gvp) {
									return A2($author$project$ItemShop$isElementOnScreen, gvp, element);
								},
								model.globalViewport));
						return _Utils_Tuple2(
							$elm$core$Maybe$Just(element),
							shouldDisplay);
					} else {
						return _Utils_Tuple2($elm$core$Maybe$Nothing, false);
					}
				}();
				var modelElement = _v13.a;
				var shouldDisplayShowDebugInventoriesOverlay = _v13.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{shouldDisplayShowDebugInventoriesOverlay: shouldDisplayShowDebugInventoriesOverlay, showDebugInventoriesElement: modelElement}),
					$elm$core$Platform$Cmd$none);
			case 'SacrificeItem':
				var item = msg.a;
				return _Utils_Tuple2(
					A2(
						$author$project$ItemShop$mapPlayer,
						function (player) {
							var itemGoldCost = A3(
								$author$project$ItemShop$get_adjusted_item_cost,
								model.shop_trends,
								item,
								$author$project$ItemShop$setQuantity(1));
							var newItems = A4(
								$author$project$ItemShop$remove_item_from_inventory_records,
								player.held_items,
								item,
								$author$project$ItemShop$setQuantity(1),
								itemGoldCost);
							return _Utils_update(
								player,
								{held_blood: player.held_blood + itemGoldCost, held_items: newItems});
						},
						model),
					$elm$core$Platform$Cmd$none);
			case 'ToggleColorTheme':
				var newColorTheme = function () {
					var _v15 = model.colorTheme;
					if (_v15.$ === 'BrightTheme') {
						return $author$project$Interface$DarkTheme;
					} else {
						return $author$project$Interface$BrightTheme;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{colorTheme: newColorTheme}),
					$elm$core$Platform$Cmd$none);
			case 'GotBattleMsg':
				var battleMsg = msg.a;
				var _v16 = A2(
					$author$project$Battle$update,
					$author$project$ItemShop$transferToBattleModel(model),
					battleMsg);
				var newBattleModel = _v16.a;
				var newBattleCmds = _v16.b;
				var battleOutMsg = _v16.c;
				var mappedCmds = A2($elm$core$Platform$Cmd$map, $author$project$ItemShop$GotBattleMsg, newBattleCmds);
				var _v17 = A2(
					$author$project$ItemShop$updateBattleOutMsg,
					battleOutMsg,
					A2($author$project$ItemShop$transferFromBattleModel, model, newBattleModel));
				var newModel = _v17.a;
				var newOutCmds = _v17.b;
				var newCmds = $elm$core$Platform$Cmd$batch(
					A2(
						$elm$core$List$cons,
						mappedCmds,
						_List_fromArray(
							[newOutCmds])));
				return _Utils_Tuple2(newModel, newCmds);
			default:
				var inventorySortType = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inventorySortType: inventorySortType}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Sfxr$encodeArpeggiation = function (arpeggiation) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_arp_mod',
			$elm$json$Json$Encode$float(arpeggiation.mod)),
			_Utils_Tuple2(
			'p_arp_speed',
			$elm$json$Json$Encode$float(arpeggiation.speed))
		]);
};
var $author$project$Sfxr$encodeDuty = function (duty) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_duty',
			$elm$json$Json$Encode$float(duty.duty)),
			_Utils_Tuple2(
			'p_duty_ramp',
			$elm$json$Json$Encode$float(duty.ramp))
		]);
};
var $author$project$Sfxr$encodeEnvelope = function (envelope) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_env_attack',
			$elm$json$Json$Encode$float(envelope.attack)),
			_Utils_Tuple2(
			'p_env_sustain',
			$elm$json$Json$Encode$float(envelope.sustain)),
			_Utils_Tuple2(
			'p_env_punch',
			$elm$json$Json$Encode$float(envelope.punch)),
			_Utils_Tuple2(
			'p_env_decay',
			$elm$json$Json$Encode$float(envelope.decay))
		]);
};
var $author$project$Sfxr$encodeFlanger = function (flanger) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_pha_offset',
			$elm$json$Json$Encode$float(flanger.offset)),
			_Utils_Tuple2(
			'p_pha_ramp',
			$elm$json$Json$Encode$float(flanger.ramp))
		]);
};
var $author$project$Sfxr$encodeFrequency = function (frequency) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_base_freq',
			$elm$json$Json$Encode$float(frequency.base)),
			_Utils_Tuple2(
			'p_freq_limit',
			$elm$json$Json$Encode$float(frequency.limit)),
			_Utils_Tuple2(
			'p_freq_ramp',
			$elm$json$Json$Encode$float(frequency.ramp)),
			_Utils_Tuple2(
			'p_freq_dramp',
			$elm$json$Json$Encode$float(frequency.dramp))
		]);
};
var $author$project$Sfxr$encodeHighPassFilter = function (highPassFilter) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_hpf_freq',
			$elm$json$Json$Encode$float(highPassFilter.frequency)),
			_Utils_Tuple2(
			'p_hpf_ramp',
			$elm$json$Json$Encode$float(highPassFilter.ramp))
		]);
};
var $author$project$Sfxr$encodeLowPassFilter = function (lowPassFilter) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_lpf_freq',
			$elm$json$Json$Encode$float(lowPassFilter.frequency)),
			_Utils_Tuple2(
			'p_lpf_ramp',
			$elm$json$Json$Encode$float(lowPassFilter.ramp)),
			_Utils_Tuple2(
			'p_lpf_resonance',
			$elm$json$Json$Encode$float(lowPassFilter.resonance))
		]);
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Sfxr$encodeMisc = function (misc) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'sound_vol',
			$elm$json$Json$Encode$float(misc.volume)),
			_Utils_Tuple2(
			'sample_rate',
			$elm$json$Json$Encode$int(misc.sampleRate)),
			_Utils_Tuple2(
			'sample_size',
			$elm$json$Json$Encode$int(misc.sampleSize))
		]);
};
var $author$project$Sfxr$encodeRetrigger = function (retrigger) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_repeat_speed',
			$elm$json$Json$Encode$float(retrigger.repeatSpeed))
		]);
};
var $author$project$Sfxr$encodeShape = function (shape) {
	return _Utils_Tuple2(
		'wave_type',
		$elm$json$Json$Encode$int(
			function () {
				switch (shape.$) {
					case 'Square':
						return 0;
					case 'Sawtooth':
						return 1;
					case 'Sine':
						return 2;
					default:
						return 3;
				}
			}()));
};
var $author$project$Sfxr$encodeVibrato = function (vibrato) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'p_vib_strength',
			$elm$json$Json$Encode$float(vibrato.strength)),
			_Utils_Tuple2(
			'p_vib_speed',
			$elm$json$Json$Encode$float(vibrato.speed))
		]);
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Sfxr$encodeSoundConfig = function (soundConfig) {
	return $elm$json$Json$Encode$object(
		_Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'oldParams',
					$elm$json$Json$Encode$bool(true))
				]),
			_Utils_ap(
				_List_fromArray(
					[
						$author$project$Sfxr$encodeShape(soundConfig.shape)
					]),
				_Utils_ap(
					$author$project$Sfxr$encodeEnvelope(soundConfig.envelope),
					_Utils_ap(
						$author$project$Sfxr$encodeFrequency(soundConfig.frequency),
						_Utils_ap(
							$author$project$Sfxr$encodeVibrato(soundConfig.vibrato),
							_Utils_ap(
								$author$project$Sfxr$encodeArpeggiation(soundConfig.arpeggiation),
								_Utils_ap(
									$author$project$Sfxr$encodeDuty(soundConfig.duty),
									_Utils_ap(
										$author$project$Sfxr$encodeRetrigger(soundConfig.retrigger),
										_Utils_ap(
											$author$project$Sfxr$encodeFlanger(soundConfig.flanger),
											_Utils_ap(
												$author$project$Sfxr$encodeLowPassFilter(soundConfig.lowPassFilter),
												_Utils_ap(
													$author$project$Sfxr$encodeHighPassFilter(soundConfig.highPassFilter),
													$author$project$Sfxr$encodeMisc(soundConfig.misc)))))))))))));
};
var $author$project$Sfxr$flipCoin = A2(
	$elm$random$Random$map,
	function (n) {
		return n < 50;
	},
	A2($elm$random$Random$int, 1, 100));
var $elm$random$Random$float = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var seed1 = $elm$random$Random$next(seed0);
				var range = $elm$core$Basics$abs(b - a);
				var n1 = $elm$random$Random$peel(seed1);
				var n0 = $elm$random$Random$peel(seed0);
				var lo = (134217727 & n1) * 1.0;
				var hi = (67108863 & n0) * 1.0;
				var val = ((hi * 134217728.0) + lo) / 9007199254740992.0;
				var scaled = (val * range) + a;
				return _Utils_Tuple2(
					scaled,
					$elm$random$Random$next(seed1));
			});
	});
var $author$project$Sfxr$getFloat = function (max) {
	return A2($elm$random$Random$float, 0, max);
};
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0.a;
		var genB = _v1.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v2 = genA(seed0);
				var a = _v2.a;
				var seed1 = _v2.b;
				var _v3 = genB(seed1);
				var b = _v3.a;
				var seed2 = _v3.b;
				return _Utils_Tuple2(
					A2(func, a, b),
					seed2);
			});
	});
var $author$project$Sfxr$getRandomHitHurt = function (seed_) {
	return $elm$core$Basics$identity(
		function (_v4) {
			var sc = _v4.a;
			var highPassFilter = sc.highPassFilter;
			var seed = _v4.b;
			var _v5 = A2(
				$elm$random$Random$step,
				A3(
					$elm$random$Random$map2,
					F2(
						function (shouldFilter, frequency) {
							return shouldFilter ? _Utils_update(
								highPassFilter,
								{frequency: frequency}) : highPassFilter;
						}),
					$author$project$Sfxr$flipCoin,
					$author$project$Sfxr$getFloat(0.3)),
				seed);
			var newHighPassFilter = _v5.a;
			var newSeed = _v5.b;
			return _Utils_Tuple2(
				_Utils_update(
					sc,
					{highPassFilter: newHighPassFilter}),
				newSeed);
		}(
			function (_v2) {
				var sc = _v2.a;
				var envelope = sc.envelope;
				var seed = _v2.b;
				var _v3 = A2(
					$elm$random$Random$step,
					A3(
						$elm$random$Random$map2,
						F2(
							function (sustain, decay) {
								return _Utils_update(
									envelope,
									{attack: 0, decay: 0.1 + decay, sustain: sustain});
							}),
						$author$project$Sfxr$getFloat(0.1),
						$author$project$Sfxr$getFloat(0.2)),
					seed);
				var newEnvelope = _v3.a;
				var newSeed = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						sc,
						{envelope: newEnvelope}),
					newSeed);
			}(
				function (_v0) {
					var sc = _v0.a;
					var frequency = sc.frequency;
					var seed = _v0.b;
					var _v1 = A2(
						$elm$random$Random$step,
						A3(
							$elm$random$Random$map2,
							F2(
								function (base, ramp) {
									return _Utils_update(
										frequency,
										{base: 0.2 + base, ramp: (-0.3) - ramp});
								}),
							$author$project$Sfxr$getFloat(0.6),
							$author$project$Sfxr$getFloat(0.4)),
						seed);
					var newFrequency = _v1.a;
					var newSeed = _v1.b;
					return _Utils_Tuple2(
						_Utils_update(
							sc,
							{frequency: newFrequency}),
						newSeed);
				}(
					_Utils_Tuple2($author$project$Sfxr$initSoundConfig, seed_)))));
};
var $author$project$Sfxr$sfxrOut = _Platform_outgoingPort('sfxrOut', $elm$core$Basics$identity);
var $author$project$Sfxr$setSoundConfig = F2(
	function (model, newSoundConfig) {
		return _Utils_update(
			model,
			{soundConfig: newSoundConfig});
	});
var $author$project$Sfxr$withArpeggiation = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				arpeggiation: updater(soundConfig.arpeggiation)
			});
	});
var $author$project$Sfxr$updateArpeggiationConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withArpeggiation,
					soundConfig,
					function () {
						if (updateType.$ === 'ArpMod') {
							var mod = updateType.a;
							return function (arp) {
								return _Utils_update(
									arp,
									{mod: mod});
							};
						} else {
							var speed = updateType.a;
							return function (arp) {
								return _Utils_update(
									arp,
									{speed: speed});
							};
						}
					}())));
	});
var $author$project$Sfxr$withDuty = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				duty: updater(soundConfig.duty)
			});
	});
var $author$project$Sfxr$updateDutyConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withDuty,
					soundConfig,
					function () {
						if (updateType.$ === 'DtyDuty') {
							var duty = updateType.a;
							return function (dty) {
								return _Utils_update(
									dty,
									{duty: duty});
							};
						} else {
							var ramp = updateType.a;
							return function (dty) {
								return _Utils_update(
									dty,
									{ramp: ramp});
							};
						}
					}())));
	});
var $author$project$Sfxr$withEnvelope = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				envelope: updater(soundConfig.envelope)
			});
	});
var $author$project$Sfxr$updateEnvelopeConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withEnvelope,
					soundConfig,
					function () {
						switch (updateType.$) {
							case 'EnvAttack':
								var attack = updateType.a;
								return function (env) {
									return _Utils_update(
										env,
										{attack: attack});
								};
							case 'EnvSustain':
								var sustain = updateType.a;
								return function (env) {
									return _Utils_update(
										env,
										{sustain: sustain});
								};
							case 'EnvPunch':
								var punch = updateType.a;
								return function (env) {
									return _Utils_update(
										env,
										{punch: punch});
								};
							default:
								var decay = updateType.a;
								return function (env) {
									return _Utils_update(
										env,
										{decay: decay});
								};
						}
					}())));
	});
var $author$project$Sfxr$withFlanger = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				flanger: updater(soundConfig.flanger)
			});
	});
var $author$project$Sfxr$updateFlangerConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withFlanger,
					soundConfig,
					function () {
						if (updateType.$ === 'FlaOffset') {
							var offset = updateType.a;
							return function (fla) {
								return _Utils_update(
									fla,
									{offset: offset});
							};
						} else {
							var ramp = updateType.a;
							return function (fla) {
								return _Utils_update(
									fla,
									{ramp: ramp});
							};
						}
					}())));
	});
var $author$project$Sfxr$withFrequency = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				frequency: updater(soundConfig.frequency)
			});
	});
var $author$project$Sfxr$updateFrequencyConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withFrequency,
					soundConfig,
					function () {
						switch (updateType.$) {
							case 'FrqBase':
								var base = updateType.a;
								return function (frq) {
									return _Utils_update(
										frq,
										{base: base});
								};
							case 'FrqLimit':
								var limit = updateType.a;
								return function (frq) {
									return _Utils_update(
										frq,
										{limit: limit});
								};
							case 'FrqRamp':
								var ramp = updateType.a;
								return function (frq) {
									return _Utils_update(
										frq,
										{ramp: ramp});
								};
							default:
								var dramp = updateType.a;
								return function (frq) {
									return _Utils_update(
										frq,
										{dramp: dramp});
								};
						}
					}())));
	});
var $author$project$Sfxr$withHighPassFilter = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				highPassFilter: updater(soundConfig.highPassFilter)
			});
	});
var $author$project$Sfxr$updateHighPassFilterConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withHighPassFilter,
					soundConfig,
					function () {
						if (updateType.$ === 'HpfFrequency') {
							var frequency = updateType.a;
							return function (hpf) {
								return _Utils_update(
									hpf,
									{frequency: frequency});
							};
						} else {
							var ramp = updateType.a;
							return function (hpf) {
								return _Utils_update(
									hpf,
									{ramp: ramp});
							};
						}
					}())));
	});
var $author$project$Sfxr$withLowPassFilter = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				lowPassFilter: updater(soundConfig.lowPassFilter)
			});
	});
var $author$project$Sfxr$updateLowPassFilterConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withLowPassFilter,
					soundConfig,
					function () {
						switch (updateType.$) {
							case 'LpfFrequency':
								var frequency = updateType.a;
								return function (lpf) {
									return _Utils_update(
										lpf,
										{frequency: frequency});
								};
							case 'LpfRamp':
								var ramp = updateType.a;
								return function (lpf) {
									return _Utils_update(
										lpf,
										{ramp: ramp});
								};
							default:
								var resonance = updateType.a;
								return function (lpf) {
									return _Utils_update(
										lpf,
										{resonance: resonance});
								};
						}
					}())));
	});
var $author$project$Sfxr$withMisc = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				misc: updater(soundConfig.misc)
			});
	});
var $author$project$Sfxr$updateMiscConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withMisc,
					soundConfig,
					function () {
						switch (updateType.$) {
							case 'MscVolume':
								var volume = updateType.a;
								return function (msc) {
									return _Utils_update(
										msc,
										{volume: volume});
								};
							case 'MscSampleRate':
								var sampleRate = updateType.a;
								return function (msc) {
									return _Utils_update(
										msc,
										{sampleRate: sampleRate});
								};
							default:
								var sampleSize = updateType.a;
								return function (msc) {
									return _Utils_update(
										msc,
										{sampleSize: sampleSize});
								};
						}
					}())));
	});
var $author$project$Sfxr$withRetrigger = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				retrigger: updater(soundConfig.retrigger)
			});
	});
var $author$project$Sfxr$updateRetriggerConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withRetrigger,
					soundConfig,
					function () {
						var repeatSpeed = updateType.a;
						return function (ret) {
							return _Utils_update(
								ret,
								{repeatSpeed: repeatSpeed});
						};
					}())));
	});
var $author$project$Sfxr$withShape = F2(
	function (soundConfig, newShape) {
		return _Utils_update(
			soundConfig,
			{shape: newShape});
	});
var $author$project$Sfxr$updateShapeConfigType = F2(
	function (model, _v0) {
		var soundConfig = model.soundConfig;
		var shape = _v0.a;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2($author$project$Sfxr$withShape, soundConfig, shape)));
	});
var $author$project$Sfxr$withVibrato = F2(
	function (soundConfig, updater) {
		return _Utils_update(
			soundConfig,
			{
				vibrato: updater(soundConfig.vibrato)
			});
	});
var $author$project$Sfxr$updateVibratoConfigType = F2(
	function (model, updateType) {
		var soundConfig = model.soundConfig;
		return function (m) {
			return _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
		}(
			A2(
				$author$project$Sfxr$setSoundConfig,
				model,
				A2(
					$author$project$Sfxr$withVibrato,
					soundConfig,
					function () {
						if (updateType.$ === 'VibStrength') {
							var strength = updateType.a;
							return function (vib) {
								return _Utils_update(
									vib,
									{strength: strength});
							};
						} else {
							var speed = updateType.a;
							return function (vib) {
								return _Utils_update(
									vib,
									{speed: speed});
							};
						}
					}())));
	});
var $author$project$Sfxr$updateOnSliderChanged = F2(
	function (model, configType) {
		var noop = _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		switch (configType.$) {
			case 'ShapeConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateShapeConfigType, model, updateType);
			case 'EnvelopeConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateEnvelopeConfigType, model, updateType);
			case 'FrequencyConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateFrequencyConfigType, model, updateType);
			case 'VibratoConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateVibratoConfigType, model, updateType);
			case 'ArpeggiationConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateArpeggiationConfigType, model, updateType);
			case 'DutyConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateDutyConfigType, model, updateType);
			case 'RetriggerConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateRetriggerConfigType, model, updateType);
			case 'FlangerConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateFlangerConfigType, model, updateType);
			case 'LowPassFilterConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateLowPassFilterConfigType, model, updateType);
			case 'HighPassFilterConfigType':
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateHighPassFilterConfigType, model, updateType);
			default:
				var updateType = configType.a;
				return A2($author$project$Sfxr$updateMiscConfigType, model, updateType);
		}
	});
var $author$project$Sfxr$update = F2(
	function (msg, model) {
		var noop = _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		switch (msg.$) {
			case 'Noop':
				return noop;
			case 'SetHitHurt':
				var _v1 = $author$project$Sfxr$getRandomHitHurt(model.globalSeed);
				var newSoundConfig = _v1.a;
				var newSeed = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{globalSeed: newSeed, soundConfig: newSoundConfig}),
					$author$project$Sfxr$sfxrOut(
						$author$project$Sfxr$encodeSoundConfig(newSoundConfig)));
			case 'PlaySound':
				return _Utils_Tuple2(
					model,
					$author$project$Sfxr$sfxrOut(
						$author$project$Sfxr$encodeSoundConfig(model.soundConfig)));
			case 'FromPort':
				var str = msg.a;
				var _v2 = A2($elm$core$Debug$log, 'from port', str);
				return noop;
			default:
				var configType = msg.a;
				return A2($author$project$Sfxr$updateOnSliderChanged, model, configType);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'OnPageLoad':
				var time = msg.a;
				var lg = A2($elm$core$Debug$log, 'DEBUG: Page Loaded!', '');
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'Tick':
				var newTime = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{time: newTime}),
					$elm$core$Platform$Cmd$none);
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.page_info.key,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				var page_info = model.page_info;
				var newRoute = A2(
					$elm$core$Debug$log,
					'parsed Route',
					$author$project$Main$parseUrl(url));
				var new_model = _Utils_update(
					model,
					{
						page_info: _Utils_update(
							page_info,
							{route: newRoute, url: url})
					});
				var fragment = function () {
					if ((newRoute.$ === 'TabRoute') && (newRoute.b.$ === 'Just')) {
						var tab_type = newRoute.a;
						var hash = newRoute.b.a;
						var _v4 = A2($elm$core$Debug$log, 'Main.tab_type changed to ', tab_type);
						return hash;
					} else {
						return A2($elm$core$Debug$log, 'empty hash on UrlChanged', '');
					}
				}();
				return $author$project$Main$initCurrentPage(
					_Utils_Tuple2(new_model, $elm$core$Platform$Cmd$none));
			case 'ChangeTab':
				var new_tab = msg.a;
				var oldItemShopModel = model.item_shop_model;
				var newItemShopModel = _Utils_update(
					oldItemShopModel,
					{ai_updates_paused: true});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{current_tab: new_tab, item_shop_model: newItemShopModel}),
					$elm$core$Platform$Cmd$none);
			case 'SendToPort':
				var str = msg.a;
				return _Utils_Tuple2(
					model,
					$author$project$Main$test_port_sending('This is from elm'));
			case 'RequestJSONP':
				var str = msg.a;
				return _Utils_Tuple2(
					model,
					$author$project$Main$exec_jsonp('http://reddit.com/' + ('r/' + ('Games' + '/.json?jsonp=jsonpCallback'))));
			case 'RecvFromPort':
				var str = msg.a;
				return _Utils_Tuple2(
					A2($elm$core$Debug$log, 'Received from port: ' + str, model),
					$elm$core$Platform$Cmd$none);
			case 'GotItemShopMsg':
				var item_shop_msg = msg.a;
				var _v5 = A2($author$project$ItemShop$update, item_shop_msg, model.item_shop_model);
				var sub_model = _v5.a;
				var sub_cmd = _v5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{item_shop_model: sub_model}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$GotItemShopMsg, sub_cmd));
			default:
				var sfxrMsg = msg.a;
				var _v6 = A2($author$project$Sfxr$update, sfxrMsg, model.sfxrModel);
				var sub_model = _v6.a;
				var sub_cmd = _v6.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sfxrModel: sub_model}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$GotSfxrMsg, sub_cmd));
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $mdgriffith$elm_ui$Internal$Model$FocusStyleOption = function (a) {
	return {$: 'FocusStyleOption', a: a};
};
var $mdgriffith$elm_ui$Element$focusStyle = $mdgriffith$elm_ui$Internal$Model$FocusStyleOption;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $mdgriffith$elm_ui$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'ctr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', focusedWithin: 'focus-within', fullSize: 'fs', grid: 'g', hasBehind: 'hbh', heightContent: 'hc', heightExact: 'he', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', imageContainer: 'ic', inFront: 'fr', inputLabel: 'lbl', inputMultiline: 'iml', inputMultilineFiller: 'imlf', inputMultilineParent: 'imlp', inputMultilineWrapper: 'implw', inputText: 'it', italic: 'i', link: 'lnk', nearby: 'nb', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'ui', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sbt', single: 'e', sizeByCapital: 'cap', spaceEvenly: 'sev', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp', wrapped: 'wrp'};
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 'OnlyDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 'StaticRootAndDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsEl = {$: 'AsEl'};
var $mdgriffith$elm_ui$Internal$Model$asEl = $mdgriffith$elm_ui$Internal$Model$AsEl;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 'Generic'};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 'NoNearbyChildren'};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.column);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.grid);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.page);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.row);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 'AsColumn':
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 'AsEl':
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 'AsGrid':
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 'AsParagraph':
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var $mdgriffith$elm_ui$Internal$Model$asParagraph = $mdgriffith$elm_ui$Internal$Model$AsParagraph;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 'PaddingStyle':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'BorderWidth':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.row) + ('-' + ($elm$core$String$fromInt(pos.col) + ('-' + ($elm$core$String$fromInt(pos.width) + ('-' + $elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector.$) {
					case 'Focus':
						return 'fs';
					case 'Hover':
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.blur) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.size) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color))
				])));
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 'AllChildren', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Internal$Style$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Internal$Style$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Internal$Style$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[$mdgriffith$elm_ui$Internal$Style$Top, $mdgriffith$elm_ui$Internal$Style$Bottom, $mdgriffith$elm_ui$Internal$Style$Right, $mdgriffith$elm_ui$Internal$Style$Left, $mdgriffith$elm_ui$Internal$Style$CenterX, $mdgriffith$elm_ui$Internal$Style$CenterY]);
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(
					$mdgriffith$elm_ui$Internal$Style$Content(alignment)),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.seButton),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment.$) {
				case 'Top':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 'Bottom':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 'Right':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 'Left':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 'CenterX':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Internal$Style$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Internal$Style$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Internal$Style$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Internal$Style$OnRight = {$: 'OnRight'};
var $mdgriffith$elm_ui$Internal$Style$Within = {$: 'Within'};
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = $mdgriffith$elm_ui$Internal$Style$Above;
	var _v0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[$mdgriffith$elm_ui$Internal$Style$Above, $mdgriffith$elm_ui$Internal$Style$Below, $mdgriffith$elm_ui$Internal$Style$OnRight, $mdgriffith$elm_ui$Internal$Style$OnLeft, $mdgriffith$elm_ui$Internal$Style$Within, $mdgriffith$elm_ui$Internal$Style$Behind]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.imageContainer))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.root),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc.$) {
							case 'Above':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Below':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 'OnRight':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'OnLeft':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Within':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.wrapped),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorPointer),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.capturePointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transparent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.opaque),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transition),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbars),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderNone),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDashed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDotted),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderSolid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.link),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 'Bottom':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 'Right':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 'Left':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 'CenterX':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.page),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Left)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Right)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textThin),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textMedium),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textSemiBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textHeavy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.italic),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textUnitalicized),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustify),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustifyAll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textCenter),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textRight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLeft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'AllChildren':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.props;
		if (!_v2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0.a;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.others)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.mode;
	switch (_v0.$) {
		case 'Layout':
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 'NoStaticStyleSheet':
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 'Serif':
			return 'serif';
		case 'SansSerif':
			return 'sans-serif';
		case 'Monospace':
			return 'monospace';
		case 'Typeface':
			var name = font.a;
			return '\"' + (name + '\"');
		case 'ImportFont':
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.name;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return name === 'smcp';
		case 'VariantOff':
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.variants);
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 'Nothing') {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo.$) {
				case 'Hover':
					var _v2 = options.hover;
					switch (_v2.$) {
						case 'NoHover':
							return _List_Nil;
						case 'ForceHover':
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 'Focus':
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return '\"' + (name + '\"');
		case 'VariantOff':
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.variants)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 'Style':
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 'Shadows':
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 'Transparency':
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 'FontSize':
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 'FontFamily':
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 'Single':
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 'Colored':
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 'SpacingStyle':
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.single;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.row;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.wrapped + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.page;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.column;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.any;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 'PaddingStyle':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 'BorderWidth':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'GridTemplateStyle':
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 'Px':
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 'Content':
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 'Nothing') {
										if (_v2.b.$ === 'Nothing') {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 'Nothing') {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Fill':
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 'Nothing') {
										if (_v7.b.$ === 'Nothing') {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 'Nothing') {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Min':
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.spacing.a);
				var ySpacing = toGridLength(template.spacing.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.rows)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.columns)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 'GridPosition':
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.row) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.height) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.col) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.width) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.row) + (' / ' + ($elm$core$String$fromInt(position.row + position.height) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.col) + (' / ' + ($elm$core$String$fromInt(position.col + position.width) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.row) + ('-' + ($elm$core$String$fromInt(position.col) + ('-' + ($elm$core$String$fromInt(position.width) + ('-' + $elm$core$String$fromInt(position.height)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 'PseudoSelector':
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((_v12.a.$ === 'Just') && (_v12.b.$ === 'Just')) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fullSize, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {height: height / size, size: size, vertical: vertical};
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.capital, adjustment.baseline, adjustment.descender, adjustment.lowercase]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.descender,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.baseline,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.capital,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		capital: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		full: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.height)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.vertical) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.size) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 'Nothing') {
					if (face.$ === 'FontWith') {
						var _with = face.a;
						var _v2 = _with.adjustment;
						if (_v2.$ === 'Nothing') {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.full;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.capital;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 'ImportFont') {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 'FontFamily') {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					rules: _Utils_ap(
						rendered.rules,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					topLevel: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 'Nothing') {
							return rendered.topLevel;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.topLevel);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{rules: _List_Nil, topLevel: _List_Nil},
			stylesheet);
		var topLevel = _v0.topLevel;
		var rules = _v0.rules;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.mode;
		switch (_v0.$) {
			case 'Layout':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 'NoStaticStyleSheet':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return keyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return unkeyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A2(createNode, 'div', attributes);
				case 'NodeName':
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single))
									]))
							]));
			}
		}();
		switch (parentContext.$) {
			case 'AsRow':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthContent + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightContent)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFill + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightFill)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 'Keyed') {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children))),
						styles: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children))),
						styles: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 'ChildrenBehind', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 'ChildrenBehindAndInFront', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 'ChildrenInFront', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location.$) {
							case 'Above':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.above]));
							case 'Below':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.below]));
							case 'OnRight':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onRight]));
							case 'OnLeft':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onLeft]));
							case 'InFront':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.inFront]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.behind]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 'Empty':
							return $elm$virtual_dom$VirtualDom$text('');
						case 'Text':
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 'Unstyled':
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 'NoNearbyChildren':
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenBehind':
				var existingBehind = existing.a;
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenInFront':
				var existingInFront = existing.a;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'Right':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 'FullTransform', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 'Untransformed':
				switch (component.$) {
					case 'MoveX':
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 'MoveY':
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 'MoveZ':
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 'Moved':
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 'MoveY':
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 'MoveZ':
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 'MoveY':
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 'MoveZ':
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 'MoveXYZ':
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 'Rotate':
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 'Px':
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightContent,
				_List_Nil);
		case 'Fill':
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 'Px':
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthContent,
				_List_Nil);
		case 'Fill':
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 'Single') {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 'FontSize':
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 'PaddingStyle':
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 'Nothing') {
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: styles
					};
				} else {
					var _class = _v1.a;
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 'NoAttribute':
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Class':
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 'Attr':
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'StyleClass':
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 'TransformComponent':
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Width':
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 'Px':
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthContent),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Height':
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 'Px':
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightContent + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightFill + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Describe':
						var description = attribute.a;
						switch (description.$) {
							case 'Main':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Navigation':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'ContentInfo':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Complementary':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Heading':
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 'Paragraph':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Button':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Label':
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'LivePolite':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 'Nearby':
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 'Empty':
									return styles;
								case 'Text':
									var str = elem.a;
									return styles;
								case 'Unstyled':
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.styles);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'AlignX':
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x.$) {
									case 'CenterX':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 'Right':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y.$) {
									case 'CenterY':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 'Bottom':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 'Untransformed'};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = {$: 'AllowHover'};
var $mdgriffith$elm_ui$Internal$Model$Layout = {$: 'Layout'};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	backgroundColor: $elm$core$Maybe$Nothing,
	borderColor: $elm$core$Maybe$Nothing,
	shadow: $elm$core$Maybe$Just(
		{
			blur: 0,
			color: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _v4 = record.hover;
					if (_v4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _v5 = record.focus;
					if (_v5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.mode;
					if (_v6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _v0 = record.focus;
				if (_v0.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _v1 = record.hover;
				if (_v1.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$AllowHover;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _v2 = record.mode;
				if (_v2.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$Layout;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{focus: $elm$core$Maybe$Nothing, hover: $elm$core$Maybe$Nothing, mode: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.mode;
			if (_v0.$ === 'NoStaticStyleSheet') {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 'SansSerif'};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 'ImportFont':
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.name;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.options;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.root, $mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 'Empty'};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$ItemShop$ScrollViewport = {$: 'ScrollViewport'};
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Element$fromRgb = function (clr) {
	return A4($mdgriffith$elm_ui$Internal$Model$Rgba, clr.red, clr.green, clr.blue, clr.alpha);
};
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {alpha: a, blue: b, green: g, red: r};
};
var $author$project$Interface$convertColor = function (color) {
	return $mdgriffith$elm_ui$Element$fromRgb(
		$avh4$elm_color$Color$toRgba(color));
};
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$red = A4($avh4$elm_color$Color$RgbaSpace, 204 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Interface$color_danger = $author$project$Interface$convertColor($avh4$elm_color$Color$red);
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $avh4$elm_color$Color$darkCharcoal = A4($avh4$elm_color$Color$RgbaSpace, 46 / 255, 52 / 255, 54 / 255, 1.0);
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $author$project$ItemShop$defaultSolidColor = function (colorTheme) {
	if (colorTheme.$ === 'BrightTheme') {
		return $author$project$Interface$convertColor($avh4$elm_color$Color$white);
	} else {
		return $author$project$Interface$convertColor($avh4$elm_color$Color$darkCharcoal);
	}
};
var $author$project$ItemShop$defaultBackgroundColor = function (colorTheme) {
	return $mdgriffith$elm_ui$Element$Background$color(
		$author$project$ItemShop$defaultSolidColor(colorTheme));
};
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$findAtMost = _Regex_findAtMost;
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {$: 'InvalidRadix', a: a};
};
var $fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {$: 'InvalidChar', a: a};
};
var $fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {$: 'OutOfRange', a: a};
};
var $fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return $elm$core$Char$toCode(c) - $elm$core$Char$toCode(basis);
	});
var $fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = $elm$core$Char$toCode(c);
		return (_Utils_cmp(
			$elm$core$Char$toCode(lower),
			ci) < 1) && (_Utils_cmp(
			ci,
			$elm$core$Char$toCode(upper)) < 1);
	});
var $fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_Utils_cmp(i, radix) < 0) ? $elm$core$Result$Ok(i) : $elm$core$Result$Err(
				$fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('0'),
			_Utils_chr('9'),
			c) ? $elm$core$Result$Ok(
			A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('0'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('a'),
			_Utils_chr('z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('a'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('A'),
			_Utils_chr('Z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('A'),
				c)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2($elm$core$Result$andThen, validInt, toInt);
	});
var $fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _v0 = $elm$core$String$uncons(rstring);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Ok(0);
		} else {
			var _v1 = _v0.a;
			var c = _v1.a;
			var rest = _v1.b;
			return A2(
				$elm$core$Result$andThen,
				function (ci) {
					return A2(
						$elm$core$Result$andThen,
						function (ri) {
							return $elm$core$Result$Ok(ci + (ri * radix));
						},
						A2($fredcy$elm_parseint$ParseInt$parseIntR, radix, rest));
				},
				A2($fredcy$elm_parseint$ParseInt$intFromChar, radix, c));
		}
	});
var $elm$core$String$reverse = _String_reverse;
var $fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((2 <= radix) && (radix <= 36)) ? A2(
			$fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			$elm$core$String$reverse(string)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var $fredcy$elm_parseint$ParseInt$parseIntHex = $fredcy$elm_parseint$ParseInt$parseIntRadix(16);
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $noahzgordon$elm_color_extra$Color$Convert$roundToPlaces = F2(
	function (places, number) {
		var multiplier = A2($elm$core$Basics$pow, 10, places);
		return $elm$core$Basics$round(number * multiplier) / multiplier;
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $noahzgordon$elm_color_extra$Color$Convert$hexToColor = function () {
	var pattern = '' + ('^' + ('#?' + ('(?:' + ('(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))' + ('|' + ('(?:([a-f\\d])([a-f\\d])([a-f\\d]))' + ('|' + ('(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))' + ('|' + ('(?:([a-f\\d])([a-f\\d])([a-f\\d])([a-f\\d]))' + (')' + '$')))))))))));
	var extend = function (token) {
		var _v6 = $elm$core$String$toList(token);
		if (_v6.b && (!_v6.b.b)) {
			var token_ = _v6.a;
			return $elm$core$String$fromList(
				_List_fromArray(
					[token_, token_]));
		} else {
			return token;
		}
	};
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$String$toLower,
		A2(
			$elm$core$Basics$composeR,
			function (str) {
				return A2(
					$elm$core$Maybe$map,
					function (regex) {
						return A3($elm$regex$Regex$findAtMost, 1, regex, str);
					},
					$elm$regex$Regex$fromString(pattern));
			},
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$andThen($elm$core$List$head),
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$map(
						function ($) {
							return $.submatches;
						}),
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$map(
							$elm$core$List$filterMap($elm$core$Basics$identity)),
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Result$fromMaybe('Parsing hex regex failed'),
							$elm$core$Result$andThen(
								function (colors) {
									var _v0 = A2(
										$elm$core$List$map,
										A2(
											$elm$core$Basics$composeR,
											extend,
											A2(
												$elm$core$Basics$composeR,
												$fredcy$elm_parseint$ParseInt$parseIntHex,
												$elm$core$Result$map($elm$core$Basics$toFloat))),
										colors);
									_v0$2:
									while (true) {
										if (((((_v0.b && (_v0.a.$ === 'Ok')) && _v0.b.b) && (_v0.b.a.$ === 'Ok')) && _v0.b.b.b) && (_v0.b.b.a.$ === 'Ok')) {
											if (_v0.b.b.b.b) {
												if ((_v0.b.b.b.a.$ === 'Ok') && (!_v0.b.b.b.b.b)) {
													var r = _v0.a.a;
													var _v1 = _v0.b;
													var g = _v1.a.a;
													var _v2 = _v1.b;
													var b = _v2.a.a;
													var _v3 = _v2.b;
													var a = _v3.a.a;
													return $elm$core$Result$Ok(
														A4(
															$avh4$elm_color$Color$rgba,
															r / 255,
															g / 255,
															b / 255,
															A2($noahzgordon$elm_color_extra$Color$Convert$roundToPlaces, 2, a / 255)));
												} else {
													break _v0$2;
												}
											} else {
												var r = _v0.a.a;
												var _v4 = _v0.b;
												var g = _v4.a.a;
												var _v5 = _v4.b;
												var b = _v5.a.a;
												return $elm$core$Result$Ok(
													A3($avh4$elm_color$Color$rgb, r / 255, g / 255, b / 255));
											}
										} else {
											break _v0$2;
										}
									}
									return $elm$core$Result$Err('Parsing ints from hex failed');
								})))))));
}();
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $author$project$Interface$hex_to_color = function (hex_str) {
	var _v0 = $noahzgordon$elm_color_extra$Color$Convert$hexToColor(hex_str);
	if (_v0.$ === 'Ok') {
		var color = _v0.a;
		var rgba = $avh4$elm_color$Color$toRgba(color);
		return A3($mdgriffith$elm_ui$Element$rgb, rgba.red, rgba.green, rgba.blue);
	} else {
		var err = _v0.a;
		return A2(
			_Debug_todo(
				'Interface',
				{
					start: {line: 99, column: 13},
					end: {line: 99, column: 23}
				}),
			'NOOO',
			A3($mdgriffith$elm_ui$Element$rgb255, 255, 0, 0));
	}
};
var $author$project$ItemShop$defaultTextColor = function (colorTheme) {
	if (colorTheme.$ === 'BrightTheme') {
		return $author$project$Interface$convertColor($avh4$elm_color$Color$black);
	} else {
		return $author$project$Interface$hex_to_color('#ccc');
	}
};
var $author$project$ItemShop$defaultFontColor = function (colorTheme) {
	return $mdgriffith$elm_ui$Element$Font$color(
		$author$project$ItemShop$defaultTextColor(colorTheme));
};
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 'Content'};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$InFront = {$: 'InFront'};
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 'Nearby', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 'Empty') {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$InFront, element);
};
var $mdgriffith$elm_ui$Element$Lazy$embed = function (x) {
	switch (x.$) {
		case 'Unstyled':
			var html = x.a;
			return html;
		case 'Styled':
			var styled = x.a;
			return styled.html(
				A2(
					$mdgriffith$elm_ui$Internal$Model$OnlyDynamic,
					{
						focus: {backgroundColor: $elm$core$Maybe$Nothing, borderColor: $elm$core$Maybe$Nothing, shadow: $elm$core$Maybe$Nothing},
						hover: $mdgriffith$elm_ui$Internal$Model$AllowHover,
						mode: $mdgriffith$elm_ui$Internal$Model$Layout
					},
					styled.styles));
		case 'Text':
			var text = x.a;
			return $elm$core$Basics$always(
				$elm$virtual_dom$VirtualDom$text(text));
		default:
			return $elm$core$Basics$always(
				$elm$virtual_dom$VirtualDom$text(''));
	}
};
var $mdgriffith$elm_ui$Element$Lazy$apply1 = F2(
	function (fn, a) {
		return $mdgriffith$elm_ui$Element$Lazy$embed(
			fn(a));
	});
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $mdgriffith$elm_ui$Element$Lazy$lazy = F2(
	function (fn, a) {
		return $mdgriffith$elm_ui$Internal$Model$Unstyled(
			A3($elm$virtual_dom$VirtualDom$lazy3, $mdgriffith$elm_ui$Element$Lazy$apply1, fn, a));
	});
var $mdgriffith$elm_ui$Element$Lazy$apply2 = F3(
	function (fn, a, b) {
		return $mdgriffith$elm_ui$Element$Lazy$embed(
			A2(fn, a, b));
	});
var $elm$virtual_dom$VirtualDom$lazy4 = _VirtualDom_lazy4;
var $mdgriffith$elm_ui$Element$Lazy$lazy2 = F3(
	function (fn, a, b) {
		return $mdgriffith$elm_ui$Internal$Model$Unstyled(
			A4($elm$virtual_dom$VirtualDom$lazy4, $mdgriffith$elm_ui$Element$Lazy$apply2, fn, a, b));
	});
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 'Styled':
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.html, add, context));
							}),
						styles: styled.styles
					});
			case 'Unstyled':
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 'Text':
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $mdgriffith$elm_ui$Element$map = $mdgriffith$elm_ui$Internal$Model$map;
var $mdgriffith$elm_ui$Internal$Model$NoStaticStyleSheet = {$: 'NoStaticStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$RenderModeOption = function (a) {
	return {$: 'RenderModeOption', a: a};
};
var $mdgriffith$elm_ui$Element$noStaticStyleSheet = $mdgriffith$elm_ui$Internal$Model$RenderModeOption($mdgriffith$elm_ui$Internal$Model$NoStaticStyleSheet);
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Battle$ChangeLocation = function (a) {
	return {$: 'ChangeLocation', a: a};
};
var $author$project$Battle$Fight = {$: 'Fight'};
var $author$project$Battle$FindNewEnemy = {$: 'FindNewEnemy'};
var $author$project$Battle$Noop = {$: 'Noop'};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Left);
var $mdgriffith$elm_ui$Internal$Model$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Right);
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$Top);
var $author$project$Battle$attrNone = $mdgriffith$elm_ui$Element$htmlAttribute(
	$elm$html$Html$Attributes$class(''));
var $mdgriffith$elm_ui$Internal$Model$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$CenterX);
var $mdgriffith$elm_ui$Internal$Model$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$CenterY);
var $mdgriffith$elm_ui$Internal$Model$AsColumn = {$: 'AsColumn'};
var $mdgriffith$elm_ui$Internal$Model$asColumn = $mdgriffith$elm_ui$Internal$Model$AsColumn;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 'Button'};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorPointer);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.onPress;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.seButton + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.noTextSelection)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 'Nothing') {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$Interface$color_black = A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0);
var $avh4$elm_color$Color$lightRed = A4($avh4$elm_color$Color$RgbaSpace, 239 / 255, 41 / 255, 41 / 255, 1.0);
var $author$project$Interface$color_danger_bright = $author$project$Interface$convertColor($avh4$elm_color$Color$lightRed);
var $author$project$Interface$color_white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.textCenter);
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Hover = {$: 'Hover'};
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 'TransformComponent', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 'StyleClass':
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 'TransformComponent':
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			$mdgriffith$elm_ui$Internal$Model$Hover,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 'BorderWidth', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $author$project$Interface$common_button_attrs = function (_v0) {
	var font_color = _v0.font_color;
	var button_color = _v0.button_color;
	var hovered_button_color = _v0.hovered_button_color;
	var hovered_font_color = _v0.hovered_font_color;
	return _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$color(font_color),
			$mdgriffith$elm_ui$Element$Font$size(16),
			$mdgriffith$elm_ui$Element$Font$center,
			$mdgriffith$elm_ui$Element$padding(6),
			$mdgriffith$elm_ui$Element$Background$color(button_color),
			$mdgriffith$elm_ui$Element$Border$rounded(5),
			$mdgriffith$elm_ui$Element$Border$width(5),
			$mdgriffith$elm_ui$Element$Border$color(button_color),
			$mdgriffith$elm_ui$Element$mouseOver(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(hovered_button_color),
					$mdgriffith$elm_ui$Element$Border$color(hovered_button_color),
					$mdgriffith$elm_ui$Element$Font$color(
					A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0))
				]))
		]);
};
var $author$project$Interface$danger_button_custom = F3(
	function (custom_attrs, on_press, label) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_Utils_ap(
				$author$project$Interface$common_button_attrs(
					{button_color: $author$project$Interface$color_danger, font_color: $author$project$Interface$color_white, hovered_button_color: $author$project$Interface$color_danger_bright, hovered_font_color: $author$project$Interface$color_black}),
				custom_attrs),
			{
				label: label,
				onPress: $elm$core$Maybe$Just(on_press)
			});
	});
var $author$project$Interface$danger_button = F3(
	function (custom_attrs, on_press, label_str) {
		return A3(
			$author$project$Interface$danger_button_custom,
			custom_attrs,
			on_press,
			$mdgriffith$elm_ui$Element$text(label_str));
	});
var $author$project$Battle$debugMode = true;
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsRow = {$: 'AsRow'};
var $mdgriffith$elm_ui$Internal$Model$asRow = $mdgriffith$elm_ui$Internal$Model$AsRow;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Border$widthXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$borderWidth,
			A5(
				$mdgriffith$elm_ui$Internal$Model$BorderWidth,
				'b-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
				y,
				x,
				y,
				x));
	});
var $mdgriffith$elm_ui$Element$Border$widthEach = function (_v0) {
	var bottom = _v0.bottom;
	var top = _v0.top;
	var left = _v0.left;
	var right = _v0.right;
	return (_Utils_eq(top, bottom) && _Utils_eq(left, right)) ? (_Utils_eq(top, right) ? $mdgriffith$elm_ui$Element$Border$width(top) : A2($mdgriffith$elm_ui$Element$Border$widthXY, left, top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left))))))),
			top,
			right,
			bottom,
			left));
};
var $author$project$Battle$dividingLine = A2(
	$mdgriffith$elm_ui$Element$column,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			A2($mdgriffith$elm_ui$Element$paddingXY, 0, 20)
		]),
	_List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$centerX
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(1))
						]),
					_List_Nil),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(3)),
							$mdgriffith$elm_ui$Element$Border$widthEach(
							{bottom: 0, left: 0, right: 0, top: 1})
						]),
					_List_Nil),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(1))
						]),
					_List_Nil)
				]))
		]));
var $mdgriffith$elm_ui$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 'Min', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$minimum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Min, i, l);
	});
var $author$project$Battle$fillMin = function (pxWidth) {
	return A2($mdgriffith$elm_ui$Element$minimum, pxWidth, $mdgriffith$elm_ui$Element$fill);
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.top;
	var right = _v0.right;
	var bottom = _v0.bottom;
	var left = _v0.left;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 'Paragraph'};
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 'SpacingStyle', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $avh4$elm_color$Color$blue = A4($avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
var $author$project$Interface$color_primary = $author$project$Interface$convertColor($avh4$elm_color$Color$blue);
var $avh4$elm_color$Color$lightBlue = A4($avh4$elm_color$Color$RgbaSpace, 114 / 255, 159 / 255, 207 / 255, 1.0);
var $author$project$Interface$primary_color_bright = $author$project$Interface$convertColor($avh4$elm_color$Color$lightBlue);
var $author$project$Interface$primary_button_custom = F3(
	function (custom_attrs, on_press, label) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_Utils_ap(
				$author$project$Interface$common_button_attrs(
					{button_color: $author$project$Interface$color_primary, font_color: $author$project$Interface$color_white, hovered_button_color: $author$project$Interface$primary_color_bright, hovered_font_color: $author$project$Interface$color_black}),
				custom_attrs),
			{
				label: label,
				onPress: $elm$core$Maybe$Just(on_press)
			});
	});
var $author$project$Interface$primary_button = F3(
	function (custom_attrs, on_press, label) {
		return A3(
			$author$project$Interface$primary_button_custom,
			custom_attrs,
			on_press,
			$mdgriffith$elm_ui$Element$text(label));
	});
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $avh4$elm_color$Color$charcoal = A4($avh4$elm_color$Color$RgbaSpace, 85 / 255, 87 / 255, 83 / 255, 1.0);
var $author$project$Interface$color_secondary = $author$project$Interface$convertColor($avh4$elm_color$Color$charcoal);
var $author$project$Interface$secondary_button_custom = F3(
	function (custom_attrs, on_press, label) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_Utils_ap(
				$author$project$Interface$common_button_attrs(
					{button_color: $author$project$Interface$color_secondary, font_color: $author$project$Interface$color_white, hovered_button_color: $author$project$Interface$color_secondary, hovered_font_color: $author$project$Interface$color_black}),
				custom_attrs),
			{
				label: label,
				onPress: $elm$core$Maybe$Just(on_press)
			});
	});
var $author$project$Interface$secondary_button = F3(
	function (custom_attrs, on_press, label) {
		return A3(
			$author$project$Interface$secondary_button_custom,
			custom_attrs,
			on_press,
			$mdgriffith$elm_ui$Element$text(label));
	});
var $mdgriffith$elm_ui$Element$Font$underline = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.underline);
var $author$project$Battle$HealGolem = {$: 'HealGolem'};
var $author$project$Battle$LevelUpGolem = {$: 'LevelUpGolem'};
var $author$project$Battle$ReturnToShop = {$: 'ReturnToShop'};
var $author$project$Battle$ReviveGolem = {$: 'ReviveGolem'};
var $author$project$Battle$SendOutMsg = function (a) {
	return {$: 'SendOutMsg', a: a};
};
var $author$project$Battle$ToggleShowExpandedLogs = {$: 'ToggleShowExpandedLogs'};
var $author$project$Battle$ToggleShowLocationTypeMenu = {$: 'ToggleShowLocationTypeMenu'};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $author$project$Battle$canChangeLocation = F2(
	function (golem, enemyMonster) {
		var _v0 = _Utils_Tuple2(golem, enemyMonster);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'LivingMonster') {
				if (_v0.b.$ === 'Just') {
					if (_v0.b.a.$ === 'DeadMonster') {
						var livingGolem = _v0.a.a;
						var deadEnemy = _v0.b.a.a;
						return true;
					} else {
						break _v0$2;
					}
				} else {
					var livingGolem = _v0.a.a;
					var _v1 = _v0.b;
					return true;
				}
			} else {
				break _v0$2;
			}
		}
		return false;
	});
var $author$project$Battle$conditionalAlpha = F2(
	function (invisCondition, semiCondition) {
		return invisCondition ? 0.0 : (semiCondition ? 0.5 : 1.0);
	});
var $author$project$Battle$conditionalMsg = F2(
	function (condition, msg) {
		return condition ? msg : $author$project$Battle$Noop;
	});
var $mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 'Max', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var $author$project$Battle$fillMax = function (pxWidth) {
	return A2($mdgriffith$elm_ui$Element$maximum, pxWidth, $mdgriffith$elm_ui$Element$fill);
};
var $author$project$Battle$monsterHasXpToLevelUp = function (monster) {
	return _Utils_cmp(monster.xp, $author$project$Battle$levelUpXpCost) > -1;
};
var $author$project$Battle$monsterMap = F2(
	function (callback, damagedMonster) {
		if (damagedMonster.$ === 'LivingMonster') {
			var monster = damagedMonster.a;
			return callback(monster);
		} else {
			var monster = damagedMonster.a;
			return callback(monster);
		}
	});
var $author$project$Interface$outline_button_custom = F3(
	function (custom_attrs, on_press, label) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_Utils_ap(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_secondary),
						$mdgriffith$elm_ui$Element$Font$size(16),
						$mdgriffith$elm_ui$Element$Font$center,
						$mdgriffith$elm_ui$Element$padding(9),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Interface$color_white),
						$mdgriffith$elm_ui$Element$Border$rounded(5),
						$mdgriffith$elm_ui$Element$Border$width(2),
						$mdgriffith$elm_ui$Element$Border$color($author$project$Interface$color_secondary),
						$mdgriffith$elm_ui$Element$mouseOver(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Background$color($author$project$Interface$color_secondary),
								$mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_white)
							]))
					]),
				custom_attrs),
			{
				label: label,
				onPress: $elm$core$Maybe$Just(on_press)
			});
	});
var $author$project$Interface$outline_button = F3(
	function (custom_attrs, on_press, label) {
		return A3(
			$author$project$Interface$outline_button_custom,
			custom_attrs,
			on_press,
			$mdgriffith$elm_ui$Element$text(label));
	});
var $mdgriffith$elm_ui$Element$transparent = function (on) {
	return on ? A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2($mdgriffith$elm_ui$Internal$Model$Transparency, 'transparent', 1.0)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2($mdgriffith$elm_ui$Internal$Model$Transparency, 'visible', 0.0));
};
var $author$project$Battle$viewBattleControls = function (_v0) {
	var golem = _v0.golem;
	var player = _v0.player;
	var enemyMonster = _v0.enemyMonster;
	var golemRevivable = function () {
		if (golem.$ === 'LivingMonster') {
			return false;
		} else {
			return true;
		}
	}();
	var golemLevelupable = function () {
		if (golem.$ === 'LivingMonster') {
			return true;
		} else {
			return false;
		}
	}();
	var golemHealable = function () {
		if (golem.$ === 'LivingMonster') {
			var livingGolem = golem.a;
			return function (statHP) {
				return (statHP.curVal > 0) && (_Utils_cmp(statHP.curVal, statHP.maxVal) < 0);
			}(livingGolem.statHP);
		} else {
			return false;
		}
	}();
	var controlButton = F3(
		function (attrs, msg, txt) {
			return A3(
				$author$project$Interface$outline_button,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$centerX,
							$mdgriffith$elm_ui$Element$width(
							$author$project$Battle$fillMax(150))
						]),
					attrs),
				msg,
				txt);
		});
	var canChangeLocationNow = A2($author$project$Battle$canChangeLocation, golem, enemyMonster);
	var canAffordReviveGolem = _Utils_cmp(player.held_blood, $author$project$Battle$reviveGolemBloodCost) > -1;
	var canAffordHealGolem = _Utils_cmp(player.held_blood, $author$project$Battle$healGolemBloodCost) > -1;
	var canAffordGolemLevelUp = A2($author$project$Battle$monsterMap, $author$project$Battle$monsterHasXpToLevelUp, golem);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$width(
					$author$project$Battle$fillMax(150))
				]),
			A3(controlButton, _List_Nil, $author$project$Battle$ToggleShowExpandedLogs, 'Details')),
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$width(
					$author$project$Battle$fillMax(150)),
					$mdgriffith$elm_ui$Element$paddingEach(
					{bottom: 0, left: 0, right: 0, top: 10})
				]),
			A3(
				controlButton,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$transparent(!canChangeLocationNow)
					]),
				A2($author$project$Battle$conditionalMsg, canChangeLocationNow, $author$project$Battle$ToggleShowLocationTypeMenu),
				'Change Location')),
			A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(1),
					$mdgriffith$elm_ui$Element$padding(10)
				]),
			_List_fromArray(
				[
					A3(
					controlButton,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$alpha(
							A2($author$project$Battle$conditionalAlpha, !golemHealable, !canAffordHealGolem))
						]),
					A2($author$project$Battle$conditionalMsg, golemHealable && canAffordReviveGolem, $author$project$Battle$HealGolem),
					'Heal'),
					A3(
					controlButton,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$alpha(
							A2($author$project$Battle$conditionalAlpha, !golemRevivable, !canAffordReviveGolem))
						]),
					A2($author$project$Battle$conditionalMsg, golemRevivable && canAffordReviveGolem, $author$project$Battle$ReviveGolem),
					'Revive'),
					A3(
					controlButton,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$alpha(
							A2($author$project$Battle$conditionalAlpha, !golemLevelupable, !canAffordGolemLevelUp))
						]),
					A2($author$project$Battle$conditionalMsg, golemLevelupable && canAffordGolemLevelUp, $author$project$Battle$LevelUpGolem),
					'Strengthen'),
					A3(controlButton, _List_Nil, $author$project$Battle$Noop, 'Harden (No-op)')
				])),
			A3(
			$author$project$Interface$outline_button,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$width(
					$author$project$Battle$fillMax(150))
				]),
			$author$project$Battle$SendOutMsg($author$project$Battle$ReturnToShop),
			'Back')
		]);
};
var $author$project$Battle$viewSingleFightLog = F2(
	function (expandedLog, fightLog) {
		switch (fightLog.$) {
			case 'MonsterAttackedMonster':
				var attacker = fightLog.a.attacker;
				var defender = fightLog.a.defender;
				var attackerPower = fightLog.a.attackerPower;
				var defenderProtection = fightLog.a.defenderProtection;
				var damageTaken = fightLog.a.damageTaken;
				return expandedLog ? A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							attacker.name + (' attacked ' + (defender.name + (' for ' + ($elm$core$String$fromInt(damageTaken) + (' total damage. ' + ('(Power of ' + ($elm$core$String$fromInt(attackerPower) + (' - Protection of ' + ($elm$core$String$fromInt(defenderProtection) + ')'))))))))))
						])) : A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							attacker.name + (' attacked ' + (defender.name + (' for ' + ($elm$core$String$fromInt(damageTaken) + ' total damage.')))))
						]));
			case 'FoundNewMonster':
				var newMonster = fightLog.a;
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Found new monster: ' + newMonster.name)
						]));
			case 'GolemKilledMonster':
				var attacker = fightLog.a;
				var deadMonster = fightLog.b;
				var xp_gained = fightLog.c;
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							attacker.name + (' killed ' + (deadMonster.name + (', gaining ' + ($elm$core$String$fromInt(xp_gained) + (' XP' + (_Utils_eq(deadMonster.onDefeat, $author$project$Battle$DeliverItemToShop) ? ', and an item was put up for sale.' : '')))))))
						]));
			case 'MonsterKilledGolem':
				var golem = fightLog.a;
				var monster = fightLog.b;
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(monster.name + (' killed ' + (golem.name + '. You must now Revive your Golem.')))
						]));
			case 'PlayerHealedGolem':
				var amount = fightLog.a;
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							'You healed your creature by ' + ($elm$core$String$fromInt(amount) + ' HP.'))
						]));
			default:
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('You revived your creature.')
						]));
		}
	});
var $author$project$Battle$viewFightLog = F2(
	function (expandedLog, fightLogs) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(5)
				]),
			A2(
				$elm$core$List$map,
				$author$project$Battle$viewSingleFightLog(expandedLog),
				A2(
					$elm$core$List$take,
					10,
					$elm$core$List$reverse(fightLogs))));
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $mdgriffith$elm_ui$Internal$Model$Monospace = {$: 'Monospace'};
var $mdgriffith$elm_ui$Element$Font$monospace = $mdgriffith$elm_ui$Internal$Model$Monospace;
var $author$project$Interface$monospace = F2(
	function (attrs, el) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$Font$family(
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$Font$monospace])),
				attrs),
			el);
	});
var $author$project$Battle$padLeft = F2(
	function (str, num) {
		return A3(
			$elm$core$String$padLeft,
			num,
			_Utils_chr('\u2003'),
			str);
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $author$project$Battle$padRight = F2(
	function (str, num) {
		return A3(
			$elm$core$String$padRight,
			num,
			_Utils_chr('\u2003'),
			str);
	});
var $author$project$Battle$padStatStrBar = F2(
	function (leftNum, rightNum) {
		return A2($author$project$Battle$padLeft, leftNum, 3) + ('/' + A2($author$project$Battle$padRight, rightNum, 3));
	});
var $author$project$Battle$padStatBar = function (stat) {
	return A2(
		$author$project$Battle$padStatStrBar,
		$elm$core$String$fromInt(stat.curVal),
		$elm$core$String$fromInt(stat.maxVal));
};
var $author$project$Battle$viewMonsterInBattle = F2(
	function (damagedMonster, showExtra) {
		var viewMonster_ = F2(
			function (monster, isDead) {
				return A2(
					$mdgriffith$elm_ui$Element$column,
					_List_Nil,
					_Utils_ap(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$size(20)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text(monster.name)),
										showExtra ? A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$size(12)
											]),
										$mdgriffith$elm_ui$Element$text(
											' Lv. ' + $elm$core$String$fromInt(monster.level))) : $mdgriffith$elm_ui$Element$none
									])),
								isDead ? A2(
								$author$project$Interface$monospace,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$alignRight, $mdgriffith$elm_ui$Element$centerX]),
								$mdgriffith$elm_ui$Element$text('DEAD!')) : A2(
								$author$project$Interface$monospace,
								_List_Nil,
								$mdgriffith$elm_ui$Element$text(
									'HP: ' + $author$project$Battle$padStatBar(monster.statHP))),
								A2(
								$author$project$Interface$monospace,
								_List_Nil,
								$mdgriffith$elm_ui$Element$text(
									'SP: ' + $author$project$Battle$padStatBar(monster.statStamina))),
								A2(
								$author$project$Interface$monospace,
								_List_Nil,
								$mdgriffith$elm_ui$Element$text(
									'Pwr: ' + A2(
										$author$project$Battle$padLeft,
										$elm$core$String$fromInt(monster.statPower.curVal),
										5))),
								A2(
								$author$project$Interface$monospace,
								_List_Nil,
								$mdgriffith$elm_ui$Element$text(
									'Prt: ' + A2(
										$author$project$Battle$padLeft,
										$elm$core$String$fromInt(monster.statProtection.curVal),
										5)))
							]),
						showExtra ? _List_fromArray(
							[
								A2(
								$author$project$Interface$monospace,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(
									'XP: ' + A2(
										$author$project$Battle$padLeft,
										$elm$core$String$fromInt(monster.xp),
										6)))
							]) : _List_Nil));
			});
		if (damagedMonster.$ === 'LivingMonster') {
			var monster = damagedMonster.a;
			return A2(viewMonster_, monster, false);
		} else {
			var monster = damagedMonster.a;
			return A2(viewMonster_, monster, true);
		}
	});
var $author$project$Battle$view = function (model) {
	return (!model.shouldShowLocationTypeMenu) ? A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Font$size(16)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(24),
						$mdgriffith$elm_ui$Element$paddingEach(
						{bottom: 20, left: 0, right: 0, top: 0})
					]),
				$mdgriffith$elm_ui$Element$text('Battle!')),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$alignLeft,
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$px(200))
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$alignLeft]),
								A2($author$project$Battle$viewMonsterInBattle, model.golem, true))
							])),
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$spacing(10)
							]),
						_List_fromArray(
							[
								function () {
								var _v0 = function () {
									var _v1 = _Utils_Tuple2(model.golem, model.enemyMonster);
									if (_v1.a.$ === 'LivingMonster') {
										if (_v1.b.$ === 'Just') {
											if (_v1.b.a.$ === 'LivingMonster') {
												return _Utils_Tuple3($author$project$Interface$primary_button, $author$project$Battle$Fight, 'Continue Fight');
											} else {
												return _Utils_Tuple3($author$project$Interface$secondary_button, $author$project$Battle$FindNewEnemy, 'Find New Enemy');
											}
										} else {
											var _v2 = _v1.b;
											return _Utils_Tuple3($author$project$Interface$secondary_button, $author$project$Battle$FindNewEnemy, 'Find New Enemy');
										}
									} else {
										return _Utils_Tuple3($author$project$Interface$danger_button, $author$project$Battle$Noop, 'You\'re dead');
									}
								}();
								var buttonType = _v0.a;
								var msg = _v0.b;
								var txt = _v0.c;
								return A3(
									buttonType,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width(
											$author$project$Battle$fillMin(125)),
											_Utils_eq(msg, $author$project$Battle$Noop) ? $mdgriffith$elm_ui$Element$mouseOver(_List_Nil) : $author$project$Battle$attrNone
										]),
									msg,
									txt);
							}(),
								function () {
								var currentLocation = $author$project$Battle$getCurrentLocation(model);
								return A2(
									$mdgriffith$elm_ui$Element$column,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$centerX,
											$mdgriffith$elm_ui$Element$spacing(2)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$underline,
													$mdgriffith$elm_ui$Element$Font$size(10),
													$mdgriffith$elm_ui$Element$centerX
												]),
											$mdgriffith$elm_ui$Element$text('Current Location')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX]),
											$mdgriffith$elm_ui$Element$text(currentLocation.name)),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$underline,
													$mdgriffith$elm_ui$Element$Font$size(10),
													$mdgriffith$elm_ui$Element$centerX
												]),
											$mdgriffith$elm_ui$Element$text('Enemies Remaining')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX]),
											$mdgriffith$elm_ui$Element$text(
												$elm$core$String$fromInt(currentLocation.monstersLeft)))
										]));
							}()
							])),
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$alignRight,
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$px(200)),
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$alignRight,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
									]),
								function () {
									var _v3 = model.enemyMonster;
									if (_v3.$ === 'Just') {
										var enemyMonster = _v3.a;
										return A2($author$project$Battle$viewMonsterInBattle, enemyMonster, false);
									} else {
										return A2(
											$mdgriffith$elm_ui$Element$paragraph,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerY]),
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$text('Find an enemy to fight')
												]));
									}
								}())
							]))
					])),
				$author$project$Battle$dividingLine,
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$fillPortion(4)),
								$mdgriffith$elm_ui$Element$alignTop
							]),
						A2($author$project$Battle$viewFightLog, model.showExpandedLogs, model.fightLogs)),
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$fillPortion(2)),
								$mdgriffith$elm_ui$Element$alignTop
							]),
						$author$project$Battle$viewBattleControls(model))
					])),
				$author$project$Battle$debugMode ? A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						$author$project$Battle$dividingLine,
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 20)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$Font$underline]),
								$mdgriffith$elm_ui$Element$text('Debug')),
								$mdgriffith$elm_ui$Element$text(
								'Time Until SP Recharge: ' + $elm$core$String$fromInt($author$project$Battle$secondsRequiredForSpRefill - model.secondsWaitedSince.lastSpRefill)),
								$mdgriffith$elm_ui$Element$text(
								'Time Until Location Monster Refill: ' + $elm$core$String$fromInt($author$project$Battle$secondsRequiredForLocationMonsterRefill - model.secondsWaitedSince.lastLocationMonsterRefill))
							])),
						$author$project$Battle$dividingLine
					])) : $mdgriffith$elm_ui$Element$none
			])) : A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Font$size(16)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(24),
						$mdgriffith$elm_ui$Element$paddingEach(
						{bottom: 20, left: 0, right: 0, top: 0})
					]),
				$mdgriffith$elm_ui$Element$text('Choose LocationType')),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$padding(10)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text('You may choose a new LocationType to visit.')
					])),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$padding(10)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text('A new LocationType contains new monsters to fight, which may bring new rewards!')
					])),
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$spacing(10),
						$mdgriffith$elm_ui$Element$padding(10)
					]),
				A2(
					$elm$core$List$map,
					function (location) {
						return A3(
							$author$project$Interface$secondary_button_custom,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							$author$project$Battle$ChangeLocation(location.locationId),
							A2(
								$mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$spacing(5)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$centerX]),
										$mdgriffith$elm_ui$Element$text(location.name)),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$Font$size(12)
											]),
										A2(
											$mdgriffith$elm_ui$Element$column,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$Font$underline,
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
														]),
													$mdgriffith$elm_ui$Element$text('Monsters Remain')),
													A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[$mdgriffith$elm_ui$Element$centerX]),
													$mdgriffith$elm_ui$Element$text(
														$elm$core$String$fromInt(location.monstersLeft)))
												])))
									])));
					},
					$author$project$Battle$getLocationsList(model.locations)))
			]));
};
var $mdgriffith$elm_ui$Internal$Model$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Element$alignBottom = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$Bottom);
var $mdgriffith$elm_ui$Element$Font$alignRight = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.textRight);
var $author$project$Interface$color_ultra_light_grey = A3($mdgriffith$elm_ui$Element$rgb, 0.95, 0.95, 0.95);
var $avh4$elm_color$Color$lightCharcoal = A4($avh4$elm_color$Color$RgbaSpace, 136 / 255, 138 / 255, 133 / 255, 1.0);
var $author$project$Interface$noUserSelect = $mdgriffith$elm_ui$Element$htmlAttribute(
	A2($elm$html$Html$Attributes$style, 'userSelect', 'none'));
var $author$project$Interface$pointerEventsAll = $mdgriffith$elm_ui$Element$htmlAttribute(
	A2($elm$html$Html$Attributes$style, 'pointer-events', 'all'));
var $author$project$Interface$pointerEventsNone = $mdgriffith$elm_ui$Element$htmlAttribute(
	A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'));
var $author$project$Interface$font_blood = $mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_danger);
var $author$project$Interface$renderBlood_sized = F3(
	function (colorTheme, count, font_size) {
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_Nil,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(
					$elm$core$String$fromInt(count)),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$size(font_size),
							$author$project$Interface$font_blood
						]),
					$mdgriffith$elm_ui$Element$text('blood'))
				]));
	});
var $author$project$Interface$renderBlood = F2(
	function (colorTheme, count) {
		return A3($author$project$Interface$renderBlood_sized, colorTheme, count, 12);
	});
var $author$project$Interface$color_grey = A3($mdgriffith$elm_ui$Element$rgb, 0.35, 0.35, 0.35);
var $author$project$Interface$font_grey = $mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_grey);
var $author$project$Interface$render_gp_sized = F3(
	function (colorTheme, count, font_size) {
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_Nil,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(
					$elm$core$String$fromInt(count)),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$size(font_size),
							function () {
							if (colorTheme.$ === 'BrightTheme') {
								return $author$project$Interface$font_grey;
							} else {
								return $mdgriffith$elm_ui$Element$Font$color(
									$author$project$Interface$hex_to_color('#777439'));
							}
						}()
						]),
					$mdgriffith$elm_ui$Element$text('gp'))
				]));
	});
var $author$project$Interface$render_gp = F2(
	function (colorTheme, count) {
		return A3($author$project$Interface$render_gp_sized, colorTheme, count, 12);
	});
var $author$project$ItemShop$ToggleShowDebugInventories = {$: 'ToggleShowDebugInventories'};
var $author$project$Interface$defineHtmlId = function (name) {
	return $mdgriffith$elm_ui$Element$htmlAttribute(
		$elm$html$Html$Attributes$id(name));
};
var $author$project$ItemShop$showHideDebugInventoriesButton = F2(
	function (attrs, show_debug_inventories) {
		var buttonText = show_debug_inventories ? 'Hide Debug' : 'Show Debug';
		return A3(
			$author$project$Interface$danger_button,
			A2(
				$elm$core$List$cons,
				$author$project$Interface$defineHtmlId('show_debug_inventories'),
				attrs),
			$author$project$ItemShop$ToggleShowDebugInventories,
			buttonText);
	});
var $author$project$ItemShop$viewOverlay = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		$mdgriffith$elm_ui$Element$none,
		A2(
			$elm$core$Maybe$map,
			function (player) {
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(12),
							$author$project$Interface$pointerEventsNone,
							$mdgriffith$elm_ui$Element$padding(1),
							$mdgriffith$elm_ui$Element$inFront(
							model.shouldDisplayShowDebugInventoriesOverlay ? A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$padding(10)
									]),
								A2(
									$author$project$ItemShop$showHideDebugInventoriesButton,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
										]),
									model.show_debug_inventories)) : $mdgriffith$elm_ui$Element$none)
						]),
					A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$alignRight,
								$mdgriffith$elm_ui$Element$alignRight,
								$mdgriffith$elm_ui$Element$alignBottom,
								$author$project$ItemShop$defaultBackgroundColor(model.colorTheme),
								$mdgriffith$elm_ui$Element$Border$color(
								function () {
									var _v0 = model.colorTheme;
									if (_v0.$ === 'BrightTheme') {
										return $author$project$Interface$color_ultra_light_grey;
									} else {
										return $author$project$Interface$convertColor($avh4$elm_color$Color$lightCharcoal);
									}
								}()),
								$mdgriffith$elm_ui$Element$Border$width(1),
								$mdgriffith$elm_ui$Element$Border$rounded(3),
								$author$project$Interface$pointerEventsAll,
								$mdgriffith$elm_ui$Element$padding(10)
							]),
						A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[$author$project$Interface$noUserSelect]),
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$text('Held: '),
									A2($author$project$Interface$render_gp, model.colorTheme, player.held_gold),
									$mdgriffith$elm_ui$Element$text(' '),
									A2($author$project$Interface$renderBlood, model.colorTheme, player.held_blood)
								]))));
			},
			$author$project$ItemShop$getPlayer(model)));
};
var $author$project$ItemShop$ChangeTabType = function (a) {
	return {$: 'ChangeTabType', a: a};
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $mdgriffith$elm_ui$Element$link = F2(
	function (attrs, _v0) {
		var url = _v0.url;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$NodeName('a'),
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Attributes$href(url)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$Attr(
						$elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.link)))),
								attrs))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$ItemShop$item_type_to_pretty_string = function (item_type) {
	switch (item_type.$) {
		case 'Weapon':
			return 'Weapon';
		case 'Armor':
			return 'Armor';
		case 'Spellbook':
			return 'Spellbook';
		case 'Furniture':
			return 'Furniture';
		default:
			return 'Food';
	}
};
var $mdgriffith$elm_ui$Element$spacingXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$spacing,
			A3(
				$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
				A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, y),
				x,
				y));
	});
var $author$project$ItemShop$render_item_db_item = F2(
	function (colorTheme, _v0) {
		var item = _v0.item;
		var trade_stats = _v0.trade_stats;
		var is_unlocked = _v0.is_unlocked;
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					A2($mdgriffith$elm_ui$Element$maximum, 150, $mdgriffith$elm_ui$Element$fill)),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(item.name),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$size(12)
						]),
					_List_fromArray(
						[
							is_unlocked ? $mdgriffith$elm_ui$Element$none : A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_primary)
								]),
							$mdgriffith$elm_ui$Element$text('LOCKED'))
						])),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(14),
							A2($mdgriffith$elm_ui$Element$spacingXY, 10, 0)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							$author$project$ItemShop$item_type_to_pretty_string(item.item_type)),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							A2($author$project$Interface$render_gp, colorTheme, item.raw_gold_cost))
						])),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(12)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Num Bought: '),
							A2(
							$author$project$Interface$monospace,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$mdgriffith$elm_ui$Element$text(
								A3(
									$elm$core$String$padLeft,
									3,
									_Utils_chr('\u2003'),
									$elm$core$String$fromInt(trade_stats.times_you_bought))))
						])),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(12)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Num Sold: '),
							A2(
							$author$project$Interface$monospace,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$mdgriffith$elm_ui$Element$text(
								A3(
									$elm$core$String$padLeft,
									3,
									_Utils_chr('\u2003'),
									$elm$core$String$fromInt(trade_stats.times_you_sold))))
						])),
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(12)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Others\' Trades: '),
							A2(
							$author$project$Interface$monospace,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$mdgriffith$elm_ui$Element$text(
								A3(
									$elm$core$String$padLeft,
									3,
									_Utils_chr('\u2003'),
									$elm$core$String$fromInt(trade_stats.times_others_traded))))
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$Padding = F5(
	function (a, b, c, d, e) {
		return {$: 'Padding', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Model$Spaced = F3(
	function (a, b, c) {
		return {$: 'Spaced', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, _v0) {
				var pad = _v0.a;
				var spacing = _v0.b;
				return _Utils_Tuple2(
					function () {
						if (pad.$ === 'Just') {
							var x = pad.a;
							return pad;
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
								var _v3 = attr.b;
								var name = _v3.a;
								var t = _v3.b;
								var r = _v3.c;
								var b = _v3.d;
								var l = _v3.e;
								return $elm$core$Maybe$Just(
									A5($mdgriffith$elm_ui$Internal$Model$Padding, name, t, r, b, l));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}(),
					function () {
						if (spacing.$ === 'Just') {
							var x = spacing.a;
							return spacing;
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
								var _v6 = attr.b;
								var name = _v6.a;
								var x = _v6.b;
								var y = _v6.c;
								return $elm$core$Maybe$Just(
									A3($mdgriffith$elm_ui$Internal$Model$Spaced, name, x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}());
			}),
		_Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
		attrs);
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $mdgriffith$elm_ui$Element$wrappedRow = F2(
	function (attrs, children) {
		var _v0 = $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding(attrs);
		var padded = _v0.a;
		var spaced = _v0.b;
		if (spaced.$ === 'Nothing') {
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asRow,
				$mdgriffith$elm_ui$Internal$Model$div,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							attrs))),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
		} else {
			var _v2 = spaced.a;
			var spaceName = _v2.a;
			var x = _v2.b;
			var y = _v2.c;
			var newPadding = function () {
				if (padded.$ === 'Just') {
					var _v5 = padded.a;
					var name = _v5.a;
					var t = _v5.b;
					var r = _v5.c;
					var b = _v5.d;
					var l = _v5.e;
					if ((_Utils_cmp(r, x / 2) > -1) && (_Utils_cmp(b, y / 2) > -1)) {
						var newTop = t - (y / 2);
						var newRight = r - (x / 2);
						var newLeft = l - (x / 2);
						var newBottom = b - (y / 2);
						return $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, newRight, newBottom, newLeft),
									newTop,
									newRight,
									newBottom,
									newLeft)));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}();
			if (newPadding.$ === 'Just') {
				var pad = newPadding.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asRow,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
								_Utils_ap(
									attrs,
									_List_fromArray(
										[pad]))))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
			} else {
				var halfY = -(y / 2);
				var halfX = -(x / 2);
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					attrs,
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asRow,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											A2(
												$elm$html$Html$Attributes$style,
												'margin',
												$elm$core$String$fromFloat(halfY) + ('px' + (' ' + ($elm$core$String$fromFloat(halfX) + 'px'))))),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Internal$Model$Attr(
												A2(
													$elm$html$Html$Attributes$style,
													'width',
													'calc(100% + ' + ($elm$core$String$fromInt(x) + 'px)'))),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$Attr(
													A2(
														$elm$html$Html$Attributes$style,
														'height',
														'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))),
												A2(
													$elm$core$List$cons,
													A2(
														$mdgriffith$elm_ui$Internal$Model$StyleClass,
														$mdgriffith$elm_ui$Internal$Flag$spacing,
														A3($mdgriffith$elm_ui$Internal$Model$SpacingStyle, spaceName, x, y)),
													_List_Nil))))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(children))
							])));
			}
		}
	});
var $author$project$ItemShop$view_items_unlocked_tab_type = F2(
	function (colorTheme, item_db) {
		var render_item_grid = A2(
			$elm$core$Basics$composeR,
			$elm$core$List$map(
				$author$project$ItemShop$render_item_db_item(colorTheme)),
			$mdgriffith$elm_ui$Element$wrappedRow(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$spacing(20)
					])));
		var filterItemDb = function (filterFn) {
			return A2(
				$elm$core$List$filter,
				filterFn,
				$elm$core$Dict$values(item_db));
		};
		var back_btn = A2(
			$mdgriffith$elm_ui$Element$link,
			_List_Nil,
			{
				label: A3(
					$author$project$Interface$danger_button,
					_List_Nil,
					$author$project$ItemShop$ChangeTabType($author$project$ItemShop$ShopTabType),
					'Back to Shop'),
				url: '#shop'
			});
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$padding(20)
				]),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text('Item Codex'),
					back_btn,
					render_item_grid(
					filterItemDb(
						function ($) {
							return $.is_unlocked;
						})),
					render_item_grid(
					filterItemDb(
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$not,
							function ($) {
								return $.is_unlocked;
							})))
				]));
	});
var $author$project$ItemShop$CharacterItems = {$: 'CharacterItems'};
var $author$project$ItemShop$InventoryItems = {$: 'InventoryItems'};
var $author$project$ItemShop$ShopItems = {$: 'ShopItems'};
var $author$project$ItemShop$ToggleColorTheme = {$: 'ToggleColorTheme'};
var $author$project$ItemShop$ToggleShowMainChart = {$: 'ToggleShowMainChart'};
var $author$project$ItemShop$OnTrendChartHover = function (a) {
	return {$: 'OnTrendChartHover', a: a};
};
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $terezka$elm_charts$Chart$Attributes$centerAt = F2(
	function (v, axis) {
		var full = axis.max - axis.min;
		return _Utils_update(
			axis,
			{max: v + (full / 2), min: v - (full / 2)});
	});
var $terezka$elm_charts$Internal$Svg$Event = F2(
	function (name, handler) {
		return {handler: handler, name: name};
	});
var $terezka$elm_charts$Internal$Helpers$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$clipPath = $elm$svg$Svg$trustedNode('clipPath');
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $debois$elm_dom$DOM$offsetHeight = A2($elm$json$Json$Decode$field, 'offsetHeight', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$map4 = _Json_map4;
var $debois$elm_dom$DOM$offsetLeft = A2($elm$json$Json$Decode$field, 'offsetLeft', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'offsetParent',
					$elm$json$Json$Decode$null(x)),
					A2($elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var $debois$elm_dom$DOM$offsetTop = A2($elm$json$Json$Decode$field, 'offsetTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollLeft = A2($elm$json$Json$Decode$field, 'scrollLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollTop = A2($elm$json$Json$Decode$field, 'scrollTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				var x_ = _v0.a;
				var y_ = _v0.b;
				return A2(
					$debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2($debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				$elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				$debois$elm_dom$DOM$scrollLeft,
				$debois$elm_dom$DOM$scrollTop,
				$debois$elm_dom$DOM$offsetLeft,
				$debois$elm_dom$DOM$offsetTop));
	});
var $debois$elm_dom$DOM$boundingClientRect = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (_v0, width, height) {
			var x = _v0.a;
			var y = _v0.b;
			return {height: height, left: x, top: y, width: width};
		}),
	A2($debois$elm_dom$DOM$position, 0, 0),
	$debois$elm_dom$DOM$offsetWidth,
	$debois$elm_dom$DOM$offsetHeight);
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'parentElement', decoder);
};
function $terezka$elm_charts$Internal$Svg$cyclic$decodePosition() {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$debois$elm_dom$DOM$boundingClientRect,
				$elm$json$Json$Decode$lazy(
				function (_v0) {
					return $debois$elm_dom$DOM$parentElement(
						$terezka$elm_charts$Internal$Svg$cyclic$decodePosition());
				})
			]));
}
try {
	var $terezka$elm_charts$Internal$Svg$decodePosition = $terezka$elm_charts$Internal$Svg$cyclic$decodePosition();
	$terezka$elm_charts$Internal$Svg$cyclic$decodePosition = function () {
		return $terezka$elm_charts$Internal$Svg$decodePosition;
	};
} catch ($) {
	throw 'Some top-level definitions from `Internal.Svg` are causing infinite recursion:\n\n  ┌─────┐\n  │    decodePosition\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $terezka$elm_charts$Internal$Coordinates$innerLength = function (axis) {
	return A2($elm$core$Basics$max, 1, (axis.length - axis.marginMin) - axis.marginMax);
};
var $terezka$elm_charts$Internal$Coordinates$innerWidth = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.x);
};
var $terezka$elm_charts$Internal$Coordinates$range = function (axis) {
	var diff = axis.max - axis.min;
	return (diff > 0) ? diff : 1;
};
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.x)) / $terezka$elm_charts$Internal$Coordinates$innerWidth(plane);
	});
var $terezka$elm_charts$Internal$Coordinates$toCartesianX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, value - plane.x.marginMin) + plane.x.min;
	});
var $terezka$elm_charts$Internal$Coordinates$innerHeight = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.y);
};
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.y)) / $terezka$elm_charts$Internal$Coordinates$innerHeight(plane);
	});
var $terezka$elm_charts$Internal$Coordinates$toCartesianY = F2(
	function (plane, value) {
		return ($terezka$elm_charts$Internal$Coordinates$range(plane.y) - A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, value - plane.y.marginMin)) + plane.y.min;
	});
var $terezka$elm_charts$Internal$Svg$fromSvg = F2(
	function (plane, point) {
		return {
			x: A2($terezka$elm_charts$Internal$Coordinates$toCartesianX, plane, point.x),
			y: A2($terezka$elm_charts$Internal$Coordinates$toCartesianY, plane, point.y)
		};
	});
var $debois$elm_dom$DOM$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $terezka$elm_charts$Internal$Svg$decoder = F2(
	function (plane, toMsg) {
		var handle = F3(
			function (mouseX, mouseY, box) {
				var yPrev = plane.y;
				var xPrev = plane.x;
				var widthPercent = box.width / plane.x.length;
				var heightPercent = box.height / plane.y.length;
				var newPlane = _Utils_update(
					plane,
					{
						x: _Utils_update(
							xPrev,
							{length: box.width, marginMax: plane.x.marginMax * widthPercent, marginMin: plane.x.marginMin * widthPercent}),
						y: _Utils_update(
							yPrev,
							{length: box.height, marginMax: plane.y.marginMax * heightPercent, marginMin: plane.y.marginMin * heightPercent})
					});
				var searched = A2(
					$terezka$elm_charts$Internal$Svg$fromSvg,
					newPlane,
					{x: mouseX - box.left, y: mouseY - box.top});
				return A2(toMsg, newPlane, searched);
			});
		return A4(
			$elm$json$Json$Decode$map3,
			handle,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			$debois$elm_dom$DOM$target($terezka$elm_charts$Internal$Svg$decodePosition));
	});
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $terezka$elm_charts$Internal$Coordinates$toId = function (plane) {
	var numToStr = A2(
		$elm$core$Basics$composeR,
		$elm$core$String$fromFloat,
		A2($elm$core$String$replace, '.', '-'));
	return A2(
		$elm$core$String$join,
		'_',
		_List_fromArray(
			[
				'elm-charts__id',
				numToStr(plane.x.length),
				numToStr(plane.x.min),
				numToStr(plane.x.max),
				numToStr(plane.x.marginMin),
				numToStr(plane.x.marginMax),
				numToStr(plane.y.length),
				numToStr(plane.y.min),
				numToStr(plane.y.max),
				numToStr(plane.y.marginMin),
				numToStr(plane.y.marginMax)
			]));
};
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $terezka$elm_charts$Internal$Svg$container = F5(
	function (plane, config, below, chartEls, above) {
		var toEvent = function (event) {
			return A2(
				$elm$svg$Svg$Events$on,
				event.name,
				A2($terezka$elm_charts$Internal$Svg$decoder, plane, event.handler));
		};
		var svgAttrsSize = config.responsive ? _List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromFloat(plane.x.length) + (' ' + $elm$core$String$fromFloat(plane.y.length)))),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]) : _List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(plane.x.length)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(plane.y.length)),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]);
		var htmlAttrsSize = config.responsive ? _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%')
			]) : _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$elm$core$String$fromFloat(plane.x.length) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$elm$core$String$fromFloat(plane.y.length) + 'px')
			]);
		var htmlAttrsDef = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-charts__container-inner')
			]);
		var htmlAttrs = _Utils_ap(
			config.htmlAttrs,
			_Utils_ap(htmlAttrsDef, htmlAttrsSize));
		var chartPosition = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(plane.x.marginMin)),
				$elm$svg$Svg$Attributes$y(
				$elm$core$String$fromFloat(plane.y.marginMin)),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerWidth(plane))),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerHeight(plane))),
				$elm$svg$Svg$Attributes$fill('transparent')
			]);
		var clipPathDefs = A2(
			$elm$svg$Svg$defs,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$clipPath,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$id(
							$terezka$elm_charts$Internal$Coordinates$toId(plane))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$rect, chartPosition, _List_Nil)
						]))
				]));
		var catcher = A2(
			$elm$svg$Svg$rect,
			_Utils_ap(
				chartPosition,
				A2($elm$core$List$map, toEvent, config.events)),
			_List_Nil);
		var chart = A2(
			$elm$svg$Svg$svg,
			_Utils_ap(svgAttrsSize, config.attrs),
			_Utils_ap(
				_List_fromArray(
					[clipPathDefs]),
				_Utils_ap(
					chartEls,
					_List_fromArray(
						[catcher]))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('elm-charts__container'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					htmlAttrs,
					_Utils_ap(
						below,
						_Utils_ap(
							_List_fromArray(
								[chart]),
							above)))
				]));
	});
var $terezka$elm_charts$Internal$Coordinates$Position = F4(
	function (x1, x2, y1, y2) {
		return {x1: x1, x2: x2, y1: y1, y2: y2};
	});
var $terezka$elm_charts$Internal$Coordinates$foldPosition = F2(
	function (func, data) {
		var fold = F2(
			function (datum, posM) {
				if (posM.$ === 'Just') {
					var pos = posM.a;
					return $elm$core$Maybe$Just(
						{
							x1: A2(
								$elm$core$Basics$min,
								func(datum).x1,
								pos.x1),
							x2: A2(
								$elm$core$Basics$max,
								func(datum).x2,
								pos.x2),
							y1: A2(
								$elm$core$Basics$min,
								func(datum).y1,
								pos.y1),
							y2: A2(
								$elm$core$Basics$max,
								func(datum).y2,
								pos.y2)
						});
				} else {
					return $elm$core$Maybe$Just(
						func(datum));
				}
			});
		return A2(
			$elm$core$Maybe$withDefault,
			A4($terezka$elm_charts$Internal$Coordinates$Position, 0, 0, 0, 0),
			A3($elm$core$List$foldl, fold, $elm$core$Maybe$Nothing, data));
	});
var $terezka$elm_charts$Chart$Attributes$lowest = F3(
	function (v, edit, b) {
		return _Utils_update(
			b,
			{
				min: A3(edit, v, b.min, b.dataMin)
			});
	});
var $terezka$elm_charts$Chart$Attributes$orLower = F3(
	function (least, real, _v0) {
		return (_Utils_cmp(real, least) > 0) ? least : real;
	});
var $terezka$elm_charts$Chart$definePlane = F2(
	function (config, elements) {
		var width = A2($elm$core$Basics$max, 1, (config.width - config.padding.left) - config.padding.right);
		var toLimit = F5(
			function (length, marginMin, marginMax, min, max) {
				return {dataMax: max, dataMin: min, length: length, marginMax: marginMax, marginMin: marginMin, max: max, min: min};
			});
		var height = A2($elm$core$Basics$max, 1, (config.height - config.padding.bottom) - config.padding.top);
		var fixSingles = function (bs) {
			return _Utils_eq(bs.min, bs.max) ? _Utils_update(
				bs,
				{max: bs.min + 10}) : bs;
		};
		var collectLimits = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 'BarsElement':
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 'CustomElement':
						return acc;
					case 'AxisElement':
						return acc;
					case 'TicksElement':
						return acc;
					case 'TickElement':
						return acc;
					case 'LabelsElement':
						return acc;
					case 'LabelElement':
						return acc;
					case 'GridElement':
						return acc;
					case 'SubElements':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, collectLimits, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		var limits_ = function (pos) {
			return function (_v3) {
				var x = _v3.x;
				var y = _v3.y;
				return {
					x: fixSingles(x),
					y: fixSingles(y)
				};
			}(
				{
					x: A5(toLimit, width, config.margin.left, config.margin.right, pos.x1, pos.x2),
					y: A5(toLimit, height, config.margin.top, config.margin.bottom, pos.y1, pos.y2)
				});
		}(
			A2(
				$terezka$elm_charts$Internal$Coordinates$foldPosition,
				$elm$core$Basics$identity,
				A3($elm$core$List$foldl, collectLimits, _List_Nil, elements)));
		var calcRange = function () {
			var _v2 = config.range;
			if (!_v2.b) {
				return limits_.x;
			} else {
				var some = _v2;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.x,
					some);
			}
		}();
		var calcDomain = function () {
			var _v1 = config.domain;
			if (!_v1.b) {
				return A3($terezka$elm_charts$Chart$Attributes$lowest, 0, $terezka$elm_charts$Chart$Attributes$orLower, limits_.y);
			} else {
				var some = _v1;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.y,
					some);
			}
		}();
		var unpadded = {x: calcRange, y: calcDomain};
		var scalePadX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX(unpadded);
		var xMax = calcRange.max + scalePadX(config.padding.right);
		var xMin = calcRange.min - scalePadX(config.padding.left);
		var scalePadY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY(unpadded);
		var yMax = calcDomain.max + scalePadY(config.padding.top);
		var yMin = calcDomain.min - scalePadY(config.padding.bottom);
		return {
			x: _Utils_update(
				calcRange,
				{
					length: config.width,
					max: A2($elm$core$Basics$max, xMin, xMax),
					min: A2($elm$core$Basics$min, xMin, xMax)
				}),
			y: _Utils_update(
				calcDomain,
				{
					length: config.height,
					max: A2($elm$core$Basics$max, yMin, yMax),
					min: A2($elm$core$Basics$min, yMin, yMax)
				})
		};
	});
var $terezka$elm_charts$Chart$getItems = F2(
	function (plane, elements) {
		var toItems = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						var items = el.b;
						return _Utils_ap(acc, items);
					case 'BarsElement':
						var items = el.b;
						return _Utils_ap(acc, items);
					case 'CustomElement':
						var item = el.a;
						return _Utils_ap(
							acc,
							_List_fromArray(
								[item]));
					case 'AxisElement':
						var func = el.a;
						return acc;
					case 'TicksElement':
						return acc;
					case 'TickElement':
						return acc;
					case 'LabelsElement':
						return acc;
					case 'LabelElement':
						return acc;
					case 'GridElement':
						return acc;
					case 'SubElements':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, toItems, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		return A3($elm$core$List$foldl, toItems, _List_Nil, elements);
	});
var $terezka$elm_charts$Chart$getLegends = function (elements) {
	var toLegends = F2(
		function (el, acc) {
			switch (el.$) {
				case 'Indexed':
					return acc;
				case 'SeriesElement':
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 'BarsElement':
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 'CustomElement':
					return acc;
				case 'AxisElement':
					return acc;
				case 'TicksElement':
					return acc;
				case 'TickElement':
					return acc;
				case 'LabelsElement':
					return acc;
				case 'LabelElement':
					return acc;
				case 'GridElement':
					return acc;
				case 'SubElements':
					return acc;
				case 'ListOfElements':
					var subs = el.a;
					return A3($elm$core$List$foldl, toLegends, acc, subs);
				case 'SvgElement':
					return acc;
				default:
					return acc;
			}
		});
	return A3($elm$core$List$foldl, toLegends, _List_Nil, elements);
};
var $terezka$elm_charts$Chart$TickValues = F4(
	function (xAxis, yAxis, xs, ys) {
		return {xAxis: xAxis, xs: xs, yAxis: yAxis, ys: ys};
	});
var $terezka$elm_charts$Chart$getTickValues = F3(
	function (plane, items, elements) {
		var toValues = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						return acc;
					case 'BarsElement':
						var func = el.d;
						return A2(func, plane, acc);
					case 'CustomElement':
						var func = el.b;
						return acc;
					case 'AxisElement':
						var func = el.a;
						return A2(func, plane, acc);
					case 'TicksElement':
						var func = el.a;
						return A2(func, plane, acc);
					case 'TickElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'LabelsElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'LabelElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'SubElements':
						var func = el.a;
						return A3(
							$elm$core$List$foldl,
							toValues,
							acc,
							A2(func, plane, items));
					case 'GridElement':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, toValues, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		return A3(
			$elm$core$List$foldl,
			toValues,
			A4($terezka$elm_charts$Chart$TickValues, _List_Nil, _List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$GridElement = function (a) {
	return {$: 'GridElement', a: a};
};
var $terezka$elm_charts$Internal$Svg$Circle = {$: 'Circle'};
var $terezka$elm_charts$Chart$Attributes$circle = function (config) {
	return _Utils_update(
		config,
		{
			shape: $elm$core$Maybe$Just($terezka$elm_charts$Internal$Svg$Circle)
		});
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $terezka$elm_charts$Chart$Attributes$color = F2(
	function (v, config) {
		return (v === '') ? config : _Utils_update(
			config,
			{color: v});
	});
var $terezka$elm_charts$Internal$Helpers$darkGray = 'rgb(200 200 200)';
var $terezka$elm_charts$Chart$Attributes$dashed = F2(
	function (value, config) {
		return _Utils_update(
			config,
			{dashed: value});
	});
var $terezka$elm_charts$Internal$Helpers$pink = '#ea60df';
var $terezka$elm_charts$Internal$Svg$defaultDot = {border: '', borderWidth: 0, color: $terezka$elm_charts$Internal$Helpers$pink, hideOverflow: false, highlight: 0, highlightColor: '', highlightWidth: 5, opacity: 1, shape: $elm$core$Maybe$Nothing, size: 6};
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $terezka$elm_charts$Internal$Svg$isWithinPlane = F3(
	function (plane, x, y) {
		return _Utils_eq(
			A3($elm$core$Basics$clamp, plane.x.min, plane.x.max, x),
			x) && _Utils_eq(
			A3($elm$core$Basics$clamp, plane.y.min, plane.y.max, y),
			y);
	});
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $terezka$elm_charts$Internal$Svg$plusPath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(area_ / 4) + off;
		var r6 = side / 2;
		var r3 = side;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_ - r6) + (' ' + $elm$core$String$fromFloat(((y_ - r3) - r6) + off))),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat(r3),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat(r3),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(-r3),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(-r3),
					'v' + $elm$core$String$fromFloat(r3 - off)
				]));
	});
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $terezka$elm_charts$Internal$Coordinates$scaleSVGX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerWidth(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.x);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, value - plane.x.min) + plane.x.marginMin;
	});
var $terezka$elm_charts$Internal$Coordinates$scaleSVGY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerHeight(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.y);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGY = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGY, plane, plane.y.max - value) + plane.y.marginMin;
	});
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$tan = _Basics_tan;
var $terezka$elm_charts$Internal$Svg$trianglePath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(
			(area_ * 4) / $elm$core$Basics$sqrt(3)) + (off * $elm$core$Basics$sqrt(3));
		var height = ($elm$core$Basics$sqrt(3) * side) / 2;
		var fromMiddle = height - (($elm$core$Basics$tan(
			$elm$core$Basics$degrees(30)) * side) / 2);
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_) + (' ' + $elm$core$String$fromFloat(y_ - fromMiddle))),
					'l' + ($elm$core$String$fromFloat((-side) / 2) + (' ' + $elm$core$String$fromFloat(height))),
					'h' + $elm$core$String$fromFloat(side),
					'z'
				]));
	});
var $elm$svg$Svg$Attributes$clipPath = _VirtualDom_attribute('clip-path');
var $terezka$elm_charts$Internal$Svg$withinChartArea = function (plane) {
	return $elm$svg$Svg$Attributes$clipPath(
		'url(#' + ($terezka$elm_charts$Internal$Coordinates$toId(plane) + ')'));
};
var $terezka$elm_charts$Internal$Svg$dot = F5(
	function (plane, toX, toY, config, datum_) {
		var yOrg = toY(datum_);
		var y_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, yOrg);
		var xOrg = toX(datum_);
		var x_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, xOrg);
		var styleAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(
				(config.border === '') ? config.color : config.border),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.borderWidth)),
				$elm$svg$Svg$Attributes$fillOpacity(
				$elm$core$String$fromFloat(config.opacity)),
				$elm$svg$Svg$Attributes$fill(config.color),
				$elm$svg$Svg$Attributes$class('elm-charts__dot'),
				config.hideOverflow ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
			]);
		var showDot = A3($terezka$elm_charts$Internal$Svg$isWithinPlane, plane, xOrg, yOrg) || config.hideOverflow;
		var highlightColor = (config.highlightColor === '') ? config.color : config.highlightColor;
		var highlightAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(highlightColor),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.highlightWidth)),
				$elm$svg$Svg$Attributes$strokeOpacity(
				$elm$core$String$fromFloat(config.highlight)),
				$elm$svg$Svg$Attributes$fill('transparent'),
				$elm$svg$Svg$Attributes$class('elm-charts__dot-highlight')
			]);
		var view = F3(
			function (toEl, highlightOff, toAttrs) {
				return (config.highlight > 0) ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__dot-container')
						]),
					_List_fromArray(
						[
							A2(
							toEl,
							_Utils_ap(
								toAttrs(highlightOff),
								highlightAttrs),
							_List_Nil),
							A2(
							toEl,
							_Utils_ap(
								toAttrs(0),
								styleAttrs),
							_List_Nil)
						])) : A2(
					toEl,
					_Utils_ap(
						toAttrs(0),
						styleAttrs),
					_List_Nil);
			});
		var area_ = (2 * $elm$core$Basics$pi) * config.size;
		if (!showDot) {
			return $elm$svg$Svg$text('');
		} else {
			var _v0 = config.shape;
			if (_v0.$ === 'Nothing') {
				return $elm$svg$Svg$text('');
			} else {
				switch (_v0.a.$) {
					case 'Circle':
						var _v1 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$circle,
							config.highlightWidth / 2,
							function (off) {
								var radius = $elm$core$Basics$sqrt(area_ / $elm$core$Basics$pi);
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(x_)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(y_)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(radius + off))
									]);
							});
					case 'Triangle':
						var _v2 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$trianglePath, area_, off, x_, y_))
									]);
							});
					case 'Square':
						var _v3 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.highlightWidth,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff))
									]);
							});
					case 'Diamond':
						var _v4 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.highlightWidth,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					case 'Cross':
						var _v5 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					default:
						var _v6 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_))
									]);
							});
				}
			}
		}
	});
var $terezka$elm_charts$Chart$Svg$dot = F4(
	function (plane, toX, toY, edits) {
		return A4(
			$terezka$elm_charts$Internal$Svg$dot,
			plane,
			toX,
			toY,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultDot));
	});
var $terezka$elm_charts$Internal$Helpers$gray = '#EFF2FA';
var $terezka$elm_charts$Internal$Svg$defaultLine = {attrs: _List_Nil, _break: false, color: 'rgb(210, 210, 210)', dashed: _List_Nil, flip: false, hideOverflow: false, opacity: 1, tickDirection: -90, tickLength: 0, width: 1, x1: $elm$core$Maybe$Nothing, x2: $elm$core$Maybe$Nothing, x2Svg: $elm$core$Maybe$Nothing, xOff: 0, y1: $elm$core$Maybe$Nothing, y2: $elm$core$Maybe$Nothing, y2Svg: $elm$core$Maybe$Nothing, yOff: 0};
var $terezka$elm_charts$Internal$Commands$Line = F2(
	function (a, b) {
		return {$: 'Line', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Commands$Move = F2(
	function (a, b) {
		return {$: 'Move', a: a, b: b};
	});
var $elm$core$Basics$cos = _Basics_cos;
var $terezka$elm_charts$Internal$Commands$joinCommands = function (commands) {
	return A2($elm$core$String$join, ' ', commands);
};
var $terezka$elm_charts$Internal$Commands$stringBoolInt = function (bool) {
	return bool ? '1' : '0';
};
var $terezka$elm_charts$Internal$Commands$stringPoint = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return $elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y));
};
var $terezka$elm_charts$Internal$Commands$stringPoints = function (points) {
	return A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $terezka$elm_charts$Internal$Commands$stringPoint, points));
};
var $terezka$elm_charts$Internal$Commands$stringCommand = function (command) {
	switch (command.$) {
		case 'Move':
			var x = command.a;
			var y = command.b;
			return 'M' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'Line':
			var x = command.a;
			var y = command.b;
			return 'L' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'CubicBeziers':
			var cx1 = command.a;
			var cy1 = command.b;
			var cx2 = command.c;
			var cy2 = command.d;
			var x = command.e;
			var y = command.f;
			return 'C' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(cx2, cy2),
						_Utils_Tuple2(x, y)
					]));
		case 'CubicBeziersShort':
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 'QuadraticBeziers':
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 'QuadraticBeziersShort':
			var x = command.a;
			var y = command.b;
			return 'T' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'Arc':
			var rx = command.a;
			var ry = command.b;
			var xAxisRotation = command.c;
			var largeArcFlag = command.d;
			var sweepFlag = command.e;
			var x = command.f;
			var y = command.g;
			return 'A ' + $terezka$elm_charts$Internal$Commands$joinCommands(
				_List_fromArray(
					[
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(rx, ry)),
						$elm$core$String$fromInt(xAxisRotation),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(largeArcFlag),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(sweepFlag),
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(x, y))
					]));
		default:
			return 'Z';
	}
};
var $terezka$elm_charts$Internal$Commands$Arc = F7(
	function (a, b, c, d, e, f, g) {
		return {$: 'Arc', a: a, b: b, c: c, d: d, e: e, f: f, g: g};
	});
var $terezka$elm_charts$Internal$Commands$Close = {$: 'Close'};
var $terezka$elm_charts$Internal$Commands$CubicBeziers = F6(
	function (a, b, c, d, e, f) {
		return {$: 'CubicBeziers', a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $terezka$elm_charts$Internal$Commands$CubicBeziersShort = F4(
	function (a, b, c, d) {
		return {$: 'CubicBeziersShort', a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziers = F4(
	function (a, b, c, d) {
		return {$: 'QuadraticBeziers', a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziersShort = F2(
	function (a, b) {
		return {$: 'QuadraticBeziersShort', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Commands$translate = F2(
	function (plane, command) {
		switch (command.$) {
			case 'Move':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Move,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'Line':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Line,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'CubicBeziers':
				var cx1 = command.a;
				var cy1 = command.b;
				var cx2 = command.c;
				var cy2 = command.d;
				var x = command.e;
				var y = command.f;
				return A6(
					$terezka$elm_charts$Internal$Commands$CubicBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'CubicBeziersShort':
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$CubicBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'QuadraticBeziers':
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'QuadraticBeziersShort':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'Arc':
				var rx = command.a;
				var ry = command.b;
				var xAxisRotation = command.c;
				var largeArcFlag = command.d;
				var sweepFlag = command.e;
				var x = command.f;
				var y = command.g;
				return A7(
					$terezka$elm_charts$Internal$Commands$Arc,
					rx,
					ry,
					xAxisRotation,
					largeArcFlag,
					sweepFlag,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			default:
				return $terezka$elm_charts$Internal$Commands$Close;
		}
	});
var $terezka$elm_charts$Internal$Commands$description = F2(
	function (plane, commands) {
		return $terezka$elm_charts$Internal$Commands$joinCommands(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$terezka$elm_charts$Internal$Commands$translate(plane),
					$terezka$elm_charts$Internal$Commands$stringCommand),
				commands));
	});
var $terezka$elm_charts$Internal$Svg$lengthInCartesianX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX;
var $terezka$elm_charts$Internal$Svg$lengthInCartesianY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY;
var $elm$core$Basics$sin = _Basics_sin;
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $terezka$elm_charts$Internal$Svg$withAttrs = F3(
	function (attrs, toEl, defaultAttrs) {
		return toEl(
			_Utils_ap(
				defaultAttrs,
				A2(
					$elm$core$List$map,
					$elm$html$Html$Attributes$map($elm$core$Basics$never),
					attrs)));
	});
var $terezka$elm_charts$Internal$Svg$line = F2(
	function (plane, config) {
		var angle = $elm$core$Basics$degrees(config.tickDirection);
		var _v0 = function () {
			var _v3 = _Utils_Tuple3(
				_Utils_Tuple2(config.x1, config.x2),
				_Utils_Tuple2(config.y1, config.y2),
				_Utils_Tuple2(config.x2Svg, config.y2Svg));
			if (_v3.a.a.$ === 'Just') {
				if (_v3.a.b.$ === 'Just') {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v4 = _v3.a;
							var a = _v4.a.a;
							var b = _v4.b.a;
							var _v5 = _v3.b;
							var _v6 = _v5.a;
							var _v7 = _v5.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(plane.y.min, plane.y.min));
						} else {
							var _v38 = _v3.a;
							var a = _v38.a.a;
							var b = _v38.b.a;
							var _v39 = _v3.b;
							var _v40 = _v39.a;
							var c = _v39.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						}
					} else {
						if (_v3.b.b.$ === 'Nothing') {
							var _v41 = _v3.a;
							var a = _v41.a.a;
							var b = _v41.b.a;
							var _v42 = _v3.b;
							var c = _v42.a.a;
							var _v43 = _v42.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						} else {
							return _Utils_Tuple2(
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.x.min, config.x1),
									A2($elm$core$Maybe$withDefault, plane.x.max, config.x2)),
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.y.min, config.y1),
									A2($elm$core$Maybe$withDefault, plane.y.max, config.y2)));
						}
					}
				} else {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v8 = _v3.a;
							var a = _v8.a.a;
							var _v9 = _v8.b;
							var _v10 = _v3.b;
							var _v11 = _v10.a;
							var _v12 = _v10.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, a),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v51 = _v3.a;
									var a = _v51.a.a;
									var _v52 = _v51.b;
									var _v53 = _v3.b;
									var _v54 = _v53.a;
									var b = _v53.b.a;
									var _v55 = _v3.c;
									var xOff = _v55.a.a;
									var yOff = _v55.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v56 = _v3.a;
									var a = _v56.a.a;
									var _v57 = _v56.b;
									var _v58 = _v3.b;
									var _v59 = _v58.a;
									var b = _v58.b.a;
									var _v60 = _v3.c;
									var xOff = _v60.a.a;
									var _v61 = _v60.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v44 = _v3.a;
									var a = _v44.a.a;
									var _v45 = _v44.b;
									var _v46 = _v3.b;
									var _v47 = _v46.a;
									var b = _v46.b.a;
									var _v48 = _v3.c;
									var _v49 = _v48.a;
									var _v50 = _v48.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v62 = _v3.a;
									var a = _v62.a.a;
									var _v63 = _v62.b;
									var _v64 = _v3.b;
									var _v65 = _v64.a;
									var b = _v64.b.a;
									var _v66 = _v3.c;
									var _v67 = _v66.a;
									var yOff = _v66.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v35 = _v3.a;
							var c = _v35.a.a;
							var _v36 = _v35.b;
							var _v37 = _v3.b;
							var a = _v37.a.a;
							var b = _v37.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v75 = _v3.a;
									var a = _v75.a.a;
									var _v76 = _v75.b;
									var _v77 = _v3.b;
									var b = _v77.a.a;
									var _v78 = _v77.b;
									var _v79 = _v3.c;
									var xOff = _v79.a.a;
									var yOff = _v79.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v80 = _v3.a;
									var a = _v80.a.a;
									var _v81 = _v80.b;
									var _v82 = _v3.b;
									var b = _v82.a.a;
									var _v83 = _v82.b;
									var _v84 = _v3.c;
									var xOff = _v84.a.a;
									var _v85 = _v84.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v68 = _v3.a;
									var a = _v68.a.a;
									var _v69 = _v68.b;
									var _v70 = _v3.b;
									var b = _v70.a.a;
									var _v71 = _v70.b;
									var _v72 = _v3.c;
									var _v73 = _v72.a;
									var _v74 = _v72.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v86 = _v3.a;
									var a = _v86.a.a;
									var _v87 = _v86.b;
									var _v88 = _v3.b;
									var b = _v88.a.a;
									var _v89 = _v88.b;
									var _v90 = _v3.c;
									var _v91 = _v90.a;
									var yOff = _v90.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				}
			} else {
				if (_v3.a.b.$ === 'Just') {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v13 = _v3.a;
							var _v14 = _v13.a;
							var b = _v13.b.a;
							var _v15 = _v3.b;
							var _v16 = _v15.a;
							var _v17 = _v15.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(b, b),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v99 = _v3.a;
									var _v100 = _v99.a;
									var a = _v99.b.a;
									var _v101 = _v3.b;
									var _v102 = _v101.a;
									var b = _v101.b.a;
									var _v103 = _v3.c;
									var xOff = _v103.a.a;
									var yOff = _v103.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v104 = _v3.a;
									var _v105 = _v104.a;
									var a = _v104.b.a;
									var _v106 = _v3.b;
									var _v107 = _v106.a;
									var b = _v106.b.a;
									var _v108 = _v3.c;
									var xOff = _v108.a.a;
									var _v109 = _v108.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v92 = _v3.a;
									var _v93 = _v92.a;
									var a = _v92.b.a;
									var _v94 = _v3.b;
									var _v95 = _v94.a;
									var b = _v94.b.a;
									var _v96 = _v3.c;
									var _v97 = _v96.a;
									var _v98 = _v96.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v110 = _v3.a;
									var _v111 = _v110.a;
									var a = _v110.b.a;
									var _v112 = _v3.b;
									var _v113 = _v112.a;
									var b = _v112.b.a;
									var _v114 = _v3.c;
									var _v115 = _v114.a;
									var yOff = _v114.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v32 = _v3.a;
							var _v33 = _v32.a;
							var c = _v32.b.a;
							var _v34 = _v3.b;
							var a = _v34.a.a;
							var b = _v34.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v123 = _v3.a;
									var _v124 = _v123.a;
									var a = _v123.b.a;
									var _v125 = _v3.b;
									var b = _v125.a.a;
									var _v126 = _v125.b;
									var _v127 = _v3.c;
									var xOff = _v127.a.a;
									var yOff = _v127.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v128 = _v3.a;
									var _v129 = _v128.a;
									var a = _v128.b.a;
									var _v130 = _v3.b;
									var b = _v130.a.a;
									var _v131 = _v130.b;
									var _v132 = _v3.c;
									var xOff = _v132.a.a;
									var _v133 = _v132.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v116 = _v3.a;
									var _v117 = _v116.a;
									var a = _v116.b.a;
									var _v118 = _v3.b;
									var b = _v118.a.a;
									var _v119 = _v118.b;
									var _v120 = _v3.c;
									var _v121 = _v120.a;
									var _v122 = _v120.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v134 = _v3.a;
									var _v135 = _v134.a;
									var a = _v134.b.a;
									var _v136 = _v3.b;
									var b = _v136.a.a;
									var _v137 = _v136.b;
									var _v138 = _v3.c;
									var _v139 = _v138.a;
									var yOff = _v138.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				} else {
					if (_v3.b.a.$ === 'Just') {
						if (_v3.b.b.$ === 'Just') {
							var _v18 = _v3.a;
							var _v19 = _v18.a;
							var _v20 = _v18.b;
							var _v21 = _v3.b;
							var a = _v21.a.a;
							var b = _v21.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.min),
								_Utils_Tuple2(a, b));
						} else {
							var _v22 = _v3.a;
							var _v23 = _v22.a;
							var _v24 = _v22.b;
							var _v25 = _v3.b;
							var a = _v25.a.a;
							var _v26 = _v25.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(a, a));
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v27 = _v3.a;
							var _v28 = _v27.a;
							var _v29 = _v27.b;
							var _v30 = _v3.b;
							var _v31 = _v30.a;
							var b = _v30.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(b, b));
						} else {
							var _v140 = _v3.a;
							var _v141 = _v140.a;
							var _v142 = _v140.b;
							var _v143 = _v3.b;
							var _v144 = _v143.a;
							var _v145 = _v143.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						}
					}
				}
			}
		}();
		var _v1 = _v0.a;
		var x1 = _v1.a;
		var x2 = _v1.b;
		var _v2 = _v0.b;
		var y1 = _v2.a;
		var y2 = _v2.b;
		var x1_ = x1 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.xOff);
		var x2_ = x2 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.xOff);
		var y1_ = y1 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.yOff);
		var y2_ = y2 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.yOff);
		var _v146 = (config.tickLength > 0) ? _Utils_Tuple2(
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianX,
				plane,
				$elm$core$Basics$cos(angle) * config.tickLength),
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianY,
				plane,
				$elm$core$Basics$sin(angle) * config.tickLength)) : _Utils_Tuple2(0, 0);
		var tickOffsetX = _v146.a;
		var tickOffsetY = _v146.b;
		var cmds = config.flip ? _Utils_ap(
			(config.tickLength > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_ + tickOffsetX, y2_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_, y2_)
				]),
			_Utils_ap(
				config._break ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y1_),
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]),
				(config.tickLength > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_ + tickOffsetX, y1_ + tickOffsetY)
					]) : _List_Nil)) : _Utils_ap(
			(config.tickLength > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_ + tickOffsetX, y1_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_, y1_)
				]),
			_Utils_ap(
				config._break ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y2_),
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]),
				(config.tickLength > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_ + tickOffsetX, y2_ + tickOffsetY)
					]) : _List_Nil));
		return A4(
			$terezka$elm_charts$Internal$Svg$withAttrs,
			config.attrs,
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('elm-charts__line'),
					$elm$svg$Svg$Attributes$fill('transparent'),
					$elm$svg$Svg$Attributes$stroke(config.color),
					$elm$svg$Svg$Attributes$strokeWidth(
					$elm$core$String$fromFloat(config.width)),
					$elm$svg$Svg$Attributes$strokeOpacity(
					$elm$core$String$fromFloat(config.opacity)),
					$elm$svg$Svg$Attributes$strokeDasharray(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, config.dashed))),
					$elm$svg$Svg$Attributes$d(
					A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
					config.hideOverflow ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
				]),
			_List_Nil);
	});
var $terezka$elm_charts$Chart$Svg$line = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$line,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultLine));
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $terezka$elm_charts$Chart$Attributes$size = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{size: v});
	});
var $terezka$elm_charts$Chart$Attributes$width = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{width: v});
	});
var $terezka$elm_charts$Chart$Attributes$x1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				x1: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$Attributes$y1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				y1: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$grid = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{color: '', dashed: _List_Nil, dotGrid: false, width: 0});
	var width = (!config.width) ? (config.dotGrid ? 0.5 : 1) : config.width;
	var color = $elm$core$String$isEmpty(config.color) ? (config.dotGrid ? $terezka$elm_charts$Internal$Helpers$darkGray : $terezka$elm_charts$Internal$Helpers$gray) : config.color;
	var toDot = F4(
		function (vs, p, x, y) {
			return (A2($elm$core$List$member, x, vs.xAxis) || A2($elm$core$List$member, y, vs.yAxis)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A5(
					$terezka$elm_charts$Chart$Svg$dot,
					p,
					function ($) {
						return $.x;
					},
					function ($) {
						return $.y;
					},
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$size(width),
							$terezka$elm_charts$Chart$Attributes$circle
						]),
					{x: x, y: y}));
		});
	var toXGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.xAxis) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$x1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.dashed)
						])));
		});
	var toYGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.yAxis) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$y1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.dashed)
						])));
		});
	return $terezka$elm_charts$Chart$GridElement(
		F2(
			function (p, vs) {
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__grid')
						]),
					config.dotGrid ? A2(
						$elm$core$List$concatMap,
						function (x) {
							return A2(
								$elm$core$List$filterMap,
								A3(toDot, vs, p, x),
								vs.ys);
						},
						vs.xs) : _List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__x-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toXGrid, vs, p),
								vs.xs)),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__y-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toYGrid, vs, p),
								vs.ys))
						]));
			}));
};
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $terezka$elm_charts$Chart$viewElements = F6(
	function (config, plane, tickValues, allItems, allLegends, elements) {
		var viewOne = F2(
			function (el, _v0) {
				var before = _v0.a;
				var chart_ = _v0.b;
				var after = _v0.c;
				switch (el.$) {
					case 'Indexed':
						return _Utils_Tuple3(before, chart_, after);
					case 'SeriesElement':
						var view = el.d;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'BarsElement':
						var view = el.e;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'CustomElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'AxisElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'TicksElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'TickElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'LabelsElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'LabelElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'GridElement':
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(view, plane, tickValues),
								chart_),
							after);
					case 'SubElements':
						var func = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							A2(func, plane, allItems));
					case 'ListOfElements':
						var els = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							els);
					case 'SvgElement':
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					default:
						var view = el.a;
						return _Utils_Tuple3(
							($elm$core$List$length(chart_) > 0) ? A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								before) : before,
							chart_,
							($elm$core$List$length(chart_) > 0) ? after : A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								after));
				}
			});
		return A3(
			$elm$core$List$foldr,
			viewOne,
			_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$chart = F2(
	function (edits, unindexedElements) {
		var indexedElements = function () {
			var toIndexedEl = F2(
				function (el, _v4) {
					var acc = _v4.a;
					var index = _v4.b;
					switch (el.$) {
						case 'Indexed':
							var toElAndIndex = el.a;
							var _v6 = toElAndIndex(index);
							var newEl = _v6.a;
							var newIndex = _v6.b;
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[newEl])),
								newIndex);
						case 'ListOfElements':
							var els = el.a;
							return A3(
								$elm$core$List$foldl,
								toIndexedEl,
								_Utils_Tuple2(acc, index),
								els);
						default:
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[el])),
								index);
					}
				});
			return A3(
				$elm$core$List$foldl,
				toIndexedEl,
				_Utils_Tuple2(_List_Nil, 0),
				unindexedElements).a;
		}();
		var elements = function () {
			var isGrid = function (el) {
				if (el.$ === 'GridElement') {
					return true;
				} else {
					return false;
				}
			};
			return A2($elm$core$List$any, isGrid, indexedElements) ? indexedElements : A2(
				$elm$core$List$cons,
				$terezka$elm_charts$Chart$grid(_List_Nil),
				indexedElements);
		}();
		var legends_ = $terezka$elm_charts$Chart$getLegends(elements);
		var config = A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{
				attrs: _List_fromArray(
					[
						$elm$svg$Svg$Attributes$style('overflow: visible;')
					]),
				domain: _List_Nil,
				events: _List_Nil,
				height: 300,
				htmlAttrs: _List_Nil,
				margin: {bottom: 0, left: 0, right: 0, top: 0},
				padding: {bottom: 0, left: 0, right: 0, top: 0},
				range: _List_Nil,
				responsive: true,
				width: 300
			});
		var plane = A2($terezka$elm_charts$Chart$definePlane, config, elements);
		var items = A2($terezka$elm_charts$Chart$getItems, plane, elements);
		var toEvent = function (_v2) {
			var event_ = _v2.a;
			var _v1 = event_.decoder;
			var decoder = _v1.a;
			return A2(
				$terezka$elm_charts$Internal$Svg$Event,
				event_.name,
				decoder(items));
		};
		var tickValues = A3($terezka$elm_charts$Chart$getTickValues, plane, items, elements);
		var _v0 = A6($terezka$elm_charts$Chart$viewElements, config, plane, tickValues, items, legends_, elements);
		var beforeEls = _v0.a;
		var chartEls = _v0.b;
		var afterEls = _v0.c;
		return A5(
			$terezka$elm_charts$Internal$Svg$container,
			plane,
			{
				attrs: config.attrs,
				events: A2($elm$core$List$map, toEvent, config.events),
				htmlAttrs: config.htmlAttrs,
				responsive: config.responsive
			},
			beforeEls,
			chartEls,
			afterEls);
	});
var $terezka$elm_charts$Internal$Svg$Column = {$: 'Column'};
var $terezka$elm_charts$Chart$Attributes$column = function (config) {
	return _Utils_update(
		config,
		{alignment: $terezka$elm_charts$Internal$Svg$Column});
};
var $terezka$elm_charts$Chart$Attributes$domain = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{domain: v});
	});
var $terezka$elm_charts$Internal$Many$Remodel = F2(
	function (a, b) {
		return {$: 'Remodel', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Coordinates$center = function (pos) {
	return {x: pos.x1 + ((pos.x2 - pos.x1) / 2), y: pos.y1 + ((pos.y2 - pos.y1) / 2)};
};
var $terezka$elm_charts$Internal$Many$fromPoint = function (point) {
	return {x1: point.x, x2: point.x, y1: point.y, y2: point.y};
};
var $terezka$elm_charts$Internal$Item$getPosition = F2(
	function (plane, _v0) {
		var item = _v0.a;
		return A2(item.toPosition, plane, item.config);
	});
var $terezka$elm_charts$Internal$Item$Dot = function (a) {
	return {$: 'Dot', a: a};
};
var $terezka$elm_charts$Internal$Item$Rendered = function (a) {
	return {$: 'Rendered', a: a};
};
var $terezka$elm_charts$Internal$Item$isDot = function (_v0) {
	var item = _v0.a;
	var _v1 = item.config.product;
	if (_v1.$ === 'Dot') {
		var dot = _v1.a;
		return $elm$core$Maybe$Just(
			$terezka$elm_charts$Internal$Item$Rendered(
				{
					config: {product: dot, toAny: $terezka$elm_charts$Internal$Item$Dot, tooltipInfo: item.config.tooltipInfo, values: item.config.values},
					toHtml: function (c) {
						return item.toHtml(item.config);
					},
					toLimits: function (_v2) {
						return item.toLimits(item.config);
					},
					toPosition: F2(
						function (plane, _v3) {
							return A2(item.toPosition, plane, item.config);
						}),
					toSvg: F3(
						function (plane, config, pos) {
							return config.values.isReal ? A5(
								$terezka$elm_charts$Internal$Svg$dot,
								plane,
								function ($) {
									return $.x;
								},
								function ($) {
									return $.y;
								},
								config.product,
								{x: config.values.x1, y: config.values.y}) : $elm$svg$Svg$text('');
						})
				}));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $terezka$elm_charts$Internal$Many$dots = function () {
	var centerPosition = F2(
		function (plane, item) {
			return $terezka$elm_charts$Internal$Many$fromPoint(
				$terezka$elm_charts$Internal$Coordinates$center(
					A2($terezka$elm_charts$Internal$Item$getPosition, plane, item)));
		});
	return A2(
		$terezka$elm_charts$Internal$Many$Remodel,
		centerPosition,
		$elm$core$List$filterMap($terezka$elm_charts$Internal$Item$isDot));
}();
var $terezka$elm_charts$Chart$Item$dots = $terezka$elm_charts$Internal$Many$dots;
var $terezka$elm_charts$Chart$SubElements = function (a) {
	return {$: 'SubElements', a: a};
};
var $terezka$elm_charts$Chart$each = F2(
	function (items, func) {
		return $terezka$elm_charts$Chart$SubElements(
			F2(
				function (p, _v0) {
					return A2(
						$elm$core$List$concatMap,
						func(p),
						items);
				}));
	});
var $author$project$ItemShop$float_to_percent = function (flt) {
	return function (str) {
		return str + '%';
	}(
		$elm$core$String$fromInt(
			$elm$core$Basics$floor(flt * 100)));
};
var $terezka$elm_charts$Chart$Attributes$format = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				format: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Internal$Item$getDatum = function (_v0) {
	var item = _v0.a;
	return item.config.values.datum;
};
var $terezka$elm_charts$Chart$Item$getData = $terezka$elm_charts$Internal$Item$getDatum;
var $terezka$elm_charts$Internal$Events$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $terezka$elm_charts$Internal$Many$apply = F2(
	function (_v0, items) {
		var func = _v0.b;
		return func(items);
	});
var $terezka$elm_charts$Internal$Svg$closestPoint = F2(
	function (pos, searched) {
		return {
			x: A3($elm$core$Basics$clamp, pos.x1, pos.x2, searched.x),
			y: A3($elm$core$Basics$clamp, pos.y1, pos.y2, searched.y)
		};
	});
var $terezka$elm_charts$Internal$Svg$distanceX = F3(
	function (plane, searched, point) {
		return $elm$core$Basics$abs(
			A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, point.x) - A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, searched.x));
	});
var $terezka$elm_charts$Internal$Svg$distanceY = F3(
	function (plane, searched, point) {
		return $elm$core$Basics$abs(
			A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, point.y) - A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, searched.y));
	});
var $terezka$elm_charts$Internal$Svg$distanceSquared = F3(
	function (plane, searched, point) {
		return A2(
			$elm$core$Basics$pow,
			A3($terezka$elm_charts$Internal$Svg$distanceX, plane, searched, point),
			2) + A2(
			$elm$core$Basics$pow,
			A3($terezka$elm_charts$Internal$Svg$distanceY, plane, searched, point),
			2);
	});
var $terezka$elm_charts$Internal$Svg$keepOne = function (toPosition) {
	var toArea = function (a) {
		return function (pos) {
			return (pos.x1 - pos.x2) * (pos.y1 - pos.y2);
		}(
			toPosition(a));
	};
	var func = F2(
		function (one, acc) {
			var _v0 = $elm$core$List$head(acc);
			if (_v0.$ === 'Nothing') {
				return _List_fromArray(
					[one]);
			} else {
				var other = _v0.a;
				return _Utils_eq(
					toPosition(other),
					toPosition(one)) ? A2($elm$core$List$cons, other, acc) : ((_Utils_cmp(
					toArea(other),
					toArea(one)) > 0) ? _List_fromArray(
					[one]) : acc);
			}
		});
	return A2($elm$core$List$foldr, func, _List_Nil);
};
var $terezka$elm_charts$Internal$Svg$getNearestHelp = F4(
	function (toPosition, items, plane, searched) {
		var toPoint = function (i) {
			return A2(
				$terezka$elm_charts$Internal$Svg$closestPoint,
				toPosition(i),
				searched);
		};
		var distanceSquared_ = A2($terezka$elm_charts$Internal$Svg$distanceSquared, plane, searched);
		var getClosest = F2(
			function (item, allClosest) {
				var _v0 = $elm$core$List$head(allClosest);
				if (_v0.$ === 'Just') {
					var closest = _v0.a;
					return _Utils_eq(
						toPoint(closest),
						toPoint(item)) ? A2($elm$core$List$cons, item, allClosest) : ((_Utils_cmp(
						distanceSquared_(
							toPoint(closest)),
						distanceSquared_(
							toPoint(item))) > 0) ? _List_fromArray(
						[item]) : allClosest);
				} else {
					return _List_fromArray(
						[item]);
				}
			});
		return A2(
			$terezka$elm_charts$Internal$Svg$keepOne,
			toPosition,
			A3($elm$core$List$foldl, getClosest, _List_Nil, items));
	});
var $terezka$elm_charts$Internal$Svg$getNearest = F4(
	function (toPosition, items, plane, searched) {
		return A4($terezka$elm_charts$Internal$Svg$getNearestHelp, toPosition, items, plane, searched);
	});
var $terezka$elm_charts$Internal$Events$getNearest = function (grouping) {
	var toPos = grouping.a;
	return $terezka$elm_charts$Internal$Events$Decoder(
		F2(
			function (items, plane) {
				var groups = A2($terezka$elm_charts$Internal$Many$apply, grouping, items);
				return A3(
					$terezka$elm_charts$Internal$Svg$getNearest,
					toPos(plane),
					groups,
					plane);
			}));
};
var $terezka$elm_charts$Chart$Events$getNearest = $terezka$elm_charts$Internal$Events$getNearest;
var $author$project$ItemShop$get_item_type_trend = F2(
	function (item_type_sentiments, item_type) {
		var _v0 = A2(
			$elm$core$Dict$get,
			$author$project$ItemShop$item_type_to_id(item_type),
			item_type_sentiments);
		if (_v0.$ === 'Just') {
			var existing_sent = _v0.a;
			return existing_sent;
		} else {
			return 1.0;
		}
	});
var $terezka$elm_charts$Chart$Attributes$height = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{height: v});
	});
var $terezka$elm_charts$Chart$Attributes$highest = F3(
	function (v, edit, b) {
		return _Utils_update(
			b,
			{
				max: A3(edit, v, b.max, b.dataMax)
			});
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $terezka$elm_charts$Internal$Svg$Linear = {$: 'Linear'};
var $terezka$elm_charts$Chart$Attributes$linear = function (config) {
	return _Utils_update(
		config,
		{
			method: $elm$core$Maybe$Just($terezka$elm_charts$Internal$Svg$Linear)
		});
};
var $terezka$elm_charts$Internal$Property$Property = function (a) {
	return {$: 'Property', a: a};
};
var $terezka$elm_charts$Internal$Property$property = F3(
	function (value, inter, attrs) {
		return $terezka$elm_charts$Internal$Property$Property(
			{
				attrs: attrs,
				extra: F5(
					function (_v0, _v1, _v2, _v3, _v4) {
						return _List_Nil;
					}),
				format: A2(
					$elm$core$Basics$composeR,
					value,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$map($elm$core$String$fromFloat),
						$elm$core$Maybe$withDefault('N/A'))),
				inter: inter,
				meta: $elm$core$Maybe$Nothing,
				value: value,
				visual: value
			});
	});
var $terezka$elm_charts$Chart$interpolated = F2(
	function (y, inter) {
		return A2(
			$terezka$elm_charts$Internal$Property$property,
			A2($elm$core$Basics$composeR, y, $elm$core$Maybe$Just),
			_Utils_ap(
				_List_fromArray(
					[$terezka$elm_charts$Chart$Attributes$linear]),
				inter));
	});
var $terezka$elm_charts$Chart$HtmlElement = function (a) {
	return {$: 'HtmlElement', a: a};
};
var $terezka$elm_charts$Internal$Coordinates$Axis = F7(
	function (length, marginMin, marginMax, dataMin, dataMax, min, max) {
		return {dataMax: dataMax, dataMin: dataMin, length: length, marginMax: marginMax, marginMin: marginMin, max: max, min: min};
	});
var $terezka$elm_charts$Internal$Svg$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$linearGradient = $elm$svg$Svg$trustedNode('linearGradient');
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$svg$Svg$pattern = $elm$svg$Svg$trustedNode('pattern');
var $elm$svg$Svg$Attributes$patternTransform = _VirtualDom_attribute('patternTransform');
var $elm$svg$Svg$Attributes$patternUnits = _VirtualDom_attribute('patternUnits');
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $terezka$elm_charts$Internal$Svg$toPattern = F2(
	function (defaultColor, design) {
		var toPatternId = function (props) {
			return A3(
				$elm$core$String$replace,
				'(',
				'-',
				A3(
					$elm$core$String$replace,
					')',
					'-',
					A3(
						$elm$core$String$replace,
						'.',
						'-',
						A3(
							$elm$core$String$replace,
							',',
							'-',
							A3(
								$elm$core$String$replace,
								' ',
								'-',
								A2(
									$elm$core$String$join,
									'-',
									_Utils_ap(
										_List_fromArray(
											[
												'elm-charts__pattern',
												function () {
												switch (design.$) {
													case 'Striped':
														return 'striped';
													case 'Dotted':
														return 'dotted';
													default:
														return 'gradient';
												}
											}()
											]),
										props)))))));
		};
		var toPatternDefs = F4(
			function (id, spacing, rotate, inside) {
				return A2(
					$elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$pattern,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id(id),
									$elm$svg$Svg$Attributes$patternUnits('userSpaceOnUse'),
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$patternTransform(
									'rotate(' + ($elm$core$String$fromFloat(rotate) + ')'))
								]),
							_List_fromArray(
								[inside]))
						]));
			});
		var _v0 = function () {
			switch (design.$) {
				case 'Striped':
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{color: defaultColor, rotate: 45, spacing: 4, width: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.color,
								$elm$core$String$fromFloat(config.width),
								$elm$core$String$fromFloat(config.spacing),
								$elm$core$String$fromFloat(config.rotate)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.spacing,
							config.rotate,
							A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1('0'),
										$elm$svg$Svg$Attributes$y('0'),
										$elm$svg$Svg$Attributes$x2('0'),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(config.spacing)),
										$elm$svg$Svg$Attributes$stroke(config.color),
										$elm$svg$Svg$Attributes$strokeWidth(
										$elm$core$String$fromFloat(config.width))
									]),
								_List_Nil)),
						theId);
				case 'Dotted':
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{color: defaultColor, rotate: 45, spacing: 4, width: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.color,
								$elm$core$String$fromFloat(config.width),
								$elm$core$String$fromFloat(config.spacing),
								$elm$core$String$fromFloat(config.rotate)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.spacing,
							config.rotate,
							A2(
								$elm$svg$Svg$circle,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill(config.color),
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(config.width / 3)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(config.width / 3)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(config.width / 3))
									]),
								_List_Nil)),
						theId);
				default:
					var edits = design.a;
					var colors = _Utils_eq(edits, _List_Nil) ? _List_fromArray(
						[defaultColor, 'white']) : edits;
					var theId = toPatternId(colors);
					var totalColors = $elm$core$List$length(colors);
					var toPercentage = function (i) {
						return (i * 100) / (totalColors - 1);
					};
					var toStop = F2(
						function (i, c) {
							return A2(
								$elm$svg$Svg$stop,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$offset(
										$elm$core$String$fromFloat(
											toPercentage(i)) + '%'),
										$elm$svg$Svg$Attributes$stopColor(c)
									]),
								_List_Nil);
						});
					return _Utils_Tuple2(
						A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$linearGradient,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id(theId),
											$elm$svg$Svg$Attributes$x1('0'),
											$elm$svg$Svg$Attributes$x2('0'),
											$elm$svg$Svg$Attributes$y1('0'),
											$elm$svg$Svg$Attributes$y2('1')
										]),
									A2($elm$core$List$indexedMap, toStop, colors))
								])),
						theId);
			}
		}();
		var patternDefs = _v0.a;
		var patternId = _v0.b;
		return _Utils_Tuple2(patternDefs, 'url(#' + (patternId + ')'));
	});
var $terezka$elm_charts$Internal$Svg$bar = F3(
	function (plane, config, point) {
		var viewBar = F6(
			function (fill, fillOpacity, border, borderWidth, strokeOpacity, cmds) {
				return A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__bar'),
							$elm$svg$Svg$Attributes$fill(fill),
							$elm$svg$Svg$Attributes$fillOpacity(
							$elm$core$String$fromFloat(fillOpacity)),
							$elm$svg$Svg$Attributes$stroke(border),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(borderWidth)),
							$elm$svg$Svg$Attributes$strokeOpacity(
							$elm$core$String$fromFloat(strokeOpacity)),
							$elm$svg$Svg$Attributes$d(
							A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_Nil);
			});
		var highlightColor = (config.highlightColor === '') ? config.color : config.highlightColor;
		var borderWidthCarY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.borderWidth / 2);
		var highlightWidthCarY = borderWidthCarY + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.highlightWidth / 2);
		var borderWidthCarX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.borderWidth / 2);
		var highlightWidthCarX = borderWidthCarX + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.highlightWidth / 2);
		var pos = {
			x1: A2($elm$core$Basics$min, point.x1, point.x2) + borderWidthCarX,
			x2: A2($elm$core$Basics$max, point.x1, point.x2) - borderWidthCarX,
			y1: A2($elm$core$Basics$min, point.y1, point.y2) + borderWidthCarY,
			y2: A2($elm$core$Basics$max, point.y1, point.y2) - borderWidthCarY
		};
		var height = $elm$core$Basics$abs(pos.y2 - pos.y1);
		var highlightPos = {x1: pos.x1 - highlightWidthCarX, x2: pos.x2 + highlightWidthCarX, y1: pos.y1 - highlightWidthCarY, y2: pos.y2 + highlightWidthCarY};
		var width = $elm$core$Basics$abs(pos.x2 - pos.x1);
		var roundingBottom = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.roundBottom);
		var radiusBottomX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingBottom);
		var radiusBottomY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingBottom);
		var roundingTop = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.roundTop);
		var radiusTopX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingTop);
		var radiusTopY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingTop);
		var _v0 = ((((height - (radiusTopY * 0.8)) - (radiusBottomY * 0.8)) <= 0) || (((width - (radiusTopX * 0.8)) - (radiusBottomX * 0.8)) <= 0)) ? _Utils_Tuple2(0, 0) : _Utils_Tuple2(config.roundTop, config.roundBottom);
		var roundTop = _v0.a;
		var roundBottom = _v0.b;
		var _v1 = function () {
			if (_Utils_eq(pos.y1, pos.y2)) {
				return _Utils_Tuple2(_List_Nil, _List_Nil);
			} else {
				var _v2 = _Utils_Tuple2(roundTop > 0, roundBottom > 0);
				if (!_v2.a) {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1 + radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x2 - radiusBottomX, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusBottomX, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x1, highlightPos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x2 - radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.x2, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1)
								]));
					}
				} else {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x1 + radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x2, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x1 + radiusTopX, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2 - radiusTopX, highlightPos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x2, highlightPos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x2 - radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x1, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1 + radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x1 + radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x2, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x2 - radiusBottomX, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusBottomX, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x1, highlightPos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x1 + radiusTopX, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2 - radiusTopX, highlightPos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x2, highlightPos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x2 - radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.x2, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x2 - radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x1, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1)
								]));
					}
				}
			}
		}();
		var commands = _v1.a;
		var highlightCommands = _v1.b;
		var viewAuraBar = function (fill) {
			return (!config.highlight) ? A6(viewBar, fill, config.opacity, config.border, config.borderWidth, 1, commands) : A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-highlight')
					]),
				_List_fromArray(
					[
						A6(viewBar, highlightColor, config.highlight, 'transparent', 0, 0, highlightCommands),
						A6(viewBar, fill, config.opacity, config.border, config.borderWidth, 1, commands)
					]));
		};
		var _v3 = config.design;
		if (_v3.$ === 'Nothing') {
			return viewAuraBar(config.color);
		} else {
			var design = _v3.a;
			var _v4 = A2($terezka$elm_charts$Internal$Svg$toPattern, config.color, design);
			var patternDefs = _v4.a;
			var fill = _v4.b;
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-pattern')
					]),
				_List_fromArray(
					[
						patternDefs,
						viewAuraBar(fill)
					]));
		}
	});
var $terezka$elm_charts$Internal$Svg$defaultContainer = {
	attrs: _List_fromArray(
		[
			$elm$svg$Svg$Attributes$style('overflow: visible;')
		]),
	events: _List_Nil,
	htmlAttrs: _List_Nil,
	responsive: true
};
var $terezka$elm_charts$Internal$Svg$barLegend = F2(
	function (config, barConfig) {
		var fontStyle = function () {
			var _v0 = config.fontSize;
			if (_v0.$ === 'Just') {
				var size_ = _v0.a;
				return A2(
					$elm$html$Html$Attributes$style,
					'font-size',
					$elm$core$String$fromInt(size_) + 'px');
			} else {
				return A2($elm$html$Html$Attributes$style, '', '');
			}
		}();
		var fakePlane = {
			x: A7($terezka$elm_charts$Internal$Coordinates$Axis, config.width, 0, 0, 0, 10, 0, 10),
			y: A7($terezka$elm_charts$Internal$Coordinates$Axis, config.height, 0, 0, 0, 10, 0, 10)
		};
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elm-charts__legend'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				config.htmlAttrs),
			_List_fromArray(
				[
					A5(
					$terezka$elm_charts$Internal$Svg$container,
					fakePlane,
					_Utils_update(
						$terezka$elm_charts$Internal$Svg$defaultContainer,
						{responsive: false}),
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$terezka$elm_charts$Internal$Svg$bar,
							fakePlane,
							barConfig,
							{x1: 0, x2: 10, y1: 0, y2: 10})
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							fontStyle,
							A2(
							$elm$html$Html$Attributes$style,
							'margin-left',
							$elm$core$String$fromFloat(config.spacing) + 'px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(config.title)
						]))
				]));
	});
var $terezka$elm_charts$Internal$Svg$defaultBar = {attrs: _List_Nil, border: 'white', borderWidth: 0, color: $terezka$elm_charts$Internal$Helpers$pink, design: $elm$core$Maybe$Nothing, highlight: 0, highlightColor: '', highlightWidth: 10, opacity: 1, roundBottom: 0, roundTop: 0};
var $terezka$elm_charts$Internal$Svg$defaultBarLegend = {color: '#808BAB', fontSize: $elm$core$Maybe$Nothing, height: 10, htmlAttrs: _List_Nil, spacing: 10, title: '', width: 10, xOff: 0, yOff: 0};
var $terezka$elm_charts$Chart$Svg$barLegend = F2(
	function (edits, barAttrs) {
		return A2(
			$terezka$elm_charts$Internal$Svg$barLegend,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultBarLegend),
			A2($terezka$elm_charts$Internal$Helpers$apply, barAttrs, $terezka$elm_charts$Internal$Svg$defaultBar));
	});
var $terezka$elm_charts$Internal$Svg$Row = {$: 'Row'};
var $terezka$elm_charts$Internal$Svg$defaultLegends = {alignment: $terezka$elm_charts$Internal$Svg$Row, anchor: $elm$core$Maybe$Nothing, background: '', border: '', borderWidth: 0, htmlAttrs: _List_Nil, spacing: 10, xOff: 0, yOff: 0};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $terezka$elm_charts$Internal$Svg$positionHtml = F7(
	function (plane, x, y, xOff, yOff, attrs, content) {
		var yPercentage = ((A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y) - yOff) * 100) / plane.y.length;
		var xPercentage = ((A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x) + xOff) * 100) / plane.x.length;
		var posititonStyles = _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$elm$core$String$fromFloat(xPercentage) + '%'),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$elm$core$String$fromFloat(yPercentage) + '%'),
				A2($elm$html$Html$Attributes$style, 'margin-right', '-400px'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute')
			]);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(posititonStyles, attrs),
			content);
	});
var $terezka$elm_charts$Internal$Svg$legendsAt = F5(
	function (plane, x, y, config, children) {
		var otherAttrs = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-charts__legends'),
				A2($elm$html$Html$Attributes$style, 'background', config.background),
				A2($elm$html$Html$Attributes$style, 'border-color', config.border),
				A2(
				$elm$html$Html$Attributes$style,
				'border-width',
				$elm$core$String$fromFloat(config.borderWidth) + 'px'),
				A2($elm$html$Html$Attributes$style, 'border-style', 'solid')
			]);
		var anchorAttrs = function () {
			var _v2 = config.anchor;
			if (_v2.$ === 'Nothing') {
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'transform', 'translate(-0%, 0%)')
					]);
			} else {
				switch (_v2.a.$) {
					case 'End':
						var _v3 = _v2.a;
						return _List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'transform', 'translate(-100%, 0%)')
							]);
					case 'Start':
						var _v4 = _v2.a;
						return _List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'transform', 'translate(-0%, 0%)')
							]);
					default:
						var _v5 = _v2.a;
						return _List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%, 0%)')
							]);
				}
			}
		}();
		var _v0 = function () {
			var _v1 = config.alignment;
			if (_v1.$ === 'Row') {
				return _Utils_Tuple2(
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center')
						]),
					'right');
			} else {
				return _Utils_Tuple2(
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'baseline')
						]),
					'bottom');
			}
		}();
		var alignmentAttrs = _v0.a;
		var direction = _v0.b;
		var paddingStyle = ' .elm-charts__legends .elm-charts__legend {\n              margin-' + (direction + (':' + ($elm$core$String$fromFloat(config.spacing) + ('px;\n            }\n\n            .elm-charts__legends .elm-charts__legend:last-child {\n              margin-' + (direction + ': 0px;\n            }\n        ')))));
		return A7(
			$terezka$elm_charts$Internal$Svg$positionHtml,
			plane,
			x,
			y,
			config.xOff,
			-config.yOff,
			_Utils_ap(
				anchorAttrs,
				_Utils_ap(
					alignmentAttrs,
					_Utils_ap(otherAttrs, config.htmlAttrs))),
			A2(
				$elm$core$List$cons,
				A3(
					$elm$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(paddingStyle)
						])),
				children));
	});
var $terezka$elm_charts$Chart$Svg$legendsAt = F4(
	function (plane, x, y, edits) {
		return A4(
			$terezka$elm_charts$Internal$Svg$legendsAt,
			plane,
			x,
			y,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultLegends));
	});
var $terezka$elm_charts$Internal$Svg$defaultInterpolation = {attrs: _List_Nil, color: $terezka$elm_charts$Internal$Helpers$pink, dashed: _List_Nil, design: $elm$core$Maybe$Nothing, method: $elm$core$Maybe$Nothing, opacity: 0, width: 1};
var $terezka$elm_charts$Internal$Svg$defaultLineLegend = {color: '#808BAB', fontSize: $elm$core$Maybe$Nothing, height: 16, htmlAttrs: _List_Nil, spacing: 10, title: '', width: 30, xOff: 0, yOff: 0};
var $terezka$elm_charts$Internal$Svg$Point = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var $terezka$elm_charts$Internal$Interpolation$linear = $elm$core$List$map(
	$elm$core$List$map(
		function (_v0) {
			var x = _v0.x;
			var y = _v0.y;
			return A2($terezka$elm_charts$Internal$Commands$Line, x, y);
		}));
var $terezka$elm_charts$Internal$Interpolation$First = {$: 'First'};
var $terezka$elm_charts$Internal$Interpolation$Previous = function (a) {
	return {$: 'Previous', a: a};
};
var $terezka$elm_charts$Internal$Interpolation$monotoneCurve = F4(
	function (point0, point1, tangent0, tangent1) {
		var dx = (point1.x - point0.x) / 3;
		return A6($terezka$elm_charts$Internal$Commands$CubicBeziers, point0.x + dx, point0.y + (dx * tangent0), point1.x - dx, point1.y - (dx * tangent1), point1.x, point1.y);
	});
var $terezka$elm_charts$Internal$Interpolation$slope2 = F3(
	function (point0, point1, t) {
		var h = point1.x - point0.x;
		return (!(!h)) ? ((((3 * (point1.y - point0.y)) / h) - t) / 2) : t;
	});
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $terezka$elm_charts$Internal$Interpolation$sign = function (x) {
	return (x < 0) ? (-1) : 1;
};
var $terezka$elm_charts$Internal$Interpolation$toH = F2(
	function (h0, h1) {
		return (!h0) ? ((h1 < 0) ? (0 * (-1)) : h1) : h0;
	});
var $terezka$elm_charts$Internal$Interpolation$slope3 = F3(
	function (point0, point1, point2) {
		var h1 = point2.x - point1.x;
		var h0 = point1.x - point0.x;
		var s0h = A2($terezka$elm_charts$Internal$Interpolation$toH, h0, h1);
		var s0 = (point1.y - point0.y) / s0h;
		var s1h = A2($terezka$elm_charts$Internal$Interpolation$toH, h1, h0);
		var s1 = (point2.y - point1.y) / s1h;
		var p = ((s0 * h1) + (s1 * h0)) / (h0 + h1);
		var slope = ($terezka$elm_charts$Internal$Interpolation$sign(s0) + $terezka$elm_charts$Internal$Interpolation$sign(s1)) * A2(
			$elm$core$Basics$min,
			A2(
				$elm$core$Basics$min,
				$elm$core$Basics$abs(s0),
				$elm$core$Basics$abs(s1)),
			0.5 * $elm$core$Basics$abs(p));
		return $elm$core$Basics$isNaN(slope) ? 0 : slope;
	});
var $terezka$elm_charts$Internal$Interpolation$monotonePart = F2(
	function (points, _v0) {
		var tangent = _v0.a;
		var commands = _v0.b;
		var _v1 = _Utils_Tuple2(tangent, points);
		_v1$4:
		while (true) {
			if (_v1.a.$ === 'First') {
				if (_v1.b.b && _v1.b.b.b) {
					if (_v1.b.b.b.b) {
						var _v2 = _v1.a;
						var _v3 = _v1.b;
						var p0 = _v3.a;
						var _v4 = _v3.b;
						var p1 = _v4.a;
						var _v5 = _v4.b;
						var p2 = _v5.a;
						var rest = _v5.b;
						var t1 = A3($terezka$elm_charts$Internal$Interpolation$slope3, p0, p1, p2);
						var t0 = A3($terezka$elm_charts$Internal$Interpolation$slope2, p0, p1, t1);
						return A2(
							$terezka$elm_charts$Internal$Interpolation$monotonePart,
							A2(
								$elm$core$List$cons,
								p1,
								A2($elm$core$List$cons, p2, rest)),
							_Utils_Tuple2(
								$terezka$elm_charts$Internal$Interpolation$Previous(t1),
								_Utils_ap(
									commands,
									_List_fromArray(
										[
											A4($terezka$elm_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1)
										]))));
					} else {
						var _v9 = _v1.a;
						var _v10 = _v1.b;
						var p0 = _v10.a;
						var _v11 = _v10.b;
						var p1 = _v11.a;
						var t1 = A3($terezka$elm_charts$Internal$Interpolation$slope3, p0, p1, p1);
						return _Utils_Tuple2(
							$terezka$elm_charts$Internal$Interpolation$Previous(t1),
							_Utils_ap(
								commands,
								_List_fromArray(
									[
										A4($terezka$elm_charts$Internal$Interpolation$monotoneCurve, p0, p1, t1, t1),
										A2($terezka$elm_charts$Internal$Commands$Line, p1.x, p1.y)
									])));
					}
				} else {
					break _v1$4;
				}
			} else {
				if (_v1.b.b && _v1.b.b.b) {
					if (_v1.b.b.b.b) {
						var t0 = _v1.a.a;
						var _v6 = _v1.b;
						var p0 = _v6.a;
						var _v7 = _v6.b;
						var p1 = _v7.a;
						var _v8 = _v7.b;
						var p2 = _v8.a;
						var rest = _v8.b;
						var t1 = A3($terezka$elm_charts$Internal$Interpolation$slope3, p0, p1, p2);
						return A2(
							$terezka$elm_charts$Internal$Interpolation$monotonePart,
							A2(
								$elm$core$List$cons,
								p1,
								A2($elm$core$List$cons, p2, rest)),
							_Utils_Tuple2(
								$terezka$elm_charts$Internal$Interpolation$Previous(t1),
								_Utils_ap(
									commands,
									_List_fromArray(
										[
											A4($terezka$elm_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1)
										]))));
					} else {
						var t0 = _v1.a.a;
						var _v12 = _v1.b;
						var p0 = _v12.a;
						var _v13 = _v12.b;
						var p1 = _v13.a;
						var t1 = A3($terezka$elm_charts$Internal$Interpolation$slope3, p0, p1, p1);
						return _Utils_Tuple2(
							$terezka$elm_charts$Internal$Interpolation$Previous(t1),
							_Utils_ap(
								commands,
								_List_fromArray(
									[
										A4($terezka$elm_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1),
										A2($terezka$elm_charts$Internal$Commands$Line, p1.x, p1.y)
									])));
					}
				} else {
					break _v1$4;
				}
			}
		}
		return _Utils_Tuple2(tangent, commands);
	});
var $terezka$elm_charts$Internal$Interpolation$monotoneSection = F2(
	function (points, _v0) {
		var tangent = _v0.a;
		var acc = _v0.b;
		var _v1 = function () {
			if (points.b) {
				var p0 = points.a;
				var rest = points.b;
				return A2(
					$terezka$elm_charts$Internal$Interpolation$monotonePart,
					A2($elm$core$List$cons, p0, rest),
					_Utils_Tuple2(
						tangent,
						_List_fromArray(
							[
								A2($terezka$elm_charts$Internal$Commands$Line, p0.x, p0.y)
							])));
			} else {
				return _Utils_Tuple2(tangent, _List_Nil);
			}
		}();
		var t0 = _v1.a;
		var commands = _v1.b;
		return _Utils_Tuple2(
			t0,
			A2($elm$core$List$cons, commands, acc));
	});
var $terezka$elm_charts$Internal$Interpolation$monotone = function (sections) {
	return A3(
		$elm$core$List$foldr,
		$terezka$elm_charts$Internal$Interpolation$monotoneSection,
		_Utils_Tuple2($terezka$elm_charts$Internal$Interpolation$First, _List_Nil),
		sections).b;
};
var $terezka$elm_charts$Internal$Interpolation$Point = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $terezka$elm_charts$Internal$Interpolation$after = F2(
	function (a, b) {
		return _List_fromArray(
			[
				a,
				A2($terezka$elm_charts$Internal$Interpolation$Point, b.x, a.y),
				b
			]);
	});
var $terezka$elm_charts$Internal$Interpolation$stepped = function (sections) {
	var expand = F2(
		function (result, section) {
			expand:
			while (true) {
				if (section.b) {
					if (section.b.b) {
						var a = section.a;
						var _v1 = section.b;
						var b = _v1.a;
						var rest = _v1.b;
						var $temp$result = _Utils_ap(
							result,
							A2($terezka$elm_charts$Internal$Interpolation$after, a, b)),
							$temp$section = A2($elm$core$List$cons, b, rest);
						result = $temp$result;
						section = $temp$section;
						continue expand;
					} else {
						var last = section.a;
						return result;
					}
				} else {
					return result;
				}
			}
		});
	return A2(
		$elm$core$List$map,
		A2(
			$elm$core$Basics$composeR,
			expand(_List_Nil),
			$elm$core$List$map(
				function (_v2) {
					var x = _v2.x;
					var y = _v2.y;
					return A2($terezka$elm_charts$Internal$Commands$Line, x, y);
				})),
		sections);
};
var $terezka$elm_charts$Internal$Svg$last = function (list) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$drop,
			$elm$core$List$length(list) - 1,
			list));
};
var $terezka$elm_charts$Internal$Svg$withBorder = F2(
	function (stuff, func) {
		if (stuff.b) {
			var first = stuff.a;
			var rest = stuff.b;
			return $elm$core$Maybe$Just(
				A2(
					func,
					first,
					A2(
						$elm$core$Maybe$withDefault,
						first,
						$terezka$elm_charts$Internal$Svg$last(rest))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $terezka$elm_charts$Internal$Svg$toCommands = F4(
	function (method, toX, toY, data) {
		var toSets = F2(
			function (ps, cmds) {
				return A2(
					$terezka$elm_charts$Internal$Svg$withBorder,
					ps,
					F2(
						function (first, last_) {
							return _Utils_Tuple3(first, cmds, last_);
						}));
			});
		var fold = F2(
			function (datum_, acc) {
				var _v1 = toY(datum_);
				if (_v1.$ === 'Just') {
					var y_ = _v1.a;
					if (acc.b) {
						var latest = acc.a;
						var rest = acc.b;
						return A2(
							$elm$core$List$cons,
							_Utils_ap(
								latest,
								_List_fromArray(
									[
										{
										x: toX(datum_),
										y: y_
									}
									])),
							rest);
					} else {
						return A2(
							$elm$core$List$cons,
							_List_fromArray(
								[
									{
									x: toX(datum_),
									y: y_
								}
								]),
							acc);
					}
				} else {
					return A2($elm$core$List$cons, _List_Nil, acc);
				}
			});
		var points = $elm$core$List$reverse(
			A3($elm$core$List$foldl, fold, _List_Nil, data));
		var commands = function () {
			switch (method.$) {
				case 'Linear':
					return $terezka$elm_charts$Internal$Interpolation$linear(points);
				case 'Monotone':
					return $terezka$elm_charts$Internal$Interpolation$monotone(points);
				default:
					return $terezka$elm_charts$Internal$Interpolation$stepped(points);
			}
		}();
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A3($elm$core$List$map2, toSets, points, commands));
	});
var $terezka$elm_charts$Internal$Svg$area = F6(
	function (plane, toX, toY2M, toY, config, data) {
		var _v0 = function () {
			var _v1 = config.design;
			if (_v1.$ === 'Nothing') {
				return _Utils_Tuple2(
					$elm$svg$Svg$text(''),
					config.color);
			} else {
				var design = _v1.a;
				return A2($terezka$elm_charts$Internal$Svg$toPattern, config.color, design);
			}
		}();
		var patternDefs = _v0.a;
		var fill = _v0.b;
		var view = function (cmds) {
			return A4(
				$terezka$elm_charts$Internal$Svg$withAttrs,
				config.attrs,
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__area-section'),
						$elm$svg$Svg$Attributes$fill(fill),
						$elm$svg$Svg$Attributes$fillOpacity(
						$elm$core$String$fromFloat(config.opacity)),
						$elm$svg$Svg$Attributes$strokeWidth('0'),
						$elm$svg$Svg$Attributes$fillRule('evenodd'),
						$elm$svg$Svg$Attributes$d(
						A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
						$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
					]),
				_List_Nil);
		};
		var withUnder = F2(
			function (_v5, _v6) {
				var firstBottom = _v5.a;
				var cmdsBottom = _v5.b;
				var endBottom = _v5.c;
				var firstTop = _v6.a;
				var cmdsTop = _v6.b;
				var endTop = _v6.c;
				return view(
					_Utils_ap(
						_List_fromArray(
							[
								A2($terezka$elm_charts$Internal$Commands$Move, firstBottom.x, firstBottom.y),
								A2($terezka$elm_charts$Internal$Commands$Line, firstTop.x, firstTop.y)
							]),
						_Utils_ap(
							cmdsTop,
							_Utils_ap(
								_List_fromArray(
									[
										A2($terezka$elm_charts$Internal$Commands$Move, firstBottom.x, firstBottom.y)
									]),
								_Utils_ap(
									cmdsBottom,
									_List_fromArray(
										[
											A2($terezka$elm_charts$Internal$Commands$Line, endTop.x, endTop.y)
										]))))));
			});
		var withoutUnder = function (_v4) {
			var first = _v4.a;
			var cmds = _v4.b;
			var end = _v4.c;
			return view(
				_Utils_ap(
					_List_fromArray(
						[
							A2($terezka$elm_charts$Internal$Commands$Move, first.x, 0),
							A2($terezka$elm_charts$Internal$Commands$Line, first.x, first.y)
						]),
					_Utils_ap(
						cmds,
						_List_fromArray(
							[
								A2($terezka$elm_charts$Internal$Commands$Line, end.x, 0)
							]))));
		};
		if (config.opacity <= 0) {
			return $elm$svg$Svg$text('');
		} else {
			var _v2 = config.method;
			if (_v2.$ === 'Nothing') {
				return $elm$svg$Svg$text('');
			} else {
				var method = _v2.a;
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__area-sections')
						]),
					function () {
						if (toY2M.$ === 'Nothing') {
							return A2(
								$elm$core$List$cons,
								patternDefs,
								A2(
									$elm$core$List$map,
									withoutUnder,
									A4($terezka$elm_charts$Internal$Svg$toCommands, method, toX, toY, data)));
						} else {
							var toY2 = toY2M.a;
							return A2(
								$elm$core$List$cons,
								patternDefs,
								A3(
									$elm$core$List$map2,
									withUnder,
									A4($terezka$elm_charts$Internal$Svg$toCommands, method, toX, toY2, data),
									A4($terezka$elm_charts$Internal$Svg$toCommands, method, toX, toY, data)));
						}
					}());
			}
		}
	});
var $terezka$elm_charts$Internal$Svg$interpolation = F5(
	function (plane, toX, toY, config, data) {
		var view = function (_v1) {
			var first = _v1.a;
			var cmds = _v1.b;
			return A4(
				$terezka$elm_charts$Internal$Svg$withAttrs,
				config.attrs,
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__interpolation-section'),
						$elm$svg$Svg$Attributes$fill('transparent'),
						$elm$svg$Svg$Attributes$stroke(config.color),
						$elm$svg$Svg$Attributes$strokeDasharray(
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, config.dashed))),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromFloat(config.width)),
						$elm$svg$Svg$Attributes$d(
						A2(
							$terezka$elm_charts$Internal$Commands$description,
							plane,
							A2(
								$elm$core$List$cons,
								A2($terezka$elm_charts$Internal$Commands$Move, first.x, first.y),
								cmds))),
						$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
					]),
				_List_Nil);
		};
		var _v0 = config.method;
		if (_v0.$ === 'Nothing') {
			return $elm$svg$Svg$text('');
		} else {
			var method = _v0.a;
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__interpolation-sections')
					]),
				A2(
					$elm$core$List$map,
					view,
					A4($terezka$elm_charts$Internal$Svg$toCommands, method, toX, toY, data)));
		}
	});
var $terezka$elm_charts$Internal$Svg$toRadius = F2(
	function (size_, shape) {
		var area_ = (2 * $elm$core$Basics$pi) * size_;
		switch (shape.$) {
			case 'Circle':
				return $elm$core$Basics$sqrt(area_ / $elm$core$Basics$pi);
			case 'Triangle':
				var side = $elm$core$Basics$sqrt(
					(area_ * 4) / $elm$core$Basics$sqrt(3));
				return $elm$core$Basics$sqrt(3) * side;
			case 'Square':
				return $elm$core$Basics$sqrt(area_) / 2;
			case 'Diamond':
				return $elm$core$Basics$sqrt(area_) / 2;
			case 'Cross':
				return $elm$core$Basics$sqrt(area_ / 4);
			default:
				return $elm$core$Basics$sqrt(area_ / 4);
		}
	});
var $terezka$elm_charts$Internal$Svg$lineLegend = F3(
	function (config, interConfig, dotConfig) {
		var topMargin = function () {
			var _v1 = dotConfig.shape;
			if (_v1.$ === 'Just') {
				var shape = _v1.a;
				return A2($terezka$elm_charts$Internal$Svg$toRadius, dotConfig.size, shape);
			} else {
				return 0;
			}
		}();
		var fontStyle = function () {
			var _v0 = config.fontSize;
			if (_v0.$ === 'Just') {
				var size_ = _v0.a;
				return A2(
					$elm$html$Html$Attributes$style,
					'font-size',
					$elm$core$String$fromInt(size_) + 'px');
			} else {
				return A2($elm$html$Html$Attributes$style, '', '');
			}
		}();
		var fakePlane = {
			x: A7($terezka$elm_charts$Internal$Coordinates$Axis, config.width, 0, 0, 0, 10, 0, 10),
			y: A7($terezka$elm_charts$Internal$Coordinates$Axis, config.height, 0, 0, 0, 10, 0, 10)
		};
		var bottomMargin = (!interConfig.opacity) ? topMargin : 0;
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elm-charts__legend'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				config.htmlAttrs),
			_List_fromArray(
				[
					A5(
					$terezka$elm_charts$Internal$Svg$container,
					fakePlane,
					_Utils_update(
						$terezka$elm_charts$Internal$Svg$defaultContainer,
						{responsive: false}),
					_List_Nil,
					_List_fromArray(
						[
							A5(
							$terezka$elm_charts$Internal$Svg$interpolation,
							fakePlane,
							function ($) {
								return $.x;
							},
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.y;
								},
								$elm$core$Maybe$Just),
							interConfig,
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Svg$Point, 0, 5),
									A2($terezka$elm_charts$Internal$Svg$Point, 10, 5)
								])),
							A6(
							$terezka$elm_charts$Internal$Svg$area,
							fakePlane,
							function ($) {
								return $.x;
							},
							$elm$core$Maybe$Nothing,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.y;
								},
								$elm$core$Maybe$Just),
							interConfig,
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Svg$Point, 0, 5),
									A2($terezka$elm_charts$Internal$Svg$Point, 10, 5)
								])),
							A5(
							$terezka$elm_charts$Internal$Svg$dot,
							fakePlane,
							function ($) {
								return $.x;
							},
							function ($) {
								return $.y;
							},
							dotConfig,
							A2($terezka$elm_charts$Internal$Svg$Point, 5, 5))
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							fontStyle,
							A2(
							$elm$html$Html$Attributes$style,
							'margin-left',
							$elm$core$String$fromFloat(config.spacing) + 'px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(config.title)
						]))
				]));
	});
var $terezka$elm_charts$Chart$Attributes$opacity = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{opacity: v});
	});
var $terezka$elm_charts$Chart$Svg$lineLegend = F3(
	function (edits, interAttrsOrg, dotAttrsOrg) {
		var interpolationConfigOrg = A2($terezka$elm_charts$Internal$Helpers$apply, interAttrsOrg, $terezka$elm_charts$Internal$Svg$defaultInterpolation);
		var dotConfigOrg = A2($terezka$elm_charts$Internal$Helpers$apply, dotAttrsOrg, $terezka$elm_charts$Internal$Svg$defaultDot);
		var adjustWidth = function (config) {
			return _Utils_update(
				config,
				{width: 10});
		};
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(interpolationConfigOrg.method, dotConfigOrg.shape);
			if (_v1.a.$ === 'Just') {
				if (_v1.b.$ === 'Nothing') {
					var _v2 = _v1.b;
					return _Utils_Tuple3(
						dotAttrsOrg,
						interAttrsOrg,
						A2(
							$elm$core$List$cons,
							$terezka$elm_charts$Chart$Attributes$width(10),
							edits));
				} else {
					return _Utils_Tuple3(
						dotAttrsOrg,
						A2(
							$elm$core$List$cons,
							$terezka$elm_charts$Chart$Attributes$opacity(0),
							interAttrsOrg),
						edits);
				}
			} else {
				if (_v1.b.$ === 'Nothing') {
					var _v3 = _v1.a;
					var _v4 = _v1.b;
					return _Utils_Tuple3(
						A2($elm$core$List$cons, $terezka$elm_charts$Chart$Attributes$circle, dotAttrsOrg),
						A2($elm$core$List$cons, $terezka$elm_charts$Chart$Attributes$linear, interAttrsOrg),
						A2(
							$elm$core$List$cons,
							$terezka$elm_charts$Chart$Attributes$width(10),
							edits));
				} else {
					var _v5 = _v1.a;
					return _Utils_Tuple3(
						A2($elm$core$List$cons, $terezka$elm_charts$Chart$Attributes$circle, dotAttrsOrg),
						interAttrsOrg,
						A2(
							$elm$core$List$cons,
							$terezka$elm_charts$Chart$Attributes$width(10),
							edits));
				}
			}
		}();
		var dotAttrs = _v0.a;
		var interAttrs = _v0.b;
		var lineLegendAttrs = _v0.c;
		return A3(
			$terezka$elm_charts$Internal$Svg$lineLegend,
			A2($terezka$elm_charts$Internal$Helpers$apply, lineLegendAttrs, $terezka$elm_charts$Internal$Svg$defaultLineLegend),
			A2($terezka$elm_charts$Internal$Helpers$apply, interAttrs, $terezka$elm_charts$Internal$Svg$defaultInterpolation),
			A2($terezka$elm_charts$Internal$Helpers$apply, dotAttrs, $terezka$elm_charts$Internal$Svg$defaultDot));
	});
var $terezka$elm_charts$Chart$Attributes$title = F2(
	function (value, config) {
		return _Utils_update(
			config,
			{title: value});
	});
var $terezka$elm_charts$Chart$legendsAt = F4(
	function (toX, toY, attrs, children) {
		return $terezka$elm_charts$Chart$HtmlElement(
			F2(
				function (p, legends_) {
					var viewLegend = function (legend) {
						if (legend.$ === 'BarLegend') {
							var name = legend.a;
							var barAttrs = legend.b;
							return A2(
								$terezka$elm_charts$Chart$Svg$barLegend,
								A2(
									$elm$core$List$cons,
									$terezka$elm_charts$Chart$Attributes$title(name),
									children),
								barAttrs);
						} else {
							var name = legend.a;
							var interAttrs = legend.b;
							var dotAttrs = legend.c;
							return A3(
								$terezka$elm_charts$Chart$Svg$lineLegend,
								A2(
									$elm$core$List$cons,
									$terezka$elm_charts$Chart$Attributes$title(name),
									children),
								interAttrs,
								dotAttrs);
						}
					};
					return A5(
						$terezka$elm_charts$Chart$Svg$legendsAt,
						p,
						toX(p.x),
						toY(p.y),
						attrs,
						A2($elm$core$List$map, viewLegend, legends_));
				}));
	});
var $terezka$elm_charts$Internal$Svg$Monotone = {$: 'Monotone'};
var $terezka$elm_charts$Chart$Attributes$monotone = function (config) {
	return _Utils_update(
		config,
		{
			method: $elm$core$Maybe$Just($terezka$elm_charts$Internal$Svg$Monotone)
		});
};
var $terezka$elm_charts$Chart$Attributes$moveRight = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{xOff: config.xOff + v});
	});
var $terezka$elm_charts$Internal$Property$Stacked = function (a) {
	return {$: 'Stacked', a: a};
};
var $terezka$elm_charts$Internal$Property$meta = F2(
	function (value, prop) {
		if (prop.$ === 'Property') {
			var con = prop.a;
			return $terezka$elm_charts$Internal$Property$Property(
				_Utils_update(
					con,
					{
						meta: $elm$core$Maybe$Just(value)
					}));
		} else {
			var cons = prop.a;
			return $terezka$elm_charts$Internal$Property$Stacked(
				A2(
					$elm$core$List$map,
					function (con) {
						return _Utils_update(
							con,
							{
								meta: $elm$core$Maybe$Just(value)
							});
					},
					cons));
		}
	});
var $terezka$elm_charts$Chart$named = function (name) {
	return $terezka$elm_charts$Internal$Property$meta(name);
};
var $terezka$elm_charts$Chart$none = $terezka$elm_charts$Chart$HtmlElement(
	F2(
		function (_v0, _v1) {
			return $elm$html$Html$text('');
		}));
var $terezka$elm_charts$Internal$Events$getCoords = $terezka$elm_charts$Internal$Events$Decoder(
	F3(
		function (_v0, plane, searched) {
			return searched;
		}));
var $terezka$elm_charts$Chart$Events$getCoords = $terezka$elm_charts$Internal$Events$getCoords;
var $terezka$elm_charts$Internal$Events$map = F2(
	function (f, _v0) {
		var a = _v0.a;
		return $terezka$elm_charts$Internal$Events$Decoder(
			F3(
				function (ps, s, p) {
					return f(
						A3(a, ps, s, p));
				}));
	});
var $terezka$elm_charts$Chart$Events$map = $terezka$elm_charts$Internal$Events$map;
var $terezka$elm_charts$Internal$Events$Event = function (a) {
	return {$: 'Event', a: a};
};
var $terezka$elm_charts$Internal$Events$on = F3(
	function (name, decoder, config) {
		return _Utils_update(
			config,
			{
				events: A2(
					$elm$core$List$cons,
					$terezka$elm_charts$Internal$Events$Event(
						{decoder: decoder, name: name}),
					config.events)
			});
	});
var $terezka$elm_charts$Chart$Events$on = $terezka$elm_charts$Internal$Events$on;
var $terezka$elm_charts$Chart$Events$onMouseLeave = function (onMsg) {
	return A2(
		$terezka$elm_charts$Chart$Events$on,
		'mouseleave',
		A2(
			$terezka$elm_charts$Chart$Events$map,
			$elm$core$Basics$always(onMsg),
			$terezka$elm_charts$Chart$Events$getCoords));
};
var $terezka$elm_charts$Chart$Events$onMouseMove = F2(
	function (onMsg, decoder) {
		return A2(
			$terezka$elm_charts$Chart$Events$on,
			'mousemove',
			A2($terezka$elm_charts$Chart$Events$map, onMsg, decoder));
	});
var $terezka$elm_charts$Chart$Attributes$orHigher = F3(
	function (most, real, _v0) {
		return (_Utils_cmp(real, most) < 0) ? most : real;
	});
var $terezka$elm_charts$Chart$Attributes$padding = F2(
	function (value, config) {
		return _Utils_update(
			config,
			{padding: value});
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $terezka$elm_charts$Chart$Indexed = function (a) {
	return {$: 'Indexed', a: a};
};
var $terezka$elm_charts$Chart$SeriesElement = F4(
	function (a, b, c, d) {
		return {$: 'SeriesElement', a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Item$toHtml = function (_v0) {
	var item = _v0.a;
	return item.toHtml(item.config);
};
var $terezka$elm_charts$Internal$Item$toSvg = F2(
	function (plane, _v0) {
		var item = _v0.a;
		return A3(
			item.toSvg,
			plane,
			item.config,
			A2(item.toPosition, plane, item.config));
	});
var $terezka$elm_charts$Internal$Item$generalize = F2(
	function (toAny, _v0) {
		var item = _v0.a;
		return $terezka$elm_charts$Internal$Item$Rendered(
			{
				config: {
					product: toAny(item.config.product),
					toAny: $elm$core$Basics$identity,
					tooltipInfo: item.config.tooltipInfo,
					values: item.config.values
				},
				toHtml: function (c) {
					return $terezka$elm_charts$Internal$Item$toHtml(
						$terezka$elm_charts$Internal$Item$Rendered(item));
				},
				toLimits: function (_v1) {
					return item.toLimits(item.config);
				},
				toPosition: F2(
					function (plane, _v2) {
						return A2(item.toPosition, plane, item.config);
					}),
				toSvg: F3(
					function (plane, _v3, _v4) {
						return A2(
							$terezka$elm_charts$Internal$Item$toSvg,
							plane,
							$terezka$elm_charts$Internal$Item$Rendered(item));
					})
			});
	});
var $terezka$elm_charts$Internal$Many$getMembers = function (_v0) {
	var group_ = _v0.a;
	return function (_v1) {
		var x = _v1.a;
		var xs = _v1.b;
		return A2($elm$core$List$cons, x, xs);
	}(group_.config.items);
};
var $terezka$elm_charts$Internal$Many$getGenerals = function (group_) {
	var generalize = function (_v0) {
		var item = _v0.a;
		return A2(
			$terezka$elm_charts$Internal$Item$generalize,
			item.config.toAny,
			$terezka$elm_charts$Internal$Item$Rendered(item));
	};
	return A2(
		$elm$core$List$map,
		generalize,
		$terezka$elm_charts$Internal$Many$getMembers(group_));
};
var $terezka$elm_charts$Internal$Item$getLimits = function (_v0) {
	var item = _v0.a;
	return item.toLimits(item.config);
};
var $terezka$elm_charts$Internal$Item$map = F2(
	function (func, _v0) {
		var item = _v0.a;
		return $terezka$elm_charts$Internal$Item$Rendered(
			{
				config: {
					product: item.config.product,
					toAny: item.config.toAny,
					tooltipInfo: item.config.tooltipInfo,
					values: {
						datum: func(item.config.values.datum),
						isReal: item.config.values.isReal,
						x1: item.config.values.x1,
						x2: item.config.values.x2,
						y: item.config.values.y
					}
				},
				toHtml: function (_v1) {
					return $terezka$elm_charts$Internal$Item$toHtml(
						$terezka$elm_charts$Internal$Item$Rendered(item));
				},
				toLimits: function (_v2) {
					return item.toLimits(item.config);
				},
				toPosition: F2(
					function (plane, _v3) {
						return A2(item.toPosition, plane, item.config);
					}),
				toSvg: F3(
					function (plane, _v4, _v5) {
						return A2(
							$terezka$elm_charts$Internal$Item$toSvg,
							plane,
							$terezka$elm_charts$Internal$Item$Rendered(item));
					})
			});
	});
var $elm$svg$Svg$map = $elm$virtual_dom$VirtualDom$map;
var $terezka$elm_charts$Internal$Property$toConfigs = function (prop) {
	if (prop.$ === 'Property') {
		var config = prop.a;
		return _List_fromArray(
			[config]);
	} else {
		var configs = prop.a;
		return configs;
	}
};
var $terezka$elm_charts$Internal$Legend$LineLegend = F3(
	function (a, b, c) {
		return {$: 'LineLegend', a: a, b: b, c: c};
	});
var $terezka$elm_charts$Chart$Attributes$border = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{border: v});
	});
var $terezka$elm_charts$Internal$Helpers$blue = '#12A5ED';
var $terezka$elm_charts$Internal$Helpers$brown = '#871c1c';
var $terezka$elm_charts$Internal$Helpers$green = '#71c614';
var $terezka$elm_charts$Internal$Helpers$moss = '#92b42c';
var $terezka$elm_charts$Internal$Helpers$orange = '#FF8400';
var $terezka$elm_charts$Internal$Helpers$purple = '#7b4dff';
var $terezka$elm_charts$Internal$Helpers$red = '#F5325B';
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $terezka$elm_charts$Internal$Helpers$toDefault = F3(
	function (_default, items, index) {
		var dict = $elm$core$Dict$fromList(
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, items));
		var numOfItems = $elm$core$Dict$size(dict);
		var itemIndex = index % numOfItems;
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A2($elm$core$Dict$get, itemIndex, dict));
	});
var $terezka$elm_charts$Internal$Helpers$turquoise = '#22d2ba';
var $terezka$elm_charts$Internal$Helpers$yellow = '#FFCA00';
var $terezka$elm_charts$Internal$Helpers$toDefaultColor = A2(
	$terezka$elm_charts$Internal$Helpers$toDefault,
	$terezka$elm_charts$Internal$Helpers$pink,
	_List_fromArray(
		[$terezka$elm_charts$Internal$Helpers$purple, $terezka$elm_charts$Internal$Helpers$pink, $terezka$elm_charts$Internal$Helpers$blue, $terezka$elm_charts$Internal$Helpers$green, $terezka$elm_charts$Internal$Helpers$red, $terezka$elm_charts$Internal$Helpers$yellow, $terezka$elm_charts$Internal$Helpers$turquoise, $terezka$elm_charts$Internal$Helpers$orange, $terezka$elm_charts$Internal$Helpers$moss, $terezka$elm_charts$Internal$Helpers$brown]));
var $terezka$elm_charts$Internal$Legend$toDotLegends = F2(
	function (elIndex, properties) {
		var toInterConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultInterpolation);
		};
		var toDotLegend = F3(
			function (props, prop, colorIndex) {
				var defaultOpacity = ($elm$core$List$length(props) > 1) ? 0.4 : 0;
				var interAttr = _Utils_ap(
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(
							$terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex)),
							$terezka$elm_charts$Chart$Attributes$opacity(defaultOpacity)
						]),
					prop.inter);
				var interConfig = toInterConfig(interAttr);
				var defaultName = 'Property #' + $elm$core$String$fromInt(colorIndex + 1);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$color(interConfig.color),
						$terezka$elm_charts$Chart$Attributes$border(interConfig.color),
						_Utils_eq(interConfig.method, $elm$core$Maybe$Nothing) ? $terezka$elm_charts$Chart$Attributes$circle : $elm$core$Basics$identity
					]);
				var dotAttrs = _Utils_ap(defaultAttrs, prop.attrs);
				return A3(
					$terezka$elm_charts$Internal$Legend$LineLegend,
					A2($elm$core$Maybe$withDefault, defaultName, prop.meta),
					interAttr,
					dotAttrs);
			});
		return A2(
			$elm$core$List$indexedMap,
			F2(
				function (propIndex, f) {
					return f(elIndex + propIndex);
				}),
			A2(
				$elm$core$List$concatMap,
				function (ps) {
					return A2(
						$elm$core$List$map,
						toDotLegend(ps),
						ps);
				},
				A2($elm$core$List$map, $terezka$elm_charts$Internal$Property$toConfigs, properties)));
	});
var $elm$html$Html$table = _VirtualDom_node('table');
var $terezka$elm_charts$Internal$Produce$toDefaultName = F2(
	function (index, name) {
		return A2(
			$elm$core$Maybe$withDefault,
			'Property #' + $elm$core$String$fromInt(index + 1),
			name);
	});
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $terezka$elm_charts$Internal$Produce$tooltipRow = F3(
	function (color, title, text) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'padding', '0'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '3px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title + ':')
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2($elm$html$Html$Attributes$style, 'padding', '0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(text)
						]))
				]));
	});
var $terezka$elm_charts$Internal$Produce$toDotSeries = F4(
	function (elIndex, toX, properties, data) {
		var toInterConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultInterpolation);
		};
		var toDotConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultDot);
		};
		var toDotItem = F7(
			function (lineIndex, stackIndex, colorIndex, prop, interConfig, dataIndex, datum_) {
				var y_ = A2(
					$elm$core$Maybe$withDefault,
					0,
					prop.visual(datum_));
				var x_ = toX(datum_);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$color(interConfig.color),
						$terezka$elm_charts$Chart$Attributes$border(interConfig.color),
						_Utils_eq(interConfig.method, $elm$core$Maybe$Nothing) ? $terezka$elm_charts$Chart$Attributes$circle : $elm$core$Basics$identity
					]);
				var dotAttrs = _Utils_ap(
					defaultAttrs,
					_Utils_ap(
						prop.attrs,
						A5(prop.extra, lineIndex, stackIndex, dataIndex, prop.meta, datum_)));
				var config = toDotConfig(dotAttrs);
				return $terezka$elm_charts$Internal$Item$Rendered(
					{
						config: {
							product: config,
							toAny: $terezka$elm_charts$Internal$Item$Dot,
							tooltipInfo: {
								border: config.border,
								borderWidth: config.borderWidth,
								color: function () {
									var _v6 = config.color;
									if (_v6 === 'white') {
										return interConfig.color;
									} else {
										return config.color;
									}
								}(),
								data: dataIndex,
								elIndex: elIndex,
								formatted: prop.format(datum_),
								index: colorIndex,
								name: prop.meta,
								property: lineIndex,
								stack: stackIndex
							},
							values: {
								datum: datum_,
								isReal: function () {
									var _v7 = prop.value(datum_);
									if (_v7.$ === 'Just') {
										return true;
									} else {
										return false;
									}
								}(),
								x1: x_,
								x2: x_,
								y: y_
							}
						},
						toHtml: function (c) {
							return _List_fromArray(
								[
									A3(
									$terezka$elm_charts$Internal$Produce$tooltipRow,
									c.tooltipInfo.color,
									A2($terezka$elm_charts$Internal$Produce$toDefaultName, colorIndex, c.tooltipInfo.name),
									prop.format(datum_))
								]);
						},
						toLimits: function (_v8) {
							return {x1: x_, x2: x_, y1: y_, y2: y_};
						},
						toPosition: F2(
							function (plane, _v9) {
								var radius = A2(
									$elm$core$Maybe$withDefault,
									0,
									A2(
										$elm$core$Maybe$map,
										$terezka$elm_charts$Internal$Svg$toRadius(config.size),
										config.shape));
								var radiusX_ = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, radius);
								var radiusY_ = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, radius);
								return {x1: x_ - radiusX_, x2: x_ + radiusX_, y1: y_ - radiusY_, y2: y_ + radiusY_};
							}),
						toSvg: F3(
							function (plane, _v10, _v11) {
								var _v12 = prop.value(datum_);
								if (_v12.$ === 'Nothing') {
									return $elm$svg$Svg$text('');
								} else {
									return A5(
										$terezka$elm_charts$Internal$Svg$dot,
										plane,
										function ($) {
											return $.x;
										},
										function ($) {
											return $.y;
										},
										config,
										{x: x_, y: y_});
								}
							})
					});
			});
		var toSeriesItem = F5(
			function (lineIndex, stacks, stackIndex, prop, colorIndex) {
				var defaultOpacity = ($elm$core$List$length(stacks) > 1) ? 0.4 : 0;
				var interAttr = _Utils_ap(
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(
							$terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex)),
							$terezka$elm_charts$Chart$Attributes$opacity(defaultOpacity)
						]),
					prop.inter);
				var interConfig = toInterConfig(interAttr);
				var dotItems = A2(
					$elm$core$List$indexedMap,
					A5(toDotItem, lineIndex, stackIndex, colorIndex, prop, interConfig),
					data);
				if (!dotItems.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var first = dotItems.a;
					var rest = dotItems.b;
					return $elm$core$Maybe$Just(
						$terezka$elm_charts$Internal$Item$Rendered(
							{
								config: {
									items: _Utils_Tuple2(first, rest)
								},
								toHtml: function (c) {
									return _List_fromArray(
										[
											A2(
											$elm$html$Html$table,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin', '0')
												]),
											A2(
												$elm$core$List$concatMap,
												$terezka$elm_charts$Internal$Item$toHtml,
												function (_v1) {
													var x = _v1.a;
													var xs = _v1.b;
													return A2($elm$core$List$cons, x, xs);
												}(c.items)))
										]);
								},
								toLimits: function (c) {
									return A2(
										$terezka$elm_charts$Internal$Coordinates$foldPosition,
										$terezka$elm_charts$Internal$Item$getLimits,
										function (_v2) {
											var x = _v2.a;
											var xs = _v2.b;
											return A2($elm$core$List$cons, x, xs);
										}(c.items));
								},
								toPosition: F2(
									function (plane, c) {
										return A2(
											$terezka$elm_charts$Internal$Coordinates$foldPosition,
											$terezka$elm_charts$Internal$Item$getPosition(plane),
											function (_v3) {
												var x = _v3.a;
												var xs = _v3.b;
												return A2($elm$core$List$cons, x, xs);
											}(c.items));
									}),
								toSvg: F3(
									function (plane, _v4, _v5) {
										var toBottom = function (datum_) {
											return A3(
												$elm$core$Maybe$map2,
												F2(
													function (real, visual) {
														return visual - real;
													}),
												prop.value(datum_),
												prop.visual(datum_));
										};
										return A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$class('elm-charts__series')
												]),
											_List_fromArray(
												[
													A6(
													$terezka$elm_charts$Internal$Svg$area,
													plane,
													toX,
													$elm$core$Maybe$Just(toBottom),
													prop.visual,
													interConfig,
													data),
													A5($terezka$elm_charts$Internal$Svg$interpolation, plane, toX, prop.visual, interConfig, data),
													A2(
													$elm$svg$Svg$g,
													_List_fromArray(
														[
															$elm$svg$Svg$Attributes$class('elm-charts__dots')
														]),
													A2(
														$elm$core$List$map,
														$terezka$elm_charts$Internal$Item$toSvg(plane),
														dotItems))
												]));
									})
							}));
				}
			});
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (propIndex, f) {
						return f(elIndex + propIndex);
					}),
				$elm$core$List$concat(
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (lineIndex, stacks) {
								return A2(
									$elm$core$List$indexedMap,
									A2(toSeriesItem, lineIndex, stacks),
									stacks);
							}),
						A2($elm$core$List$map, $terezka$elm_charts$Internal$Property$toConfigs, properties)))));
	});
var $terezka$elm_charts$Chart$seriesMap = F4(
	function (mapData, toX, properties, data) {
		return $terezka$elm_charts$Chart$Indexed(
			function (index) {
				var legends_ = A2($terezka$elm_charts$Internal$Legend$toDotLegends, index, properties);
				var items = A4($terezka$elm_charts$Internal$Produce$toDotSeries, index, toX, properties, data);
				var toLimits = A2($elm$core$List$map, $terezka$elm_charts$Internal$Item$getLimits, items);
				var generalized = A2(
					$elm$core$List$map,
					$terezka$elm_charts$Internal$Item$map(mapData),
					A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Many$getGenerals, items));
				return _Utils_Tuple2(
					A4(
						$terezka$elm_charts$Chart$SeriesElement,
						toLimits,
						generalized,
						legends_,
						function (p) {
							return A2(
								$elm$svg$Svg$map,
								$elm$core$Basics$never,
								A2(
									$elm$svg$Svg$g,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$class('elm-charts__dot-series')
										]),
									A2(
										$elm$core$List$map,
										$terezka$elm_charts$Internal$Item$toSvg(p),
										items)));
						}),
					index + $elm$core$List$length(
						A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Property$toConfigs, properties)));
			});
	});
var $terezka$elm_charts$Chart$series = F3(
	function (toX, properties, data) {
		return A4($terezka$elm_charts$Chart$seriesMap, $elm$core$Basics$identity, toX, properties, data);
	});
var $terezka$elm_charts$Chart$Attributes$spacing = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{spacing: v});
	});
var $terezka$elm_charts$Chart$html = function (func) {
	return $terezka$elm_charts$Chart$HtmlElement(
		F2(
			function (p, _v0) {
				return func(p);
			}));
};
var $terezka$elm_charts$Internal$Svg$defaultTooltip = {arrow: true, background: 'white', border: '#D8D8D8', direction: $elm$core$Maybe$Nothing, focal: $elm$core$Maybe$Nothing, height: 0, offset: 8, width: 0};
var $terezka$elm_charts$Internal$Svg$Bottom = {$: 'Bottom'};
var $terezka$elm_charts$Internal$Svg$Left = {$: 'Left'};
var $terezka$elm_charts$Internal$Svg$Right = {$: 'Right'};
var $terezka$elm_charts$Internal$Svg$Top = {$: 'Top'};
var $terezka$elm_charts$Internal$Coordinates$bottom = function (pos) {
	return {x: pos.x1 + ((pos.x2 - pos.x1) / 2), y: pos.y1};
};
var $terezka$elm_charts$Internal$Coordinates$left = function (pos) {
	return {x: pos.x1, y: pos.y1 + ((pos.y2 - pos.y1) / 2)};
};
var $terezka$elm_charts$Internal$Coordinates$right = function (pos) {
	return {x: pos.x2, y: pos.y1 + ((pos.y2 - pos.y1) / 2)};
};
var $terezka$elm_charts$Internal$Svg$tooltipPointerStyle = F4(
	function (direction, className, background, borderColor) {
		var config = function () {
			switch (direction.$) {
				case 'Top':
					return {a: 'right', b: 'top', c: 'left'};
				case 'Bottom':
					return {a: 'right', b: 'bottom', c: 'left'};
				case 'Left':
					return {a: 'bottom', b: 'left', c: 'top'};
				case 'Right':
					return {a: 'bottom', b: 'right', c: 'top'};
				case 'LeftOrRight':
					return {a: 'bottom', b: 'left', c: 'top'};
				default:
					return {a: 'right', b: 'top', c: 'left'};
			}
		}();
		return '\n  .' + (className + (':before, .' + (className + (':after {\n    content: "";\n    position: absolute;\n    border-' + (config.c + (': 5px solid transparent;\n    border-' + (config.a + (': 5px solid transparent;\n    ' + (config.b + (': 100%;\n    ' + (config.c + (': 50%;\n    margin-' + (config.c + (': -5px;\n  }\n\n  .' + (className + (':after {\n    border-' + (config.b + (': 5px solid ' + (background + (';\n    margin-' + (config.b + (': -1px;\n    z-index: 1;\n    height: 0px;\n  }\n\n  .' + (className + (':before {\n    border-' + (config.b + (': 5px solid ' + (borderColor + ';\n    height: 0px;\n  }\n  ')))))))))))))))))))))))))));
	});
var $terezka$elm_charts$Internal$Coordinates$top = function (pos) {
	return {x: pos.x1 + ((pos.x2 - pos.x1) / 2), y: pos.y2};
};
var $terezka$elm_charts$Internal$Svg$tooltip = F5(
	function (plane, pos, config, htmlAttrs, content) {
		var distanceTop = A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, pos.y2);
		var distanceRight = plane.x.length - A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, pos.x1);
		var distanceLeft = A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, pos.x2);
		var distanceBottom = plane.y.length - A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, pos.y1);
		var direction = function () {
			var _v5 = config.direction;
			if (_v5.$ === 'Just') {
				switch (_v5.a.$) {
					case 'LeftOrRight':
						var _v6 = _v5.a;
						return (config.width > 0) ? ((_Utils_cmp(distanceLeft, config.width + config.offset) > 0) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right) : ((_Utils_cmp(distanceLeft, distanceRight) > 0) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right);
					case 'TopOrBottom':
						var _v7 = _v5.a;
						return (config.height > 0) ? ((_Utils_cmp(distanceTop, config.height + config.offset) > 0) ? $terezka$elm_charts$Internal$Svg$Top : $terezka$elm_charts$Internal$Svg$Bottom) : ((_Utils_cmp(distanceTop, distanceBottom) > 0) ? $terezka$elm_charts$Internal$Svg$Top : $terezka$elm_charts$Internal$Svg$Bottom);
					default:
						var dir = _v5.a;
						return dir;
				}
			} else {
				var isLargest = function (a) {
					return $elm$core$List$all(
						function (b) {
							return _Utils_cmp(a, b) > -1;
						});
				};
				return A2(
					isLargest,
					distanceTop,
					_List_fromArray(
						[distanceBottom, distanceLeft, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Top : (A2(
					isLargest,
					distanceBottom,
					_List_fromArray(
						[distanceTop, distanceLeft, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Bottom : (A2(
					isLargest,
					distanceLeft,
					_List_fromArray(
						[distanceTop, distanceBottom, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right));
			}
		}();
		var focalPoint = function () {
			var _v2 = config.focal;
			if (_v2.$ === 'Just') {
				var focal = _v2.a;
				switch (direction.$) {
					case 'Top':
						return $terezka$elm_charts$Internal$Coordinates$top(
							focal(pos));
					case 'Bottom':
						return $terezka$elm_charts$Internal$Coordinates$bottom(
							focal(pos));
					case 'Left':
						return $terezka$elm_charts$Internal$Coordinates$left(
							focal(pos));
					case 'Right':
						return $terezka$elm_charts$Internal$Coordinates$right(
							focal(pos));
					case 'LeftOrRight':
						return $terezka$elm_charts$Internal$Coordinates$left(
							focal(pos));
					default:
						return $terezka$elm_charts$Internal$Coordinates$right(
							focal(pos));
				}
			} else {
				switch (direction.$) {
					case 'Top':
						return $terezka$elm_charts$Internal$Coordinates$top(pos);
					case 'Bottom':
						return $terezka$elm_charts$Internal$Coordinates$bottom(pos);
					case 'Left':
						return $terezka$elm_charts$Internal$Coordinates$left(pos);
					case 'Right':
						return $terezka$elm_charts$Internal$Coordinates$right(pos);
					case 'LeftOrRight':
						return $terezka$elm_charts$Internal$Coordinates$left(pos);
					default:
						return $terezka$elm_charts$Internal$Coordinates$right(pos);
				}
			}
		}();
		var arrowWidth = config.arrow ? 4 : 0;
		var _v0 = function () {
			switch (direction.$) {
				case 'Top':
					return {className: 'elm-charts__tooltip-top', transformation: 'translate(-50%, -100%)', xOff: 0, yOff: config.offset + arrowWidth};
				case 'Bottom':
					return {className: 'elm-charts__tooltip-bottom', transformation: 'translate(-50%, 0%)', xOff: 0, yOff: (-config.offset) - arrowWidth};
				case 'Left':
					return {className: 'elm-charts__tooltip-left', transformation: 'translate(-100%, -50%)', xOff: (-config.offset) - arrowWidth, yOff: 0};
				case 'Right':
					return {className: 'elm-charts__tooltip-right', transformation: 'translate(0, -50%)', xOff: config.offset + arrowWidth, yOff: 0};
				case 'LeftOrRight':
					return {className: 'elm-charts__tooltip-leftOrRight', transformation: 'translate(0, -50%)', xOff: (-config.offset) - arrowWidth, yOff: 0};
				default:
					return {className: 'elm-charts__tooltip-topOrBottom', transformation: 'translate(-50%, -100%)', xOff: 0, yOff: config.offset + arrowWidth};
			}
		}();
		var xOff = _v0.xOff;
		var yOff = _v0.yOff;
		var transformation = _v0.transformation;
		var className = _v0.className;
		var children = config.arrow ? A2(
			$elm$core$List$cons,
			A3(
				$elm$html$Html$node,
				'style',
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A4($terezka$elm_charts$Internal$Svg$tooltipPointerStyle, direction, className, config.background, config.border))
					])),
			content) : content;
		var attributes = _Utils_ap(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(className),
					A2($elm$html$Html$Attributes$style, 'transform', transformation),
					A2($elm$html$Html$Attributes$style, 'padding', '5px 8px'),
					A2($elm$html$Html$Attributes$style, 'background', config.background),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + config.border),
					A2($elm$html$Html$Attributes$style, 'border-radius', '3px'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
				]),
			htmlAttrs);
		return A2(
			$elm$html$Html$map,
			$elm$core$Basics$never,
			A7($terezka$elm_charts$Internal$Svg$positionHtml, plane, focalPoint.x, focalPoint.y, xOff, yOff, attributes, children));
	});
var $terezka$elm_charts$Chart$Svg$tooltip = F3(
	function (plane, pos, edits) {
		return A3(
			$terezka$elm_charts$Internal$Svg$tooltip,
			plane,
			pos,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultTooltip));
	});
var $terezka$elm_charts$Chart$tooltip = F4(
	function (i, edits, attrs_, content) {
		return $terezka$elm_charts$Chart$html(
			function (p) {
				var pos = $terezka$elm_charts$Internal$Item$getLimits(i);
				var content_ = _Utils_eq(content, _List_Nil) ? $terezka$elm_charts$Internal$Item$toHtml(i) : content;
				return A3($terezka$elm_charts$Internal$Svg$isWithinPlane, p, pos.x1, pos.y2) ? A5(
					$terezka$elm_charts$Chart$Svg$tooltip,
					p,
					A2($terezka$elm_charts$Internal$Item$getPosition, p, i),
					edits,
					attrs_,
					content_) : $elm$html$Html$text('');
			});
	});
var $terezka$elm_charts$Chart$Attributes$withGrid = function (config) {
	return _Utils_update(
		config,
		{grid: true});
};
var $terezka$elm_charts$Internal$Svg$Floats = {$: 'Floats'};
var $terezka$elm_charts$Chart$LabelsElement = F3(
	function (a, b, c) {
		return {$: 'LabelsElement', a: a, b: b, c: c};
	});
var $terezka$elm_charts$Internal$Svg$defaultLabel = {anchor: $elm$core$Maybe$Nothing, attrs: _List_Nil, border: 'white', borderWidth: 0, color: '#808BAB', ellipsis: $elm$core$Maybe$Nothing, fontSize: $elm$core$Maybe$Nothing, hideOverflow: false, rotate: 0, uppercase: false, xOff: 0, yOff: 0};
var $terezka$elm_charts$Internal$Svg$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $terezka$intervals$Intervals$Around = function (a) {
	return {$: 'Around', a: a};
};
var $terezka$intervals$Intervals$around = $terezka$intervals$Intervals$Around;
var $terezka$intervals$Intervals$ceilingTo = F2(
	function (prec, number) {
		return prec * $elm$core$Basics$ceiling(number / prec);
	});
var $terezka$intervals$Intervals$getBeginning = F2(
	function (min, interval) {
		var multiple = min / interval;
		return _Utils_eq(
			multiple,
			$elm$core$Basics$round(multiple)) ? min : A2($terezka$intervals$Intervals$ceilingTo, interval, min);
	});
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $elm$core$String$toFloat = _String_toFloat;
var $terezka$intervals$Intervals$correctFloat = function (prec) {
	return A2(
		$elm$core$Basics$composeR,
		$myrho$elm_round$Round$round(prec),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toFloat,
			$elm$core$Maybe$withDefault(0)));
};
var $terezka$intervals$Intervals$getMultiples = F3(
	function (magnitude, allowDecimals, hasTickAmount) {
		var defaults = hasTickAmount ? _List_fromArray(
			[1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) : _List_fromArray(
			[1, 2, 2.5, 5, 10]);
		return allowDecimals ? defaults : ((magnitude === 1) ? A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(
					$elm$core$Basics$round(n),
					n);
			},
			defaults) : ((magnitude <= 0.1) ? _List_fromArray(
			[1 / magnitude]) : defaults));
	});
var $terezka$intervals$Intervals$getPrecision = function (number) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(number));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var before = _v0.a;
		var _v1 = _v0.b;
		var after = _v1.a;
		return $elm$core$Basics$abs(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(after)));
	} else {
		var _v2 = A2(
			$elm$core$String$split,
			'.',
			$elm$core$String$fromFloat(number));
		if ((_v2.b && _v2.b.b) && (!_v2.b.b.b)) {
			var before = _v2.a;
			var _v3 = _v2.b;
			var after = _v3.a;
			return $elm$core$String$length(after);
		} else {
			return 0;
		}
	}
};
var $elm$core$Basics$e = _Basics_e;
var $terezka$intervals$Intervals$toMagnitude = function (num) {
	return A2(
		$elm$core$Basics$pow,
		10,
		$elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, $elm$core$Basics$e, num) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
};
var $terezka$intervals$Intervals$getInterval = F3(
	function (intervalRaw, allowDecimals, hasTickAmount) {
		var magnitude = $terezka$intervals$Intervals$toMagnitude(intervalRaw);
		var multiples = A3($terezka$intervals$Intervals$getMultiples, magnitude, allowDecimals, hasTickAmount);
		var normalized = intervalRaw / magnitude;
		var findMultipleExact = function (multiples_) {
			findMultipleExact:
			while (true) {
				if (multiples_.b) {
					var m1 = multiples_.a;
					var rest = multiples_.b;
					if (_Utils_cmp(m1 * magnitude, intervalRaw) > -1) {
						return m1;
					} else {
						var $temp$multiples_ = rest;
						multiples_ = $temp$multiples_;
						continue findMultipleExact;
					}
				} else {
					return 1;
				}
			}
		};
		var findMultiple = function (multiples_) {
			findMultiple:
			while (true) {
				if (multiples_.b) {
					if (multiples_.b.b) {
						var m1 = multiples_.a;
						var _v2 = multiples_.b;
						var m2 = _v2.a;
						var rest = _v2.b;
						if (_Utils_cmp(normalized, (m1 + m2) / 2) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = A2($elm$core$List$cons, m2, rest);
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					} else {
						var m1 = multiples_.a;
						var rest = multiples_.b;
						if (_Utils_cmp(normalized, m1) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = rest;
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					}
				} else {
					return 1;
				}
			}
		};
		var multiple = hasTickAmount ? findMultipleExact(multiples) : findMultiple(multiples);
		var precision = $terezka$intervals$Intervals$getPrecision(magnitude) + $terezka$intervals$Intervals$getPrecision(multiple);
		return A2($terezka$intervals$Intervals$correctFloat, precision, multiple * magnitude);
	});
var $terezka$intervals$Intervals$positions = F5(
	function (range, beginning, interval, m, acc) {
		positions:
		while (true) {
			var nextPosition = A2(
				$terezka$intervals$Intervals$correctFloat,
				$terezka$intervals$Intervals$getPrecision(interval),
				beginning + (m * interval));
			if (_Utils_cmp(nextPosition, range.max) > 0) {
				return acc;
			} else {
				var $temp$range = range,
					$temp$beginning = beginning,
					$temp$interval = interval,
					$temp$m = m + 1,
					$temp$acc = _Utils_ap(
					acc,
					_List_fromArray(
						[nextPosition]));
				range = $temp$range;
				beginning = $temp$beginning;
				interval = $temp$interval;
				m = $temp$m;
				acc = $temp$acc;
				continue positions;
			}
		}
	});
var $terezka$intervals$Intervals$values = F4(
	function (allowDecimals, exact, amountRough, range) {
		var intervalRough = (range.max - range.min) / amountRough;
		var interval = A3($terezka$intervals$Intervals$getInterval, intervalRough, allowDecimals, exact);
		var intervalSafe = (!interval) ? 1 : interval;
		var beginning = A2($terezka$intervals$Intervals$getBeginning, range.min, intervalSafe);
		var amountRoughSafe = (!amountRough) ? 1 : amountRough;
		return A5($terezka$intervals$Intervals$positions, range, beginning, intervalSafe, 0, _List_Nil);
	});
var $terezka$intervals$Intervals$floats = function (amount) {
	if (amount.$ === 'Exactly') {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, true, number);
	} else {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, false, number);
	}
};
var $terezka$elm_charts$Internal$Svg$floats = $terezka$elm_charts$Internal$Svg$Generator(
	F2(
		function (i, b) {
			return A2(
				$terezka$intervals$Intervals$floats,
				$terezka$intervals$Intervals$around(i),
				{max: b.max, min: b.min});
		}));
var $terezka$elm_charts$Chart$Svg$floats = $terezka$elm_charts$Internal$Svg$floats;
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {toAmPm: toAmPm, toMonthAbbreviation: toMonthAbbreviation, toMonthName: toMonthName, toOrdinalSuffix: toOrdinalSuffix, toWeekdayAbbreviation: toWeekdayAbbreviation, toWeekdayName: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.toAmPm(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[$elm$time$Time$Sun, $elm$time$Time$Mon, $elm$time$Time$Tue, $elm$time$Time$Wed, $elm$time$Time$Thu, $elm$time$Time$Fri, $elm$time$Time$Sat]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return $elm$time$Time$Thu;
			case 1:
				return $elm$time$Time$Fri;
			case 2:
				return $elm$time$Time$Sat;
			case 3:
				return $elm$time$Time$Sun;
			case 4:
				return $elm$time$Time$Mon;
			case 5:
				return $elm$time$Time$Tue;
			default:
				return $elm$time$Time$Wed;
		}
	});
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, $elm$time$Time$Sun),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[$elm$time$Time$Jan, $elm$time$Time$Feb, $elm$time$Time$Mar, $elm$time$Time$Apr, $elm$time$Time$May, $elm$time$Time$Jun, $elm$time$Time$Jul, $elm$time$Time$Aug, $elm$time$Time$Sep, $elm$time$Time$Oct, $elm$time$Time$Nov, $elm$time$Time$Dec]);
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, $elm$time$Time$Jan),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 'MonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthNameAbbreviated':
				return language.toMonthAbbreviation(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'MonthNameFull':
				return language.toMonthName(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'QuarterNumber':
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'QuarterSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'DayOfMonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfWeekNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekNameAbbreviated':
				return language.toWeekdayAbbreviation(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'DayOfWeekNameFull':
				return language.toWeekdayName(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'WeekOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'YearNumberLastTwo':
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 'YearNumber':
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 'AmPmUppercase':
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'AmPmLowercase':
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'HourMilitaryNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourNumber':
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourMilitaryFromOneNumber':
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFromOneFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'MinuteNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 'MinuteFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 'SecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 'SecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 'MillisecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 'MillisecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $ryannhg$date_format$DateFormat$HourMilitaryFixed = {$: 'HourMilitaryFixed'};
var $ryannhg$date_format$DateFormat$hourMilitaryFixed = $ryannhg$date_format$DateFormat$HourMilitaryFixed;
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 'MinuteFixed'};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 'Text', a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $terezka$elm_charts$Internal$Svg$formatClock = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed
		]));
var $ryannhg$date_format$DateFormat$MillisecondFixed = {$: 'MillisecondFixed'};
var $ryannhg$date_format$DateFormat$millisecondFixed = $ryannhg$date_format$DateFormat$MillisecondFixed;
var $ryannhg$date_format$DateFormat$SecondFixed = {$: 'SecondFixed'};
var $ryannhg$date_format$DateFormat$secondFixed = $ryannhg$date_format$DateFormat$SecondFixed;
var $terezka$elm_charts$Internal$Svg$formatClockMillis = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$millisecondFixed
		]));
var $terezka$elm_charts$Internal$Svg$formatClockSecond = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed
		]));
var $ryannhg$date_format$DateFormat$DayOfMonthNumber = {$: 'DayOfMonthNumber'};
var $ryannhg$date_format$DateFormat$dayOfMonthNumber = $ryannhg$date_format$DateFormat$DayOfMonthNumber;
var $ryannhg$date_format$DateFormat$MonthNumber = {$: 'MonthNumber'};
var $ryannhg$date_format$DateFormat$monthNumber = $ryannhg$date_format$DateFormat$MonthNumber;
var $terezka$elm_charts$Internal$Svg$formatDate = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$monthNumber,
			$ryannhg$date_format$DateFormat$text('/'),
			$ryannhg$date_format$DateFormat$dayOfMonthNumber
		]));
var $ryannhg$date_format$DateFormat$MonthNameAbbreviated = {$: 'MonthNameAbbreviated'};
var $ryannhg$date_format$DateFormat$monthNameAbbreviated = $ryannhg$date_format$DateFormat$MonthNameAbbreviated;
var $terezka$elm_charts$Internal$Svg$formatMonth = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$monthNameAbbreviated]));
var $ryannhg$date_format$DateFormat$DayOfWeekNameFull = {$: 'DayOfWeekNameFull'};
var $ryannhg$date_format$DateFormat$dayOfWeekNameFull = $ryannhg$date_format$DateFormat$DayOfWeekNameFull;
var $terezka$elm_charts$Internal$Svg$formatWeekday = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$dayOfWeekNameFull]));
var $ryannhg$date_format$DateFormat$YearNumber = {$: 'YearNumber'};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $terezka$elm_charts$Internal$Svg$formatYear = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$yearNumber]));
var $terezka$elm_charts$Internal$Svg$formatTime = F2(
	function (zone, time) {
		var _v0 = A2($elm$core$Maybe$withDefault, time.unit, time.change);
		switch (_v0.$) {
			case 'Millisecond':
				return A2($terezka$elm_charts$Internal$Svg$formatClockMillis, zone, time.timestamp);
			case 'Second':
				return A2($terezka$elm_charts$Internal$Svg$formatClockSecond, zone, time.timestamp);
			case 'Minute':
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.timestamp);
			case 'Hour':
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.timestamp);
			case 'Day':
				return (time.multiple === 7) ? A2($terezka$elm_charts$Internal$Svg$formatWeekday, zone, time.timestamp) : A2($terezka$elm_charts$Internal$Svg$formatDate, zone, time.timestamp);
			case 'Month':
				return A2($terezka$elm_charts$Internal$Svg$formatMonth, zone, time.timestamp);
			default:
				return A2($terezka$elm_charts$Internal$Svg$formatYear, zone, time.timestamp);
		}
	});
var $terezka$elm_charts$Chart$Svg$formatTime = $terezka$elm_charts$Internal$Svg$formatTime;
var $terezka$elm_charts$Internal$Svg$generate = F3(
	function (amount, _v0, limits) {
		var func = _v0.a;
		return A2(func, amount, limits);
	});
var $terezka$elm_charts$Chart$Svg$generate = $terezka$elm_charts$Internal$Svg$generate;
var $terezka$intervals$Intervals$ints = F2(
	function (amount, range) {
		return A2(
			$elm$core$List$map,
			$elm$core$Basics$round,
			function () {
				if (amount.$ === 'Exactly') {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, true, number, range);
				} else {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, false, number, range);
				}
			}());
	});
var $terezka$elm_charts$Internal$Svg$ints = $terezka$elm_charts$Internal$Svg$Generator(
	F2(
		function (i, b) {
			return A2(
				$terezka$intervals$Intervals$ints,
				$terezka$intervals$Intervals$around(i),
				{max: b.max, min: b.min});
		}));
var $terezka$elm_charts$Chart$Svg$ints = $terezka$elm_charts$Internal$Svg$ints;
var $terezka$intervals$Intervals$Day = {$: 'Day'};
var $terezka$intervals$Intervals$Hour = {$: 'Hour'};
var $terezka$intervals$Intervals$Millisecond = {$: 'Millisecond'};
var $terezka$intervals$Intervals$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Month = {$: 'Month'};
var $terezka$intervals$Intervals$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Year = {$: 'Year'};
var $justinmimbs$time_extra$Time$Extra$Day = {$: 'Day'};
var $justinmimbs$date$Date$Days = {$: 'Days'};
var $justinmimbs$time_extra$Time$Extra$Millisecond = {$: 'Millisecond'};
var $justinmimbs$time_extra$Time$Extra$Month = {$: 'Month'};
var $justinmimbs$date$Date$Months = {$: 'Months'};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0.a;
		switch (unit.$) {
			case 'Years':
				return A3(
					$justinmimbs$date$Date$add,
					$justinmimbs$date$Date$Months,
					12 * n,
					$justinmimbs$date$Date$RD(rd));
			case 'Months':
				var date = $justinmimbs$date$Date$toCalendarDate(
					$justinmimbs$date$Date$RD(rd));
				var wholeMonths = ((12 * (date.year - 1)) + ($justinmimbs$date$Date$monthToNumber(date.month) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return $justinmimbs$date$Date$RD(
					($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
						$elm$core$Basics$min,
						date.day,
						A2($justinmimbs$date$Date$daysInMonth, y, m)));
			case 'Weeks':
				return $justinmimbs$date$Date$RD(rd + (7 * n));
			default:
				return $justinmimbs$date$Date$RD(rd + n);
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval.$) {
				case 'Millisecond':
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 'Second':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Minute':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Hour':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Day':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Days,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Month':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Months,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Year':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Quarter':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Week':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$Week = {$: 'Week'};
var $justinmimbs$date$Date$Day = {$: 'Day'};
var $justinmimbs$date$Date$Friday = {$: 'Friday'};
var $justinmimbs$date$Date$Monday = {$: 'Monday'};
var $justinmimbs$date$Date$Month = {$: 'Month'};
var $justinmimbs$date$Date$Quarter = {$: 'Quarter'};
var $justinmimbs$date$Date$Saturday = {$: 'Saturday'};
var $justinmimbs$date$Date$Sunday = {$: 'Sunday'};
var $justinmimbs$date$Date$Thursday = {$: 'Thursday'};
var $justinmimbs$date$Date$Tuesday = {$: 'Tuesday'};
var $justinmimbs$date$Date$Wednesday = {$: 'Wednesday'};
var $justinmimbs$date$Date$Week = {$: 'Week'};
var $justinmimbs$date$Date$Year = {$: 'Year'};
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1);
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$RD(
		$justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date.a;
		switch (interval.$) {
			case 'Year':
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 'Quarter':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 'Month':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 'Week':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Monday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Tuesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Tue, date));
			case 'Wednesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Wed, date));
			case 'Thursday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Thu, date));
			case 'Friday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Fri, date));
			case 'Saturday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sat, date));
			case 'Sunday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sun, date));
			default:
				return date;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval.$) {
			case 'Millisecond':
				return posix;
			case 'Second':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 'Minute':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 'Hour':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 'Day':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Day, zone, posix);
			case 'Month':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Month, zone, posix);
			case 'Year':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Year, zone, posix);
			case 'Quarter':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Quarter, zone, posix);
			case 'Week':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Week, zone, posix);
			case 'Monday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Monday, zone, posix);
			case 'Tuesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Tuesday, zone, posix);
			case 'Wednesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Wednesday, zone, posix);
			case 'Thursday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Thursday, zone, posix);
			case 'Friday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Friday, zone, posix);
			case 'Saturday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Saturday, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Sunday, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $terezka$intervals$Intervals$Time$ceilingDay = F3(
	function (zone, mult, stamp) {
		return (mult === 7) ? A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Week, zone, stamp) : A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Day, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Hour = {$: 'Hour'};
var $justinmimbs$time_extra$Time$Extra$partsToPosix = F2(
	function (zone, _v0) {
		var year = _v0.year;
		var month = _v0.month;
		var day = _v0.day;
		var hour = _v0.hour;
		var minute = _v0.minute;
		var second = _v0.second;
		var millisecond = _v0.millisecond;
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A3($justinmimbs$date$Date$fromCalendarDate, year, month, day),
			A4(
				$justinmimbs$time_extra$Time$Extra$timeFromClock,
				A3($elm$core$Basics$clamp, 0, 23, hour),
				A3($elm$core$Basics$clamp, 0, 59, minute),
				A3($elm$core$Basics$clamp, 0, 59, second),
				A3($elm$core$Basics$clamp, 0, 999, millisecond)));
	});
var $justinmimbs$time_extra$Time$Extra$posixToParts = F2(
	function (zone, posix) {
		return {
			day: A2($elm$time$Time$toDay, zone, posix),
			hour: A2($elm$time$Time$toHour, zone, posix),
			millisecond: A2($elm$time$Time$toMillis, zone, posix),
			minute: A2($elm$time$Time$toMinute, zone, posix),
			month: A2($elm$time$Time$toMonth, zone, posix),
			second: A2($elm$time$Time$toSecond, zone, posix),
			year: A2($elm$time$Time$toYear, zone, posix)
		};
	});
var $terezka$intervals$Intervals$Time$ceilingHour = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Hour, zone, stamp));
		var rem = parts.hour % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Hour, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Time$ceilingMinute = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Minute, zone, stamp));
		var rem = parts.minute % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Minute, mult - rem, zone, _new);
	});
var $terezka$intervals$Intervals$Time$intAsMonth = function (_int) {
	switch (_int) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		case 12:
			return $elm$time$Time$Dec;
		default:
			return $elm$time$Time$Dec;
	}
};
var $terezka$intervals$Intervals$Time$monthAsInt = function (month) {
	switch (month.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $terezka$intervals$Intervals$Time$ceilingMonth = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Month, zone, stamp));
		var monthInt = $terezka$intervals$Intervals$Time$monthAsInt(parts.month);
		var rem = (monthInt - 1) % mult;
		var newMonth = (!rem) ? monthInt : ((monthInt - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			(newMonth > 12) ? _Utils_update(
				parts,
				{
					month: $terezka$intervals$Intervals$Time$intAsMonth(newMonth - 12),
					year: parts.year + 1
				}) : _Utils_update(
				parts,
				{
					month: $terezka$intervals$Intervals$Time$intAsMonth(newMonth)
				}));
	});
var $terezka$intervals$Intervals$Time$ceilingMs = F3(
	function (zone, mult, stamp) {
		var parts = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, stamp);
		var rem = parts.millisecond % mult;
		return (!rem) ? A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts) : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Millisecond, mult - rem, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Time$ceilingSecond = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Second, zone, stamp));
		var rem = parts.second % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Second, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Year = {$: 'Year'};
var $terezka$intervals$Intervals$Time$ceilingYear = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Year, zone, stamp));
		var rem = parts.year % mult;
		var newYear = (!rem) ? parts.year : ((parts.year - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			_Utils_update(
				parts,
				{year: newYear}));
	});
var $terezka$intervals$Intervals$Time$ceilingUnit = F3(
	function (zone, unit, mult) {
		switch (unit.$) {
			case 'Millisecond':
				return A2($terezka$intervals$Intervals$Time$ceilingMs, zone, mult);
			case 'Second':
				return A2($terezka$intervals$Intervals$Time$ceilingSecond, zone, mult);
			case 'Minute':
				return A2($terezka$intervals$Intervals$Time$ceilingMinute, zone, mult);
			case 'Hour':
				return A2($terezka$intervals$Intervals$Time$ceilingHour, zone, mult);
			case 'Day':
				return A2($terezka$intervals$Intervals$Time$ceilingDay, zone, mult);
			case 'Month':
				return A2($terezka$intervals$Intervals$Time$ceilingMonth, zone, mult);
			default:
				return A2($terezka$intervals$Intervals$Time$ceilingYear, zone, mult);
		}
	});
var $terezka$intervals$Intervals$Time$Day = {$: 'Day'};
var $terezka$intervals$Intervals$Time$Hour = {$: 'Hour'};
var $terezka$intervals$Intervals$Time$Millisecond = {$: 'Millisecond'};
var $terezka$intervals$Intervals$Time$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Time$Month = {$: 'Month'};
var $terezka$intervals$Intervals$Time$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Time$Year = {$: 'Year'};
var $terezka$intervals$Intervals$Time$getChange = F3(
	function (zone, a, b) {
		var bP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b);
		var aP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a);
		return (!_Utils_eq(aP.year, bP.year)) ? $terezka$intervals$Intervals$Time$Year : ((!_Utils_eq(aP.month, bP.month)) ? $terezka$intervals$Intervals$Time$Month : ((!_Utils_eq(aP.day, bP.day)) ? $terezka$intervals$Intervals$Time$Day : ((!_Utils_eq(aP.hour, bP.hour)) ? $terezka$intervals$Intervals$Time$Hour : ((!_Utils_eq(aP.minute, bP.minute)) ? $terezka$intervals$Intervals$Time$Minute : ((!_Utils_eq(aP.second, bP.second)) ? $terezka$intervals$Intervals$Time$Second : $terezka$intervals$Intervals$Time$Millisecond)))));
	});
var $danhandrea$elm_time_extra$Util$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 400, year)) || ((!(!A2($elm$core$Basics$modBy, 100, year))) && (!A2($elm$core$Basics$modBy, 4, year)));
};
var $danhandrea$elm_time_extra$Month$days = F2(
	function (year, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $danhandrea$elm_time_extra$Util$isLeapYear(year) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $danhandrea$elm_time_extra$TimeExtra$daysInMonth = $danhandrea$elm_time_extra$Month$days;
var $terezka$intervals$Intervals$Time$toMs = $elm$time$Time$posixToMillis;
var $terezka$intervals$Intervals$Time$getDiff = F3(
	function (zone, a, b) {
		var _v0 = (_Utils_cmp(
			$terezka$intervals$Intervals$Time$toMs(a),
			$terezka$intervals$Intervals$Time$toMs(b)) < 0) ? _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b)) : _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a));
		var aP = _v0.a;
		var bP = _v0.b;
		var dMsX = bP.millisecond - aP.millisecond;
		var dMs = (dMsX < 0) ? (1000 + dMsX) : dMsX;
		var dSecondX = (bP.second - aP.second) + ((dMsX < 0) ? (-1) : 0);
		var dMinuteX = (bP.minute - aP.minute) + ((dSecondX < 0) ? (-1) : 0);
		var dHourX = (bP.hour - aP.hour) + ((dMinuteX < 0) ? (-1) : 0);
		var dDayX = (bP.day - aP.day) + ((dHourX < 0) ? (-1) : 0);
		var dDay = (dDayX < 0) ? (A2($danhandrea$elm_time_extra$TimeExtra$daysInMonth, bP.year, bP.month) + dDayX) : dDayX;
		var dMonthX = ($terezka$intervals$Intervals$Time$monthAsInt(bP.month) - $terezka$intervals$Intervals$Time$monthAsInt(aP.month)) + ((dDayX < 0) ? (-1) : 0);
		var dMonth = (dMonthX < 0) ? (12 + dMonthX) : dMonthX;
		var dHour = (dHourX < 0) ? (24 + dHourX) : dHourX;
		var dMinute = (dMinuteX < 0) ? (60 + dMinuteX) : dMinuteX;
		var dSecond = (dSecondX < 0) ? (60 + dSecondX) : dSecondX;
		var dYearX = (bP.year - aP.year) + ((dMonthX < 0) ? (-1) : 0);
		var dYear = (dYearX < 0) ? ($terezka$intervals$Intervals$Time$monthAsInt(bP.month) + dYearX) : dYearX;
		return {day: dDay, hour: dHour, millisecond: dMs, minute: dMinute, month: dMonth, second: dSecond, year: dYear};
	});
var $terezka$intervals$Intervals$Time$oneSecond = 1000;
var $terezka$intervals$Intervals$Time$oneMinute = $terezka$intervals$Intervals$Time$oneSecond * 60;
var $terezka$intervals$Intervals$Time$oneHour = $terezka$intervals$Intervals$Time$oneMinute * 60;
var $terezka$intervals$Intervals$Time$oneDay = $terezka$intervals$Intervals$Time$oneHour * 24;
var $terezka$intervals$Intervals$Time$oneMs = 1;
var $terezka$intervals$Intervals$Time$getNumOfTicks = F5(
	function (zone, unit, mult, a, b) {
		var div = F2(
			function (n1, n2) {
				return $elm$core$Basics$floor(n1 / n2);
			});
		var timeDiff = function (ms) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				A2(
					div,
					$terezka$intervals$Intervals$Time$toMs(b) - $terezka$intervals$Intervals$Time$toMs(ceiled),
					ms),
				mult);
		};
		var diff = function (property) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				property(
					A3($terezka$intervals$Intervals$Time$getDiff, zone, ceiled, b)),
				mult);
		};
		switch (unit.$) {
			case 'Millisecond':
				return timeDiff($terezka$intervals$Intervals$Time$oneMs) + 1;
			case 'Second':
				return timeDiff($terezka$intervals$Intervals$Time$oneSecond) + 1;
			case 'Minute':
				return timeDiff($terezka$intervals$Intervals$Time$oneMinute) + 1;
			case 'Hour':
				return timeDiff($terezka$intervals$Intervals$Time$oneHour) + 1;
			case 'Day':
				return timeDiff($terezka$intervals$Intervals$Time$oneDay) + 1;
			case 'Month':
				return diff(
					function (d) {
						return d.month + (d.year * 12);
					}) + 1;
			default:
				return diff(
					function ($) {
						return $.year;
					}) + 1;
		}
	});
var $terezka$intervals$Intervals$Time$largerUnit = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Second);
		case 'Second':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Minute);
		case 'Minute':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Hour);
		case 'Hour':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Day);
		case 'Day':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Month);
		case 'Month':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Year);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $terezka$intervals$Intervals$Time$niceMultiples = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500]);
		case 'Second':
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 'Minute':
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 'Hour':
			return _List_fromArray(
				[1, 2, 3, 4, 6, 8, 12]);
		case 'Day':
			return _List_fromArray(
				[1, 2, 3, 7, 14]);
		case 'Month':
			return _List_fromArray(
				[1, 2, 3, 4, 6]);
		default:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 10000, 1000000, 10000000]);
	}
};
var $terezka$intervals$Intervals$Time$toBestUnit = F4(
	function (zone, amount, min, max) {
		var toNice = function (unit) {
			toNice:
			while (true) {
				var niceNums = $terezka$intervals$Intervals$Time$niceMultiples(unit);
				var maybeNiceNum = A2(
					$elm$core$List$filter,
					function (n) {
						return _Utils_cmp(
							A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, n, min, max),
							amount) < 1;
					},
					niceNums);
				var div = F2(
					function (n1, n2) {
						return $elm$core$Basics$ceiling(n1 / n2);
					});
				var _v0 = $elm$core$List$head(maybeNiceNum);
				if (_v0.$ === 'Just') {
					var niceNum = _v0.a;
					return _Utils_Tuple2(unit, niceNum);
				} else {
					var _v1 = $terezka$intervals$Intervals$Time$largerUnit(unit);
					if (_v1.$ === 'Just') {
						var larger = _v1.a;
						var $temp$unit = larger;
						unit = $temp$unit;
						continue toNice;
					} else {
						return _Utils_Tuple2($terezka$intervals$Intervals$Time$Year, 100000000);
					}
				}
			}
		};
		return toNice($terezka$intervals$Intervals$Time$Millisecond);
	});
var $terezka$intervals$Intervals$Time$toExtraUnit = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return $justinmimbs$time_extra$Time$Extra$Millisecond;
		case 'Second':
			return $justinmimbs$time_extra$Time$Extra$Second;
		case 'Minute':
			return $justinmimbs$time_extra$Time$Extra$Minute;
		case 'Hour':
			return $justinmimbs$time_extra$Time$Extra$Hour;
		case 'Day':
			return $justinmimbs$time_extra$Time$Extra$Day;
		case 'Month':
			return $justinmimbs$time_extra$Time$Extra$Month;
		default:
			return $justinmimbs$time_extra$Time$Extra$Year;
	}
};
var $terezka$intervals$Intervals$Time$unitToInt = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return 0;
		case 'Second':
			return 1;
		case 'Minute':
			return 2;
		case 'Hour':
			return 3;
		case 'Day':
			return 4;
		case 'Month':
			return 5;
		default:
			return 6;
	}
};
var $terezka$intervals$Intervals$Time$values = F4(
	function (zone, maxMmount, min, max) {
		var _v0 = A4($terezka$intervals$Intervals$Time$toBestUnit, zone, maxMmount, min, max);
		var unit = _v0.a;
		var mult = _v0.b;
		var amount = A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, mult, min, max);
		var initial = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, min);
		var tUnit = $terezka$intervals$Intervals$Time$toExtraUnit(unit);
		var toTick = F3(
			function (x, timestamp, change) {
				return {
					change: (_Utils_cmp(
						$terezka$intervals$Intervals$Time$unitToInt(change),
						$terezka$intervals$Intervals$Time$unitToInt(unit)) > 0) ? $elm$core$Maybe$Just(change) : $elm$core$Maybe$Nothing,
					isFirst: !x,
					multiple: mult,
					timestamp: timestamp,
					unit: unit,
					zone: zone
				};
			});
		var toTicks = F2(
			function (xs, acc) {
				toTicks:
				while (true) {
					if (xs.b) {
						var x = xs.a;
						var rest = xs.b;
						var prev = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, (x - 1) * mult, zone, initial);
						var curr = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, x * mult, zone, initial);
						var change = A3($terezka$intervals$Intervals$Time$getChange, zone, prev, curr);
						var $temp$xs = rest,
							$temp$acc = A2(
							$elm$core$List$cons,
							A3(toTick, x, curr, change),
							acc);
						xs = $temp$xs;
						acc = $temp$acc;
						continue toTicks;
					} else {
						return acc;
					}
				}
			});
		return $elm$core$List$reverse(
			A2(
				toTicks,
				A2($elm$core$List$range, 0, amount - 1),
				_List_Nil));
	});
var $terezka$intervals$Intervals$times = F3(
	function (zone, amount, range) {
		var toUnit = function (unit) {
			switch (unit.$) {
				case 'Millisecond':
					return $terezka$intervals$Intervals$Millisecond;
				case 'Second':
					return $terezka$intervals$Intervals$Second;
				case 'Minute':
					return $terezka$intervals$Intervals$Minute;
				case 'Hour':
					return $terezka$intervals$Intervals$Hour;
				case 'Day':
					return $terezka$intervals$Intervals$Day;
				case 'Month':
					return $terezka$intervals$Intervals$Month;
				default:
					return $terezka$intervals$Intervals$Year;
			}
		};
		var translateUnit = function (time) {
			return {
				change: A2($elm$core$Maybe$map, toUnit, time.change),
				isFirst: time.isFirst,
				multiple: time.multiple,
				timestamp: time.timestamp,
				unit: toUnit(time.unit),
				zone: time.zone
			};
		};
		var fromMs = function (ts) {
			return $elm$time$Time$millisToPosix(
				$elm$core$Basics$round(ts));
		};
		return A2(
			$elm$core$List$map,
			translateUnit,
			A4(
				$terezka$intervals$Intervals$Time$values,
				zone,
				amount,
				fromMs(range.min),
				fromMs(range.max)));
	});
var $terezka$elm_charts$Internal$Svg$times = function (zone) {
	return $terezka$elm_charts$Internal$Svg$Generator(
		F2(
			function (i, b) {
				return A3(
					$terezka$intervals$Intervals$times,
					zone,
					i,
					{max: b.max, min: b.min});
			}));
};
var $terezka$elm_charts$Chart$Svg$times = $terezka$elm_charts$Internal$Svg$times;
var $terezka$elm_charts$Chart$generateValues = F4(
	function (amount, tick, maybeFormat, axis) {
		var toTickValues = F2(
			function (toValue, toString) {
				return $elm$core$List$map(
					function (i) {
						return {
							label: function () {
								if (maybeFormat.$ === 'Just') {
									var formatter = maybeFormat.a;
									return formatter(
										toValue(i));
								} else {
									return toString(i);
								}
							}(),
							value: toValue(i)
						};
					});
			});
		switch (tick.$) {
			case 'Floats':
				return A3(
					toTickValues,
					$elm$core$Basics$identity,
					$elm$core$String$fromFloat,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$floats, axis));
			case 'Ints':
				return A3(
					toTickValues,
					$elm$core$Basics$toFloat,
					$elm$core$String$fromInt,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$ints, axis));
			default:
				var zone = tick.a;
				return A3(
					toTickValues,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Basics$toFloat, $elm$time$Time$posixToMillis),
						function ($) {
							return $.timestamp;
						}),
					$terezka$elm_charts$Chart$Svg$formatTime(zone),
					A3(
						$terezka$elm_charts$Chart$Svg$generate,
						amount,
						$terezka$elm_charts$Chart$Svg$times(zone),
						axis));
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $terezka$elm_charts$Internal$Svg$position = F6(
	function (plane, rotation, x_, y_, xOff_, yOff_) {
		return $elm$svg$Svg$Attributes$transform(
			'translate(' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x_) + xOff_) + (',' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y_) + yOff_) + (') rotate(' + ($elm$core$String$fromFloat(rotation) + ')'))))));
	});
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$tspan = $elm$svg$Svg$trustedNode('tspan');
var $terezka$elm_charts$Internal$Svg$label = F4(
	function (plane, config, inner, point) {
		var _v0 = config.ellipsis;
		if (_v0.$ === 'Nothing') {
			var withOverflowWrap = function (el) {
				return config.hideOverflow ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.uppercase ? 'text-transform: uppercase;' : '';
			var fontStyle = function () {
				var _v5 = config.fontSize;
				if (_v5.$ === 'Just') {
					var size_ = _v5.a;
					return 'font-size: ' + ($elm$core$String$fromInt(size_) + 'px;');
				} else {
					return '';
				}
			}();
			var anchorStyle = function () {
				var _v1 = config.anchor;
				if (_v1.$ === 'Nothing') {
					return 'text-anchor: middle;';
				} else {
					switch (_v1.a.$) {
						case 'End':
							var _v2 = _v1.a;
							return 'text-anchor: end;';
						case 'Start':
							var _v3 = _v1.a;
							return 'text-anchor: start;';
						default:
							var _v4 = _v1.a;
							return 'text-anchor: middle;';
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$stroke(config.border),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(config.borderWidth)),
							$elm$svg$Svg$Attributes$fill(config.color),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.rotate, point.x, point.y, config.xOff, config.yOff),
							$elm$svg$Svg$Attributes$style(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									['pointer-events: none;', fontStyle, anchorStyle, uppercaseStyle])))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$tspan, _List_Nil, inner)
						])));
		} else {
			var ellipsis = _v0.a;
			var xOffWithAnchor = function () {
				var _v11 = config.anchor;
				if (_v11.$ === 'Nothing') {
					return config.xOff - (ellipsis.width / 2);
				} else {
					switch (_v11.a.$) {
						case 'End':
							var _v12 = _v11.a;
							return config.xOff - ellipsis.width;
						case 'Start':
							var _v13 = _v11.a;
							return config.xOff;
						default:
							var _v14 = _v11.a;
							return config.xOff - (ellipsis.width / 2);
					}
				}
			}();
			var withOverflowWrap = function (el) {
				return config.hideOverflow ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.uppercase ? A2($elm$html$Html$Attributes$style, 'text-transform', 'uppercase') : A2($elm$html$Html$Attributes$style, '', '');
			var fontStyle = function () {
				var _v10 = config.fontSize;
				if (_v10.$ === 'Just') {
					var size_ = _v10.a;
					return A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt(size_) + 'px');
				} else {
					return A2($elm$html$Html$Attributes$style, '', '');
				}
			}();
			var anchorStyle = function () {
				var _v6 = config.anchor;
				if (_v6.$ === 'Nothing') {
					return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
				} else {
					switch (_v6.a.$) {
						case 'End':
							var _v7 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'right');
						case 'Start':
							var _v8 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'left');
						default:
							var _v9 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$foreignObject,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$class('elm-charts__html-label'),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromFloat(ellipsis.width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromFloat(ellipsis.height)),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.rotate, point.x, point.y, xOffWithAnchor, config.yOff - 10)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'xmlns', 'http://www.w3.org/1999/xhtml'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
									A2($elm$html$Html$Attributes$style, 'text-overflow', 'ellipsis'),
									A2($elm$html$Html$Attributes$style, 'height', '100%'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
									A2($elm$html$Html$Attributes$style, 'color', config.color),
									fontStyle,
									uppercaseStyle,
									anchorStyle
								]),
							inner)
						])));
		}
	});
var $terezka$elm_charts$Chart$Attributes$zero = function (b) {
	return A3($elm$core$Basics$clamp, b.min, b.max, 0);
};
var $terezka$elm_charts$Chart$xLabels = function (edits) {
	var toTicks = F2(
		function (p, config) {
			return A4(
				$terezka$elm_charts$Chart$generateValues,
				config.amount,
				config.generate,
				config.format,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, x) {
							return f(x);
						}),
					p.x,
					config.limits));
		});
	var toTickValues = F3(
		function (p, config, ts) {
			return (!config.grid) ? ts : _Utils_update(
				ts,
				{
					xs: _Utils_ap(
						ts.xs,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.value;
							},
							A2(toTicks, p, config)))
				});
		});
	var toConfig = function (p) {
		return A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{amount: 5, anchor: $elm$core$Maybe$Nothing, attrs: _List_Nil, color: '#808BAB', ellipsis: $elm$core$Maybe$Nothing, flip: false, fontSize: $elm$core$Maybe$Nothing, format: $elm$core$Maybe$Nothing, generate: $terezka$elm_charts$Internal$Svg$Floats, grid: false, hideOverflow: false, limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, rotate: 0, uppercase: false, xOff: 0, yOff: 18});
	};
	return A3(
		$terezka$elm_charts$Chart$LabelsElement,
		toConfig,
		toTickValues,
		F2(
			function (p, config) {
				var _default = $terezka$elm_charts$Internal$Svg$defaultLabel;
				var toLabel = function (item) {
					return A4(
						$terezka$elm_charts$Internal$Svg$label,
						p,
						_Utils_update(
							_default,
							{
								anchor: config.anchor,
								attrs: config.attrs,
								color: config.color,
								ellipsis: config.ellipsis,
								fontSize: config.fontSize,
								hideOverflow: config.hideOverflow,
								rotate: config.rotate,
								uppercase: config.uppercase,
								xOff: config.xOff,
								yOff: config.flip ? ((-config.yOff) + 10) : config.yOff
							}),
						_List_fromArray(
							[
								$elm$svg$Svg$text(item.label)
							]),
						{
							x: item.value,
							y: config.pinned(p.y)
						});
				};
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__x-labels')
						]),
					A2(
						$elm$core$List$map,
						toLabel,
						A2(toTicks, p, config)));
			}));
};
var $terezka$elm_charts$Internal$Svg$End = {$: 'End'};
var $terezka$elm_charts$Internal$Svg$Start = {$: 'Start'};
var $terezka$elm_charts$Chart$yLabels = function (edits) {
	var toTicks = F2(
		function (p, config) {
			return A4(
				$terezka$elm_charts$Chart$generateValues,
				config.amount,
				config.generate,
				config.format,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, y) {
							return f(y);
						}),
					p.y,
					config.limits));
		});
	var toTickValues = F3(
		function (p, config, ts) {
			return (!config.grid) ? ts : _Utils_update(
				ts,
				{
					ys: _Utils_ap(
						ts.ys,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.value;
							},
							A2(toTicks, p, config)))
				});
		});
	var toConfig = function (p) {
		return A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{amount: 5, anchor: $elm$core$Maybe$Nothing, attrs: _List_Nil, color: '#808BAB', ellipsis: $elm$core$Maybe$Nothing, flip: false, fontSize: $elm$core$Maybe$Nothing, format: $elm$core$Maybe$Nothing, generate: $terezka$elm_charts$Internal$Svg$Floats, grid: false, hideOverflow: false, limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, rotate: 0, uppercase: false, xOff: -10, yOff: 3});
	};
	return A3(
		$terezka$elm_charts$Chart$LabelsElement,
		toConfig,
		toTickValues,
		F2(
			function (p, config) {
				var _default = $terezka$elm_charts$Internal$Svg$defaultLabel;
				var toLabel = function (item) {
					return A4(
						$terezka$elm_charts$Internal$Svg$label,
						p,
						_Utils_update(
							_default,
							{
								anchor: function () {
									var _v0 = config.anchor;
									if (_v0.$ === 'Nothing') {
										return $elm$core$Maybe$Just(
											config.flip ? $terezka$elm_charts$Internal$Svg$Start : $terezka$elm_charts$Internal$Svg$End);
									} else {
										var anchor = _v0.a;
										return $elm$core$Maybe$Just(anchor);
									}
								}(),
								attrs: config.attrs,
								color: config.color,
								ellipsis: config.ellipsis,
								fontSize: config.fontSize,
								hideOverflow: config.hideOverflow,
								rotate: config.rotate,
								uppercase: config.uppercase,
								xOff: config.flip ? (-config.xOff) : config.xOff,
								yOff: config.yOff
							}),
						_List_fromArray(
							[
								$elm$svg$Svg$text(item.label)
							]),
						{
							x: config.pinned(p.x),
							y: item.value
						});
				};
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__y-labels')
						]),
					A2(
						$elm$core$List$map,
						toLabel,
						A2(toTicks, p, config)));
			}));
};
var $author$project$ItemShop$charts_display = F2(
	function (historical_shop_trends, hovered_trend_chart) {
		var render_tooltip = F2(
			function (plane, item) {
				var item_type = $author$project$ItemShop$Weapon;
				var _v6 = $terezka$elm_charts$Chart$Item$getData(item);
				var id = _v6.a;
				var it_val = _v6.b;
				var _v7 = it_val;
				var item_type_ = _v7.a;
				var val = _v7.b;
				return _List_fromArray(
					[
						A4(
						$terezka$elm_charts$Chart$tooltip,
						item,
						_List_Nil,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$ItemShop$item_type_to_pretty_string(item_type_) + (': ' + $author$project$ItemShop$float_to_percent(val)))
							]))
					]);
			});
		var raw_dataset_len = $elm$core$List$length(historical_shop_trends);
		var get_y_from_single_datum = function (_v5) {
			var idx = _v5.a;
			var it_val = _v5.b;
			return it_val.b;
		};
		var get_x_from_single_datum = A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $elm$core$Basics$toFloat);
		var filter_dataset_by_item_type = F2(
			function (item_type, _v4) {
				var item_type_sentiment = _v4.item_type_sentiment;
				return _Utils_Tuple2(
					item_type,
					A2($author$project$ItemShop$get_item_type_trend, item_type_sentiment, item_type));
			});
		var chart_width = 700;
		var chart_points = 200;
		var raw_dataset = A2(
			$elm$core$List$indexedMap,
			$elm$core$Tuple$pair,
			(_Utils_cmp(raw_dataset_len, chart_points) > 0) ? A2($elm$core$List$drop, raw_dataset_len - chart_points, historical_shop_trends) : historical_shop_trends);
		var chart_height = 150;
		var chart_attributes = _List_fromArray(
			[
				$terezka$elm_charts$Chart$Attributes$height(chart_height),
				$terezka$elm_charts$Chart$Attributes$width(chart_width),
				$terezka$elm_charts$Chart$Attributes$padding(
				{bottom: 5, left: 10, right: 10, top: 10}),
				A2(
				$terezka$elm_charts$Chart$Events$onMouseMove,
				$author$project$ItemShop$OnTrendChartHover,
				$terezka$elm_charts$Chart$Events$getNearest($terezka$elm_charts$Chart$Item$dots)),
				$terezka$elm_charts$Chart$Events$onMouseLeave(
				$author$project$ItemShop$OnTrendChartHover(_List_Nil)),
				$terezka$elm_charts$Chart$Attributes$domain(
				_List_fromArray(
					[
						A2($terezka$elm_charts$Chart$Attributes$lowest, 0.5, $terezka$elm_charts$Chart$Attributes$orLower),
						A2($terezka$elm_charts$Chart$Attributes$highest, 1.5, $terezka$elm_charts$Chart$Attributes$orHigher),
						$terezka$elm_charts$Chart$Attributes$centerAt(1.0)
					]))
			]);
		var build_filtered_dataset = function (item_type) {
			return A2(
				$elm$core$List$map,
				function (_v3) {
					var idx = _v3.a;
					var s_t = _v3.b;
					return _Utils_Tuple2(
						idx,
						A2(filter_dataset_by_item_type, item_type, s_t));
				},
				raw_dataset);
		};
		var build_dataset = function (item_type) {
			return A2(
				$elm$core$List$all,
				function (_v0) {
					var shop_trends = _v0.b;
					return A2($author$project$ItemShop$get_item_type_trend, shop_trends.item_type_sentiment, item_type) === 1.0;
				},
				raw_dataset) ? $terezka$elm_charts$Chart$none : A3(
				$terezka$elm_charts$Chart$series,
				function (_v1) {
					var idx = _v1.a;
					return idx;
				},
				_List_fromArray(
					[
						A2(
						$terezka$elm_charts$Chart$named,
						$author$project$ItemShop$item_type_to_pretty_string(item_type),
						A3(
							$terezka$elm_charts$Chart$interpolated,
							function (_v2) {
								var idx = _v2.a;
								var it_val = _v2.b;
								return it_val.b;
							},
							_List_fromArray(
								[$terezka$elm_charts$Chart$Attributes$monotone]),
							_List_Nil))
					]),
				build_filtered_dataset(item_type));
		};
		var datasets = _List_fromArray(
			[
				build_dataset($author$project$ItemShop$Weapon),
				build_dataset($author$project$ItemShop$Armor),
				build_dataset($author$project$ItemShop$Spellbook),
				build_dataset($author$project$ItemShop$Furniture),
				build_dataset($author$project$ItemShop$Food)
			]);
		var chart_elements = _Utils_ap(
			_List_fromArray(
				[
					$terezka$elm_charts$Chart$xLabels(_List_Nil),
					$terezka$elm_charts$Chart$yLabels(
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$format($author$project$ItemShop$float_to_percent),
							$terezka$elm_charts$Chart$Attributes$withGrid
						]))
				]),
			_Utils_ap(
				datasets,
				_List_fromArray(
					[
						A4(
						$terezka$elm_charts$Chart$legendsAt,
						function ($) {
							return $.min;
						},
						function ($) {
							return $.max;
						},
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$column,
								$terezka$elm_charts$Chart$Attributes$moveRight(15),
								$terezka$elm_charts$Chart$Attributes$spacing(5)
							]),
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$width(20)
							])),
						A2($terezka$elm_charts$Chart$each, hovered_trend_chart, render_tooltip)
					])));
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(chart_width)),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(chart_height + 20)),
					A2($mdgriffith$elm_ui$Element$paddingXY, 20, 0)
				]),
			$mdgriffith$elm_ui$Element$html(
				A2($terezka$elm_charts$Chart$chart, chart_attributes, chart_elements)));
	});
var $author$project$Interface$color_light_grey = A3($mdgriffith$elm_ui$Element$rgb, 0.55, 0.55, 0.55);
var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
var $mdgriffith$elm_ui$Element$Border$dashed = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.borderDashed);
var $mdgriffith$elm_ui$Element$Keyed$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Keyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Element$modular = F3(
	function (normal, ratio, rescale) {
		return (!rescale) ? normal : ((rescale < 0) ? (normal * A2($elm$core$Basics$pow, ratio, rescale)) : (normal * A2($elm$core$Basics$pow, ratio, rescale - 1)));
	});
var $author$project$ItemShop$scaled = function (val) {
	return $elm$core$Basics$round(
		A3($mdgriffith$elm_ui$Element$modular, 14, 1.25, val));
};
var $author$project$ItemShop$font_scaled = function (scale) {
	return $mdgriffith$elm_ui$Element$Font$size(
		$author$project$ItemShop$scaled(scale));
};
var $author$project$ItemShop$padding_bottom = function (pad) {
	return $mdgriffith$elm_ui$Element$paddingEach(
		{bottom: pad, left: 0, right: 0, top: 0});
};
var $author$project$ItemShop$SacrificeItem = function (a) {
	return {$: 'SacrificeItem', a: a};
};
var $author$project$ItemShop$PlayerSellItemToShop = F2(
	function (a, b) {
		return {$: 'PlayerSellItemToShop', a: a, b: b};
	});
var $author$project$ItemShop$shop_sell_button = F2(
	function (has_items_to_sell_, _v0) {
		var item = _v0.item;
		var button_type = has_items_to_sell_ ? $author$project$Interface$primary_button : $author$project$Interface$secondary_button;
		var buttonText = has_items_to_sell_ ? 'SELL' : 'Need GP';
		return A3(
			button_type,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$transparent(!has_items_to_sell_),
					$mdgriffith$elm_ui$Element$width(
					A2($mdgriffith$elm_ui$Element$minimum, 120, $mdgriffith$elm_ui$Element$fill))
				]),
			A2(
				$author$project$ItemShop$PlayerSellItemToShop,
				item,
				$author$project$ItemShop$Quantity(1)),
			buttonText);
	});
var $author$project$ItemShop$playerInventoryControls = F3(
	function (player, _v0, _v1) {
		var shiftIsPressed = _v0.a;
		var shop_trends = _v0.b;
		var item = _v1.item;
		var quantity = _v1.quantity;
		var avg_price = _v1.avg_price;
		var hasItemsToSell = $author$project$ItemShop$getQuantity(quantity) >= 1;
		return (!shiftIsPressed) ? A2(
			$author$project$ItemShop$shop_sell_button,
			hasItemsToSell,
			{
				avg_price: avg_price,
				item: item,
				quantity: $author$project$ItemShop$setQuantity(1)
			}) : A3(
			$author$project$Interface$danger_button,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$transparent(!hasItemsToSell),
					$mdgriffith$elm_ui$Element$width(
					A2($mdgriffith$elm_ui$Element$minimum, 120, $mdgriffith$elm_ui$Element$fill))
				]),
			$author$project$ItemShop$SacrificeItem(item),
			'Sacrifice');
	});
var $author$project$Interface$blankChar = '\u2003';
var $author$project$ItemShop$border_bottom = function (bord) {
	return $mdgriffith$elm_ui$Element$Border$widthEach(
		{bottom: bord, left: 0, right: 0, top: 0});
};
var $author$project$ItemShop$render_single_player_action_log = F2(
	function (item_db, player_action_log) {
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_Nil,
			_List_fromArray(
				[
					function () {
					switch (player_action_log.$) {
						case 'WelcomeMessageActionLog':
							return $mdgriffith$elm_ui$Element$text('Welcome to ItemShop!');
						case 'TookSpecialActionInviteTrader':
							return $mdgriffith$elm_ui$Element$text('Invited Trader');
						case 'TookSpecialActionTriggerEvent':
							var special_event = player_action_log.a;
							if (special_event.$ === 'EventVeryDesiredItemType') {
								var mb_item_type = special_event.a;
								var _v2 = A2($elm$core$Debug$log, 'mb_item_type', mb_item_type);
								return $mdgriffith$elm_ui$Element$text(
									A2(
										$elm$core$Maybe$withDefault,
										'Unknown',
										A2($elm$core$Maybe$map, $author$project$ItemShop$item_type_to_pretty_string, mb_item_type)) + ' -- These became quite valuable.');
							} else {
								var mb_item_type = special_event.a;
								return $mdgriffith$elm_ui$Element$text(
									A2(
										$elm$core$Maybe$withDefault,
										'Unknown',
										A2($elm$core$Maybe$map, $author$project$ItemShop$item_type_to_pretty_string, mb_item_type)) + ' -- Nobody is interested in these anymore.');
							}
						case 'TookSpecialActionTogglePauseAi':
							return $mdgriffith$elm_ui$Element$text('Toggle Play/Pause');
						case 'TookSpecialActionUnlockItem':
							var item_id = player_action_log.a;
							return $mdgriffith$elm_ui$Element$text(
								'Found an item: ' + A2($author$project$ItemShop$lookup_item_id_default, item_db, item_id).name);
						default:
							var itemId = player_action_log.a;
							return $mdgriffith$elm_ui$Element$text('A monster died, and left an item to the shop');
					}
				}()
				]));
	});
var $author$project$ItemShop$player_action_log_display = F2(
	function (item_db, player_action_logs) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$author$project$ItemShop$font_scaled(2),
								$author$project$ItemShop$border_bottom(2),
								$mdgriffith$elm_ui$Element$alignTop
							]),
						$mdgriffith$elm_ui$Element$text('Action Log'))
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
								$mdgriffith$elm_ui$Element$spacing(4)
							]),
						function (logs) {
							return ($elm$core$List$length(logs) < 5) ? _Utils_ap(
								logs,
								A2(
									$elm$core$List$repeat,
									5 - $elm$core$List$length(logs),
									A2(
										$mdgriffith$elm_ui$Element$paragraph,
										_List_Nil,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$text($author$project$Interface$blankChar)
											])))) : logs;
						}(
							A2(
								$elm$core$List$map,
								$author$project$ItemShop$render_single_player_action_log(item_db),
								A2(
									$elm$core$List$take,
									5,
									$elm$core$List$reverse(player_action_logs)))))
					])));
	});
var $author$project$ItemShop$render_single_player_upgrade = F2(
	function (colorTheme, player_upgrade) {
		var gpm = player_upgrade.a;
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_Nil,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text('Income: '),
					A2($author$project$Interface$render_gp, colorTheme, gpm),
					$mdgriffith$elm_ui$Element$text('/sec')
				]));
	});
var $author$project$ItemShop$player_upgrades_display = F2(
	function (colorTheme, player_upgrades) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$author$project$ItemShop$font_scaled(2),
								$author$project$ItemShop$border_bottom(2),
								$mdgriffith$elm_ui$Element$alignTop
							]),
						$mdgriffith$elm_ui$Element$text('Upgrades'))
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10)
							]),
						A2(
							$elm$core$List$map,
							$author$project$ItemShop$render_single_player_upgrade(colorTheme),
							player_upgrades))
					])));
	});
var $author$project$ItemShop$ChangeInventorySortType = function (a) {
	return {$: 'ChangeInventorySortType', a: a};
};
var $author$project$ItemShop$CycleFilterDisplayedItemsBackward = F2(
	function (a, b) {
		return {$: 'CycleFilterDisplayedItemsBackward', a: a, b: b};
	});
var $author$project$ItemShop$CycleFilterDisplayedItemsForward = F2(
	function (a, b) {
		return {$: 'CycleFilterDisplayedItemsForward', a: a, b: b};
	});
var $author$project$ItemShop$MouseEnterShopItem = F2(
	function (a, b) {
		return {$: 'MouseEnterShopItem', a: a, b: b};
	});
var $author$project$ItemShop$MouseLeaveShopItem = F2(
	function (a, b) {
		return {$: 'MouseLeaveShopItem', a: a, b: b};
	});
var $author$project$ItemShop$SortByAvgPrice = {$: 'SortByAvgPrice'};
var $author$project$ItemShop$SortByItemDesc = {$: 'SortByItemDesc'};
var $author$project$ItemShop$SortByItemType = {$: 'SortByItemType'};
var $author$project$ItemShop$SortByPrice = {$: 'SortByPrice'};
var $author$project$ItemShop$SortByQuantity = {$: 'SortByQuantity'};
var $author$project$ItemShop$ToggleHideNonZeroRows = function (a) {
	return {$: 'ToggleHideNonZeroRows', a: a};
};
var $author$project$ItemShop$is_item_trade_log_to_shop = function (item_trade_log) {
	return _Utils_eq(item_trade_log.to_party, $author$project$ItemShop$ShopParty);
};
var $author$project$ItemShop$action_log_to_str = F2(
	function (item_db, action_log) {
		var _v0 = action_log.log_type;
		switch (_v0.$) {
			case 'Traded':
				var item_trade_log = _v0.a;
				var traded_prefix = $author$project$ItemShop$is_item_trade_log_to_shop(item_trade_log) ? 'Sold: ' : 'Bought: ';
				return _Utils_ap(
					traded_prefix,
					function () {
						var _v1 = A2($author$project$ItemShop$lookup_item_id, item_db, item_trade_log.item_id);
						if (_v1.$ === 'Nothing') {
							return 'Unknown Item';
						} else {
							var db_record = _v1.a;
							return db_record.item.name;
						}
					}());
			case 'WantedButCouldntTrade':
				var action = _v0.a;
				if (action.$ === 'WantedToSell') {
					return 'Wanted to sell, but couldn\'t';
				} else {
					return 'Wanted to buy, but couldn\'t';
				}
			case 'FetchedItem':
				var itemId = _v0.a;
				return 'Fetched an item';
			default:
				return 'Did nothing';
		}
	});
var $author$project$Interface$clipText = F2(
	function (str, length) {
		return (_Utils_cmp(
			$elm$core$String$length(str),
			length) > 0) ? (A2($elm$core$String$left, length, str) + '...') : str;
	});
var $author$project$Interface$colorFromInt = F4(
	function (_int, positiveColor, neutralColor, negativeColor) {
		return (_int > 0) ? positiveColor : ((!_int) ? neutralColor : negativeColor);
	});
var $author$project$Interface$color_very_light_grey = A3($mdgriffith$elm_ui$Element$rgb, 0.75, 0.75, 0.75);
var $author$project$Interface$cssRule = F2(
	function (name, value) {
		return $mdgriffith$elm_ui$Element$htmlAttribute(
			A2($elm$html$Html$Attributes$style, name, value));
	});
var $author$project$ItemShop$divider = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				A2($mdgriffith$elm_ui$Element$paddingXY, 50, 5)
			]),
		A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$author$project$ItemShop$border_bottom(1),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Interface$color_very_light_grey)
				]),
			$mdgriffith$elm_ui$Element$none))
	]);
var $avh4$elm_color$Color$green = A4($avh4$elm_color$Color$RgbaSpace, 115 / 255, 210 / 255, 22 / 255, 1.0);
var $mdgriffith$elm_ui$Internal$Model$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$Behind, element);
};
var $author$project$ItemShop$html_title = function (string) {
	return $mdgriffith$elm_ui$Element$behindContent($mdgriffith$elm_ui$Element$none);
};
var $author$project$ItemShop$is_item_trending = F2(
	function (item_type_sentiments, item) {
		var _v0 = A2(
			$elm$core$Dict$get,
			$author$project$ItemShop$item_type_to_id(item.item_type),
			item_type_sentiments);
		if (_v0.$ === 'Just') {
			var existing_sent = _v0.a;
			return existing_sent !== 1.0;
		} else {
			return false;
		}
	});
var $mdgriffith$elm_ui$Element$Font$italic = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.italic);
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 'MoveY', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveDown = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(y));
};
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onMouseEnter = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onMouseEnter);
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onMouseLeave = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onMouseLeave);
var $author$project$ItemShop$portion = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$width, $mdgriffith$elm_ui$Element$fillPortion);
var $mdgriffith$elm_ui$Element$Font$alignLeft = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.textLeft);
var $author$project$Interface$color_pastel_green_1 = $author$project$Interface$hex_to_color('#b4ecb4');
var $author$project$Interface$color_pastel_green_2 = $author$project$Interface$hex_to_color('#a0e7a0');
var $author$project$Interface$color_pastel_green_3 = $author$project$Interface$hex_to_color('#8be28b');
var $author$project$Interface$color_pastel_green_4 = $author$project$Interface$hex_to_color('#77dd77');
var $author$project$Interface$color_pastel_green_5 = $author$project$Interface$hex_to_color('#63d863');
var $author$project$Interface$color_pastel_green_6 = $author$project$Interface$hex_to_color('#4ed34e');
var $author$project$Interface$color_pastel_green_7 = $author$project$Interface$hex_to_color('#3ace3a');
var $author$project$Interface$color_pastel_red_1 = $author$project$Interface$hex_to_color('#ecb4b4');
var $author$project$Interface$color_pastel_red_2 = $author$project$Interface$hex_to_color('#e7a0a0');
var $author$project$Interface$color_pastel_red_3 = $author$project$Interface$hex_to_color('#e28b8b');
var $author$project$Interface$color_pastel_red_4 = $author$project$Interface$hex_to_color('#dd7777');
var $author$project$Interface$color_pastel_red_5 = $author$project$Interface$hex_to_color('#d86363');
var $author$project$Interface$color_pastel_red_6 = $author$project$Interface$hex_to_color('#d34e4e');
var $author$project$Interface$color_pastel_red_7 = $author$project$Interface$hex_to_color('#ce3a3a');
var $author$project$ItemShop$get_trend_color = function (trend) {
	return (trend > 1.65) ? $author$project$Interface$color_pastel_red_7 : ((trend > 1.55) ? $author$project$Interface$color_pastel_red_6 : ((trend > 1.45) ? $author$project$Interface$color_pastel_red_5 : ((trend > 1.35) ? $author$project$Interface$color_pastel_red_4 : ((trend > 1.25) ? $author$project$Interface$color_pastel_red_3 : ((trend > 1.15) ? $author$project$Interface$color_pastel_red_2 : ((trend > 1.0) ? $author$project$Interface$color_pastel_red_1 : ((trend < 0.45) ? $author$project$Interface$color_pastel_green_7 : ((trend < 0.55) ? $author$project$Interface$color_pastel_green_6 : ((trend < 0.65) ? $author$project$Interface$color_pastel_green_5 : ((trend < 0.75) ? $author$project$Interface$color_pastel_green_4 : ((trend < 0.85) ? $author$project$Interface$color_pastel_green_3 : ((trend < 0.95) ? $author$project$Interface$color_pastel_green_2 : ((trend < 1.0) ? $author$project$Interface$color_pastel_green_1 : A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0))))))))))))));
};
var $mdgriffith$elm_ui$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$elm$core$String$fromFloat(shadow.offset.a) + 'px',
				$elm$core$String$fromFloat(shadow.offset.b) + 'px',
				$elm$core$String$fromFloat(shadow.blur) + 'px',
				$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textShadowClass = function (shadow) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'txt',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.offset.a) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.offset.b) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.blur) + 'px',
				$mdgriffith$elm_ui$Internal$Model$formatColorClass(shadow.color)
			]));
};
var $mdgriffith$elm_ui$Internal$Flag$txtShadows = $mdgriffith$elm_ui$Internal$Flag$flag(18);
var $mdgriffith$elm_ui$Element$Font$shadow = function (shade) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$txtShadows,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			$mdgriffith$elm_ui$Internal$Model$textShadowClass(shade),
			'text-shadow',
			$mdgriffith$elm_ui$Internal$Model$formatTextShadow(shade)));
};
var $author$project$ItemShop$render_item_type = F2(
	function (shop_trends, item_type) {
		var trend = A2($author$project$ItemShop$get_item_type_trend, shop_trends.item_type_sentiment, item_type);
		var trend_color = $author$project$ItemShop$get_trend_color(trend);
		var trend_shadow = (trend !== 1.0) ? _List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$shadow(
				{
					blur: 0.25,
					color: A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0),
					offset: _Utils_Tuple2(1, 1)
				})
			]) : _List_Nil;
		var pretty_trend = $elm$core$String$fromInt(
			$elm$core$Basics$round(trend * 100)) + '%';
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$alignLeft,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(
					$author$project$ItemShop$item_type_to_pretty_string(item_type)),
					$mdgriffith$elm_ui$Element$text(' - '),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_Utils_ap(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$color(trend_color)
							]),
						trend_shadow),
					$mdgriffith$elm_ui$Element$text(pretty_trend))
				]));
	});
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$scrollbars = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.scrollbars);
var $author$project$ItemShop$signedFromInt = function (_int) {
	return (_int > 0) ? ('+' + $elm$core$String$fromInt(_int)) : $elm$core$String$fromInt(_int);
};
var $author$project$ItemShop$small_charts_display = F2(
	function (historical_shop_trends, item_type) {
		var raw_dataset_len = $elm$core$List$length(historical_shop_trends);
		var get_y_from_single_datum = function (_v5) {
			var idx = _v5.a;
			var it_val = _v5.b;
			return it_val.b;
		};
		var get_x_from_single_datum = A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $elm$core$Basics$toFloat);
		var filter_dataset_by_item_type = function (_v4) {
			var item_type_sentiment = _v4.item_type_sentiment;
			return _Utils_Tuple2(
				item_type,
				A2($author$project$ItemShop$get_item_type_trend, item_type_sentiment, item_type));
		};
		var chart_width = 600;
		var chart_points = 200;
		var raw_dataset = A2(
			$elm$core$List$indexedMap,
			$elm$core$Tuple$pair,
			(_Utils_cmp(raw_dataset_len, chart_points) > 0) ? A2($elm$core$List$drop, raw_dataset_len - chart_points, historical_shop_trends) : historical_shop_trends);
		var chart_height = 150;
		var chart_attributes = _List_fromArray(
			[
				$terezka$elm_charts$Chart$Attributes$height(chart_height),
				$terezka$elm_charts$Chart$Attributes$width(chart_width),
				$terezka$elm_charts$Chart$Attributes$padding(
				{bottom: 5, left: 10, right: 10, top: 10}),
				A2(
				$terezka$elm_charts$Chart$Events$onMouseMove,
				$author$project$ItemShop$OnTrendChartHover,
				$terezka$elm_charts$Chart$Events$getNearest($terezka$elm_charts$Chart$Item$dots)),
				$terezka$elm_charts$Chart$Events$onMouseLeave(
				$author$project$ItemShop$OnTrendChartHover(_List_Nil)),
				$terezka$elm_charts$Chart$Attributes$domain(
				_List_fromArray(
					[
						A2($terezka$elm_charts$Chart$Attributes$lowest, 0.5, $terezka$elm_charts$Chart$Attributes$orLower),
						A2($terezka$elm_charts$Chart$Attributes$highest, 1.5, $terezka$elm_charts$Chart$Attributes$orHigher),
						$terezka$elm_charts$Chart$Attributes$centerAt(1.0)
					]))
			]);
		var build_filtered_dataset = A2(
			$elm$core$List$map,
			function (_v3) {
				var idx = _v3.a;
				var s_t = _v3.b;
				return _Utils_Tuple2(
					idx,
					filter_dataset_by_item_type(s_t));
			},
			raw_dataset);
		var build_dataset = A2(
			$elm$core$List$all,
			function (_v0) {
				var shop_trends = _v0.b;
				return A2($author$project$ItemShop$get_item_type_trend, shop_trends.item_type_sentiment, item_type) === 1.0;
			},
			raw_dataset) ? $terezka$elm_charts$Chart$none : A3(
			$terezka$elm_charts$Chart$series,
			function (_v1) {
				var idx = _v1.a;
				return idx;
			},
			_List_fromArray(
				[
					A2(
					$terezka$elm_charts$Chart$named,
					$author$project$ItemShop$item_type_to_pretty_string(item_type),
					A3(
						$terezka$elm_charts$Chart$interpolated,
						function (_v2) {
							var idx = _v2.a;
							var it_val = _v2.b;
							return it_val.b;
						},
						_List_fromArray(
							[$terezka$elm_charts$Chart$Attributes$monotone]),
						_List_Nil))
				]),
			build_filtered_dataset);
		var datasets = _List_fromArray(
			[build_dataset]);
		var chart_elements = _Utils_ap(
			_List_fromArray(
				[
					$terezka$elm_charts$Chart$xLabels(_List_Nil),
					$terezka$elm_charts$Chart$yLabels(
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$format($author$project$ItemShop$float_to_percent),
							$terezka$elm_charts$Chart$Attributes$withGrid
						]))
				]),
			_Utils_ap(
				datasets,
				_List_fromArray(
					[
						A4(
						$terezka$elm_charts$Chart$legendsAt,
						function ($) {
							return $.min;
						},
						function ($) {
							return $.max;
						},
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$column,
								$terezka$elm_charts$Chart$Attributes$moveRight(15),
								$terezka$elm_charts$Chart$Attributes$spacing(5)
							]),
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$width(20)
							]))
					])));
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(chart_width)),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(100)),
					A2($mdgriffith$elm_ui$Element$paddingXY, 20, 0),
					$mdgriffith$elm_ui$Element$centerX
				]),
			$mdgriffith$elm_ui$Element$html(
				A2($terezka$elm_charts$Chart$chart, chart_attributes, chart_elements)));
	});
var $elm$core$List$sortWith = _List_sortWith;
var $mdgriffith$elm_ui$Element$InternalColumn = function (a) {
	return {$: 'InternalColumn', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 'GridTemplateStyle', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsGrid = {$: 'AsGrid'};
var $mdgriffith$elm_ui$Internal$Model$asGrid = $mdgriffith$elm_ui$Internal$Model$AsGrid;
var $mdgriffith$elm_ui$Internal$Model$getSpacing = F2(
	function (attrs, _default) {
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A3(
				$elm$core$List$foldr,
				F2(
					function (attr, acc) {
						if (acc.$ === 'Just') {
							var x = acc.a;
							return $elm$core$Maybe$Just(x);
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
								var _v2 = attr.b;
								var x = _v2.b;
								var y = _v2.c;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}),
				$elm$core$Maybe$Nothing,
				attrs));
	});
var $mdgriffith$elm_ui$Internal$Flag$gridPosition = $mdgriffith$elm_ui$Internal$Flag$flag(35);
var $mdgriffith$elm_ui$Internal$Flag$gridTemplate = $mdgriffith$elm_ui$Internal$Flag$flag(34);
var $mdgriffith$elm_ui$Element$tableHelper = F2(
	function (attrs, config) {
		var onGrid = F3(
			function (rowLevel, columnLevel, elem) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$StyleClass,
							$mdgriffith$elm_ui$Internal$Flag$gridPosition,
							$mdgriffith$elm_ui$Internal$Model$GridPosition(
								{col: columnLevel, height: 1, row: rowLevel, width: 1}))
						]),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[elem])));
			});
		var columnWidth = function (col) {
			if (col.$ === 'InternalIndexedColumn') {
				var colConfig = col.a;
				return colConfig.width;
			} else {
				var colConfig = col.a;
				return colConfig.width;
			}
		};
		var columnHeader = function (col) {
			if (col.$ === 'InternalIndexedColumn') {
				var colConfig = col.a;
				return colConfig.header;
			} else {
				var colConfig = col.a;
				return colConfig.header;
			}
		};
		var maybeHeaders = function (headers) {
			return A2(
				$elm$core$List$all,
				$elm$core$Basics$eq($mdgriffith$elm_ui$Internal$Model$Empty),
				headers) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (col, header) {
							return A3(onGrid, 1, col + 1, header);
						}),
					headers));
		}(
			A2($elm$core$List$map, columnHeader, config.columns));
		var add = F3(
			function (cell, columnConfig, cursor) {
				if (columnConfig.$ === 'InternalIndexedColumn') {
					var col = columnConfig.a;
					return _Utils_update(
						cursor,
						{
							column: cursor.column + 1,
							elements: A2(
								$elm$core$List$cons,
								A3(
									onGrid,
									cursor.row,
									cursor.column,
									A2(
										col.view,
										_Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? (cursor.row - 1) : (cursor.row - 2),
										cell)),
								cursor.elements)
						});
				} else {
					var col = columnConfig.a;
					return {
						column: cursor.column + 1,
						elements: A2(
							$elm$core$List$cons,
							A3(
								onGrid,
								cursor.row,
								cursor.column,
								col.view(cell)),
							cursor.elements),
						row: cursor.row
					};
				}
			});
		var build = F3(
			function (columns, rowData, cursor) {
				var newCursor = A3(
					$elm$core$List$foldl,
					add(rowData),
					cursor,
					columns);
				return {column: 1, elements: newCursor.elements, row: cursor.row + 1};
			});
		var children = A3(
			$elm$core$List$foldl,
			build(config.columns),
			{
				column: 1,
				elements: _List_Nil,
				row: _Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? 1 : 2
			},
			config.data);
		var _v0 = A2(
			$mdgriffith$elm_ui$Internal$Model$getSpacing,
			attrs,
			_Utils_Tuple2(0, 0));
		var sX = _v0.a;
		var sY = _v0.b;
		var template = A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$gridTemplate,
			$mdgriffith$elm_ui$Internal$Model$GridTemplateStyle(
				{
					columns: A2($elm$core$List$map, columnWidth, config.columns),
					rows: A2(
						$elm$core$List$repeat,
						$elm$core$List$length(config.data),
						$mdgriffith$elm_ui$Internal$Model$Content),
					spacing: _Utils_Tuple2(
						$mdgriffith$elm_ui$Element$px(sX),
						$mdgriffith$elm_ui$Element$px(sY))
				}));
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asGrid,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				A2($elm$core$List$cons, template, attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				function () {
					if (maybeHeaders.$ === 'Nothing') {
						return children.elements;
					} else {
						var renderedHeaders = maybeHeaders.a;
						return _Utils_ap(
							renderedHeaders,
							$elm$core$List$reverse(children.elements));
					}
				}()));
	});
var $mdgriffith$elm_ui$Element$table = F2(
	function (attrs, config) {
		return A2(
			$mdgriffith$elm_ui$Element$tableHelper,
			attrs,
			{
				columns: A2($elm$core$List$map, $mdgriffith$elm_ui$Element$InternalColumn, config.columns),
				data: config.data
			});
	});
var $author$project$ItemShop$render_inventory_grid = F7(
	function (model, header, character, shop_trends, hovered_item, context, controls_column) {
		var small_header = F2(
			function (str, sortType) {
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$size(10),
							$mdgriffith$elm_ui$Element$Events$onClick(
							$author$project$ItemShop$ChangeInventorySortType(sortType)),
							$author$project$Interface$noUserSelect,
							$mdgriffith$elm_ui$Element$Border$rounded(2),
							$mdgriffith$elm_ui$Element$mouseOver(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Background$color($author$project$Interface$color_very_light_grey)
								])),
							$mdgriffith$elm_ui$Element$padding(2),
							$mdgriffith$elm_ui$Element$pointer
						]),
					$mdgriffith$elm_ui$Element$text(
						_Utils_ap(
							str,
							function () {
								if (_Utils_eq(model.inventorySortType, sortType)) {
									var _v21 = model.inventorySortDir;
									if (_v21.$ === 'Descending') {
										return '▲';
									} else {
										return '▼';
									}
								} else {
									return '';
								}
							}())));
			});
		var rendered_dislikes = A2(
			$elm$core$List$map,
			function (_v19) {
				var it_id = _v19.a;
				var trd = _v19.b;
				return $mdgriffith$elm_ui$Element$text(
					'Dislikes: ' + function () {
						var _v20 = $author$project$ItemShop$id_to_item_type(it_id);
						if (_v20.$ === 'Just') {
							var item_type = _v20.a;
							return $author$project$ItemShop$item_type_to_pretty_string(item_type);
						} else {
							return 'Unknown';
						}
					}());
			},
			A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$second,
					function (trd) {
						return trd <= 0.0;
					}),
				$elm$core$Dict$toList(character.item_types_desired)));
		var rendered_desires = A2(
			$elm$core$List$map,
			function (_v17) {
				var it_id = _v17.a;
				var trd = _v17.b;
				return $mdgriffith$elm_ui$Element$text(
					'Desires: ' + function () {
						var _v18 = $author$project$ItemShop$id_to_item_type(it_id);
						if (_v18.$ === 'Just') {
							var item_type = _v18.a;
							return $author$project$ItemShop$item_type_to_pretty_string(item_type);
						} else {
							return 'Unknown';
						}
					}());
			},
			A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$second,
					function (trd) {
						return trd > 0.0;
					}),
				$elm$core$Dict$toList(character.item_types_desired)));
		var is_shop_context = _Utils_eq(context, $author$project$ItemShop$ShopItems);
		var is_player_context = _Utils_eq(context, $author$project$ItemShop$InventoryItems);
		var current_price = function (item) {
			return A2($author$project$ItemShop$get_single_adjusted_item_cost, shop_trends, item);
		};
		var buildCompare = function (getter) {
			return F2(
				function (left, right) {
					return A2(
						$elm$core$Basics$compare,
						getter(left),
						getter(right));
				});
		};
		var sortFunc = function () {
			var _v16 = model.inventorySortType;
			switch (_v16.$) {
				case 'SortByName':
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.item;
							},
							function ($) {
								return $.name;
							}));
				case 'SortByPrice':
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.item;
							},
							$author$project$ItemShop$get_single_adjusted_item_cost(shop_trends)));
				case 'SortByAvgPrice':
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.avg_price;
							},
							$author$project$ItemShop$getPrice));
				case 'SortByQuantity':
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.quantity;
							},
							$author$project$ItemShop$getQuantity));
				case 'SortByItemType':
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.item;
							},
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.item_type;
								},
								$author$project$ItemShop$item_type_to_pretty_string)));
				default:
					return buildCompare(
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.item;
							},
							function ($) {
								return $.description;
							}));
			}
		}();
		var _v0 = model;
		var historical_shop_trends = _v0.historical_shop_trends;
		var item_db = _v0.item_db;
		var show_charts_in_hovered_item = _v0.show_charts_in_hovered_item;
		var render_single_action_log = function (log) {
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_Nil,
				$mdgriffith$elm_ui$Element$text(
					A2($author$project$ItemShop$action_log_to_str, item_db, log)));
		};
		var rendered_action_log_items = ($elm$core$List$length(character.action_log) > 0) ? A2(
			$elm$core$List$map,
			render_single_action_log,
			A2(
				$elm$core$List$take,
				50,
				$elm$core$List$reverse(character.action_log))) : _List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('No actions taken')
			]);
		var rendered_action_log = _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$scrollbars,
						((!is_shop_context) && ($elm$core$List$length(character.action_log) > 0)) ? $mdgriffith$elm_ui$Element$height(
						A2(
							$mdgriffith$elm_ui$Element$minimum,
							50,
							A2($mdgriffith$elm_ui$Element$maximum, 600, $mdgriffith$elm_ui$Element$fill))) : $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
					]),
				(!is_shop_context) ? rendered_action_log_items : _List_Nil)
			]);
		var _v1 = character;
		var char_id = _v1.char_id;
		var held_items = _v1.held_items;
		var held_gold = _v1.held_gold;
		var hide_zero_qty_inv_rows = _v1.hide_zero_qty_inv_rows;
		var is_hovered_item = function (item) {
			if (hovered_item.$ === 'Just') {
				var _v15 = hovered_item.a;
				var hovered_char_id = _v15.a;
				var hovered_item_ = _v15.b;
				return _Utils_eq(char_id, hovered_char_id) && _Utils_eq(item, hovered_item_);
			} else {
				return false;
			}
		};
		var expanded_display = function (item) {
			return is_hovered_item(item) ? A2(
				$mdgriffith$elm_ui$Element$Keyed$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Background$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$Border$color(
						A3($mdgriffith$elm_ui$Element$rgb, 0.35, 0.35, 0.35)),
						$mdgriffith$elm_ui$Element$Border$rounded(3),
						$mdgriffith$elm_ui$Element$Border$width(2),
						$mdgriffith$elm_ui$Element$padding(10),
						$mdgriffith$elm_ui$Element$moveDown(20)
					]),
				_Utils_Tuple2(
					$TSFoster$elm_uuid$UUID$toString(item.id),
					A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(5),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$paragraph,
										_List_Nil,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$text(item.name),
												$mdgriffith$elm_ui$Element$text(': '),
												$mdgriffith$elm_ui$Element$text(item.description)
											])),
										(!show_charts_in_hovered_item) ? A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$italic,
												$mdgriffith$elm_ui$Element$alignRight,
												$mdgriffith$elm_ui$Element$Font$color(
												function () {
													var _v13 = model.colorTheme;
													if (_v13.$ === 'BrightTheme') {
														return $author$project$Interface$color_grey;
													} else {
														return $author$project$Interface$convertColor($avh4$elm_color$Color$white);
													}
												}()),
												$mdgriffith$elm_ui$Element$Font$size(12)
											]),
										$mdgriffith$elm_ui$Element$text('Hold Shift for more')) : $mdgriffith$elm_ui$Element$none
									])),
								A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_Nil,
								_Utils_ap(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text('Current Price: '),
											A2(
											$author$project$Interface$render_gp,
											model.colorTheme,
											current_price(item))
										]),
									(A2($author$project$ItemShop$is_item_trending, shop_trends.item_type_sentiment, item) && (!_Utils_eq(
										item.raw_gold_cost,
										current_price(item)))) ? _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text(' (originally '),
											A2($author$project$Interface$render_gp, model.colorTheme, item.raw_gold_cost),
											$mdgriffith$elm_ui$Element$text(')')
										]) : _List_Nil)),
								show_charts_in_hovered_item ? A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Element$paddingXY, 20, 20)
									]),
								A2($author$project$ItemShop$small_charts_display, historical_shop_trends, item.item_type)) : $mdgriffith$elm_ui$Element$none
							])))) : $mdgriffith$elm_ui$Element$none;
		};
		var mouse_hover_attrs = function (item) {
			return _List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					A2(
						$author$project$ItemShop$MouseEnterShopItem,
						context,
						_Utils_Tuple2(char_id, item))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					A2(
						$author$project$ItemShop$MouseLeaveShopItem,
						context,
						_Utils_Tuple2(char_id, item)))
				]);
		};
		var table_columns = A2(
			$elm$core$List$map,
			function (col) {
				return _Utils_update(
					col,
					{
						view: function (item) {
							return A2(
								$mdgriffith$elm_ui$Element$el,
								(!$author$project$ItemShop$getQuantity(item.quantity)) ? _List_fromArray(
									[
										A2($author$project$Interface$cssRule, 'opacity', '0.5'),
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
									]) : _List_fromArray(
									[
										A2($author$project$Interface$cssRule, 'opacity', '1.0'),
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
									]),
								A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$centerY
										]),
									col.view(item)));
						}
					});
			},
			_List_fromArray(
				[
					{
					header: A2(small_header, 'Name', $author$project$ItemShop$SortByName),
					view: function (_v5) {
						var item = _v5.item;
						var quantity = _v5.quantity;
						var avg_price = _v5.avg_price;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_Utils_ap(
								mouse_hover_attrs(item),
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width(
										A2(
											$mdgriffith$elm_ui$Element$maximum,
											150,
											$mdgriffith$elm_ui$Element$fillPortion(2))),
										$mdgriffith$elm_ui$Element$Font$size(16),
										$author$project$ItemShop$html_title('Item Name'),
										$mdgriffith$elm_ui$Element$centerY
									])),
							$mdgriffith$elm_ui$Element$text(
								A2($author$project$Interface$clipText, item.name, 25)));
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(2)
				},
					{
					header: A2(small_header, 'Price', $author$project$ItemShop$SortByPrice),
					view: function (_v6) {
						var item = _v6.item;
						var quantity = _v6.quantity;
						var avg_price = _v6.avg_price;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$author$project$ItemShop$portion(1),
									$mdgriffith$elm_ui$Element$centerY,
									$author$project$ItemShop$html_title('Current cost')
								]),
							function () {
								var adjustedPrice = A2($author$project$ItemShop$get_single_adjusted_item_cost, shop_trends, item);
								var priceDiff = adjustedPrice - $author$project$ItemShop$getPrice(avg_price);
								return A2(
									$mdgriffith$elm_ui$Element$paragraph,
									_List_Nil,
									_Utils_ap(
										_List_fromArray(
											[
												A2(
												$author$project$Interface$render_gp,
												model.colorTheme,
												A2($author$project$ItemShop$get_single_adjusted_item_cost, shop_trends, item))
											]),
										_List_fromArray(
											[
												function () {
												if ((!_Utils_eq(context, $author$project$ItemShop$ShopItems)) && ((!(!priceDiff)) && (!(!$author$project$ItemShop$getQuantity(quantity))))) {
													var diffColor = A4(
														$author$project$Interface$colorFromInt,
														priceDiff,
														$author$project$Interface$convertColor($avh4$elm_color$Color$green),
														$author$project$Interface$color_black,
														$author$project$Interface$color_danger);
													return A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$Font$size(12),
																$mdgriffith$elm_ui$Element$Font$color(diffColor)
															]),
														$mdgriffith$elm_ui$Element$text(
															' (' + ($author$project$ItemShop$signedFromInt(priceDiff) + ')')));
												} else {
													return $mdgriffith$elm_ui$Element$none;
												}
											}()
											])));
							}());
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(1)
				},
					{
					header: A2(small_header, 'Avg Px', $author$project$ItemShop$SortByAvgPrice),
					view: function (_v7) {
						var quantity = _v7.quantity;
						var avg_price = _v7.avg_price;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$author$project$ItemShop$portion(1),
									$mdgriffith$elm_ui$Element$centerY,
									$author$project$ItemShop$html_title('Average Cost')
								]),
							function () {
								if (context.$ === 'ShopItems') {
									return $mdgriffith$elm_ui$Element$text('');
								} else {
									return (!(!$author$project$ItemShop$getQuantity(quantity))) ? A2(
										$author$project$Interface$render_gp,
										model.colorTheme,
										$author$project$ItemShop$getPrice(avg_price)) : $mdgriffith$elm_ui$Element$none;
								}
							}());
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(1)
				},
					{
					header: A2(small_header, 'Qty.', $author$project$ItemShop$SortByQuantity),
					view: function (_v9) {
						var quantity = _v9.quantity;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$centerY]),
							function () {
								if (!$author$project$ItemShop$getQuantity(quantity)) {
									switch (context.$) {
										case 'ShopItems':
											return $mdgriffith$elm_ui$Element$text('OUT');
										case 'InventoryItems':
											return $mdgriffith$elm_ui$Element$text('NONE');
										default:
											return $mdgriffith$elm_ui$Element$text('NONE');
									}
								} else {
									return $mdgriffith$elm_ui$Element$text(
										'x' + $elm$core$String$fromInt(
											$author$project$ItemShop$getQuantity(quantity)));
								}
							}());
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(1)
				},
					{
					header: A2(small_header, 'Item Type', $author$project$ItemShop$SortByItemType),
					view: function (_v11) {
						var item = _v11.item;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$centerY]),
							A2($author$project$ItemShop$render_item_type, shop_trends, item.item_type));
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(2)
				},
					{
					header: A2(small_header, 'Item Desc.', $author$project$ItemShop$SortByItemDesc),
					view: function (_v12) {
						var item = _v12.item;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$centerY]),
							$mdgriffith$elm_ui$Element$text(
								A2($author$project$Interface$clipText, item.description, 24)));
					},
					width: $mdgriffith$elm_ui$Element$fillPortion(3)
				},
					{
					header: A2(small_header, 'Controls', $author$project$ItemShop$SortByName),
					view: controls_column,
					width: $mdgriffith$elm_ui$Element$fillPortion(1)
				}
				]));
		var items = function (irs) {
			var _v4 = character.displayedItemType;
			if (_v4.$ === 'Nothing') {
				return irs;
			} else {
				var item_type = _v4.a;
				return A2(
					$elm$core$List$filter,
					function (ir) {
						return _Utils_eq(ir.item.item_type, item_type);
					},
					irs);
			}
		}(
			A2(
				$elm$core$List$sortWith,
				sortFunc,
				hide_zero_qty_inv_rows ? A2(
					$elm$core$List$filter,
					function (_v3) {
						var quantity = _v3.quantity;
						return $author$project$ItemShop$getQuantity(quantity) > 0;
					},
					held_items) : held_items));
		var rendered_inventory_controls = _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Element$spacingXY, 10, 0)
					]),
				_List_fromArray(
					[
						A3(
						$author$project$Interface$primary_button,
						_List_Nil,
						$author$project$ItemShop$ToggleHideNonZeroRows(character.char_id),
						hide_zero_qty_inv_rows ? 'Show Nonzero' : 'Hide Nonzero'),
						A3(
						$author$project$Interface$secondary_button,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Events$preventDefaultOn,
									'contextmenu',
									$elm$json$Json$Decode$succeed(
										_Utils_Tuple2(
											A2($author$project$ItemShop$CycleFilterDisplayedItemsBackward, character.char_id, character.displayedItemType),
											true))))
							]),
						A2($author$project$ItemShop$CycleFilterDisplayedItemsForward, character.char_id, character.displayedItemType),
						'Filter: ' + function () {
							var _v2 = character.displayedItemType;
							if (_v2.$ === 'Nothing') {
								return 'All';
							} else {
								var itemType = _v2.a;
								return $author$project$ItemShop$item_type_to_pretty_string(itemType);
							}
						}())
					]))
			]);
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2($mdgriffith$elm_ui$Element$spacingXY, 0, 5),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								$author$project$ItemShop$font_scaled(2),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$author$project$ItemShop$border_bottom(2)
									]),
								$mdgriffith$elm_ui$Element$text(header)),
								$mdgriffith$elm_ui$Element$text('   '),
								(!is_shop_context) ? A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$author$project$ItemShop$font_scaled(1),
										$mdgriffith$elm_ui$Element$centerX,
										A2($mdgriffith$elm_ui$Element$spacingXY, 10, 0)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
												A2($mdgriffith$elm_ui$Element$spacingXY, 10, 0)
											]),
										_List_fromArray(
											[
												A2(
												$mdgriffith$elm_ui$Element$row,
												_List_fromArray(
													[$mdgriffith$elm_ui$Element$Font$alignRight]),
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('Held: '),
														A2($author$project$Interface$render_gp, model.colorTheme, held_gold)
													])),
												(is_player_context && (character.held_blood > 0)) ? A2(
												$mdgriffith$elm_ui$Element$row,
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
													]),
												_List_fromArray(
													[
														A2($author$project$Interface$renderBlood, model.colorTheme, character.held_blood)
													])) : $mdgriffith$elm_ui$Element$none
											]))
									])) : $mdgriffith$elm_ui$Element$none
							]))
					]),
				_Utils_ap(
					rendered_desires,
					_Utils_ap(
						rendered_dislikes,
						_Utils_ap(
							rendered_action_log,
							_Utils_ap(
								rendered_inventory_controls,
								_Utils_ap(
									((!is_shop_context) && ($elm$core$List$length(character.action_log) > 0)) ? $author$project$ItemShop$divider : _List_Nil,
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$table,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$spacing(5)
												]),
											{columns: table_columns, data: items})
										]))))))));
	});
var $author$project$ItemShop$PlayerBuyItemFromShop = F2(
	function (a, b) {
		return {$: 'PlayerBuyItemFromShop', a: a, b: b};
	});
var $author$project$ItemShop$shop_buy_button = F3(
	function (gold_cost, gold_in_pocket, _v0) {
		var item = _v0.item;
		var quantity = _v0.quantity;
		var avg_price = _v0.avg_price;
		var can_afford = _Utils_cmp(gold_in_pocket, gold_cost) > -1;
		var button_type = can_afford ? $author$project$Interface$primary_button : $author$project$Interface$secondary_button;
		return A3(
			button_type,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$transparent(
					$author$project$ItemShop$getQuantity(quantity) < 1),
					$mdgriffith$elm_ui$Element$width(
					A2($mdgriffith$elm_ui$Element$minimum, 120, $mdgriffith$elm_ui$Element$fill))
				]),
			A2(
				$author$project$ItemShop$PlayerBuyItemFromShop,
				item,
				$author$project$ItemShop$Quantity(1)),
			can_afford ? 'BUY' : 'Need GP');
	});
var $author$project$ItemShop$shopInventoryControls = F3(
	function (maybe_player, shop_trends, _v0) {
		var item = _v0.item;
		var quantity = _v0.quantity;
		var avg_price = _v0.avg_price;
		return A3(
			$author$project$ItemShop$shop_buy_button,
			A2($author$project$ItemShop$get_single_adjusted_item_cost, shop_trends, item),
			function () {
				if (maybe_player.$ === 'Just') {
					var player = maybe_player.a;
					return player.held_gold;
				} else {
					return 99999;
				}
			}(),
			{avg_price: avg_price, item: item, quantity: quantity});
	});
var $author$project$ItemShop$IncreaseIncome = {$: 'IncreaseIncome'};
var $author$project$ItemShop$InviteTrader = {$: 'InviteTrader'};
var $author$project$ItemShop$TogglePauseAi = {$: 'TogglePauseAi'};
var $author$project$ItemShop$TriggerEvent = function (a) {
	return {$: 'TriggerEvent', a: a};
};
var $author$project$ItemShop$UnlockItem = {$: 'UnlockItem'};
var $author$project$ItemShop$Noop = {$: 'Noop'};
var $author$project$ItemShop$OnSpecialAction = F2(
	function (a, b) {
		return {$: 'OnSpecialAction', a: a, b: b};
	});
var $author$project$ItemShop$TooltipElement = function (a) {
	return {$: 'TooltipElement', a: a};
};
var $author$project$ItemShop$buildTooltipElementConfig = F2(
	function (tooltip_id, element) {
		return {
			tooltip_body: $author$project$ItemShop$TooltipElement(element),
			tooltip_id: $TSFoster$elm_uuid$UUID$toString(
				A2($TSFoster$elm_uuid$UUID$forName, tooltip_id, $TSFoster$elm_uuid$UUID$dnsNamespace))
		};
	});
var $author$project$ItemShop$TooltipText = function (a) {
	return {$: 'TooltipText', a: a};
};
var $author$project$ItemShop$buildTooltipTextConfig = function (text) {
	return {
		tooltip_body: $author$project$ItemShop$TooltipText(text),
		tooltip_id: $TSFoster$elm_uuid$UUID$toString(
			A2($TSFoster$elm_uuid$UUID$forName, text, $TSFoster$elm_uuid$UUID$dnsNamespace))
	};
};
var $author$project$ItemShop$hoveredTooltipMatchesId = F2(
	function (hovered_tooltip, tooltip_id) {
		switch (hovered_tooltip.$) {
			case 'HoveredTooltipWithoutOffset':
				var tooltip_data = hovered_tooltip.a;
				return _Utils_eq(tooltip_data.hovered_tooltip_id, tooltip_id) ? true : false;
			case 'HoveredTooltipWithOffset':
				var hovered_tooltip_data = hovered_tooltip.a;
				return _Utils_eq(hovered_tooltip_data.hovered_tooltip_id, tooltip_id) ? true : false;
			default:
				return false;
		}
	});
var $author$project$ItemShop$EndTooltipHover = function (a) {
	return {$: 'EndTooltipHover', a: a};
};
var $author$project$ItemShop$StartTooltipHover = function (a) {
	return {$: 'StartTooltipHover', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Element$above = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$Above, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveX = function (a) {
	return {$: 'MoveX', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveX = $mdgriffith$elm_ui$Internal$Flag$flag(25);
var $mdgriffith$elm_ui$Element$moveRight = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveX,
		$mdgriffith$elm_ui$Internal$Model$MoveX(x));
};
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $K_Adam$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $K_Adam$elm_dom$DOM$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $author$project$ItemShop$primary_button_tooltip = F6(
	function (colorTheme, custom_attrs, on_press, label, _v0, hovered_tooltip) {
		var tooltip_id = _v0.tooltip_id;
		var tooltip_body = _v0.tooltip_body;
		var offset_w = $K_Adam$elm_dom$DOM$target($K_Adam$elm_dom$DOM$offsetWidth);
		var _v1 = function () {
			switch (hovered_tooltip.$) {
				case 'HoveredTooltipWithOffset':
					var data = hovered_tooltip.a;
					return data;
				case 'HoveredTooltipWithoutOffset':
					var cached_data = hovered_tooltip.a;
					return cached_data;
				default:
					return {hovered_tooltip_id: 'UNUSED', offset_x: 0, offset_y: 0};
			}
		}();
		var offset_x = _v1.offset_x;
		var offset_y = _v1.offset_y;
		var tooltip_el = A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					$author$project$ItemShop$defaultFontColor(colorTheme),
					$author$project$ItemShop$defaultBackgroundColor(colorTheme),
					$mdgriffith$elm_ui$Element$Border$color(
					$author$project$Interface$convertColor($avh4$elm_color$Color$charcoal)),
					$mdgriffith$elm_ui$Element$Border$rounded(3),
					$mdgriffith$elm_ui$Element$Border$width(2),
					$mdgriffith$elm_ui$Element$padding(10),
					(!offset_y) ? $mdgriffith$elm_ui$Element$moveUp(20) : $mdgriffith$elm_ui$Element$moveDown(offset_y),
					$mdgriffith$elm_ui$Element$moveRight(offset_x),
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$htmlAttribute(
					$elm$html$Html$Attributes$id('tooltip__' + tooltip_id))
				]),
			function () {
				if (tooltip_body.$ === 'TooltipText') {
					var tt_text = tooltip_body.a;
					return $mdgriffith$elm_ui$Element$text(tt_text);
				} else {
					var elem = tooltip_body.a;
					return elem;
				}
			}());
		var tooltip_attr = A2($author$project$ItemShop$hoveredTooltipMatchesId, hovered_tooltip, tooltip_id) ? _List_fromArray(
			[
				$mdgriffith$elm_ui$Element$above(tooltip_el)
			]) : _List_Nil;
		return A3(
			$author$project$Interface$primary_button,
			_Utils_ap(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Events$onMouseLeave(
						$author$project$ItemShop$EndTooltipHover(tooltip_id)),
						$mdgriffith$elm_ui$Element$Events$onMouseEnter(
						$author$project$ItemShop$StartTooltipHover(tooltip_id))
					]),
				_Utils_ap(tooltip_attr, custom_attrs)),
			on_press,
			label);
	});
var $author$project$ItemShop$build_special_action_button = F7(
	function (colorTheme, hovered_tooltip, character, special_action, title, tooltip_text, price) {
		var tooltip_config = function (t) {
			if (!_Utils_eq(price, $author$project$ItemShop$Free)) {
				var renderedCost = A2(
					$author$project$Interface$render_gp,
					colorTheme,
					$author$project$ItemShop$getPrice(price));
				return A2(
					$author$project$ItemShop$buildTooltipElementConfig,
					t,
					A2(
						$mdgriffith$elm_ui$Element$column,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(t),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$padding(1),
										$mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_grey)
									]),
								$mdgriffith$elm_ui$Element$text('___')),
								A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$padding(10),
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$Font$size(14)
									]),
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text('Costs: '),
										renderedCost
									]))
							])));
			} else {
				return $author$project$ItemShop$buildTooltipTextConfig(t);
			}
		}(tooltip_text);
		var is_disabled = function () {
			if (price.$ === 'Free') {
				return false;
			} else {
				var cost = price.a;
				return (_Utils_cmp(character.held_gold, cost) > -1) ? false : true;
			}
		}();
		var msg = (!is_disabled) ? A2($author$project$ItemShop$OnSpecialAction, special_action, price) : $author$project$ItemShop$Noop;
		var button_attrs = is_disabled ? _Utils_ap(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color($author$project$Interface$color_grey),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Interface$color_grey)
				]),
			A2($author$project$ItemShop$hoveredTooltipMatchesId, hovered_tooltip, tooltip_config.tooltip_id) ? _List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(
					A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0)),
					$mdgriffith$elm_ui$Element$Border$color(
					A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0)),
					$mdgriffith$elm_ui$Element$mouseOver(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Interface$color_light_grey),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Interface$color_light_grey)
						]))
				]) : _List_Nil) : _List_Nil;
		return A6($author$project$ItemShop$primary_button_tooltip, colorTheme, button_attrs, msg, title, tooltip_config, hovered_tooltip);
	});
var $author$project$ItemShop$special_actions_display = F5(
	function (colorTheme, player_upgrades, hovered_tooltip, player, ai_updates_paused) {
		var button_unlock_item = A7(
			$author$project$ItemShop$build_special_action_button,
			colorTheme,
			hovered_tooltip,
			player,
			$author$project$ItemShop$UnlockItem,
			'Item Search',
			'Spend cash to hire a mercenary to seek out items.\n\nAllows for invited traders to have new items.',
			$author$project$ItemShop$setPrice(25));
		var button_toggle_ai_pause = A7(
			$author$project$ItemShop$build_special_action_button,
			colorTheme,
			hovered_tooltip,
			player,
			$author$project$ItemShop$TogglePauseAi,
			ai_updates_paused ? 'Resume' : 'Pause',
			'You tap your medallion, and time comes to a halt.\n\nYou take a breath, and feel a weight off your shoulders. You\'ll take your time with things.',
			$author$project$ItemShop$Free);
		var button_search = A7(
			$author$project$ItemShop$build_special_action_button,
			colorTheme,
			hovered_tooltip,
			player,
			$author$project$ItemShop$InviteTrader,
			'Invite Trader',
			'Invite a fellow Trader.\n\nThey may or may not have new wares you\'ve never seen!',
			$author$project$ItemShop$setPrice(50));
		var button_low_desire = A7(
			$author$project$ItemShop$build_special_action_button,
			colorTheme,
			hovered_tooltip,
			player,
			$author$project$ItemShop$TriggerEvent(
				$author$project$ItemShop$EventLeastDesiredItemType($elm$core$Maybe$Nothing)),
			'Spread Bad Rumour',
			'Sets a random Item Type to low value.\n\nSpreads a rumour that a given Item Type has a surplus of sellers.',
			$author$project$ItemShop$setPrice(45));
		var button_increase_income = function () {
			var income_level = A3(
				$elm$core$List$foldl,
				F2(
					function (u, acc) {
						var lvl = u.a;
						return lvl;
					}),
				1,
				player_upgrades);
			return A7(
				$author$project$ItemShop$build_special_action_button,
				colorTheme,
				hovered_tooltip,
				player,
				$author$project$ItemShop$IncreaseIncome,
				'Invest',
				'Invest in another business, earning more income.\n\nIncreases the gold you get per second.',
				$author$project$ItemShop$scale_increase_income_cost(income_level));
		}();
		var button_high_desire = A7(
			$author$project$ItemShop$build_special_action_button,
			colorTheme,
			hovered_tooltip,
			player,
			$author$project$ItemShop$TriggerEvent(
				$author$project$ItemShop$EventVeryDesiredItemType($elm$core$Maybe$Nothing)),
			'Spread Good Rumour',
			'Sets a random Item Type to high value.\n\nSpreads a rumour that a given Item Type was the talk of the next town over.',
			$author$project$ItemShop$setPrice(45));
		var button_battle = A3(
			$author$project$Interface$primary_button,
			_List_Nil,
			$author$project$ItemShop$ChangeTabType($author$project$ItemShop$BattleTabType),
			'To Battle!');
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(10),
					A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$author$project$ItemShop$font_scaled(2),
							$author$project$ItemShop$border_bottom(2)
						]),
					$mdgriffith$elm_ui$Element$text('Special Actions')),
					A2(
					$mdgriffith$elm_ui$Element$wrappedRow,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							A2($mdgriffith$elm_ui$Element$spacingXY, 10, 10)
						]),
					_List_fromArray(
						[button_toggle_ai_pause, button_battle, button_increase_income, button_search, button_unlock_item, button_high_desire, button_low_desire]))
				]));
	});
var $author$project$ItemShop$EndTrendsHover = {$: 'EndTrendsHover'};
var $author$project$ItemShop$StartTrendsHover = {$: 'StartTrendsHover'};
var $mdgriffith$elm_ui$Internal$Model$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Element$below = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$Below, element);
};
var $author$project$ItemShop$item_type_to_pretty_string_plural = function (item_type) {
	switch (item_type.$) {
		case 'Weapon':
			return 'Weapons';
		case 'Armor':
			return 'Armors';
		case 'Spellbook':
			return 'Spellbooks';
		case 'Furniture':
			return 'Furniture';
		default:
			return 'Food';
	}
};
var $avh4$elm_color$Color$lightGrey = A4($avh4$elm_color$Color$RgbaSpace, 238 / 255, 238 / 255, 236 / 255, 1.0);
var $author$project$ItemShop$trade_party_to_str = F2(
	function (all_characters, party) {
		switch (party.$) {
			case 'ShopParty':
				return 'Shop';
			case 'PlayerParty':
				return 'Player';
			default:
				var char_id = party.a;
				var _v1 = $elm$core$List$head(
					A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.char_id;
							},
							$elm$core$Basics$eq(char_id)),
						all_characters));
				if (_v1.$ === 'Just') {
					var character = _v1.a;
					return character.name;
				} else {
					return 'Unnamed Character';
				}
		}
	});
var $author$project$ItemShop$render_single_trade_log_entry = F4(
	function (colorTheme, item_db, all_characters, trade_log) {
		var _v0 = trade_log;
		var from_party = _v0.from_party;
		var to_party = _v0.to_party;
		var item_id = _v0.item_id;
		var quantity = _v0.quantity;
		var gold_cost = _v0.gold_cost;
		var rendered_cost = A2($author$project$Interface$render_gp, colorTheme, gold_cost);
		var maybe_item = A2($author$project$ItemShop$lookup_item_id, item_db, item_id);
		var item_name = function () {
			if (maybe_item.$ === 'Just') {
				var db_record = maybe_item.a;
				return db_record.item.name;
			} else {
				return 'Unknown item';
			}
		}();
		var qty_str = 'x' + $elm$core$String$fromInt(
			$author$project$ItemShop$getQuantity(quantity));
		var _v1 = _Utils_Tuple2(from_party, to_party);
		_v1$2:
		while (true) {
			_v1$4:
			while (true) {
				switch (_v1.a.$) {
					case 'PlayerParty':
						if (_v1.b.$ === 'ShopParty') {
							var _v4 = _v1.a;
							var _v5 = _v1.b;
							return A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_Nil,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text(item_name + (' (' + (qty_str + (') ' + 'was sold for ')))),
										rendered_cost
									]));
						} else {
							break _v1$4;
						}
					case 'ShopParty':
						switch (_v1.b.$) {
							case 'PlayerParty':
								var _v2 = _v1.a;
								var _v3 = _v1.b;
								return A2(
									$mdgriffith$elm_ui$Element$paragraph,
									_List_Nil,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text(item_name + (' (' + (qty_str + (') ' + 'was purchased for ')))),
											rendered_cost
										]));
							case 'ShopParty':
								break _v1$2;
							default:
								break _v1$2;
						}
					default:
						if (_v1.b.$ === 'ShopParty') {
							var _v7 = _v1.b;
							return A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_Nil,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text(
										'Shop <-- ' + (A2($author$project$ItemShop$trade_party_to_str, all_characters, from_party) + (' ' + (item_name + (' (' + (qty_str + (') ' + '-- value: '))))))),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$color(
												A3($mdgriffith$elm_ui$Element$rgb, 0, 1, 0))
											]),
										rendered_cost)
									]));
						} else {
							break _v1$4;
						}
				}
			}
			return A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						item_name + (' was traded from ' + (A2($author$project$ItemShop$trade_party_to_str, all_characters, from_party) + (' to ' + (A2($author$project$ItemShop$trade_party_to_str, all_characters, to_party) + (' (' + (qty_str + (') ' + 'was traded for ')))))))),
						rendered_cost
					]));
		}
		var _v6 = _v1.a;
		return A2(
			$mdgriffith$elm_ui$Element$paragraph,
			_List_Nil,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(
					'Shop --> ' + (A2($author$project$ItemShop$trade_party_to_str, all_characters, to_party) + (' ' + (item_name + (' (' + (qty_str + (') ' + '-- value: '))))))),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color(
							A3($mdgriffith$elm_ui$Element$rgb, 1, 0, 0))
						]),
					rendered_cost)
				]));
	});
var $mdgriffith$elm_ui$Element$spaceEvenly = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$spacing, $mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly);
var $author$project$ItemShop$trends_display = F6(
	function (colorTheme, shiftIsPressed, item_db, shop_trends, all_characters, is_expanded) {
		var rendered_item_trade_logs = _List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text(
				'There have been ' + ($elm$core$String$fromInt(
					$elm$core$List$length(shop_trends.item_trade_logs)) + (' trades, and ' + ($elm$core$String$fromInt(
					$elm$core$List$length(all_characters)) + ' traders.'))))
			]);
		var render_single_popularity = function (_v2) {
			var type_id = _v2.a;
			var popularity = _v2.b;
			var pretty_type = function () {
				var _v1 = $author$project$ItemShop$id_to_item_type(type_id);
				if (_v1.$ === 'Just') {
					var prettied = _v1.a;
					return $author$project$ItemShop$item_type_to_pretty_string_plural(prettied);
				} else {
					return 'Unknown Type (' + ($elm$core$String$fromInt(type_id) + ')');
				}
			}();
			return A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(pretty_type),
						$mdgriffith$elm_ui$Element$text(': '),
						A2(
						$author$project$Interface$monospace,
						_List_Nil,
						$mdgriffith$elm_ui$Element$text(
							function (pct) {
								return pct + '%';
							}(
								A3(
									$elm$core$String$padLeft,
									3,
									_Utils_chr('\u2003'),
									$elm$core$String$fromInt(
										$elm$core$Basics$round(popularity * 100))))))
					]));
		};
		var specific_trends = A2(
			$elm$core$List$map,
			render_single_popularity,
			$elm$core$Dict$toList(shop_trends.item_type_sentiment));
		var has_trades = $elm$core$List$length(shop_trends.item_trade_logs) > 0;
		var has_active_trends = A2(
			$elm$core$List$any,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Tuple$second,
				$elm$core$Basics$neq(1)),
			$elm$core$Dict$toList(shop_trends.item_type_sentiment));
		var summarized = (!has_active_trends) ? $mdgriffith$elm_ui$Element$text('No trends at the moment.') : $mdgriffith$elm_ui$Element$none;
		var rendered_popularity = A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(5),
					A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			A2(
				$elm$core$List$cons,
				summarized,
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$spaceEvenly,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							specific_trends)
						]),
					rendered_item_trade_logs)));
		var expanded_trade_logs = $mdgriffith$elm_ui$Element$below(
			A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$author$project$ItemShop$defaultBackgroundColor(colorTheme),
						$mdgriffith$elm_ui$Element$Border$color(
						A3($mdgriffith$elm_ui$Element$rgb, 0.35, 0.35, 0.35)),
						$mdgriffith$elm_ui$Element$Border$rounded(3),
						$mdgriffith$elm_ui$Element$Border$width(2),
						$mdgriffith$elm_ui$Element$padding(10),
						$mdgriffith$elm_ui$Element$spacing(5),
						$mdgriffith$elm_ui$Element$moveDown(20)
					]),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$color(
									function () {
										if (colorTheme.$ === 'BrightTheme') {
											return $author$project$Interface$color_grey;
										} else {
											return $author$project$Interface$convertColor($avh4$elm_color$Color$lightGrey);
										}
									}()),
									$mdgriffith$elm_ui$Element$Font$size(12),
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$spaceEvenly
								]),
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$text('Latest first'),
									shiftIsPressed ? $mdgriffith$elm_ui$Element$none : $mdgriffith$elm_ui$Element$text('Hold shift for more')
								]))
						]),
					A2(
						$elm$core$List$map,
						A3($author$project$ItemShop$render_single_trade_log_entry, colorTheme, item_db, all_characters),
						A2(
							$elm$core$List$take,
							shiftIsPressed ? 50 : 5,
							$elm$core$List$reverse(shop_trends.item_trade_logs))))));
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_Utils_ap(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_Utils_ap(
					has_trades ? _List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Events$onMouseEnter($author$project$ItemShop$StartTrendsHover),
							$mdgriffith$elm_ui$Element$Events$onMouseLeave($author$project$ItemShop$EndTrendsHover)
						]) : _List_Nil,
					is_expanded ? _List_fromArray(
						[expanded_trade_logs]) : _List_Nil)),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$author$project$ItemShop$font_scaled(2),
							$author$project$ItemShop$border_bottom(2)
						]),
					$mdgriffith$elm_ui$Element$text('Shop Trends')),
					rendered_popularity
				]));
	});
var $author$project$ItemShop$view_shop_tab_type = function (model) {
	var welcome_header = A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$author$project$ItemShop$font_scaled(3),
				$author$project$ItemShop$padding_bottom(10)
			]),
		$mdgriffith$elm_ui$Element$text('Welcome to the Item Shop!'));
	var unpaused_border_attrs = _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Border$color(
			$author$project$ItemShop$defaultSolidColor(model.colorTheme)),
			$mdgriffith$elm_ui$Element$Border$width(10),
			$mdgriffith$elm_ui$Element$Border$dashed
		]);
	var paused_border_attrs = _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Border$color(
			function () {
				var _v4 = model.colorTheme;
				if (_v4.$ === 'BrightTheme') {
					return $author$project$Interface$color_light_grey;
				} else {
					return $author$project$Interface$color_grey;
				}
			}()),
			$mdgriffith$elm_ui$Element$Border$width(10),
			$mdgriffith$elm_ui$Element$Border$dashed
		]);
	var maybe_shop = $author$project$ItemShop$getShop(model);
	var maybe_player = $author$project$ItemShop$getPlayer(model);
	var debug_inventories = A2(
		$elm$core$List$map,
		function (character) {
			return A2(
				$mdgriffith$elm_ui$Element$Keyed$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_Utils_Tuple2(
					$TSFoster$elm_uuid$UUID$toString(character.char_id),
					A7(
						$author$project$ItemShop$render_inventory_grid,
						model,
						character.name + '\'s Inventory',
						character,
						model.shop_trends,
						model.hovered_item_in_character,
						$author$project$ItemShop$CharacterItems,
						$elm$core$Basics$always($mdgriffith$elm_ui$Element$none))));
		},
		A2(
			$elm$core$List$sortBy,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.char_id;
				},
				$TSFoster$elm_uuid$UUID$toString),
			A2($author$project$ItemShop$exclude_player_and_shop, model, model.characters)));
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_Utils_ap(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(10)
				]),
			model.ai_updates_paused ? paused_border_attrs : unpaused_border_attrs),
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$author$project$ItemShop$font_scaled(1),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						welcome_header,
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(5),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$link,
								_List_Nil,
								{
									label: A3(
										$author$project$Interface$secondary_button,
										_List_Nil,
										$author$project$ItemShop$ChangeTabType($author$project$ItemShop$ItemsUnlockedTabType),
										'View Items'),
									url: '#items'
								}),
								A3(
								$author$project$Interface$outline_button,
								_List_Nil,
								$author$project$ItemShop$ToggleShowMainChart,
								model.show_main_chart ? 'Hide Charts' : 'Charts'),
								A3(
								$author$project$Interface$outline_button,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$alignRight]),
								$author$project$ItemShop$ToggleColorTheme,
								function () {
									var _v0 = model.colorTheme;
									if (_v0.$ === 'BrightTheme') {
										return 'Darken';
									} else {
										return 'Brighten';
									}
								}())
							])),
						model.show_main_chart ? A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						A2($author$project$ItemShop$charts_display, model.historical_shop_trends, model.hovered_trend_chart)) : $mdgriffith$elm_ui$Element$none,
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$height(
								$mdgriffith$elm_ui$Element$px(10))
							]),
						_List_Nil),
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								A2($mdgriffith$elm_ui$Element$spacingXY, 10, 0)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width(
										$mdgriffith$elm_ui$Element$fillPortion(3)),
										$mdgriffith$elm_ui$Element$alignTop
									]),
								A3($mdgriffith$elm_ui$Element$Lazy$lazy2, $author$project$ItemShop$player_action_log_display, model.item_db, model.historical_player_actions)),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width(
										$mdgriffith$elm_ui$Element$fillPortion(7)),
										$mdgriffith$elm_ui$Element$alignTop
									]),
								A3($mdgriffith$elm_ui$Element$Lazy$lazy2, $author$project$ItemShop$player_upgrades_display, model.colorTheme, model.player_upgrades))
							])),
						function () {
						if (maybe_player.$ === 'Just') {
							var player = maybe_player.a;
							return A5($author$project$ItemShop$special_actions_display, model.colorTheme, model.player_upgrades, model.hovered_tooltip, player, model.ai_updates_paused);
						} else {
							return $mdgriffith$elm_ui$Element$none;
						}
					}(),
						A6($author$project$ItemShop$trends_display, model.colorTheme, model.shiftIsPressed, model.item_db, model.shop_trends, model.characters, model.shop_trends_hovered),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 0),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						function () {
							if (maybe_shop.$ === 'Just') {
								var shop = maybe_shop.a;
								return A7(
									$author$project$ItemShop$render_inventory_grid,
									model,
									'Items For Sale',
									shop,
									model.shop_trends,
									model.hovered_item_in_character,
									$author$project$ItemShop$ShopItems,
									A2($author$project$ItemShop$shopInventoryControls, maybe_player, model.shop_trends));
							} else {
								return A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$color(
											A3($mdgriffith$elm_ui$Element$rgb, 1, 0, 0)),
											$author$project$ItemShop$font_scaled(5)
										]),
									$mdgriffith$elm_ui$Element$text('ERR: Can\'t find shop'));
							}
						}()),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						function () {
							if (maybe_player.$ === 'Just') {
								var player = maybe_player.a;
								return A7(
									$author$project$ItemShop$render_inventory_grid,
									model,
									'Items In Inventory',
									player,
									model.shop_trends,
									model.hovered_item_in_character,
									$author$project$ItemShop$InventoryItems,
									A2(
										$author$project$ItemShop$playerInventoryControls,
										player,
										_Utils_Tuple2(model.shiftIsPressed, model.shop_trends)));
							} else {
								return $mdgriffith$elm_ui$Element$text('Can\'t find player');
							}
						}())
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						A2(
							$elm$core$List$cons,
							A2($author$project$ItemShop$showHideDebugInventoriesButton, _List_Nil, model.show_debug_inventories),
							model.show_debug_inventories ? debug_inventories : _List_Nil))
					]))));
};
var $author$project$ItemShop$view = function (model) {
	return A3(
		$mdgriffith$elm_ui$Element$layoutWith,
		{
			options: _List_fromArray(
				[
					$mdgriffith$elm_ui$Element$noStaticStyleSheet,
					$mdgriffith$elm_ui$Element$focusStyle(
					{backgroundColor: $elm$core$Maybe$Nothing, borderColor: $elm$core$Maybe$Nothing, shadow: $elm$core$Maybe$Nothing})
				])
		},
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$htmlAttribute(
				$elm$html$Html$Attributes$id('itemshop')),
				$mdgriffith$elm_ui$Element$inFront(
				$author$project$ItemShop$viewOverlay(model)),
				$mdgriffith$elm_ui$Element$htmlAttribute(
				A2(
					$elm$html$Html$Events$on,
					'wheel',
					$elm$json$Json$Decode$succeed($author$project$ItemShop$ScrollViewport))),
				$mdgriffith$elm_ui$Element$htmlAttribute(
				A2(
					$elm$html$Html$Events$on,
					'scroll',
					$elm$json$Json$Decode$succeed($author$project$ItemShop$ScrollViewport))),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(20),
				$author$project$ItemShop$defaultBackgroundColor(model.colorTheme),
				$author$project$ItemShop$defaultFontColor(model.colorTheme)
			]),
		function () {
			var _v0 = model.tab_type;
			switch (_v0.$) {
				case 'ShopTabType':
					return A2($mdgriffith$elm_ui$Element$Lazy$lazy, $author$project$ItemShop$view_shop_tab_type, model);
				case 'ItemsUnlockedTabType':
					return A3($mdgriffith$elm_ui$Element$Lazy$lazy2, $author$project$ItemShop$view_items_unlocked_tab_type, model.colorTheme, model.item_db);
				default:
					return A2(
						$mdgriffith$elm_ui$Element$map,
						$author$project$ItemShop$GotBattleMsg,
						A2(
							$elm$core$Maybe$withDefault,
							A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$color($author$project$Interface$color_danger)
									]),
								$mdgriffith$elm_ui$Element$text('ERR: NO PLAYER')),
							A2(
								$elm$core$Maybe$map,
								function (player) {
									return A2($mdgriffith$elm_ui$Element$Lazy$lazy, $author$project$Battle$view, model.battleModel);
								},
								$author$project$ItemShop$getPlayer(model))));
			}
		}());
};
var $author$project$Main$homeView = function (model) {
	var tab_content = function () {
		var _v0 = model.current_tab;
		return A2(
			$elm$html$Html$map,
			$author$project$Main$GotItemShopMsg,
			A2($elm$html$Html$Lazy$lazy, $author$project$ItemShop$view, model.item_shop_model));
	}();
	var elm_ui_hack_layout = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '0')
			]),
		_List_fromArray(
			[
				A3(
				$mdgriffith$elm_ui$Element$layoutWith,
				{
					options: _List_fromArray(
						[
							$mdgriffith$elm_ui$Element$focusStyle(
							{backgroundColor: $elm$core$Maybe$Nothing, borderColor: $elm$core$Maybe$Nothing, shadow: $elm$core$Maybe$Nothing})
						])
				},
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$htmlAttribute(
						$elm$html$Html$Attributes$id('hack'))
					]),
				$mdgriffith$elm_ui$Element$none)
			]));
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[elm_ui_hack_layout, tab_content]));
};
var $author$project$Main$tab_type_to_str = function (tab_type) {
	return 'Item Shop';
};
var $author$project$Main$view = function (model) {
	return {
		body: _List_fromArray(
			[
				function () {
				var _v0 = model.page_info.page;
				switch (_v0.$) {
					case 'NotFoundPage':
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Not found page')
								]));
					case 'HomePage':
						return $author$project$Main$homeView(model);
					default:
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('UNSET PAGE')
								]));
				}
			}()
			]),
		title: $author$project$Main$tab_type_to_str(model.current_tab) + ' | Elm Fooling'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));