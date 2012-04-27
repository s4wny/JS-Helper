//-------------------------------------------------------------------------
// Global vars
//-------------------------------------------------------------------------

//Regexp
regexp = {};
regexp.url = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; //Thx to http://stackoverflow.com/a/2166104/996028


//-------------------------------------------------------------------------
// Extract url
//
// Returns all URLs in a string.
//
//-------------------------------------------------------------------------

function extractUrl(str)
{
    return str.match(regexp.url);
}



//-------------------------------------------------------------------------
// IsX
//
// Self explaning. 
// Note that most functions here are just shorthands for typeof x == y.
// 
// @Functions:         isSet, isInt, isBool, isFunc, isString, isNull, isArr
// @TODO (functions):  isObject, isFloat, isHex, isBin
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
    	                    '<a href="http://www.twitter.com/$1" target="_blank" >@$1</a>');
     
    	//#hash tags
        text = text.replace(/#([^ "\t\n\r<\]\[]*)/gi,
    	                    '<a href="http://www.twitter.com/search/$1" target="_blank" >#$1</a>');
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
function random(max, min, decimals) { //TODO: parms. (max), (min, max)
    max      = (isInt(max))       ? max      : 32767;
    min      = (isInt(min))       ? min      : 0;
    decimals = (isBool(decimals)) ? decimals : false;
    
    if(decimals) {
        return Math.random() * (max - min) + min
    }
    else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}