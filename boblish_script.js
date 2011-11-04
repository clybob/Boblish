var Boblish = {
    
    styles: [
    "background",
    "background-clip",
    "background-origin",
    "background-size",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-collapse",
    "border-top-left-radius",
    "border-top-right-radius",
    "bottom",
    "box-shadow",
    "box-sizing",
    "caption-side",
    "clear",
    "clip",
    "color",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "float",
    "font",
    "height",
    "image-rendering",
    "left",
    "letter-spacing",
    "line-height",
    "list-style",
    "margin",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "opacity",
    "orphans",
    "outline",
    "overflow-x",
    "overflow-y",
    "padding",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "pointer-events",
    "position",
    "resize",
    "right",
    "speak",
    "table-layout",
    "text-align",
    "text-decoration",
    "text-indent",
    "text-rendering",
    "text-shadow",
    "text-overflow",
    "text-transform",
    "top",
    "unicode-bidi",
    "vertical-align",
    "visibility",
    "white-space",
    "widows",
    "width",
    "word-break",
    "word-spacing",
    "word-wrap",
    "z-index",
    "zoom",
    "clip-path",
    "clip-rule",
    "mask",
    "filter",
    "flood-color",
    "flood-opacity",
    "lighting-color",
    "stop-color",
    "stop-opacity",
    "color-interpolation",
    "color-interpolation-filters",
    "color-rendering",
    "fill",
    "fill-opacity",
    "fill-rule",
    "marker-end",
    "marker-mid",
    "marker-start",
    "shape-rendering",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "alignment-baseline",
    "baseline-shift",
    "dominant-baseline",
    "kerning",
    "text-anchor",
    "writing-mode",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "vector-effect"
    ],
    
    stylesCompressed: {
        'background': [
                        "background-color",
                        "background-image",
                        "background-repeat",
                        "background-attachment",
                        "background-position"
                      ],
        'border-top': [
                         "border-top-width",
                         "border-top-style",
                         "border-top-color"
                      ],
        'border-right': [
                          "border-right-width",
                          "border-right-style",
                          "border-right-color"
                       ],
        'border-bottom': [
                           "border-bottom-width",
                           "border-bottom-style",
                           "border-bottom-color"
                        ],
        'border-left': [
                        "border-left-width",
                        "border-left-style",
                        "border-left-color"
                       ],
        'font': [
                    "font-style",
                    "font-variant",
                    "font-weight",
                    "font-size",
                    "font-family"
                ],
        'list-style': [
                        "list-style-type",
                        "list-style-position",
                        "list-style-image"
                      ],
        'margin': [
                    "margin-top",
                    "margin-right",
                    "margin-bottom",
                    "margin-left"
                  ],
        'outline': [
                    "outline-color",
                    "outline-style",
                    "outline-width"
                   ],
        'padding': [
                    "padding-top",
                    "padding-right",
                    "padding-bottom",
                    "padding-left"
                   ]
    },
    
    nodesInformation: [],

    inspectNode: function( node ) {
        this.getNodeInformation(node);

        for( var child=0, len=node.children.length; child!==len; child++) {
            this.inspectNode(node.children[child]);
        }
    },

    getNodeInformation: function( node ){
        return this.nodesInformation.push({
            "nodeName": node.nodeName,
            "nodeId": node.id,
            "nodeClasses": node.className,
            "nodeStyles": this.getNodeStyles(node)
        });
    },
    
    getNodeStyles: function( nodeInspected ) {
        var nodeStyles = [];
        var styleValue = "";
        var styleProperty = "";
        var node = window.getComputedStyle(nodeInspected);
        
        for( var i=0, len=this.styles.length; i!==len; i++) {
            styleProperty = this.styles[i];
            styleValue = node.getPropertyValue( styleProperty ) || this.getCompressedValue( nodeInspected, styleProperty );
            nodeStyles.push( styleProperty + ": " + styleValue );
        }

        return nodeStyles;
    },
    
    getCompressedValue: function( nodeInspected, property ) {
        var fullStyle = this.stylesCompressed[property];
        
        if( !fullStyle ) {
            return undefined;
        }
        
        var styleValue = [];
        var node = window.getComputedStyle(nodeInspected);
        
        for( var i=0, len=fullStyle.length; i!==len; i++) {
            styleValue.push( node.getPropertyValue( fullStyle[i] ) );
        }
        
        return styleValue.join(' ');
    },

    init: function( selector ) {
        var node = document.querySelector(selector);
        this.inspectNode( node );
        var result = window.JSON.stringify(this.nodesInformation);
        
        return result;
    }

};