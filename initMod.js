function initMod({
    toggleKey: e,
    godInBlink: t,
    debugMode: n
}) {
    let o = !1,
        i = {},
        l = 0,
        d = [],
        c = WebSocket.prototype.send;
    WebSocket.prototype.send = function() {
        o ? (n && console.log("Holding Packet"), d.push({
            this: this,
            args: arguments
        })) : c.apply(this, arguments)
    };
    let s = Object.getOwnPropertyDescriptors(WebSocket.prototype).onmessage.set;
    Object.defineProperty(WebSocket.prototype, "onmessage", {
            set: function() {
                let e = () => {};
                "function" == typeof arguments[0] && (e = arguments[0], arguments[0] = function() {
                    (function() {
                        if (arguments[0].data instanceof ArrayBuffer) {
                            let e = new Uint8Array(arguments[0].data);
                            return o && t && 243 == e[0] && 4 == e[1] && 200 == e[2] && 2 == e[3] && 245 == e[4] && 21 == e[5] && (48 == e.length || 25 == e.length || 49 == e.length || 50 == e.length) ? (n && console.error(`Bocked Packet ${48==e.length?"Damage?":"Shot? "+e.length}`, e), !1) : (n && console.log("Packet", e), !0)
                        }
                        return !0
                    }).apply(this, arguments) && e.apply(this, arguments)
                }), s.apply(this, arguments)
            }
        }), document.addEventListener("keydown", t => {
            t.code == e && (o = !o, document.getElementById("blink_at").innerText = `Blink: ${o?"Enabled":"Disabled"}`, o ? (document.getElementById("blink_ct").style.visibility = "", l = 0, i = setInterval(function() {
                l++, document.getElementById("blink_ct").innerText = `${l/10} s`
            }, 100)) : (document.getElementById("blink_ct").style.visibility = "hidden", clearInterval(i), function() {
                n && console.warn("Dumping Packets...");
                for (let e in d) c.apply(d[e].this, d[e].args);
                d = []
            }()))
        }),
        function() {
            let e = document.createElement("div");
            e.id = "blink", e.style.position = "absolute", e.style.zIndex = 999999, e.style.color = "red", e.style.fontSize = "xx-large", e.style.fontWeight = "bold";
            let t = document.createElement("p"),
                n = document.createTextNode("Blink: Disabled");
            t.id = "blink_at", t.style.marginTop = "10px", t.appendChild(n);
            let o = document.createElement("p"),
                i = document.createTextNode("0 s");
            o.id = "blink_ct", o.style.marginTop = "10px", o.style.visibility = "hidden", o.style.marginTop = "5px", o.appendChild(i), e.appendChild(t), e.appendChild(o), document.body.insertBefore(e, document.body.firstChild)
        }()
}
