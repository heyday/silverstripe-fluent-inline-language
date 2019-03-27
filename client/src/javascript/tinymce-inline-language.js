( function() {

    tinymce.create( 'tinymce.plugins.tinymce_inline_language', {
        /**
         * @param {tinymce.Editor} editor Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function( editor, url ) {
        	
        	// Skip if no locales defined
			var config = this.getConfig();
			if (typeof config.locales === 'undefined' || config.locales.length === 0) {
				return;
			}

			// get current locale
			var currentLocale = this.getCookie('FluentLocale_CMS');

	        // add buttons
			var self = this;
			config.locales.forEach(function(locale) {
				if (locale.code != currentLocale) {
		            editor.addButton( 'tinymce-inline-language-' + locale.code, {
		            	text: locale.title,
		                title: editor.getLang( 'tinymce_inline_language.tooltip', 'Set language for current selection' ),
		                onclick: function() { self.setInlineLanguage(editor, locale.code) }
		            });
				}
			});
			
        },
        
		setInlineLanguage: function(editor, code) {
			// check if text is selected
			if (typeof editor.selection != 'undefined') {
				var textSelection = editor.selection.getContent();
				if (textSelection.length > 0) {
					
					// Skip if no locales defined
					var config = this.getConfig();
					if (typeof config.locales === 'undefined' || config.locales.length === 0) {
						return;
					}
					
					// get values for selected language
					var selectedLocale = false;
					config.locales.forEach(function(locale) {
						if (locale.code == code) {
							selectedLocale = locale;
						}
					});
					if (!selectedLocale) return;
					
					// get current direction and locale
					var currentDir = editor.directionality;
					
					// get directionality attribute
					var directionality = '';
					if (selectedLocale.dir != currentDir) {
						directionality = ' dir="' + selectedLocale.dir + '"';
					}

					// get parent node of current selection
					var node = editor.selection.getNode();
					if (node && node.getAttribute('lang')) {
						// if parent node has lang attribute, remove the node and replace with inner text
						var inner = node.innerHTML;
						editor.dom.remove(node);
						editor.selection.setContent(inner);
					} else {
						// remove any spans with lang attributes in the selected text
						textSelection = textSelection.replace(/<span[^>]*lang=\".+\"[^>]*>([\s\S]*?)<\/span>/, '$1');
						// add new surrounding span
						editor.selection.setContent('<span lang="' + selectedLocale.code + '" data-language="' + selectedLocale.title + '"' + directionality + '>' + textSelection + '</span>');
					}
				}
				
			}
        	
        },

        getConfig: function() {
			var section = 'SilverStripe\\Admin\\LeftAndMain';
			if (window
				&& window.ss
			    && window.ss.config
			    && window.ss.config.sections
			) {
				var config = window.ss.config.sections.find(function (next) {
					return next.name === section;
				});
			    if (config) {
			    	return config.inlinelanguages || {};
			    }
			}
			return {};
        },
        
        getCookie: function(name) {
    	    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    	    return v ? v[2] : null;
    	}

    } );

    // Register plugin
    tinymce.PluginManager.add( 'tinymce_inline_language_plugin', tinymce.plugins.tinymce_inline_language );
} )();
