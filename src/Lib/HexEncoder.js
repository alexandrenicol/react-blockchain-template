/* jshint esversion:6 */
/* global module, require */

// HexEncoder.js
//
// Author: Jordan Murkin
// Created: 21 October 2017

export class HexEncoder {
    static toHex(s) {
        // utf8 to latin1
        var s = unescape(encodeURIComponent(s))
        var h = ''
        for (var i = 0; i < s.length; i++) {
            h += s.charCodeAt(i).toString(16)
        }
        return h
    }

    static fromHex(h) {
        var i = 0;
        
        if (h.substr(i, 2) == "0x") {
            i = 2;
        }
        
        var s = ''
        for (i; i < h.length; i+=2) {
            let c = parseInt(h.substr(i, 2), 16);
            if (c == 0) { continue; }
            s += String.fromCharCode(c)
        }
        
        return decodeURIComponent(encodeURIComponent(s))
    }
}
