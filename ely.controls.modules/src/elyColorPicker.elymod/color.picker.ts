/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Файл: color.picker.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/* tslint:disable */
import elyGuard from "@core/elyGuard";
import elyUtils from "@core/elyUtils";
import {elyColorUtils} from "@core/elyColorUtils";

(function (win, doc, NS) {

    var instance = '__instance__',
        first = 'firstChild',
        delay = setTimeout;

    function edge(a: any, b: any, c: any) {
        if (a < b) return b;
        if (a > c) return c;
        return a;
    }

    function num(i: any, j: any) {
        return parseInt(i, j || 10);
    }

    function HSV2RGB(a: number[]) {
        const rgb = elyColorUtils.hsv2rgb({hue: +a[0], saturation: +a[1], value: +a[2]});
        return [Math.round(rgb.red * 255), Math.round(rgb.green * 255), Math.round(rgb.blue * 255)];
    }

    function HSV2HEX(a: number[]) {
        return RGB2HEX(HSV2RGB(a));
    }

    function RGB2HSV(a: number[]) {
        const res = elyColorUtils.rgb2hsv({red: +a[0], green: +a[1], blue: +a[2]});
        return [res.hue, res.saturation, res.value];
    }

    function RGB2HEX(a: any[]) {
        return elyColorUtils.rgb2hex({red: +a[0], green: +a[1], blue: +a[2]});
    }

    // rrggbb or rgb //ok
    // @ts-ignore
    function HEX2HSV(s) {
        return RGB2HSV(HEX2RGB(s));
    }

    //OK
    function HEX2RGB(s: any) {
        if (s.length === 3) {
            s = s.replace(/./g, '$&$&');
        }
        return [num(s[0] + s[1], 16), num(s[2] + s[3], 16), num(s[4] + s[5], 16)];
    }

    // convert range from `0` to `360` and `0` to `100` in color into range from `0` to `1`
    function _2HSV_pri(a: any) {
        return [+a[0] / 360, +a[1] / 100, +a[2] / 100];
    }

    // convert range from `0` to `1` into `0` to `360` and `0` to `100` in color
    function _2HSV_pub(a: (any | undefined)[]) {
        return [Math.round(+a[0] * 360), Math.round(+a[1] * 100), Math.round(+a[2] * 100)];
    }

    // convert range from `0` to `255` in color into range from `0` to `1`
    function _2RGB_pri(a: any[]) {
        return [+a[0] / 255, +a[1] / 255, +a[2] / 255];
    }

    // *
    function parse(x: any) {
        if (typeof x === "object") return x;
        var rgb = /\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(x),
            hsv = /\s*hsv\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/i.exec(x),
            hex = x[0] === '#' && x.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
        if (hex) {
            return HEX2HSV(x.slice(1));
        } else if (hsv) {
            return _2HSV_pri([+hsv[1], +hsv[2], +hsv[3]]);
        } else if (rgb) {
            return RGB2HSV([+rgb[1], +rgb[2], +rgb[3]]);
        }
        return [0, 1, 1]; // default is red
    }

    (function ($) {

        // plugin version
        // @ts-ignore
        $.version = '1.4.0';

        // collect all instance(s)
        // @ts-ignore
        $[instance] = {};

        // plug to all instance(s)
        // @ts-ignore
        $.each = function (fn, t) {
            return delay(function () {
                // @ts-ignore
                var ins = $[instance], i;
                for (i in ins) {
                    fn.call(ins[i], i, ins);
                }
            }, t === 0 ? 0 : (t || 1)), $;
        };

        // static method(s)
        // @ts-ignore
        $.parse = parse;
        // @ts-ignore
        $._HSV2RGB = HSV2RGB;
        // @ts-ignore
        $._HSV2HEX = HSV2HEX;
        // @ts-ignore
        $._RGB2HSV = RGB2HSV;
        // @ts-ignore
        $._HEX2HSV = HEX2HSV;
        // @ts-ignore
        $._HEX2RGB = function (a) {
            return _2RGB_pri(HEX2RGB(a));
        };
        // @ts-ignore
        $.HSV2RGB = function (a) {
            return HSV2RGB(_2HSV_pri(a));
        };
        // @ts-ignore
        $.HSV2HEX = function (a) {
            return HSV2HEX(_2HSV_pri(a));
        };
        // @ts-ignore
        $.RGB2HSV = function (a) {
            return _2HSV_pub(RGB2HSV(a));
        };
        // @ts-ignore
        $.RGB2HEX = RGB2HEX;
        // @ts-ignore
        $.HEX2HSV = function (s) {
            return _2HSV_pub(HEX2HSV(s));
        };
        // @ts-ignore
        $.HEX2RGB = HEX2RGB;
        // @ts-ignore
    })(win[NS] = function (source, events, parent) {

        var b = doc.body,
            h = doc.documentElement,
            $ = this,
            // @ts-ignore
            $$ = win[NS],
            _ = false,
            hooks = {},
            self = doc.createElement('div'),
            on_down = "touchstart mousedown",
            on_move = "touchmove mousemove",
            on_up = "touchend mouseup",
            on_resize = "orientationchange resize";

        // return a new instance if `CP` was called without the `new` operator
        if (!($ instanceof $$)) {
            return new $$(source, events);
        }

        // store color picker instance to `CP.__instance__`
        $$[instance][source.id || source.name || elyUtils.count($$[instance])] = $;

        // trigger color picker panel on click by default
        if (!elyGuard.isSet(events) || events === true) {
            events = on_down;
        }

        // add event
        function on(ev: any, el: any, fn: (e: any) => void) {
            ev = ev.split(/\s+/);
            for (var i = 0, ien = ev.length; i < ien; ++i) {
                el.addEventListener(ev[i], fn, false);
            }
        }

        // remove event
        function off(ev: any, el: any, fn: (e: any) => void) {
            ev = ev.split(/\s+/);
            for (var i = 0, ien = ev.length; i < ien; ++i) {
                el.removeEventListener(ev[i], fn);
            }
        }

        // get mouse/finger coordinate
        function point(el: any, e: any) {
            var T = 'touches',
                X = 'clientX',
                Y = 'clientY',
                x = !!e[T] ? e[T][0][X] : e[X],
                y = !!e[T] ? e[T][0][Y] : e[Y],
                o = offset(el);
            return {
                x: x - o.l,
                y: y - o.t
            };
        }

        // get position
        function offset(el: any) {
            var left, top, rect;
            if (el === win) {
                // @ts-ignore
                left = win.pageXOffset || h.scrollLeft;
                // @ts-ignore
                top = win.pageYOffset || h.scrollTop;
            } else {
                rect = el.getBoundingClientRect();
                left = rect.left;
                top = rect.top;
            }
            return {
                l: left,
                t: top
            };
        }

        // get closest parent
        function closest(a: any, b: any) {
            while ((a = a.parentElement) && a !== b) ;
            return a;
        }

        // prevent default
        function prevent(e: any) {
            if (e) e.preventDefault();
        }

        // get dimension
        function size(el: any) {
            return el === win ? {
                w: win.innerWidth,
                h: win.innerHeight
            } : {
                w: el.offsetWidth,
                h: el.offsetHeight
            };
        }

        // get color data
        function get_data(a: any) {
            return _ || (elyGuard.isSet(a) ? a : false);
        }

        // set color data
        function set_data(a: any) {
            _ = a;
        }

        // add hook
        function add(ev: any, fn: any, id: any) {
            if (!elyGuard.isSet(ev)) return hooks;
            // @ts-ignore
            if (!elyGuard.isSet(fn)) return hooks[ev];
            // @ts-ignore
            if (!elyGuard.isSet(hooks[ev])) hooks[ev] = {};
            // @ts-ignore
            if (!elyGuard.isSet(id)) id = elyUtils.count(hooks[ev]);
            // @ts-ignore
            return hooks[ev][id] = fn, $;
        }

        // remove hook
        function remove(ev: any, id: any) {
            if (!elyGuard.isSet(ev)) return hooks = {}, $;
            // @ts-ignore
            if (!elyGuard.isSet(id)) return hooks[ev] = {}, $;
            // @ts-ignore
            return delete hooks[ev][id], $;
        }

        // trigger hook
        function trigger(ev: any, a: any[], id: any) {
            // @ts-ignore
            if (!elyGuard.isSet(hooks[ev])) return $;
            if (!elyGuard.isSet(id)) {
                // @ts-ignore
                for (var i in hooks[ev]) {
                    // @ts-ignore
                    hooks[ev][i].apply($, a);
                }
            } else {
                // @ts-ignore
                if (elyGuard.isSet(hooks[ev][id])) {
                    // @ts-ignore
                    hooks[ev][id].apply($, a);
                }
            }
            return $;
        }

        // initialize data ...
        set_data($$.parse(source.getAttribute('data-color') || source.value || [0, 1, 1]));

        // generate color picker pane ...
        self.className = 'color-picker';
        self.innerHTML = '<div class="color-picker-container"><span class="color-picker-h"><i></i></span><span class="color-picker-sv"><i></i></span></div>';
        // @ts-ignore
        var c = self[first].children,
            HSV = get_data([0, 1, 1]), // default is red
            H = c[0],
            SV = c[1],
            H_point = H[first],
            SV_point = SV[first],
            start_H = 0,
            start_SV = 0,
            drag_H = 0,
            drag_SV = 0,
            left = 0,
            top = 0,
            P_W = 0,
            P_H = 0,
            v = HSV2HEX(HSV),
            // @ts-ignore
            set;

        // on update ...
        function trigger_(k: any | number, x: any[]) {
            if (!k || k === "h") {
                // @ts-ignore
                trigger("change:h", x);
            }
            if (!k || k === "sv") {
                // @ts-ignore
                trigger("change:sv", x);
            }
            // @ts-ignore
            trigger("change", x);
        }

        // is visible?
        function visible() {
            return self.parentNode;
        }

        // create
        function create(first: any, bucket: any) {
            if (!first) {
                // @ts-ignore
                (parent || bucket || b).appendChild(self), $.visible = true;
            }

            function click(e: any) {
                const t = e.target,
                    is_source = t === source || closest(t, source) === source;
                if (is_source) {
                    // @ts-ignore
                    create();
                } else {
                    // @ts-ignore
                    $.exit();
                }
                // @ts-ignore
                trigger(is_source ? "enter" : "exit", [$]);
            }

            P_W = size(self).w;
            P_H = size(self).h;
            var SV_size = size(SV),
                SV_point_size = size(SV_point),
                H_H = size(H).h,
                SV_W = SV_size.w,
                SV_H = SV_size.h,
                H_point_H = size(H_point).h,
                SV_point_W = SV_point_size.w,
                SV_point_H = SV_point_size.h;
            if (first) {
                self.style.left = self.style.top = '-9999px';
                if (events !== false) {
                    on(events, source, click);
                }
                // @ts-ignore
                $.create = function () {
                    // @ts-ignore
                    return create(1), trigger("create", [$]), $;
                };
                // @ts-ignore
                $.destroy = function () {
                    if (events !== false) {
                        off(events, source, click);
                    }
                    // @ts-ignore
                    $.exit(), set_data(false);
                    // @ts-ignore
                    return trigger("destroy", [$]), $;
                };
            } else {
                fit();
            }
            set = function () {
                // @ts-ignore
                HSV = get_data(HSV), color();
                H_point.style.top = (H_H - (H_point_H / 2) - (H_H * +HSV[0])) + 'px';
                SV_point.style.right = (SV_W - (SV_point_W / 2) - (SV_W * +HSV[1])) + 'px';
                SV_point.style.top = (SV_H - (SV_point_H / 2) - (SV_H * +HSV[2])) + 'px';
            };
            // @ts-ignore
            $.exit = function (e) {
                if (visible()) {
                    // @ts-ignore
                    visible().removeChild(self);
                    // @ts-ignore
                    $.visible = false;
                }
                off(on_down, H, down_H);
                off(on_down, SV, down_SV);
                off(on_move, doc, move);
                off(on_up, doc, stop);
                off(on_resize, win, fit);
                return $;
            };

            function color(e: any) {
                var a = HSV2RGB(HSV),
                    b = HSV2RGB([HSV[0], 1, 1]);
                SV.style.backgroundColor = 'rgb(' + b.join(',') + ')';
                set_data(HSV);
                prevent(e);
            };
            set();

            function do_H(e: any) {
                var y = edge(point(H, e).y, 0, H_H);
                HSV[0] = (H_H - y) / H_H;
                H_point.style.top = (y - (H_point_H / 2)) + 'px';
                color(e);
            }

            function do_SV(e: any) {
                var o = point(SV, e),
                    x = edge(o.x, 0, SV_W),
                    y = edge(o.y, 0, SV_H);
                HSV[1] = 1 - ((SV_W - x) / SV_W);
                HSV[2] = (SV_H - y) / SV_H;
                SV_point.style.right = (SV_W - x - (SV_point_W / 2)) + 'px';
                SV_point.style.top = (y - (SV_point_H / 2)) + 'px';
                color(e);
            }

            function move(e: any) {
                if (drag_H) {
                    do_H(e), v = HSV2HEX(HSV);
                    if (!start_H) {
                        // @ts-ignore
                        trigger("drag:h", [v, $]);
                        // @ts-ignore
                        trigger("drag", [v, $]);
                        trigger_("h", [v, $]);
                    }
                }
                if (drag_SV) {
                    do_SV(e), v = HSV2HEX(HSV);
                    if (!start_SV) {
                        // @ts-ignore
                        trigger("drag:sv", [v, $]);
                        // @ts-ignore
                        trigger("drag", [v, $]);
                        trigger_("sv", [v, $]);
                    }
                }
                start_H = 0,
                    start_SV = 0;
            }

            // @ts-ignore
            function stop(e) {
                var t = e.target,
                    k = drag_H ? "h" : "sv",
                    a = [HSV2HEX(HSV), $],
                    is_source = t === source || closest(t, source) === source,
                    is_self = t === self || closest(t, self) === self;
                if (!is_source && !is_self) {
                    // click outside the source or picker element to exit
                    // @ts-ignore
                    if (visible() && events !== false) $.exit(), trigger("exit", [$]), trigger_(0, a);
                } else {
                    if (is_self) {
                        // @ts-ignore
                        trigger("stop:" + k, a);
                        // @ts-ignore
                        trigger("stop", a);
                        trigger_(k, a);
                    }
                }
                drag_H = 0,
                    drag_SV = 0;
            }

            // @ts-ignore
            function down_H(e) {
                start_H = 1,
                    drag_H = 1,
                    move(e), prevent(e);
                // @ts-ignore
                trigger("start:h", [v, $]);
                // @ts-ignore
                trigger("start", [v, $]);
                trigger_("h", [v, $]);
            }

            // @ts-ignore
            function down_SV(e) {
                start_SV = 1,
                    drag_SV = 1,
                    move(e), prevent(e);
                // @ts-ignore
                trigger("start:sv", [v, $]);
                // @ts-ignore
                trigger("start", [v, $]);
                trigger_("sv", [v, $]);
            }

            if (!first) {
                on(on_down, H, down_H);
                on(on_down, SV, down_SV);
                on(on_move, doc, move);
                on(on_up, doc, stop);
                on(on_resize, win, fit);
            }
            // @ts-ignore
        }

        // @ts-ignore
        create(1);

        delay(function () {
            var a = [HSV2HEX(HSV), $];
            // @ts-ignore
            trigger("create", a);
            trigger_(0, a);
        }, 0);

        // fit to window
        // @ts-ignore
        $.fit = function (o) {
            var w = size(win),
                y = size(h),
                screen_w = w.w - y.w, // vertical scroll bar
                // @ts-ignore
                screen_h = w.h - h.clientHeight, // horizontal scroll bar
                ww = offset(win),
                to = offset(source);
            left = to.l + ww.l;
            top = to.t + ww.t + size(source).h; // drop!
            if (typeof o === "object") {
                elyGuard.isSet(o[0]) && (left = o[0]);
                elyGuard.isSet(o[1]) && (top = o[1]);
            } else {
                var min_x = ww.l,
                    min_y = ww.t,
                    max_x = ww.l + w.w - P_W - screen_w,
                    max_y = ww.t + w.h - P_H - screen_h;
                left = edge(left, min_x, max_x) >> 0;
                top = edge(top, min_y, max_y) >> 0;
            }
            self.style.left = left + 'px';
            self.style.top = top + 'px';
            // @ts-ignore
            return trigger("fit", [$]), $;
        };

        // for event listener ID
        function fit() {
            // @ts-ignore
            return $.fit();
        }

        // set hidden color picker data
        // @ts-ignore
        $.set = function (a) {
            // @ts-ignore
            if (a === undefined) return get_data();
            if (typeof a === "string") {
                a = $$.parse(a);
            }
            // @ts-ignore
            return set_data(a), set(), $;
        };

        // alias for `$.set()`
        // @ts-ignore
        $.get = function (a) {
            return get_data(a);
        };

        // register to global ...
        // @ts-ignore
        $.source = source;
        // @ts-ignore
        $.self = self;
        // @ts-ignore
        $.visible = false;
        // @ts-ignore
        $.on = add;
        // @ts-ignore
        $.off = remove;
        // @ts-ignore
        $.fire = trigger;
        // @ts-ignore
        $.hooks = hooks;
        // @ts-ignore
        $.enter = function (bucket) {
            return create(0, bucket);
        };

        // return the global object
        return $;

    });

})(window, document, 'CP');