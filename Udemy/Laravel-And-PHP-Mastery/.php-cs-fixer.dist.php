<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__)
    ->exclude(['vendor', 'node_modules', 'storage', 'bootstrap/cache'])
    ->notName('*.blade.php');

return (new PhpCsFixer\Config())
    ->setRules(['@PER-CS' => true])
    ->setFinder($finder);
