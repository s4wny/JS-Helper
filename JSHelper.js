//-------------------------------------------------------------------------
// Global vars
//-------------------------------------------------------------------------

//Regexp
regexp = {};
regexp.url = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; //Thx to http://stackoverflow.com/a/2166104/996028




//-------------------------------------------------------------------------
// Log - Log things to console
//
// Shorthands for console.log, console.warn, console.error. Also dosen't
// crash IE. (Is this good or bad? hmm)
//
// @example log(somobject) -> prints to the console (as console.log)
// @example log(something, 1) = console.warn(something)
// @example log(something, 2) = console.error(something)
// @example log(something, "warn") = console.warn(something)
//
// @author Sony? aka Sawny @4morefun.net
//     also thx to Mister Lucky @ http://stackoverflow.com/a/690300/996028
//-------------------------------------------------------------------------


// @level = 0 (default)
function log(msg, level)
{
    level = level || 0; //If level issn't set, use 0 as default.
	
    if('console' in self)
	{
	    switch(level)
		{
		    case 1:
			case "warn":
			    console.warn(msg);
			break;
			
		    case 2:
			case "error":
			    console.error(msg);
			break;
			
			default:
			    console.log(msg);
			break;
		}
	}
	else {
	    //IE, die silent
	}
    
}




//-------------------------------------------------------------------------
// Cookie functions
//
// Set, read and delete cookies.
//
// For more deep information see @link http://www.quirksmode.org/js/cookies.html
//
// @example createCookie("chocolateCookie", "mm tasy cookiiieee", "7"); ->
//    Create a cookie named "chocolateCookie" with the value "mm tasy cookiiieee" that expires after 7 days
// @example @link http://www.quirksmode.org/js/cookies.html
//
// @author http://www.quirksmode.org/js/cookies.html
//-------------------------------------------------------------------------

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function deleteCookie(name) { eraseCookie(name); }




//-------------------------------------------------------------------------
// Extract url
//
// Returns all URLs in a string.
//
// @example extractUrl("some text http://link.com yeah") ->
//    ["http://link.com"]
// @example "other text http://link.com yeah ftp://whoo.org".extractUrl; ->
//    ["http://link.com", "ftp://whoo.org"]
//-------------------------------------------------------------------------

function extractUrl(str)
{
    return str.match(regexp.url);
}

String.prototype.extractUrl = function() {
    extractUrl(this);
}





//-------------------------------------------------------------------------
// IsX
//
// Self explaning. 
// Note that most functions here are just shorthands for typeof x == y.
// 
// @Functions:         isSet, isInt, isBool, isFunc, isString, isNull, isArr, isObject
// @TODO (functions):  isFloat, isHex, isBin
//
// @example is_int(17)   -> true
// @example is_int(17.2) -> false
// @example is_int("12") -> false
//-------------------------------------------------------------------------

//@author Matert
function isInt(i) {
    return (typeof i == "undefined") ? false : typeof i == "number";
}

//@author Sony? aka Sawny
function isBool(x) {
    return (typeof x == "undefined") ? false : typeof x == "boolean";
}

//@author Sony? aka Sawny
function isFunc(x) {
    return (typeof x == "undefined") ? false : typeof x == "function";
}

//@author Sony? aka Sawny
function isString(x) {
    return (typeof x == "undefined") ? false : typeof x == "string";
}

//@author Sony? aka Sawny
function isNull(x) {
    return (typeof x == "undefined") ? false : x == null;
}

function isObject (x) {
    return x != null && typeof x === 'object';
}


//@TODO: secound parm. Level/dimension. Is it a 3D array? I.e. isArr([[[1], [2], [3]], [['a'], ['b'], ['c']]], 3) => true
//@author Sony? aka Sawny
function isArr(x) {
    return (typeof x == "undefined") ? false : typeof x == "array";
}

//@author Sony? aka Sawny
function isSet(x) {
    return typeof x != "undefined";
}
function isset(x) { return isSet(x); } //PHP style





//-------------------------------------------------------------------------
// Linkify
//
// Take a string and replace links with HTML links.
// Rules can be used to also replace "twitter links" like @replay and #tagSearch
// 
// @TODO: More rules, rename "rules" to something better. Target blank optional.
//
// @example "Hey! Check out my website 4morefun.net".linkify(); ->
//    "Hey! Check out my website <a href="4morefun.net" target="_blank">4morefun.net</a>"
// @example "@S4wny you can download #oximalkvantilisatorn from ftp://example.org/".linkify("twitter"); ->
//    "<a href="http://twitter.com/S4wny" target="_blank">@S4wny</a> you can download
//     <a href="http://twitter.com/search/oximalkvantilisatorn" target="_blank">#oximalkvantilisatorn</a>
//     from <a href="ftp://example.org/" target="_blank">ftp://example.org/</a>"
// @example "@S4wny you can download #oximalkvantilisatorn from ftp://example.org/".linkify(); ->
//    "@S4wnyyou can download #oximalkvantilisatorn from
//     <a href="ftp://example.org/" target="_blank">ftp://example.org/</a>"
//-------------------------------------------------------------------------

//Thx to Travis@http://stackoverflow.com/a/2166104/996028
// ...and to Roshambo@http://stackoverflow.com/a/7123542/996028
String.prototype.linkify = function(specialRule)
{
    //TODO: isset specialRule
	
    text = this;
	
    //URLs starting with http://, https://, or ftp://
    text = text.replace(regexp.url,
                            '<a href="$1" target="_blank">$1</a>');
    
    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    text = text.replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim,
                        '$1<a href="http://$2" target="_blank">$2</a>');
    
    //Change email addresses to mailto:: links
    text = text.replace(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim,
                        '<a href="mailto:$1">$1</a>');
    
	
	
    //Special rules, like twitter
    //--------------------------------
    
	if(specialRule == "twitter")
	{
	    //@replays
        text = text.replace(/@([^ "\t\n\r<:]*)/gi,
		                    '<a class="replay" href="http://www.twitter.com/$1" target="_blank" >@$1</a>');
 	 
    	//Tags
	    text = text.replace(/#([^ "\t\n\r<\]\[]*)/gi,
		                    '<a class="tag" href="http://www.twitter.com/search/$1" target="_blank" >#$1</a>');
	}
    
    
    return text;
};





//-------------------------------------------------------------------------
// Random
//
// Return a random number, between min, max.
//
// @example random() -> (a int without decimals between 0 - 32767)
// @example random(10) -> (a int without decimals between 0 - 10)
// @example random(4, 10) -> (a int without decimals between 4 - 10)
// @example random(4, 10, true) -> (a int with decimals between 4 - 10)
//-------------------------------------------------------------------------

//@author http://stackoverflow.com/a/1527820/996028
// moded by Sony?
function random(max, min, decimals) { //TODO: parms. (max), (min, max)
    max      = (isInt(max))       ? max      : 32767;
    min      = (isInt(min))       ? min      : 0;
    decimals = (isBool(decimals)) ? decimals : false;
    
	//IF max and min isset, then it's more logic with "random(min TO max)"
	//but we still wants to allow "random(max TO min)".
	if(min > max) { //Min is bigger then max, then it should be max.
	    max = max ^ min; 
	    min = min ^ max; //Swap values with XOR swap. Just cuz it's cool.
        max = max ^ min;		
	}
	
    if(decimals) {
        return Math.random() * (max - min) + min;
    }
    else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}



//-------------------------------------------------------------------------
// Key codes
//
// Object over keycodes and their key.
//
// @example key[65] -> 'a' 
// @example key['a'] -> 65
// @example $(document).bind('keypress', function(event) {
//                  if(event.which == key['a']) {
//                      //Do something cool!
//                  }
//              });
//          });
//
// Keycodes from http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
//-------------------------------------------------------------------------

key = {};

key = {8   : "backspace",
       9   : "tab",
       13  : "enter",
       16  : "shift",
       17  : "ctrl",
       18  : "alt",
       19  : "pause/break",
       20  : "caps lock",
       27  : "escape",
       33  : "page up",
       34  : "page down",
       35  : "end",
       36  : "home",
       37  : "left",
       38  : "up",
       39  : "right",
       40  : "down",
       45  : "insert",
       46  : "delete",
       48  : "0",
       49  : "1",
       50  : "2",
       51  : "3",
       52  : "4",
       53  : "5",
       54  : "6",
       55  : "7",
       56  : "8",
       57  : "9",
       65  : "a",
       66  : "b",
       67  : "c",
       68  : "d",
       69  : "e",
       70  : "f",
       71  : "g",
       72  : "h",
       73  : "i",
       74  : "j",
       75  : "k",
       76  : "l",
       77  : "m",
       78  : "n",
       79  : "o",
       80  : "p",
       81  : "q",
       82  : "r",
       83  : "s",
       84  : "t",
       85  : "u",
       86  : "v",
       87  : "w",
       88  : "x",
       89  : "y",
       90  : "z",
       91  : "left window key",
       92  : "right window key",
       93  : "select key",
       96  : "num0",
       97  : "num1",
       98  : "num2",
       99  : "num3",
       100 : "num4",
       101 : "num5",
       102 : "num6",
       103 : "num7",
       104 : "num8",
       105 : "num9",
       106 : "multiply",
       107 : "add",
       109 : "subtract",
       110 : "decimal point",
       111 : "divide",
       112 : "f1",
       113 : "f2",
       114 : "f3",
       115 : "f4",
       116 : "f5",
       117 : "f6",
       118 : "f7",
       119 : "f8",
       120 : "f9",
       121 : "f10",
       122 : "f11",
       123 : "f12",
       144 : "num lock",
       145 : "scroll lock",
       186 : "semi-colon",
       187 : "equal sign",
       188 : "comma",
       189 : "dash",
       190 : "period",
       191 : "forward slash",
       192 : "grave accent",
       219 : "open bracket",
       220 : "back slash",
       221 : "close braket",
       222 : "single quote",


       "backspace"      :   8,
       "tab"            :   9,
       "enter"          :   13,
       "shift"          :   16,
       "ctrl"           :   17,
       "alt"            :   18,
       "pause/break"    :   19,
       "caps lock"      :   20,
       "escape"         :   27,
       "page up"        :   33,
       "page down"      :   34,
       "end"            :   35,
       "home"           :   36,
       "left"           :   37,
       "up"             :   38,
       "right"          :   39,
       "down"           :   40,
       "insert"         :   45,
       "delete"         :   46,
       "0"              :   48,
       "1"              :   49,
       "2"              :   50,
       "3"              :   51,
       "4"              :   52,
       "5"              :   53,
       "6"              :   54,
       "7"              :   55,
       "8"              :   56,
       "9"              :   57,
       "a"              :   65,
       "b"              :   66,
       "c"              :   67,
       "d"              :   68,
       "e"              :   69,
       "f"              :   70,
       "g"              :   71,
       "h"              :   72,
       "i"              :   73,
       "j"              :   74,
       "k"              :   75,
       "l"              :   76,
       "m"              :   77,
       "n"              :   78,
       "o"              :   79,
       "p"              :   80,
       "q"              :   81,
       "r"              :   82,
       "s"              :   83,
       "t"              :   84,
       "u"              :   85,
       "v"              :   86,
       "w"              :   87,
       "x"              :   88,
       "y"              :   89,
       "z"              :   90,
       "left window key"  :   91,
       "right window key" :   92,
       "select key"     :   93,
       "num0"           :   96,
       "num1"           :   97,
       "num2"           :   98,
       "num3"           :   99,
       "num4"           :   100,
       "num5"           :   101,
       "num6"           :   102,
       "num7"           :   103,
       "num8"           :   104,
       "num9"           :   105,
       "multiply"       :   106,
       "add"            :   107,
       "subtract"       :   109,
       "decimal point"  :   110,
       "divide"         :   111,
       "f1"             :   112,
       "f2"             :   113,
       "f3"             :   114,
       "f4"             :   115,
       "f5"             :   116,
       "f6"             :   117,
       "f7"             :   118,
       "f8"             :   119,
       "f9"             :   120,
       "f10"            :   121,
       "f11"            :   122,
       "f12"            :   123,
       "num lock"       :   144,
       "scroll lock"    :   145,
       "semi-colon"     :   186,
       "equal sign"     :   187,
       "comma"          :   188,
       "dash"           :   189,
       "period"         :   190,
       "forward slash"  :   191,
       "grave accent"   :   192,
       "open bracket"   :   219,
       "back slash"     :   220,
       "close braket"   :   221,
       "single quote"   :   222};
