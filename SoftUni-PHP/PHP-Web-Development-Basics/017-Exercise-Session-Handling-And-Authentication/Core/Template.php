<?php

namespace Core;

class Template implements TemplateInterface
{
    public const TEMPLATE_FOLDER = __DIR__ . "/../App/Views/";
    public const TEMPLATE_EXTENSION = ".php";

    public function render(string $templateName, $data = null)
    {
        require self::TEMPLATE_FOLDER
            . $templateName
            . self::TEMPLATE_EXTENSION;
    }
}
