function DNDFileController(n, t) {
  var i = document.getElementById(n),
    r = document.getElementById(t);
  this.dragenter = function (n) {
    n.stopPropagation(),
      n.preventDefault(),
      i.classList.add("rounded")
  },
    this.dragover = function (n) {
      n.stopPropagation(),
        n.preventDefault()
    },
    this.dragleave = function (n) {
      n.stopPropagation(),
        n.preventDefault(),
        i.classList.remove("rounded")
    },
    this.drop = function (n) {
      var e, f, t, o, u;
      for (n.stopPropagation(), n.preventDefault(), i.classList.remove("rounded"), e = n.dataTransfer.files, f = 0; t = e[f]; f++)(o = /image.*/, t.type.match(o)) && (u = new FileReader, u.onerror = function (n) {
        var t = "Error " + n.target.error.code;
        switch (n.target.error.code) {
          case FileError.NOT_READABLE_ERR:
            t += ": NOT_READABLE_ERR"
        }
        alert(t)
      },
        u.onload = function (n) {
          return function (t) {
            var f, s, i, e, h, o, c, u;
            if (t.target.readyState == FileReader.DONE) {



              var img = new Image()
              img.onload = function () {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)

                s = ctx.getImageData(0, 0, canvas.width, canvas.height)
                i = s.data
                e = 0
                h = canvas.height
                for (; e < h; e++)
                  for (o = 0, c = canvas.width; o < c; o++)
                    u = (o + e * canvas.width) * 4,
                      i[u + 3] !== 0 && (i[u] = targetRGB.r, i[u + 1] = targetRGB.g, i[u + 2] = targetRGB.b);
                ctx.putImageData(s, 0, 0),
                  Canvas2Image.saveAsPNG(canvas)

              }


              img.src = t.target.result
            }
          }
        }(t), u.readAsDataURL(t));
      return !1
    },
    i.addEventListener("dragenter", this.dragenter, !1),
    i.addEventListener("dragover", this.dragover, !1),
    i.addEventListener("dragleave", this.dragleave, !1),
    i.addEventListener("drop", this.drop, !1)
}
var Canvas2Image; (function () {
  function i(t) {
    var i, r, e, u, f, o;
    for (e = t.length, r = 0, i = ""; r < e;) {
      if (u = t.charCodeAt(r++) & 255, r == e) {
        i += n.charAt(u >> 2),
          i += n.charAt((u & 3) << 4),
          i += "==";
        break
      }
      if (f = t.charCodeAt(r++), r == e) {
        i += n.charAt(u >> 2),
          i += n.charAt((u & 3) << 4 | (f & 240) >> 4),
          i += n.charAt((f & 15) << 2),
          i += "=";
        break
      }
      o = t.charCodeAt(r++),
        i += n.charAt(u >> 2),
        i += n.charAt((u & 3) << 4 | (f & 240) >> 4),
        i += n.charAt((f & 15) << 2 | (o & 192) >> 6),
        i += n.charAt(o & 63)
    }
    return i
  }
  function r(n) {
    var s, o, r, u, i, e, f;
    for (e = n.length, i = 0, f = ""; i < e;) {
      do s = t[n.charCodeAt(i++) & 255];
      while (i < e && s == -1);
      if (s == -1) break;
      do o = t[n.charCodeAt(i++) & 255];
      while (i < e && o == -1);
      if (o == -1) break;
      f += String.fromCharCode(s << 2 | (o & 48) >> 4);
      do {
        if (r = n.charCodeAt(i++) & 255, r == 61) return f;
        r = t[r]
      } while (i < e && r == - 1);
      if (r == -1) break;
      f += String.fromCharCode((o & 15) << 4 | (r & 60) >> 2);
      do {
        if (u = n.charCodeAt(i++) & 255, u == 61) return f;
        u = t[u]
      } while (i < e && u == - 1);
      if (u == -1) break;
      f += String.fromCharCode((r & 3) << 6 | u)
    }
    return f
  }
  var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    t = [- 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
  window.btoa || (window.btoa = i),
    window.atob || (window.atob = r)
})(),
  Canvas2Image = function () {
    var f = !1,
      n = document.createElement("canvas");
    if (n.getContext("2d") && (f = !0), !f) return {
      saveAsBMP: function () { },
      saveAsPNG: function () { },
      saveAsJPEG: function () { }
    };
    var h = !!n.getContext("2d").getImageData,
      e = !!n.toDataURL,
      c = !!window.btoa,
      t = "image/octet-stream",
      l = function (n) {
        var t = parseInt(n.width),
          i = parseInt(n.height);
        return n.getContext("2d").getImageData(0, 0, t, i)
      },
      o = function (n) {
        var i = "",
          r, t;
        if (typeof n == "string") i = n;
        else for (r = n, t = 0; t < r.length; t++) i += String.fromCharCode(r[t]);
        return btoa(i)
      },
      a = function (n) {
        var i = [],
          s = n.width,
          c = n.height,
          r,
          t,
          u,
          f,
          e,
          y,
          l,
          h,
          a,
          v,
          w;
        for (i.push(66), i.push(77), r = s * c * 3 + 54, i.push(r % 256), r = Math.floor(r / 256), i.push(r % 256), r = Math.floor(r / 256), i.push(r % 256), r = Math.floor(r / 256), i.push(r % 256), i.push(0), i.push(0), i.push(0), i.push(0), i.push(54), i.push(0), i.push(0), i.push(0), t = [], t.push(40), t.push(0), t.push(0), t.push(0), u = s, t.push(u % 256), u = Math.floor(u / 256), t.push(u % 256), u = Math.floor(u / 256), t.push(u % 256), u = Math.floor(u / 256), t.push(u % 256), f = c, t.push(f % 256), f = Math.floor(f / 256), t.push(f % 256), f = Math.floor(f / 256), t.push(f % 256), f = Math.floor(f / 256), t.push(f % 256), t.push(1), t.push(0), t.push(24), t.push(0), t.push(0), t.push(0), t.push(0), t.push(0), e = s * c * 3, t.push(e % 256), e = Math.floor(e / 256), t.push(e % 256), e = Math.floor(e / 256), t.push(e % 256), e = Math.floor(e / 256), t.push(e % 256), y = 0; y < 16; y++) t.push(0);
        var d = (4 - s * 3 % 4) % 4,
          p = n.data,
          b = "",
          k = c;
        do {
          for (l = s * (k - 1) * 4, h = "", a = 0; a < s; a++) v = 4 * a, h += String.fromCharCode(p[l + v + 2]), h += String.fromCharCode(p[l + v + 1]), h += String.fromCharCode(p[l + v]);
          for (w = 0; w < d; w++) h += String.fromCharCode(0);
          b += h
        } while (--k);
        return o(i.concat(t)) + o(b)
      },
      i = function (n) {
        download(n)
        //document.location.href = n
      },
      s = function (n, t) {
        return "data:" + t + ";base64," + n
      },
      r = function (n) {
        var t = document.createElement("img");
        return t.src = n,
          t
      },
      u = function (n, t, i) {
        var r, u;
        return t && i ? (r = document.createElement("canvas"), r.width = t, r.height = i, r.style.width = t + "px", r.style.height = i + "px", u = r.getContext("2d"), u.drawImage(n, 0, 0, n.width, n.height, 0, 0, t, i), r) : n
      };
    return {
      saveAsPNG: function (n, f, o, s) {
        if (!e) return !1;
        var c = u(n, o, s),
          h = c.toDataURL("image/png");
        return f ? r(h) : (i(h.replace("image/png", t)), !0)
      },
      saveAsJPEG: function (n, f, o, s) {
        if (!e) return !1;
        var l = u(n, o, s),
          h = "image/jpeg",
          c = l.toDataURL(h);
        return c.indexOf(h) != 5 ? !1 : f ? r(c) : (i(c.replace(h, t)), !0)
      },
      saveAsBMP: function (n, f, e, o) {
        if (!(h && c)) return !1;
        var y = u(n, e, o),
          p = l(y),
          v = a(p);
        return f ? r(s(v, "image/bmp")) : (i(s(v, t)), !0)
      }
    }
  }(),
  function () {
    function et(t, i) {
      i.src ? n.ajax({
        url: i.src,
        async: !1,
        dataType: "script"
      }) : n.globalEval(i.text || i.textContent || i.innerHTML || ""),
        i.parentNode && i.parentNode.removeChild(i)
    }
    function f() {
      return + new Date
    }
    function s(t, i) {
      return t[0] && parseInt(n.curCSS(t[0], i, !0), 10) || 0
    }
    function l() {
      return !1
    }
    function a() {
      return !0
    }
    function d(t) {
      var u = RegExp("(^|\\.)" + t.type + "(\\.|$)"),
        r = !0,
        i = [];
      return n.each(n.data(this, "events").live || [],
        function (r, f) {
          if (u.test(f.type)) {
            var e = n(t.target).closest(f.data)[0];
            e && i.push({
              elem: e,
              fn: f
            })
          }
        }),
        i.sort(function (t, i) {
          return n.data(t.elem, "closest") - n.data(i.elem, "closest")
        }),
        n.each(i,
          function () {
            if (this.fn.call(this.elem, t, this.fn.data) === !1) return r = !1
          }),
        r
    }
    function g(n, t) {
      return ["live", n, t.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    function nt() {
      y || (y = !0, document.addEventListener ? document.addEventListener("DOMContentLoaded",
        function () {
          document.removeEventListener("DOMContentLoaded", arguments.callee, !1),
            n.ready()
        },
        !1) : document.attachEvent && (document.attachEvent("onreadystatechange",
          function () {
            document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), n.ready())
          }), document.documentElement.doScroll && i == i.top &&
          function () {
            if (!n.isReady) {
              try {
                document.documentElement.doScroll("left")
              } catch (t) {
                setTimeout(arguments.callee, 0);
                return
              }
              n.ready()
            }
          }()), n.event.add(i, "load", n.ready))
    }
    function e(t, i) {
      var r = {};
      return n.each(p.concat.apply([], p.slice(0, i)),
        function () {
          r[this] = t
        }),
        r
    }
    var i = this,
      t, it = i.jQuery,
      rt = i.$,
      n = i.jQuery = i.$ = function (t, i) {
        return new n.fn.init(t, i)
      },
      ut = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
      ft = /^.[^:#\[\.,]*$/,
      r,
      v,
      y,
      o,
      tt,
      h,
      c,
      p;
    n.fn = n.prototype = {
      init: function (t, i) {
        var r, u, f;
        if (t = t || document, t.nodeType) return this[0] = t,
          this.length = 1,
          this.context = t,
          this;
        if (typeof t == "string") if (r = ut.exec(t), r && (r[1] || !i)) if (r[1]) t = n.clean([r[1]], i);
        else return (u = document.getElementById(r[3]), u && u.id != r[3]) ? n().find(t) : (f = n(u || []), f.context = document, f.selector = t, f);
        else return n(i).find(t);
        else if (n.isFunction(t)) return n(document).ready(t);
        return t.selector && t.context && (this.selector = t.selector, this.context = t.context),
          this.setArray(n.isArray(t) ? t : n.makeArray(t))
      },
      selector: "",
      jquery: "1.3.2",
      size: function () {
        return this.length
      },
      get: function (n) {
        return n === t ? Array.prototype.slice.call(this) : this[n]
      },
      pushStack: function (t, i, r) {
        var u = n(t);
        return u.prevObject = this,
          u.context = this.context,
          i === "find" ? u.selector = this.selector + (this.selector ? " " : "") + r : i && (u.selector = this.selector + "." + i + "(" + r + ")"),
          u
      },
      setArray: function (n) {
        return this.length = 0,
          Array.prototype.push.apply(this, n),
          this
      },
      each: function (t, i) {
        return n.each(this, t, i)
      },
      index: function (t) {
        return n.inArray(t && t.jquery ? t[0] : t, this)
      },
      attr: function (i, r, u) {
        var f = i;
        if (typeof i == "string") {
          if (r === t) return this[0] && n[u || "attr"](this[0], i);
          f = {},
            f[i] = r
        }
        return this.each(function (t) {
          for (i in f) n.attr(u ? this.style : this, i, n.prop(this, f[i], u, t, i))
        })
      },
      css: function (n, i) {
        return (n == "width" || n == "height") && parseFloat(i) < 0 && (i = t),
          this.attr(n, i, "curCSS")
      },
      text: function (t) {
        if (typeof t != "object" && t != null) return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(t));
        var i = "";
        return n.each(t || this,
          function () {
            n.each(this.childNodes,
              function () {
                this.nodeType != 8 && (i += this.nodeType != 1 ? this.nodeValue : n.fn.text([this]))
              })
          }),
          i
      },
      wrapAll: function (t) {
        if (this[0]) {
          var i = n(t, this[0].ownerDocument).clone();
          this[0].parentNode && i.insertBefore(this[0]),
            i.map(function () {
              for (var n = this; n.firstChild;) n = n.firstChild;
              return n
            }).append(this)
        }
        return this
      },
      wrapInner: function (t) {
        return this.each(function () {
          n(this).contents().wrapAll(t)
        })
      },
      wrap: function (t) {
        return this.each(function () {
          n(this).wrapAll(t)
        })
      },
      append: function () {
        return this.domManip(arguments, !0,
          function (n) {
            this.nodeType == 1 && this.appendChild(n)
          })
      },
      prepend: function () {
        return this.domManip(arguments, !0,
          function (n) {
            this.nodeType == 1 && this.insertBefore(n, this.firstChild)
          })
      },
      before: function () {
        return this.domManip(arguments, !1,
          function (n) {
            this.parentNode.insertBefore(n, this)
          })
      },
      after: function () {
        return this.domManip(arguments, !1,
          function (n) {
            this.parentNode.insertBefore(n, this.nextSibling)
          })
      },
      end: function () {
        return this.prevObject || n([])
      },
      push: [].push,
      sort: [].sort,
      splice: [].splice,
      find: function (t) {
        if (this.length === 1) {
          var i = this.pushStack([], "find", t);
          return i.length = 0,
            n.find(t, this[0], i),
            i
        }
        return this.pushStack(n.unique(n.map(this,
          function (i) {
            return n.find(t, i)
          })), "find", t)
      },
      clone: function (t) {
        var u = this.map(function () {
          var t, i;
          return n.support.noCloneEvent || n.isXMLDoc(this) ? this.cloneNode(!0) : (t = this.outerHTML, t || (i = this.ownerDocument.createElement("div"), i.appendChild(this.cloneNode(!0)), t = i.innerHTML), n.clean([t.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0])
        }),
          r,
          i;
        return t === !0 && (r = this.find("*").andSelf(), i = 0, u.find("*").andSelf().each(function () {
          var t, u, f;
          if (this.nodeName === r[i].nodeName) {
            t = n.data(r[i], "events");
            for (u in t) for (f in t[u]) n.event.add(this, u, t[u][f], t[u][f].data);
            i++
          }
        })),
          u
      },
      filter: function (t) {
        return this.pushStack(n.isFunction(t) && n.grep(this,
          function (n, i) {
            return t.call(n, i)
          }) || n.multiFilter(t, n.grep(this,
            function (n) {
              return n.nodeType === 1
            })), "filter", t)
      },
      closest: function (t) {
        var i = n.expr.match.POS.test(t) ? n(t) : null,
          r = 0;
        return this.map(function () {
          for (var u = this; u && u.ownerDocument;) {
            if (i ? i.index(u) > -1 : n(u).is(t)) return n.data(u, "closest", r),
              u;
            u = u.parentNode,
              r++
          }
        })
      },
      not: function (i) {
        if (typeof i == "string") {
          if (ft.test(i)) return this.pushStack(n.multiFilter(i, this, !0), "not", i);
          i = n.multiFilter(i, this)
        }
        var r = i.length && i[i.length - 1] !== t && !i.nodeType;
        return this.filter(function () {
          return r ? n.inArray(this, i) < 0 : this != i
        })
      },
      add: function (t) {
        return this.pushStack(n.unique(n.merge(this.get(), typeof t == "string" ? n(t) : n.makeArray(t))))
      },
      is: function (t) {
        return !!t && n.multiFilter(t, this).length > 0
      },
      hasClass: function (n) {
        return !!n && this.is("." + n)
      },
      val: function (i) {
        var r, u, c, o;
        if (i === t) {
          if (r = this[0], r) {
            if (n.nodeName(r, "option")) return (r.attributes.value || {}).specified ? r.value : r.text;
            if (n.nodeName(r, "select")) {
              var f = r.selectedIndex,
                s = [],
                h = r.options,
                e = r.type == "select-one";
              if (f < 0) return null;
              for (u = e ? f : 0, c = e ? f + 1 : h.length; u < c; u++) if (o = h[u], o.selected) {
                if (i = n(o).val(), e) return i;
                s.push(i)
              }
              return s
            }
            return (r.value || "").replace(/\r/g, "")
          }
          return t
        }
        return typeof i == "number" && (i += ""),
          this.each(function () {
            if (this.nodeType == 1) if (n.isArray(i) && /radio|checkbox/.test(this.type)) this.checked = n.inArray(this.value, i) >= 0 || n.inArray(this.name, i) >= 0;
            else if (n.nodeName(this, "select")) {
              var t = n.makeArray(i);
              n("option", this).each(function () {
                this.selected = n.inArray(this.value, t) >= 0 || n.inArray(this.text, t) >= 0
              }),
                t.length || (this.selectedIndex = -1)
            } else this.value = i
          })
      },
      html: function (n) {
        return n === t ? this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null : this.empty().append(n)
      },
      replaceWith: function (n) {
        return this.after(n).remove()
      },
      eq: function (n) {
        return this.slice(n, +n + 1)
      },
      slice: function () {
        return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
      },
      map: function (t) {
        return this.pushStack(n.map(this,
          function (n, i) {
            return t.call(n, i, n)
          }))
      },
      andSelf: function () {
        return this.add(this.prevObject)
      },
      domManip: function (t, i, r) {
        function h(t, r) {
          return i && n.nodeName(t, "table") && n.nodeName(r, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }
        var u, s;
        if (this[0]) {
          var f = (this[0].ownerDocument || this[0]).createDocumentFragment(),
            e = n.clean(t, this[0].ownerDocument || this[0], f),
            o = f.firstChild;
          if (o) for (u = 0, s = this.length; u < s; u++) r.call(h(this[u], o), this.length > 1 || u > 0 ? f.cloneNode(!0) : f);
          e && n.each(e, et)
        }
        return this
      }
    },
      n.fn.init.prototype = n.fn,
      n.extend = n.fn.extend = function () {
        var i = arguments[0] || {},
          u = 1,
          s = arguments.length,
          e = !1,
          o,
          f,
          h,
          r;
        for (typeof i == "boolean" && (e = i, i = arguments[1] || {},
          u = 2), typeof i == "object" || n.isFunction(i) || (i = {}), s == u && (i = this, --u); u < s; u++) if ((o = arguments[u]) != null) for (f in o) (h = i[f], r = o[f], i !== r) && (e && r && typeof r == "object" && !r.nodeType ? i[f] = n.extend(e, h || (r.length != null ? [] : {}), r) : r !== t && (i[f] = r));
        return i
      };
    var ot = /z-?index|font-?weight|opacity|zoom|line-?height/i,
      w = document.defaultView || {},
      b = Object.prototype.toString;
    n.extend({
      noConflict: function (t) {
        return i.$ = rt,
          t && (i.jQuery = it),
          n
      },
      isFunction: function (n) {
        return b.call(n) === "[object Function]"
      },
      isArray: function (n) {
        return b.call(n) === "[object Array]"
      },
      isXMLDoc: function (t) {
        return t.nodeType === 9 && t.documentElement.nodeName !== "HTML" || !!t.ownerDocument && n.isXMLDoc(t.ownerDocument)
      },
      globalEval: function (t) {
        if (t && /\S/.test(t)) {
          var r = document.getElementsByTagName("head")[0] || document.documentElement,
            i = document.createElement("script");
          i.type = "text/javascript",
            n.support.scriptEval ? i.appendChild(document.createTextNode(t)) : i.text = t,
            r.insertBefore(i, r.firstChild),
            r.removeChild(i)
        }
      },
      nodeName: function (n, t) {
        return n.nodeName && n.nodeName.toUpperCase() == t.toUpperCase()
      },
      each: function (n, i, r) {
        var u, f = 0,
          e = n.length,
          o;
        if (r) {
          if (e === t) {
            for (u in n) if (i.apply(n[u], r) === !1) break
          } else for (; f < e;) if (i.apply(n[f++], r) === !1) break
        } else if (e === t) {
          for (u in n) if (i.call(n[u], u, n[u]) === !1) break
        } else for (o = n[0]; f < e && i.call(o, f, o) !== !1; o = n[++f]);
        return n
      },
      prop: function (t, i, r, u, f) {
        return n.isFunction(i) && (i = i.call(t, u)),
          typeof i == "number" && r == "curCSS" && !ot.test(f) ? i + "px" : i
      },
      className: {
        add: function (t, i) {
          n.each((i || "").split(/\s+/),
            function (i, r) {
              t.nodeType != 1 || n.className.has(t.className, r) || (t.className += (t.className ? " " : "") + r)
            })
        },
        remove: function (i, r) {
          i.nodeType == 1 && (i.className = r !== t ? n.grep(i.className.split(/\s+/),
            function (t) {
              return !n.className.has(r, t)
            }).join(" ") : "")
        },
        has: function (t, i) {
          return t && n.inArray(i, (t.className || t).toString().split(/\s+/)) > -1
        }
      },
      swap: function (n, t, i) {
        var u = {},
          r;
        for (r in t) u[r] = n.style[r],
          n.style[r] = t[r];
        i.call(n);
        for (r in t) n.style[r] = u[r]
      },
      css: function (t, i, r, u) {
        if (i == "width" || i == "height") {
          var f, o = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
          },
            s = i == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
          function e() {
          (f = i == "width" ? t.offsetWidth : t.offsetHeight, u !== "border") && n.each(s,
            function () {
              u || (f -= parseFloat(n.curCSS(t, "padding" + this, !0)) || 0),
                u === "margin" ? f += parseFloat(n.curCSS(t, "margin" + this, !0)) || 0 : f -= parseFloat(n.curCSS(t, "border" + this + "Width", !0)) || 0
            })
          }
          return t.offsetWidth !== 0 ? e() : n.swap(t, o, e),
            Math.max(0, Math.round(f))
        }
        return n.curCSS(t, i, r)
      },
      curCSS: function (t, i, r) {
        var u, f = t.style,
          e, s, h, c;
        return i == "opacity" && !n.support.opacity ? (u = n.attr(f, "opacity"), u == "" ? "1" : u) : (i.match(/float/i) && (i = o), !r && f && f[i] ? u = f[i] : w.getComputedStyle ? (i.match(/float/i) && (i = "float"), i = i.replace(/([A-Z])/g, "-$1").toLowerCase(), e = w.getComputedStyle(t, null), e && (u = e.getPropertyValue(i)), i == "opacity" && u == "" && (u = "1")) : t.currentStyle && (s = i.replace(/\-(\w)/g,
          function (n, t) {
            return t.toUpperCase()
          }), u = t.currentStyle[i] || t.currentStyle[s], !/^\d+(px)?$/i.test(u) && /^\d/.test(u) && (h = f.left, c = t.runtimeStyle.left, t.runtimeStyle.left = t.currentStyle.left, f.left = u || 0, u = f.pixelLeft + "px", f.left = h, t.runtimeStyle.left = c)), u)
      },
      clean: function (t, i, r) {
        var o, f;
        if (i = i || document, typeof i.createElement == "undefined" && (i = i.ownerDocument || i[0] && i[0].ownerDocument || document), !r && t.length === 1 && typeof t[0] == "string" && (o = /^<(\w+)\s*\/?>$/.exec(t[0]), o)) return [i.createElement(o[1])];
        var u = [],
          s = [],
          e = i.createElement("div");
        if (n.each(t,
          function (t, r) {
            var f, h, c, s, o;
            if (typeof r == "number" && (r += ""), r) {
              if (typeof r == "string") {
                for (r = r.replace(/(<(\w+)[^>]*?)\/>/g,
                  function (n, t, i) {
                    return i.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? n : t + "><\/" + i + ">"
                  }), f = r.replace(/^\s+/, "").substring(0, 10).toLowerCase(), h = !f.indexOf("<opt") && [1, "<select multiple='multiple'>", "<\/select>"] || !f.indexOf("<leg") && [1, "<fieldset>", "<\/fieldset>"] || f.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "<\/table>"] || !f.indexOf("<tr") && [2, "<table><tbody>", "<\/tbody><\/table>"] || (!f.indexOf("<td") || !f.indexOf("<th")) && [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"] || !f.indexOf("<col") && [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"] || !n.support.htmlSerialize && [1, "div<div>", "<\/div>"] || [0, "", ""], e.innerHTML = h[1] + r + h[2]; h[0]--;) e = e.lastChild;
                if (!n.support.tbody) for (c = /<tbody/i.test(r), s = !f.indexOf("<table") && !c ? e.firstChild && e.firstChild.childNodes : h[1] == "<table>" && !c ? e.childNodes : [], o = s.length - 1; o >= 0; --o) n.nodeName(s[o], "tbody") && !s[o].childNodes.length && s[o].parentNode.removeChild(s[o]); !n.support.leadingWhitespace && /^\s/.test(r) && e.insertBefore(i.createTextNode(r.match(/^\s*/)[0]), e.firstChild),
                  r = n.makeArray(e.childNodes)
              }
              r.nodeType ? u.push(r) : u = n.merge(u, r)
            }
          }), r) {
          for (f = 0; u[f]; f++) n.nodeName(u[f], "script") && (!u[f].type || u[f].type.toLowerCase() === "text/javascript") ? s.push(u[f].parentNode ? u[f].parentNode.removeChild(u[f]) : u[f]) : (u[f].nodeType === 1 && u.splice.apply(u, [f + 1, 0].concat(n.makeArray(u[f].getElementsByTagName("script")))), r.appendChild(u[f]));
          return s
        }
        return u
      },
      attr: function (i, r, u) {
        var f, e, s, o, h;
        if (!i || i.nodeType == 3 || i.nodeType == 8) return t;
        if (f = !n.isXMLDoc(i), e = u !== t, r = f && n.props[r] || r, i.tagName) {
          if (s = /href|src|style/.test(r), r == "selected" && i.parentNode && i.parentNode.selectedIndex, r in i && f && !s) {
            if (e) {
              if (r == "type" && n.nodeName(i, "input") && i.parentNode) throw "type property can't be changed";
              i[r] = u
            }
            return n.nodeName(i, "form") && i.getAttributeNode(r) ? i.getAttributeNode(r).nodeValue : r == "tabIndex" ? (o = i.getAttributeNode("tabIndex"), o && o.specified ? o.value : i.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : i.nodeName.match(/^(a|area)$/i) && i.href ? 0 : t) : i[r]
          }
          return !n.support.style && f && r == "style" ? n.attr(i.style, "cssText", u) : (e && i.setAttribute(r, "" + u), h = !n.support.hrefNormalized && f && s ? i.getAttribute(r, 2) : i.getAttribute(r), h === null ? t : h)
        }
        return !n.support.opacity && r == "opacity" ? (e && (i.zoom = 1, i.filter = (i.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(u) + "" == "NaN" ? "" : "alpha(opacity=" + u * 100 + ")")), i.filter && i.filter.indexOf("opacity=") >= 0 ? parseFloat(i.filter.match(/opacity=([^)]*)/)[1]) / 100 + "" : "") : (r = r.replace(/-([a-z])/ig,
          function (n, t) {
            return t.toUpperCase()
          }), e && (i[r] = u), i[r])
      },
      trim: function (n) {
        return (n || "").replace(/^\s+|\s+$/g, "")
      },
      makeArray: function (t) {
        var r = [],
          i;
        if (t != null) if (i = t.length, i == null || typeof t == "string" || n.isFunction(t) || t.setInterval) r[0] = t;
        else while (i) r[--i] = t[i];
        return r
      },
      inArray: function (n, t) {
        for (var i = 0,
          r = t.length; i < r; i++) if (t[i] === n) return i;
        return - 1
      },
      merge: function (t, i) {
        var u = 0,
          r, f = t.length;
        if (n.support.getAll) while ((r = i[u++]) != null) t[f++] = r;
        else while ((r = i[u++]) != null) r.nodeType != 8 && (t[f++] = r);
        return t
      },
      unique: function (t) {
        var r = [],
          f = {},
          i,
          e,
          u;
        try {
          for (i = 0, e = t.length; i < e; i++) u = n.data(t[i]),
            f[u] || (f[u] = !0, r.push(t[i]))
        } catch (o) {
          r = t
        }
        return r
      },
      grep: function (n, t, i) {
        for (var u = [], r = 0, f = n.length; r < f; r++) !i != !t(n[r], r) && u.push(n[r]);
        return u
      },
      map: function (n, t) {
        for (var r = [], u, i = 0, f = n.length; i < f; i++) u = t(n[i], i),
          u != null && (r[r.length] = u);
        return r.concat.apply([], r)
      }
    }),
      r = navigator.userAgent.toLowerCase(),
      n.browser = {
        version: (r.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(r),
        opera: /opera/.test(r),
        msie: /msie/.test(r) && !/opera/.test(r),
        mozilla: /mozilla/.test(r) && !/(compatible|webkit)/.test(r)
      },
      n.each({
        parent: function (n) {
          return n.parentNode
        },
        parents: function (t) {
          return n.dir(t, "parentNode")
        },
        next: function (t) {
          return n.nth(t, 2, "nextSibling")
        },
        prev: function (t) {
          return n.nth(t, 2, "previousSibling")
        },
        nextAll: function (t) {
          return n.dir(t, "nextSibling")
        },
        prevAll: function (t) {
          return n.dir(t, "previousSibling")
        },
        siblings: function (t) {
          return n.sibling(t.parentNode.firstChild, t)
        },
        children: function (t) {
          return n.sibling(t.firstChild)
        },
        contents: function (t) {
          return n.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : n.makeArray(t.childNodes)
        }
      },
        function (t, i) {
          n.fn[t] = function (r) {
            var u = n.map(this, i);
            return r && typeof r == "string" && (u = n.multiFilter(r, u)),
              this.pushStack(n.unique(u), t, r)
          }
        }),
      n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      },
        function (t, i) {
          n.fn[t] = function (r) {
            for (var f = [], o = n(r), e, u = 0, s = o.length; u < s; u++) e = (u > 0 ? this.clone(!0) : this).get(),
              n.fn[i].apply(n(o[u]), e),
              f = f.concat(e);
            return this.pushStack(f, t, r)
          }
        }),
      n.each({
        removeAttr: function (t) {
          n.attr(this, t, ""),
            this.nodeType == 1 && this.removeAttribute(t)
        },
        addClass: function (t) {
          n.className.add(this, t)
        },
        removeClass: function (t) {
          n.className.remove(this, t)
        },
        toggleClass: function (t, i) {
          typeof i != "boolean" && (i = !n.className.has(this, t)),
            n.className[i ? "add" : "remove"](this, t)
        },
        remove: function (t) {
        (!t || n.filter(t, [this]).length) && (n("*", this).add([this]).each(function () {
          n.event.remove(this),
            n.removeData(this)
        }), this.parentNode && this.parentNode.removeChild(this))
        },
        empty: function () {
          for (n(this).children().remove(); this.firstChild;) this.removeChild(this.firstChild)
        }
      },
        function (t, i) {
          n.fn[t] = function () {
            return this.each(i, arguments)
          }
        });
    var u = "jQuery" + f(),
      st = 0,
      k = {};
    n.extend({
      cache: {},
      data: function (r, f, e) {
        r = r == i ? k : r;
        var o = r[u];
        return o || (o = r[u] = ++st),
          f && !n.cache[o] && (n.cache[o] = {}),
          e !== t && (n.cache[o][f] = e),
          f ? n.cache[o][f] : o
      },
      removeData: function (t, r) {
        t = t == i ? k : t;
        var f = t[u];
        if (r) {
          if (n.cache[f]) {
            delete n.cache[f][r],
              r = "";
            for (r in n.cache[f]) break;
            r || n.removeData(t)
          }
        } else {
          try {
            delete t[u]
          } catch (e) {
            t.removeAttribute && t.removeAttribute(u)
          }
          delete n.cache[f]
        }
      },
      queue: function (t, i, r) {
        if (t) {
          i = (i || "fx") + "queue";
          var u = n.data(t, i); !u || n.isArray(r) ? u = n.data(t, i, n.makeArray(r)) : r && u.push(r)
        }
        return u
      },
      dequeue: function (i, r) {
        var f = n.queue(i, r),
          u = f.shift();
        r && r !== "fx" || (u = f[0]),
          u !== t && u.call(i)
      }
    }),
      n.fn.extend({
        data: function (i, r) {
          var u = i.split("."),
            f;
          return u[1] = u[1] ? "." + u[1] : "",
            r === t ? (f = this.triggerHandler("getData" + u[1] + "!", [u[0]]), f === t && this.length && (f = n.data(this[0], i)), f === t && u[1] ? this.data(u[0]) : f) : this.trigger("setData" + u[1] + "!", [u[0], r]).each(function () {
              n.data(this, i, r)
            })
        },
        removeData: function (t) {
          return this.each(function () {
            n.removeData(this, t)
          })
        },
        queue: function (i, r) {
          return (typeof i != "string" && (r = i, i = "fx"), r === t) ? n.queue(this[0], i) : this.each(function () {
            var t = n.queue(this, i, r);
            i == "fx" && t.length == 1 && t[0].call(this)
          })
        },
        dequeue: function (t) {
          return this.each(function () {
            n.dequeue(this, t)
          })
        }
      }),
      function () {
        function v(n, t, i, r, u, f) {
          for (var c = n == "previousSibling" && !f,
            e, s, o = 0,
            h = r.length; o < h; o++) if (e = r[o], e) {
              for (c && e.nodeType === 1 && (e.sizcache = i, e.sizset = o), e = e[n], s = !1; e;) {
                if (e.sizcache === i) {
                  s = r[e.sizset];
                  break
                }
                if (e.nodeType !== 1 || f || (e.sizcache = i, e.sizset = o), e.nodeName === t) {
                  s = e;
                  break
                }
                e = e[n]
              }
              r[o] = s
            }
        }
        function y(n, t, i, r, f, e) {
          for (var l = n == "previousSibling" && !e,
            o, h, s = 0,
            c = r.length; s < c; s++) if (o = r[s], o) {
              for (l && o.nodeType === 1 && (o.sizcache = i, o.sizset = s), o = o[n], h = !1; o;) {
                if (o.sizcache === i) {
                  h = r[o.sizset];
                  break
                }
                if (o.nodeType === 1) if (e || (o.sizcache = i, o.sizset = s), typeof t != "string") {
                  if (o === t) {
                    h = !0;
                    break
                  }
                } else if (u.filter(t, [o]).length > 0) {
                  h = o;
                  break
                }
                o = o[n]
              }
              r[s] = h
            }
        }
        var s = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
          h = 0,
          l = Object.prototype.toString,
          u = function (n, t, i, h) {
            var v, g, b, y, nt, tt, it, k, d, c;
            if (i = i || [], t = t || document, t.nodeType !== 1 && t.nodeType !== 9) return [];
            if (!n || typeof n != "string") return i;
            for (v = [], tt = !0, s.lastIndex = 0; (g = s.exec(n)) !== null;) if (v.push(g[1]), g[2]) {
              nt = RegExp.rightContext;
              break
            }
            if (v.length > 1 && a.exec(n)) if (v.length === 2 && r.relative[v[0]]) b = p(v[0] + v[1], t);
            else for (b = r.relative[v[0]] ? [t] : u(v.shift(), t); v.length;) n = v.shift(),
              r.relative[n] && (n += v.shift()),
              b = p(n, b);
            else for (it = h ? {
              expr: v.pop(),
              set: f(h)
            } : u.find(v.pop(), v.length === 1 && t.parentNode ? t.parentNode : t, e(t)), b = u.filter(it.expr, it.set), v.length > 0 ? y = f(b) : tt = !1; v.length;) k = v.pop(),
              d = k,
              r.relative[k] ? d = v.pop() : k = "",
              d == null && (d = t),
              r.relative[k](y, d, e(t));
            if (y || (y = b), !y) throw "Syntax error, unrecognized expression: " + (k || n);
            if (l.call(y) === "[object Array]") if (tt) if (t.nodeType === 1) for (c = 0; y[c] != null; c++) y[c] && (y[c] === !0 || y[c].nodeType === 1 && w(t, y[c])) && i.push(b[c]);
            else for (c = 0; y[c] != null; c++) y[c] && y[c].nodeType === 1 && i.push(b[c]);
            else i.push.apply(i, y);
            else f(y, i);
            if (nt && (u(nt, t, i, h), o && (hasDuplicate = !1, i.sort(o), hasDuplicate))) for (c = 1; c < i.length; c++) i[c] === i[c - 1] && i.splice(c--, 1);
            return i
          },
          r,
          a,
          c,
          f,
          o;
        u.matches = function (n, t) {
          return u(n, null, null, t)
        },
          u.find = function (n, t, i) {
            var u, e, h, o, f, s;
            if (!n) return [];
            for (e = 0, h = r.order.length; e < h; e++) if (o = r.order[e], (f = r.match[o].exec(n)) && (s = RegExp.leftContext, s.substr(s.length - 1) !== "\\" && (f[1] = (f[1] || "").replace(/\\/g, ""), u = r.find[o](f, t, i), u != null))) {
              n = n.replace(r.match[o], "");
              break
            }
            return u || (u = t.getElementsByTagName("*")),
              {
                set: u,
                expr: n
              }
          },
          u.filter = function (n, i, u, f) {
            for (var w = n,
              l = [], o = i, s, h, k = i && i[0] && e(i[0]), c, b, a, y, v, p; n && i.length;) {
              for (c in r.filter) if ((s = r.match[c].exec(n)) != null) {
                if (b = r.filter[c], h = !1, o == l && (l = []), r.preFilter[c]) if (s = r.preFilter[c](s, o, u, l, f, k), s) {
                  if (s === !0) continue
                } else h = a = !0;
                if (s) for (v = 0; (y = o[v]) != null; v++) y && (a = b(y, s, v, o), p = f ^ !!a, u && a != null ? p ? h = !0 : o[v] = !1 : p && (l.push(y), h = !0));
                if (a !== t) {
                  if (u || (o = l), n = n.replace(r.match[c], ""), !h) return [];
                  break
                }
              }
              if (n == w) if (h == null) throw "Syntax error, unrecognized expression: " + n;
              else break;
              w = n
            }
            return o
          },
          r = u.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
              ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
              CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
              NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
              ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
              TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
              CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
              POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
              PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
              "class": "className",
              "for": "htmlFor"
            },
            attrHandle: {
              href: function (n) {
                return n.getAttribute("href")
              }
            },
            relative: {
              "+": function (n, t, i) {
                var e = typeof t == "string",
                  o = e && !/\W/.test(t),
                  s = e && !o,
                  f,
                  h,
                  r;
                for (o && !i && (t = t.toUpperCase()), f = 0, h = n.length; f < h; f++) if (r = n[f]) {
                  while ((r = r.previousSibling) && r.nodeType !== 1);
                  n[f] = s || r && r.nodeName === t ? r || !1 : r === t
                }
                s && u.filter(t, n, !0)
              },
              ">": function (n, t, i) {
                var o = typeof t == "string",
                  s, r, e, f;
                if (o && !/\W/.test(t)) for (t = i ? t : t.toUpperCase(), r = 0, e = n.length; r < e; r++) f = n[r],
                  f && (s = f.parentNode, n[r] = s.nodeName === t ? s : !1);
                else {
                  for (r = 0, e = n.length; r < e; r++) f = n[r],
                    f && (n[r] = o ? f.parentNode : f.parentNode === t);
                  o && u.filter(t, n, !0)
                }
              },
              "": function (n, t, i) {
                var f = h++,
                  r = y,
                  u;
                t.match(/\W/) || (u = t = i ? t : t.toUpperCase(), r = v),
                  r("parentNode", t, f, n, u, i)
              },
              "~": function (n, t, i) {
                var f = h++,
                  r = y,
                  u;
                typeof t != "string" || t.match(/\W/) || (u = t = i ? t : t.toUpperCase(), r = v),
                  r("previousSibling", t, f, n, u, i)
              }
            },
            find: {
              ID: function (n, t, i) {
                if (typeof t.getElementById != "undefined" && !i) {
                  var r = t.getElementById(n[1]);
                  return r ? [r] : []
                }
              },
              NAME: function (n, t) {
                var r, u, i, f;
                if (typeof t.getElementsByName != "undefined") {
                  for (r = [], u = t.getElementsByName(n[1]), i = 0, f = u.length; i < f; i++) u[i].getAttribute("name") === n[1] && r.push(u[i]);
                  return r.length === 0 ? null : r
                }
              },
              TAG: function (n, t) {
                return t.getElementsByTagName(n[1])
              }
            },
            preFilter: {
              CLASS: function (n, t, i, r, u, f) {
                if (n = " " + n[1].replace(/\\/g, "") + " ", f) return n;
                for (var o = 0,
                  e; (e = t[o]) != null; o++) e && (u ^ (e.className && (" " + e.className + " ").indexOf(n) >= 0) ? i || r.push(e) : i && (t[o] = !1));
                return !1
              },
              ID: function (n) {
                return n[1].replace(/\\/g, "")
              },
              TAG: function (n, t) {
                for (var i = 0; t[i] === !1; i++);
                return t[i] && e(t[i]) ? n[1] : n[1].toUpperCase()
              },
              CHILD: function (n) {
                if (n[1] == "nth") {
                  var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(n[2] == "even" && "2n" || n[2] == "odd" && "2n+1" || !/\D/.test(n[2]) && "0n+" + n[2] || n[2]);
                  n[2] = t[1] + (t[2] || 1) - 0,
                    n[3] = t[3] - 0
                }
                return n[0] = h++ ,
                  n
              },
              ATTR: function (n, t, i, u, f, e) {
                var o = n[1].replace(/\\/g, "");
                return !e && r.attrMap[o] && (n[1] = r.attrMap[o]),
                  n[2] === "~=" && (n[4] = " " + n[4] + " "),
                  n
              },
              PSEUDO: function (n, t, i, f, e) {
                if (n[1] === "not") if (n[3].match(s).length > 1 || /^\w/.test(n[3])) n[3] = u(n[3], null, null, t);
                else {
                  var o = u.filter(n[3], t, i, !0 ^ e);
                  return i || f.push.apply(f, o),
                    !1
                } else if (r.match.POS.test(n[0]) || r.match.CHILD.test(n[0])) return !0;
                return n
              },
              POS: function (n) {
                return n.unshift(!0),
                  n
              }
            },
            filters: {
              enabled: function (n) {
                return n.disabled === !1 && n.type !== "hidden"
              },
              disabled: function (n) {
                return n.disabled === !0
              },
              checked: function (n) {
                return n.checked === !0
              },
              selected: function (n) {
                return n.parentNode.selectedIndex,
                  n.selected === !0
              },
              parent: function (n) {
                return !!n.firstChild
              },
              empty: function (n) {
                return !n.firstChild
              },
              has: function (n, t, i) {
                return !!u(i[3], n).length
              },
              header: function (n) {
                return /h\d/i.test(n.nodeName)
              },
              text: function (n) {
                return "text" === n.type
              },
              radio: function (n) {
                return "radio" === n.type
              },
              checkbox: function (n) {
                return "checkbox" === n.type
              },
              file: function (n) {
                return "file" === n.type
              },
              password: function (n) {
                return "password" === n.type
              },
              submit: function (n) {
                return "submit" === n.type
              },
              image: function (n) {
                return "image" === n.type
              },
              reset: function (n) {
                return "reset" === n.type
              },
              button: function (n) {
                return "button" === n.type || n.nodeName.toUpperCase() === "BUTTON"
              },
              input: function (n) {
                return /input|select|textarea|button/i.test(n.nodeName)
              }
            },
            setFilters: {
              first: function (n, t) {
                return t === 0
              },
              last: function (n, t, i, r) {
                return t === r.length - 1
              },
              even: function (n, t) {
                return t % 2 == 0
              },
              odd: function (n, t) {
                return t % 2 == 1
              },
              lt: function (n, t, i) {
                return t < i[3] - 0
              },
              gt: function (n, t, i) {
                return t > i[3] - 0
              },
              nth: function (n, t, i) {
                return i[3] - 0 == t
              },
              eq: function (n, t, i) {
                return i[3] - 0 == t
              }
            },
            filter: {
              PSEUDO: function (n, t, i, u) {
                var f = t[1],
                  o = r.filters[f],
                  e,
                  i,
                  s;
                if (o) return o(n, i, t, u);
                if (f === "contains") return (n.textContent || n.innerText || "").indexOf(t[3]) >= 0;
                if (f === "not") {
                  for (e = t[3], i = 0, s = e.length; i < s; i++) if (e[i] === n) return !1;
                  return !0
                }
              },
              CHILD: function (n, t) {
                var s = t[1],
                  i = n,
                  r,
                  e,
                  o,
                  u,
                  h,
                  f;
                switch (s) {
                  case "only":
                  case "first":
                    while (i = i.previousSibling) if (i.nodeType === 1) return !1;
                    if (s == "first") return !0;
                    i = n;
                  case "last":
                    while (i = i.nextSibling) if (i.nodeType === 1) return !1;
                    return !0;
                  case "nth":
                    if (r = t[2], e = t[3], r == 1 && e == 0) return !0;
                    if (o = t[0], u = n.parentNode, u && (u.sizcache !== o || !n.nodeIndex)) {
                      for (h = 0, i = u.firstChild; i; i = i.nextSibling) i.nodeType === 1 && (i.nodeIndex = ++h);
                      u.sizcache = o
                    }
                    return f = n.nodeIndex - e,
                      r == 0 ? f == 0 : f % r == 0 && f / r >= 0
                }
              },
              ID: function (n, t) {
                return n.nodeType === 1 && n.getAttribute("id") === t
              },
              TAG: function (n, t) {
                return t === "*" && n.nodeType === 1 || n.nodeName === t
              },
              CLASS: function (n, t) {
                return (" " + (n.className || n.getAttribute("class")) + " ").indexOf(t) > -1
              },
              ATTR: function (n, t) {
                var e = t[1],
                  o = r.attrHandle[e] ? r.attrHandle[e](n) : n[e] != null ? n[e] : n.getAttribute(e),
                  u = o + "",
                  f = t[2],
                  i = t[4];
                return o == null ? f === "!=" : f === "=" ? u === i : f === "*=" ? u.indexOf(i) >= 0 : f === "~=" ? (" " + u + " ").indexOf(i) >= 0 : i ? f === "!=" ? u != i : f === "^=" ? u.indexOf(i) === 0 : f === "$=" ? u.substr(u.length - i.length) === i : f === "|=" ? u === i || u.substr(0, i.length + 1) === i + "-" : !1 : u && o !== !1
              },
              POS: function (n, t, i, u) {
                var e = t[2],
                  f = r.setFilters[e];
                if (f) return f(n, i, t, u)
              }
            }
          },
          a = r.match.POS;
        for (c in r.match) r.match[c] = RegExp(r.match[c].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        f = function (n, t) {
          return (n = Array.prototype.slice.call(n), t) ? (t.push.apply(t, n), t) : n
        };
        try {
          Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (b) {
          f = function (n, t) {
            var r = t || [],
              u,
              i;
            if (l.call(n) === "[object Array]") Array.prototype.push.apply(r, n);
            else if (typeof n.length == "number") for (i = 0, u = n.length; i < u; i++) r.push(n[i]);
            else for (i = 0; n[i]; i++) r.push(n[i]);
            return r
          }
        }
        document.documentElement.compareDocumentPosition ? o = function (n, t) {
          var i = n.compareDocumentPosition(t) & 4 ? -1 : n === t ? 0 : 1;
          return i === 0 && (hasDuplicate = !0),
            i
        } : "sourceIndex" in document.documentElement ? o = function (n, t) {
          var i = n.sourceIndex - t.sourceIndex;
          return i === 0 && (hasDuplicate = !0),
            i
        } : document.createRange && (o = function (n, t) {
          var i = n.ownerDocument.createRange(),
            r = t.ownerDocument.createRange(),
            u;
          return i.selectNode(n),
            i.collapse(!0),
            r.selectNode(t),
            r.collapse(!0),
            u = i.compareBoundaryPoints(Range.START_TO_END, r),
            u === 0 && (hasDuplicate = !0),
            u
        }),
          function () {
            var i = document.createElement("form"),
              u = "script" + (new Date).getTime(),
              n;
            i.innerHTML = "<input name='" + u + "'/>",
              n = document.documentElement,
              n.insertBefore(i, n.firstChild),
              !document.getElementById(u) || (r.find.ID = function (n, i, r) {
                if (typeof i.getElementById != "undefined" && !r) {
                  var u = i.getElementById(n[1]);
                  return u ? u.id === n[1] || typeof u.getAttributeNode != "undefined" && u.getAttributeNode("id").nodeValue === n[1] ? [u] : t : []
                }
              },
                r.filter.ID = function (n, t) {
                  var i = typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id");
                  return n.nodeType === 1 && i && i.nodeValue === t
                }),
              n.removeChild(i)
          }(),
          function () {
            var n = document.createElement("div");
            n.appendChild(document.createComment("")),
              n.getElementsByTagName("*").length > 0 && (r.find.TAG = function (n, t) {
                var i = t.getElementsByTagName(n[1]),
                  u,
                  r;
                if (n[1] === "*") {
                  for (u = [], r = 0; i[r]; r++) i[r].nodeType === 1 && u.push(i[r]);
                  i = u
                }
                return i
              }),
              n.innerHTML = "<a href='#'><\/a>",
              n.firstChild && typeof n.firstChild.getAttribute != "undefined" && n.firstChild.getAttribute("href") !== "#" && (r.attrHandle.href = function (n) {
                return n.getAttribute("href", 2)
              })
          }(),
          document.querySelectorAll &&
          function () {
            var n = u,
              t = document.createElement("div"); (t.innerHTML = "<p class='TEST'><\/p>", t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) || (u = function (t, i, r, u) {
                if (i = i || document, !u && i.nodeType === 9 && !e(i)) try {
                  return f(i.querySelectorAll(t), r)
                } catch (o) { }
                return n(t, i, r, u)
              },
                u.find = n.find, u.filter = n.filter, u.selectors = n.selectors, u.matches = n.matches)
          }(),
          document.getElementsByClassName && document.documentElement.getElementsByClassName &&
          function () {
            var n = document.createElement("div"); (n.innerHTML = "<div class='test e'><\/div><div class='test'><\/div>", n.getElementsByClassName("e").length !== 0) && (n.lastChild.className = "e", n.getElementsByClassName("e").length !== 1) && (r.order.splice(1, 0, "CLASS"), r.find.CLASS = function (n, t, i) {
              if (typeof t.getElementsByClassName != "undefined" && !i) return t.getElementsByClassName(n[1])
            })
          }();
        var w = document.compareDocumentPosition ?
          function (n, t) {
            return n.compareDocumentPosition(t) & 16
          } : function (n, t) {
            return n !== t && (n.contains ? n.contains(t) : !0)
          },
          e = function (n) {
            return n.nodeType === 9 && n.documentElement.nodeName !== "HTML" || !!n.ownerDocument && e(n.ownerDocument)
          },
          p = function (n, t) {
            for (var f = [], e = "", o, s = t.nodeType ? [t] : t, i, h; o = r.match.PSEUDO.exec(n);) e += o[0],
              n = n.replace(r.match.PSEUDO, "");
            for (n = r.relative[n] ? n + "*" : n, i = 0, h = s.length; i < h; i++) u(n, s[i], f);
            return u.filter(e, f)
          };
        n.find = u,
          n.filter = u.filter,
          n.expr = u.selectors,
          n.expr[":"] = n.expr.filters,
          u.selectors.filters.hidden = function (n) {
            return n.offsetWidth === 0 || n.offsetHeight === 0
          },
          u.selectors.filters.visible = function (n) {
            return n.offsetWidth > 0 || n.offsetHeight > 0
          },
          u.selectors.filters.animated = function (t) {
            return n.grep(n.timers,
              function (n) {
                return t === n.elem
              }).length
          },
          n.multiFilter = function (n, t, i) {
            return i && (n = ":not(" + n + ")"),
              u.matches(n, t)
          },
          n.dir = function (n, t) {
            for (var r = [], i = n[t]; i && i != document;) i.nodeType == 1 && r.push(i),
              i = i[t];
            return r
          },
          n.nth = function (n, t, i) {
            t = t || 1;
            for (var r = 0; n; n = n[i]) if (n.nodeType == 1 && ++r == t) break;
            return n
          },
          n.sibling = function (n, t) {
            for (var i = []; n; n = n.nextSibling) n.nodeType == 1 && n != t && i.push(n);
            return i
          };
        return
      }(),
      n.event = {
        add: function (r, u, f, e) {
          var h, s, o;
          r.nodeType != 3 && r.nodeType != 8 && (r.setInterval && r != i && (r = i), f.guid || (f.guid = this.guid++), e !== t && (h = f, f = this.proxy(h), f.data = e), s = n.data(r, "events") || n.data(r, "events", {}), o = n.data(r, "handle") || n.data(r, "handle",
            function () {
              return typeof n != "undefined" && !n.event.triggered ? n.event.handle.apply(arguments.callee.elem, arguments) : t
            }), o.elem = r, n.each(u.split(/\s+/),
              function (t, i) {
                var u = i.split("."),
                  h;
                i = u.shift(),
                  f.type = u.slice().sort().join("."),
                  h = s[i],
                  n.event.specialAll[i] && n.event.specialAll[i].setup.call(r, e, u),
                  h || (h = s[i] = {},
                    n.event.special[i] && n.event.special[i].setup.call(r, e, u) !== !1 || (r.addEventListener ? r.addEventListener(i, o, !1) : r.attachEvent && r.attachEvent("on" + i, o))),
                  h[f.guid] = f,
                  n.event.global[i] = !0
              }), r = null)
        },
        guid: 1,
        global: {},
        remove: function (i, r, u) {
          var f, e, s, o;
          if (i.nodeType != 3 && i.nodeType != 8 && (f = n.data(i, "events"), f)) {
            if (r === t || typeof r == "string" && r.charAt(0) == ".") for (s in f) this.remove(i, s + (r || ""));
            else r.type && (u = r.handler, r = r.type),
              n.each(r.split(/\s+/),
                function (t, r) {
                  var o = r.split("."),
                    h,
                    s;
                  if (r = o.shift(), h = RegExp("(^|\\.)" + o.slice().sort().join(".*\\.") + "(\\.|$)"), f[r]) {
                    if (u) delete f[r][u.guid];
                    else for (s in f[r]) h.test(f[r][s].type) && delete f[r][s];
                    n.event.specialAll[r] && n.event.specialAll[r].teardown.call(i, o);
                    for (e in f[r]) break;
                    e || (n.event.special[r] && n.event.special[r].teardown.call(i, o) !== !1 || (i.removeEventListener ? i.removeEventListener(r, n.data(i, "handle"), !1) : i.detachEvent && i.detachEvent("on" + r, n.data(i, "handle"))), e = null, delete f[r])
                  }
                });
            for (e in f) break;
            e || (o = n.data(i, "handle"), o && (o.elem = null), n.removeData(i, "events"), n.removeData(i, "handle"))
          }
        },
        trigger: function (i, r, f, e) {
          var o = i.type || i,
            s, h;
          if (!e) {
            if (i = typeof i == "object" ? i[u] ? i : n.extend(n.Event(o), i) : n.Event(o), o.indexOf("!") >= 0 && (i.type = o = o.slice(0, -1), i.exclusive = !0), f || (i.stopPropagation(), this.global[o] && n.each(n.cache,
              function () {
                this.events && this.events[o] && n.event.trigger(i, r, this.handle.elem)
              })), !f || f.nodeType == 3 || f.nodeType == 8) return t;
            i.result = t,
              i.target = f,
              r = n.makeArray(r),
              r.unshift(i)
          }
          if (i.currentTarget = f, s = n.data(f, "handle"), s && s.apply(f, r), (!f[o] || n.nodeName(f, "a") && o == "click") && f["on" + o] && f["on" + o].apply(f, r) === !1 && (i.result = !1), !e && f[o] && !i.isDefaultPrevented() && !(n.nodeName(f, "a") && o == "click")) {
            this.triggered = !0;
            try {
              f[o]()
            } catch (c) { }
          }
          this.triggered = !1,
            i.isPropagationStopped() || (h = f.parentNode || f.ownerDocument, h && n.event.trigger(i, r, h, !0))
        },
        handle: function (r) {
          var s, o, f, h, c, u, e;
          r = arguments[0] = n.event.fix(r || i.event),
            r.currentTarget = this,
            f = r.type.split("."),
            r.type = f.shift(),
            s = !f.length && !r.exclusive,
            h = RegExp("(^|\\.)" + f.slice().sort().join(".*\\.") + "(\\.|$)"),
            o = (n.data(this, "events") || {})[r.type];
          for (c in o) if (u = o[c], (s || h.test(u.type)) && (r.handler = u, r.data = u.data, e = u.apply(this, arguments), e !== t && (r.result = e, e === !1 && (r.preventDefault(), r.stopPropagation())), r.isImmediatePropagationStopped())) break
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (t) {
          var f, e, o, i, r;
          if (t[u]) return t;
          for (f = t, t = n.Event(f), e = this.props.length; e;) o = this.props[--e],
            t[o] = f[o];
          return t.target || (t.target = t.srcElement || document),
            t.target.nodeType == 3 && (t.target = t.target.parentNode),
            !t.relatedTarget && t.fromElement && (t.relatedTarget = t.fromElement == t.target ? t.toElement : t.fromElement),
            t.pageX == null && t.clientX != null && (i = document.documentElement, r = document.body, t.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i.clientLeft || 0), t.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i.clientTop || 0)),
            !t.which && (t.charCode || t.charCode === 0 ? t.charCode : t.keyCode) && (t.which = t.charCode || t.keyCode),
            !t.metaKey && t.ctrlKey && (t.metaKey = t.ctrlKey),
            !t.which && t.button && (t.which = t.button & 1 ? 1 : t.button & 2 ? 3 : t.button & 4 ? 2 : 0),
            t
        },
        proxy: function (n, t) {
          return t = t ||
            function () {
              return n.apply(this, arguments)
            },
            t.guid = n.guid = n.guid || t.guid || this.guid++ ,
            t
        },
        special: {
          ready: {
            setup: nt,
            teardown: function () { }
          }
        },
        specialAll: {
          live: {
            setup: function (t, i) {
              n.event.add(this, i[0], d)
            },
            teardown: function (t) {
              if (t.length) {
                var i = 0,
                  r = RegExp("(^|\\.)" + t[0] + "(\\.|$)");
                n.each(n.data(this, "events").live || {},
                  function () {
                    r.test(this.type) && i++
                  }),
                  i < 1 && n.event.remove(this, t[0], d)
              }
            }
          }
        }
      },
      n.Event = function (t) {
        if (!this.preventDefault) return new n.Event(t);
        t && t.type ? (this.originalEvent = t, this.type = t.type) : this.type = t,
          this.timeStamp = f(),
          this[u] = !0
      },
      n.Event.prototype = {
        preventDefault: function () {
          this.isDefaultPrevented = a;
          var n = this.originalEvent;
          n && (n.preventDefault && n.preventDefault(), n.returnValue = !1)
        },
        stopPropagation: function () {
          this.isPropagationStopped = a;
          var n = this.originalEvent;
          n && (n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
          this.isImmediatePropagationStopped = a,
            this.stopPropagation()
        },
        isDefaultPrevented: l,
        isPropagationStopped: l,
        isImmediatePropagationStopped: l
      },
      v = function (t) {
        for (var i = t.relatedTarget; i && i != this;) try {
          i = i.parentNode
        } catch (r) {
          i = this
        }
        i != this && (t.type = t.data, n.event.handle.apply(this, arguments))
      },
      n.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
      },
        function (t, i) {
          n.event.special[i] = {
            setup: function () {
              n.event.add(this, t, v, i)
            },
            teardown: function () {
              n.event.remove(this, t, v)
            }
          }
        }),
      n.fn.extend({
        bind: function (t, i, r) {
          return t == "unload" ? this.one(t, i, r) : this.each(function () {
            n.event.add(this, t, r || i, r && i)
          })
        },
        one: function (t, i, r) {
          var u = n.event.proxy(r || i,
            function (t) {
              return n(this).unbind(t, u),
                (r || i).apply(this, arguments)
            });
          return this.each(function () {
            n.event.add(this, t, u, r && i)
          })
        },
        unbind: function (t, i) {
          return this.each(function () {
            n.event.remove(this, t, i)
          })
        },
        trigger: function (t, i) {
          return this.each(function () {
            n.event.trigger(t, i, this)
          })
        },
        triggerHandler: function (t, i) {
          if (this[0]) {
            var r = n.Event(t);
            return r.preventDefault(),
              r.stopPropagation(),
              n.event.trigger(r, i, this[0]),
              r.result
          }
        },
        toggle: function (t) {
          for (var i = arguments,
            r = 1; r < i.length;) n.event.proxy(t, i[r++]);
          return this.click(n.event.proxy(t,
            function (n) {
              return this.lastToggle = (this.lastToggle || 0) % r,
                n.preventDefault(),
                i[this.lastToggle++].apply(this, arguments) || !1
            }))
        },
        hover: function (n, t) {
          return this.mouseenter(n).mouseleave(t)
        },
        ready: function (t) {
          return nt(),
            n.isReady ? t.call(document, n) : n.readyList.push(t),
            this
        },
        live: function (t, i) {
          var r = n.event.proxy(i);
          return r.guid += this.selector + t,
            n(document).bind(g(t, this.selector), this.selector, r),
            this
        },
        die: function (t, i) {
          return n(document).unbind(g(t, this.selector), i ? {
            guid: i.guid + this.selector + t
          } : null),
            this
        }
      }),
      n.extend({
        isReady: !1,
        readyList: [],
        ready: function () {
          n.isReady || (n.isReady = !0, n.readyList && (n.each(n.readyList,
            function () {
              this.call(document, n)
            }), n.readyList = null), n(document).triggerHandler("ready"))
        }
      }),
      y = !1,
      n.each("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error".split(","),
        function (t, i) {
          n.fn[i] = function (n) {
            return n ? this.bind(i, n) : this.trigger(i)
          }
        }),
      n(i).bind("unload",
        function () {
          for (var t in n.cache) t != 1 && n.cache[t].handle && n.event.remove(n.cache[t].handle.elem)
        }),
      function () {
        var o, r;
        n.support = {};
        var f = document.documentElement,
          u = document.createElement("script"),
          t = document.createElement("div"),
          e = "script" + (new Date).getTime();
        if (t.style.display = "none", t.innerHTML = '   <link/><table><\/table><a href="/a" style="color:red;float:left;opacity:.5;">a<\/a><select><option>text<\/option><\/select><object><param/><\/object>', o = t.getElementsByTagName("*"), r = t.getElementsByTagName("a")[0], o && o.length && r) {
          n.support = {
            leadingWhitespace: t.firstChild.nodeType == 3,
            tbody: !t.getElementsByTagName("tbody").length,
            objectAll: !!t.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!t.getElementsByTagName("link").length,
            style: /red/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: r.style.opacity === "0.5",
            cssFloat: !!r.style.cssFloat,
            scriptEval: !1,
            noCloneEvent: !0,
            boxModel: null
          },
            u.type = "text/javascript";
          try {
            u.appendChild(document.createTextNode("window." + e + "=1;"))
          } catch (s) { }
          f.insertBefore(u, f.firstChild),
            i[e] && (n.support.scriptEval = !0, delete i[e]),
            f.removeChild(u),
            t.attachEvent && t.fireEvent && (t.attachEvent("onclick",
              function () {
                n.support.noCloneEvent = !1,
                  t.detachEvent("onclick", arguments.callee)
              }), t.cloneNode(!0).fireEvent("onclick")),
            n(function () {
              var t = document.createElement("div");
              t.style.width = t.style.paddingLeft = "1px",
                document.body.appendChild(t),
                n.boxModel = n.support.boxModel = t.offsetWidth === 2,
                document.body.removeChild(t).style.display = "none"
            })
        }
      }(),
      o = n.support.cssFloat ? "cssFloat" : "styleFloat",
      n.props = {
        "for": "htmlFor",
        "class": "className",
        float: o,
        cssFloat: o,
        styleFloat: o,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
      },
      n.fn.extend({
        _load: n.fn.load,
        load: function (t, i, r) {
          var u, f, e, o;
          return typeof t != "string" ? this._load(t) : (u = t.indexOf(" "), u >= 0 && (f = t.slice(u, t.length), t = t.slice(0, u)), e = "GET", i && (n.isFunction(i) ? (r = i, i = null) : typeof i == "object" && (i = n.param(i), e = "POST")), o = this, n.ajax({
            url: t,
            type: e,
            dataType: "html",
            data: i,
            complete: function (t, i) {
            (i == "success" || i == "notmodified") && o.html(f ? n("<div/>").append(t.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(f) : t.responseText),
              r && o.each(r, [t.responseText, i, t])
            }
          }), this)
        },
        serialize: function () {
          return n.param(this.serializeArray())
        },
        serializeArray: function () {
          return this.map(function () {
            return this.elements ? n.makeArray(this.elements) : this
          }).filter(function () {
            return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
          }).map(function (t, i) {
            var r = n(this).val();
            return r == null ? null : n.isArray(r) ? n.map(r,
              function (n) {
                return {
                  name: i.name,
                  value: n
                }
              }) : {
                name: i.name,
                value: r
              }
          }).get()
        }
      }),
      n.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
        function (t, i) {
          n.fn[i] = function (n) {
            return this.bind(i, n)
          }
        }),
      tt = f(),
      n.extend({
        get: function (t, i, r, u) {
          return n.isFunction(i) && (r = i, i = null),
            n.ajax({
              type: "GET",
              url: t,
              data: i,
              success: r,
              dataType: u
            })
        },
        getScript: function (t, i) {
          return n.get(t, null, i, "script")
        },
        getJSON: function (t, i, r) {
          return n.get(t, i, r, "json")
        },
        post: function (t, i, r, u) {
          return n.isFunction(i) && (r = i, i = {}),
            n.ajax({
              type: "POST",
              url: t,
              data: i,
              success: r,
              dataType: u
            })
        },
        ajaxSetup: function (t) {
          n.extend(n.ajaxSettings, t)
        },
        ajaxSettings: {
          url: location.href,
          global: !0,
          type: "GET",
          contentType: "application/x-www-form-urlencoded",
          processData: !0,
          async: !0,
          xhr: function () {
            return i.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
          },
          accepts: {
            xml: "application/xml, text/xml",
            html: "text/html",
            script: "text/javascript, application/javascript",
            json: "application/json, text/javascript",
            text: "text/plain",
            _default: "*/*"
          }
        },
        lastModified: {},
        ajax: function (r) {
          function g() {
            r.success && r.success(w, h),
              r.global && n.event.trigger("ajaxSuccess", [u, r])
          }
          function nt() {
            r.complete && r.complete(u, h),
              r.global && n.event.trigger("ajaxComplete", [u, r]),
              r.global && !--n.active && n.event.trigger("ajaxStop")
          }
          var o, s, h, w, c, b, k, a, v, e, d, y, u, p, l;
          if (r = n.extend(!0, r, n.extend(!0, {},
            n.ajaxSettings, r)), s = /=\?(&|$)/g, c = r.type.toUpperCase(), r.data && r.processData && typeof r.data != "string" && (r.data = n.param(r.data)), r.dataType == "jsonp" && (c == "GET" ? r.url.match(s) || (r.url += (r.url.match(/\?/) ? "&" : "?") + (r.jsonp || "callback") + "=?") : r.data && r.data.match(s) || (r.data = (r.data ? r.data + "&" : "") + (r.jsonp || "callback") + "=?"), r.dataType = "json"), r.dataType == "json" && (r.data && r.data.match(s) || r.url.match(s)) && (o = "jsonp" + tt++ , r.data && (r.data = (r.data + "").replace(s, "=" + o + "$1")), r.url = r.url.replace(s, "=" + o + "$1"), r.dataType = "script", i[o] = function (n) {
              w = n,
                g(),
                nt(),
                i[o] = t;
              try {
                delete i[o]
              } catch (r) { }
              v && v.removeChild(e)
            }), r.dataType == "script" && r.cache == null && (r.cache = !1), r.cache === !1 && c == "GET" && (b = f(), k = r.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + b + "$2"), r.url = k + (k == r.url ? (r.url.match(/\?/) ? "&" : "?") + "_=" + b : "")), r.data && c == "GET" && (r.url += (r.url.match(/\?/) ? "&" : "?") + r.data, r.data = null), r.global && !n.active++ && n.event.trigger("ajaxStart"), a = /^(\w+:)?\/\/([^\/?#]+)/.exec(r.url), r.dataType == "script" && c == "GET" && a && (a[1] && a[1] != location.protocol || a[2] != location.host)) return v = document.getElementsByTagName("head")[0],
              e = document.createElement("script"),
              e.src = r.url,
              r.scriptCharset && (e.charset = r.scriptCharset),
              o || (d = !1, e.onload = e.onreadystatechange = function () {
                d || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (d = !0, g(), nt(), e.onload = e.onreadystatechange = null, v.removeChild(e))
              }),
              v.appendChild(e),
              t;
          y = !1,
            u = r.xhr(),
            r.username ? u.open(c, r.url, r.async, r.username, r.password) : u.open(c, r.url, r.async);
          try {
            r.data && u.setRequestHeader("Content-Type", r.contentType),
              r.ifModified && u.setRequestHeader("If-Modified-Since", n.lastModified[r.url] || "Thu, 01 Jan 1970 00:00:00 GMT"),
              u.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              u.setRequestHeader("Accept", r.dataType && r.accepts[r.dataType] ? r.accepts[r.dataType] + ", */*" : r.accepts._default)
          } catch (it) { }
          if (r.beforeSend && r.beforeSend(u, r) === !1) return r.global && !--n.active && n.event.trigger("ajaxStop"),
            u.abort(),
            !1;
          r.global && n.event.trigger("ajaxSend", [u, r]),
            p = function (t) {
              if (u.readyState == 0) l && (clearInterval(l), l = null, r.global && !--n.active && n.event.trigger("ajaxStop"));
              else if (!y && u && (u.readyState == 4 || t == "timeout")) {
                if (y = !0, l && (clearInterval(l), l = null), h = t == "timeout" ? "timeout" : n.httpSuccess(u) ? r.ifModified && n.httpNotModified(u, r.url) ? "notmodified" : "success" : "error", h == "success") try {
                  w = n.httpData(u, r.dataType, r)
                } catch (f) {
                  h = "parsererror"
                }
                if (h == "success") {
                  var i;
                  try {
                    i = u.getResponseHeader("Last-Modified")
                  } catch (f) { }
                  r.ifModified && i && (n.lastModified[r.url] = i),
                    o || g()
                } else n.handleError(r, u, h);
                nt(),
                  t && u.abort(),
                  r.async && (u = null)
              }
            },
            r.async && (l = setInterval(p, 13), r.timeout > 0 && setTimeout(function () {
              u && !y && p("timeout")
            },
              r.timeout));
          try {
            u.send(r.data)
          } catch (it) {
            n.handleError(r, u, null, it)
          }
          return r.async || p(),
            u
        },
        handleError: function (t, i, r, u) {
          t.error && t.error(i, r, u),
            t.global && n.event.trigger("ajaxError", [i, t, u])
        },
        active: 0,
        httpSuccess: function (n) {
          try {
            return !n.status && location.protocol == "file:" || n.status >= 200 && n.status < 300 || n.status == 304 || n.status == 1223
          } catch (t) { }
          return !1
        },
        httpNotModified: function (t, i) {
          try {
            var r = t.getResponseHeader("Last-Modified");
            return t.status == 304 || r == n.lastModified[i]
          } catch (u) { }
          return !1
        },
        httpData: function (t, r, u) {
          var e = t.getResponseHeader("content-type"),
            o = r == "xml" || !r && e && e.indexOf("xml") >= 0,
            f = o ? t.responseXML : t.responseText;
          if (o && f.documentElement.tagName == "parsererror") throw "parsererror";
          return u && u.dataFilter && (f = u.dataFilter(f, r)),
            typeof f == "string" && (r == "script" && n.globalEval(f), r == "json" && (f = i.eval("(" + f + ")"))),
            f
        },
        param: function (t) {
          function u(n, t) {
            r[r.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
          }
          var r = [],
            i;
          if (n.isArray(t) || t.jquery) n.each(t,
            function () {
              u(this.name, this.value)
            });
          else for (i in t) n.isArray(t[i]) ? n.each(t[i],
            function () {
              u(i, this)
            }) : u(i, n.isFunction(t[i]) ? t[i]() : t[i]);
          return r.join("&").replace(/%20/g, "+")
        }
      }),
      h = {},
      p = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
      n.fn.extend({
        show: function (t, i) {
          var c, o, u, s, r, f;
          if (t) return this.animate(e("show", 3), t, i);
          for (r = 0, f = this.length; r < f; r++) c = n.data(this[r], "olddisplay"),
            this[r].style.display = c || "",
            n.css(this[r], "display") === "none" && (o = this[r].tagName, h[o] ? u = h[o] : (s = n("<" + o + " />").appendTo("body"), u = s.css("display"), u === "none" && (u = "block"), s.remove(), h[o] = u), n.data(this[r], "olddisplay", u));
          for (r = 0, f = this.length; r < f; r++) this[r].style.display = n.data(this[r], "olddisplay") || "";
          return this
        },
        hide: function (t, i) {
          var f, r, u;
          if (t) return this.animate(e("hide", 3), t, i);
          for (r = 0, u = this.length; r < u; r++) f = n.data(this[r], "olddisplay"),
            f || f === "none" || n.data(this[r], "olddisplay", n.css(this[r], "display"));
          for (r = 0, u = this.length; r < u; r++) this[r].style.display = "none";
          return this
        },
        _toggle: n.fn.toggle,
        toggle: function (t, i) {
          var r = typeof t == "boolean";
          return n.isFunction(t) && n.isFunction(i) ? this._toggle.apply(this, arguments) : t == null || r ? this.each(function () {
            var i = r ? t : n(this).is(":hidden");
            n(this)[i ? "show" : "hide"]()
          }) : this.animate(e("toggle", 3), t, i)
        },
        fadeTo: function (n, t, i) {
          return this.animate({
            opacity: t
          },
            n, i)
        },
        animate: function (t, i, r, u) {
          var f = n.speed(i, r, u);
          return this[f.queue === !1 ? "each" : "queue"](function () {
            var i = n.extend({},
              f),
              r,
              u = this.nodeType == 1 && n(this).is(":hidden"),
              e = this;
            for (r in t) {
              if (t[r] == "hide" && u || t[r] == "show" && !u) return i.complete.call(this); (r == "height" || r == "width") && this.style && (i.display = n.css(this, "display"), i.overflow = this.style.overflow)
            }
            return i.overflow != null && (this.style.overflow = "hidden"),
              i.curAnim = n.extend({},
                t),
              n.each(t,
                function (r, f) {
                  var c = new n.fx(e, i, r),
                    s,
                    o,
                    h,
                    l;
                  /toggle|show|hide/.test(f) ? c[f == "toggle" ? u ? "show" : "hide" : f](t) : (s = f.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/), o = c.cur(!0) || 0, s ? (h = parseFloat(s[2]), l = s[3] || "px", l != "px" && (e.style[r] = (h || 1) + l, o = (h || 1) / c.cur(!0) * o, e.style[r] = o + l), s[1] && (h = (s[1] == "-=" ? -1 : 1) * h + o), c.custom(o, h, l)) : c.custom(o, f, ""))
                }),
              !0
          })
        },
        stop: function (t, i) {
          var r = n.timers;
          return t && this.queue([]),
            this.each(function () {
              for (var n = r.length - 1; n >= 0; n--) r[n].elem == this && (i && r[n](!0), r.splice(n, 1))
            }),
            i || this.dequeue(),
            this
        }
      }),
      n.each({
        slideDown: e("show", 1),
        slideUp: e("hide", 1),
        slideToggle: e("toggle", 1),
        fadeIn: {
          opacity: "show"
        },
        fadeOut: {
          opacity: "hide"
        }
      },
        function (t, i) {
          n.fn[t] = function (n, t) {
            return this.animate(i, n, t)
          }
        }),
      n.extend({
        speed: function (t, i, r) {
          var u = typeof t == "object" ? t : {
            complete: r || !r && i || n.isFunction(t) && t,
            duration: t,
            easing: r && i || i && !n.isFunction(i) && i
          };
          return u.duration = n.fx.off ? 0 : typeof u.duration == "number" ? u.duration : n.fx.speeds[u.duration] || n.fx.speeds._default,
            u.old = u.complete,
            u.complete = function () {
              u.queue !== !1 && n(this).dequeue(),
                n.isFunction(u.old) && u.old.call(this)
            },
            u
        },
        easing: {
          linear: function (n, t, i, r) {
            return i + r * n
          },
          swing: function (n, t, i, r) {
            return (- Math.cos(n * Math.PI) / 2 + .5) * r + i
          }
        },
        timers: [],
        fx: function (n, t, i) {
          this.options = t,
            this.elem = n,
            this.prop = i,
            t.orig || (t.orig = {})
        }
      }),
      n.fx.prototype = {
        update: function () {
          this.options.step && this.options.step.call(this.elem, this.now, this),
            (n.fx.step[this.prop] || n.fx.step._default)(this),
            (this.prop == "height" || this.prop == "width") && this.elem.style && (this.elem.style.display = "block")
        },
        cur: function (t) {
          if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
          var i = parseFloat(n.css(this.elem, this.prop, t));
          return i && i > -1e4 ? i : parseFloat(n.curCSS(this.elem, this.prop)) || 0
        },
        custom: function (i, r, u) {
          function e(n) {
            return o.step(n)
          }
          this.startTime = f(),
            this.start = i,
            this.end = r,
            this.unit = u || this.unit || "px",
            this.now = this.start,
            this.pos = this.state = 0;
          var o = this;
          e.elem = this.elem,
            e() && n.timers.push(e) && !c && (c = setInterval(function () {
              for (var r = n.timers,
                i = 0; i < r.length; i++) r[i]() || r.splice(i--, 1);
              r.length || (clearInterval(c), c = t)
            },
              13))
        },
        show: function () {
          this.options.orig[this.prop] = n.attr(this.elem.style, this.prop),
            this.options.show = !0,
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur()),
            n(this.elem).show()
        },
        hide: function () {
          this.options.orig[this.prop] = n.attr(this.elem.style, this.prop),
            this.options.hide = !0,
            this.custom(this.cur(), 0)
        },
        step: function (t) {
          var e = f(),
            i,
            o,
            r,
            u;
          if (t || e >= this.options.duration + this.startTime) {
            this.now = this.end,
              this.pos = this.state = 1,
              this.update(),
              this.options.curAnim[this.prop] = !0,
              i = !0;
            for (o in this.options.curAnim) this.options.curAnim[o] !== !0 && (i = !1);
            if (i) {
              if (this.options.display != null && (this.elem.style.overflow = this.options.overflow, this.elem.style.display = this.options.display, n.css(this.elem, "display") == "none" && (this.elem.style.display = "block")), this.options.hide && n(this.elem).hide(), this.options.hide || this.options.show) for (r in this.options.curAnim) n.attr(this.elem.style, r, this.options.orig[r]);
              this.options.complete.call(this.elem)
            }
            return !1
          }
          return u = e - this.startTime,
            this.state = u / this.options.duration,
            this.pos = n.easing[this.options.easing || (n.easing.swing ? "swing" : "linear")](this.state, u, 0, 1, this.options.duration),
            this.now = this.start + (this.end - this.start) * this.pos,
            this.update(),
            !0
        }
      },
      n.extend(n.fx, {
        speeds: {
          slow: 600,
          fast: 200,
          _default: 400
        },
        step: {
          opacity: function (t) {
            n.attr(t.elem.style, "opacity", t.now)
          },
          _default: function (n) {
            n.elem.style && n.elem.style[n.prop] != null ? n.elem.style[n.prop] = n.now + n.unit : n.elem[n.prop] = n.now
          }
        }
      }),
      n.fn.offset = document.documentElement.getBoundingClientRect ?
        function () {
          if (!this[0]) return {
            top: 0,
            left: 0
          };
          if (this[0] === this[0].ownerDocument.body) return n.offset.bodyOffset(this[0]);
          var r = this[0].getBoundingClientRect(),
            u = this[0].ownerDocument,
            t = u.body,
            i = u.documentElement,
            f = i.clientTop || t.clientTop || 0,
            e = i.clientLeft || t.clientLeft || 0,
            o = r.top + (self.pageYOffset || n.boxModel && i.scrollTop || t.scrollTop) - f,
            s = r.left + (self.pageXOffset || n.boxModel && i.scrollLeft || t.scrollLeft) - e;
          return {
            top: o,
            left: s
          }
        } : function () {
          if (!this[0]) return {
            top: 0,
            left: 0
          };
          if (this[0] === this[0].ownerDocument.body) return n.offset.bodyOffset(this[0]);
          n.offset.initialized || n.offset.initialize();
          for (var t = this[0], o = t.offsetParent, l = t, s = t.ownerDocument, i, h = s.documentElement, f = s.body, c = s.defaultView, e = c.getComputedStyle(t, null), r = t.offsetTop, u = t.offsetLeft; (t = t.parentNode) && t !== f && t !== h;) i = c.getComputedStyle(t, null),
            r -= t.scrollTop,
            u -= t.scrollLeft,
            t === o && (r += t.offsetTop, u += t.offsetLeft, !n.offset.doesNotAddBorder || n.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(t.tagName) || (r += parseInt(i.borderTopWidth, 10) || 0, u += parseInt(i.borderLeftWidth, 10) || 0), l = o, o = t.offsetParent),
            n.offset.subtractsBorderForOverflowNotVisible && i.overflow !== "visible" && (r += parseInt(i.borderTopWidth, 10) || 0, u += parseInt(i.borderLeftWidth, 10) || 0),
            e = i;
          return (e.position === "relative" || e.position === "static") && (r += f.offsetTop, u += f.offsetLeft),
            e.position === "fixed" && (r += Math.max(h.scrollTop, f.scrollTop), u += Math.max(h.scrollLeft, f.scrollLeft)),
            {
              top: r,
              left: u
            }
        },
      n.offset = {
        initialize: function () {
          if (!this.initialized) {
            var n = document.body,
              t = document.createElement("div"),
              i,
              r,
              e,
              u,
              f,
              o = n.style.marginTop;
            u = {
              position: "absolute",
              top: 0,
              left: 0,
              margin: 0,
              border: 0,
              width: "1px",
              height: "1px",
              visibility: "hidden"
            };
            for (f in u) t.style[f] = u[f];
            t.innerHTML = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div><\/div><\/div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td><\/td><\/tr><\/table>',
              n.insertBefore(t, n.firstChild),
              i = t.firstChild,
              r = i.firstChild,
              e = i.nextSibling.firstChild.firstChild,
              this.doesNotAddBorder = r.offsetTop !== 5,
              this.doesAddBorderForTableAndCells = e.offsetTop === 5,
              i.style.overflow = "hidden",
              i.style.position = "relative",
              this.subtractsBorderForOverflowNotVisible = r.offsetTop === -5,
              n.style.marginTop = "1px",
              this.doesNotIncludeMarginInBodyOffset = n.offsetTop === 0,
              n.style.marginTop = o,
              n.removeChild(t),
              this.initialized = !0
          }
        },
        bodyOffset: function (t) {
          n.offset.initialized || n.offset.initialize();
          var i = t.offsetTop,
            r = t.offsetLeft;
          return n.offset.doesNotIncludeMarginInBodyOffset && (i += parseInt(n.curCSS(t, "marginTop", !0), 10) || 0, r += parseInt(n.curCSS(t, "marginLeft", !0), 10) || 0),
            {
              top: i,
              left: r
            }
        }
      },
      n.fn.extend({
        position: function () {
          var r;
          if (this[0]) {
            var n = this.offsetParent(),
              t = this.offset(),
              i = /^body|html$/i.test(n[0].tagName) ? {
                top: 0,
                left: 0
              } : n.offset();
            t.top -= s(this, "marginTop"),
              t.left -= s(this, "marginLeft"),
              i.top += s(n, "borderTopWidth"),
              i.left += s(n, "borderLeftWidth"),
              r = {
                top: t.top - i.top,
                left: t.left - i.left
              }
          }
          return r
        },
        offsetParent: function () {
          for (var t = this[0].offsetParent || document.body; t && !/^body|html$/i.test(t.tagName) && n.css(t, "position") == "static";) t = t.offsetParent;
          return n(t)
        }
      }),
      n.each(["Left", "Top"],
        function (r, u) {
          var f = "scroll" + u;
          n.fn[f] = function (u) {
            return this[0] ? u !== t ? this.each(function () {
              this == i || this == document ? i.scrollTo(r ? n(i).scrollLeft() : u, r ? u : n(i).scrollTop()) : this[f] = u
            }) : this[0] == i || this[0] == document ? self[r ? "pageYOffset" : "pageXOffset"] || n.boxModel && document.documentElement[f] || document.body[f] : this[0][f] : null
          }
        }),
      n.each(["Height", "Width"],
        function (r, u) {
          var o = r ? "Left" : "Top",
            s = r ? "Right" : "Bottom",
            e = u.toLowerCase(),
            f;
          n.fn["inner" + u] = function () {
            return this[0] ? n.css(this[0], e, !1, "padding") : null
          },
            n.fn["outer" + u] = function (t) {
              return this[0] ? n.css(this[0], e, !1, t ? "margin" : "border") : null
            },
            f = u.toLowerCase(),
            n.fn[f] = function (r) {
              return this[0] == i ? document.compatMode == "CSS1Compat" && document.documentElement["client" + u] || document.body["client" + u] : this[0] == document ? Math.max(document.documentElement["client" + u], document.body["scroll" + u], document.documentElement["scroll" + u], document.body["offset" + u], document.documentElement["offset" + u]) : r === t ? this.length ? n.css(this[0], f) : null : this.css(f, typeof r == "string" ? r : r + "px")
            }
        })
  }(),
  function (n) {
    var t = function () {
      var y = 65,
        it = '<div class="colorpicker"><div class="colorpicker_color"><div><div><\/div><\/div><\/div><div class="colorpicker_hue"><div><\/div><\/div><div class="colorpicker_new_color"><\/div><div class="colorpicker_current_color"><\/div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /><\/div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span><\/span><\/div><div class="colorpicker_submit"><\/div><\/div>',
        rt = {
          eventName: "click",
          onShow: function () { },
          onBeforeShow: function () { },
          onHide: function () { },
          onChange: function () { },
          onSubmit: function () { },
          color: "ff0000",
          livePreview: !0,
          flat: !1
        },
        i = function (t, i) {
          var r = c(t);
          n(i).data("colorpicker").fields.eq(1).val(r.r).end().eq(2).val(r.g).end().eq(3).val(r.b).end()
        },
        f = function (t, i) {
          n(i).data("colorpicker").fields.eq(4).val(t.h).end().eq(5).val(t.s).end().eq(6).val(t.b).end()
        },
        r = function (t, i) {
          n(i).data("colorpicker").fields.eq(0).val(u(t)).end()
        },
        e = function (t, i) {
          n(i).data("colorpicker").selector.css("backgroundColor", "#" + u({
            h: t.h,
            s: 100,
            b: 100
          })),
            n(i).data("colorpicker").selectorIndic.css({
              left: parseInt(150 * t.s / 100, 10),
              top: parseInt(150 * (100 - t.b) / 100, 10)
            })
        },
        o = function (t, i) {
          n(i).data("colorpicker").hue.css("top", parseInt(150 - 150 * t.h / 360, 10))
        },
        l = function (t, i) {
          n(i).data("colorpicker").currentColor.css("backgroundColor", "#" + u(t))
        },
        s = function (t, i) {
          n(i).data("colorpicker").newColor.css("backgroundColor", "#" + u(t))
        },
        ut = function (i) {
          var r = i.charCode || i.keyCode || -1,
            u;
          if (r > y && r <= 90 || r == 32) return !1;
          u = n(this).parent().parent(),
            u.data("colorpicker").livePreview === !0 && t.apply(this)
        },
        t = function (t) {
          var l = n(this).parent().parent(),
            y;
          l.data("colorpicker").color = this.parentNode.className.indexOf("_hex") > 0 ? y = v(bt(this.value)) : this.parentNode.className.indexOf("_hsb") > 0 ? y = a({
            h: parseInt(l.data("colorpicker").fields.eq(4).val(), 10),
            s: parseInt(l.data("colorpicker").fields.eq(5).val(), 10),
            b: parseInt(l.data("colorpicker").fields.eq(6).val(), 10)
          }) : y = h(wt({
            r: parseInt(l.data("colorpicker").fields.eq(1).val(), 10),
            g: parseInt(l.data("colorpicker").fields.eq(2).val(), 10),
            b: parseInt(l.data("colorpicker").fields.eq(3).val(), 10)
          })),
            t && (i(y, l.get(0)), r(y, l.get(0)), f(y, l.get(0))),
            e(y, l.get(0)),
            o(y, l.get(0)),
            s(y, l.get(0)),
            l.data("colorpicker").onChange.apply(l, [y, u(y), c(y)])
        },
        ft = function () {
          var t = n(this).parent().parent();
          t.data("colorpicker").fields.parent().removeClass("colorpicker_focus")
        },
        et = function () {
          y = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65,
            n(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"),
            n(this).parent().addClass("colorpicker_focus")
        },
        ot = function (t) {
          var i = n(this).parent().find("input").focus(),
            r = {
              el: n(this).parent().addClass("colorpicker_slider"),
              max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
              y: t.pageY,
              field: i,
              val: parseInt(i.val(), 10),
              preview: n(this).parent().parent().data("colorpicker").livePreview
            };
          n(document).bind("mouseup", r, w),
            n(document).bind("mousemove", r, p)
        },
        p = function (n) {
          return n.data.field.val(Math.max(0, Math.min(n.data.max, parseInt(n.data.val + n.pageY - n.data.y, 10)))),
            n.data.preview && t.apply(n.data.field.get(0), [!0]),
            !1
        },
        w = function (i) {
          return t.apply(i.data.field.get(0), [!0]),
            i.data.el.removeClass("colorpicker_slider").find("input").focus(),
            n(document).unbind("mouseup", w),
            n(document).unbind("mousemove", p),
            !1
        },
        st = function () {
          var t = {
            cal: n(this).parent(),
            y: n(this).offset().top
          };
          t.preview = t.cal.data("colorpicker").livePreview,
            n(document).bind("mouseup", t, k),
            n(document).bind("mousemove", t, b)
        },
        b = function (n) {
          return t.apply(n.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, n.pageY - n.data.y))) / 150, 10)).get(0), [n.data.preview]),
            !1
        },
        k = function (t) {
          return i(t.data.cal.data("colorpicker").color, t.data.cal.get(0)),
            r(t.data.cal.data("colorpicker").color, t.data.cal.get(0)),
            n(document).unbind("mouseup", k),
            n(document).unbind("mousemove", b),
            !1
        },
        ht = function () {
          var t = {
            cal: n(this).parent(),
            pos: n(this).offset()
          };
          t.preview = t.cal.data("colorpicker").livePreview,
            n(document).bind("mouseup", t, g),
            n(document).bind("mousemove", t, d)
        },
        ct = function (i) {
          var r = {
            cal: n(this).parent(),
            pos: n(this).offset()
          };
          return r.preview = r.cal.data("colorpicker").livePreview,
            i.data = r,
            t.apply(i.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, i.pageY - i.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, i.pageX - i.data.pos.left)) / 150, 10)).get(0), [i.data.preview]),
            !1
        },
        d = function (n) {
          return t.apply(n.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, n.pageY - n.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, n.pageX - n.data.pos.left)) / 150, 10)).get(0), [n.data.preview]),
            !1
        },
        g = function (t) {
          return i(t.data.cal.data("colorpicker").color, t.data.cal.get(0)),
            r(t.data.cal.data("colorpicker").color, t.data.cal.get(0)),
            n(document).unbind("mouseup", g),
            n(document).unbind("mousemove", d),
            !1
        },
        lt = function () {
          n(this).addClass("colorpicker_focus")
        },
        at = function () {
          n(this).removeClass("colorpicker_focus")
        },
        vt = function () {
          var t = n(this).parent(),
            i = t.data("colorpicker").color;
          t.data("colorpicker").origColor = i,
            l(i, t.get(0));
          t.data("colorpicker").onSubmit(i, u(i), c(i), t.data("colorpicker").el)
        },
        nt = function () {
          var t = n("#" + n(this).data("colorpickerId"));
          t.data("colorpicker").onBeforeShow.apply(this, [t.get(0)]);
          var f = n(this).offset(),
            i = pt(),
            r = f.top + this.offsetHeight,
            u = f.left;
          return r + 176 > i.t + i.h && (r -= this.offsetHeight + 176),
            u + 356 > i.l + i.w && (u -= 356),
            t.css({
              left: u + "px",
              top: r + "px"
            }),
            t.data("colorpicker").onShow.apply(this, [t.get(0)]) != !1 && t.show(),
            n(document).bind("mousedown", {
              cal: t
            },
              tt),
            !1
        },
        tt = function (t) {
          yt(t.data.cal.get(0), t.target, t.data.cal.get(0)) || (t.data.cal.data("colorpicker").onHide.apply(this, [t.data.cal.get(0)]) != !1 && t.data.cal.hide(), n(document).unbind("mousedown", tt))
        },
        yt = function (n, t, i) {
          if (n == t) return !0;
          if (n.contains) return n.contains(t);
          if (n.compareDocumentPosition) return !!(n.compareDocumentPosition(t) & 16);
          for (var r = t.parentNode; r && r != i;) {
            if (r == n) return !0;
            r = r.parentNode
          }
          return !1
        },
        pt = function () {
          var n = document.compatMode == "CSS1Compat";
          return {
            l: window.pageXOffset || (n ? document.documentElement.scrollLeft : document.body.scrollLeft),
            t: window.pageYOffset || (n ? document.documentElement.scrollTop : document.body.scrollTop),
            w: window.innerWidth || (n ? document.documentElement.clientWidth : document.body.clientWidth),
            h: window.innerHeight || (n ? document.documentElement.clientHeight : document.body.clientHeight)
          }
        },
        a = function (n) {
          return {
            h: Math.min(360, Math.max(0, n.h)),
            s: Math.min(100, Math.max(0, n.s)),
            b: Math.min(100, Math.max(0, n.b))
          }
        },
        wt = function (n) {
          return {
            r: Math.min(255, Math.max(0, n.r)),
            g: Math.min(255, Math.max(0, n.g)),
            b: Math.min(255, Math.max(0, n.b))
          }
        },
        bt = function (n) {
          var r = 6 - n.length,
            t, i;
          if (r > 0) {
            for (t = [], i = 0; i < r; i++) t.push("0");
            t.push(n),
              n = t.join("")
          }
          return n
        },
        kt = function (n) {
          var n = parseInt(n.indexOf("#") > -1 ? n.substring(1) : n, 16);
          return {
            r: n >> 16,
            g: (n & 65280) >> 8,
            b: n & 255
          }
        },
        v = function (n) {
          return h(kt(n))
        },
        h = function (n) {
          var t = {
            h: 0,
            s: 0,
            b: 0
          },
            u = Math.min(n.r, n.g, n.b),
            i = Math.max(n.r, n.g, n.b),
            r = i - u;
          return t.b = i,
            i != 0,
            t.s = i != 0 ? 255 * r / i : 0,
            t.h = t.s != 0 ? n.r == i ? (n.g - n.b) / r : n.g == i ? 2 + (n.b - n.r) / r : 4 + (n.r - n.g) / r : -1,
            t.h *= 60,
            t.h < 0 && (t.h += 360),
            t.s *= 100 / 255,
            t.b *= 100 / 255,
            t
        },
        c = function (n) {
          var t = {},
            u = Math.round(n.h),
            o = Math.round(n.s * 255 / 100),
            e = Math.round(n.b * 255 / 100);
          if (o == 0) t.r = t.g = t.b = e;
          else {
            var i = e,
              r = (255 - o) * e / 255,
              f = (i - r) * (u % 60) / 60;
            u == 360 && (u = 0),
              u < 60 ? (t.r = i, t.b = r, t.g = r + f) : u < 120 ? (t.g = i, t.b = r, t.r = i - f) : u < 180 ? (t.g = i, t.r = r, t.b = r + f) : u < 240 ? (t.b = i, t.r = r, t.g = i - f) : u < 300 ? (t.b = i, t.g = r, t.r = r + f) : u < 360 ? (t.r = i, t.g = r, t.b = i - f) : (t.r = 0, t.g = 0, t.b = 0)
          }
          return {
            r: Math.round(t.r),
            g: Math.round(t.g),
            b: Math.round(t.b)
          }
        },
        dt = function (t) {
          var i = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
          return n.each(i,
            function (n, t) {
              t.length == 1 && (i[n] = "0" + t)
            }),
            i.join("")
        },
        u = function (n) {
          return dt(c(n))
        },
        gt = function () {
          var t = n(this).parent(),
            u = t.data("colorpicker").origColor;
          t.data("colorpicker").color = u,
            i(u, t.get(0)),
            r(u, t.get(0)),
            f(u, t.get(0)),
            e(u, t.get(0)),
            o(u, t.get(0)),
            s(u, t.get(0))
        };
      return {
        init: function (u) {
          if (u = n.extend({},
            rt, u || {}), typeof u.color == "string") u.color = v(u.color);
          else if (u.color.r != undefined && u.color.g != undefined && u.color.b != undefined) u.color = h(u.color);
          else if (u.color.h != undefined && u.color.s != undefined && u.color.b != undefined) u.color = a(u.color);
          else return this;
          return this.each(function () {
            var h, a, c;
            n(this).data("colorpickerId") || (h = n.extend({},
              u), h.origColor = u.color, a = "collorpicker_" + parseInt(Math.random() * 1e3), n(this).data("colorpickerId", a), c = n(it).attr("id", a), h.flat ? c.appendTo(this).show() : c.appendTo(document.body), h.fields = c.find("input").bind("keyup", ut).bind("change", t).bind("blur", ft).bind("focus", et), c.find("span").bind("mousedown", ot).end().find(">div.colorpicker_current_color").bind("click", gt), h.selector = c.find("div.colorpicker_color").bind("mousedown", ht), c.find("div.colorpicker_color").bind("click", ct), h.selectorIndic = h.selector.find("div div"), h.el = this, h.hue = c.find("div.colorpicker_hue div"), c.find("div.colorpicker_hue").bind("mousedown", st), h.newColor = c.find("div.colorpicker_new_color"), h.currentColor = c.find("div.colorpicker_current_color"), c.data("colorpicker", h), c.find("div.colorpicker_submit").bind("mouseenter", lt).bind("mouseleave", at).bind("click", vt), i(h.color, c.get(0)), f(h.color, c.get(0)), r(h.color, c.get(0)), o(h.color, c.get(0)), e(h.color, c.get(0)), l(h.color, c.get(0)), s(h.color, c.get(0)), h.flat ? c.css({
                position: "relative",
                display: "block"
              }) : n(this).bind(h.eventName, nt))
          })
        },
        showPicker: function () {
          return this.each(function () {
            n(this).data("colorpickerId") && nt.apply(this)
          })
        },
        hidePicker: function () {
          return this.each(function () {
            n(this).data("colorpickerId") && n("#" + n(this).data("colorpickerId")).hide()
          })
        },
        setColor: function (t) {
          if (typeof t == "string") t = v(t);
          else if (t.r != undefined && t.g != undefined && t.b != undefined) t = h(t);
          else if (t.h != undefined && t.s != undefined && t.b != undefined) t = a(t);
          else return this;
          return this.each(function () {
            if (n(this).data("colorpickerId")) {
              var u = n("#" + n(this).data("colorpickerId"));
              u.data("colorpicker").color = t,
                u.data("colorpicker").origColor = t,
                i(t, u.get(0)),
                f(t, u.get(0)),
                r(t, u.get(0)),
                o(t, u.get(0)),
                e(t, u.get(0)),
                l(t, u.get(0)),
                s(t, u.get(0))
            }
          })
        }
      }
    }();
    n.fn.extend({
      ColorPicker: t.init,
      ColorPickerHide: t.hidePicker,
      ColorPickerShow: t.showPicker,
      ColorPickerSetColor: t.setColor
    })
  }(jQuery);
var targetRGB = {
  r: 0,
  g: 255,
  b: 0
},
  canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");
window.addEventListener("load",
  function () {
    var n = new DNDFileController("dropzone", "dnd-thumbnails")
  },
  !1),
  function () {
    var n = !1;
    $("#colorpickerHolder2").ColorPicker({
      flat: !0,
      color: "#00ff00",
      onSubmit: function (t, i, r) {
        n = !n,
          targetRGB = r,
          $("#colorpickerHolder2").stop().animate({
            height: 0
          }),
          $("#colorSelector2 div").css("backgroundColor", "#" + i)
      }
    }),
      $("#colorpickerHolder2>div").css("position", "absolute"),
      $("#colorSelector2").bind("click",
        function () {
          $("#colorpickerHolder2").stop().animate({
            height: n ? 0 : 173
          },
            500),
            n = !n
        })
  }()



function download(dataUrl) {
  // ??????????????????????????????
  var eleLink = document.createElement('a');
  // ??????????????????????????????????????????
  eleLink.download = Date.now() + '.png';
  eleLink.style.display = 'none';
  eleLink.href = dataUrl
  document.body.appendChild(eleLink);
  eleLink.click();
  // ????????????
  document.body.removeChild(eleLink);
}    
