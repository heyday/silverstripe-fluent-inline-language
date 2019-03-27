# SilverStripe TinyMCE inline language plugin

[![Version](http://img.shields.io/packagist/v/innoweb/silverstripe-fluent-inline-language.svg?style=flat-square)](https://packagist.org/packages/innoweb/silverstripe-fluent-inline-language)
[![License](http://img.shields.io/packagist/l/innoweb/silverstripe-fluent-inline-language.svg?style=flat-square)](license.md)

## Overview

This module allows inline language change for Accessibility in CMS WYSIWYG editor. 

## Requirements

* SilverStripe CMS 4.x
* Fluent 4.x

If you are using RTL (right-to-left) languages, please consider installing the [Fluent RTL module](https://packagist.org/packages/innoweb/silverstripe-fluent-rtl-support).

## Installation

Install the module using composer:
```
composer require innoweb/silverstripe-fluent-inline-language dev-master
```

Then run dev/build.

## Functionality

The module adds buttons to the editor to change the language of the selected text to one of the configured Fluent locales and wraps the selected text in a span:

```
<span lang="en_AU" data-language="English">selected text</span>
```

If the target language has a different writing direction than the current one, it also adds the `dir="ltr|rtl"` attribute to the span.

The `data-language` attribute is used to highlight and display the changed language in the editor.

## Configuration

If you are using a custom editor css for TinyMCE, please merge the existing editor css files with your current one as below. Otherwise the css file applied by the module will not be loaded.

```
TinyMCEConfig::get('cms')->setContentCSS(
    array_merge(
        TinyMCEConfig::get('cms')->getContentCSS(),
        [ModuleResourceLoader::resourceURL(
            ThemeResourceLoader::inst()->findThemedResource('path/to/your/editor.css')
        )]
    )
);
```

## License

BSD 3-Clause License, see [License](license.md)
