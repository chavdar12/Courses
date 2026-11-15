<?php

namespace Core;

class Template implements TemplateInterface
{
    const TEMPLATE_FOLDER = __DIR__ . "/../App/Views/";
    const TEMPLATE_EXTENSION = ".php";

    public function render(string $templateName, $data = null)
    {
        require self::TEMPLATE_FOLDER
            . $templateName
            . self::TEMPLATE_EXTENSION;
    }
}
