<?php

use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use TractorCow\Fluent\Model\Locale;

$path = ModuleLoader::getModule('innoweb/silverstripe-fluent-inline-language')
    ->getResource('client/dist/javascript/tinymce-inline-language.js');

$config = TinyMCEConfig::get('cms');

// enable plugin
$config->enablePlugins([
    'tinymce_inline_language_plugin' => $path
]);

// add buttons
$locales = Locale::getCached()->toArray();
if ($locales && count($locales)) {
    $config->addButtonsToLine(1, '|');
    foreach ($locales as $locale) {
        $config->addButtonsToLine(1, 'tinymce-inline-language-' . $locale->Locale);
    }
    $config->addButtonsToLine(1, '|');
}

// allow dir and lang attributes for span tag
$config->setOption(
    'extended_valid_elements',
    $config->getOption('extended_valid_elements') . ',-span[class|align|style|dir|lang]'
);
