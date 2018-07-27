/*
All of the code within the FancyGrid software is developed and copyrighted by FancyGrid, Inc., and may not be copied,
replicated, or used in any other software or application without prior permission from FancyGrid. All usage must coincide with the
FancyGrid End User License Agreement which can be requested by email at support@fancygrid.com.

Build: 1.7.37
*/
! function(a, b) {
    "object" == typeof module && module.exports ? module.exports = a.document ? b(a) : b : a.Fancy = b(a)
}("undefined" != typeof window ? window : this, function(win) {
    var Fancy = {
        global: window,
        version: "1.7.37",
        site: "fancygrid.com",
        COLORS: ["#9DB160", "#B26668", "#4091BA", "#8E658E", "#3B8D8B", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]
    };
    return window.Fancy = Fancy, Fancy.apply = function(a, b) {
            if (void 0 !== b)
                for (var c in b) a[c] = b[c]
        }, Fancy.applyIf = function(a, b) {
            for (var c in b) void 0 === a[c] && (a[c] = b[c])
        }, Fancy.namespace = function() {
            for (var a = 0, b = arguments.length; a < b; a++) {
                var c = arguments[a],
                    d = c.split("."),
                    e = 1,
                    f = d.length;
                Fancy.global[d[0]] = Fancy.global[d[0]] || {};
                for (var g = Fancy.global[d[0]]; e < f; e++) g[d[e]] = g[d[e]] || {}, g = g[d[e]]
            }
        }, Fancy.ns = Fancy.namespace, Fancy.typeOf = function(a) {
            if (null === a) return "null";
            var b = typeof a;
            if ("undefined" === b || "string" === b || "number" === b || "boolean" === b) return b;
            var c = Object.prototype.toString,
                d = c.call(a);
            if (void 0 !== a.length && "function" != typeof a) return "array";
            switch (d) {
                case "[object Array]":
                    return "array";
                case "[object Date]":
                    return "date";
                case "[object Boolean]":
                    return "boolean";
                case "[object Number]":
                    return "number";
                case "[object RegExp]":
                    return "regexp"
            }
            return "function" === b ? "function" : "object" === b ? "object" : void 0
        }, Fancy.isArray = "isArray" in Array ? Array.isArray : function(a) {
            var b = Object.prototype.toString;
            return "[object Array]" === b.call(a)
        }, Fancy.isObject = function(a) {
            var b = Object.prototype.toString;
            return "[object Object]" === b.call(a)
        }, Fancy.isFunction = function(a) {
            var b = Object.prototype.toString;
            return "[object Function]" === b.apply(a)
        }, Fancy.isString = function(a) {
            return "string" == typeof a
        }, Fancy.isNumber = function(a) {
            return "number" == typeof a && isFinite(a)
        }, Fancy.isDom = function(a) {
            try {
                return a instanceof HTMLElement
            } catch (b) {
                return "object" == typeof a && 1 === a.nodeType && "object" == typeof a.style && "object" == typeof a.ownerDocument
            }
        }, Fancy.isBoolean = function(a) {
            return "boolean" == typeof a
        }, Fancy.isDate = function(a) {
            return "date" === Fancy.typeOf(a)
        }, Fancy.each = function(a, b) {
            switch (Fancy.typeOf(a)) {
                case "array":
                case "string":
                    for (var c = 0, d = a.length; c < d && !0 !== b(a[c], c, a); c++);
                    break;
                case "object":
                    for (var e in a)
                        if (!0 === b(a[e], e, a)) break
            }
        }, Fancy.mixin = function(a, b) {
            var c = 0,
                d = b.length;
            if ("object" === Fancy.typeOf(b[0]))
                for (; c < d; c++)
                    for (var e = b[c], f = e._class, g = e.methods, h = 0, i = g.length; h < i; h++) {
                        var j = g[h];
                        a[j] = f.prototype[j]
                    } else
                        for (; c < d; c++) {
                            var e = b[c];
                            if (Fancy.isString(e)) {
                                var k = Fancy.ClassManager.getMixin(e);
                                k ? Fancy.apply(a, k.prototype) : Fancy.ClassManager.waitMixin(e, a)
                            } else Fancy.apply(a, e.prototype)
                        }
        }, Fancy.Mixin = function(a, b) {
            var c = a.split("."),
                d = 1,
                e = c.length - 1;
            Fancy.ns(a);
            for (var f = Fancy.global[c[0]]; d < e; d++) f = f[c[d]];
            c.length > 1 ? (f[c[c.length - 1]] = function() {}, f[c[c.length - 1]].prototype = b) : (Fancy.global[c[0]] = function() {}, Fancy.global[c[0]].prototype = b);
            var g = Fancy.ClassManager.waitMixins[a];
            if (g) {
                g = g.waiters;
                for (var d = 0, e = g.length; d < e; d++) Fancy.apply(g[d], b)
            }
        }, Fancy.applyConfig = function(a, b) {
            var c, b = b || {};
            if (a.plugins && b.plugins && (a.plugins = a.plugins.concat(b.plugins), delete b.plugins), !0 === a._isConfigApplied) return a;
            for (c in b) a[c] = b[c];
            return a._isConfigApplied = !0, a
        }, Fancy.styleToString = function(a) {
            var b = "";
            a = a || {};
            for (var c in a) b += c + ": " + a[c] + ";";
            return b
        }, Fancy.apply(Fancy, {
            prefix: "fancy-gen-",
            idSeed: 0,
            zIndex: 1,
            id: function(a, b) {
                return a ? (a = a.dom || {}, a.id || (a.id = (b || Fancy.prefix) + ++Fancy.idSeed), a.id) : (b || Fancy.prefix) + ++Fancy.idSeed
            }
        }), Fancy.apply(Fancy, {
            cls: "fancy",
            TOUCH_CLS: "fancy-touch",
            HIDDEN_CLS: "fancy-display-none",
            CLEARFIX_CLS: "fancy-clearfix",
            MODAL_CLS: "fancy-modal",
            PANEL_CLS: "fancy-panel",
            PANEL_BODY_CLS: "fancy-panel-body",
            PANEL_BODY_INNER_CLS: "fancy-panel-body-inner",
            PANEL_GRID_INSIDE_CLS: "fancy-panel-grid-inside",
            PANEL_SHADOW_CLS: "fancy-panel-shadow",
            PANEL_SUB_HEADER_CLS: "fancy-panel-sub-header",
            PANEL_SUB_HEADER_TEXT_CLS: "fancy-panel-sub-header-text",
            PANEL_HEADER_CLS: "fancy-panel-header",
            PANEL_HEADER_IMG_CLS: "fancy-panel-header-img",
            PANEL_HEADER_TEXT_CLS: "fancy-panel-header-text",
            PANEL_HEADER_TOOLS_CLS: "fancy-panel-header-tools",
            PANEL_TBAR_CLS: "fancy-panel-tbar",
            PANEL_BBAR_CLS: "fancy-panel-bbar",
            PANEL_SUB_TBAR_CLS: "fancy-panel-sub-tbar",
            PANEL_BUTTONS_CLS: "fancy-panel-buttons",
            PANEL_NOFRAME_CLS: "fancy-panel-noframe",
            PANEL_FOOTER_CLS: "fancy-panel-footer",
            PANEL_TAB_CLS: "fancy-panel-tab",
            PANEL_DRAGGABLE_CLS: "fancy-panel-draggable",
            BAR_CLS: "fancy-bar",
            BAR_TEXT_CLS: "fancy-bar-text",
            BAR_CONTAINER_CLS: "fancy-bar-container",
            BAR_BUTTON_CLS: "fancy-bar-button",
            BAR_SEG_BUTTON_CLS: "fancy-bar-seg-button",
            BAR_LEFT_SCROLLER_CLS: "fancy-bar-left-scroller",
            BAR_RIGHT_SCROLLER_CLS: "fancy-bar-right-scroller",
            FORM_CLS: "fancy-form",
            FORM_BODY_CLS: "fancy-form-body",
            FIELD_CLS: "fancy-field",
            FIELD_LABEL_CLS: "fancy-field-label",
            FIELD_EMPTY_CLS: "fancy-field-empty",
            FIELD_DISABLED_CLS: "fancy-field-disabled",
            FIELD_BLANK_ERR_CLS: "fancy-field-blank-err",
            FIELD_NOT_VALID_CLS: "fancy-field-not-valid",
            FIELD_TEXT_CLS: "fancy-field-text",
            FIELD_TEXT_INPUT_CLS: "fancy-field-text-input",
            FIELD_ERROR_CLS: "fancy-field-error",
            FIELD_SPIN_CLS: "fancy-field-spin",
            FIELD_SPIN_UP_CLS: "fancy-field-spin-up",
            FIELD_SPIN_DOWN_CLS: "fancy-field-spin-down",
            FIELD_CHECKBOX_CLS: "fancy-field-checkbox",
            FIELD_CHECKBOX_DISABLED_CLS: "fancy-field-checkbox-disabled",
            FIELD_CHECKBOX_INPUT_CLS: "fancy-field-checkbox-input",
            FIELD_CHECKBOX_ON_CLS: "fancy-checkbox-on",
            FIELD_INPUT_LABEL_CLS: "fancy-field-input-label",
            FIELD_BUTTON_CLS: "fancy-field-button",
            FIELD_TAB_CLS: "fancy-field-tab",
            FIELD_COMBO_CLS: "fancy-combo",
            FIELD_COMBO_SELECTED_ITEM_CLS: "fancy-combo-item-selected",
            FIELD_COMBO_FOCUSED_ITEM_CLS: "fancy-combo-item-focused",
            FIELD_COMBO_DROPDOWN_BUTTON_CLS: "fancy-combo-dropdown-button",
            FIELD_COMBO_INPUT_CONTAINER_CLS: "fancy-combo-input-container",
            FIELD_COMBO_LIST_VALUE_CLS: "fancy-combo-list-value",
            FIELD_COMBO_LEFT_EL_CLS: "fancy-combo-left-el",
            FIELD_COMBO_RESULT_LIST_CLS: "fancy-combo-result-list",
            FIELD_SEARCH_CLS: "fancy-field-search",
            FIELD_SEARCH_LIST_CLS: "fancy-field-search-list",
            FIELD_SEARCH_PARAMS_LINK_CLS: "fancy-field-search-params-link",
            FIELD_SEARCH_PARAMED_CLS: "fancy-field-search-paramed",
            FIELD_SEARCH_PARAMED_EMPTY_CLS: "fancy-field-search-paramed-empty",
            FIELD_PICKER_BUTTON_CLS: "fancy-field-picker-button",
            FIELD_LABEL_ALIGN_TOP_CLS: "fancy-field-label-align-top",
            FIELD_LABEL_ALIGN_RIGHT_CLS: "fancy-field-label-align-right",
            FIELD_TEXTAREA_CLS: "fancy-textarea",
            FIELD_TEXTAREA_TEXT_CLS: "fancy-textarea-text",
            FIELD_TEXTAREA_TEXT_INPUT_CLS: "fancy-textarea-text-input",
            FIELD_RADIO_CLS: "fancy-field-radio",
            FIELD_RADIO_COLUMN_CLS: "fancy-field-radio-column",
            FIELD_RADIO_ON_CLS: "fancy-field-radio-on",
            FIELD_RADIO_INPUT_CLS: "fancy-field-radio-input",
            FIELD_TAB_ACTIVE_CLS: "fancy-field-tab-active",
            GRID_CLS: "fancy-grid",
            GRID_UNSELECTABLE_CLS: "fancy-grid-unselectable",
            GRID_EMPTY_CLS: "fancy-grid-empty-text",
            GRID_LEFT_EMPTY_CLS: "fancy-grid-left-empty",
            GRID_RIGHT_EMPTY_CLS: "fancy-grid-right-empty",
            GRID_CENTER_CLS: "fancy-grid-center",
            GRID_LEFT_CLS: "fancy-grid-left",
            GRID_RIGHT_CLS: "fancy-grid-right",
            GRID_RESIZER_LEFT_CLS: "fancy-grid-resizer-left",
            GRID_RESIZER_RIGHT_CLS: "fancy-grid-resizer-right",
            GRID_STATE_DRAG_COLUMN_CLS: "fancy-grid-state-drag-column",
            GRID_STATE_RESIZE_COLUMN_CLS: "fancy-grid-state-resize-column",
            GRID_HEADER_CLS: "fancy-grid-header",
            GRID_HEADER_CELL_CLS: "fancy-grid-header-cell",
            GRID_HEADER_CELL_CONTAINER_CLS: "fancy-grid-header-cell-container",
            GRID_HEADER_CELL_TEXT_CLS: "fancy-grid-header-cell-text",
            GRID_HEADER_CELL_DOUBLE_CLS: "fancy-grid-header-cell-double",
            GRID_HEADER_CELL_TRIPLE_CLS: "fancy-grid-header-cell-triple",
            GRID_HEADER_CELL_TRIGGER_CLS: "fancy-grid-header-cell-trigger",
            GRID_HEADER_CELL_TRIGGER_IMAGE_CLS: "fancy-grid-header-cell-trigger-image",
            GRID_HEADER_CELL_TRIGGER_DISABLED_CLS: "fancy-grid-header-cell-trigger-disabled",
            GRID_HEADER_CELL_GROUP_LEVEL_1_CLS: "fancy-grid-header-cell-group-level-1",
            GRID_HEADER_CELL_GROUP_LEVEL_2_CLS: "fancy-grid-header-cell-group-level-2",
            GRID_HEADER_CELL_SELECT_CLS: "fancy-grid-header-cell-select",
            GRID_HEADER_CELL_TRIGGER_UP_CLS: "fancy-grid-header-cell-trigger-up",
            GRID_HEADER_CELL_TRIGGER_DOWN_CLS: "fancy-grid-header-cell-trigger-down",
            GRID_HEADER_COLUMN_TRIGGERED_CLS: "fancy-gridf-header-column-triggered",
            GRID_HEADER_CELL_FILTER_CLS: "fancy-grid-header-filter-cell",
            GRID_HEADER_CELL_FILTER_FULL_CLS: "fancy-grid-header-filter-cell-full",
            GRID_HEADER_CELL_FILTER_SMALL_CLS: "fancy-grid-header-filter-cell-small",
            GRID_HEADER_CELL_CHECKBOX_CLS: "fancy-grid-header-cell-checkbox",
            GRID_CELL_CLS: "fancy-grid-cell",
            GRID_CELL_INNER_CLS: "fancy-grid-cell-inner",
            GRID_CELL_OVER_CLS: "fancy-grid-cell-over",
            GRID_CELL_SELECTED_CLS: "fancy-grid-cell-selected",
            GRID_CELL_ACTIVE_CLS: "fancy-grid-cell-active",
            GRID_CELL_EVEN_CLS: "fancy-grid-cell-even",
            GRID_CELL_WRAPPER_CLS: "fancy-grid-cell-wrapper",
            GRID_CELL_DIRTY_CLS: "fancy-grid-cell-dirty",
            GRID_CELL_DIRTY_EL_CLS: "fancy-grid-cell-dirty-el",
            GRID_PSEUDO_CELL_CLS: "fancy-grid-pseudo-cell",
            GRID_COLUMN_CLS: "fancy-grid-column",
            GRID_COLUMN_OVER_CLS: "fancy-grid-column-over",
            GRID_COLUMN_SELECT_CLS: "fancy-grid-column-select",
            GRID_COLUMN_SELECTED_CLS: "fancy-grid-column-selected",
            GRID_COLUMN_ELLIPSIS_CLS: "fancy-grid-column-ellipsis",
            GRID_COLUMN_ORDER_CLS: "fancy-grid-column-order",
            GRID_COLUMN_TEXT_CLS: "fancy-grid-column-text",
            GRID_COLUMN_SORT_ASC: "fancy-grid-column-sort-ASC",
            GRID_COLUMN_SORT_DESC: "fancy-grid-column-sort-DESC",
            GRID_COLUMN_COLOR_CLS: "fancy-grid-column-color",
            GRID_COLUMN_RESIZER_CLS: "fancy-grid-column-resizer",
            GRID_COLUMN_ROW_DRAG_CLS: "fancy-grid-column-row-drag",
            GRID_COLUMN_SPARKLINE_CLS: "fancy-grid-column-sparkline",
            GRID_COLUMN_SPARKLINE_BULLET_CLS: "fancy-grid-column-sparkline-bullet",
            GRID_COLUMN_SPARK_PROGRESS_DONUT_CLS: "fancy-grid-column-spark-progress-donut",
            GRID_COLUMN_CHART_CIRCLE_CLS: "fancy-grid-column-chart-circle",
            GRID_COLUMN_GROSSLOSS_CLS: "fancy-grid-column-grossloss",
            GRID_COLUMN_PROGRESS_CLS: "fancy-grid-column-progress",
            GRID_COLUMN_PROGRESS_BAR_CLS: "fancy-grid-column-progress-bar",
            GRID_COLUMN_H_BAR_CLS: "fancy-grid-column-h-bar",
            GRID_COLUMN_ACTION_ITEM_CLS: "fancy-grid-column-action-item",
            GRID_ROW_OVER_CLS: "fancy-grid-cell-over",
            GRID_ROW_EDIT_CLS: "fancy-grid-row-edit",
            GRID_ROW_EDIT_BUTTONS_CLS: "fancy-grid-row-edit-buttons",
            GRID_ROW_EDIT_BUTTON_UPDATE_CLS: "fancy-edit-row-button-update",
            GRID_ROW_EDIT_BUTTON_CANCEL_CLS: "fancy-edit-row-button-cancel",
            GRID_ROW_GROUP_CLS: "fancy-grid-group-row",
            GRID_ROW_GROUP_INNER_CLS: "fancy-grid-group-row-inner",
            GRID_ROW_GROUP_COLLAPSED_CLS: "fancy-grid-group-row-collapsed",
            GRID_ROW_SUMMARY_CLS: "fancy-grid-summary-row",
            GRID_ROW_SUMMARY_CONTAINER_CLS: "fancy-grid-summary-container",
            GRID_ROW_SUMMARY_BOTTOM_CLS: "fancy-grid-summary-row-bottom",
            GRID_ROW_EXPAND_CLS: "fancy-grid-expand-row",
            GRID_ROW_EXPAND_OVER_CLS: "fancy-grid-expand-row-over",
            GRID_ROW_EXPAND_SELECTED_CLS: "fancy-grid-expand-row-selected",
            GRID_ROW_DRAG_EL_CLS: "fancy-grid-row-drag-el",
            GRID_BODY_CLS: "fancy-grid-body",
            MENU_CLS: "fancy-menu",
            MENU_ITEM_CLS: "fancy-menu-item",
            MENU_ITEM_IMAGE_CLS: "fancy-menu-item-image",
            MENU_ITEM_TEXT_CLS: "fancy-menu-item-text",
            MENU_ITEM_SIDE_TEXT_CLS: "fancy-menu-item-side-text",
            MENU_ITEM_ACTIVE_CLS: "fancy-menu-item-active",
            MENU_ITEM_RIGHT_IMAGE_CLS: "fancy-menu-item-right-image",
            MENU_ITEM_EXPAND_CLS: "fancy-menu-item-expand",
            MENU_ITEM_DISABLED_CLS: "fancy-menu-item-disabled",
            MENU_ITEM_SEP_CLS: "fancy-menu-item-sep",
            MENU_ITEM_NO_IMAGE_CLS: "fancy-menu-item-no-image",
            MENU_ITEM_IMG_COPY_CLS: "fancy-menu-item-img-copy",
            MENU_ITEM_IMG_DELETE_CLS: "fancy-menu-item-img-delete",
            MENU_ITEM_IMG_EDIT_CLS: "fancy-menu-item-img-edit",
            TAB_WRAPPER_CLS: "fancy-tab-wrapper",
            TAB_ACTIVE_WRAPPER_CLS: "fancy-active-tab-wrapper",
            TAB_TBAR_CLS: "fancy-toolbar-tab",
            TAB_TBAR_ACTIVE_CLS: "fancy-toolbar-tab-active",
            BUTTON_CLS: "fancy-button",
            BUTTON_DISABLED_CLS: "fancy-button-disabled",
            BUTTON_PRESSED_CLS: "fancy-button-pressed",
            BUTTON_IMAGE_CLS: "fancy-button-image",
            BUTTON_IMAGE_COLOR_CLS: "fancy-button-image-color",
            BUTTON_TEXT_CLS: "fancy-button-text",
            BUTTON_DROP_CLS: "fancy-button-drop",
            BUTTON_MENU_CLS: "fancy-button-menu",
            SEG_BUTTON_CLS: "fancy-seg-button",
            TOOLTIP_CLS: "fancy-tooltip",
            TOOLTIP_INNER_CLS: "fancy-tooltip-inner",
            SEPARATOR_CLS: "fancy-separator",
            FOOTER_STATUS_CLS: "fancy-footer-status",
            STATUS_SOURCE_TEXT_CLS: "fancy-status-source-text",
            STATUS_SOURCE_LINK_CLS: "fancy-status-source-link",
            FOOTER_SOURCE_CLS: "fancy-footer-source",
            PICKER_MONTH_CELL_ACTIVE_CLS: "fancy-month-picker-cell-active",
            PICKER_MONTH_CLS: "fancy-month-picker",
            PICKER_BUTTON_BACK_CLS: "fancy-picker-button-back",
            PICKER_BUTTON_NEXT_CLS: "fancy-picker-button-next",
            PICKER_MONTH_ACTION_BUTTONS_CLS: "fancy-month-picker-action-buttons",
            PICKER_DATE_CLS: "fancy-date-picker",
            PICKER_DATE_CELL_TODAY_CLS: "fancy-date-picker-cell-today",
            PICKER_DATE_CELL_ACTIVE_CLS: "fancy-date-picker-cell-active",
            PICKER_DATE_CELL_OUT_RANGE_CLS: "fancy-date-picker-cell-out-range",
            PICKER_BUTTON_DATE_CLS: "fancy-picker-button-date",
            PICKER_BUTTON_DATE_WRAPPER_CLS: "fancy-picker-button-date-wrapper",
            PICKER_BUTTON_TODAY_CLS: "fancy-picker-button-today",
            PICKER_BUTTON_TODAY_WRAPPER_CLS: "fancy-picker-button-today-wrapper"
        }), Fancy.ANIMATE_DURATION = 300,
        function() {
            var a = navigator.userAgent.toLowerCase(),
                b = function(b) {
                    return b.test(a)
                },
                c = b(/opera/),
                d = !c && b(/msie/),
                e = window.chrome,
                f = window.navigator,
                g = f.vendor,
                h = f.userAgent.indexOf("Edge") > -1,
                i = f.userAgent.match("CriOS"),
                j = function() {
                    var a = f.userAgent.indexOf("OPR") > -1;
                    return !!i || null !== e && void 0 !== e && "Google Inc." === g && !1 === a && !1 === h
                }();
            11 === function() {
                var a = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var b = navigator.userAgent,
                        c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                } else if ("Netscape" == navigator.appName) {
                    var b = navigator.userAgent,
                        c = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }() && (d = !0), !1 === d && h && (d = !0), Fancy.apply(Fancy, {
                isOpera: c,
                isIE: d,
                isChrome: j
            }), Fancy.getViewSize = function() {
                var a = [];
                return Fancy.isIE ? (a[0] = document.documentElement.clientHeight, a[1] = document.documentElement.clientWidth) : (a[0] = window.innerHeight, a[1] = window.innerWidth), a
            }, Fancy.getScroll = function() {
                var a = document.documentElement,
                    b = document.body;
                return a && (a.scrollTop || a.scrollLeft) ? [a.scrollTop, a.scrollLeft] : b ? [b.scrollTop, b.scrollLeft] : [0, 0]
            }, Fancy.getMouseWheelEventName = function() {
                return "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll"
            }, Fancy.getWheelDelta = function(a) {
                var b = 0;
                return a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3), b
            }, Fancy.isTouch = void 0 !== document.ontouchstart, Fancy.i18n = {}, Fancy.currencies = {
                map: {
                    EUR: "â‚¬",
                    USD: "$",
                    GBP: "Â£",
                    RUB: "â‚½",
                    CZK: "KÄ",
                    AUD: "$",
                    JPY: "Â¥",
                    PLN: "zÅ‚",
                    TRY: "â‚º",
                    DKK: "kr",
                    KRW: "â‚©",
                    BRL: "R$",
                    CNY: "Â¥",
                    SEK: "kr",
                    CAD: "$",
                    NOK: "kr",
                    IDR: "Rp"
                }
            }
        }(), Fancy.modules = {},
        function() {
            var a = {};
            Fancy.loadModule = function(b, c) {
                var d = document.getElementsByTagName("body")[0],
                    e = document.createElement("script"),
                    f = b,
                    g = Fancy.DEBUG ? ".js" : ".min.js",
                    c = c || function() {},
                    h = Fancy.version.replace(/\./g, ""),
                    i = Fancy.MODULESDIR || FancyGrid.MODULESDIR || "https://cdn.fancygrid.com/modules/";
                !1 !== Fancy.MODULELOAD && !1 !== Fancy.MODULESLOAD && (b = b.replace(/ /g, "-"), Fancy.DEBUG ? g += "?_dc=" + +new Date : g += "?_v=" + h, Fancy.Modules.on("loaded", function(a, d) {
                    d === b && (Fancy.modules[f] = !0, c(b))
                }), a[b] || (a[b] = !0, e.src = i + b + g, e.charset = "utf-8", e.onload = function() {
                    Fancy.Modules.fire("loaded", b)
                }, e.onerror = function() {
                    throw new Error("[FancyGrid error] - module " + b + " was not loaded")
                }, d.appendChild(e)))
            }, Fancy.loadLang = function(a, b) {
                if (void 0 !== Fancy.i18n[a]) return !0;
                var c = document.getElementsByTagName("body")[0],
                    d = document.createElement("script"),
                    e = Fancy.MODULESDIR || FancyGrid.MODULESDIR || "https://cdn.fancygrid.com/modules/";
                d.src = e + "i18n/" + a + ".js", d.charset = "utf-8", d.async = "true", d.onload = function() {
                    b({
                        lang: Fancy.i18n[a]
                    })
                }, c.appendChild(d)
            }, Fancy.loadStyle = function() {
                var a = document.querySelectorAll("link");
                if (!Fancy.stylesLoaded) {
                    Fancy.each(a, function(a) {
                        /fancy\./.test(a.href) && (Fancy.stylesLoaded = !0)
                    });
                    var a = document.querySelectorAll("link");
                    if (!Fancy.stylesLoaded && (Fancy.each(a, function(a) {
                            /fancy\./.test(a.href) && (Fancy.stylesLoaded = !0)
                        }), !Fancy.stylesLoaded)) {
                        var b = document.getElementsByTagName("head")[0],
                            c = document.createElement("link"),
                            d = Fancy.DEBUG ? ".css" : ".min.css",
                            e = Fancy.version.replace(/\./g, ""),
                            f = Fancy.MODULESDIR || FancyGrid.MODULESDIR || "https://cdn.fancygrid.com/";
                        f = f.replace("modules/", ""), f = f.replace("modules", ""), Fancy.DEBUG ? d += "?_dc=" + +new Date : d += "?_v=" + e, c.href = f + "fancy" + d, c.rel = "stylesheet", b.appendChild(c)
                    }
                }
            }
        }(), Fancy.themes = {}, Fancy.defineTheme = function(a, b) {
            var c = {};
            b.extend ? Fancy.apply(c, Fancy.getTheme(b.extend).config) : "default" !== a && Fancy.apply(c, Fancy.getTheme("default").config), Fancy.apply(c, b.config), b.config = c, Fancy.themes[a] = b
        }, Fancy.getTheme = function(a) {
            var b = {
                config: {}
            };
            return Fancy.isObject(a) ? (Fancy.applyIf(b, Fancy.themes[a.name || "default"]), Fancy.apply(b.config, Fancy.themes[a.name || "default"].config), Fancy.apply(b.config, a.config), b) : Fancy.themes[a]
        }, Fancy.defineTheme("default", {
            config: {
                cellHeaderHeight: 30,
                cellWidth: 70,
                minCellWidth: 40,
                cellHeight: 32,
                titleHeight: 42,
                subTitleHeight: 42,
                barHeight: 38,
                bottomScrollHeight: 12,
                minCenterWidth: 100,
                panelBorderWidth: 2,
                groupRowHeight: 31,
                gridBorders: [1, 1, 1, 1],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 2, 2, 2],
                knobOffSet: 2,
                fieldHeight: 37,
                charWidth: 7
            }
        }), Fancy.defineTheme("blue", {
            config: {
                panelBorderWidth: 1,
                gridBorders: [1, 1, 1, 1],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 0, 0, 0],
                charWidth: 7
            }
        }), Fancy.defineTheme("gray", {
            config: {
                panelBorderWidth: 0,
                gridBorders: [0, 0, 1, 0],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 0, 0, 0],
                charWidth: 7
            }
        }), Fancy.defineTheme("dark", {
            config: {
                panelBorderWidth: 1,
                gridBorders: [0, 1, 1, 1],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 0, 0, 0],
                charWidth: 7
            }
        }), Fancy.defineTheme("sand", {
            config: {
                panelBorderWidth: 1,
                gridBorders: [0, 1, 1, 1],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 0, 0, 0],
                charWidth: 7
            }
        }), Fancy.defineTheme("bootstrap", {
            config: {
                panelBorderWidth: 1,
                gridBorders: [1, 1, 1, 1],
                gridWithoutPanelBorders: [1, 1, 1, 1],
                panelBodyBorders: [0, 0, 0, 0],
                charWidth: 7
            }
        }), Fancy.defineTheme("bootstrap-no-borders", {
            config: {
                panelBorderWidth: 0,
                gridBorders: [0, 0, 0, 0],
                gridWithoutPanelBorders: [0, 0, 0, 0],
                panelBodyBorders: [0, 0, 0, 0],
                columnLines: !1,
                charWidth: 8
            }
        }), Fancy.String = {
            format: function(a) {
                var b, c, d;
                if ("array" === Fancy.typeOf(arguments[1])) b = arguments[1];
                else
                    for (d = arguments.length, b = [], c = 1; c < d; c++) b[c - 1] = arguments[c];
                return a.replace(/\[(\d+)]/g, function(a, c) {
                    return b[c]
                })
            },
            upFirstChar: function(a) {
                return a[0].toLocaleUpperCase() + a.substr(1, a.length)
            },
            trim: function(a) {
                return a.replace(/\s/g, "")
            }
        }, Fancy.Array = {
            copy: function(a, b) {
                if (!b) return a.slice();
                for (var c = [], d = 0, e = a.length; d < e; d++) switch (Fancy.typeOf(a[d])) {
                    case "object":
                        c[d] = Fancy.Object.copy(a[d]);
                        break;
                    case "array":
                        c[d] = Fancy.Array.copy(a[d]);
                        break;
                    default:
                        c = a[d]
                }
                return c
            },
            each: function(a, b) {
                for (var c = 0, d = a.length; c < d; c++) b(a[c], c)
            },
            count: function(a) {
                return a.length
            },
            sum: function(a) {
                var b = 0,
                    c = a.length,
                    d = 0;
                if (Fancy.isArray(a[0]))
                    for (d = []; b < c; b++)
                        for (var e = 0, f = a[b].length; e < f; e++) void 0 === d[e] && (d[e] = 0), d[e] += a[b][e];
                else
                    for (; b < c; b++) d += a[b];
                return d
            },
            min: function(a) {
                return Math.min.apply(this, a)
            },
            max: function(a) {
                return Math.max.apply(this, a)
            },
            average: function(a) {
                for (var b = 0, c = 0, d = a.length; c < d; c++) b += a[c];
                return b / a.length
            },
            insert: function(a, b, c) {
                var d = a.splice(b, a.length - b);
                return a = a.concat(c).concat(d)
            }
        }, Fancy.Object = {
            copy: function(a) {
                var b = {};
                for (var c in a) b[c] = a[c];
                return b
            },
            isEmpty: function(a) {
                var b = !0;
                for (var c in a) b = !1;
                return b
            }
        }, Fancy.Number = {
            isFloat: function(a) {
                return Number(a) === a && a % 1 != 0
            },
            getPrecision: function(a) {
                return (a + "").split(".")[1].length + 1
            },
            correctFloat: function(a) {
                return parseFloat(a.toPrecision(14))
            }
        }, Fancy.Collection = function(a) {
            var b = this;
            if (b.items = [], b.keys = [], b.map = {}, b.indexMap = {}, b.length = 0, a)
                if (a.length > 0)
                    for (var c = 0, d = a.length; c < d; c++) b.add(c, a[c]);
                else
                    for (var e in a) b.add(e, a[e])
        }, Fancy.Collection.prototype = {
            add: function(a, b) {
                var c = this;
                c.items.push(b), c.keys.push(a), c.map[a] = b, c.indexMap[a] = c.length, c.length++
            },
            remove: function(a) {
                var b = this,
                    c = b.indexMap[a];
                b.items.splice(c, 1), b.keys.splice(c, 1), delete b.indexMap[c], delete b.map[a], b.length--, b.updateIndexMap()
            },
            updateIndexMap: function() {
                var a = this,
                    b = 0,
                    c = a.keys.length;
                for (a.indexMap = {}; b < c; b++) a.indexMap[a.keys[b]] = b
            },
            removeAll: function() {
                var a = this;
                a.items = [], a.keys = [], a.indexMap = {}, a.map = {}, a.length = 0
            },
            get: function(a) {
                return this.map[a]
            },
            each: function(a) {
                for (var b = this, c = 0, d = b.length; c < d; c++) a(b.keys[c], b.items[c], c, b.length)
            }
        }, Fancy.Template = function(a) {
            var b = this;
            Fancy.isArray(a) ? b.tpl = a.join("") : b.tpl = a, b.compile()
        }, Fancy.Template.prototype = {
            re: /\{([\w\-]+)\}/g,
            getHTML: function(a) {
                return this.compiled(a || {})
            },
            compile: function() {
                function fn(a, b) {
                    return "'+(" + (b = "values['" + b + "']") + " === undefined ? '' : " + b + ")+'"
                }
                var me = this;
                return eval("me.compiled = function(values){ return '" + me.tpl.replace(me.re, fn) + "';};"), me
            }
        }, Fancy.key = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            RETURN: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            NUM_ZERO: 96,
            NUM_ONE: 97,
            NUM_TWO: 98,
            NUM_THREE: 99,
            NUM_FOUR: 100,
            NUM_FIVE: 101,
            NUM_SIX: 102,
            NUM_SEVEN: 103,
            NUM_EIGHT: 104,
            NUM_NINE: 105,
            NUM_PLUS: 107,
            NUM_MINUS: 109,
            NUM_DOT: 110,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            DOT: 190
        }, Fancy.Key = {
            isNum: function(a) {
                var b = Fancy.key;
                switch (a) {
                    case b.ZERO:
                    case b.ONE:
                    case b.TWO:
                    case b.THREE:
                    case b.FOUR:
                    case b.FIVE:
                    case b.SIX:
                    case b.SEVEN:
                    case b.EIGHT:
                    case b.NINE:
                    case b.NUM_ZERO:
                    case b.NUM_ONE:
                    case b.NUM_TWO:
                    case b.NUM_THREE:
                    case b.NUM_FOUR:
                    case b.NUM_FIVE:
                    case b.NUM_SIX:
                    case b.NUM_SEVEN:
                    case b.NUM_EIGHT:
                    case b.NUM_NINE:
                        return !0;
                    default:
                        return !1
                }
            },
            isNumControl: function(a, b) {
                var c = Fancy.key;
                if (Fancy.Key.isNum(a)) return !0;
                if (b.shiftKey && 187 === a) return !0;
                switch (a) {
                    case c.NUM_PLUS:
                    case 189:
                    case c.NUM_MINUS:
                    case c.NUM_DOT:
                    case c.BACKSPACE:
                    case c.DELETE:
                    case c.TAB:
                    case c.ENTER:
                    case c.RETURN:
                    case c.SHIFT:
                    case c.CTRL:
                    case c.ALT:
                    case c.ESC:
                    case c.END:
                    case c.HOME:
                    case c.LEFT:
                    case c.UP:
                    case c.RIGHT:
                    case c.DOWN:
                    case c.INSERT:
                    case c.DOT:
                        return !0;
                    default:
                        return !1
                }
            }
        },
        function() {
            var a = {},
                b = {},
                c = function(a, b) {
                    for (var c in b.prototype) void 0 === a.prototype[c] && (a.prototype[c] = b.prototype[c])
                },
                d = function() {
                    this.waitMixins = {}
                };
            d.prototype = {
                items: new Fancy.Collection,
                add: function(a, b) {
                    var c = a.split("."),
                        d = 1,
                        e = c.length - 1;
                    Fancy.ns(a);
                    for (var f = Fancy.global[c[0]]; d < e; d++) f = f[c[d]];
                    c.length > 1 ? f[c[c.length - 1]] = b : Fancy.global[c[0]] = b, this.items.add(a, b)
                },
                get: function(a) {
                    return this.items.get(a)
                },
                waitMixin: function(a, b) {
                    var c = this;
                    c.waitMixins[a] = c.waitMixins[a] || {
                        waiters: []
                    }, c.waitMixins[a].waiters.push(b)
                },
                getMixin: function(a) {
                    var b = a.split("."),
                        c = 1,
                        d = b.length,
                        e = Fancy.global[b[0]];
                    if (void 0 === e) return !1;
                    for (; c < d; c++)
                        if (void 0 === (e = e[b[c]])) return !1;
                    return e
                }
            }, Fancy.ClassManager = new d, Fancy.define = function(d, e) {
                var e = e || {},
                    f = [];
                if (Fancy.isArray(d) && (f = d, d = f[0]), e.constructor === Object && (void 0 === e.extend ? e.constructor = function() {} : e.constructor = function() {
                        this.Super("constructor", arguments)
                    }), void 0 === e.extend) a[d] = e.constructor;
                else {
                    a[d] = e.constructor;
                    var g;
                    switch (typeof e.extend) {
                        case "string":
                            g = Fancy.ClassManager.get(e.extend), a[d].prototype.$Super = Fancy.ClassManager.get(e.extend);
                            break;
                        case "function":
                            g = e.extend, a[d].prototype.$Super = e.extend
                    }
                    delete e.extend, a[d].prototype.Super = function(a, b) {
                        var c = this;
                        switch (c.$Iam ? c.$Iam = Fancy.ClassManager.get(c.$Iam.prototype.$Super.prototype.$name) : c.$Iam = Fancy.ClassManager.get(c.$Super.prototype.$name), a) {
                            case "const":
                            case "constructor":
                                c.$Iam.apply(c, b);
                                break;
                            default:
                                c.$Iam.prototype[a].apply(c, b)
                        }
                        delete c.$Iam
                    }, c(a[d], g)
                }
                a[d].prototype.$name = d, e.mixins && (Fancy.mixin(a[d].prototype, e.mixins), delete a[d].prototype.mixins), void 0 !== e.plugins && (void 0 === a[d].prototype.$plugins && (a[d].prototype.$plugins = []), a[d].prototype.$plugins = a[d].prototype.$plugins.concat(e.plugins), delete a[d].prototype.plugins);
                for (var h in e) a[d].prototype[h] = e[h];
                var i = a[d];
                !0 === e.singleton && (delete a[d], i = new i(e), a[d] = i), f.length > 1 ? Fancy.each(f, function(a) {
                    Fancy.ClassManager.add(a, i)
                }) : Fancy.ClassManager.add(d, i), e.type ? (b[e.type] = i, Fancy.addWidgetType(e.type, i)) : e.ptype && (b[e.type] = i, Fancy.addPluginByType(e.ptype, i))
            }, Fancy.getClassByType = function(a) {
                return b[a]
            }
        }(), Fancy.MixinClass = function() {}, Fancy.MixinClass.prototype = {
            initId: function() {
                var a = this,
                    b = a.prefix || Fancy.prefix;
                a.id = a.id || Fancy.id(null, b), Fancy.addWidget(a.id, a)
            },
            initPlugins: function() {
                var a, b, c, d = this,
                    e = d;
                if (d.plugins = d.plugins || [], d._plugins && (d.plugins = d.plugins.concat(d._plugins)), void 0 !== d.plugins && (d.$plugins = d.plugins, delete d.plugins), void 0 !== d.$plugins)
                    for (var f, g = 0, h = d.$plugins, i = h.length, j = {}; g < i; g++) {
                        c = h[g], c.widget = e;
                        var k = c.type || c.ptype;
                        if (!0 !== j[k]) {
                            if (j[k] = !0, void 0 === (a = Fancy.getPluginByType(k))) throw new Error("[FancyGrid Error] - some of module was not loaded. Grid plugin does not exist - " + k);
                            b = new a(c), f = c.inWidgetName || b.inWidgetName, void 0 !== f && (e[f] = b)
                        }
                    }
            }
        }, Fancy.define("Fancy.Data", {
            constructor: function(a) {
                var b = this;
                if (b.map = {}, a)
                    for (var c = 0, d = a.length, e = b.map; c < d; c++) e[c] = a[c];
                b.length = 0
            },
            add: function(a, b) {
                this.map[a] = b, this.length++
            },
            get: function(a) {
                return this.map[a]
            }
        }), Fancy.define("Fancy.Model", {
            constructor: function(a) {
                var b = this,
                    c = {},
                    d = b.fields || [],
                    e = 0,
                    f = d.length;
                if (Fancy.isArray(a)) {
                    for (; e < f; e++) {
                        var g = d[e];
                        c[g] = a[e]
                    }
                    void 0 === c.id && (Fancy.idSeed++, c.id = Fancy.idSeed + 1e3), b.data = c, b.id = b.data.id
                } else {
                    if (a.id ? b.id = a.id : (Fancy.idSeed++, b.id = Fancy.idSeed + 1e3, a.id = b.id), void 0 === b.fields) {
                        d = [];
                        for (var g in a) d.push(g);
                        b.fields = d
                    }
                    for (f = d.length; e < f; e++) {
                        var g = d[e];
                        void 0 === a[g] ? c[g] = "" : c[g] = a[g]
                    }
                    c.id || (b.fields.push("id"), a.id || (a.id = b.id), c.id = a.id), b.data = c
                }
            },
            get: function(a) {
                var b = this;
                return void 0 === a ? b.data : b.data[a]
            },
            set: function(a, b) {
                var c = this;
                if (void 0 === b && Fancy.isObject(a))
                    for (var d in a) c.set(d, a[d]);
                else c.data[a] = b
            }
        }), Fancy.define("Fancy.PluginManager", {
            singleton: !0,
            constructor: function() {
                this.ptypes = new Fancy.Data
            },
            addPlugin: function(a, b) {
                this.ptypes.add(a, b)
            },
            getPlugin: function(a) {
                return this.ptypes.get(a)
            }
        }), Fancy.addPluginByType = function(a, b) {
            Fancy.PluginManager.addPlugin(a, b)
        }, Fancy.getPluginByType = function(a) {
            return Fancy.PluginManager.getPlugin(a)
        },
        function() {
            var a = Fancy;
            a.define("Fancy.WidgetManager", {
                singleton: !0,
                constructor: function() {
                    this.wtypes = new a.Data, this.widgets = new a.Data
                },
                addWidgetType: function(a, b) {
                    b.prototype.wtype = a, this.wtypes.add(a, b)
                },
                getWidgetClassByType: function(a) {
                    return this.wtypes.get(a)
                },
                addWidget: function(a, b) {
                    this.widgets.add(a, b)
                },
                getWidget: function(a) {
                    return this.widgets.get(a)
                }
            });
            var b = a.WidgetManager;
            a.addWidgetType = function(a, c) {
                b.addWidgetType(a, c)
            }, a.getWidgetClassByType = function(a) {
                return b.getWidgetClassByType(a)
            }, a.addWidget = function(a, c) {
                b.addWidget(a, c)
            }, a.getWidget = function(a) {
                return b.getWidget(a)
            }
        }(),
        function() {
            var a = 0,
                b = {};
            Fancy.define(["Fancy.Event", "Fancy.Observable"], {
                mixins: [Fancy.MixinClass],
                constructor: function(a) {
                    var b = this;
                    if (Fancy.applyConfig(b, a || {}), b.$events = {}, b.listeners || b.events)
                        for (var c = b.listeners || b.events, d = 0, e = c.length; d < e; d++) {
                            var f = c[d],
                                g = null,
                                h = null,
                                i = null,
                                j = 0,
                                k = [];
                            for (var l in f) switch (l) {
                                case "scope":
                                    i = f[l];
                                    break;
                                case "params":
                                    k = f[l];
                                    break;
                                case "delay":
                                    j = f[l];
                                    break;
                                default:
                                    g = l, h = f[l]
                            }
                            if (null === g) throw new Error("Event was not set");
                            switch (Fancy.typeOf(h)) {
                                case "string":
                                    h = b[h], f.handler = h, void 0 === f.scope && (i = b), f.scope = i;
                                    break;
                                case "function":
                                    break;
                                default:
                                    throw new Error("Handler has wrong type or not defined")
                            }
                            if (!1 === Fancy.isArray(k)) throw new Error("params must be array");
                            b.addEvent(g), b.on(g, h, i, k, j)
                        }
                },
                on: function(c, d, e, f, g) {
                    if (void 0 === this.$events[c]) throw new Error("Event name is not set: " + c);
                    if (void 0 === d) throw new Error("Handler is undefined. Name of event is " + c + ".");
                    d.$fancyFnSeed = a, b[a] = d, a++, this.$events[c].push({
                        fn: d,
                        scope: e,
                        params: f || [],
                        delay: g
                    })
                },
                un: function(a, b) {
                    var c = this,
                        d = c.$events[a];
                    if (!d) return !1;
                    for (var e = 0, f = d.length; e < f; e++) {
                        var g = d[e];
                        if (g.fn.$fancyFnSeed === b.$fancyFnSeed) return g.toRemove = !0, !0
                    }
                    return !1
                },
                once: function(a, b, c) {
                    var d = this,
                        e = function() {
                            b.apply(this, arguments), d.un(a, e)
                        };
                    d.on(a, e, c)
                },
                unAll: function() {
                    this.$events = {}
                },
                unAllByType: function(a) {
                    this.$events[a] = []
                },
                fire: function(a) {
                    var b = this,
                        c = b.$events[a];
                    if (!c) return !1;
                    for (var d = 1, e = arguments.length, f = [b]; d < e; d++) f.push(arguments[d]);
                    for (var d = 0, e = c.length; d < e; d++) {
                        var g = c[d],
                            h = [];
                        !0 !== g.toRemove ? (h = h.concat(f), g.params && (h = h.concat(g.params)), g.delay ? setTimeout(function() {
                            g.fn.apply(g.scope || b, h)
                        }, g.delay) : g.fn.apply(g.scope || b, h)) : (c.splice(d, 1), d--, e = c.length)
                    }
                },
                addEvent: function(a) {
                    return this.addEvents(a)
                },
                addEvents: function(a) {
                    var b = this;
                    if (arguments.length > 1) {
                        for (var c = [], d = 0, e = arguments.length; d < e; d++) c[d] = arguments[d];
                        a = c
                    }
                    if ("string" === Fancy.typeOf(a)) b.$events[a] = b.$events[a] || [];
                    else if ("array" === Fancy.typeOf(a))
                        for (var d = 0, e = a.length; d < e; d++) b.$events[a[d]] = b.$events[a[d]] || []
                },
                has: function(a) {
                    var b = this.$events[a];
                    return !!b && 0 !== b.length
                }
            }), Fancy.define("Fancy.Modules", {
                extend: Fancy.Event,
                singleton: !0,
                constructor: function() {
                    this.Super("const", arguments), this.init()
                },
                init: function() {
                    this.addEvents("loaded")
                }
            })
        }(), Fancy.Mixin("Fancy.store.mixin.Edit", {
            remove: function(a) {
                var b, c, d, e = this,
                    f = a.id;
                switch (Fancy.typeOf(a)) {
                    case "string":
                    case "number":
                        f = a;
                        break;
                    default:
                        f = a.id || a.data.id
                }
                if (e.isTree && !0 !== e.treeCollapsing) {
                    var g = e.getById(f),
                        h = e.getById(g.get("parentId"));
                    if (!1 === g.get("leaf") && g.get("expanded")) {
                        var i = g.data.child.length - 1;
                        Fancy.each(g.data.child, function(a, b, c) {
                            e.remove(c[i]), i--
                        })
                    }
                    h && Fancy.each(h.data.child, function(a, b) {
                        if (a.id === f) return h.data.child.splice(b, 1), !0
                    })
                }
                if ("server" === e.proxyType && e.autoSave && e.proxy.api.destroy) return void e.proxyCRUD("DESTROY", f);
                if (a.rowIndex) b = e.dataViewIndexes[a.rowIndex], c = a.rowIndex;
                else if (b = e.getDataIndex(f), c = e.getRow(f), void 0 === b && void 0 === c) return;
                if (e.isTree && e.treeCollapsing && e.filteredData) {
                    var j;
                    Fancy.each(e.data, function(a, b) {
                        if (a.data.id === f) return j = b, !0
                    }), d = e.data.splice(j, 1)[0]
                } else d = e.data.splice(b, 1)[0];
                e.paging && (c += e.showPage * e.pageSize), e.order && e.order.splice(c, 1), e.changeOrderIndexes && e.changeOrderIndexes(b), e.paging && (0 !== e.showPage && e.showPage * e.pageSize === e.getTotal() && e.showPage--, e.calcPages()), delete e.map[f], e.treeCollapsing || e.fire("remove", f, d, b), e.changeDataView()
            },
            removeAt: function(a) {
                var b = this;
                b.remove({
                    rowIndex: a,
                    id: b.getId(a)
                })
            },
            removeAll: function() {
                var a = this;
                a.data = [], a.dataView = [], delete a.order, a.paging && (a.showPage = 0, a.calcPages()), a.filters && (delete a.filters, delete a.filteredData, delete a.filterOrder)
            },
            add: function(a) {
                var b = this;
                return b.insert(b.getTotal(), a)
            },
            insert: function(a, b) {
                var c = this;
                if (c.grouping && !c.bugFixGrouping && (c.defineModel(b, !0), c.bugFixGrouping = !0), c.addIndex = a, void 0 === b.id) {
                    Fancy.idSeed++;
                    var d = Fancy.idSeed + 1e3;
                    "server" === c.proxyType ? b.id = "Temp-" + d : b.id = d
                }
                if (c.getById(b.id) && c.remove(b.id), "server" !== c.proxyType || !c.autoSave || !c.proxy.api.create) return c.insertItem(b, a);
                c.once("create", c.onCreate, c), c.proxyCRUD("CREATE", b)
            },
            insertItem: function(a) {
                var b = this,
                    c = b.model,
                    d = new c(a),
                    e = b.addIndex;
                return b.treeExpanding || b.fire("beforeinsert"), delete b.addIndex, b.data.splice(e, 0, d), b.order && (b.order.splice(e, 0, e), b.changeOrderIndexes(e, "+"), b.order[e]--), b.changeDataView(), b.map[a.id] = d, b.treeExpanding || b.fire("insert", d), d
            },
            onCreate: function(a, b) {
                return this.insertItem(b)
            }
        }), Fancy.Mixin("Fancy.store.mixin.Dirty", {
            initTrackDirty: function() {
                var a = this;
                a.changed = {
                    length: 0
                }, a.removed = {
                    length: 0
                }, a.inserted = {
                    length: 0
                }, a.undoActions = [], a.redoActions = [], a.on("remove", a.onDirtyRemove, a), a.on("set", a.onDirtySet, a), a.on("insert", a.onDirtyInsert, a)
            },
            onDirtySet: function(a, b) {
                var c = this,
                    d = b.id;
                if ("$selected" !== b.key) {
                    if (void 0 === c.changed[d] ? (c.changed[d] = {
                            length: 1
                        }, c.changed.length++) : c.changed[d].length++, void 0 === c.changed[d][b.key] && (c.changed[d][b.key] = {
                            originValue: b.oldValue
                        }), c.changed[d][b.key].value = b.value, c.changed[d][b.key].value === c.changed[d][b.key].originValue) {
                        delete c.changed[d][b.key], c.changed[d].length--;
                        for (var e = 0, f = c.undoActions.length - 1; e <= f; e++) {
                            var g = f - e,
                                h = c.undoActions[g];
                            if (h.id === d && b.key === h.key) {
                                var i = c.undoActions.splice(g, 1);
                                c.redoActions.push(i)
                            }
                        }
                    } else c.redoing || (c.redoActions = []), c.undoActions.push({
                        id: d,
                        type: "edit",
                        key: b.key,
                        value: b.value,
                        oldValue: b.oldValue
                    });
                    0 === c.changed[d].length && (delete c.changed[d], c.changed.length--)
                }
            },
            onDirtyRemove: function(a, b, c, d) {
                var e = this;
                e.removed[b] = c.data, e.removed.length++, !0 !== e.undoStoppped && (e.redoing || (e.redoActions = []), e.undoActions.push({
                    id: b,
                    type: "remove",
                    data: c.data,
                    rowIndex: d
                }))
            },
            onDirtyInsert: function(a, b) {
                var c = this;
                c.treeExpanding || (c.inserted[b.id] = b, c.inserted.length++, !0 !== c.undoStoppped && (c.redoing || (c.redoActions = []), c.undoActions.push({
                    id: b.id,
                    type: "insert",
                    data: b.data
                })))
            }
        }), Fancy.define("Fancy.Store", {
            extend: Fancy.Event,
            mixins: ["Fancy.store.mixin.Paging", "Fancy.store.mixin.Proxy", "Fancy.store.mixin.Rest", "Fancy.store.mixin.Reader", "Fancy.store.mixin.Writer", "Fancy.store.mixin.Sort", "Fancy.store.mixin.Edit", "Fancy.store.mixin.Grouping", "Fancy.store.mixin.Filter", "Fancy.store.mixin.Search", "Fancy.store.mixin.Dirty", "Fancy.store.mixin.Tree"],
            pageSize: 10,
            showPage: 0,
            pages: 0,
            dirty: !1,
            constructor: function() {
                var a = this;
                a.Super("const", arguments), a.init(), a.data = a.data || [], a.dataView = a.dataView || [], a.dataViewMap = a.dataViewMap || {}, a.map = {}, a.setModel(), a.data && (a.data.proxy ? a.initProxy() : a.widget.isTreeData || a.setData(a.data)), a.readSmartIndexes(), a.widget.grouping && a.orderDataByGroupOnStart(), a.widget.isTreeData && a.initTreeData()
            },
            init: function() {
                var a = this;
                a.addEvents("add", "change", "changepages", "set", "beforeupdate", "update", "beforeremove", "remove", "beforedestroy", "destroy", "beforecreate", "create", "beforesort", "sort", "beforeload", "load", "filter", "beforeinsert", "insert", "servererror", "serversuccess"), a.initId(), a.initPlugins(), a.paging && a.initPaging(), a.initTrackDirty && a.initTrackDirty()
            },
            setModel: function() {
                var a = this,
                    b = a.model;
                if (b = void 0 === b ? Fancy.Model : Fancy.ClassManager.get(a.model), a.model = b, a.fields = b.prototype.fields, void 0 === a.fields) throw new Error("needed to set fields in Model of Store")
            },
            setData: function(a) {
                var b, c = this,
                    d = 0,
                    e = a.length,
                    f = c.model;
                if (c.data = [], c.dataView = [], c.dataViewMap = {}, c.dataViewIndexes = {}, c.collapsed)
                    for (; d < e; d++) b = new f(a[d]), c.data[d] = b, c.map[b.id] = b;
                else if (c.expanded)
                    for (; d < e; d++) b = new f(a[d]), c.data[d] = b, c.map[b.id] = b;
                else if (c.paging)
                    for (; d < e; d++) b = new f(a[d]), c.data[d] = b, d < c.pageSize && (c.dataView[d] = b, c.dataViewMap[b.id] = d, c.dataViewIndexes[d] = d), c.map[b.id] = b;
                else
                    for (; d < e; d++) b = new f(a[d]), c.data[d] = b, c.dataView[d] = b, c.dataViewMap[b.id] = d, c.dataViewIndexes[d] = d, c.map[b.id] = b;
                c.isTree && Fancy.each(c.data, function(a, b) {
                    a.get("expanded") && Fancy.each(a.data.child, function(b, d) {
                        var e = c.getById(b.id);
                        a.data.child[d] = e
                    })
                })
            },
            getItem: function(a) {
                return this.dataView[a]
            },
            get: function(a, b, c) {
                var d, e = this;
                if (void 0 === a) return e.data;
                var f = e.dataView[a];
                return f ? void 0 === b ? (d = f.data, void 0 === d.id && (d.id = e.dataView[a].id), e.dataView[a].data) : "none" === b ? "" : c ? (f = e.data[a], "id" === b ? f.data[b] || f.id : f.data[b]) : (f = e.dataView[a], "id" === b ? f.data[b] || f.id : f.data[b]) : (f = e.order ? e.data[e.order[a]] : e.data[a], f ? "id" === b ? f.data[b] || f.id : f.data[b] : f)
            },
            getId: function(a) {
                return this.dataView[a].id
            },
            getRow: function(a) {
                return this.dataViewMap[a]
            },
            set: function(a, b, c, d) {
                var e, f, g = this;
                if (-1 === a ? e = g.getById(d) : (e = g.dataView[a], d = e.data.id || e.id), void 0 === c) {
                    var h = b;
                    for (var i in h)
                        if ("id" !== i) {
                            var j; - 1 === a ? (f = e.get(i), e.set(i, h[i]), j = e.data) : (f = g.get(a, i), g.dataView[a].data[i] = h[i], j = g.dataView[a].data), g.fire("set", {
                                id: d,
                                data: j,
                                rowIndex: a,
                                key: i,
                                value: h[i],
                                oldValue: f,
                                item: e
                            })
                        }
                    return void("server" === g.proxyType && g.autoSave && g.proxyCRUD("UPDATE", d, h))
                }
                if ((f = -1 === a ? e.get(b) : g.get(a, b)) != c) {
                    if (-1 === a) e.set(b, c);
                    else {
                        var k = g.dataView[a];
                        if (k.data.parentId) {
                            var l = g.getById(k.data.parentId);
                            Fancy.each(l.data.child, function(a, d) {
                                a.id === k.id && (a[b] = c)
                            })
                        }
                        k.data[b] = c
                    }
                    "server" === g.proxyType && g.autoSave && g.proxyCRUD("UPDATE", d, b, c);
                    var j;
                    j = -1 === a ? e.data : g.dataView[a].data, g.fire("set", {
                        id: d,
                        data: j,
                        rowIndex: a,
                        key: b,
                        value: c,
                        oldValue: f,
                        item: e
                    })
                }
            },
            setItemData: function(a, b) {
                var c = this,
                    d = c.get(a);
                if (c.writeAllFields && "server" === c.proxyType) c.set(a, b);
                else
                    for (var e in b) d[e] != b[e] && c.set(a, e, b[e])
            },
            getLength: function() {
                return this.dataView.length
            },
            getTotal: function() {
                var a = this;
                return "server" === a.pageType ? a.totalCount : a.filteredData ? a.filteredData.length : void 0 === a.data ? 0 : Fancy.isObject(a.data) ? 0 : a.data.length
            },
            defineModel: function(a, b) {
                var c = this,
                    d = c.store;
                if (!c.model || !c.fields || 0 === c.fields.length || b) {
                    var a = a || c.data || d.data,
                        e = c.getFieldsFromData(a),
                        f = "Fancy.model." + Fancy.id();
                    Fancy.define(f, {
                        extend: Fancy.Model,
                        fields: e
                    }), c.model = f, c.fields = e, c.setModel()
                }
            },
            getFieldsFromData: function(a) {
                var b = a.items || a;
                if (a.fields) return a.fields;
                if (!b) throw new Error("not set fields of data");
                var c = b[0],
                    d = [];
                void 0 === b.length && (c = b);
                for (var e in c) d.push(e);
                return d
            },
            getColumnOriginalValues: function(a, b) {
                var c = this,
                    d = 0,
                    e = [],
                    b = b || {},
                    f = b.dataProperty || "data",
                    g = c[f],
                    h = g.length;
                if (b.smartIndexFn)
                    for (; d < h; d++) e.push(b.smartIndexFn(g[d].data));
                else if (b.format)
                    if ("date" === b.type)
                        for (; d < h; d++) {
                            var i = g[d].data[a];
                            null === i ? e.push(Math.NEGATIVE_INFINITY) : e.push(Fancy.Date.parse(i, b.format, b.mode))
                        } else
                            for (; d < h; d++) e.push(g[d].data[a]);
                    else if (b.groupMap)
                    for (c.groupMap = {}; d < h; d++) {
                        var j = g[d],
                            i = j.data[a];
                        e.push(i), c.groupMap[j.id] = i
                    } else
                        for (; d < h; d++) {
                            var k = g[d].data || g[d];
                            e.push(k[a])
                        }
                return e
            },
            changeDataView: function(a) {
                var b, c = this,
                    a = a || {},
                    d = [],
                    e = {},
                    f = 0,
                    g = c.data.length,
                    h = !!c.filters,
                    i = !!c.searches,
                    j = c.data;
                if (h) {
                    if (a.stoppedFilter || a.doNotFired) {
                        if (c.paging && "server" === c.pageType) return
                    } else c.filterData();
                    c.remoteFilter || (j = c.filteredData, void 0 === j && (j = c.data), g = j.length)
                }
                i && (c.searchData(), j = c.searchedData, g = j.length), c.dataViewIndexes = {}, c.dataViewMap = {}, c.paging && (f = "server" === c.pageType ? 0 : c.showPage * c.pageSize, g = f + c.pageSize);
                var k = c.getTotal();
                g > c.data.length && (g = c.data.length), h && g > k && (g = k), Fancy.isObject(c.data) && (g = 0);
                var l;
                if (c.order)
                    if (c.grouping)
                        for (b = c.grouping.by; f < g; f++) c.expanded[c.data[c.order[f]].data[b]] && (!0 === h ? (c.dataViewIndexes[d.length] = c.filterOrder[f], l = j[f]) : (c.dataViewIndexes[d.length] = c.order[f], l = j[c.order[f]]), d.push(l), e[l.id] = d.length - 1);
                    else
                        for (; f < g; f++) !0 === h ? (c.dataViewIndexes[d.length] = c.filterOrder[f], l = j[f]) : (c.dataViewIndexes[d.length] = c.order[f], l = j[c.order[f]]), d.push(l), e[l.id] = d.length - 1;
                else if (c.grouping)
                    for (b = c.grouping.by; f < g; f++) c.expanded[c.data[f].data[b]] && (c.dataViewIndexes[d.length] = f, l = j[f], d.push(l), e[l.id] = d.length - 1);
                else
                    for (; f < g; f++) c.dataViewIndexes[d.length] = f, l = j[f], d.push(j[f]), e[l.id] = d.length - 1;
                c.dataView = d, c.dataViewMap = e, a.doNotFired || c.fire("change")
            },
            getColumnData: function(a, b) {
                var c = this,
                    d = 0,
                    e = c.data.length,
                    f = [];
                if (b)
                    for (; d < e; d++) f.push(b(c.data[d].data));
                else
                    for (; d < e; d++) f.push(c.data[d].data[a]);
                return f
            },
            getData: function() {
                for (var a = this, b = 0, c = a.data.length, d = []; b < c; b++) d.push(a.data[b].data);
                return d
            },
            getDataView: function() {
                for (var a = this, b = 0, c = a.dataView.length, d = []; b < c; b++) d.push(a.dataView[b].data);
                return d
            },
            getById: function(a) {
                return this.map[a]
            },
            changeItemId: function(a, b) {
                var c = this,
                    d = c.getById(a);
                if (!d) return !1;
                d.id = b, void 0 !== d.data.id && (d.data.id = b), delete c.map[a], c.map[b] = d, c.fire("changeitemid", a, b)
            },
            find: function(a, b, c) {
                var d, e = this,
                    f = e.dataView,
                    g = 0,
                    h = f.length,
                    i = [];
                if (c)
                    for (h = e.data.length; g < h; g++) d = e.order ? e.data[e.order[g]] : e.data[g], d.data[a] === b && i.push(g);
                else
                    for (; g < h; g++) d = f[g], d.data[a] === b && i.push(g);
                return i
            },
            findItem: function(a, b) {
                for (var c, d = this, e = d.data, f = 0, g = e.length, h = []; f < g; f++) c = e[f], c.data[a] === b && h.push(c);
                return h
            },
            getDataIndex: function(a) {
                for (var b, c, d = this, e = d.data, f = 0, g = e.length; f < g; f++) b = e[f], b.data.id === a && (c = f);
                return c
            },
            each: function(a, b) {
                var c = this,
                    d = c.dataView,
                    e = 0,
                    f = d.length;
                if (b)
                    for (; e < f; e++) a.apply(this, [d[e]]);
                else
                    for (; e < f; e++) a(d[e])
            },
            readSmartIndexes: function() {
                var a = this,
                    b = a.widget,
                    c = 0,
                    d = {};
                Fancy.each(b.columns, function(a) {
                    a.smartIndexFn && (d[a.index] = a.smartIndexFn, c++)
                }), c && (a.smartIndexes = d)
            }
        }), Fancy.$ = window.$ || window.jQuery, Fancy.nojQuery = void 0 === Fancy.$, Fancy.get = function(a) {
            switch (Fancy.typeOf(a)) {
                case "string":
                    return new Fancy.Element(Fancy.$("#" + a)[0]);
                case "array":
                    return new Fancy.Elements(a);
                default:
                    return new Fancy.Element(a)
            }
        }, Fancy.Element = function(a) {
            var b = this;
            b.dom = a, b.$dom = Fancy.$(a), b.length = 1
        }, Fancy.Element.prototype = {
            last: function() {
                return Fancy.get(this.$dom)
            },
            closest: function(a) {
                return Fancy.get(this.$dom.closest(a)[0])
            },
            destroy: function() {
                this.$dom.remove()
            },
            remove: function() {
                this.$dom.remove()
            },
            prev: function() {
                return Fancy.get(this.$dom.prev()[0])
            },
            lastChild: function() {
                var a = this.$dom.children();
                return Fancy.get(a[a.length - 1])
            },
            firstChild: function() {
                return Fancy.get(this.$dom.children()[0])
            },
            on: function(a, b, c, d) {
                var e = this;
                switch (c && (b = Fancy.$.proxy(b, c)), d ? e.$dom.on(a, d, b) : e.$dom.on(a, b), a) {
                    case "mouseenter":
                        e.onTouchEnterEvent && e.onTouchEnterEvent(a, b, c, d);
                        break;
                    case "mouseleave":
                        e.onTouchLeaveEvent && e.onTouchLeaveEvent(a, b, c, d);
                        break;
                    case "mousemove":
                        e.onTouchMove && e.onTouchMove("touchmove", b)
                }
            },
            once: function(a, b, c, d) {
                var e = this;
                c && (b = Fancy.$.proxy(b, c)), d ? e.$dom.one(a, d, b) : e.$dom.one(a, b)
            },
            prop: function(a) {
                return this.$dom.prop(a)
            },
            un: function(a, b, c, d) {
                var e = this;
                c && (b = Fancy.$.proxy(b, c)), d ? e.$dom.off(a, d, b) : e.$dom.off(a, b)
            },
            show: function() {
                this.$dom.show()
            },
            hide: function() {
                this.$dom.hide()
            },
            replaceClass: function(a, b) {
                this.$dom.removeClass(a), this.$dom.addClass(b)
            },
            getByTag: function(a) {
                return Fancy.get(this.$dom.find(a)[0])
            },
            getByClass: function(a) {
                return this.$dom.find("." + a)[0]
            },
            addClass: function(a) {
                this.addCls.apply(this, arguments)
            },
            addCls: function(a) {
                if (this.$dom.addClass(a), arguments.length > 1)
                    for (var b = 1, c = arguments.length; b < c; b++) this.addClass(arguments[b])
            },
            removeClass: function(a) {
                this.$dom.removeClass(a)
            },
            removeCls: function(a) {
                this.$dom.removeClass(a)
            },
            hasClass: function(a) {
                return this.$dom.hasClass(a)
            },
            hasCls: function(a) {
                return this.$dom.hasClass(a)
            },
            toggleClass: function(a) {
                this.$dom.toggleClass(a)
            },
            toggleCls: function(a) {
                this.$dom.toggleClass(a)
            },
            select: function(a) {
                var b = this,
                    c = b.$dom.find(a);
                return 1 === c.length ? Fancy.get(c[0]) : c.length > 1 ? Fancy.get(c) : 0 === c.length ? {
                    length: 0,
                    dom: void 0,
                    addClass: function() {},
                    addCls: function() {},
                    removeClass: function() {},
                    removeCls: function() {},
                    destroy: function() {},
                    remove: function() {},
                    css: function() {},
                    each: function() {},
                    last: function() {},
                    attr: function() {}
                } : c
            },
            css: function(a, b) {
                return void 0 === b ? this.$dom.css(a) : this.$dom.css(a, b)
            },
            attr: function(a, b) {
                return void 0 === b ? this.$dom.attr(a) : this.$dom.attr(a, b)
            },
            append: function(a) {
                return Fancy.get(this.$dom.append(a)[0])
            },
            after: function(a) {
                return Fancy.get(this.$dom.after(a)[0])
            },
            next: function() {
                return Fancy.get(this.$dom.next()[0])
            },
            insertAfter: function(a) {
                return Fancy.get(this.$dom.insertAfter(a)[0])
            },
            before: function(a) {
                return Fancy.get(this.$dom.before(a)[0])
            },
            height: function(a) {
                return a ? (this.$dom.height(a), this) : this.$dom.height()
            },
            width: function(a) {
                return a ? (this.$dom.width(a), this) : this.$dom.width()
            },
            parent: function(a) {
                return Fancy.get(this.$dom.parent(a)[0])
            },
            update: function(a) {
                this.dom.innerHTML = a
            },
            hover: function(a, b) {
                a && this.$dom.on("mouseenter", a), a && this.$dom.on("mouseleave", b)
            },
            position: function() {
                return this.$dom.position()
            },
            offset: function() {
                return this.$dom.offset()
            },
            focus: function() {
                this.$dom.focus()
            },
            blur: function() {
                this.$dom.blur()
            },
            within: function(a) {
                var b, c = this,
                    d = !0,
                    e = !1;
                return a = Fancy.get(a), b = a.attr("id"), void 0 !== b && "" !== b || (b = Fancy.id(), e = !0), a.attr("id", b), 0 === c.select("#" + b).length && (d = !1), c.dom.id === a.dom.id && (d = !0), e && c.removeAttr(b), d
            },
            removeAttr: function(a) {
                this.$dom.removeAttr(a)
            },
            item: function() {
                return this
            },
            animate: function(a, b, c, d) {
                this.$dom.animate(a, b, c, d)
            },
            stop: function() {
                this.$dom.stop && this.$dom.stop()
            },
            index: function() {
                return this.$dom.index()
            },
            onTouchEnterEvent: function(a, b, c, d) {
                var e = this,
                    f = Fancy.get(document.body);
                if (Fancy.isTouch) {
                    var g = function(a, f) {
                        var g = Fancy.id(),
                            h = "fancy-tempt-attr";
                        e.attr(h, g);
                        for (var i = a.originalEvent.targetTouches[0], j = [i.pageX, i.pageY], k = Fancy.get(document.elementFromPoint(j[0] - document.body.scrollLeft, j[1] - document.body.scrollTop)), l = !1, m = 10, n = k; m > 0 && n.dom;) {
                            if (n.attr(h) === g) {
                                l = !0;
                                break
                            }
                            n = n.parent(), m--
                        }
                        if (!l || e.touchIn || d || (a.pageX = i.pageX, a.pageY = i.pageY, b(a, f), e.touchIn = !0), l && d) {
                            m = 10, n = k;
                            for (var o = [], p = 0; m > 0 && n.dom;) {
                                var q = n.select(d);
                                if (0 !== q.length) {
                                    !0;
                                    var r = e.getDelegateTarget(d, q, o, p);
                                    r && (a.currentTarget = r, a.delegateTarget = r, a.pageX = i.pageX, a.pageY = i.pageY, e.touchIn = !0, e.touchInDelegate = e.touchInDelegate || {}, void 0 === e.touchInDelegate[d] ? e.touchInDelegate[d] = r : e.touchInDelegate[d] !== r && (e.touchInDelegate[d] = [e.touchInDelegate[d], r]), b.apply(c, [a, r]));
                                    break
                                }
                                if (n.attr(h) === g) break;
                                o.push(n.dom), n, n = n.parent(), m--, p++
                            }
                        }
                        e.removeAttr(h)
                    };
                    f.on("touchmove", g)
                }
            },
            onTouchLeaveEvent: function(a, b, c, d) {
                var e = this,
                    f = Fancy.get(document.body),
                    g = [];
                if (Fancy.isTouch) {
                    var h = function(a, c) {
                        var f = Fancy.id(),
                            h = "fancy-tempt-attr";
                        if (e.attr(h, f), !0 !== e.touchIn) return void e.removeAttr(h);
                        var i = a.originalEvent.targetTouches[0],
                            j = [i.pageX, i.pageY],
                            k = Fancy.get(document.elementFromPoint(j[0] - document.body.scrollLeft, j[1] - document.body.scrollTop));
                        if (!d) {
                            for (var l = !1, m = 10, n = k; m > 0 && n.dom;) {
                                if (n.attr(h) === f) {
                                    l = !0;
                                    break
                                }
                                n = n.parent(), m--
                            }
                            if (!1 === l) return a.pageX = i.pageX, a.pageY = i.pageY, e.touchIn = !1, b(a, c), void e.removeAttr(h)
                        }
                        if (g.length > 30 && (g = g.slice(g.length - 5, g.length - 1)), g.push(k.dom), d && e.touchInDelegate[d]) {
                            var o, p = Fancy.id();
                            o = Fancy.isArray(e.touchInDelegate[d]) ? Fancy.get(e.touchInDelegate[d][0]) : Fancy.get(e.touchInDelegate[d]), o.attr(h, p), m = 10;
                            var q = !1;
                            for (n = k; m > 0 && n.dom;) {
                                if (n.attr(h) === p) {
                                    q = !0;
                                    break
                                }
                                n = n.parent(), m--
                            }
                            o.removeAttr(h), q || (delete e.touchInDelegate[d], e.touchIn = !1, a.currentTarget = o.dom, a.delegateTarget = o.dom, a.pageX = i.pageX, a.pageY = i.pageY, b(a, o.dom))
                        }
                        e.removeAttr(h)
                    };
                    f.on("touchmove", h)
                }
            },
            getDelegateTarget: function(a, b, c, d) {
                for (var e = c[d - a.match(/\./g).length], f = 0, g = b.length; f < g; f++)
                    if (b.item(f).dom === e) return e;
                return !1
            },
            onTouchMove: function(a, b, c) {
                var d = this,
                    e = Fancy.get(document.body);
                if (Fancy.isTouch) {
                    var f = function(a, c) {
                        var e = Fancy.id(),
                            f = "fancy-tempt-attr";
                        d.attr(f, e);
                        for (var g = a.originalEvent.targetTouches[0], h = [g.pageX, g.pageY], i = !1, j = 10, k = Fancy.get(document.elementFromPoint(h[0] - document.body.scrollLeft, h[1] - document.body.scrollTop)), l = k; j > 0 && l.dom;) {
                            if (l.attr(f) === e) {
                                i = !0;
                                break
                            }
                            l = l.parent(), j--
                        }
                        d.removeAttr(f), i && (a.pageX = g.pageX, a.pageY = g.pageY, b(a, c))
                    };
                    e.on("touchmove", f)
                }
            },
            each: function(a) {
                a(this, 0)
            }
        }, Fancy.Elements = function(a) {
            var b = this;
            b.dom = a, b.$dom = a, b.length = a.length
        }, Fancy.Elements.prototype = {
            attr: function(a, b) {
                var c = this,
                    d = c.$dom;
                return c.length > 1 && (d = c.$dom[0]), void 0 === b ? d.attr(a) : d.attr(a, b)
            },
            addClass: function(a) {
                this.addCls.apply(this, arguments)
            },
            addCls: function(a) {
                for (var b = this, c = 0, d = b.length; c < d; c++) Fancy.get(b.$dom[c]).addClass(a);
                if (arguments.length > 1)
                    for (c = 1, d = arguments.length; c < d; c++) b.addClass(arguments[c])
            },
            removeClass: function(a) {
                this.removeCls.apply(this, arguments)
            },
            removeCls: function(a) {
                for (var b = this, c = 0, d = b.length; c < d; c++) Fancy.get(b.$dom[c]).removeCls(a)
            },
            hover: function(a) {
                this.$dom.on("mouseenter", a)
            },
            on: Fancy.Element.prototype.on,
            once: Fancy.Element.prototype.once,
            item: function(a) {
                return Fancy.get(this.$dom[a])
            },
            css: function(a, b) {
                for (var c = this, d = 0, e = c.length; d < e; d++) Fancy.get(c.$dom[d]).css(a, b)
            },
            toggleClass: function(a) {
                for (var b = this, c = 0, d = b.length; c < d; c++) Fancy.get(b.$dom[c]).toggleClass(a)
            },
            toggleCls: function(a) {
                for (var b = this, c = 0, d = b.length; c < d; c++) Fancy.get(b.$dom[c]).toggleClass(a)
            },
            destroy: function() {
                for (var a = this, b = 0, c = a.length; b < c; b++) Fancy.get(a.$dom[b]).destroy()
            },
            remove: function() {
                this.destroy()
            },
            hide: function() {
                for (var a = this, b = 0, c = a.length; b < c; b++) Fancy.get(a.$dom[b]).hide()
            },
            show: function() {
                for (var a = this, b = 0, c = a.length; b < c; b++) Fancy.get(a.$dom[b]).show()
            },
            index: function() {
                return this.$dom[0].index()
            },
            each: function(a) {
                for (var b, c = this, d = 0, e = c.length; d < e; d++) b = new Fancy.Element(c.$dom[d]), a(b, d)
            },
            last: function() {
                var a = this;
                return new Fancy.Element(a.$dom[a.length - 1])
            }
        }, Fancy.select = function(a) {
            return Fancy.get(document.body).select(a)
        }, Fancy.onReady = function(a) {
            Fancy.$(document).ready(a)
        }, Fancy.Ajax = function(a) {
            var b = {};
            a.url && (b.url = a.url), a.success && (b.success = a.success), a.error && (b.error = a.error), a.method && (b.type = a.method), a.params && (b.data = a.params), a.sendJSON && (b.dataType = "json", b.contentType = "application/json; charset=utf-8", b.data = JSON.stringify(b.data)), a.getJSON && (b.dataType = "json", b.contentType = "application/json; charset=utf-8"), a.headers && (b.headers = a.headers), Fancy.$.ajax(b)
        }, Fancy.i18n.en = {
            paging: {
                first: "First Page",
                last: "Last Page",
                prev: "Previous Page",
                next: "Next Page",
                info: "Rows [0] - [1] of [2]",
                page: "Page",
                of: "of [0]"
            },
            loadingText: "Loading...",
            thousandSeparator: ",",
            decimalSeparator: ".",
            currencySign: "$",
            sourceText: "Source",
            date: {
                read: "m/d/Y",
                write: "m/d/Y",
                edit: "m/d/Y",
                today: "Today",
                startDay: 0,
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                am: "am",
                pm: "pm",
                AM: "AM",
                PM: "PM",
                ok: "OK",
                cancel: "Cancel"
            },
            yes: "Yes",
            no: "No",
            dragText: "[0] selected row[1]",
            update: "Update",
            cancel: "Cancel",
            columns: "Columns",
            sortAsc: "Sort ASC",
            sortDesc: "Sort DESC",
            lock: "Lock",
            unlock: "Unlock",
            rightLock: "Right Lock"
        }, Fancy.i18n["en-US"] = Fancy.i18n.en, Fancy.controllers = {}, Fancy.defineController = function(a, b) {
            Fancy.controllers[a] = b
        }, Fancy.defineControl = Fancy.defineController, Fancy.getController = function(a) {
            return Fancy.controllers[a]
        }, Fancy.getControl = Fancy.getController, Fancy.define("Fancy.DD", {
            extend: Fancy.Event,
            singleton: !0,
            constructor: function(a) {
                this.Super("const", arguments), this.init()
            },
            init: function() {
                this.addEvents(), this.els = {}
            },
            add: function(a) {
                var b = this,
                    c = Fancy.id(a.overEl);
                b.els[c] = a, a.overEl.on("mousedown", b.onMouseDown, b)
            },
            onMouseDown: function(a) {
                var b = this,
                    c = Fancy.get(document),
                    d = Fancy.get(a.currentTarget),
                    e = b.els[d.attr("id")].dragEl;
                a.preventDefault(), b.clientX = a.clientX, b.clientY = a.clientY, b.startX = parseInt(e.css("left")), b.startY = parseInt(e.css("top")), b.activeId = d.attr("id"), c.once("mouseup", b.onMouseUp, b), c.on("mousemove", b.onMouseMove, b)
            },
            onMouseUp: function() {
                Fancy.get(document).un("mousemove", this.onMouseMove, this)
            },
            onMouseMove: function(a) {
                var b = this,
                    c = b.els[b.activeId],
                    d = c.dragEl,
                    e = a.clientX,
                    f = a.clientY,
                    g = b.clientX - e,
                    h = b.clientY - f,
                    i = b.startX - g,
                    j = b.startY - h;
                j < 0 && (j = 0), d.css({
                    left: i,
                    top: j
                })
            }
        }), Fancy.define("Fancy.Widget", {
            extend: Fancy.Event,
            constructor: function(a) {
                var b = this;
                Fancy.applyConfig(b, a), b.preInitControls(), b.Super("const", arguments), b.init(), b.initControls()
            },
            init: function() {
                var a = this;
                a.initId(), a.addEvents("beforerender", "afterrender", "render", "show", "beforehide", "hide", "destroy"), a.initPlugins()
            },
            renderItems: function(a) {
                var b = this;
                Fancy.each(b.items, function(c, d) {
                    var e = Fancy.getClassByType(c.type);
                    c.renderTo = a, b.items[d] = new e(c)
                })
            },
            preInitControls: function() {
                var a = this,
                    b = a.controller || a.controllers;
                if (b) switch (Fancy.typeOf(b)) {
                    case "string":
                        b = Fancy.getController(b);
                        for (var c in b) void 0 === a[c] && (a[c] = b[c]);
                        break;
                    case "array":
                        for (var d = [], e = 0, f = b.length; e < f; e++) {
                            var g = Fancy.getController(b[e]);
                            for (var c in g) "controls" !== c ? void 0 === a[c] && (a[c] = g[c]) : d = d.concat(g.controls)
                        }
                        a.controls = d
                }
            },
            initControls: function() {
                var a = this;
                if (void 0 !== a.controls)
                    for (var b = a.controls, c = 0, d = b.length; c < d; c++) {
                        var e = b[c];
                        if (void 0 === e.event) throw new Error("[FancyGrid Error]: - not set event name for control");
                        if (void 0 === e.handler) throw new Error("[FancyGrid Error]: - not set handler for control");
                        var f = e.event,
                            g = e.handler,
                            h = e.scope || a,
                            i = e.selector;
                        Fancy.isString(g) && (g = a[g]), i ? function(b, c, d, e) {
                            a.$events[b] ? a.on(b, function(a, b) {
                                var f = b.e.target,
                                    g = Fancy.get(f),
                                    h = g.parent(),
                                    i = h.select(e);
                                if (1 === i.length && i.within(f)) c.apply(d, arguments);
                                else if (i.length > 1)
                                    for (var j = 0, k = i.length; j < k; j++) i.item(j).within(f) && c.apply(d, arguments)
                            }, d) : a.on("render", function() {
                                a.el.on(b, c, d, e)
                            })
                        }(f, g, h, i) : void 0 === i && void 0 === e.widget && a.on(f, g, h)
                    }
            },
            css: function(a, b) {
                return this.el.css(a, b)
            },
            addClass: function(a) {
                this.el.addCls(a)
            },
            addCls: function(a) {
                this.el.addCls(a)
            },
            removeClass: function(a) {
                this.el.removeCls(a)
            },
            removeCls: function(a) {
                this.el.removeCls(a)
            },
            hasClass: function(a) {
                return this.el.hasCls(a)
            },
            hasCls: function(a) {
                return this.el.hasCls(a)
            },
            toggleClass: function(a) {
                this.el.toggleCls(a)
            },
            toggleCls: function(a) {
                this.el.toggleCls(a)
            },
            destroy: function() {
                this.el && this.el.destroy()
            },
            show: function() {
                this.el.show()
            },
            hide: function() {
                this.el.hide()
            },
            initTpl: function() {
                var a = this;
                a.tpl && (a.tpl = new Fancy.Template(a.tpl))
            }
        }), Fancy.define("Fancy.Plugin", {
            extend: Fancy.Event,
            constructor: function(a) {
                this.Super("const", arguments), this.init()
            },
            init: function() {
                this.initId(), this.addEvents("beforerender", "afterrender", "render", "show", "hide", "destroy")
            },
            initTpl: function() {
                var a = this.tpl;
                a && (this.tpl = new Fancy.Template(a))
            }
        }),
        function() {
            var a = {},
                b = Fancy,
                c = b.GRID_CLS,
                d = b.PANEL_BODY_CLS,
                e = b.BUTTON_CLS,
                f = b.BUTTON_DISABLED_CLS,
                g = b.BUTTON_PRESSED_CLS,
                h = b.BUTTON_IMAGE_CLS,
                i = b.BUTTON_IMAGE_COLOR_CLS,
                j = b.BUTTON_TEXT_CLS,
                k = b.BUTTON_DROP_CLS,
                l = b.BUTTON_MENU_CLS;
            b.define("Fancy.Button", {
                extend: b.Widget,
                minWidth: 30,
                constructor: function(b, c) {
                    var d = this;
                    b.toggleGroup && (a[b.toggleGroup] = a[b.toggleGroup] || {
                        active: !1,
                        items: []
                    }, a[b.toggleGroup].items.push(d)), d.scope = c, d.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("click", "mousedown", "mouseup", "mouseover", "mouseout", "pressedchange"), a.Super("init", arguments), a.style = a.style || {}, a.initTpl(), a.render(), a.setOns()
                },
                setOns: function() {
                    var a = this,
                        b = a.el;
                    b.on("click", a.onClick, a), b.on("mousedown", a.onMouseDown, a), b.on("mouseup", a.onMouseUp, a), b.on("mouseover", a.onMouseOver, a), b.on("mouseout", a.onMouseOut, a), a.tip && b.on("mousemove", a.onMouseMove, a)
                },
                widgetCls: e,
                cls: "",
                extraCls: "",
                disabledCls: f,
                pressedCls: g,
                buttonImageCls: h,
                buttonImageColorCls: i,
                textCls: j,
                dropCls: k,
                text: "",
                height: 28,
                paddingTextWidth: 5,
                imageWidth: 20,
                rightImageWidth: 20,
                pressed: !1,
                theme: "default",
                tpl: ['<div class="' + h + '"></div>', '<a class="' + j + '">{text}</a>', '<div class="' + k + '" style="{dropDisplay}"></div>'],
                render: function() {
                    var a, c = this,
                        d = b.get(document.createElement("div")),
                        e = 0,
                        g = 7;
                    if (c.theme && Fancy.themes[c.theme] && (g = Fancy.themes[c.theme].config.charWidth), c.fire("beforerender"), c.wrapper && c.renderWrapper(), a = b.get(c.renderTo || document.body).dom, c.width ? e = c.width : !1 !== c.text && (e += c.text.length * g + 2 * g), c.imageColor && (c.imageCls = i), e < c.minWidth && (e = (c.text && c.text.length, c.minWidth)), c.imageCls && c.text && (e += c.imageWidth), c.menu && (e += c.rightImageWidth), d.addCls(b.cls, c.widgetCls, c.cls, c.extraCls), c.disabled && d.addCls(f), c.menu && d.addCls(l), d.css({
                            width: e + "px",
                            height: c.height + "px"
                        }), c.hidden && d.css("display", "none"), d.css(c.style || {}), d.update(c.tpl.getHTML({
                            text: c.text || ""
                        })), c.imageCls) {
                        var j = d.select("." + h);
                        c.imageColor && j.css("background-color", c.imageColor), j.css("display", "block"), b.isString(c.imageCls) && j.addCls(c.imageCls)
                    }
                    c.id && d.attr("id", c.id), c.el = b.get(a.appendChild(d.dom)), c.disabled && c.disable(), c.pressed && c.setPressed(c.pressed), c.initToggle(), c.width = e, c.fire("afterrender"), c.fire("render")
                },
                renderWrapper: function() {
                    var a = this,
                        c = a.wrapper,
                        d = b.get(a.renderTo || document.body).dom,
                        e = b.get(document.createElement("div"));
                    e.css(c.style || {}), e.addCls(c.cls || ""), a.wrapper = b.get(d.appendChild(e.dom)), a.renderTo = a.wrapper.dom
                },
                initToggle: function() {
                    if (!this.enableToggle) return !1
                },
                setPressed: function(b, c) {
                    var d = this;
                    if (b) {
                        if (d.addCls(g), d.pressed = !0, d.toggleGroup) {
                            var e = a[d.toggleGroup].active;
                            e && e.setPressed(!1), a[d.toggleGroup].active = d
                        }
                    } else d.removeCls(g), d.pressed = !1;
                    !1 !== c && d.fire("pressedchange", d.pressed)
                },
                toggle: function() {
                    var a = this,
                        b = !a.pressed;
                    a.setPressed(b), a.pressed = b
                },
                onClick: function(a) {
                    var c = this,
                        d = c.handler;
                    c.fire("click"), !0 !== c.disabled && (d && (b.isString(d) && (d = c.getHandler(d)), c.scope ? d.apply(c.scope, [c]) : d(c)), c.enableToggle && (c.toggleGroup ? c.setPressed(!0) : c.toggle()), c.menu && (c.toggle(), c.toggleMenuShow(a)))
                },
                getHandler: function(a) {
                    var e = this;
                    return b.getWidget(e.el.closest("." + d).select("." + c).attr("id"))[a] || function() {
                        throw new Error("[FancyGrid Error] - handler does not exist")
                    }
                },
                onMouseDown: function() {
                    this.fire("mousedown")
                },
                onMouseUp: function() {
                    this.fire("mouseup")
                },
                onMouseOver: function(a) {
                    var b = this;
                    b.fire("mouseover"), b.tip && b.renderTip(a)
                },
                renderTip: function(a) {
                    var c = this;
                    c.tooltip && c.tooltip.destroy(), c.tooltip = new b.ToolTip({
                        text: c.tip
                    }), c.tooltip.css("display", "block"), c.tooltip.show(a.pageX + 15, a.pageY - 25)
                },
                onMouseOut: function() {
                    var a = this;
                    a.fire("mouseout"), a.tooltip && (a.tooltip.destroy(), delete a.tooltip)
                },
                setText: function(a, b) {
                    var c = this,
                        d = c.el,
                        e = 7;
                    b || (b = 0), b || (c.theme && Fancy.themes[c.theme] && (e = Fancy.themes[c.theme].config.charWidth), b += a.length * e + 2 * e, c.imageColor && (c.imageCls = i), b < c.minWidth && (b = (c.text && c.text.length, c.minWidth)), c.imageCls && c.text && (b += c.imageWidth), c.menu && (b += c.rightImageWidth)), c.css("width", b), d.select("." + j).update(a)
                },
                disable: function() {
                    this.disabled = !0, this.addCls(f)
                },
                enable: function() {
                    this.disabled = !1, this.removeCls(f)
                },
                onMouseMove: function(a) {
                    var b = this;
                    b.tip && b.tooltip && b.tooltip.show(a.pageX + 15, a.pageY - 25)
                },
                toggleMenuShow: function(a) {
                    var c = this,
                        d = c.el.$dom.offset(),
                        e = [d.left, d.top + c.el.$dom.height()];
                    b.isArray(c.menu) ? c.initMenu() : c.menu.type || c.initMenu(), setTimeout(function() {
                        c.menu.showAt(e[0], e[1])
                    }, 100)
                },
                initMenu: function() {
                    var a = this,
                        c = {
                            theme: a.theme,
                            events: [{
                                hide: a.onMenuHide,
                                scope: a
                            }]
                        };
                    b.isObject(a.menu) ? b.apply(c, a.menu) : c.items = a.menu, a.menu = new b.Menu(c)
                },
                onMenuHide: function() {
                    this.setPressed(!1)
                }
            })
        }(), Fancy.define("Fancy.SegButton", {
            extend: Fancy.Widget,
            constructor: function(a, b) {
                this.scope = b, this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.addEvents("toggle"), a.Super("init", arguments), a.style = a.style || {}, a.render()
            },
            widgetCls: Fancy.SEG_BUTTON_CLS,
            cls: "",
            extraCls: "",
            text: "",
            render: function() {
                var a, b = this,
                    c = Fancy.get(document.createElement("div"));
                b.fire("beforerender"), a = Fancy.get(b.renderTo || document.body).dom, c.addCls(Fancy.cls, b.widgetCls, b.cls, b.extraCls), b.hidden && c.css("display", "none"), b.el = Fancy.get(a.appendChild(c.dom)), Fancy.each(b.style, function(a, c) {
                    b.el.css(c, a)
                }), b.renderButtons(), b.fire("afterrender"), b.fire("render")
            },
            renderButtons: function() {
                for (var a = this, b = a.items, c = 0, d = b.length, e = Fancy.id(null, "fancy-toggle-group-"); c < d; c++) {
                    var f = b[c];
                    f.renderTo = a.el.dom, !1 !== a.allowToggle && (f.enableToggle = !0, !0 !== a.multiToggle && (f.toggleGroup = e)), 0 === c ? (f.style = {
                        "border-right-width": 0,
                        "border-top-right-radius": 0,
                        "border-bottom-right-radius": 0
                    }, 1 === d && delete f.style["border-right-width"]) : f.style = c > 1 ? {
                        "border-left-width": 0,
                        "border-top-left-radius": 0,
                        "border-bottom-left-radius": 0
                    } : {
                        "border-top-left-radius": 0,
                        "border-bottom-left-radius": 0
                    }, b.length > 2 && 0 !== c && c !== d - 1 && Fancy.apply(f.style, {
                        "border-top-right-radius": 0,
                        "border-bottom-right-radius": 0,
                        "border-top-left-radius": 0,
                        "border-bottom-left-radius": 0
                    }), a.items[c] = new Fancy.Button(f), a.items[c].on("pressedchange", function(b, c) {
                        a.fire("toggle", b, c, a.getValues())
                    })
                }
            },
            getValues: function() {
                for (var a = this, b = [], c = a.items, d = 0, e = c.length; d < e; d++) b.push(c[d].pressed);
                return b
            },
            clear: function(a) {
                for (var b = this, c = b.items, d = 0, e = c.length; d < e; d++) c[d].setPressed(!1, a)
            },
            setItems: function(a) {
                var b = this;
                b.el.update(""), b.items = a, b.renderButtons()
            },
            setActiveItem: function(a, b) {
                this.items[a].setPressed(!0, b)
            }
        }), Fancy.define("Fancy.toolbar.Tab", {
            extend: Fancy.Button,
            constructor: function(a) {
                this.Super("const", arguments)
            },
            init: function() {
                this.Super("init", arguments), Fancy.loadStyle()
            },
            cls: Fancy.BUTTON_CLS + " " + Fancy.TAB_TBAR_CLS,
            render: function() {
                this.Super("render", arguments)
            }
        }),
        function() {
            var a = Fancy,
                b = a.FOOTER_STATUS_CLS,
                c = a.STATUS_SOURCE_TEXT_CLS,
                d = a.STATUS_SOURCE_LINK_CLS,
                e = a.FOOTER_SOURCE_CLS;
            Fancy.Mixin("Fancy.panel.mixin.PrepareConfig", {
                prepareConfigTheme: function(a, b) {
                    var c = a.theme || b.theme,
                        d = Fancy.getTheme(c).config;
                    return Fancy.isObject(c) && (a.theme = c.name), Fancy.applyIf(a, d), a
                },
                prepareConfigFooter: function(a) {
                    var f = a.footer,
                        g = a.lang;
                    if (f) {
                        var h = [];
                        if (Fancy.isString(f.status) && h.push({
                                type: "text",
                                text: f.status,
                                cls: b
                            }), f.status && f.source && h.push("side"), Fancy.isString(f.source)) h.push({
                            type: "text",
                            text: f.source,
                            cls: e
                        });
                        else if (Fancy.isObject(f.source)) {
                            var i = f.source.text,
                                j = f.source.sourceText || g.sourceText;
                            if (f.source.link) {
                                var k = f.source.link;
                                k = k.replace("http://", ""), k = "http://" + k, i = '<span class="' + c + '">' + j + '</span>: <a class="' + d + '" href="' + k + '">' + i + "</a>"
                            } else i = "<span>" + j + ":</span> " + i;
                            h.push({
                                type: "text",
                                text: i,
                                cls: e
                            })
                        }
                        a.footer = h
                    }
                    return a
                },
                prepareConfigLang: function(a, b) {
                    var c = b.i18n || a.i18n,
                        d = Fancy.Object.copy(Fancy.i18n[c]);
                    if (a.lang) {
                        for (var e in a.lang) !1 === Fancy.isObject(a.lang[e]) && (d[e] = a.lang[e]);
                        d.paging = {}, a.lang.paging && Fancy.apply(d.paging, a.lang.paging);
                        for (var e in a.lang.paging) "paging" !== e && (Fancy.isObject(e) || (d[e] = a.lang.paging[e]));
                        d.date = {}, a.lang.date && Fancy.apply(d.date, a.lang.date)
                    }
                    return a.lang = d, a
                }
            })
        }(), Fancy.Mixin("Fancy.panel.mixin.methods", {
            setTitle: function(a) {
                this.panel && this.panel.setTitle(a)
            },
            getTitle: function() {
                if (this.panel) return this.panel.getTitle()
            },
            setSubTitle: function(a) {
                this.panel && this.panel.setSubTitle(a)
            },
            getSubTitle: function() {
                if (this.panel) return this.panel.getSubTitle()
            }
        }), Fancy.Mixin("Fancy.panel.mixin.DD", {
            ddCls: Fancy.PANEL_DRAGGABLE_CLS,
            initDD: function() {
                this.addDDCls(), this.addDD()
            },
            addDDCls: function() {
                this.el.addCls(this.ddCls)
            },
            addDD: function() {
                Fancy.DD.add({
                    dragEl: this.el,
                    overEl: this.el.select("." + Fancy.PANEL_HEADER_CLS).item(0)
                })
            }
        }), Fancy.Mixin("Fancy.panel.mixin.Resize", {
            cornerResizeCls: "fancy-panel-resize-corner",
            resizeMaskCls: "fancy-panel-resize-mask",
            initResize: function() {
                var a = this;
                a.activeResizeEl = void 0, a.renderResizeEls(), a.onsResizeEls()
            },
            renderResizeEls: function() {
                var a = this,
                    b = a.el,
                    c = Fancy.get(document.createElement("div"));
                c.addCls(a.cornerResizeCls), a.cornerResizeEl = Fancy.get(b.dom.appendChild(c.dom))
            },
            onResize: function() {
                var a = this;
                a.tbar && a._tbar.applyScrollChanges(), a.subTBar && a._subTBar.applyScrollChanges(), a.bbar && a._bbar.applyScrollChanges(), a.footer && a._footer.applyScrollChanges(), a.buttons && a._buttons.applyScrollChanges()
            },
            onsResizeEls: function(a) {
                var b = this;
                Fancy.isTouch ? b.cornerResizeEl.on("touchstart", b.onMouseDownResizeEl, b) : b.cornerResizeEl.on("mousedown", b.onMouseDownResizeEl, b), b.on("resize", b.onResize, b)
            },
            onMouseDownResizeEl: function(a) {
                var b = this,
                    c = Fancy.get(document);
                if (a.preventDefault(), Fancy.isTouch) {
                    var d = a.originalEvent.changedTouches[0];
                    c.once("touchend", b.onMouseUpResize, b), c.on("touchmove", b.onMouseMoveResize, b), b.renderResizeMask(), b.startClientX = d.clientX, b.startClientY = d.clientY
                } else c.once("mouseup", b.onMouseUpResize, b), c.on("mousemove", b.onMouseMoveResize, b), b.renderResizeMask(), b.startClientX = a.clientX, b.startClientY = a.clientY
            },
            onMouseUpResize: function() {
                var a = this,
                    b = Fancy.get(document);
                delete a.activeResizeEl, a.resizeMaskEl.destroy(), delete a.startClientX, delete a.startClientY, b.un("mousemove", a.onMouseMoveResize, a), a.setWidth(a.newResizeWidth), a.setHeight(a.newResizeHeight), a.fire("resize", {
                    width: a.newResizeWidth,
                    height: a.newResizeHeight
                })
            },
            onMouseMoveResize: function(a) {
                var b = this,
                    c = a.clientX,
                    d = a.clientY;
                if (Fancy.isTouch) {
                    var e = a.originalEvent.changedTouches[0];
                    c = e.clientX, d = e.clientY
                }
                var f = b.startClientX - c,
                    g = b.startClientY - d,
                    h = b.startResizeWidth - f,
                    i = b.startResizeHeight - g;
                a.preventDefault(), a.stopPropagation(), h < b.minWidth && (h = b.minWidth), i < b.minHeight && (i = b.minHeight), b.newResizeWidth = h, b.newResizeHeight = i, b.resizeMaskEl.css({
                    width: h,
                    height: i
                })
            },
            renderResizeMask: function() {
                var a = this,
                    b = a.el,
                    c = 2,
                    d = Fancy.get(document.createElement("div")),
                    e = parseInt(b.css("top")),
                    f = parseInt(b.css("left")),
                    g = parseInt(b.css("width")) - 2 * c,
                    h = parseInt(b.css("height")) - 2 * c,
                    i = parseInt(b.css("z-index"));
                if (a.startResizeWidth = g, a.startResizeHeight = h, !a.window && "absolute" !== b.css("position")) {
                    var j = b.offset();
                    e = j.top, f = j.left
                }
                d.addCls(a.resizeMaskCls), d.css({
                    left: f,
                    top: e,
                    width: g,
                    height: h,
                    "z-index": i
                }), a.resizeMaskEl = Fancy.get(document.body.appendChild(d.dom))
            }
        }),
        function() {
            var a = Fancy,
                b = a.HIDDEN_CLS,
                c = a.MODAL_CLS,
                d = a.PANEL_CLS,
                e = a.PANEL_HEADER_CLS,
                f = a.PANEL_SUB_HEADER_TEXT_CLS,
                g = a.PANEL_HEADER_TEXT_CLS,
                h = a.PANEL_HEADER_TOOLS_CLS,
                i = a.PANEL_SUB_HEADER_CLS,
                j = a.PANEL_BODY_CLS,
                k = a.PANEL_BODY_INNER_CLS,
                l = a.PANEL_TBAR_CLS,
                m = a.PANEL_SUB_TBAR_CLS,
                n = a.PANEL_BUTTONS_CLS,
                o = a.PANEL_BBAR_CLS,
                p = a.PANEL_HEADER_IMG_CLS,
                q = a.PANEL_NOFRAME_CLS,
                r = a.PANEL_SHADOW_CLS,
                s = a.PANEL_FOOTER_CLS,
                t = a.FIELD_PICKER_BUTTON_CLS;
            a.define("Fancy.Panel", {
                extend: a.Widget,
                barScrollEnabled: !0,
                mixins: ["Fancy.panel.mixin.DD", "Fancy.panel.mixin.Resize"],
                constructor: function(b) {
                    a.apply(this, b), this.Super("constructor", arguments)
                },
                init: function() {
                    var a = this;
                    a.Super("init", arguments), a.addEvents("resize"), a.initTpl(), a.render(), a.draggable && a.initDD(), a.resizable && a.initResize(), a.window && a.setActiveWindowWatcher()
                },
                cls: "",
                fieldCls: d,
                value: "",
                width: 300,
                height: 200,
                titleHeight: 30,
                subTitleHeight: 30,
                barHeight: 37,
                title: void 0,
                frame: !0,
                shadow: !0,
                draggable: !1,
                minWidth: 200,
                minHeight: 200,
                barContainer: !0,
                theme: "default",
                tpl: ['<div style="height:{titleHeight}px;" class="' + e + " " + b + '">', "{titleImg}", '<div class="' + g + '">{title}</div>', '<div class="' + h + '"></div>', "</div>", '<div style="height:{subTitleHeight}px;" class="' + i + " " + b + '">', '<div class="' + f + '">{subTitle}</div>', "</div>", '<div class="' + j + '">', '<div class="' + l + " " + b + '" style="height:{barHeight}px;"></div>', '<div class="' + m + " " + b + '" style="height:{barHeight}px;"></div>', '<div class="' + k + '"></div>', '<div class="' + o + " " + b + '" style="height:{barHeight}px;"></div>', '<div class="' + n + " " + b + '" style="height:{barHeight}px;"></div>', '<div class="' + s + " " + b + '" style="height:{barHeight}px;"></div>', "</div>"],
                render: function() {
                    var d = this,
                        f = a.get(d.renderTo || document.body),
                        g = a.get(document.createElement("div")),
                        h = 0,
                        k = d.titleHeight,
                        t = d.subTitleHeight;
                    if (d.renderOuter && (g = f), !f.dom) throw new Error("[FancyGrid Error 1] - Could not find renderTo element: " + d.renderTo);
                    !0 === d.window && g.css({
                        display: "none",
                        position: "absolute"
                    }), !1 === d.frame && g.addCls(q), g.addCls(a.cls, d.cls, d.fieldCls), "default" !== d.theme && g.addCls("fancy-theme-" + d.theme), d.shadow && g.addCls(r), g.css({
                        width: d.width + "px",
                        height: d.height - h + "px"
                    }), d.style && g.css(d.style);
                    var u = "",
                        v = "";
                    a.isObject(d.title) ? u = d.title.text : a.isString(d.title) && (u = d.title), a.isObject(d.subTitle) ? v = d.subTitle.text : a.isString(d.subTitle) && (v = d.subTitle);
                    var w = "";
                    a.isObject(d.title) && d.title.imgCls && (w = '<div class="' + p + " " + d.title.imgCls + '"></div>'), g.update(d.tpl.getHTML({
                        titleImg: w,
                        barHeight: d.barHeight,
                        titleHeight: k,
                        subTitleHeight: t,
                        title: u,
                        subTitle: v
                    })), a.isObject(d.title) && (d.title.style && g.select("." + e).css(d.title.style), d.title.cls && g.select("." + e).addCls(d.title.cls), d.title.tools && (d.tools = d.title.tools)), a.isObject(d.subTitle) && (d.subTitle.style && g.select("." + i).css(d.subTitle.style), d.subTitle.cls && g.select("." + i).addCls(d.subTitle.cls)), d.title ? g.select("." + e).removeCls(b) : g.select("." + j).css("border-top-width", "0px"), d.subTitle && (g.select("." + j).css("border-top-width", "0px"), g.select("." + i).removeCls(b)), d.tbar && g.select("." + l).removeCls(b), d.subTBar && g.select("." + m).removeCls(b), d.bbar && g.select("." + o).removeCls(b), d.buttons && g.select("." + n).removeCls(b), d.footer && g.select("." + s).removeCls(b), d.renderOuter ? d.el = g : (d.el = f.dom.appendChild(g.dom), d.el = a.get(d.el)), d.modal && 0 === a.select(c).length && a.get(document.body).append('<div class="' + c + '" style="display: none;"></div>'), d.id && !d.el.attr("id") && d.el.attr("id", d.id), d.renderTools(), d.renderBars(), d.setHardBordersWidth()
                },
                setHardBordersWidth: function() {
                    var a = this.panelBodyBorders;
                    this.el.select("." + j).css({
                        "border-top-width": a[0],
                        "border-right-width": a[1],
                        "border-bottom-width": a[2],
                        "border-left-width": a[3]
                    })
                },
                renderTools: function() {
                    var b = this,
                        c = b.tools;
                    void 0 !== c && a.each(c, function(c, d) {
                        c.renderTo = b.el.select("." + h).dom, b.tools[d] = new a.Tool(c, b.scope || b)
                    })
                },
                renderBars: function() {
                    var b = this,
                        c = !1,
                        d = b.theme,
                        e = this;
                    b.items && b.items[0] && ("grid" === b.items[0].type && (c = !0), e = b.items[0]), b.bbar && (b._bbar = new a.Bar({
                        el: b.el.select("." + o),
                        items: b.bbar,
                        height: b.barHeight,
                        barContainer: b.barContainer,
                        barScrollEnabled: b.barScrollEnabled,
                        scope: e,
                        theme: d
                    }), b.bbar = b._bbar.items), b.buttons && (b._buttons = new a.Bar({
                        el: b.el.select("." + n),
                        items: b.buttons,
                        height: b.barHeight,
                        barScrollEnabled: b.barScrollEnabled,
                        scope: e,
                        theme: d
                    }), b.buttons = b._buttons.items), b.tbar && (b._tbar = new a.Bar({
                        el: b.el.select("." + l),
                        items: b.tbar,
                        height: b.barHeight,
                        tabEdit: !b.subTBar && c,
                        barScrollEnabled: b.barScrollEnabled,
                        scope: e,
                        theme: d
                    }), b.tbar = b._tbar.items), b.subTBar && (b._subTBar = new a.Bar({
                        el: b.el.select("." + m),
                        items: b.subTBar,
                        height: b.barHeight,
                        tabEdit: c,
                        barScrollEnabled: b.barScrollEnabled,
                        scope: e,
                        theme: d
                    }), b.subTBar = b._subTBar.items), b.footer && (b._footer = new a.Bar({
                        disableScroll: !0,
                        el: b.el.select("." + s),
                        items: b.footer,
                        height: b.barHeight,
                        barScrollEnabled: b.barScrollEnabled,
                        scope: e,
                        theme: d
                    }), b.footer = b._footer.items)
                },
                showAt: function(b, c) {
                    this.css({
                        left: b + "px",
                        display: "",
                        "z-index": 1e3 + a.zIndex++
                    }), void 0 !== c && this.css({
                        top: c + "px"
                    })
                },
                show: function() {
                    var b = this;
                    if (b.el.show(), !0 === b.window) {
                        b.buttons && b._buttons.checkScroll(), b.tbar && b._tbar.checkScroll(), b.bbar && b._bbar.checkScroll(), b.subTBar && b._subTBar.checkScroll();
                        var d = a.getViewSize(),
                            e = b.el.height(),
                            f = b.el.width(),
                            g = [],
                            h = a.getScroll(),
                            i = h[0],
                            j = h[1];
                        g[0] = (d[1] - f) / 2, g[1] = (d[0] - e) / 2, g[0] < 10 && (g[0] = 10), g[1] < 10 && (g[1] = 10), b.css({
                            left: g[0] + j + "px",
                            top: g[1] + i + "px",
                            display: "",
                            "z-index": 1e3 + a.zIndex++
                        }), b.modal && a.select("." + c).css({
                            display: "",
                            "z-index": 1e3 + a.zIndex - 2
                        })
                    }
                },
                hide: function() {
                    var b = this;
                    b.css({
                        display: "none"
                    }), b.modal && a.select("." + c).css("display", "none"), a.each(this.items || [], function(a) {
                        "combo" === a.type && a.hideList()
                    })
                },
                setTitle: function(a) {
                    this.el.select("." + g).update(a)
                },
                getTitle: function() {
                    return this.el.select("." + g).dom.innerHTML
                },
                setSubTitle: function(a) {
                    this.el.select("." + f).update(a)
                },
                getSubTitle: function() {
                    return this.el.select("." + f).dom.innerHTML
                },
                getHeight: function() {
                    return parseInt(this.css("height"))
                },
                setWidth: function(a) {
                    this.items[0].setWidth(a)
                },
                setHeight: function(a) {
                    this.css("height", a), this.items[0].setHeight(a, !1)
                },
                setActiveWindowWatcher: function() {
                    var b = this;
                    b.el.on("mousedown", function(c) {
                        a.get(c.target).hasCls(t) || (1e3 + a.zIndex - 1 > parseInt(b.css("z-index")) && b.css("z-index", 1e3 + a.zIndex++), a.get(document.body).select(".fancy-active-panel").removeCls("fancy-active-panel"), b.el.addCls("fancy-active-panel"))
                    })
                }
            })
        }(),
        function() {
            var a = Fancy,
                b = a.BUTTON_CLS;
            a.define("Fancy.Tool", {
                extend: a.Widget,
                constructor: function(a, b) {
                    this.scope = b, this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("click", "mousedown", "mouseup", "mouseover", "mouseout"), a.Super("init", arguments), a.style = a.style || {}, a.render(), a.ons()
                },
                ons: function() {
                    this.el.on("click", this.onClick, this)
                },
                cls: b,
                text: "",
                height: 28,
                paddingTextWidth: 5,
                render: function() {
                    var b = this,
                        c = a.get(b.renderTo || document.body).dom,
                        d = document.createElement("div");
                    b.fire("beforerender"), d.className = "fancy-tool-button", d.innerHTML = b.text, b.el = a.get(c.appendChild(d)), b.fire("afterrender"), b.fire("render")
                },
                onClick: function() {
                    var a = this;
                    a.fire("click"), a.handler && (a.scope ? a.handler.apply(a.scope, [a]) : a.handler(a))
                },
                setText: function(a) {
                    this.el.update(a)
                }
            })
        }(),
        function() {
            var a = Fancy,
                b = a.PANEL_BODY_INNER_CLS,
                c = a.PANEL_GRID_INSIDE_CLS,
                d = a.TAB_WRAPPER_CLS,
                e = a.TAB_ACTIVE_WRAPPER_CLS,
                f = a.TAB_TBAR_ACTIVE_CLS,
                g = a.PANEL_TAB_CLS;
            a.define(["Fancy.panel.Tab", "Fancy.Tab", "FancyTab"], {
                extend: a.Panel,
                constructor: function(a, b) {
                    this.prepareConfigTheme(a), this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.prepareTabs(), a.Super("init", arguments), a.setActiveTab(a.activeTab)
                },
                activeTab: 0,
                theme: "default",
                render: function() {
                    var a = this;
                    a.Super("render", arguments), a.panelBodyEl = a.el.select("." + b).item(0), a.setPanelBodySize(), a.renderTabWrappers(), a.wrapped || a.el.addCls(c), a.el.addCls(g), a.rendered = !0
                },
                setPanelBodySize: function() {
                    var a = this,
                        b = a.height,
                        c = a.panelBodyBorders;
                    a.title && (b -= a.titleHeight), a.subTitle && (b -= a.subTitleHeight, b += c[2]), a.bbar && (b -= a.barHeight), a.tbar && (b -= a.barHeight), a.subTBar && (b -= a.barHeight), a.buttons && (b -= a.barHeight), a.footer && (b -= a.barHeight), b -= c[0] + c[2], a.panelBodyEl.css({
                        height: b
                    }), a.panelBodyHeight = b, a.panelBodyWidth = a.width - c[1] - c[3]
                },
                prepareConfigTheme: function(b) {
                    var c = this,
                        d = b.theme || c.theme,
                        e = a.getTheme(d).config;
                    (c.wrapped || b.wrapped) && (b.panelBodyBorders = [0, 0, 0, 0], c.panelBodyBorders = [0, 0, 0, 0]), a.applyIf(b, e), a.apply(c, b)
                },
                prepareTabs: function() {
                    for (var a = this, b = [], c = 0, d = a.items.length; c < d; c++) {
                        var e = a.items[c],
                            f = {
                                type: "tab"
                            };
                        e.tabTitle ? f.text = e.tabTitle : e.title && (f.text = e.title, delete e.title), f.handler = function(b) {
                            return function() {
                                a.setActiveTab(b)
                            }
                        }(c), b.push(f)
                    }
                    a.tbar = b, a.tabs = b
                },
                renderTabWrappers: function() {
                    var b = this;
                    a.each(b.items, function(c) {
                        var e = a.get(document.createElement("div"));
                        e.addCls(d), c.renderTo = b.panelBodyEl.dom.appendChild(e.dom)
                    })
                },
                setActiveTab: function(a) {
                    var b = this,
                        c = b.el.select("." + d),
                        g = b.activeTab;
                    if (0 !== b.items.length) {
                        c.item(b.activeTab).removeCls(e), b.activeTab = a, c.item(b.activeTab).addCls(e);
                        var h = b.items[b.activeTab];
                        if (h.theme = b.theme, h.wrapped = !0, h.width = b.panelBodyWidth, h.height = b.panelBodyHeight, h.rendered) b.setActiveItemWidth(), b.setActiveItemHeight();
                        else switch (h.type) {
                            case "form":
                                b.items[b.activeTab] = new FancyForm(h);
                                break;
                            case "grid":
                                b.items[b.activeTab] = new FancyGrid(h);
                                break;
                            case "tab":
                                b.items[b.activeTab] = new FancyTab(h)
                        }
                        b.tabs && (b.tbar[g].removeCls(f), b.tbar[b.activeTab].addCls(f))
                    }
                },
                setWidth: function(a) {
                    var b = this;
                    b.width = a, b.css("width", a), b.setPanelBodySize(), b.setActiveItemWidth()
                },
                setHeight: function(a) {
                    var b = this;
                    b.height = a, b.css("height", a), b.setPanelBodySize(), b.setActiveItemHeight()
                },
                setActiveItemWidth: function() {
                    var a = this;
                    a.items[a.activeTab].setWidth(a.panelBodyWidth)
                },
                setActiveItemHeight: function() {
                    var a = this;
                    a.items[a.activeTab].setHeight(a.panelBodyHeight, !1)
                }
            }), FancyTab.get = function(b) {
                var c = a.get(b).select("." + g).dom.id;
                return a.getWidget(c)
            }, !a.nojQuery && a.$ && (a.$.fn.FancyTab = function(a) {
                return this.selector ? a.renderTo = $(this.selector)[0].id : a.renderTo = this.attr("id"), new FancyTab(a)
            })
        }(),
        function() {
            var a = Fancy,
                b = a.GRID_CLS,
                c = a.GRID_CELL_CLS,
                d = a.BAR_CLS,
                e = a.BAR_CONTAINER_CLS,
                f = a.BAR_BUTTON_CLS,
                g = a.BAR_SEG_BUTTON_CLS,
                h = a.BAR_LEFT_SCROLLER_CLS,
                i = a.BAR_RIGHT_SCROLLER_CLS,
                j = a.FIELD_LABEL_CLS,
                k = a.FIELD_TEXT_CLS,
                l = a.FIELD_TEXT_INPUT_CLS,
                m = a.FIELD_SEARCH_CLS,
                n = a.FIELD_SEARCH_LIST_CLS,
                o = a.FIELD_SEARCH_PARAMS_LINK_CLS,
                p = a.FIELD_SEARCH_PARAMED_CLS,
                q = a.FIELD_SEARCH_PARAMED_EMPTY_CLS,
                r = a.PICKER_MONTH_ACTION_BUTTONS_CLS,
                s = a.CLEARFIX_CLS;
            a.define("Fancy.Bar", {
                extend: a.Widget,
                widgetCls: d,
                containerCls: e,
                cls: "",
                text: "",
                floating: "left",
                sideRight: 3,
                scrolled: 0,
                tabOffSet: 5,
                barScrollEnabled: !0,
                constructor: function(b) {
                    a.apply(this, b), this.init()
                },
                init: function() {
                    var a = this;
                    a.roles = {}, a.render(), a.barScrollEnabled && (a.initScroll(), setTimeout(function() {
                        a.checkScroll()
                    }, 150))
                },
                render: function() {
                    var a = this;
                    a.renderEl(), a.renderItems(), a.initTabEdit()
                },
                renderEl: function() {
                    var b = this;
                    if (!b.el) {
                        var c = a.get(document.createElement("div"));
                        c.addCls(b.widgetCls, b.cls), c.update(b.text), b.el = a.get(b.renderTo.appendChild(c.dom)), b.style && b.el.css(b.style)
                    }
                    var d = a.get(document.createElement("div"));
                    d.addCls(b.containerCls), b.containerEl = a.get(b.el.dom.appendChild(d.dom))
                },
                renderItems: function() {
                    for (var b = this, c = b.containerEl, d = b.items || [], e = 0, f = d.length, g = !1, h = [], i = f - 1, j = 0; e < f; e++) {
                        var k = d[e];
                        switch (g && (k = d[i], i--), k.toggleGroup && (k.enableToggle = !0), a.isObject(k) && (k.type = k.type || "button"), g && (b.floating = "right", k.style = k.style || {}, k.style.right = j), k.renderTo = c.dom, k) {
                            case "|":
                                var l = {
                                    float: b.floating,
                                    "margin-right": "5px",
                                    "margin-top": "6px",
                                    "padding-left": "0px"
                                };
                                "right" === b.floating && a.applyIf(l, {
                                    right: "1px",
                                    position: "absolute"
                                }), h.push(new a.Separator({
                                    renderTo: c.dom,
                                    style: l
                                }));
                                continue;
                            case "side":
                                g = !0;
                                continue;
                            default:
                                g ? h[i] = b.renderItem(k) : h.push(b.renderItem(k))
                        }
                        g && (k.text ? j += 7 * k.text.length + 5 + 5 + 5 : k.width && (j += k.width + 5), j += 3)
                    }
                    b.items = h
                },
                renderItem: function(c) {
                    var d, e = this,
                        h = e.containerEl,
                        i = e.theme;
                    switch (c.style = c.style || {}, c.label = !1, c.padding = !1, c.theme = e.theme, a.applyIf(c.style, {
                        float: e.floating
                    }), "right" === e.floating && a.applyIf(c.style, {
                        right: e.sideRight,
                        position: "absolute"
                    }), !c.scope && e.items && (c.scope = e.items[0]), c.type) {
                        case "wrapper":
                            c.cls === r && (h.destroy(), h = e.el);
                            for (var t, u = h.append('<div class="' + (c.cls || "") + '"></div>').select("div").item(0), v = 0, w = c.items.length, x = 0; v < w; v++) {
                                t = c.items[v], a.isObject(t) && (t.type = t.type || "button"), t.renderTo = u.dom, d = e.renderItem(t);
                                var y = d.el;
                                v === w - 1 ? y.css("margin-right", "0px") : x += parseInt(y.css("margin-right")), a.nojQuery ? x += parseInt(y.width()) : x += parseInt(y.$dom.outerWidth()), x += parseInt(y.css("margin-left"))
                            }
                            u.css("width", x);
                            break;
                        case void 0:
                        case "button":
                            c.extraCls = f, c.scope = e.scope, d = new a.Button(c);
                            break;
                        case "segbutton":
                            c.extraCls = g, a.applyIf(c.style, {
                                "margin-right": "6px"
                            }), d = new a.SegButton(c);
                            break;
                        case "tab":
                            d = new a.toolbar.Tab(c);
                            break;
                        case "text":
                            a.applyIf(c.style, {
                                "margin-right": "10px",
                                "padding-left": "0px",
                                "padding-top": "11px"
                            }), a.apply(c, {
                                renderTo: h.dom,
                                cls: c.cls || ""
                            }), d = new a.bar.Text(c);
                            break;
                        case "combo":
                            c.inputWidth = 18, a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), a.applyIf(c, {
                                width: 70
                            }), d = new a.Combo(c);
                            break;
                        case "date":
                            c.inputWidth = 18, a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), a.applyIf(c, {
                                width: 100
                            }), d = new a.DateField(c);
                            break;
                        case "number":
                            c.inputWidth = 18, a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), a.applyIf(c, {
                                width: 35
                            }), d = new a.NumberField(c);
                            break;
                        case "checkbox":
                            a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), d = new a.CheckBox(c);
                            break;
                        case "switcher":
                            a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), a.applyIf(c, {
                                width: 35
                            }), d = new a.Switcher(c);
                            break;
                        case "string":
                            c.inputWidth = 18, a.applyIf(c.style, {
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            }), a.applyIf(c, {
                                width: 100
                            }), d = new a.StringField(c);
                            break;
                        case "search":
                            c.inputWidth = 18, c.events = c.events || [], c.events = c.events.concat([{
                                enter: function(c, d) {
                                    var e = a.getWidget(c.el.parent().parent().parent().parent().select("." + b).item(0).attr("id"));
                                    e.search(d), e.expander && e.expander.reSet()
                                }
                            }, {
                                key: function(c, d) {
                                    var e = this,
                                        f = a.getWidget(c.el.parent().parent().parent().parent().select("." + b).item(0).attr("id"));
                                    f.filter && !1 === f.filter.autoEnterDelay || (e.autoEnterTime || (e.autoEnterTime = new Date), e.intervalAutoEnter && clearInterval(e.intervalAutoEnter), delete e.intervalAutoEnter, e.intervalAutoEnter = setInterval(function() {
                                        new Date - e.autoEnterTime > 500 && (clearInterval(e.intervalAutoEnter), delete e.intervalAutoEnter, d = c.getValue(), f.search(d), f.expander && f.expander.reSet())
                                    }, 200))
                                }
                            }, {
                                render: function(c) {
                                    var d = this,
                                        e = !1;
                                    c.el.on("mouseenter", function() {
                                        e = !0
                                    }, null, "." + o), c.el.on("mousedown", function(a) {
                                        a.preventDefault()
                                    }, null, "." + o), c.el.on("click", function(f) {
                                        var g = !1,
                                            h = a.getWidget(c.el.parent().parent().parent().parent().select("." + b).attr("id")),
                                            j = h.columns || [],
                                            k = h.leftColumns || [],
                                            l = h.rightColumns || [],
                                            m = j.concat(k).concat(l),
                                            o = [],
                                            p = 0,
                                            q = m.length,
                                            r = 1;
                                        if (h.searching.items) a.each(h.searching.items, function(a) {
                                            o.push({
                                                inputLabel: " &nbsp;&nbsp;" + a.text,
                                                value: !0,
                                                name: a.index
                                            }), r += h.fieldHeight
                                        });
                                        else
                                            for (; p < q; p++) {
                                                var s = m[p],
                                                    t = s.title;
                                                if (void 0 === t && (t = ""), !1 !== s.searchable) {
                                                    switch (s.type) {
                                                        case "color":
                                                        case "combo":
                                                        case "date":
                                                        case "number":
                                                        case "string":
                                                        case "text":
                                                        case "currency":
                                                            break;
                                                        default:
                                                            continue
                                                    }
                                                    r += h.fieldHeight, o.push({
                                                        inputLabel: " &nbsp;&nbsp;" + t,
                                                        value: !0,
                                                        name: s.index
                                                    })
                                                }
                                            }
                                        if (d.list) {
                                            if ("none" !== d.list.el.css("display")) return void d.list.el.css("display", "none");
                                            g = !0
                                        } else d.list = new FancyForm({
                                            width: 150,
                                            height: r,
                                            theme: i,
                                            defaults: {
                                                type: "checkbox",
                                                label: !1,
                                                style: {
                                                    padding: "8px 16px 0px"
                                                }
                                            },
                                            items: o,
                                            cls: n,
                                            events: [{
                                                set: function() {
                                                    h.searching.setKeys(d.list.get())
                                                }
                                            }, {
                                                init: function() {
                                                    setTimeout(function() {
                                                        var b = d.list.el;
                                                        b.on("mouseenter", function() {
                                                            e = !0
                                                        }), b.on("mouseleave", function() {
                                                            e = !1, setTimeout(function() {
                                                                !1 === e && d.list && b.css("display", "none")
                                                            }, 750)
                                                        });
                                                        var g = a.get(f.target),
                                                            h = g.offset(),
                                                            i = parseInt(c.el.css("height"));
                                                        b.css({
                                                            position: "absolute",
                                                            top: h.top + i + 20,
                                                            left: h.left
                                                        }), d.list.el.css("display", "block"), b.animate({
                                                            duration: 200,
                                                            top: h.top + i - 1
                                                        })
                                                    }, 50)
                                                }
                                            }]
                                        });
                                        var u = a.get(f.target),
                                            v = u.offset(),
                                            w = parseInt(c.el.css("height"));
                                        d.list && d.list.el && (d.list.css({
                                            position: "absolute",
                                            top: v.top + w + 20,
                                            left: v.left
                                        }), g && d.list.css("display", "block"), d.list.el.animate({
                                            duration: 200,
                                            top: v.top + w - 1
                                        }))
                                    }, null, "." + o), c.el.on("mouseleave", function() {
                                        e = !1, setTimeout(function() {
                                            !1 === e && d.list && d.list.el.css("display", "none")
                                        }, 750)
                                    }, null, "." + o)
                                }
                            }]), a.applyIf(c.style, {
                                float: e.floating,
                                "padding-left": "0px",
                                "margin-right": "8px",
                                "margin-top": "4px"
                            });
                            var z = m;
                            c.paramsMenu && (c.tpl = ['<div class="' + j + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + k + '">', '<input placeholder="{emptyText}" class="' + l + '" style="{inputWidth}" value="{value}">', '<div class="' + o + '" style="">' + (c.paramsText || "&nbsp;") + "</div>", "</div>", '<div class="' + s + '"></div>'], z += " " + p, c.paramsText || (z += " " + q)), a.applyIf(c, {
                                padding: !1,
                                width: 250,
                                cls: z,
                                emptyText: "Search"
                            }), d = new a.StringField(c)
                    }
                    return "right" === e.floating && (e.sideRight += d.width, e.sideRight += 7), c.role && (e.roles[c.role] = d), d
                },
                initScroll: function() {
                    var b = this;
                    b.leftScroller = new a.Button({
                        imageCls: !0,
                        renderTo: b.el.dom,
                        cls: h,
                        height: b.height + 2,
                        minWidth: 20,
                        paddingTextWidth: 0,
                        imageWidth: 20,
                        width: 0,
                        text: !1,
                        style: {
                            position: "absolute",
                            left: -1,
                            top: -1,
                            display: "none"
                        },
                        listeners: [{
                            click: b.onPrevScrollClick,
                            scope: b
                        }]
                    }), b.rightScroller = new a.Button({
                        imageCls: !0,
                        renderTo: b.el.dom,
                        cls: i,
                        height: b.height + 2,
                        minWidth: 20,
                        paddingTextWidth: 0,
                        imageWidth: 20,
                        width: 0,
                        text: !1,
                        style: {
                            position: "absolute",
                            right: -1,
                            top: -1,
                            display: "none"
                        },
                        listeners: [{
                            click: b.onNextScrollClick,
                            scope: b
                        }]
                    })
                },
                getBarWidth: function() {
                    return parseInt(this.el.css("width"))
                },
                getItemsWidth: function() {
                    var b = 0;
                    return a.each(this.items, function(a) {
                        "none" !== a.el.css("display") && (b += a.el.width(), b += parseInt(a.el.css("margin-left")), b += parseInt(a.el.css("margin-right")), b += parseInt(a.el.css("padding-right")), b += parseInt(a.el.css("padding-left")))
                    }), b
                },
                onPrevScrollClick: function() {
                    this.scrolled += 30, this.applyScrollChanges()
                },
                onNextScrollClick: function() {
                    this.scrolled -= 30, this.applyScrollChanges()
                },
                applyScrollChanges: function() {
                    var a = this,
                        b = a.getItemsWidth(),
                        c = a.getBarWidth() - parseInt(a.leftScroller.el.css("width")) - parseInt(a.rightScroller.el.css("width")),
                        d = b - c;
                    if (b < c) return a.scrolled = 0, a.leftScroller.el.hide(), a.rightScroller.el.hide(), void a.containerEl.css("margin-left", "0px");
                    a.scrolled > 0 ? (a.scrolled = 0, a.leftScroller.disable(), a.rightScroller.enable()) : a.scrolled < -d && (a.scrolled = -d, a.leftScroller.enable(), a.rightScroller.disable()), a.leftScroller.el.show(), a.rightScroller.el.show(), a.containerEl.css("margin-left", a.scrolled + a.leftScroller.el.width() + a.tabOffSet + "px")
                },
                onDocMouseUp: function() {
                    var a = this;
                    a.scrollInterval && (clearTimeout(a.scrollInterval), delete a.scrollInterval)
                },
                checkScroll: function() {
                    var a = this,
                        b = a.getItemsWidth(),
                        c = a.getBarWidth();
                    a.disableScroll || (b > c ? a.enableScroll() : a.barScrollEnabled && (a.leftScroller.el.hide(), a.rightScroller.el.hide()))
                },
                enableScroll: function() {
                    var a = this;
                    a.barScrollEnabled && (a.leftScroller.el.show(), a.rightScroller.el.show(), 0 === a.scrolled && (a.leftScroller.disable(), a.containerEl.css("margin-left", a.leftScroller.el.width() + a.tabOffSet + "px")))
                },
                initTabEdit: function() {
                    var a = this;
                    if (a.tabEdit)
                        for (var b = a.items.length - 1; b > -1; b--) {
                            var c = a.items[b];
                            switch (c.type) {
                                case "number":
                                case "string":
                                case "date":
                                    return void c.on("tab", a.onTabLastInput, a)
                            }
                        }
                },
                onTabLastInput: function(d, e) {
                    var f = this,
                        g = a.getWidget(f.el.parent().select("." + b).attr("id"));
                    e.preventDefault(), g.leftColumns.length ? setTimeout(function() {
                        g.leftBody.el.select("." + c).item(0).dom.click()
                    }, 100) : setTimeout(function() {
                        g.body.el.select("." + c).item(0).dom.click()
                    }, 100)
                }
            })
        }(), Fancy.define("Fancy.Separator", {
            cls: Fancy.SEPARATOR_CLS,
            constructor: function(a) {
                Fancy.apply(this, a), this.init()
            },
            init: function() {
                this.render()
            },
            render: function() {
                var a = this,
                    b = Fancy.get(document.createElement("div"));
                b.addCls(a.cls), b.update("<div></div>"), a.el = Fancy.get(a.renderTo.appendChild(b.dom)), a.style && a.el.css(a.style)
            }
        }), Fancy.define("Fancy.bar.Text", {
            extend: Fancy.Widget,
            widgetCls: Fancy.BAR_TEXT_CLS,
            cls: "",
            text: "",
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                this.Super("init", arguments), this.render()
            },
            render: function() {
                var a = this,
                    b = Fancy.get(document.createElement("div"));
                b.addCls(a.widgetCls, a.cls), b.update(a.text), a.el = Fancy.get(a.renderTo.appendChild(b.dom)), a.style && a.el.css(a.style), a.hidden && a.el.css("display", "none")
            },
            get: function() {
                return this.el.dom.innerHTML
            },
            getValue: function() {
                return this.get()
            }
        }), Fancy.define(["Fancy.Form", "FancyForm"], {
            extend: Fancy.Widget,
            mixins: ["Fancy.form.mixin.Form", Fancy.panel.mixin.PrepareConfig, Fancy.panel.mixin.methods, "Fancy.form.mixin.PrepareConfig"],
            type: "form",
            theme: "default",
            i18n: "en",
            maxLabelNumber: 11,
            minWidth: 200,
            minHeight: 200,
            barScrollEnabled: !0,
            constructor: function(a, b) {
                var c = this;
                Fancy.isDom(a) ? (b = b || {}, b.renderTo = a) : b = a, b = b || {};
                var d = function(a) {
                        a && Fancy.apply(b, a), b = c.prepareConfig(b, c), Fancy.applyConfig(c, b), c.Super("const", arguments)
                    },
                    e = function() {
                        var a = b.i18n || c.i18n;
                        !0 === Fancy.loadLang(a, d) && d({})
                    };
                Fancy.loadStyle(), Fancy.modules.form || Fancy.fullBuilt || !1 === Fancy.MODULELOAD || !1 === Fancy.MODULESLOAD || !0 === c.fullBuilt || !0 === c.neededModules ? e() : Fancy.modules.grid ? Fancy.loadModule("form", function() {
                    e()
                }) : c.loadModules(e, b)
            },
            loadModules: function(a, b) {
                var c = this,
                    d = {
                        form: !0
                    };
                Fancy.modules = Fancy.modules || {}, Fancy.nojQuery && (d.dom = !0), Fancy.isTouch && (d.touch = !0), b.url && (d.ajax = !0);
                var e = function(a) {
                    if (a.menu) return d.menu = !0, !0
                };
                Fancy.each(b.tbar, e), Fancy.each(b.bbar, e), Fancy.each(b.buttons, e), Fancy.each(b.subTBar, e);
                var f = function(a) {
                    for (var b, c = 0, e = a.length; c < e; c++) b = a[c], "combo" === b.type && b.data && b.data.proxy && (d.ajax = !0), "date" === b.type && (d.grid = !0, d.date = !0, d.selection = !0), b.items && f(b.items)
                };
                f(b.items || []), c.neededModules = {
                    length: 0
                };
                for (var g in d) void 0 === Fancy.modules[g] && (c.neededModules[g] = !0, c.neededModules.length++);
                if (0 === c.neededModules.length) return c.neededModules = !0, void a();
                var h = function(b) {
                    delete c.neededModules[b], 0 === --c.neededModules.length && (c.neededModules = !0, a())
                };
                if (c.neededModules.dom) Fancy.loadModule("dom", function() {
                    delete c.neededModules.dom, c.neededModules.length--;
                    for (var a in c.neededModules) "length" !== a && Fancy.loadModule(a, h)
                });
                else
                    for (var g in c.neededModules) "length" !== g && Fancy.loadModule(g, h)
            }
        }), FancyForm.get = function(a) {
            var b = Fancy.get(a);
            if (b.dom) {
                var c = b.select(".fancy-form").dom.id;
                return Fancy.getWidget(c)
            }
        }, FancyForm.defineTheme = Fancy.defineTheme, FancyForm.defineController = Fancy.defineController, FancyForm.addValid = Fancy.addValid, !Fancy.nojQuery && Fancy.$ && (Fancy.$.fn.FancyForm = function(a) {
            return this.selector ? a.renderTo = $(this.selector)[0].id : a.renderTo = this.attr("id"), new Fancy.Form(a)
        }),
        function() {
            var a = Fancy,
                b = a.FIELD_NOT_VALID_CLS,
                c = a.FIELD_LABEL_ALIGN_TOP_CLS,
                d = a.FIELD_TEXT_CLS,
                e = a.FIELD_LABEL_CLS,
                f = a.FIELD_TEXTAREA_TEXT_CLS,
                g = a.FIELD_LABEL_ALIGN_RIGHT_CLS,
                h = a.FIELD_DISABLED_CLS;
            a.ns("Fancy.form.field"), a.form.field.Mixin = function() {}, a.form.field.Mixin.prototype = {
                padding: "8px 8px 0px 8px",
                inputHeight: 29,
                labelHeight: 18,
                failedValidCls: b,
                cls: "",
                checkValidOnTyping: !1,
                editable: !0,
                ons: function() {
                    var a = this,
                        b = a.el,
                        c = a.el.getByTag("input");
                    if (a.input = c, c.on("blur", a.onBlur, a), c.on("focus", a.onFocus, a), c.on("input", a.onInput, a), c.on("keydown", a.onKeyDown, a), b.on("mouseenter", a.onMouseOver, a), b.on("mouseleave", a.onMouseOut, a), a.on("key", a.onKey, a), a.tip && b.on("mousemove", a.onMouseMove, a), a.format && a.format.inputFn) {
                        switch (a.value) {
                            case "":
                            case void 0:
                                break;
                            default:
                                a.formatValue(a.value)
                        }
                        a.on("key", a.onKeyInputFn)
                    }
                    a.stopPropagation && b.on("mousedown", function(a) {
                        a.stopPropagation()
                    }), b.on("mousedown", function(b) {
                        a.disabled && (b.preventDefault(), b.stopPropagation())
                    })
                },
                onKeyInputFn: function(b, c, d) {
                    var e = this,
                        f = d.keyCode,
                        g = a.key;
                    if (!e.disabled) {
                        switch (f) {
                            case g.ENTER:
                            case g.ESC:
                            case g.LEFT:
                            case g.RIGHT:
                                return
                        }
                        this.formatValue(c)
                    }
                },
                formatValue: function(a) {
                    a = this.format.inputFn(a), this.input.dom.value = a
                },
                onMouseOver: function(a) {
                    var b = this;
                    b.disabled || (b.fire("mouseover"), b.tip && b.renderTip(a))
                },
                onMouseOut: function(a) {
                    var b = this;
                    b.disabled || (b.fire("mouseout"), b.tip && b.tooltip && (b.tooltipToDestroy = !0, b.tooltip.destroy(), delete b.tooltip))
                },
                render: function() {
                    var b = this,
                        i = b.renderTo || document.body,
                        j = b.renderAfter,
                        k = b.renderBefore,
                        l = a.get(document.createElement("div"));
                    a.isString(i) && ((i = document.getElementById(i)) || (i = a.select(i).item(0))), b.fire("beforerender"), l.addCls(a.cls, b.cls, b.fieldCls), l.attr("id", b.id);
                    var m = "",
                        n = "";
                    b.itemsHTML && (n = b.itemsHTML), "top" === b.labelAlign && b.label && b.labelWidth < 7 * b.label.length && (b.labelWidth = 7 * (b.label.length + 2)), b.labelWidth && (m = "width:" + b.labelWidth + "px;");
                    var o = b.label;
                    "" === b.label ? o = "&nbsp;" : void 0 === b.label ? o = "&nbsp;" : "right" !== b.labelAlign && (o += ":");
                    var p = "",
                        q = "",
                        r = "";
                    if (!1 === b.label && (p = "display:none;"), b.inputLabel ? r = b.inputLabel : q = "display:none;", "recaptcha" === b.type ? l.update(b.tpl.getHTML({
                            key: b.key
                        })) : l.update(b.tpl.getHTML({
                            labelWidth: m,
                            label: o,
                            labelDisplay: p,
                            inputLabelDisplay: q,
                            inputLabel: r,
                            emptyText: b.emptyText,
                            value: b.value,
                            height: b.height,
                            itemsHTML: n,
                            errorTextStyle: "",
                            buttonText: b.buttonText
                        })), b.el = l, b.setStyle(), !0 === b.renderId && l.attr("id", b.id), j ? (j = a.get(j), l = j.after(l.dom.outerHTML).next()) : k ? l = k.before(l.dom.outerHTML).prev() : i.appendChild(l.dom), b.el = l, "textarea" === b.type ? b.input = b.el.getByTag("textarea") : b.input = b.el.getByTag("input"), b.name && (b.input.name = b.name), b.setSize(), "top" === b.labelAlign) b.el.addCls(c), b.el.select("." + d).css("float", "none");
                    else if ("right" === b.labelAlign) switch (b.el.addCls(g), b.type) {
                        case "radio":
                            a.$(l.dom).find("." + e).insertAfter(a.$(l.dom).find("." + d + ":last")), a.$(l.dom).find("." + e).css("float", "right");
                            break;
                        case "textarea":
                            a.$(l.dom).find("." + e).insertAfter(a.$(l.dom).find("." + f));
                            break;
                        case "checkbox":
                            a.$(l.dom).find("." + e).css("float", "right");
                            break;
                        default:
                            a.$(l.dom).find("." + e).insertAfter(a.$(l.dom).find("." + d))
                    } else b.type;
                    if (b.acceptedValue = b.value, b.fire("afterrender"), b.fire("render"), "recaptcha" !== b.type && "chat" !== b.type && setTimeout(function() {
                            b.input && b.input.dom && 0 === b.input.dom.value.length && void 0 === b.prevColor && (b.prevColor = b.input.css("color"))
                        }, 1), b.disabled) {
                        switch (b.type) {
                            case "hidden":
                                break;
                            default:
                                b.addCls(h)
                        }
                        b.input && b.input.attr("tabIndex", -1)
                    }
                },
                onKeyDown: function(b) {
                    var c = this,
                        d = b.keyCode,
                        e = a.key;
                    if (!c.disabled) {
                        switch (d) {
                            case e.BACKSPACE:
                            case e.DELETE:
                                switch (c.type) {
                                    case "field.number":
                                    case "field.string":
                                        setTimeout(function() {
                                            "" === c.getValue() && c.fire("empty")
                                        }, 1)
                                }
                                break;
                            case e.TAB:
                                c.fire("tab", b);
                                break;
                            case e.ENTER:
                                c.fire("enter", c.getValue()), "textarea" !== c.type && (b.preventDefault(), b.stopPropagation());
                                break;
                            case e.UP:
                                switch (c.type) {
                                    case "number":
                                    case "field.number":
                                        c.spinUp()
                                }
                                c.fire("up", c.getValue()), "textarea" !== c.type && (b.preventDefault(), b.stopPropagation());
                                break;
                            case e.DOWN:
                                switch (c.type) {
                                    case "number":
                                    case "field.number":
                                        c.spinDown()
                                }
                                c.fire("down", c.getValue()), "textarea" !== c.type && (b.preventDefault(), b.stopPropagation());
                                break;
                            case e.LEFT:
                                break;
                            case e.RIGHT:
                                b.stopPropagation();
                                break;
                            default:
                                setTimeout(function() {
                                    c.input && (0 === c.input.dom.value.length ? (void 0 === c.prevColor && (c.prevColor = c.input.css("color")), c.input.css("color", "grey")) : c.prevColor ? c.input.css("color", c.prevColor) : c.input.css("color", " "))
                                }, 1)
                        }
                        setTimeout(function() {
                            c.fire("key", c.input.dom.value, b)
                        }, 1)
                    }
                },
                onKey: function(a, b) {
                    a.disabled || a.isValid() && !a.checkValidOnTyping || a.validate(b)
                },
                onBlur: function() {
                    var a = this;
                    if (a.disabled) return !0;
                    if (a.fire("blur"), a.input) {
                        if ("combo" !== a.type) return a.validate(a.input.dom.value);
                        setTimeout(function() {
                            a.listItemClicked || a.validate(a.input.dom.value)
                        }, 100)
                    }
                    return !0
                },
                validate: function(b) {
                    var c = this,
                        d = c.vtype;
                    if (void 0 === d) return !0;
                    var e = a.isValid(d, b);
                    return !0 !== e ? (c.errorText = new a.Template(e.text).getHTML(e), c.failedValid(), !1) : (c.successValid(), !0)
                },
                isValid: function() {
                    return !this.hasCls(this.failedValidCls)
                },
                onFocus: function(a) {
                    var b = this;
                    if (b.disabled || !1 === b.editable) return void this.input.blur();
                    b.fire("focus")
                },
                onInput: function() {
                    var a = this,
                        b = (a.input, a.getValue()),
                        c = a.acceptedValue;
                    a.disabled || (a.acceptedValue = a.get(), a.fire("input", b), a.fire("change", b, c))
                },
                get: function() {
                    var b = this;
                    if (b.format)
                        if (a.isString(b.format));
                        else {
                            if (!a.isObject(b.format)) return b.value;
                            if (b.format.inputFn && ("number" === b.type || "field.number" === b.type)) return isNaN(parseFloat(b.value)) ? b.value : Number(b.value)
                        }
                    return b.input.dom.value
                },
                getValue: function() {
                    return this.get()
                },
                set: function(a, b) {
                    var c = this;
                    c.value = a, c.format && c.format.inputFn ? c.formatValue(a) : c.input.dom.value = a, !1 !== b && c.onInput(), c.validate(a)
                },
                setLabel: function(a) {
                    this.el.select("." + e).update(a)
                },
                setValue: function(a, b) {
                    this.set(a, b)
                },
                clear: function() {
                    this.set(""), this.clearValid()
                },
                failedValid: function() {
                    var a = this;
                    a.hasCls(a.failedValidCls) ? a.tooltip && a.errorText && a.tooltip.update(a.errorText) : (!a.tooltip && a.errorText && (a.showErrorTip(), a.el.on("mousemove", a.onMouseMove, a), a.input.hover(function(b) {
                        a.errorText && (a.showErrorTip(), a.tooltip.show(b.pageX + 15, b.pageY - 25))
                    }, function() {
                        a.hideErrorTip()
                    })), a.addCls(a.failedValidCls))
                },
                clearValid: function() {
                    this.removeCls(this.failedValidCls)
                },
                successValid: function() {
                    var a = this;
                    a.removeCls(a.failedValidCls), a.hideErrorTip(), delete a.errorText
                },
                showErrorTip: function() {
                    var b = this;
                    b.tooltip || (b.tooltip = new a.ToolTip({
                        text: b.errorText
                    }))
                },
                hideErrorTip: function() {
                    var a = this;
                    a.tooltip && (a.tooltip.destroy(), delete a.tooltip)
                },
                setInputSize: function(a) {
                    var b = this;
                    a.width && b.input.css("width", a.width), a.height && b.input.css("height", a.height)
                },
                focus: function() {
                    var a = this;
                    a.input.focus(), setTimeout(function() {
                        a.input.dom.selectionStart = a.input.dom.selectionEnd = 1e4
                    }, 0)
                },
                hide: function() {
                    var a = this;
                    a.fire("beforehide"), a.css("display", "none"), a.fire("hide")
                },
                show: function() {
                    var a = this;
                    a.css("display", "block")
                },
                setSize: function(a, b) {
                    var c = this;
                    switch (c.type) {
                        case "set":
                        case "line":
                            return
                    }
                    if (void 0 === a && void 0 === b) a = c.width, b = c.height;
                    else if (void 0 === b) {
                        var d = a;
                        a = d.width ? d.width : c.width, b = d.height ? d.height : c.height
                    }
                    if (c.size) return void c.size({
                        width: a,
                        height: b
                    });
                    void 0 !== a && c.css("width", a), "top" === c.labelAlign ? c.css("height", 1.5 * b) : (c.css("height", b), c.label && c.el.select("." + e).css("height", c.inputHeight)), c.setInputSize({
                        width: c.inputWidth,
                        height: c.inputHeight
                    })
                },
                setStyle: function() {
                    var b = this,
                        c = b.style || {},
                        d = b.padding;
                    d ? (a.isNumber(d) ? d += "px" : a.isString(d), void 0 === c.padding && (c.padding = d)) : c.padding = "0px", b.hidden && b.css("display", "none"), b.css(c)
                },
                preRender: function() {
                    var b = this;
                    b.tpl && !1 === a.isObject(b.tpl) && (b.tpl = new a.Template(b.tpl)), b.calcSize()
                },
                calcSize: function() {
                    var b, c, d, e, f, g = this,
                        h = g.inputHeight,
                        i = g.padding;
                    if (a.isString(i)) switch (i = i.replace(/px/g, ""), i = i.split(" "), i.length) {
                        case 1:
                            c = Number(i[0]), i = [c, c, c, c];
                            break;
                        case 2:
                            d = Number(i[0]), e = Number(i[1]), i = [d, e, d, e];
                            break;
                        case 3:
                            d = Number(i[0]), e = Number(i[1]), f = Number(i[2]), i = [d, e, f, d];
                            break;
                        case 4:
                            i = [Number(i[0]), Number(i[1]), Number(i[2]), Number(i[3])]
                    } else a.isNumber(i) ? i = [i, i, i, i] : !1 === i && (i = [0, 0, 0, 0]);
                    "top" === g.labelAlign && (g.height *= 1.5), b = g.width, "top" !== g.labelAlign && g.label && (b -= g.labelWidth), g.height === g.inputHeight && !1 !== g.padding && (h -= i[0] + i[2]), "radio" !== g.type || g.column || (g.calcColumns(), 1 !== g.rows && (h = (h - i[0] - i[2]) * g.rows)), g.inputHeight = h, g.inputWidth = b - i[1] - i[3], g.height = h + i[0] + i[2]
                },
                setWidth: function(a) {
                    var b = this;
                    b.width = a, b.calcSize(), b.css("width", a), b.setInputSize({
                        width: b.inputWidth
                    })
                },
                onMouseMove: function(a) {
                    var b = this,
                        c = b.widget;
                    if (!b.disabled) {
                        if (delete b.tooltipToDestroy, c) {
                            if (c.startResizing && b.tooltip) return void b.tooltip.destroy();
                            if (c.columndrag && "dragging" === c.columndrag.status) return void b.tooltip.destroy()
                        }
                        b.tip ? b.renderTip(a) : b.tooltip && b.tooltip.show(a.pageX + 15, a.pageY - 25)
                    }
                },
                renderTip: function(b) {
                    var c = this,
                        d = "",
                        e = new a.Template(c.tip || c.tooltip);
                    c.getValue && (d = c.getValue());
                    var f = e.getHTML({
                        value: d
                    });
                    c.tooltip ? c.tooltip.update(f) : c.tooltip = new a.ToolTip({
                        text: f
                    }), c.tooltip.show(b.pageX + 15, b.pageY - 25)
                },
                getInputSelection: function() {
                    var a, b, c, d, e, f = this,
                        g = 0,
                        h = 0,
                        i = f.input.dom;
                    return "number" == typeof i.selectionStart && "number" == typeof i.selectionEnd ? (g = i.selectionStart, h = i.selectionEnd) : (b = document.selection.createRange()) && b.parentElement() == i && (d = i.value.length, a = i.value.replace(/\r\n/g, "\n"), c = i.createTextRange(), c.moveToBookmark(b.getBookmark()), e = i.createTextRange(), e.collapse(!1), c.compareEndPoints("StartToEnd", e) > -1 ? g = h = d : (g = -c.moveStart("character", -d), g += a.slice(0, g).split("\n").length - 1, c.compareEndPoints("EndToEnd", e) > -1 ? h = d : (h = -c.moveEnd("character", -d), h += a.slice(0, h).split("\n").length - 1))), {
                        start: g,
                        end: h
                    }
                },
                enable: function() {
                    var a = this;
                    a.disabled = !1, a.removeCls(h), a.button && a.button.enable(), a.input && a.input.attr("tabIndex", 0)
                },
                disable: function() {
                    var a = this;
                    a.disabled = !0, a.addCls(h), a.button && a.button.disable(), a.input && a.input.attr("tabIndex", -1)
                },
                getInputValue: function() {
                    return this.input.dom.value
                }
            }
        }(), Fancy.define(["Fancy.form.field.String", "Fancy.StringField"], {
            mixins: [Fancy.form.field.Mixin],
            extend: Fancy.Widget,
            type: "field.string",
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.addEvents("focus", "blur", "input", "enter", "up", "down", "tab", "change", "key", "empty"), a.Super("init", arguments), a.preRender(), a.render(), a.ons(), a.isPassword && (a.input.attr({
                    type: "password"
                }), a.showPassTip && (a.el.select(".fancy-field-text").item(0).append('<div class="fancy-field-pass-tip">abc</div>'), a.passTipEl = a.el.select(".fancy-field-pass-tip").item(0), a.passTipEl.on("mousedown", function(a) {
                    a.preventDefault()
                }), a.passTipEl.on("click", function() {
                    "password" !== a.input.attr("type") ? (a.passTipEl.update("abc"), a.input.attr("type", "password"), a.passTipEl.css("line-height", "22px")) : (a.passTipEl.update("***"), a.input.attr("type", ""), a.passTipEl.css("line-height", "28px"))
                }))), a.hidden && a.css("display", "none"), a.style && a.css(a.style)
            },
            fieldCls: Fancy.FIELD_CLS,
            value: "",
            width: 100,
            emptyText: "",
            tpl: ['<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="fancy-field-text">', '<input placeholder="{emptyText}" class="fancy-field-text-input" style="{inputWidth}" value="{value}">', '<div class="fancy-field-error" style="{errorTextStyle}"></div>', "</div>", '<div class="fancy-clearfix"></div>']
        }),
        function() {
            var a = Fancy.CLEARFIX_CLS,
                b = Fancy.FIELD_CLS,
                c = Fancy.FIELD_LABEL_CLS,
                d = Fancy.FIELD_ERROR_CLS,
                e = Fancy.FIELD_TEXT_CLS,
                f = Fancy.FIELD_TEXT_INPUT_CLS,
                g = Fancy.FIELD_SPIN_CLS,
                h = Fancy.FIELD_SPIN_UP_CLS,
                i = Fancy.FIELD_SPIN_DOWN_CLS;
            Fancy.define(["Fancy.form.field.Number", "Fancy.NumberField"], {
                mixins: [Fancy.form.field.Mixin],
                extend: Fancy.Widget,
                type: "field.number",
                allowBlank: !0,
                constructor: function(a) {
                    Fancy.apply(this, a), this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("focus", "blur", "input", "enter", "up", "down", "tab", "change", "key", "empty"), a.Super("init", arguments), a.preRender(), a.render(), a.ons(), a.hidden && a.css("display", "none"), a.initSpin()
                },
                fieldCls: b,
                value: "",
                width: 100,
                emptyText: "",
                step: 1,
                tpl: ['<div class="' + c + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + e + '">', '<input placeholder="{emptyText}" class="' + f + '" style="{inputWidth}" value="{value}">', '<div class="' + g + '">', '<div class="' + h + '"></div>', '<div class="' + i + '"></div>', "</div>", '<div class="' + d + '" style="{errorTextStyle}"></div>', "</div>", '<div class="' + a + '"></div>'],
                onInput: function() {
                    var a = this,
                        b = a.input,
                        c = a.get(),
                        d = a.acceptedValue;
                    if (a.isValid()) {
                        for (var e = b.dom.value, f = "", g = 0, h = e.length; g < h; g++) switch (e[g]) {
                            case "0":
                            case "1":
                            case "2":
                            case "3":
                            case "4":
                            case "5":
                            case "6":
                            case "7":
                            case "8":
                            case "9":
                            case "-":
                            case "+":
                            case ".":
                                f += e[g]
                        }
                        isNaN(Number(f)) || (a.value = f, c = f)
                    }
                    a.acceptedValue = Number(a.get()), a.fire("input", c), a.fire("change", Number(c), Number(d))
                },
                isNumber: function(a) {
                    return "" === a || "-" === a || Fancy.isNumber(+a)
                },
                checkMinMax: function(a) {
                    var b = this;
                    return "" === a || "-" === a || (a = +a) >= b.min && a <= b.max
                },
                setMin: function(a) {
                    this.min = a
                },
                setMax: function(a) {
                    this.max = a
                },
                initSpin: function() {
                    var a = this;
                    !0 === a.spin && (a.el.select("." + g).css("display", "block"), a.el.select("." + h).on("mousedown", a.onMouseDownSpinUp, a), a.el.select("." + i).on("mousedown", a.onMouseDownSpinDown, a))
                },
                onMouseDownSpinUp: function(a) {
                    var b = this,
                        c = Fancy.get(document),
                        d = 700,
                        e = new Date;
                    b.disabled || (a.preventDefault(), b.mouseDownSpinUp = !0, b.spinUp(), b.spinInterval = setInterval(function() {
                        b.mouseDownSpinUp = !1, new Date - e > d && (700 === d && (d = 150), e = new Date, b.spinUp(), --d < 20 && (d = 20))
                    }, 20), c.once("mouseup", function() {
                        clearInterval(b.spinInterval)
                    }), b.focus())
                },
                onMouseDownSpinDown: function(a) {
                    var b = this,
                        c = Fancy.get(document),
                        d = 700,
                        e = new Date;
                    b.disabled || (a.preventDefault(), b.mouseDownSpinDown = !0, b.spinDown(), b.spinInterval = setInterval(function() {
                        b.mouseDownSpinDown = !1, new Date - e > d && (700 === d && (d = 150), e = new Date, b.spinDown(), --d < 20 && (d = 20))
                    }, 20), c.once("mouseup", function() {
                        clearInterval(b.spinInterval)
                    }), b.focus())
                },
                spinUp: function() {
                    var a = this,
                        b = +a.get() + a.step;
                    Fancy.Number.isFloat(a.step) && (b = Fancy.Number.correctFloat(b)), isNaN(b) && (b = a.min || 0), void 0 !== a.max && b > a.max ? b = a.max : b < a.min && (b = a.min), a.set(b)
                },
                spinDown: function() {
                    var a = this,
                        b = +a.get() - a.step;
                    Fancy.Number.isFloat(a.step) && (b = Fancy.Number.correctFloat(b)), isNaN(b) && (b = a.min || 0), void 0 !== a.min && b < a.min ? b = a.min : b > a.max && (b = a.max), a.set(b)
                }
            })
        }(), Fancy.define(["Fancy.form.field.Text", "Fancy.TextField"], {
            mixins: [Fancy.form.field.Mixin],
            extend: Fancy.Widget,
            type: "field.text",
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.Super("init", arguments), a.preRender(), a.render(), a.hidden && a.css("display", "none"), a.style && a.css(a.style)
            },
            fieldCls: Fancy.FIELD_CLS + " fancy-field-field-text",
            value: "",
            width: 100,
            emptyText: "",
            tpl: ['<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="fancy-field-text">', '<div class="fancy-field-text-value">{value}</div>', '<div class="fancy-field-error" style="{errorTextStyle}"></div>', "</div>", '<div class="fancy-clearfix"></div>'],
            set: function(a) {
                this.el.select(".fancy-field-text-value").item(0).update(a)
            }
        }), Fancy.define(["Fancy.form.field.Empty", "Fancy.EmptyField"], {
            mixins: [Fancy.form.field.Mixin],
            extend: Fancy.Widget,
            type: "field.empty",
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.addEvents(), a.Super("init", arguments), a.preRender(), a.render(), a.style && a.css(a.style)
            },
            ons: function() {},
            fieldCls: Fancy.FIELD_CLS + " " + Fancy.FIELD_EMPTY_CLS,
            width: 100,
            tpl: ['<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="fancy-field-text">', '<div class="fancy-field-error" style="{errorTextStyle}"></div>', "</div>", '<div class="fancy-clearfix"></div>']
        }),
        function() {
            var a = Fancy,
                b = a.FIELD_CLS,
                c = a.FIELD_TEXTAREA_CLS,
                d = a.FIELD_LABEL_CLS,
                e = a.FIELD_TEXTAREA_TEXT_CLS,
                f = a.FIELD_TEXTAREA_TEXT_INPUT_CLS,
                g = a.FIELD_ERROR_CLS,
                h = a.CLEARFIX_CLS;
            a.define(["Fancy.form.field.TextArea", "Fancy.TextArea"], {
                mixins: [a.form.field.Mixin],
                extend: a.Widget,
                type: "field.textarea",
                constructor: function() {
                    this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("change", "key"), a.Super("init", arguments), a.preRender(), a.render(), a.ons()
                },
                fieldCls: b + " " + c,
                value: "",
                width: 250,
                height: 100,
                labelWidth: 60,
                inputWidth: 180,
                minHeight: 100,
                maxHeight: 210,
                lineHeight: 12.5,
                emptyText: "",
                tpl: ['<div class="' + d + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + e + '">', '<textarea autocomplete="off" placeholder="{emptyText}" type="text" class="' + f + '" style="{inputWidth}height:{inputHeight}px;">{value}</textarea>', '<div class="' + g + '" style="{errorTextStyle}"></div>', "</div>", '<div class="' + h + '"></div>'],
                ons: function() {
                    var a = this,
                        b = a.el.getByTag("textarea");
                    a.input = b, b.on("blur", a.onBlur, a), b.on("focus", a.onFocus, a), b.on("input", a.onInput, a), b.on("keydown", a.onKeyDown, a), a.on("key", a.onKey, a), a.autoHeight && b.on("input", a.onChange, a), b.on("mousedown", function(b) {
                        a.disabled && b.preventDefault()
                    })
                },
                preRender: function() {
                    var b = this;
                    b.tpl && (b.tpl = new a.Template(b.tpl)), b.initHeight(), b.calcSize()
                },
                initHeight: function() {
                    var a, b = this;
                    if (b.height) a = b.height, b.maxHeight < b.height && (b.maxHeight = b.height, setTimeout(function() {
                        b.input.css({
                            "overflow-y": "scroll"
                        })
                    }, 1));
                    else if (b.value) {
                        var c = b.value.match(/\n/g);
                        c = c ? c.length : 1, a = c * b.lineHeight
                    } else a = b.height;
                    a < b.minHeight ? a = b.minHeight : a > b.maxHeight && (a = b.maxHeight, setTimeout(function() {
                        b.input.css({
                            "overflow-y": "scroll"
                        })
                    }, 1)), b.height = a, b.inputHeight = a
                },
                calcSize: function() {
                    var b, c, d, e, f, g = this,
                        h = g.padding;
                    if (a.isString(h)) switch (h = h.replace(/px/g, ""), h = h.split(" "), h.length) {
                        case 1:
                            c = Number(h[0]), h = [c, c, c, c];
                            break;
                        case 2:
                            d = Number(h[0]), e = Number(h[1]), h = [d, e, d, e];
                            break;
                        case 3:
                            d = Number(h[0]), e = Number(h[1]), f = Number(h[2]), h = [d, e, f, d];
                            break;
                        case 4:
                            h = [Number(h[0]), Number(h[1]), Number(h[2]), Number(h[3])]
                    } else a.isNumber(h) ? h = [h, h, h, h] : !1 === h && (h = [0, 0, 0, 0]);
                    "top" === g.labelAlign && (g.inputHeight -= 40), b = g.width, "top" !== g.labelAlign && g.label && (b -= g.labelWidth), g.height === g.inputHeight && !1 !== g.padding && (g.inputHeight -= h[0] + h[2]), g.inputWidth = b - h[1] - h[3], g.height = g.inputHeight + h[0] + h[2]
                },
                onChange: function() {
                    var a = this,
                        b = a.input.dom.value,
                        c = a.el.getByTag("textarea"),
                        d = b.match(/\n/g).length * a.lineHeight;
                    d < a.minHeight ? (d = a.minHeight, c.css({
                        "overflow-y": "hidden"
                    })) : d > a.maxHeight ? (d = a.maxHeight, c.css({
                        "overflow-y": "scroll"
                    })) : c.css({
                        "overflow-y": "hidden"
                    }), a.height = d
                }
            })
        }(),
        function() {
            var a = Fancy.CLEARFIX_CLS,
                b = Fancy.FIELD_CLS,
                c = Fancy.FIELD_LABEL_CLS,
                d = Fancy.FIELD_TEXT_CLS,
                e = Fancy.FIELD_CHECKBOX_CLS,
                f = Fancy.FIELD_CHECKBOX_INPUT_CLS,
                g = Fancy.FIELD_INPUT_LABEL_CLS,
                h = Fancy.FIELD_CHECKBOX_ON_CLS;
            Fancy.define(["Fancy.form.field.CheckBox", "Fancy.CheckBox"], {
                mixins: [Fancy.form.field.Mixin],
                extend: Fancy.Widget,
                type: "field.checkbox",
                disabled: !1,
                constructor: function(a) {
                    Fancy.applyConfig(this, a), this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("focus", "blur", "input", "up", "down", "beforechange", "change", "key"), a.Super("init", arguments), a.preRender(), a.render({
                        labelWidth: a.labelWidth,
                        labelDispay: a.labelText ? "" : "none",
                        label: a.label
                    }), a.expander && a.addCls("fancy-checkbox-expander"), a.acceptedValue = a.value, a.set(a.value, !1), a.ons()
                },
                labelText: "",
                labelWidth: 60,
                value: !1,
                editable: !0,
                stopIfCTRL: !1,
                checkedCls: h,
                fieldCls: b + " " + e,
                tpl: ['<div class="' + c + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + d + '">', '<div class="' + f + '"></div>', "</div>", '<div class="' + g + '" style="{inputLabelDisplay}">', "{inputLabel}", "</div>", '<div class="' + a + '"></div>'],
                ons: function() {
                    var a = this,
                        b = a.el;
                    b.on("click", a.onClick, a), b.on("mousedown", a.onMouseDown, a)
                },
                onClick: function(a) {
                    var b = this,
                        c = b.el;
                    if (!(b.disabled || (b.fire("beforechange"), a.ctrlKey && b.stopIfCTRL || !1 === b.editable))) {
                        if (!0 === b.canceledChange) return void(b.canceledChange = !0);
                        c.toggleCls(b.checkedCls);
                        var d = b.value;
                        b.value = c.hasCls(b.checkedCls), b.fire("change", b.value, d)
                    }
                },
                onMouseDown: function(a) {
                    a.preventDefault()
                },
                set: function(a, b) {
                    var c = this,
                        d = c.el;
                    if ("" === a && (a = !1), !0 === a || 1 === a) d.addCls(c.checkedCls), a = !0;
                    else if (!1 === a || 0 === a) d.removeClass(c.checkedCls), a = !1;
                    else {
                        if (void 0 !== a) throw new Error("not right value for checkbox " + a);
                        a = !1
                    }
                    c.value = a, !1 !== b && c.fire("change", c.value)
                },
                setValue: function(a, b) {
                    this.set(a, b)
                },
                getValue: function() {
                    return this.value
                },
                get: function() {
                    return this.getValue()
                },
                clear: function() {
                    this.set(!1)
                },
                toggle: function() {
                    this.set(!this.value)
                },
                destroy: function() {
                    this.Super("destroy", arguments)
                }
            })
        }(), Fancy.define(["Fancy.form.field.Switcher", "Fancy.Switcher"], {
            extend: Fancy.CheckBox,
            type: "field.switcher",
            constructor: function(a) {
                Fancy.applyConfig(this, a), this.Super("const", arguments)
            },
            init: function() {
                this.Super("init", arguments)
            },
            checkedCls: "fancy-switcher-on",
            fieldCls: Fancy.FIELD_CLS + " fancy-field-switcher",
            tpl: ['<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="fancy-field-text">', "</div>", '<div class="fancy-field-input-label" style="{inputLabelDisplay}">', "{inputLabel}", "</div>", '<div class="fancy-clearfix"></div>']
        }),
        function() {
            var a = Fancy,
                b = a.FIELD_CLS,
                c = a.FIELD_COMBO_RESULT_LIST_CLS,
                d = a.FIELD_COMBO_CLS,
                e = a.FIELD_COMBO_SELECTED_ITEM_CLS,
                f = a.FIELD_COMBO_FOCUSED_ITEM_CLS,
                g = a.FIELD_LABEL_CLS,
                h = a.FIELD_TEXT_CLS,
                i = a.CLEARFIX_CLS,
                j = a.FIELD_ERROR_CLS,
                k = a.FIELD_TEXT_INPUT_CLS,
                l = a.FIELD_DISABLED_CLS,
                m = a.FIELD_COMBO_DROPDOWN_BUTTON_CLS,
                n = a.FIELD_COMBO_INPUT_CONTAINER_CLS,
                o = a.FIELD_COMBO_LEFT_EL_CLS,
                p = a.FIELD_LABEL_ALIGN_TOP_CLS,
                q = a.FIELD_LABEL_ALIGN_RIGHT_CLS,
                r = a.FIELD_CHECKBOX_INPUT_CLS,
                s = a.FIELD_COMBO_LIST_VALUE_CLS;
            a.define("Fancy.combo.Manager", {
                singleton: !0,
                opened: [],
                add: function(a) {
                    this.hideLists(), this.opened.push(a)
                },
                hideLists: function() {
                    a.each(this.opened, function(a) {
                        a.hideList(), a.hideAheadList()
                    }), this.opened = []
                }
            }), a.define(["Fancy.form.field.Combo", "Fancy.Combo"], {
                type: "field.combo",
                mixins: [a.form.field.Mixin],
                extend: a.Widget,
                selectedItemCls: e,
                focusedItemCls: f,
                fieldCls: b + " " + d,
                width: 250,
                labelWidth: 60,
                listRowHeight: 25,
                dropButtonWidth: 27,
                leftWidth: 20,
                maxListRows: 9,
                emptyText: "",
                editable: !0,
                typeAhead: !0,
                readerRootProperty: "data",
                valueKey: "value",
                displayKey: "text",
                multiSelect: !1,
                itemCheckBox: !1,
                listCls: "",
                tpl: ['<div class="' + g + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + h + '">', '<div class="' + n + '" style="{inputWidth}{inputHeight}">', '<div class="' + o + '" style="{inputHeight}cursor:default;">&nbsp;</div>', '<input placeholder="{emptyText}" class="' + k + '" style="{inputHeight}cursor:default;" value="{value}">', '<div class="' + m + '">&nbsp;</div>', "</div>", "</div>", '<div class="' + j + '" style="{errorTextStyle}"></div>', '<div class="' + i + '"></div>'],
                constructor: function() {
                    this.tags = this.tags || [], this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("focus", "blur", "input", "up", "down", "change", "key", "enter", "esc", "empty", "load"), a.Super("init", arguments), a.loadListData() || (a.data = a.configData(a.data)), a.multiSelect && a.data.length && a.initMultiSelect(), a.preRender(), a.render(), a.ons(), a.applyStyle(), a.applyTheme(), setTimeout(function() {
                        a.applyTheme()
                    }, 1)
                },
                loadListData: function() {
                    var b = this;
                    if (!a.isObject(b.data)) return !1;
                    var c = b.data.proxy,
                        d = b.readerRootProperty;
                    if (!c || !c.url) throw new Error("[FancyGrid Error]: combo data url is not defined");
                    return c.reader && c.reader.root && (d = c.reader.root), a.Ajax({
                        url: c.url,
                        params: c.params || {},
                        method: c.method || "GET",
                        getJSON: !0,
                        success: function(a) {
                            if (b.data = b.configData(a[d]), b.renderList(), b.onsList(), b.multiSelect) b.initMultiSelect(), b.value && b.updateInput();
                            else if (b.value) {
                                var c = b.getDisplayValue(b.value);
                                c && (b.input.dom.value = c)
                            }
                            b.fire("load")
                        }
                    }), !0
                },
                configData: function(b) {
                    if (a.isObject(b) || 0 === b.length) return b;
                    if (!a.isObject(b[0])) {
                        for (var c = [], d = 0, e = b.length; d < e; d++) c.push({
                            text: b[d],
                            value: d
                        });
                        return c
                    }
                    return b
                },
                applyStyle: function() {
                    var a = this;
                    a.hidden && a.css("display", "none"), a.style && a.css(a.style)
                },
                applyTheme: function() {
                    var a = this;
                    a.theme && "default" !== a.theme && (a.addCls("fancy-theme-" + a.theme), a.list.addCls("fancy-theme-" + a.theme), a.aheadList && a.aheadList.addCls("fancy-theme-" + a.theme))
                },
                ons: function() {
                    var a = this,
                        b = a.el.select("." + m);
                    a.input = a.el.getByTag("input"), a.inputContainer = a.el.select("." + n), a.drop = b, a.onsList(), a.input.on("blur", a.onBlur, a), a.input.on("mousedown", a.onInputMouseDown, a), a.input.on("click", a.onInputClick, a), b.on("mousedown", a.onDropMouseDown, a), b.on("click", a.onDropClick, a), a.on("key", a.onKey, a), a.typeAhead && a.editable && a.input.on("keydown", a.onKeyDown, a), a.on("esc", a.onEsc, a), a.on("enter", a.onEnter, a), a.on("up", a.onUp, a), a.on("down", a.onDown, a)
                },
                onKeyDown: function(b) {
                    var c = this,
                        d = b.keyCode,
                        e = a.key;
                    switch (d) {
                        case e.ESC:
                            c.fire("esc", b);
                            break;
                        case e.ENTER:
                            c.fire("enter", b);
                            break;
                        case e.UP:
                            c.fire("up", b);
                            break;
                        case e.DOWN:
                            c.fire("down", b);
                            break;
                        case e.TAB:
                            break;
                        case e.BACKSPACE:
                            setTimeout(function() {
                                if (0 === c.input.dom.value.length) c.value = -1, c.valueIndex = -1, c.hideAheadList(), c.multiSelect && (c.values = [], c.clearListActive()), c.fire("empty");
                                else {
                                    if (c.multiSelect && c.input.dom.value.split(",").length !== c.valuesIndex.length) {
                                        var a = c.getFromInput();
                                        c.set(a)
                                    }
                                    if (0 === c.generateAheadData().length) return void c.hideAheadList();
                                    c.renderAheadList(), c.showAheadList()
                                }
                            }, 100);
                            break;
                        default:
                            setTimeout(function() {
                                if (0 === c.generateAheadData().length) return void c.hideAheadList();
                                c.renderAheadList(), c.showAheadList()
                            }, 1)
                    }
                    setTimeout(function() {
                        c.fire("key", c.input.dom.value, b)
                    }, 1)
                },
                onInputClick: function(a) {
                    var b = this,
                        c = b.list;
                    b.disabled || !0 !== b.editable && ("none" === c.css("display") ? b.showList() : b.hideList())
                },
                onDropClick: function(b) {
                    var c = this,
                        d = c.list;
                    c.disabled || ("none" === d.css("display") ? (a.combo.Manager.add(this), c.showList()) : c.hideList(), !0 === c.editable && c.input.focus())
                },
                showList: function() {
                    var b = this,
                        c = b.list,
                        d = b.input.parent().parent(),
                        e = d.$dom.offset(),
                        f = [e.left, e.top + d.$dom.height()],
                        g = a.get(document),
                        h = b.selectedItemCls,
                        i = b.focusedItemCls;
                    if (b.hideAheadList(), b.list && 0 !== b.data.length) {
                        c.css({
                            display: "",
                            left: f[0] + "px",
                            top: f[1] + 3 + "px",
                            opacity: 0,
                            width: b.getListWidth(),
                            "z-index": 2e3 + a.zIndex++
                        }), b.listCls && c.addCls(b.listCls), c.animate({
                            opacity: 1,
                            top: f[1]
                        }, a.ANIMATE_DURATION);
                        var j;
                        b.clearFocused();
                        var k = c.select("." + h);
                        0 === k.length ? b.multiSelect && b.values.length ? b.valuesIndex.each(function(a, b, d) {
                            void 0 === j && (j = a), c.select("li").item(a).addCls(h)
                        }) : j = 0 : (b.multiSelect && k.length !== b.valuesIndex.length && (c.select("." + h).removeCls(h), b.valuesIndex.each(function(a, b, d) {
                            void 0 === j && (j = a), c.select("li").item(a).addCls(h)
                        })), j = k.item(0).index()), -1 === j && (j = 0), c.select("li").item(j).addCls(i), b.scrollToListItem(j), b.docSpy || (b.docSpy = !0, g.on("click", b.onDocClick, b)), !1 !== b.subSearch && b.subSearchField && b.subSearchField.setInputSize({
                            width: b.getListWidth() - 6,
                            height: 25
                        })
                    }
                },
                showAheadList: function() {
                    var b = this,
                        c = b.aheadList,
                        d = b.input.parent().parent(),
                        e = d.$dom.offset(),
                        f = [e.left, e.top + d.$dom.height()],
                        g = a.get(document);
                    b.hideList(), c && 0 !== b.data.length && (c.css({
                        display: "",
                        left: f[0] + "px",
                        top: f[1] + "px",
                        width: b.getListWidth(),
                        "z-index": 2e3 + a.zIndex++
                    }), b.docSpy2 || (b.docSpy2 = !0, g.on("click", b.onDocClick, b)))
                },
                onDocClick: function(a) {
                    var b = this;
                    if (!1 === b.input.parent().parent().within(a.target)) {
                        if (!0 === b.list.within(a.target)) return;
                        b.hideList(), b.hideAheadList()
                    }
                },
                hideList: function() {
                    var b = this;
                    if (b.list && (b.list.css("display", "none"), b.docSpy)) {
                        var c = a.get(document);
                        b.docSpy = !1, c.un("click", b.onDocClick, b)
                    }
                },
                hideAheadList: function() {
                    var b = this;
                    if (b.aheadList && (b.aheadList.css("display", "none"), b.docSpy)) {
                        var c = a.get(document);
                        b.docSpy = !1, c.un("click", b.onDocClick, b)
                    }
                },
                onInputMouseDown: function(a) {
                    var b = this;
                    if (b.disabled) return void a.preventDefault();
                    !1 === b.editable && a.preventDefault()
                },
                onDropMouseDown: function(a) {
                    this.disabled && a.stopPropagation(), a.preventDefault()
                },
                onsList: function() {
                    var a = this;
                    a.list.on("mousedown", a.onListItemMouseDown, a, "li"), a.list.on("click", a.onListItemClick, a, "li"), a.list.on("mouseenter", a.onListItemOver, a, "li"), a.list.on("mouseleave", a.onListItemLeave, a, "li"), a.selectAllText && a.list.select(".fancy-combo-list-select-all").on("click", a.onSelectAllClick, a)
                },
                onsAheadList: function() {
                    var a = this;
                    a.aheadList.on("click", a.onListItemClick, a, "li")
                },
                onListItemOver: function(b) {
                    if (!this.disabled) {
                        var c = a.get(b.target);
                        "li" === c.prop("tagName").toLocaleLowerCase() && c.addCls(this.focusedItemCls)
                    }
                },
                onListItemLeave: function() {
                    this.disabled || this.clearFocused()
                },
                onListItemMouseDown: function() {
                    var a = this;
                    a.listItemClicked = !0, setTimeout(function() {
                        delete a.listItemClicked
                    }, 1e3)
                },
                onListItemClick: function(b) {
                    var c = this,
                        d = a.get(b.currentTarget),
                        e = d.attr("value"),
                        f = c.selectedItemCls,
                        g = c.focusedItemCls;
                    c.disabled || (a.nojQuery && 0 === e && (e = ""), c.multiSelect ? (0 === c.values.length && c.clearListActive(), c.clearFocused(), d.toggleCls(f), d.hasCls(f) ? (c.addValue(e), d.addCls(g)) : (c.removeValue(e), c.clearFocused(), c.selectAllText && c.list.select(".fancy-combo-list-select-all").removeCls("fancy-combo-item-selected")), c.updateInput()) : (c.set(e), c.hideList()), c.editable ? c.input.focus() : c.onBlur())
                },
                set: function(b, c) {
                    var d, e = this,
                        f = "";
                    if (e.multiSelect && !a.isArray(b) && (b = -1 === b ? [] : [b]), a.isArray(b) && e.multiSelect) {
                        var g = [];
                        e.valuesIndex.removeAll(), a.each(b, function(a, c) {
                            var d = e.getIndex(a); - 1 !== d && (e.valuesIndex.add(d, b[c]), g.push(e.data[d][e.displayKey]), f = g.join(", "))
                        }), e.values = b, d = e.getIndex(b[0]), e.value = b[0], e.valueIndex = d
                    } else d = e.getIndex(b), -1 !== d ? (e.valueIndex = d, f = e.data[d][e.displayKey], e.selectItem(d)) : -1 !== b && b && b.length > 0 ? (f = "", e.value = -1, e.valueIndex = -1) : f = "", e.value = b;
                    e.input.dom.value = f, !1 !== c && e.onInput(), e.left && e.updateLeft(), e.validate(f)
                },
                addValue: function(a) {
                    var b = this,
                        c = b.getIndex(a); - 1 === c || b.valuesIndex.get(c) || (b.value = a, b.values.push(a), b.valuesIndex.add(c, a))
                },
                removeValue: function(b) {
                    var c = this,
                        d = -1;
                    a.each(c.values, function(a, c) {
                        a === b && (d = c)
                    }), -1 !== d && (c.values.splice(d, 1), c.valuesIndex.remove(c.getIndex(b))), c.values.length ? c.value = c.values[c.values.length - 1] : (c.value = -1, c.valueIndex = -1)
                },
                updateInput: function(a) {
                    var b = this,
                        c = [];
                    b.valuesIndex.each(function(a, d, e) {
                        c.push(b.data[a][b.displayKey])
                    }), b.input.dom.value = c.join(", "), !1 !== a && b.onInput()
                },
                selectItem: function(a) {
                    var b = this;
                    if (b.list) {
                        b.multiSelect || b.clearListActive(), b.clearFocused();
                        b.list.select("li").item(a).addCls(b.focusedItemCls, b.selectedItemCls)
                    }
                },
                render: function() {
                    var b = this,
                        c = a.get(b.renderTo || document.body).dom,
                        d = a.get(document.createElement("div")),
                        e = b.value,
                        f = -1;
                    d.attr("id", b.id), void 0 === e ? e = "" : b.multiSelect && a.isArray(b.data) && b.data.length > 0 ? (e = "", b.valuesIndex.each(function(a, c) {
                        -1 === f && (f = a, b.valueIndex = a), e += b.data[a][b.displayKey] + ", "
                    }), e = e.replace(/, $/, "")) : (f = b.getIndex(e), -1 !== f ? (b.valueIndex = f, e = b.data[f][b.displayKey]) : e = ""), b.fire("beforerender"), d.addCls(a.cls, b.cls, b.fieldCls);
                    var i = "";
                    b.labelWidth && (i = "width:" + b.labelWidth + "px;");
                    var j = b.label;
                    "" === b.label ? j = "&nbsp;" : void 0 === b.label ? j = "&nbsp;" : "right" !== b.labelAlign && (j += ":"), d.update(b.tpl.getHTML({
                        labelWidth: i,
                        labelDisplay: !1 === b.label ? "display: none;" : "",
                        label: !1 === j ? "" : j,
                        emptyText: b.emptyText,
                        inputHeight: "height:" + b.inputHeight + "px;",
                        value: e
                    })), b.el = d, b.setStyle(), b.input = b.el.getByTag("input"), b.inputContainer = b.el.select("." + n), b.drop = b.el.select("." + m), b.leftTpl && (b.left = b.el.select("." + o), b.left.css({
                        display: "block",
                        width: b.leftWidth
                    })), b.setSize(), c.appendChild(d.dom), "top" === b.labelAlign ? b.el.addCls(p) : "right" === b.labelAlign && (b.el.addCls(q), a.$(d.dom).find("." + g).insertAfter(a.$(d.dom).find("." + h))), b.valueIndex && (b.acceptedValue = b.value), b.editable ? b.input.css("cursor", "auto") : b.input && b.input.attr("tabIndex", -1), b.disabled && (b.addCls(l), b.input && b.input.attr("tabIndex", -1)), b.renderList(), b.leftTpl && (setTimeout(function() {
                        b.updateLeft()
                    }, 1), setTimeout(function() {
                        b.updateLeft()
                    }, 500), setTimeout(function() {
                        b.updateLeft()
                    }, 1e3)), b.fire("afterrender"), b.fire("render")
                },
                renderList: function() {
                    var b = this,
                        d = a.get(document.createElement("div")),
                        e = [];
                    b.selectAllText && e.push('<div class="fancy-combo-list-select-all"><div class="fancy-field-checkbox-input" style=""></div><span class="fancy-combo-list-select-all-text">' + b.selectAllText + "</span></div>"), !1 === b.editable && !1 !== b.subSearch && "checkbox" !== b.type && e.push('<div class="fancy-combo-list-sub-search-container"></div>'), b.list && b.list.destroy(), e.push(['<ul style="position: relative;">']), a.each(b.data, function(c, d) {
                        var f = "",
                            g = c[b.displayKey],
                            h = c[b.valueKey];
                        if (b.value === h && (f = b.selectedItemCls), "" === g || " " === g) g = "&nbsp;";
                        else if (b.listItemTpl) {
                            var i = new a.Template(b.listItemTpl);
                            g = i.getHTML(c)
                        }
                        b.multiSelect && b.itemCheckBox ? e.push('<li value="' + h + '" class="' + f + '"><div class="' + r + '" style=""></div><span class="' + s + '">' + g + "</span></li>") : e.push('<li value="' + h + '" class="' + f + '"><span class="' + s + '">' + g + "</span></li>")
                    }), e.push("</ul>"), d.addCls(a.cls, c), d.update(e.join("")), d.css({
                        display: "none",
                        left: "0px",
                        top: "0px",
                        width: b.getListWidth()
                    }), b.data.length > b.maxListRows && d.select("ul").item(0).css({
                        height: b.listRowHeight * b.maxListRows + "px",
                        overflow: "auto"
                    }), document.body.appendChild(d.dom), b.list = d, !1 === b.editable && "checkbox" !== b.type && !1 !== b.subSearch && (b.subSearchField = new a.StringField({
                        renderTo: b.list.select(".fancy-combo-list-sub-search-container").item(0).dom,
                        label: !1,
                        style: {
                            padding: "2px 2px 0px 2px"
                        },
                        events: [{
                            change: b.onSubSearchChange,
                            scope: b
                        }]
                    }), b.subSearchField.setInputSize({
                        width: b.getListWidth() - 6,
                        height: 25
                    })), b.applyTheme()
                },
                getListWidth: function() {
                    var a, b = this,
                        c = b.inputWidth + 14,
                        d = b.minListWidth;
                    return b.input && (a = b.input.parent().parent(), c = a.width()), d && d > c && (c = d), c
                },
                generateAheadData: function() {
                    var b = this,
                        c = b.input.dom.value.toLocaleLowerCase(),
                        d = [];
                    if (b.multiSelect) {
                        var e = c.split(", "),
                            f = b.getInputSelection(),
                            g = 0;
                        a.each(c, function(a, b) {
                            if (f.start <= b) return !0;
                            "," === c[b] && g++
                        }), c = e[g]
                    }
                    return a.each(b.data, function(a) {
                        new RegExp("^" + c).test(a[b.displayKey].toLocaleLowerCase()) && d.push(a)
                    }), b.data.length === d.length && (d = []), b.aheadData = d, d
                },
                renderAheadList: function() {
                    var b, c = this,
                        d = ['<ul style="position: relative;">'],
                        e = !1;
                    c.aheadList ? (c.aheadList.firstChild().destroy(), b = c.aheadList, e = !0) : b = a.get(document.createElement("div")), a.each(c.aheadData, function(b, e) {
                        var f = "",
                            g = b[c.displayKey],
                            h = b[c.valueKey];
                        if (0 === e && (f = c.selectedItemCls), "" === g || " " === g) g = "&nbsp;";
                        else if (c.listItemTpl) {
                            var i = new a.Template(c.listItemTpl);
                            g = i.getHTML(b)
                        }
                        d.push('<li value="' + h + '" class="' + f + '"><span class="' + s + '">' + g + "</span></li>")
                    }), d.push("</ul>"), b.update(d.join("")), b.css({
                        display: "none",
                        left: "0px",
                        top: "0px",
                        width: c.getListWidth()
                    }), b.css({
                        "max-height": c.listRowHeight * c.maxListRows + "px",
                        overflow: "auto"
                    }), !1 === e && (b.addClass(a.cls, "fancy-combo-result-list"), document.body.appendChild(b.dom), c.aheadList = b, c.onsAheadList()), c.applyTheme()
                },
                hide: function() {
                    var a = this;
                    a.css("display", "none"), a.hideList(), a.hideAheadList()
                },
                clear: function() {
                    var a = this;
                    a.multiSelect ? a.set([], !1) : a.set(-1, !1)
                },
                clearListActive: function() {
                    var a = this,
                        b = a.selectedItemCls,
                        c = a.focusedItemCls;
                    a.list.select("." + c).removeCls(c), a.list.select("." + b).removeCls(b)
                },
                clearFocused: function() {
                    var a = this,
                        b = a.focusedItemCls;
                    a.list && a.list.select("." + b).removeCls(b), a.aheadList && a.aheadList.select("." + b).removeCls(b)
                },
                onInput: function() {
                    var a = this,
                        b = a.getValue(),
                        c = a.acceptedValue;
                    a.acceptedValue = a.get(), a.fire("change", b, c), a.left && a.updateLeft()
                },
                setValue: function(a, b) {
                    this.set(a, b)
                },
                getDisplayValue: function(a, b) {
                    var c = this,
                        d = c.getIndex(a);
                    return b ? d : c.data[d] ? c.data[d][c.displayKey] : ""
                },
                getValueKey: function(a, b) {
                    for (var c = this, d = 0, e = c.data.length; d < e; d++)
                        if (c.data[d][c.displayKey] === a) return b ? d : c.data[d][c.valueKey]
                },
                get: function() {
                    return this.getValue()
                },
                getValue: function() {
                    var a = this;
                    return a.multiSelect ? a.values : -1 === a.value || void 0 === a.value ? -1 === a.value && a.input.dom.value ? a.input.dom.value : "" : (a.valueKey, a.value)
                },
                size: function(a) {
                    var b = this,
                        c = a.width,
                        d = a.height,
                        e = b.input,
                        f = b.inputContainer,
                        g = b.drop;
                    "top" !== b.labelAlign && (b.inputHeight = d), void 0 !== d && (b.height = d), void 0 !== c && (b.width = c), b.calcSize(), "top" === b.labelAlign ? b.css({
                        height: 1.5 * b.height,
                        width: b.width
                    }) : b.css({
                        height: b.height,
                        width: b.width
                    });
                    var h = b.inputWidth,
                        i = 2;
                    "dark" === b.theme && (i = 0);
                    var j = h - i;
                    b.left && (j -= b.leftWidth), e.css({
                        width: j,
                        height: b.inputHeight,
                        "margin-left": b.left ? b.leftWidth : 0
                    }), f.css({
                        width: h,
                        height: b.inputHeight
                    }), g.css("height", b.inputHeight)
                },
                onEnter: function(a, b) {
                    var c, d = this,
                        e = d.getActiveList(),
                        f = d.focusedItemCls,
                        g = d.selectedItemCls;
                    if (d.multiSelect) {
                        if (!e) return;
                        var h = e.select("." + f);
                        if (h && h.dom || (h = e.select("." + g).last()), h && h.dom) {
                            c = h.attr("value"), d.addValue(c);
                            var i = d.getDisplayValue(c, !0);
                            d.selectItem(i), d.updateInput()
                        }
                    } else if (e) {
                        var h = e.select("." + f);
                        h && h.dom || (h = e.select("." + g)), c = h.attr("value"), d.set(c)
                    } else d.set(d.input.dom.value);
                    d.hideList(), d.hideAheadList()
                },
                onEsc: function(a, b) {
                    var c = this;
                    c.hideList(), c.hideAheadList()
                },
                onUp: function(a, b) {
                    var c = this,
                        d = c.getActiveList(),
                        e = c.focusedItemCls;
                    if (d) {
                        b.preventDefault();
                        var f = d.select("." + e),
                            g = !1;
                        f.dom || (g = !0, f = d.lastChild());
                        var h = f.index(),
                            i = d.select("li"),
                            j = parseInt(d.css("height"));
                        0 === h || g ? h = i.length - 1 : h--;
                        var k = i.item(h),
                            l = k.position().top;
                        l - d.dom.scrollTop > j ? d.dom.scrollTop = 1e4 : l - d.dom.scrollTop < 0 && (d.dom.scrollTop = l), c.clearFocused(), k.addClass(e)
                    }
                },
                onDown: function(a, b) {
                    var c = this,
                        d = c.getActiveList(),
                        e = c.focusedItemCls;
                    if (d) {
                        b.preventDefault();
                        var f = d.select("." + e),
                            g = !1;
                        f.dom || (g = !0, f = d.firstChild());
                        var h = parseInt(f.css("height")),
                            i = f.index(),
                            j = d.select("li"),
                            k = parseInt(d.css("height"));
                        i === j.length - 1 || g ? i = 0 : i++;
                        var l = j.item(i),
                            m = l.position().top,
                            n = parseInt(l.css("height"));
                        m - d.dom.scrollTop < 0 ? d.dom.scrollTop = 0 : m + n + 3 - d.dom.scrollTop > k && (d.dom.scrollTop = m - k + h + n), c.clearFocused(), l.addClass(e)
                    } else c.showList()
                },
                scrollToListItem: function(a) {
                    var b = this,
                        c = b.getActiveList(),
                        d = c.select("li"),
                        e = d.item(a),
                        f = e.position().top;
                    parseInt(c.css("height"));
                    0 === a ? c.dom.scrollTop = 0 : a === d.length - 1 ? c.dom.scrollTop = 1e4 : c.dom.scrollTop = f
                },
                getActiveList: function() {
                    var a = this,
                        b = !1;
                    return a.list && "none" !== a.list.css("display") ? b = a.list : a.aheadList && "none" !== a.aheadList.css("display") && (b = a.aheadList), b
                },
                initMultiSelect: function() {
                    var b = this,
                        c = b.value;
                    b.values = [], b.valuesIndex = new a.Collection, void 0 !== b.value && null !== c && "" !== c && (a.isArray(c) ? (b.values = c, b.value = c[0]) : b.values = [b.value], a.each(b.values, function(a) {
                        b.valuesIndex.add(b.getIndex(a), a)
                    }))
                },
                getIndex: function(a) {
                    for (var b = this, c = b.data, d = 0, e = c.length, f = -1; d < e; d++)
                        if (c[d][b.valueKey] == a) return d;
                    return f
                },
                getFromInput: function() {
                    var b = this,
                        c = b.input.dom.value,
                        d = c.split(","),
                        e = [];
                    return a.each(d, function(a) {
                        var c = a.replace(/ $/, "").replace(/^ /, ""),
                            d = b.getValueKey(c);
                        d && e.push(d)
                    }), e
                },
                updateLeft: function() {
                    var b = this,
                        c = b.data[b.getIndex(b.getValue())];
                    b.left.update(new a.Template(b.leftTpl).getHTML(c))
                },
                setData: function(a) {
                    var b = this;
                    b.data = a, b.renderList(), b.onsList()
                },
                onSelectAllClick: function(a) {
                    var b = this,
                        c = b.list.select("li"),
                        d = b.list.select(".fancy-combo-list-select-all").item(0),
                        e = d.hasClass("fancy-combo-item-selected");
                    setTimeout(function() {
                        e ? d.removeCls("fancy-combo-item-selected") : d.addCls("fancy-combo-item-selected")
                    }, 100), c.each(function(a, b) {
                        e ? a.hasClass("fancy-combo-item-selected") && a.dom.click() : a.hasClass("fancy-combo-item-selected") || a.dom.click()
                    })
                },
                onSubSearchChange: function(b, c) {
                    var d = this,
                        e = d.list.select("li"),
                        f = 0,
                        g = d.listRowHeight * d.maxListRows;
                    c = c.toLocaleLowerCase(), a.each(d.data, function(a, b) {
                        new RegExp("^" + c).test(a[d.displayKey].toLocaleLowerCase()) ? (e.item(b).css("display", "block"), f += parseInt(e.item(b).css("height"))) : e.item(b).css("display", "none")
                    });
                    var h = d.list.select("ul").item(0);
                    f > g ? h.css("height", g) : h.css("height", f)
                }
            })
        }(),
        function() {
            var a = Fancy,
                b = a.CLEARFIX_CLS,
                c = a.FIELD_CLS,
                d = a.FIELD_LABEL_CLS,
                e = a.FIELD_TEXT_CLS,
                f = a.FIELD_BUTTON_CLS;
            a.define(["Fancy.form.field.Button", "Fancy.ButtonField"], {
                mixins: [a.form.field.Mixin],
                extend: a.Widget,
                type: "field.button",
                pressed: !1,
                constructor: function(b) {
                    a.apply(this, b), this.Super("const", arguments)
                },
                init: function() {
                    var a = this;
                    a.addEvents("click"), a.Super("init", arguments), a.preRender(), a.render(), a.renderButton(), a.ons(), a.hidden && a.css("display", "none"), a.style && a.css(a.style)
                },
                fieldCls: c + " " + f,
                value: "",
                width: 100,
                emptyText: "",
                tpl: ['<div class="' + d + '" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="' + e + '">', "</div>", '<div class="' + b + '"></div>'],
                renderButton: function() {
                    var b = this;
                    b.button = new a.Button({
                        renderTo: b.el.select("." + e).item(0).dom,
                        text: b.buttonText,
                        disabled: b.disabled,
                        pressed: b.pressed,
                        enableToggle: b.enableToggle,
                        handler: function() {
                            b.disabled || b.handler && b.handler()
                        }
                    })
                },
                ons: function() {
                    var a = this;
                    a.button.on("pressedchange", function(b, c) {
                        a.fire("pressedchange", c)
                    })
                },
                onClick: function() {
                    var a = this;
                    a.disabled || (a.fire("click"), a.handler && a.handler())
                },
                setPressed: function(a) {
                    this.button.setPressed(a)
                }
            })
        }(), Fancy.define(["Fancy.form.field.SegButton", "Fancy.SegButtonField"], {
            mixins: [Fancy.form.field.Mixin],
            extend: Fancy.Widget,
            type: "field.button",
            allowToggle: !0,
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.addEvents("click", "change"), a.Super("init", arguments), a.preRender(), a.render(), a.renderButton(), a.ons(), a.hidden && a.css("display", "none"), a.style && a.css(a.style)
            },
            fieldCls: "fancy fancy-field fancy-field-button",
            value: "",
            width: 100,
            emptyText: "",
            tpl: ['<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">', "{label}", "</div>", '<div class="fancy-field-text">', "</div>", '<div class="fancy-clearfix"></div>'],
            renderButton: function() {
                var a = this;
                a.button = new Fancy.SegButton({
                    renderTo: a.el.select(".fancy-field-text").item(0).dom,
                    items: a.items,
                    disabled: a.disabled,
                    multiToggle: a.multiToggle,
                    allowToggle: a.allowToggle
                })
            },
            ons: function() {
                var a = this;
                a.button.on("toggle", function() {
                    a.disabled || a.fire("toggle")
                })
            },
            onClick: function() {
                var a = this;
                a.disabled || (a.fire("click"), a.handler && a.handler())
            },
            get: function() {
                var a = this,
                    b = [];
                return Fancy.each(a.items, function(a, c) {
                    a.pressed && (a.value ? b.push(a.value) : b.push(c))
                }), b.toString()
            },
            clear: function(a) {
                this.allowToggle && Fancy.each(this.items, function(b) {
                    b.setPressed(!1, a)
                })
            }
        }), Fancy.define(["Fancy.form.field.Tab", "Fancy.Tab"], {
            mixins: [Fancy.form.field.Mixin],
            extend: Fancy.Widget,
            type: "field.tab",
            constructor: function(a) {
                Fancy.apply(this, a), this.Super("const", arguments)
            },
            init: function() {
                var a = this;
                a.addEvents("collapsed", "expanded"), a.Super("init", arguments);
                for (var b = 0, c = a.items.length; b < c; b++) {
                    var d = a.items[b];
                    "top" === d.labelAlign && (!0, 0 === b && (d.style = {
                        "padding-left": "0px"
                    }))
                }
                a.preRender(), a.render()
            },
            fieldCls: "fancy fancy-field-tab",
            value: "",
            width: 100,
            emptyText: "",
            tpl: ['<div class="fancy-field-tab-items">', "</div>"]
        }),
        function() {
            var a = Fancy,
                b = a.CLEARFIX_CLS,
                c = a.FIELD_CLS,
                d = a.FIELD_RADIO_CLS,
                e = a.FIELD_RADIO_COLUMN_CLS,
                f = a.FIELD_TEXT_CLS,
                g = a.FIELD_RADIO_ON_CLS,
                h = a.FIELD_RADIO_INPUT_CLS,
                i = a.FIELD_LABEL_CLS,
                j = a.FIELD_ERROR_CLS;
            a.define(["Fancy.form.field.Radio", "Fancy.Radio"], {
                mixins: [a.form.field.Mixin],
                extend: a.Widget,
                type: "field.radio",
                radioRows: 1,
                constructor: function() {
                    this.Super("const", arguments)
                },
                init: function() {
                    var b = this;
                    b.addEvents("focus", "blur", "input", "up", "down", "change", "key"), b.Super("init", arguments);
                    var c = "";
                    b.column && (b.cls += " " + e, c += '<div style="margin-left: ' + b.labelWidth + 'px;">'), a.each(b.items, function(a, d) {
                        var e = "",
                            i = f;
                        b.column || 0 === d || (e = "margin-left:10px;"), a.value === b.value && (i += " " + g), c += ['<div class="' + i + '" value=' + a.value + ">", '<div class="' + h + '" style="float:left;' + e + '"></div>', '<div style="float:left;margin:7px 0 0 0;">' + a.text + "</div>", "</div>"].join("")
                    }), b.column && (c += "</div>"), b.itemsHTML = c, b.preRender(), b.render(), b.setColumnsStyle(), b.acceptedValue = b.value, b.set(b.value), b.ons()
                },
                labelText: "",
                labelWidth: 60,
                value: !1,
                checkedCls: g,
                fieldCls: c + " " + d,
                tpl: ['<div class="' + i + '" style="{labelWidth}{labelDisplay}">', "{label}", '<div class="' + j + '" style="{errorTextStyle}"></div>', "</div>", "{itemsHTML}", '<div class="' + b + '"></div>'],
                ons: function() {
                    var b = this,
                        c = this.el;
                    c.$dom.delegate("." + f, "click", function() {
                        b.disabled || b.set(a.get(this).attr("value"))
                    }), c.on("mousedown", b.onMouseDown, b)
                },
                onClick: function() {
                    var a = this,
                        b = a.checkedCls;
                    a.disabled || (a.addCls(b), a.toggleCls(b), a.value = a.hasCls(b), a.fire("change", a.value))
                },
                onMouseDown: function(a) {
                    this.disabled && a.stopPropagation(), a.preventDefault()
                },
                set: function(a, b) {
                    var c = this,
                        d = c.el,
                        e = c.checkedCls;
                    d.select("." + f).removeCls(e), d.select("[value=" + a + "]").addCls(e), c.value = a, !1 !== b && c.fire("change", c.value)
                },
                setValue: function(a, b) {
                    this.set(a, b)
                },
                getValue: function() {
                    return this.value
                },
                get: function() {
                    return this.getValue()
                },
                clear: function() {
                    this.set(!1)
                },
                calcColumns: function() {
                    var b = this,
                        c = 0,
                        d = b.width;
                    "top" !== b.labelAlign && b.label && (d -= b.labelWidth, d -= 20), a.Array.each(b.items, function(a) {
                        a.text.length > c && (c = a.text.length)
                    });
                    var e = Math.floor(d / (7 * c + 30));
                    b.columns && b.columns <= e ? e = b.columns : b.columns = e, b.columnWidth = Math.ceil(d / e), b.rows = Math.ceil(b.items.length / e)
                },
                setColumnsStyle: function() {
                    var a = this;
                    if (a.columns && 1 !== a.rows) {
                        var b = a.el.select("." + f),
                            c = a.el.select("." + f + " ." + h);
                        b.each(function(b, d) {
                            d % a.columns == 0 && c.item(d).css("margin-left", "0px"), b.css("width", a.columnWidth)
                        })
                    }
                }
            })
        }(),
        function() {
            Fancy.vtypes = {}, Fancy.addValid = function(a, b) {
                Fancy.vtypes[a] = b
            }, Fancy.isValid = function(a, b) {
                var c;
                if (Fancy.isString(a) ? c = Fancy.vtypes[a] : Fancy.isObject(a) && (a.type ? (c = Fancy.vtypes[a.type], Fancy.applyIf(a, c)) : c = a), c.before) {
                    var d = c.before,
                        e = [a];
                    Fancy.isString(d) ? e.push(d) : Fancy.isArray(d) && (e = e.concat(d)), e.reverse();
                    for (var f = 0, g = e.length; f < g; f++)
                        if (c = Fancy.isObject(e[f]) ? e[f] : Fancy.vtypes[e[f]], c.re) {
                            if (!1 === c.re.test(b)) return c
                        } else if (c.fn && !1 === c.fn.apply(c, [b])) return c
                } else if (c.re) {
                    if (!1 === c.re.test(b)) return c
                } else if (!1 === c.fn.apply(c, [b])) return c;
                return !0
            }
        }(), Fancy.addValid("notempty", {
            text: "Must be present",
            fn: function(a) {
                return null !== a && void 0 !== a && 0 !== String(a).length
            }
        }), Fancy.addValid("notnan", {
            text: "Must be numeric",
            fn: function(a) {
                return !isNaN(a)
            }
        }), Fancy.addValid("min", {
            before: ["notempty", "notnan"],
            text: "Must be must be at least {param}",
            fn: function(a) {
                return a >= this.param
            }
        }), Fancy.addValid("max", {
            before: ["notempty", "notnan"],
            text: "Must be no more than {param}",
            fn: function(a) {
                return a <= this.param
            }
        }), Fancy.addValid("range", {
            before: ["notempty", "notnan"],
            text: "Must be between {min} and {max}",
            fn: function(a) {
                return a >= this.min && a <= this.max
            }
        }), Fancy.addValid("email", {
            before: "notempty",
            re: /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
            text: "Is not a valid email address"
        }), Fancy.Mixin("Fancy.grid.mixin.Edit", {
            remove: function(a, b) {
                var c = this,
                    d = c.store,
                    e = "remove";
                if (!c.store) return void setTimeout(function() {
                    c.remove(a, b)
                }, 100);
                if (b && (e = "removeAt"), Fancy.isArray(a))
                    for (var f = 0, g = a.length; f < g; f++) d[e](a[f]);
                else d[e](a);
                c.setSidesHeight()
            },
            removeAt: function(a) {
                this.remove(a, !0)
            },
            removeRow: function(a) {
                this.remove(a, !0)
            },
            removeRowById: function(a) {
                this.remove(a)
            },
            removeRowByID: function(a) {
                this.remove(a)
            },
            removeAll: function() {
                var a = this;
                a.store.removeAll(), a.update(), a.scroller.update(), a.paging && a.paging.updateBar(), a.grouping && a.grouping.reGroup()
            },
            add: function(a) {
                var b = this;
                if (!b.store) return void setTimeout(function() {
                    b.add(a)
                }, 100);
                if (Fancy.isArray(a))
                    for (var c = 0, d = a.length; c < d; c++) b.add(a[c]);
                else b.store.add(a), b.setSidesHeight()
            },
            insert: function(a, b) {
                var c = this,
                    d = c.store;
                if (!c.store) return void setTimeout(function() {
                    c.insert(a, b)
                }, 100);
                if (Fancy.isArray(b)) {
                    for (var e = b.length - 1; - 1 !== e; e--) c.insert(b[e], a);
                    return void c.setSidesHeight()
                }
                if (Fancy.isArray(a)) {
                    for (var e = a.length - 1; - 1 !== e; e--) c.insert(a[e], 0);
                    return void c.setSidesHeight()
                }
                if (Fancy.isObject(a) && void 0 === b) b = a, a = 0;
                else if (Fancy.isObject(a) && Fancy.isNumber(b)) {
                    var f = b;
                    b = a, a = f
                }
                c.paging && "server" !== d.proxyType && (a += d.showPage * d.pageSize), d.insert(a, b), c.setSidesHeight()
            },
            set: function(a, b, c) {
                var d = this,
                    e = d.store;
                if (!d.store) return void setTimeout(function() {
                    d.set(a, b, c)
                }, 100);
                Fancy.isObject(b) && void 0 === c ? e.setItemData(a, b, c) : e.set(a, b, c)
            },
            setById: function(a, b, c) {
                var d = this,
                    e = d.store,
                    f = e.getRow(a);
                if (void 0 === f) {
                    if (void 0 === e.getById(a)) return !1;
                    f = -1
                }
                if (!d.store) return setTimeout(function() {
                    -1 === f ? d.setById(f, b, c) : d.set(f, b, c)
                }, 100), f;
                if (Fancy.isObject(b) && void 0 === c)
                    for (var g in b) {
                        var h = d.getColumnByIndex(g);
                        if (h && "date" === h.type) {
                            var i = h.format,
                                j = Fancy.Date.parse(b[g], i.read, i.mode),
                                k = Fancy.Date.parse(e.getById(a).get(g), i.edit, i.mode); + j == +k && delete b[g]
                        }
                        e.setItemData(f, b, c, a), -1 === f && e.getById(a).set(b)
                    } else e.set(f, b, c, a), -1 === f && e.getById(a).set(b, c);
                return f
            },
            undo: function() {
                var a = this,
                    b = a.store,
                    c = b.undoActions.splice(b.undoActions.length - 1, 1)[0];
                switch (c.type) {
                    case "edit":
                        a.setById(c.id, c.key, c.oldValue);
                        var d = c.value;
                        c.value = c.oldValue, c.oldValue = d, b.redoActions.push(c), a.fire("undo");
                        break;
                    case "insert":
                        b.undoStoppped = !0, a.remove(c.id), b.undoStoppped = !1, b.redoActions.push(c);
                        break;
                    case "remove":
                        b.undoStoppped = !0, a.insert(c.rowIndex, c.data), b.undoStoppped = !1, b.redoActions.push(c)
                }
            },
            redo: function() {
                var a = this,
                    b = a.store,
                    c = b.redoActions.splice(b.redoActions.length - 1, 1)[0];
                switch (b.redoing = !0, c.type) {
                    case "edit":
                        a.setById(c.id, c.key, c.oldValue);
                        break;
                    case "insert":
                        a.insert(c.rowIndex, c.data);
                        break;
                    case "remove":
                        a.remove(c.id)
                }
                delete b.redoing
            },
            undoAll: function() {
                for (var a = this, b = a.store, c = 0, d = b.undoActions.length; c < d; c++) a.undo()
            }
        }), Fancy.define(["Fancy.Grid", "FancyGrid"], {
            extend: Fancy.Widget,
            mixins: ["Fancy.grid.mixin.Grid", Fancy.panel.mixin.PrepareConfig, Fancy.panel.mixin.methods, "Fancy.grid.mixin.PrepareConfig", "Fancy.grid.mixin.ActionColumn", Fancy.grid.mixin.Edit],
            plugins: [{
                type: "grid.updater"
            }, {
                type: "grid.scroller"
            }, {
                type: "grid.licence"
            }],
            type: "grid",
            theme: "default",
            i18n: "en",
            emptyText: "",
            prefix: "fancy-grid-",
            cls: "",
            widgetCls: Fancy.GRID_CLS,
            header: !0,
            shadow: !0,
            striped: !0,
            columnLines: !0,
            rowLines: !0,
            textSelection: !1,
            width: 200,
            height: 200,
            minWidth: 200,
            minHeight: 200,
            minColumnWidth: 30,
            defaultColumnWidth: 100,
            emptyValue: "&nbsp;",
            frame: !0,
            draggable: !1,
            activated: !1,
            multiSort: !1,
            tabEdit: !0,
            dirtyEnabled: !0,
            barScrollEnabled: !0,
            startResizing: !1,
            constructor: function(a, b) {
                var c = this;
                Fancy.isDom(a) ? (b = b || {}, b.renderTo = a) : b = a, b = b || {};
                var d = function(a) {
                        a && Fancy.apply(b, a), b.id && (c.id = b.id), c.initId(), b = c.prepareConfig(b, c), Fancy.applyConfig(c, b), c.Super("const", arguments)
                    },
                    e = function() {
                        var a = b.i18n || c.i18n;
                        !0 === Fancy.loadLang(a, d) && d({})
                    };
                Fancy.modules.grid || Fancy.fullBuilt || !1 === Fancy.MODULELOAD || !1 === Fancy.MODULESLOAD ? e() : Fancy.nojQuery ? Fancy.loadModule("dom", function() {
                    Fancy.loadModule("grid", function() {
                        e()
                    })
                }) : Fancy.loadModule("grid", function() {
                    e()
                })
            },
            init: function() {
                var a = this;
                if (a.addEvents("beforerender", "afterrender", "render", "show", "hide", "destroy"), a.addEvents("headercellclick", "headercellmousemove", "headercellmousedown", "docmouseup", "docclick", "docmove", "beforeinit", "init", "columnresize", "columnclick", "columndblclick", "columnenter", "columnleave", "columnmousedown", "columntitlechange", "cellclick", "celldblclick", "cellenter", "cellleave", "cellmousedown", "beforecellmousedown", "rowclick", "rowdblclick", "rowenter", "rowleave", "rowtrackenter", "rowtrackleave", "columndrag", "columnhide", "columnshow", "scroll", "nativescroll", "remove", "insert", "set", "update", "beforesort", "sort", "beforeload", "load", "servererror", "serversuccess", "select", "selectrow", "deselectrow", "clearselect", "activate", "deactivate", "beforeedit", "startedit", "changepage", "changepagesize", "dropitems", "collapse", "expand", "lockcolumn", "rightlockcolumn", "unlockcolumn", "filter", "contextmenu", "statechange"), Fancy.loadStyle(), !0 !== Fancy.fullBuilt && !1 !== Fancy.MODULELOAD && !1 !== Fancy.MODULESLOAD && !0 !== a.fullBuilt && !0 !== a.neededModules && "datepicker" !== a.wtype && "monthpicker" !== a.wtype) return void a.loadModules();
                a.initStore(), a.initPlugins(), a.ons(), a.initDateColumn(), a.fire("beforerender"), a.preRender(), a.render(), a.initElements(), a.initActionColumnHandler(), a.fire("render"), a.fire("afterrender"), a.setSides(), a.setSidesHeight(), a.setColumnsPosition(), a.update(), a.initTextSelection(), a.initTouch(), a.fire("beforeinit"), setTimeout(function() {
                    a.inited = !0, a.fire("init"), a.setBodysHeight()
                }, 1)
            },
            loadModules: function() {
                var a = this,
                    b = {},
                    c = a.columns || [],
                    d = a.leftColumns || [],
                    e = a.rightColumns || [];
                Fancy.modules = Fancy.modules || {}, Fancy.nojQuery && (b.dom = !0), Fancy.isTouch && (b.touch = !0), a.summary && (b.summary = !0), a.exporter && (b.exporter = !0, b.excel = !0), a.paging && (b.paging = !0), (a.filter || a.searching) && (b.filter = !0), a.data && a.data.proxy && (b.edit = !0), a.clicksToEdit && (b.edit = !0), (a.stateful || a.state) && (b.state = !0), Fancy.isObject(a.data) && (a.data.proxy && (b["server-data"] = !0, Fancy.nojQuery && (b.ajax = !0)), a.data.chart && (b["chart-integration"] = !0)), a.expander && (b.expander = !0), a.isGroupedHeader && (b["grouped-header"] = !0), a.grouping && (b.grouping = !0), a.summary && (b.summary = !0), a.exporter && (b.exporter = !0, b.excel = !0), (a.trackOver || a.columnTrackOver || a.cellTrackOver || a.selection) && (b.selection = !0), a.contextmenu && (b.menu = !0);
                var f = function(a) {
                    if (a.menu) return b.menu = !0, !0
                };
                Fancy.each(a.events, function(a) {
                    for (var c in a) "contextmenu" === c && (b.menu = !0)
                }), Fancy.each(a.controls, function(a) {
                    "contextmenu" === a.event && (b.menu = !0)
                }), Fancy.each(a.tbar, f), Fancy.each(a.bbar, f), Fancy.each(a.buttons, f), Fancy.each(a.subTBar, f);
                var g = c.concat(d).concat(e);
                Fancy.each(g, function(c) {
                    switch (!0 === c.draggable && (b["column-drag"] = !0), !0 === c.sortable && (b.sort = !0), !0 === c.editable && (b.edit = !0), !0 === c.menu && (b.menu = !0), c.filter && (b.filter = !0), c.type) {
                        case "select":
                            a.checkboxRowSelection = !0, b.selection = !0;
                            break;
                        case "combo":
                            c.data && c.data.proxy && (b.ajax = !0);
                            break;
                        case "progressbar":
                        case "progressdonut":
                        case "grossloss":
                        case "hbar":
                            b.spark = !0;
                            break;
                        case "tree":
                            b.tree = !0;
                            break;
                        case "date":
                            b.date = !0, b.selection = !0
                    }
                }), Fancy.isArray(a.tbar) && Fancy.each(a.tbar, function(a) {
                    switch (a.action) {
                        case "add":
                        case "remove":
                            b.edit = !0
                    }
                }), a.gridToGrid && (b.dd = !0), a.rowDragDrop && (b.dd = !0), a.neededModules = {
                    length: 0
                };
                for (var h in b) void 0 === Fancy.modules[h] && (a.neededModules[h] = !0, a.neededModules.length++);
                if (0 === a.neededModules.length) return a.neededModules = !0, void a.init();
                var i = function(b) {
                    delete a.neededModules[b], 0 === --a.neededModules.length && (a.neededModules = !0, a.init())
                };
                if (a.neededModules.dom) Fancy.loadModule("dom", function(b) {
                    if (delete a.neededModules[b], 0 === --a.neededModules.length) a.neededModules = !0, a.init();
                    else
                        for (var c in a.neededModules) "length" !== c && Fancy.loadModule(c, i)
                });
                else
                    for (var h in a.neededModules) "length" !== h && Fancy.loadModule(h, i)
            },
            lockColumn: function(a, b) {
                var c = this;
                if (1 === c.columns.length) return !1;
                Fancy.isString(a) && Fancy.each(c.columns, function(b, c) {
                    if (b.index === a) return a = c, !0
                });
                var d = c.removeColumn(a, b);
                c.insertColumn(d, c.leftColumns.length, "left"), c.fire("lockcolumn", {
                    column: d
                })
            },
            rightLockColumn: function(a, b) {
                var c = this;
                if (1 === c.columns.length) return !1;
                Fancy.isString(a) && Fancy.each(c.columns, function(b, c) {
                    if (b.index === a) return a = c, !0
                });
                var d = c.removeColumn(a, b);
                c.insertColumn(d, 0, "right"), c.fire("rightlockcolumn", {
                    column: d
                })
            },
            unLockColumn: function(a, b) {
                var c, d = this;
                switch (void 0 === b && (Fancy.isString(a) ? (Fancy.each(d.leftColumns, function(c, d) {
                    if (c.index === a) return b = "left", a = d, !0
                }), void 0 === b && Fancy.each(d.rightColumns, function(c, d) {
                    if (c.index === a) return b = "right", a = d, !0
                })) : b = "left"), b) {
                    case "left":
                        Fancy.isString(a) && Fancy.each(d.leftColumns, function(b, c) {
                            if (b.index === a) return a = c, !0
                        }), c = d.removeColumn(a, b), d.insertColumn(c, 0, "center", "left"), 0 === d.leftColumns.length && (d.leftEl.addCls(Fancy.GRID_LEFT_EMPTY_CLS), d.centerEl.css("left", "0px"));
                        break;
                    case "right":
                        if (Fancy.isString(a) && Fancy.each(d.rightColumns, function(b, c) {
                                if (b.index === a) return a = c, !0
                            }), c = d.removeColumn(a, b), d.insertColumn(c, d.columns.length, "center", "right"), 0 === d.rightColumns.length) {
                            d.rightEl.addCls(Fancy.GRID_RIGHT_EMPTY_CLS);
                            var e = parseInt(d.body.el.css("width"));
                            d.body.el.css("width", e + 2)
                        }
                }
                "left" === b && d.grouping && 0 === d.leftColumns.length && d.grouping.insertGroupEls(), d.fire("unlockcolumn", {
                    column: c
                })
            },
            moveColumn: function(a, b, c, d, e) {
                var f, g = this;
                if (e) {
                    for (var h = 0, i = e.end - e.start + 1, j = e.cell.attr("index"), k = g.getHeader(b), l = e.cell.dom.outerHTML; h < i; h++) g.moveColumn(a, b, e.end - h, d);
                    var m = g.getColumns(b),
                        n = k.el.select("." + Fancy.GRID_HEADER_CELL_CLS);
                    for (h = d, i = h + (e.end - e.start + 1); h < i; h++) {
                        var o = m[h],
                            p = n.item(h);
                        o.grouping = j, p.attr("group-index", j)
                    }
                    return k.el.append(l), void k.fixGroupHeaderSizing()
                }
                if ("center" === a) switch (f = g.removeColumn(c, "center"), b) {
                    case "left":
                        g.insertColumn(f, d, "left", "center");
                        break;
                    case "right":
                        g.insertColumn(f, d, "right", "center")
                } else if ("left" === a) switch (f = g.removeColumn(c, "left"), b) {
                    case "center":
                        g.insertColumn(f, d, "center", "left");
                        break;
                    case "right":
                        g.insertColumn(f, d, "right", "left")
                } else if ("right" === a) switch (f = g.removeColumn(c, "right"), b) {
                    case "center":
                        g.insertColumn(f, d, "center", "right");
                        break;
                    case "left":
                        g.insertColumn(f, d, "left", "right")
                }
                g.groupheader && (g.header.fixGroupHeaderSizing(), g.leftColumns && g.leftHeader.fixGroupHeaderSizing(), g.rightColumns && g.rightHeader.fixGroupHeaderSizing()), g.getHeader(a).reSetCheckBoxes(), g.getHeader(b).reSetCheckBoxes()
            },
            updateColumnsVisibilty: function() {
                var a = this;
                a.columns && (a.header && a.header.updateCellsVisibility(), a.body.updateColumnsVisibility()), a.leftColumns && (a.leftHeader && a.leftHeader.updateCellsVisibility(), a.leftBody.updateColumnsVisibility()), a.rightColumns && (a.rightHeader && a.rightHeader.updateCellsVisibility(), a.rightBody.updateColumnsVisibility())
            }
        }), FancyGrid.get = function(a) {
            var b = Fancy.get(a);
            if (b.dom) {
                var c = b.select("." + Fancy.GRID_CLS).item(0);
                if (c.dom) {
                    var d = c.dom.id;
                    return Fancy.getWidget(d)
                }
            }
        }, FancyGrid.defineTheme = Fancy.defineTheme, FancyGrid.defineController = Fancy.defineController, FancyGrid.addValid = Fancy.addValid, !Fancy.nojQuery && Fancy.$ && (Fancy.$.fn.FancyGrid = function(a) {
            return this.selector ? a.renderTo = $(this.selector)[0].id : a.renderTo = this.attr("id"), new Fancy.Grid(a)
        }),
        function() {
            var a = Fancy,
                b = 500,
                c = a.TOOLTIP_CLS,
                d = a.TOOLTIP_INNER_CLS;
            a.define("Fancy.grid.plugin.CellTip", {
                extend: a.Plugin,
                ptype: "grid.celltip",
                inWidgetName: "celltip",
                cellTip: "{value}",
                stopped: !0,
                constructor: function(a) {
                    this.Super("const", arguments)
                },
                init: function() {
                    this.Super("init", arguments), this.ons()
                },
                ons: function() {
                    var b = this,
                        c = b.widget,
                        d = a.get(document);
                    c.on("cellenter", b.onCellEnter, b), c.on("cellleave", b.onCellLeave, b), d.on("touchend", b.onTouchEnd, b), d.on("mousemove", b.onDocMove, b)
                },
                onCellEnter: function(b, c) {
                    var d = this,
                        e = c.column,
                        f = d.cellTip,
                        g = c.e;
                    if (e.cellTip) {
                        if (a.isString(e.cellTip)) f = e.cellTip;
                        else if (a.isFunction(e.cellTip) && !1 === (f = e.cellTip(c))) return;
                        var h = new a.Template(f),
                            i = {
                                title: e.title,
                                value: c.value,
                                columnIndex: 0,
                                rowIndex: 0
                            };
                        d.stopped = !1, a.apply(i, c.data), a.tip.update(h.getHTML(i)), a.tip.show(g.pageX + 15, g.pageY - 25)
                    }
                },
                onCellLeave: function(c, d) {
                    this.stopped = !0, a.tip.hide(b)
                },
                onTouchEnd: function(c, d) {
                    this.stopped = !0, a.tip.hide(b)
                },
                onDocMove: function(e) {
                    if (!0 !== this.stopped) {
                        var f = this,
                            g = f.widget;
                        if ("none" === g.el.css("display") || g.panel && g.panel.el && "none" === g.panel.el.css("display")) return f.stopped = !0, void a.tip.hide(b);
                        var h = a.get(e.target);
                        return "body" === h.prop("tagName").toLocaleLowerCase() ? (f.stopped = !0, void a.tip.hide(b)) : h.hasClass(c) || h.hasClass(d) || !1 !== g.el.within(h) ? void a.tip.show(e.pageX + 15, e.pageY - 25) : (f.stopped = !0, void a.tip.hide(b))
                    }
                }
            })
        }(),
        function() {
            var a = Fancy,
                b = a.TOOLTIP_CLS,
                c = a.TOOLTIP_INNER_CLS;
            a.define("Fancy.ToolTip", {
                extend: a.Widget,
                constructor: function(a) {
                    this.Super("const", arguments)
                },
                init: function() {
                    this.initTpl(), this.render(), this.ons()
                },
                tpl: ['<div class="' + c + '">{text}</div>'],
                widgetCls: b,
                cls: "",
                extraCls: "",
                render: function() {
                    var b = this,
                        c = a.get(b.renderTo || document.body).dom,
                        d = a.get(document.createElement("div"));
                    d.addCls(a.cls, b.widgetCls, b.cls, b.extraCls), d.update(b.tpl.getHTML({
                        text: b.text
                    })), b.el = a.get(c.appendChild(d.dom))
                },
                show: function(a, b) {
                    var c = this;
                    c.timeout && (clearInterval(c.timeout), delete c.timeout), "none" === c.css("display") && c.css({
                        display: "block"
                    }), c.css({
                        left: a,
                        top: b
                    })
                },
                hide: function(a) {
                    var b = this;
                    b.timeout && (clearInterval(b.timeout), delete b.timeout), a ? b.timeout = setTimeout(function() {
                        b.el.hide()
                    }, a) : b.el.hide()
                },
                destroy: function() {
                    this.el.destroy()
                },
                update: function(a) {
                    this.el.select("." + c).update(a)
                },
                ons: function() {
                    var a = this;
                    a.el.on("mouseenter", a.onMouseEnter, a)
                },
                onMouseEnter: function(a) {
                    this.hide(500)
                }
            }), a.tip = {
                update: function(b) {
                    a.tip = new a.ToolTip({
                        text: b
                    })
                },
                show: function(b, c) {
                    a.tip = new a.ToolTip({
                        text: " "
                    }), a.tip.show(b, c)
                },
                hide: function() {
                    a.tip = new a.ToolTip({
                        text: " "
                    })
                }
            }
        }(), Fancy.enableCompo = function() {
            function a() {
                if (0 !== e)
                    for (var a in f) {
                        var c, g, h = f[a],
                            i = d.querySelectorAll(a),
                            j = h.appPreSelector ? h.appPreSelector + "-" : "data-",
                            k = h.preSelector ? h.preSelector + "-" : "fancy-",
                            l = 0,
                            m = i.length;
                        if (0 === i.length) return;
                        for (; l < m; l++) {
                            var n = {},
                                o = i[l],
                                p = o.id || "rand-id-" + +new Date,
                                q = o.attributes;
                            for (c = 0, g = q.length; c < g; c++) {
                                var r = q[c],
                                    s = r.name,
                                    t = r.value;
                                new RegExp(j).test(s) && (t = b(t), n[s.replace(j, "")] = t)
                            }! function() {
                                var a = o.getElementsByTagName("*");
                                for (c = 0, g = a.length; c < g; c++) {
                                    var d, e, f = a[c],
                                        h = f.tagName.toLowerCase();
                                    new RegExp(k).test(h) && (d = h.replace(k, ""), e = b(f.innerHTML), n[d.replace(j, "")] = e)
                                }
                            }(), o.outerHTML = '<div id="' + p + '"></div>', h.init(d.getElementById(p), n)
                        }
                    }
            }

            function b(a) {
                return /\[/.test(a) || /\{/.test(a) ? (a = a.replace(/\n/g, ""), a = new Function("return " + a + ";")()) : a = isNaN(Number(a)) ? a.replace(/\n/g, "") : Number(a), a
            }
            var c, d = document,
                e = 0,
                f = {};
            Fancy.Component = function(a, b) {
                e++, f[a] = b
            }, Fancy.stopWatch = function() {
                clearInterval(c)
            }, a(), d.addEventListener("DOMContentLoaded", function() {
                a()
            }), setTimeout(function() {
                a()
            }, 1), c = setInterval(function() {
                a()
            }, 250), Fancy.Component("fancy-grid", {
                preSelector: "fancy",
                attrPreSelector: "data",
                init: function(a, b) {
                    b.renderTo = a, window[a.id] = new FancyGrid(b)
                }
            }), Fancy.Component("fancy-form", {
                preSelector: "fancy",
                attrPreSelector: "data",
                init: function(a, b) {
                    b.renderTo = a, window[a.id] = new FancyForm(b)
                }
            }), Fancy.Component("fancy-tab", {
                preSelector: "fancy",
                attrPreSelector: "data",
                init: function(a, b) {
                    b.renderTo = a, window[a.id] = new FancyTab(b)
                }
            })
        }, Fancy
});