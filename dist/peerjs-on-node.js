// Building this library as usual will not result in this file! This file is copied and patched from the original build file.
const wrtc = require('wrtc');
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCIceCandidate = wrtc.RTCIceCandidate;
RTCSessionDescription = wrtc.RTCSessionDescription;

fetch = require('node-fetch');
WebSocket = require('ws');
FileReader = require('./file_reader');
var {
	File
} = require("@web-std/file");
Blob = require('node-blob');
const blobToArraybuffer = require('blob-to-arraybuffer');
Blob.prototype.arrayBuffer = function() {
	return blobToArraybuffer(this);
}
parcelRequire = function(e, r, t, n) {
	var i, o = "function" == typeof parcelRequire && parcelRequire,
		u = "function" == typeof require && require;

	function f(t, n) {
		if (!r[t]) {
			if (!e[t]) {
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i) return i(t, !0);
				if (o) return o(t, !0);
				if (u && "string" == typeof t) return u(t);
				var c = new Error("Cannot find module '" + t + "'");
				throw c.code = "MODULE_NOT_FOUND", c
			}
			p.resolve = function(r) {
				return e[t][1][r] || r
			}, p.cache = {};
			var l = r[t] = new f.Module(t);
			e[t][0].call(l.exports, p, l, l.exports, this)
		}
		return r[t].exports;

		function p(e) {
			return f(p.resolve(e))
		}
	}
	f.isParcelRequire = !0, f.Module = function(e) {
		this.id = e, this.bundle = f, this.exports = {}
	}, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
		e[r] = [function(e, r) {
			r.exports = t
		}, {}]
	};
	for (var c = 0; c < t.length; c++) try {
		f(t[c])
	} catch (e) {
		i || (i = e)
	}
	if (t.length) {
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
			return l
		}) : n && (this[n] = l)
	}
	if (parcelRequire = f, i) throw i;
	return f
}({
	"EgBh": [function(require, module, exports) {
		var e = {};
		e.useBlobBuilder = function() {
			try {
				return new Blob([]), !1
			} catch (e) {
				return !0
			}
		}(), e.useArrayBufferView = !e.useBlobBuilder && function() {
			try {
				return 0 === new Blob([new Uint8Array([])]).size
			} catch (e) {
				return !0
			}
		}(), module.exports.binaryFeatures = e;
		var r = module.exports.BlobBuilder;

		function t() {
			this._pieces = [], this._parts = []
		}
		"undefined" != typeof window && (r = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), t.prototype.append = function(e) {
			"number" == typeof e ? this._pieces.push(e) : (this.flush(), this._parts.push(e))
		}, t.prototype.flush = function() {
			if (this._pieces.length > 0) {
				var r = new Uint8Array(this._pieces);
				e.useArrayBufferView || (r = r.buffer), this._parts.push(r), this._pieces = []
			}
		}, t.prototype.getBuffer = function() {
			if (this.flush(), e.useBlobBuilder) {
				for (var t = new r, i = 0, u = this._parts.length; i < u; i++) t.append(this._parts[i]);
				return t.getBlob()
			}
			return new Blob(this._parts)
		}, module.exports.BufferBuilder = t;
	}, {}],
	"kdPp": [function(require, module, exports) {
		var t = require("./bufferbuilder").BufferBuilder,
			e = require("./bufferbuilder").binaryFeatures,
			i = {
				unpack: function(t) {
					return new r(t).unpack()
				},
				pack: function(t) {
					var e = new n;
					return e.pack(t), e.getBuffer()
				}
			};

		function r(t) {
			this.index = 0, this.dataBuffer = t, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength
		}

		function n() {
			this.bufferBuilder = new t
		}

		function u(t) {
			var e = t.charCodeAt(0);
			return e <= 2047 ? "00" : e <= 65535 ? "000" : e <= 2097151 ? "0000" : e <= 67108863 ? "00000" : "000000"
		}

		function a(t) {
			return t.length > 600 ? new Blob([t]).size : t.replace(/[^\u0000-\u007F]/g, u).length
		}
		module.exports = i, r.prototype.unpack = function() {
			var t, e = this.unpack_uint8();
			if (e < 128) return e;
			if ((224 ^ e) < 32) return (224 ^ e) - 32;
			if ((t = 160 ^ e) <= 15) return this.unpack_raw(t);
			if ((t = 176 ^ e) <= 15) return this.unpack_string(t);
			if ((t = 144 ^ e) <= 15) return this.unpack_array(t);
			if ((t = 128 ^ e) <= 15) return this.unpack_map(t);
			switch (e) {
				case 192:
					return null;
				case 193:
					return;
				case 194:
					return !1;
				case 195:
					return !0;
				case 202:
					return this.unpack_float();
				case 203:
					return this.unpack_double();
				case 204:
					return this.unpack_uint8();
				case 205:
					return this.unpack_uint16();
				case 206:
					return this.unpack_uint32();
				case 207:
					return this.unpack_uint64();
				case 208:
					return this.unpack_int8();
				case 209:
					return this.unpack_int16();
				case 210:
					return this.unpack_int32();
				case 211:
					return this.unpack_int64();
				case 212:
				case 213:
				case 214:
				case 215:
					return;
				case 216:
					return t = this.unpack_uint16(), this.unpack_string(t);
				case 217:
					return t = this.unpack_uint32(), this.unpack_string(t);
				case 218:
					return t = this.unpack_uint16(), this.unpack_raw(t);
				case 219:
					return t = this.unpack_uint32(), this.unpack_raw(t);
				case 220:
					return t = this.unpack_uint16(), this.unpack_array(t);
				case 221:
					return t = this.unpack_uint32(), this.unpack_array(t);
				case 222:
					return t = this.unpack_uint16(), this.unpack_map(t);
				case 223:
					return t = this.unpack_uint32(), this.unpack_map(t)
			}
		}, r.prototype.unpack_uint8 = function() {
			var t = 255 & this.dataView[this.index];
			return this.index++, t
		}, r.prototype.unpack_uint16 = function() {
			var t = this.read(2),
				e = 256 * (255 & t[0]) + (255 & t[1]);
			return this.index += 2, e
		}, r.prototype.unpack_uint32 = function() {
			var t = this.read(4),
				e = 256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3];
			return this.index += 4, e
		}, r.prototype.unpack_uint64 = function() {
			var t = this.read(8),
				e = 256 * (256 * (256 * (256 * (256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3]) + t[4]) + t[5]) + t[6]) + t[7];
			return this.index += 8, e
		}, r.prototype.unpack_int8 = function() {
			var t = this.unpack_uint8();
			return t < 128 ? t : t - 256
		}, r.prototype.unpack_int16 = function() {
			var t = this.unpack_uint16();
			return t < 32768 ? t : t - 65536
		}, r.prototype.unpack_int32 = function() {
			var t = this.unpack_uint32();
			return t < Math.pow(2, 31) ? t : t - Math.pow(2, 32)
		}, r.prototype.unpack_int64 = function() {
			var t = this.unpack_uint64();
			return t < Math.pow(2, 63) ? t : t - Math.pow(2, 64)
		}, r.prototype.unpack_raw = function(t) {
			if (this.length < this.index + t) throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + t + " " + this.length);
			var e = this.dataBuffer.slice(this.index, this.index + t);
			return this.index += t, e
		}, r.prototype.unpack_string = function(t) {
			for (var e, i, r = this.read(t), n = 0, u = ""; n < t;)(e = r[n]) < 128 ? (u += String.fromCharCode(e), n++) : (192 ^ e) < 32 ? (i = (192 ^ e) << 6 | 63 & r[n + 1], u += String.fromCharCode(i), n += 2) : (i = (15 & e) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2], u += String.fromCharCode(i), n += 3);
			return this.index += t, u
		}, r.prototype.unpack_array = function(t) {
			for (var e = new Array(t), i = 0; i < t; i++) e[i] = this.unpack();
			return e
		}, r.prototype.unpack_map = function(t) {
			for (var e = {}, i = 0; i < t; i++) {
				var r = this.unpack(),
					n = this.unpack();
				e[r] = n
			}
			return e
		}, r.prototype.unpack_float = function() {
			var t = this.unpack_uint32(),
				e = (t >> 23 & 255) - 127;
			return (0 === t >> 31 ? 1 : -1) * (8388607 & t | 8388608) * Math.pow(2, e - 23)
		}, r.prototype.unpack_double = function() {
			var t = this.unpack_uint32(),
				e = this.unpack_uint32(),
				i = (t >> 20 & 2047) - 1023;
			return (0 === t >> 31 ? 1 : -1) * ((1048575 & t | 1048576) * Math.pow(2, i - 20) + e * Math.pow(2, i - 52))
		}, r.prototype.read = function(t) {
			var e = this.index;
			if (e + t <= this.length) return this.dataView.subarray(e, e + t);
			throw new Error("BinaryPackFailure: read index out of range")
		}, n.prototype.getBuffer = function() {
			return this.bufferBuilder.getBuffer()
		}, n.prototype.pack = function(t) {
			var i = typeof t;
			if ("string" === i) this.pack_string(t);
			else if ("number" === i) Math.floor(t) === t ? this.pack_integer(t) : this.pack_double(t);
			else if ("boolean" === i) !0 === t ? this.bufferBuilder.append(195) : !1 === t && this.bufferBuilder.append(194);
			else if ("undefined" === i) this.bufferBuilder.append(192);
			else {
				if ("object" !== i) throw new Error('Type "' + i + '" not yet supported');
				if (null === t) this.bufferBuilder.append(192);
				else {
					var r = t.constructor;
					if (r == Array) this.pack_array(t);
					else if (r == Blob || r == File || t instanceof Blob || t instanceof File) this.pack_bin(t);
					else if (r == ArrayBuffer) e.useArrayBufferView ? this.pack_bin(new Uint8Array(t)) : this.pack_bin(t);
					else if ("BYTES_PER_ELEMENT" in t) e.useArrayBufferView ? this.pack_bin(new Uint8Array(t.buffer)) : this.pack_bin(t.buffer);
					else if (r == Object || r.toString().startsWith("class")) this.pack_object(t);
					else if (r == Date) this.pack_string(t.toString());
					else {
						if ("function" != typeof t.toBinaryPack) throw new Error('Type "' + r.toString() + '" not yet supported');
						this.bufferBuilder.append(t.toBinaryPack())
					}
				}
			}
			this.bufferBuilder.flush()
		}, n.prototype.pack_bin = function(t) {
			var e = t.length || t.byteLength || t.size;
			if (e <= 15) this.pack_uint8(160 + e);
			else if (e <= 65535) this.bufferBuilder.append(218), this.pack_uint16(e);
			else {
				if (!(e <= 4294967295)) throw new Error("Invalid length");
				this.bufferBuilder.append(219), this.pack_uint32(e)
			}
			this.bufferBuilder.append(t)
		}, n.prototype.pack_string = function(t) {
			var e = a(t);
			if (e <= 15) this.pack_uint8(176 + e);
			else if (e <= 65535) this.bufferBuilder.append(216), this.pack_uint16(e);
			else {
				if (!(e <= 4294967295)) throw new Error("Invalid length");
				this.bufferBuilder.append(217), this.pack_uint32(e)
			}
			this.bufferBuilder.append(t)
		}, n.prototype.pack_array = function(t) {
			var e = t.length;
			if (e <= 15) this.pack_uint8(144 + e);
			else if (e <= 65535) this.bufferBuilder.append(220), this.pack_uint16(e);
			else {
				if (!(e <= 4294967295)) throw new Error("Invalid length");
				this.bufferBuilder.append(221), this.pack_uint32(e)
			}
			for (var i = 0; i < e; i++) this.pack(t[i])
		}, n.prototype.pack_integer = function(t) {
			if (t >= -32 && t <= 127) this.bufferBuilder.append(255 & t);
			else if (t >= 0 && t <= 255) this.bufferBuilder.append(204), this.pack_uint8(t);
			else if (t >= -128 && t <= 127) this.bufferBuilder.append(208), this.pack_int8(t);
			else if (t >= 0 && t <= 65535) this.bufferBuilder.append(205), this.pack_uint16(t);
			else if (t >= -32768 && t <= 32767) this.bufferBuilder.append(209), this.pack_int16(t);
			else if (t >= 0 && t <= 4294967295) this.bufferBuilder.append(206), this.pack_uint32(t);
			else if (t >= -2147483648 && t <= 2147483647) this.bufferBuilder.append(210), this.pack_int32(t);
			else if (t >= -0x8000000000000000 && t <= 0x8000000000000000) this.bufferBuilder.append(211), this.pack_int64(t);
			else {
				if (!(t >= 0 && t <= 0x10000000000000000)) throw new Error("Invalid integer");
				this.bufferBuilder.append(207), this.pack_uint64(t)
			}
		}, n.prototype.pack_double = function(t) {
			var e = 0;
			t < 0 && (e = 1, t = -t);
			var i = Math.floor(Math.log(t) / Math.LN2),
				r = t / Math.pow(2, i) - 1,
				n = Math.floor(r * Math.pow(2, 52)),
				u = Math.pow(2, 32),
				a = e << 31 | i + 1023 << 20 | n / u & 1048575,
				p = n % u;
			this.bufferBuilder.append(203), this.pack_int32(a), this.pack_int32(p)
		}, n.prototype.pack_object = function(t) {
			var e = Object.keys(t).length;
			if (e <= 15) this.pack_uint8(128 + e);
			else if (e <= 65535) this.bufferBuilder.append(222), this.pack_uint16(e);
			else {
				if (!(e <= 4294967295)) throw new Error("Invalid length");
				this.bufferBuilder.append(223), this.pack_uint32(e)
			}
			for (var i in t) t.hasOwnProperty(i) && (this.pack(i), this.pack(t[i]))
		}, n.prototype.pack_uint8 = function(t) {
			this.bufferBuilder.append(t)
		}, n.prototype.pack_uint16 = function(t) {
			this.bufferBuilder.append(t >> 8), this.bufferBuilder.append(255 & t)
		}, n.prototype.pack_uint32 = function(t) {
			var e = 4294967295 & t;
			this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e)
		}, n.prototype.pack_uint64 = function(t) {
			var e = t / Math.pow(2, 32),
				i = t % Math.pow(2, 32);
			this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i)
		}, n.prototype.pack_int8 = function(t) {
			this.bufferBuilder.append(255 & t)
		}, n.prototype.pack_int16 = function(t) {
			this.bufferBuilder.append((65280 & t) >> 8), this.bufferBuilder.append(255 & t)
		}, n.prototype.pack_int32 = function(t) {
			this.bufferBuilder.append(t >>> 24 & 255), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t)
		}, n.prototype.pack_int64 = function(t) {
			var e = Math.floor(t / Math.pow(2, 32)),
				i = t % Math.pow(2, 32);
			this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i)
		};
	}, {
		"./bufferbuilder": "EgBh"
	}],
	"I31f": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Supports = new(function() {
			function e() {
				this.isIOS = !1, this.supportedBrowsers = ["firefox", "chrome", "safari"], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605
			}
			return e.prototype.isWebRTCSupported = function() {
				return "undefined" != typeof RTCPeerConnection
			}, e.prototype.isBrowserSupported = function() {
				var e = this.getBrowser(),
					r = this.getVersion();
				return !!this.supportedBrowsers.includes(e) && ("chrome" === e ? r >= this.minChromeVersion : "firefox" === e ? r >= this.minFirefoxVersion : "safari" === e && (!this.isIOS && r >= this.minSafariVersion))
			}, e.prototype.getBrowser = function() {
				return "chrome"
			}, e.prototype.getVersion = function() {
				return this.minChromeVersion
			}, e.prototype.isUnifiedPlanSupported = function() {
				return !1
			}, e.prototype.toString = function() {
				return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported()
			}, e
		}());
	}, {}],
	"BHXf": [function(require, module, exports) {
		"use strict";
		var r = this && this.__importStar || function(r) {
			if (r && r.__esModule) return r;
			var t = {};
			if (null != r)
				for (var e in r) Object.hasOwnProperty.call(r, e) && (t[e] = r[e]);
			return t.default = r, t
		};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var t = r(require("peerjs-js-binarypack")),
			e = require("./supports"),
			o = {
				iceServers: [{
					urls: "stun:stun.l.google.com:19302"
				}, {
					urls: "turn:0.peerjs.com:3478",
					username: "peerjs",
					credential: "peerjsp"
				}],
				sdpSemantics: "unified-plan"
			};
		exports.util = new(function() {
			function r() {
				this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = {
					Chrome: 1,
					chrome: 1
				}, this.chunkedMTU = 16300, this.defaultConfig = o, this.browser = e.Supports.getBrowser(), this.browserVersion = e.Supports.getVersion(), this.supports = function() {
					var r, t = {
						browser: e.Supports.isBrowserSupported(),
						webRTC: e.Supports.isWebRTCSupported(),
						audioVideo: !1,
						data: !1,
						binaryBlob: !1,
						reliable: !1
					};
					if (!t.webRTC) return t;
					try {
						r = new RTCPeerConnection(o), t.audioVideo = !0;
						var n = void 0;
						try {
							n = r.createDataChannel("_PEERJSTEST", {
								ordered: !0
							}), t.data = !0, t.reliable = !!n.ordered;
							try {
								n.binaryType = "blob", t.binaryBlob = !e.Supports.isIOS
							} catch (a) {}
						} catch (a) {} finally {
							n && n.close()
						}
					} catch (a) {} finally {
						r && r.close()
					}
					return t
				}(), this.pack = t.pack, this.unpack = t.unpack, this._dataCount = 1
			}
			return r.prototype.noop = function() {}, r.prototype.validateId = function(r) {
				return !r || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(r)
			}, r.prototype.chunk = function(r) {
				for (var t = [], e = r.size, o = Math.ceil(e / exports.util.chunkedMTU), n = 0, a = 0; a < e;) {
					var i = Math.min(e, a + exports.util.chunkedMTU),
						s = r.slice(a, i),
						u = {
							__peerData: this._dataCount,
							n: n,
							data: s,
							total: o
						};
					t.push(u), a = i, n++
				}
				return this._dataCount++, t
			}, r.prototype.blobToArrayBuffer = function(r, t) {
				var e = new FileReader;
				return e.onload = function(r) {
					r.target && t(r.target.result)
				}, e.readAsArrayBuffer(r), e
			}, r.prototype.binaryStringToArrayBuffer = function(r) {
				for (var t = new Uint8Array(r.length), e = 0; e < r.length; e++) t[e] = 255 & r.charCodeAt(e);
				return t.buffer
			}, r.prototype.randomToken = function() {
				return Math.random().toString(36).substr(2)
			}, r.prototype.isSecure = function() {
				return "https:" === location.protocol
			}, r
		}());
	}, {
		"peerjs-js-binarypack": "kdPp",
		"./supports": "I31f"
	}],
	"JJlS": [function(require, module, exports) {
		"use strict";
		var e = Object.prototype.hasOwnProperty,
			t = "~";

		function n() {}

		function r(e, t, n) {
			this.fn = e, this.context = t, this.once = n || !1
		}

		function o(e, n, o, s, i) {
			if ("function" != typeof o) throw new TypeError("The listener must be a function");
			var c = new r(o, s || e, i),
				f = t ? t + n : n;
			return e._events[f] ? e._events[f].fn ? e._events[f] = [e._events[f], c] : e._events[f].push(c) : (e._events[f] = c, e._eventsCount++), e
		}

		function s(e, t) {
			0 == --e._eventsCount ? e._events = new n : delete e._events[t]
		}

		function i() {
			this._events = new n, this._eventsCount = 0
		}
		Object.create && (n.prototype = Object.create(null), (new n).__proto__ || (t = !1)), i.prototype.eventNames = function() {
			var n, r, o = [];
			if (0 === this._eventsCount) return o;
			for (r in n = this._events) e.call(n, r) && o.push(t ? r.slice(1) : r);
			return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(n)) : o
		}, i.prototype.listeners = function(e) {
			var n = t ? t + e : e,
				r = this._events[n];
			if (!r) return [];
			if (r.fn) return [r.fn];
			for (var o = 0, s = r.length, i = new Array(s); o < s; o++) i[o] = r[o].fn;
			return i
		}, i.prototype.listenerCount = function(e) {
			var n = t ? t + e : e,
				r = this._events[n];
			return r ? r.fn ? 1 : r.length : 0
		}, i.prototype.emit = function(e, n, r, o, s, i) {
			var c = t ? t + e : e;
			if (!this._events[c]) return !1;
			var f, u, a = this._events[c],
				l = arguments.length;
			if (a.fn) {
				switch (a.once && this.removeListener(e, a.fn, void 0, !0), l) {
					case 1:
						return a.fn.call(a.context), !0;
					case 2:
						return a.fn.call(a.context, n), !0;
					case 3:
						return a.fn.call(a.context, n, r), !0;
					case 4:
						return a.fn.call(a.context, n, r, o), !0;
					case 5:
						return a.fn.call(a.context, n, r, o, s), !0;
					case 6:
						return a.fn.call(a.context, n, r, o, s, i), !0
				}
				for (u = 1, f = new Array(l - 1); u < l; u++) f[u - 1] = arguments[u];
				a.fn.apply(a.context, f)
			} else {
				var v, h = a.length;
				for (u = 0; u < h; u++) switch (a[u].once && this.removeListener(e, a[u].fn, void 0, !0), l) {
					case 1:
						a[u].fn.call(a[u].context);
						break;
					case 2:
						a[u].fn.call(a[u].context, n);
						break;
					case 3:
						a[u].fn.call(a[u].context, n, r);
						break;
					case 4:
						a[u].fn.call(a[u].context, n, r, o);
						break;
					default:
						if (!f)
							for (v = 1, f = new Array(l - 1); v < l; v++) f[v - 1] = arguments[v];
						a[u].fn.apply(a[u].context, f)
				}
			}
			return !0
		}, i.prototype.on = function(e, t, n) {
			return o(this, e, t, n, !1)
		}, i.prototype.once = function(e, t, n) {
			return o(this, e, t, n, !0)
		}, i.prototype.removeListener = function(e, n, r, o) {
			var i = t ? t + e : e;
			if (!this._events[i]) return this;
			if (!n) return s(this, i), this;
			var c = this._events[i];
			if (c.fn) c.fn !== n || o && !c.once || r && c.context !== r || s(this, i);
			else {
				for (var f = 0, u = [], a = c.length; f < a; f++)(c[f].fn !== n || o && !c[f].once || r && c[f].context !== r) && u.push(c[f]);
				u.length ? this._events[i] = 1 === u.length ? u[0] : u : s(this, i)
			}
			return this
		}, i.prototype.removeAllListeners = function(e) {
			var r;
			return e ? (r = t ? t + e : e, this._events[r] && s(this, r)) : (this._events = new n, this._eventsCount = 0), this
		}, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = t, i.EventEmitter = i, "undefined" != typeof module && (module.exports = i);
	}, {}],
	"WOs9": [function(require, module, exports) {
		"use strict";
		var r = this && this.__read || function(r, e) {
				var o = "function" == typeof Symbol && r[Symbol.iterator];
				if (!o) return r;
				var t, n, l = o.call(r),
					i = [];
				try {
					for (;
						(void 0 === e || e-- > 0) && !(t = l.next()).done;) i.push(t.value)
				} catch (s) {
					n = {
						error: s
					}
				} finally {
					try {
						t && !t.done && (o = l.return) && o.call(l)
					} finally {
						if (n) throw n.error
					}
				}
				return i
			},
			e = this && this.__spread || function() {
				for (var e = [], o = 0; o < arguments.length; o++) e = e.concat(r(arguments[o]));
				return e
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var o, t = "PeerJS: ";
		! function(r) {
			r[r.Disabled = 0] = "Disabled", r[r.Errors = 1] = "Errors", r[r.Warnings = 2] = "Warnings", r[r.All = 3] = "All"
		}(o = exports.LogLevel || (exports.LogLevel = {}));
		var n = function() {
			function r() {
				this._logLevel = o.Disabled
			}
			return Object.defineProperty(r.prototype, "logLevel", {
				get: function() {
					return this._logLevel
				},
				set: function(r) {
					this._logLevel = r
				},
				enumerable: !0,
				configurable: !0
			}), r.prototype.log = function() {
				for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
				this._logLevel >= o.All && this._print.apply(this, e([o.All], r))
			}, r.prototype.warn = function() {
				for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
				this._logLevel >= o.Warnings && this._print.apply(this, e([o.Warnings], r))
			}, r.prototype.error = function() {
				for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
				this._logLevel >= o.Errors && this._print.apply(this, e([o.Errors], r))
			}, r.prototype.setLogFunction = function(r) {
				this._print = r
			}, r.prototype._print = function(r) {
				for (var n = [], l = 1; l < arguments.length; l++) n[l - 1] = arguments[l];
				var i = e([t], n);
				for (var s in i) i[s] instanceof Error && (i[s] = "(" + i[s].name + ") " + i[s].message);
				r >= o.All ? console.log.apply(console, e(i)) : r >= o.Warnings ? console.warn.apply(console, e(["WARNING"], i)) : r >= o.Errors && console.error.apply(console, e(["ERROR"], i))
			}, r
		}();
		exports.default = new n;
	}, {}],
	"ZRYf": [function(require, module, exports) {
		"use strict";
		var e, r, n, o, t, a, i;
		Object.defineProperty(exports, "__esModule", {
				value: !0
			}),
			function(e) {
				e.Open = "open", e.Stream = "stream", e.Data = "data", e.Close = "close", e.Error = "error", e.IceStateChanged = "iceStateChanged"
			}(e = exports.ConnectionEventType || (exports.ConnectionEventType = {})),
			function(e) {
				e.Data = "data", e.Media = "media"
			}(r = exports.ConnectionType || (exports.ConnectionType = {})),
			function(e) {
				e.Open = "open", e.Close = "close", e.Connection = "connection", e.Call = "call", e.Disconnected = "disconnected", e.Error = "error"
			}(n = exports.PeerEventType || (exports.PeerEventType = {})),
			function(e) {
				e.BrowserIncompatible = "browser-incompatible", e.Disconnected = "disconnected", e.InvalidID = "invalid-id", e.InvalidKey = "invalid-key", e.Network = "network", e.PeerUnavailable = "peer-unavailable", e.SslUnavailable = "ssl-unavailable", e.ServerError = "server-error", e.SocketError = "socket-error", e.SocketClosed = "socket-closed", e.UnavailableID = "unavailable-id", e.WebRTC = "webrtc"
			}(o = exports.PeerErrorType || (exports.PeerErrorType = {})),
			function(e) {
				e.Binary = "binary", e.BinaryUTF8 = "binary-utf8", e.JSON = "json"
			}(t = exports.SerializationType || (exports.SerializationType = {})),
			function(e) {
				e.Message = "message", e.Disconnected = "disconnected", e.Error = "error", e.Close = "close"
			}(a = exports.SocketEventType || (exports.SocketEventType = {})),
			function(e) {
				e.Heartbeat = "HEARTBEAT", e.Candidate = "CANDIDATE", e.Offer = "OFFER", e.Answer = "ANSWER", e.Open = "OPEN", e.Error = "ERROR", e.IdTaken = "ID-TAKEN", e.InvalidKey = "INVALID-KEY", e.Leave = "LEAVE", e.Expire = "EXPIRE"
			}(i = exports.ServerMessageType || (exports.ServerMessageType = {}));
	}, {}],
	"wJlv": [function(require, module, exports) {
		"use strict";
		var e = this && this.__extends || function() {
				var e = function(t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function(t, n) {
					function s() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (s.prototype = n.prototype, new s)
				}
			}(),
			t = this && this.__read || function(e, t) {
				var n = "function" == typeof Symbol && e[Symbol.iterator];
				if (!n) return e;
				var s, o, r = n.call(e),
					i = [];
				try {
					for (;
						(void 0 === t || t-- > 0) && !(s = r.next()).done;) i.push(s.value)
				} catch (c) {
					o = {
						error: c
					}
				} finally {
					try {
						s && !s.done && (n = r.return) && n.call(r)
					} finally {
						if (o) throw o.error
					}
				}
				return i
			},
			n = this && this.__spread || function() {
				for (var e = [], n = 0; n < arguments.length; n++) e = e.concat(t(arguments[n]));
				return e
			},
			s = this && this.__values || function(e) {
				var t = "function" == typeof Symbol && Symbol.iterator,
					n = t && e[t],
					s = 0;
				if (n) return n.call(e);
				if (e && "number" == typeof e.length) return {
					next: function() {
						return e && s >= e.length && (e = void 0), {
							value: e && e[s++],
							done: !e
						}
					}
				};
				throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
			},
			o = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var r = require("eventemitter3"),
			i = o(require("./logger")),
			c = require("./enums"),
			a = function(t) {
				function o(e, n, s, o, r, i) {
					void 0 === i && (i = 5e3);
					var c = t.call(this) || this;
					c.pingInterval = i, c._disconnected = !0, c._messagesQueue = [];
					var a = e ? "wss://" : "ws://";
					return c._baseUrl = a + n + ":" + s + o + "peerjs?key=" + r, c
				}
				return e(o, t), o.prototype.start = function(e, t) {
					var n = this;
					this._id = e;
					var s = this._baseUrl + "&id=" + e + "&token=" + t;
					!this._socket && this._disconnected && (this._socket = new WebSocket(s), this._disconnected = !1, this._socket.onmessage = function(e) {
						var t;
						try {
							t = JSON.parse(e.data), i.default.log("Server message received:", t)
						} catch (s) {
							return void i.default.log("Invalid server message", e.data)
						}
						n.emit(c.SocketEventType.Message, t)
					}, this._socket.onclose = function(e) {
						n._disconnected || (i.default.log("Socket closed.", e), n._cleanup(), n._disconnected = !0, n.emit(c.SocketEventType.Disconnected))
					}, this._socket.onopen = function() {
						n._disconnected || (n._sendQueuedMessages(), i.default.log("Socket open"), n._scheduleHeartbeat())
					})
				}, o.prototype._scheduleHeartbeat = function() {
					var e = this;
					this._wsPingTimer = setTimeout(function() {
						e._sendHeartbeat()
					}, this.pingInterval)
				}, o.prototype._sendHeartbeat = function() {
					if (this._wsOpen()) {
						var e = JSON.stringify({
							type: c.ServerMessageType.Heartbeat
						});
						this._socket.send(e), this._scheduleHeartbeat()
					} else i.default.log("Cannot send heartbeat, because socket closed")
				}, o.prototype._wsOpen = function() {
					return !!this._socket && 1 === this._socket.readyState
				}, o.prototype._sendQueuedMessages = function() {
					var e, t, o = n(this._messagesQueue);
					this._messagesQueue = [];
					try {
						for (var r = s(o), i = r.next(); !i.done; i = r.next()) {
							var c = i.value;
							this.send(c)
						}
					} catch (a) {
						e = {
							error: a
						}
					} finally {
						try {
							i && !i.done && (t = r.return) && t.call(r)
						} finally {
							if (e) throw e.error
						}
					}
				}, o.prototype.send = function(e) {
					if (!this._disconnected)
						if (this._id)
							if (e.type) {
								if (this._wsOpen()) {
									var t = JSON.stringify(e);
									this._socket.send(t)
								}
							} else this.emit(c.SocketEventType.Error, "Invalid message");
					else this._messagesQueue.push(e)
				}, o.prototype.close = function() {
					this._disconnected || (this._cleanup(), this._disconnected = !0)
				}, o.prototype._cleanup = function() {
					this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer)
				}, o
			}(r.EventEmitter);
		exports.Socket = a;
	}, {
		"eventemitter3": "JJlS",
		"./logger": "WOs9",
		"./enums": "ZRYf"
	}],
	"HCdX": [function(require, module, exports) {
		"use strict";
		var e = this && this.__assign || function() {
				return (e = Object.assign || function(e) {
					for (var n, t = 1, o = arguments.length; t < o; t++)
						for (var i in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
					return e
				}).apply(this, arguments)
			},
			n = this && this.__awaiter || function(e, n, t, o) {
				return new(t || (t = Promise))(function(i, r) {
					function c(e) {
						try {
							s(o.next(e))
						} catch (n) {
							r(n)
						}
					}

					function a(e) {
						try {
							s(o.throw(e))
						} catch (n) {
							r(n)
						}
					}

					function s(e) {
						var n;
						e.done ? i(e.value) : (n = e.value, n instanceof t ? n : new t(function(e) {
							e(n)
						})).then(c, a)
					}
					s((o = o.apply(e, n || [])).next())
				})
			},
			t = this && this.__generator || function(e, n) {
				var t, o, i, r, c = {
					label: 0,
					sent: function() {
						if (1 & i[0]) throw i[1];
						return i[1]
					},
					trys: [],
					ops: []
				};
				return r = {
					next: a(0),
					throw: a(1),
					return: a(2)
				}, "function" == typeof Symbol && (r[Symbol.iterator] = function() {
					return this
				}), r;

				function a(r) {
					return function(a) {
						return function(r) {
							if (t) throw new TypeError("Generator is already executing.");
							for (; c;) try {
								if (t = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
								switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
									case 0:
									case 1:
										i = r;
										break;
									case 4:
										return c.label++, {
											value: r[1],
											done: !1
										};
									case 5:
										c.label++, o = r[1], r = [0];
										continue;
									case 7:
										r = c.ops.pop(), c.trys.pop();
										continue;
									default:
										if (!(i = (i = c.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
											c = 0;
											continue
										}
										if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
											c.label = r[1];
											break
										}
										if (6 === r[0] && c.label < i[1]) {
											c.label = i[1], i = r;
											break
										}
										if (i && c.label < i[2]) {
											c.label = i[2], c.ops.push(r);
											break
										}
										i[2] && c.ops.pop(), c.trys.pop();
										continue
								}
								r = n.call(e, c)
							} catch (a) {
								r = [6, a], o = 0
							} finally {
								t = i = 0
							}
							if (5 & r[0]) throw r[1];
							return {
								value: r[0] ? r[1] : void 0,
								done: !0
							}
						}([r, a])
					}
				}
			},
			o = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var i = require("./util"),
			r = o(require("./logger")),
			c = require("./enums"),
			a = function() {
				function o(e) {
					this.connection = e
				}
				return o.prototype.startConnection = function(e) {
					var n = this._startPeerConnection();
					if (this.connection.peerConnection = n, this.connection.type === c.ConnectionType.Media && e._stream && this._addTracksToConnection(e._stream, n), e.originator) {
						if (this.connection.type === c.ConnectionType.Data) {
							var t = this.connection,
								o = {
									ordered: !!e.reliable
								},
								i = n.createDataChannel(t.label, o);
							t.initialize(i)
						}
						this._makeOffer()
					} else this.handleSDP("OFFER", e.sdp)
				}, o.prototype._startPeerConnection = function() {
					r.default.log("Creating RTCPeerConnection.");
					var e = new RTCPeerConnection(this.connection.provider.options.config);
					return this._setupListeners(e), e
				}, o.prototype._setupListeners = function(e) {
					var n = this,
						t = this.connection.peer,
						o = this.connection.connectionId,
						a = this.connection.type,
						s = this.connection.provider;
					r.default.log("Listening for ICE candidates."), e.onicecandidate = function(e) {
						e.candidate && e.candidate.candidate && (r.default.log("Received ICE candidates for " + t + ":", e.candidate), s.socket.send({
							type: c.ServerMessageType.Candidate,
							payload: {
								candidate: e.candidate,
								type: a,
								connectionId: o
							},
							dst: t
						}))
					}, e.oniceconnectionstatechange = function() {
						switch (e.iceConnectionState) {
							case "failed":
								r.default.log("iceConnectionState is failed, closing connections to " + t), n.connection.emit(c.ConnectionEventType.Error, new Error("Negotiation of connection to " + t + " failed.")), n.connection.close();
								break;
							case "closed":
								r.default.log("iceConnectionState is closed, closing connections to " + t), n.connection.emit(c.ConnectionEventType.Error, new Error("Connection to " + t + " closed.")), n.connection.close();
								break;
							case "disconnected":
								r.default.log("iceConnectionState is disconnected, closing connections to " + t), n.connection.emit(c.ConnectionEventType.Error, new Error("Connection to " + t + " disconnected.")), n.connection.close();
								break;
							case "completed":
								e.onicecandidate = i.util.noop
						}
						n.connection.emit(c.ConnectionEventType.IceStateChanged, e.iceConnectionState)
					}, r.default.log("Listening for data channel"), e.ondatachannel = function(e) {
						r.default.log("Received data channel");
						var n = e.channel;
						s.getConnection(t, o).initialize(n)
					}, r.default.log("Listening for remote stream"), e.ontrack = function(e) {
						r.default.log("Received remote stream");
						var i = e.streams[0],
							a = s.getConnection(t, o);
						if (a.type === c.ConnectionType.Media) {
							var d = a;
							n._addStreamToMediaConnection(i, d)
						}
					}
				}, o.prototype.cleanup = function() {
					r.default.log("Cleaning up PeerConnection to " + this.connection.peer);
					var e = this.connection.peerConnection;
					if (e) {
						this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = function() {};
						var n = "closed" !== e.signalingState,
							t = !1;
						if (this.connection.type === c.ConnectionType.Data) {
							var o = this.connection.dataChannel;
							o && (t = !!o.readyState && "closed" !== o.readyState)
						}(n || t) && e.close()
					}
				}, o.prototype._makeOffer = function() {
					return n(this, void 0, Promise, function() {
						var n, o, a, s, d, l, u;
						return t(this, function(t) {
							switch (t.label) {
								case 0:
									n = this.connection.peerConnection, o = this.connection.provider, t.label = 1;
								case 1:
									return t.trys.push([1, 7, , 8]), [4, n.createOffer(this.connection.options.constraints)];
								case 2:
									a = t.sent(), r.default.log("Created offer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (a.sdp = this.connection.options.sdpTransform(a.sdp) || a.sdp), t.label = 3;
								case 3:
									return t.trys.push([3, 5, , 6]), [4, n.setLocalDescription(a)];
								case 4:
									return t.sent(), r.default.log("Set localDescription:", a, "for:" + this.connection.peer), s = {
										sdp: a,
										type: this.connection.type,
										connectionId: this.connection.connectionId,
										metadata: this.connection.metadata,
										browser: i.util.browser
									}, this.connection.type === c.ConnectionType.Data && (d = this.connection, s = e(e({}, s), {
										label: d.label,
										reliable: d.reliable,
										serialization: d.serialization
									})), o.socket.send({
										type: c.ServerMessageType.Offer,
										payload: s,
										dst: this.connection.peer
									}), [3, 6];
								case 5:
									return "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != (l = t.sent()) && (o.emitError(c.PeerErrorType.WebRTC, l), r.default.log("Failed to setLocalDescription, ", l)), [3, 6];
								case 6:
									return [3, 8];
								case 7:
									return u = t.sent(), o.emitError(c.PeerErrorType.WebRTC, u), r.default.log("Failed to createOffer, ", u), [3, 8];
								case 8:
									return [2]
							}
						})
					})
				}, o.prototype._makeAnswer = function() {
					return n(this, void 0, Promise, function() {
						var e, n, o, a, s;
						return t(this, function(t) {
							switch (t.label) {
								case 0:
									e = this.connection.peerConnection, n = this.connection.provider, t.label = 1;
								case 1:
									return t.trys.push([1, 7, , 8]), [4, e.createAnswer()];
								case 2:
									o = t.sent(), r.default.log("Created answer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (o.sdp = this.connection.options.sdpTransform(o.sdp) || o.sdp), t.label = 3;
								case 3:
									return t.trys.push([3, 5, , 6]), [4, e.setLocalDescription(o)];
								case 4:
									return t.sent(), r.default.log("Set localDescription:", o, "for:" + this.connection.peer), n.socket.send({
										type: c.ServerMessageType.Answer,
										payload: {
											sdp: o,
											type: this.connection.type,
											connectionId: this.connection.connectionId,
											browser: i.util.browser
										},
										dst: this.connection.peer
									}), [3, 6];
								case 5:
									return a = t.sent(), n.emitError(c.PeerErrorType.WebRTC, a), r.default.log("Failed to setLocalDescription, ", a), [3, 6];
								case 6:
									return [3, 8];
								case 7:
									return s = t.sent(), n.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to create answer, ", s), [3, 8];
								case 8:
									return [2]
							}
						})
					})
				}, o.prototype.handleSDP = function(e, o) {
					return n(this, void 0, Promise, function() {
						var n, i, a, s;
						return t(this, function(t) {
							switch (t.label) {
								case 0:
									o = new RTCSessionDescription(o), n = this.connection.peerConnection, i = this.connection.provider, r.default.log("Setting remote description", o), a = this, t.label = 1;
								case 1:
									return t.trys.push([1, 5, , 6]), [4, n.setRemoteDescription(o)];
								case 2:
									return t.sent(), r.default.log("Set remoteDescription:" + e + " for:" + this.connection.peer), "OFFER" !== e ? [3, 4] : [4, a._makeAnswer()];
								case 3:
									t.sent(), t.label = 4;
								case 4:
									return [3, 6];
								case 5:
									return s = t.sent(), i.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to setRemoteDescription, ", s), [3, 6];
								case 6:
									return [2]
							}
						})
					})
				}, o.prototype.handleCandidate = function(e) {
					return n(this, void 0, Promise, function() {
						var n, o, i, a, s, d;
						return t(this, function(t) {
							switch (t.label) {
								case 0:
									r.default.log("handleCandidate:", e), n = e.candidate, o = e.sdpMLineIndex, i = e.sdpMid, a = this.connection.peerConnection, s = this.connection.provider, t.label = 1;
								case 1:
									return t.trys.push([1, 3, , 4]), [4, a.addIceCandidate(new RTCIceCandidate({
										sdpMid: i,
										sdpMLineIndex: o,
										candidate: n
									}))];
								case 2:
									return t.sent(), r.default.log("Added ICE candidate for:" + this.connection.peer), [3, 4];
								case 3:
									return d = t.sent(), s.emitError(c.PeerErrorType.WebRTC, d), r.default.log("Failed to handleCandidate, ", d), [3, 4];
								case 4:
									return [2]
							}
						})
					})
				}, o.prototype._addTracksToConnection = function(e, n) {
					if (r.default.log("add tracks from stream " + e.id + " to peer connection"), !n.addTrack) return r.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
					e.getTracks().forEach(function(t) {
						n.addTrack(t, e)
					})
				}, o.prototype._addStreamToMediaConnection = function(e, n) {
					r.default.log("add stream " + e.id + " to media connection " + n.connectionId), n.addStream(e)
				}, o
			}();
		exports.Negotiator = a;
	}, {
		"./util": "BHXf",
		"./logger": "WOs9",
		"./enums": "ZRYf"
	}],
	"tQFK": [function(require, module, exports) {
		"use strict";
		var t = this && this.__extends || function() {
			var t = function(e, r) {
				return (t = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(t, e) {
						t.__proto__ = e
					} || function(t, e) {
						for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
					})(e, r)
			};
			return function(e, r) {
				function n() {
					this.constructor = e
				}
				t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}();
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = require("eventemitter3"),
			r = function(e) {
				function r(t, r, n) {
					var o = e.call(this) || this;
					return o.peer = t, o.provider = r, o.options = n, o._open = !1, o.metadata = n.metadata, o
				}
				return t(r, e), Object.defineProperty(r.prototype, "open", {
					get: function() {
						return this._open
					},
					enumerable: !0,
					configurable: !0
				}), r
			}(e.EventEmitter);
		exports.BaseConnection = r;
	}, {
		"eventemitter3": "JJlS"
	}],
	"dbHP": [function(require, module, exports) {
		"use strict";
		var e = this && this.__extends || function() {
				var e = function(t, o) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o])
						})(t, o)
				};
				return function(t, o) {
					function r() {
						this.constructor = t
					}
					e(t, o), t.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r)
				}
			}(),
			t = this && this.__assign || function() {
				return (t = Object.assign || function(e) {
					for (var t, o = 1, r = arguments.length; o < r; o++)
						for (var n in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
					return e
				}).apply(this, arguments)
			},
			o = this && this.__values || function(e) {
				var t = "function" == typeof Symbol && Symbol.iterator,
					o = t && e[t],
					r = 0;
				if (o) return o.call(e);
				if (e && "number" == typeof e.length) return {
					next: function() {
						return e && r >= e.length && (e = void 0), {
							value: e && e[r++],
							done: !e
						}
					}
				};
				throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
			},
			r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var n = require("./util"),
			i = r(require("./logger")),
			a = require("./negotiator"),
			s = require("./enums"),
			l = require("./baseconnection"),
			c = function(r) {
				function l(e, t, o) {
					var i = r.call(this, e, t, o) || this;
					return i._localStream = i.options._stream, i.connectionId = i.options.connectionId || l.ID_PREFIX + n.util.randomToken(), i._negotiator = new a.Negotiator(i), i._localStream && i._negotiator.startConnection({
						_stream: i._localStream,
						originator: !0
					}), i
				}
				return e(l, r), Object.defineProperty(l.prototype, "type", {
					get: function() {
						return s.ConnectionType.Media
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(l.prototype, "localStream", {
					get: function() {
						return this._localStream
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(l.prototype, "remoteStream", {
					get: function() {
						return this._remoteStream
					},
					enumerable: !0,
					configurable: !0
				}), l.prototype.addStream = function(e) {
					i.default.log("Receiving stream", e), this._remoteStream = e, r.prototype.emit.call(this, s.ConnectionEventType.Stream, e)
				}, l.prototype.handleMessage = function(e) {
					var t = e.type,
						o = e.payload;
					switch (e.type) {
						case s.ServerMessageType.Answer:
							this._negotiator.handleSDP(t, o.sdp), this._open = !0;
							break;
						case s.ServerMessageType.Candidate:
							this._negotiator.handleCandidate(o.candidate);
							break;
						default:
							i.default.warn("Unrecognized message type:" + t + " from peer:" + this.peer)
					}
				}, l.prototype.answer = function(e, r) {
					var n, a;
					if (void 0 === r && (r = {}), this._localStream) i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
					else {
						this._localStream = e, r && r.sdpTransform && (this.options.sdpTransform = r.sdpTransform), this._negotiator.startConnection(t(t({}, this.options._payload), {
							_stream: e
						}));
						var s = this.provider._getMessages(this.connectionId);
						try {
							for (var l = o(s), c = l.next(); !c.done; c = l.next()) {
								var p = c.value;
								this.handleMessage(p)
							}
						} catch (u) {
							n = {
								error: u
							}
						} finally {
							try {
								c && !c.done && (a = l.return) && a.call(l)
							} finally {
								if (n) throw n.error
							}
						}
						this._open = !0
					}
				}, l.prototype.close = function() {
					this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, r.prototype.emit.call(this, s.ConnectionEventType.Close))
				}, l.ID_PREFIX = "mc_", l
			}(l.BaseConnection);
		exports.MediaConnection = c;
	}, {
		"./util": "BHXf",
		"./logger": "WOs9",
		"./negotiator": "HCdX",
		"./enums": "ZRYf",
		"./baseconnection": "tQFK"
	}],
	"GGp6": [function(require, module, exports) {
		"use strict";
		var e = this && this.__extends || function() {
				var e = function(t, r) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
						})(t, r)
				};
				return function(t, r) {
					function o() {
						this.constructor = t
					}
					e(t, r), t.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype, new o)
				}
			}(),
			t = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var r = require("eventemitter3"),
			o = t(require("./logger")),
			n = function(t) {
				function r() {
					var e = t.call(this) || this;
					return e._queue = [], e._processing = !1, e
				}
				return e(r, t), Object.defineProperty(r.prototype, "queue", {
					get: function() {
						return this._queue
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(r.prototype, "size", {
					get: function() {
						return this.queue.length
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(r.prototype, "processing", {
					get: function() {
						return this._processing
					},
					enumerable: !0,
					configurable: !0
				}), r.prototype.enque = function(e) {
					e.name = "mylovelylilblob", this.queue.push(e), this.processing || this.doNextTask()
				}, r.prototype.destroy = function() {
					this._queue = []
				}, r.prototype.doNextTask = function() {
					var e = this;
					0 !== this.size && (this.processing || (this._processing = !0, this.queue.shift().arrayBuffer().then(function(t) {
						e._processing = !1, t.target && e.emit("done", t.target.result), e.doNextTask()
					}).catch(function(t) {
						o.default.error("EncodingQueue error:", t), e._processing = !1, e.destroy(), e.emit("error", t)
					})))
				}, r
			}(r.EventEmitter);
		exports.EncodingQueue = n;
	}, {
		"eventemitter3": "JJlS",
		"./logger": "WOs9"
	}],
	"GBTQ": [function(require, module, exports) {
		"use strict";
		var e = this && this.__extends || function() {
				var e = function(t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function(t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			t = this && this.__values || function(e) {
				var t = "function" == typeof Symbol && Symbol.iterator,
					n = t && e[t],
					i = 0;
				if (n) return n.call(e);
				if (e && "number" == typeof e.length) return {
					next: function() {
						return e && i >= e.length && (e = void 0), {
							value: e && e[i++],
							done: !e
						}
					}
				};
				throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
			},
			n = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var i = require("./util"),
			o = n(require("./logger")),
			r = require("./negotiator"),
			a = require("./enums"),
			s = require("./baseconnection"),
			u = require("./encodingQueue"),
			l = function(n) {
				function s(e, t, l) {
					var f = n.call(this, e, t, l) || this;
					return f.stringify = JSON.stringify, f.parse = JSON.parse, f._buffer = [], f._bufferSize = 0, f._buffering = !1, f._chunkedData = {}, f._encodingQueue = new u.EncodingQueue, f.connectionId = f.options.connectionId || s.ID_PREFIX + i.util.randomToken(), f.label = f.options.label || f.connectionId, f.serialization = f.options.serialization || a.SerializationType.Binary, f.reliable = !!f.options.reliable, f._encodingQueue.on("done", function(e) {
						f._bufferedSend(e)
					}), f._encodingQueue.on("error", function() {
						o.default.error("DC#" + f.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC"), f.close()
					}), f._negotiator = new r.Negotiator(f), f._negotiator.startConnection(f.options._payload || {
						originator: !0
					}), f
				}
				return e(s, n), Object.defineProperty(s.prototype, "type", {
					get: function() {
						return a.ConnectionType.Data
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(s.prototype, "dataChannel", {
					get: function() {
						return this._dc
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(s.prototype, "bufferSize", {
					get: function() {
						return this._bufferSize
					},
					enumerable: !0,
					configurable: !0
				}), s.prototype.initialize = function(e) {
					this._dc = e, this._configureDataChannel()
				}, s.prototype._configureDataChannel = function() {
					var e = this;
					i.util.supports.binaryBlob && !i.util.supports.reliable || (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function() {
						o.default.log("DC#" + e.connectionId + " dc connection success"), e._open = !0, e.emit(a.ConnectionEventType.Open)
					}, this.dataChannel.onmessage = function(t) {
						o.default.log("DC#" + e.connectionId + " dc onmessage:", t.data), e._handleDataMessage(t)
					}, this.dataChannel.onclose = function() {
						o.default.log("DC#" + e.connectionId + " dc closed for:", e.peer), e.close()
					}
				}, s.prototype._handleDataMessage = function(e) {
					var t = this,
						o = e.data,
						r = o.constructor,
						s = o;
					if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
						if (r === Blob) return void i.util.blobToArrayBuffer(o, function(e) {
							var n = i.util.unpack(e);
							t.emit(a.ConnectionEventType.Data, n)
						});
						if (r === ArrayBuffer) s = i.util.unpack(o);
						else if (r === String) {
							var u = i.util.binaryStringToArrayBuffer(o);
							s = i.util.unpack(u)
						}
					} else this.serialization === a.SerializationType.JSON && (s = this.parse(o));
					s.__peerData ? this._handleChunk(s) : n.prototype.emit.call(this, a.ConnectionEventType.Data, s)
				}, s.prototype._handleChunk = function(e) {
					var t = e.__peerData,
						n = this._chunkedData[t] || {
							data: [],
							count: 0,
							total: e.total
						};
					if (n.data[e.n] = e.data, n.count++, this._chunkedData[t] = n, n.total === n.count) {
						delete this._chunkedData[t];
						var i = new Blob(n.data);
						this._handleDataMessage({
							data: i
						})
					}
				}, s.prototype.close = function() {
					this._buffer = [], this._bufferSize = 0, this._chunkedData = {}, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this._dc = null), this._encodingQueue && (this._encodingQueue.destroy(), this._encodingQueue.removeAllListeners(), this._encodingQueue = null), this.open && (this._open = !1, n.prototype.emit.call(this, a.ConnectionEventType.Close))
				}, s.prototype.send = function(e, t) {
					if (this.open)
						if (this.serialization === a.SerializationType.JSON) this._bufferedSend(this.stringify(e));
						else if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
						var o = i.util.pack(e);
						if (!t && o.size > i.util.chunkedMTU) return void this._sendChunks(o);
						i.util.supports.binaryBlob ? this._bufferedSend(o) : this._encodingQueue.enque(o)
					} else this._bufferedSend(e);
					else n.prototype.emit.call(this, a.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."))
				}, s.prototype._bufferedSend = function(e) {
					!this._buffering && this._trySend(e) || (this._buffer.push(e), this._bufferSize = this._buffer.length)
				}, s.prototype._trySend = function(e) {
					var t = this;
					if (!this.open) return !1;
					if (this.dataChannel.bufferedAmount > s.MAX_BUFFERED_AMOUNT) return this._buffering = !0, setTimeout(function() {
						t._buffering = !1, t._tryBuffer()
					}, 50), !1;
					try {
						this.dataChannel.send(e)
					} catch (n) {
						return o.default.error("DC#:" + this.connectionId + " Error when sending:", n), this._buffering = !0, this.close(), !1
					}
					return !0
				}, s.prototype._tryBuffer = function() {
					if (this.open && 0 !== this._buffer.length) {
						var e = this._buffer[0];
						this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer())
					}
				}, s.prototype._sendChunks = function(e) {
					var n, r, a = i.util.chunk(e);
					o.default.log("DC#" + this.connectionId + " Try to send " + a.length + " chunks...");
					try {
						for (var s = t(a), u = s.next(); !u.done; u = s.next()) {
							var l = u.value;
							this.send(l, !0)
						}
					} catch (f) {
						n = {
							error: f
						}
					} finally {
						try {
							u && !u.done && (r = s.return) && r.call(s)
						} finally {
							if (n) throw n.error
						}
					}
				}, s.prototype.handleMessage = function(e) {
					var t = e.payload;
					switch (e.type) {
						case a.ServerMessageType.Answer:
							this._negotiator.handleSDP(e.type, t.sdp);
							break;
						case a.ServerMessageType.Candidate:
							this._negotiator.handleCandidate(t.candidate);
							break;
						default:
							o.default.warn("Unrecognized message type:", e.type, "from peer:", this.peer)
					}
				}, s.ID_PREFIX = "dc_", s.MAX_BUFFERED_AMOUNT = 8388608, s
			}(s.BaseConnection);
		exports.DataConnection = l;
	}, {
		"./util": "BHXf",
		"./logger": "WOs9",
		"./negotiator": "HCdX",
		"./enums": "ZRYf",
		"./baseconnection": "tQFK",
		"./encodingQueue": "GGp6"
	}],
	"in7L": [function(require, module, exports) {
		"use strict";
		var t = this && this.__awaiter || function(t, e, r, o) {
				return new(r || (r = Promise))(function(n, s) {
					function i(t) {
						try {
							a(o.next(t))
						} catch (e) {
							s(e)
						}
					}

					function u(t) {
						try {
							a(o.throw(t))
						} catch (e) {
							s(e)
						}
					}

					function a(t) {
						var e;
						t.done ? n(t.value) : (e = t.value, e instanceof r ? e : new r(function(t) {
							t(e)
						})).then(i, u)
					}
					a((o = o.apply(t, e || [])).next())
				})
			},
			e = this && this.__generator || function(t, e) {
				var r, o, n, s, i = {
					label: 0,
					sent: function() {
						if (1 & n[0]) throw n[1];
						return n[1]
					},
					trys: [],
					ops: []
				};
				return s = {
					next: u(0),
					throw: u(1),
					return: u(2)
				}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
					return this
				}), s;

				function u(s) {
					return function(u) {
						return function(s) {
							if (r) throw new TypeError("Generator is already executing.");
							for (; i;) try {
								if (r = 1, o && (n = 2 & s[0] ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done) return n;
								switch (o = 0, n && (s = [2 & s[0], n.value]), s[0]) {
									case 0:
									case 1:
										n = s;
										break;
									case 4:
										return i.label++, {
											value: s[1],
											done: !1
										};
									case 5:
										i.label++, o = s[1], s = [0];
										continue;
									case 7:
										s = i.ops.pop(), i.trys.pop();
										continue;
									default:
										if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === s[0] || 2 === s[0])) {
											i = 0;
											continue
										}
										if (3 === s[0] && (!n || s[1] > n[0] && s[1] < n[3])) {
											i.label = s[1];
											break
										}
										if (6 === s[0] && i.label < n[1]) {
											i.label = n[1], n = s;
											break
										}
										if (n && i.label < n[2]) {
											i.label = n[2], i.ops.push(s);
											break
										}
										n[2] && i.ops.pop(), i.trys.pop();
										continue
								}
								s = e.call(t, i)
							} catch (u) {
								s = [6, u], o = 0
							} finally {
								r = n = 0
							}
							if (5 & s[0]) throw s[1];
							return {
								value: s[0] ? s[1] : void 0,
								done: !0
							}
						}([s, u])
					}
				}
			},
			r = this && this.__importDefault || function(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var o = require("./util"),
			n = r(require("./logger")),
			s = function() {
				function r(t) {
					this._options = t
				}
				return r.prototype._buildUrl = function(t) {
					var e = (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + t;
					return e += "?ts=" + (new Date).getTime() + Math.random()
				}, r.prototype.retrieveId = function() {
					return t(this, void 0, Promise, function() {
						var t, r, s, i;
						return e(this, function(e) {
							switch (e.label) {
								case 0:
									t = this._buildUrl("id"), e.label = 1;
								case 1:
									return e.trys.push([1, 3, , 4]), [4, fetch(t)];
								case 2:
									if (200 !== (r = e.sent()).status) throw new Error("Error. Status:" + r.status);
									return [2, r.text()];
								case 3:
									throw s = e.sent(), n.default.error("Error retrieving ID", s), i = "", "/" === this._options.path && this._options.host !== o.util.CLOUD_HOST && (i = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + i);
								case 4:
									return [2]
							}
						})
					})
				}, r.prototype.listAllPeers = function() {
					return t(this, void 0, Promise, function() {
						var t, r, s, i;
						return e(this, function(e) {
							switch (e.label) {
								case 0:
									t = this._buildUrl("peers"), e.label = 1;
								case 1:
									return e.trys.push([1, 3, , 4]), [4, fetch(t)];
								case 2:
									if (200 !== (r = e.sent()).status) {
										if (401 === r.status) throw s = "", s = this._options.host === o.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + s);
										throw new Error("Error. Status:" + r.status)
									}
									return [2, r.json()];
								case 3:
									throw i = e.sent(), n.default.error("Error retrieving list peers", i), new Error("Could not get list peers from the server." + i);
								case 4:
									return [2]
							}
						})
					})
				}, r
			}();
		exports.API = s;
	}, {
		"./util": "BHXf",
		"./logger": "WOs9"
	}],
	"Hxpd": [function(require, module, exports) {
		"use strict";
		var e = this && this.__extends || function() {
				var e = function(t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function(t, n) {
					function r() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
				}
			}(),
			t = this && this.__assign || function() {
				return (t = Object.assign || function(e) {
					for (var t, n = 1, r = arguments.length; n < r; n++)
						for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
					return e
				}).apply(this, arguments)
			},
			n = this && this.__values || function(e) {
				var t = "function" == typeof Symbol && Symbol.iterator,
					n = t && e[t],
					r = 0;
				if (n) return n.call(e);
				if (e && "number" == typeof e.length) return {
					next: function() {
						return e && r >= e.length && (e = void 0), {
							value: e && e[r++],
							done: !e
						}
					}
				};
				throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
			},
			r = this && this.__read || function(e, t) {
				var n = "function" == typeof Symbol && e[Symbol.iterator];
				if (!n) return e;
				var r, o, i = n.call(e),
					s = [];
				try {
					for (;
						(void 0 === t || t-- > 0) && !(r = i.next()).done;) s.push(r.value)
				} catch (a) {
					o = {
						error: a
					}
				} finally {
					try {
						r && !r.done && (n = i.return) && n.call(i)
					} finally {
						if (o) throw o.error
					}
				}
				return s
			},
			o = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var i = require("eventemitter3"),
			s = require("./util"),
			a = o(require("./logger")),
			c = require("./socket"),
			l = require("./mediaconnection"),
			d = require("./dataconnection"),
			u = require("./enums"),
			p = require("./api"),
			h = function() {
				return function() {}
			}(),
			f = function(o) {
				function i(e, n) {
					var r, c = o.call(this) || this;
					return c._id = null, c._lastServerId = null, c._destroyed = !1, c._disconnected = !1, c._open = !1, c._connections = new Map, c._lostMessages = new Map, e && e.constructor == Object ? n = e : e && (r = e.toString()), n = t({
						debug: 0,
						host: s.util.CLOUD_HOST,
						port: s.util.CLOUD_PORT,
						path: "/",
						key: i.DEFAULT_KEY,
						token: s.util.randomToken(),
						config: s.util.defaultConfig
					}, n), c._options = n, c._options.path && ("/" !== c._options.path[0] && (c._options.path = "/" + c._options.path), "/" !== c._options.path[c._options.path.length - 1] && (c._options.path += "/")), void 0 === c._options.secure && c._options.host !== s.util.CLOUD_HOST ? c._options.secure = s.util.isSecure() : c._options.host == s.util.CLOUD_HOST && (c._options.secure = !0), c._options.logFunction && a.default.setLogFunction(c._options.logFunction), a.default.logLevel = c._options.debug || 0, c._api = new p.API(n), c._socket = c._createServerConnection(), s.util.supports.audioVideo || s.util.supports.data ? r && !s.util.validateId(r) ? (c._delayedAbort(u.PeerErrorType.InvalidID, 'ID "' + r + '" is invalid'), c) : (r ? c._initialize(r) : c._api.retrieveId().then(function(e) {
						return c._initialize(e)
					}).catch(function(e) {
						return c._abort(u.PeerErrorType.ServerError, e)
					}), c) : (c._delayedAbort(u.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), c)
				}
				return e(i, o), Object.defineProperty(i.prototype, "id", {
					get: function() {
						return this._id
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "options", {
					get: function() {
						return this._options
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "open", {
					get: function() {
						return this._open
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "socket", {
					get: function() {
						return this._socket
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "connections", {
					get: function() {
						var e, t, o = Object.create(null);
						try {
							for (var i = n(this._connections), s = i.next(); !s.done; s = i.next()) {
								var a = r(s.value, 2),
									c = a[0],
									l = a[1];
								o[c] = l
							}
						} catch (d) {
							e = {
								error: d
							}
						} finally {
							try {
								s && !s.done && (t = i.return) && t.call(i)
							} finally {
								if (e) throw e.error
							}
						}
						return o
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "destroyed", {
					get: function() {
						return this._destroyed
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(i.prototype, "disconnected", {
					get: function() {
						return this._disconnected
					},
					enumerable: !0,
					configurable: !0
				}), i.prototype._createServerConnection = function() {
					var e = this,
						t = new c.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
					return t.on(u.SocketEventType.Message, function(t) {
						e._handleMessage(t)
					}), t.on(u.SocketEventType.Error, function(t) {
						e._abort(u.PeerErrorType.SocketError, t)
					}), t.on(u.SocketEventType.Disconnected, function() {
						e.disconnected || (e.emitError(u.PeerErrorType.Network, "Lost connection to server."), e.disconnect())
					}), t.on(u.SocketEventType.Close, function() {
						e.disconnected || e._abort(u.PeerErrorType.SocketClosed, "Underlying socket is already closed.")
					}), t
				}, i.prototype._initialize = function(e) {
					this._id = e, this.socket.start(e, this._options.token)
				}, i.prototype._handleMessage = function(e) {
					var t, r, o = e.type,
						i = e.payload,
						s = e.src;
					switch (o) {
						case u.ServerMessageType.Open:
							this._lastServerId = this.id, this._open = !0, this.emit(u.PeerEventType.Open, this.id);
							break;
						case u.ServerMessageType.Error:
							this._abort(u.PeerErrorType.ServerError, i.msg);
							break;
						case u.ServerMessageType.IdTaken:
							this._abort(u.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
							break;
						case u.ServerMessageType.InvalidKey:
							this._abort(u.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
							break;
						case u.ServerMessageType.Leave:
							a.default.log("Received leave message from " + s), this._cleanupPeer(s), this._connections.delete(s);
							break;
						case u.ServerMessageType.Expire:
							this.emitError(u.PeerErrorType.PeerUnavailable, "Could not connect to peer " + s);
							break;
						case u.ServerMessageType.Offer:
							var c = i.connectionId;
							if ((_ = this.getConnection(s, c)) && (_.close(), a.default.warn("Offer received for existing Connection ID:" + c)), i.type === u.ConnectionType.Media) _ = new l.MediaConnection(s, this, {
								connectionId: c,
								_payload: i,
								metadata: i.metadata
							}), this._addConnection(s, _), this.emit(u.PeerEventType.Call, _);
							else {
								if (i.type !== u.ConnectionType.Data) return void a.default.warn("Received malformed connection type:" + i.type);
								_ = new d.DataConnection(s, this, {
									connectionId: c,
									_payload: i,
									metadata: i.metadata,
									label: i.label,
									serialization: i.serialization,
									reliable: i.reliable
								}), this._addConnection(s, _), this.emit(u.PeerEventType.Connection, _)
							}
							var p = this._getMessages(c);
							try {
								for (var h = n(p), f = h.next(); !f.done; f = h.next()) {
									var y = f.value;
									_.handleMessage(y)
								}
							} catch (v) {
								t = {
									error: v
								}
							} finally {
								try {
									f && !f.done && (r = h.return) && r.call(h)
								} finally {
									if (t) throw t.error
								}
							}
							break;
						default:
							if (!i) return void a.default.warn("You received a malformed message from " + s + " of type " + o);
							var _;
							c = i.connectionId;
							(_ = this.getConnection(s, c)) && _.peerConnection ? _.handleMessage(e) : c ? this._storeMessage(c, e) : a.default.warn("You received an unrecognized message:", e)
					}
				}, i.prototype._storeMessage = function(e, t) {
					this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t)
				}, i.prototype._getMessages = function(e) {
					var t = this._lostMessages.get(e);
					return t ? (this._lostMessages.delete(e), t) : []
				}, i.prototype.connect = function(e, t) {
					if (void 0 === t && (t = {}), this.disconnected) return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(u.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
					var n = new d.DataConnection(e, this, t);
					return this._addConnection(e, n), n
				}, i.prototype.call = function(e, t, n) {
					if (void 0 === n && (n = {}), this.disconnected) return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(u.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
					if (t) {
						n._stream = t;
						var r = new l.MediaConnection(e, this, n);
						return this._addConnection(e, r), r
					}
					a.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.")
				}, i.prototype._addConnection = function(e, t) {
					a.default.log("add connection " + t.type + ":" + t.connectionId + " to peerId:" + e), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t)
				}, i.prototype._removeConnection = function(e) {
					var t = this._connections.get(e.peer);
					if (t) {
						var n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
					}
					this._lostMessages.delete(e.connectionId)
				}, i.prototype.getConnection = function(e, t) {
					var r, o, i = this._connections.get(e);
					if (!i) return null;
					try {
						for (var s = n(i), a = s.next(); !a.done; a = s.next()) {
							var c = a.value;
							if (c.connectionId === t) return c
						}
					} catch (l) {
						r = {
							error: l
						}
					} finally {
						try {
							a && !a.done && (o = s.return) && o.call(s)
						} finally {
							if (r) throw r.error
						}
					}
					return null
				}, i.prototype._delayedAbort = function(e, t) {
					var n = this;
					setTimeout(function() {
						n._abort(e, t)
					}, 0)
				}, i.prototype._abort = function(e, t) {
					a.default.error("Aborting!"), this.emitError(e, t), this._lastServerId ? this.disconnect() : this.destroy()
				}, i.prototype.emitError = function(e, t) {
					var n;
					a.default.error("Error:", t), (n = "string" == typeof t ? new Error(t) : t).type = e, this.emit(u.PeerEventType.Error, n)
				}, i.prototype.destroy = function() {
					this.destroyed || (a.default.log("Destroy peer with ID:" + this.id), this.disconnect(), this._cleanup(), this._destroyed = !0, this.emit(u.PeerEventType.Close))
				}, i.prototype._cleanup = function() {
					var e, t;
					try {
						for (var r = n(this._connections.keys()), o = r.next(); !o.done; o = r.next()) {
							var i = o.value;
							this._cleanupPeer(i), this._connections.delete(i)
						}
					} catch (s) {
						e = {
							error: s
						}
					} finally {
						try {
							o && !o.done && (t = r.return) && t.call(r)
						} finally {
							if (e) throw e.error
						}
					}
					this.socket.removeAllListeners()
				}, i.prototype._cleanupPeer = function(e) {
					var t, r, o = this._connections.get(e);
					if (o) try {
						for (var i = n(o), s = i.next(); !s.done; s = i.next()) {
							s.value.close()
						}
					} catch (a) {
						t = {
							error: a
						}
					} finally {
						try {
							s && !s.done && (r = i.return) && r.call(i)
						} finally {
							if (t) throw t.error
						}
					}
				}, i.prototype.disconnect = function() {
					if (!this.disconnected) {
						var e = this.id;
						a.default.log("Disconnect peer with ID:" + e), this._disconnected = !0, this._open = !1, this.socket.close(), this._lastServerId = e, this._id = null, this.emit(u.PeerEventType.Disconnected, e)
					}
				}, i.prototype.reconnect = function() {
					if (this.disconnected && !this.destroyed) a.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = !1, this._initialize(this._lastServerId);
					else {
						if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
						if (this.disconnected || this.open) throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
						a.default.error("In a hurry? We're still trying to make the initial connection!")
					}
				}, i.prototype.listAllPeers = function(e) {
					var t = this;
					void 0 === e && (e = function(e) {}), this._api.listAllPeers().then(function(t) {
						return e(t)
					}).catch(function(e) {
						return t._abort(u.PeerErrorType.ServerError, e)
					})
				}, i.DEFAULT_KEY = "peerjs", i
			}(i.EventEmitter);
		exports.Peer = f;
	}, {
		"eventemitter3": "JJlS",
		"./util": "BHXf",
		"./logger": "WOs9",
		"./socket": "wJlv",
		"./mediaconnection": "dbHP",
		"./dataconnection": "GBTQ",
		"./enums": "ZRYf",
		"./api": "in7L"
	}],
	"iTK6": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = require("./util"),
			r = require("./peer");
		exports.peerjs = {
			Peer: r.Peer,
			util: e.util
		}, exports.default = r.Peer;
	}, {
		"./util": "BHXf",
		"./peer": "Hxpd"
	}]
}, {}, ["iTK6"], null)
