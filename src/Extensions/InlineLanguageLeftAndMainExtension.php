<?php

namespace Innoweb\FluentInlineLanguage\Extensions;

use SilverStripe\Admin\LeftAndMainExtension;
use TractorCow\Fluent\Model\Locale;
use SilverStripe\i18n\i18n;

class InlineLanguageLeftAndMainExtension extends LeftAndMainExtension
{

    public function updateClientConfig(&$config)
    {
        $config = array_merge($config, [
            'inlinelanguages' => [
                'locales' => array_map(function (Locale $locale) {
                    return [
                        'code' => $locale->getLocale(),
                        'title' => $locale->getNativeName(),
                        'dir' => i18n::get_script_direction($locale->getLocale())
                    ];
                }, Locale::getCached()->toArray()),
            ]
        ]);
    }
}
