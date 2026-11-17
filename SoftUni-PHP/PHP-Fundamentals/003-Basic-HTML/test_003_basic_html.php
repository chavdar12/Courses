<?php

// Checks every page in this lesson: it parses as HTML5, has a title, and every local src/href exists.
// Usage: php test_003_basic_html.php (needs PHP 8.4+ for Dom\HTMLDocument)

$pages = array_merge(glob(__DIR__ . '/[0-9][0-9][0-9]_*.html'), glob(__DIR__ . '/[0-9][0-9][0-9]_*/index.html'));
$failed = 0;

foreach ($pages as $page) {
    $name = substr($page, strlen(__DIR__) + 1);
    $problems = [];
    $document = Dom\HTMLDocument::createFromFile($page, LIBXML_NOERROR);

    if (trim($document->title) === '') {
        $problems[] = 'missing <title>';
    }
    foreach ($document->querySelectorAll('[src], [href]') as $element) {
        $link = $element->getAttribute('src') ?? $element->getAttribute('href');
        if (preg_match('~^([a-z]+:|//|#)~i', $link)) {
            continue; // external or in-page links are not files
        }
        if (!file_exists(dirname($page) . '/' . parse_url($link, PHP_URL_PATH))) {
            $problems[] = "broken link: $link";
        }
    }

    echo ($problems ? 'FAIL' : 'ok  ') . " $name" . PHP_EOL;
    foreach ($problems as $problem) {
        echo "  $problem" . PHP_EOL;
    }
    $failed += $problems ? 1 : 0;
}

echo PHP_EOL . count($pages) . " pages, $failed failed" . PHP_EOL;
exit($failed === 0 && $pages ? 0 : 1);
