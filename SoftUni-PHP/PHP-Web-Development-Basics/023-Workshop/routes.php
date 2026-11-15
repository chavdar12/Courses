<?php
/** @var \Routing\RouterInterface $router */

$router->registerRoute(
    'profile\/(\d+)\/edit',
    'GET',
    function ($matches) {
        (new \Controller\ProfileController())->editProfile($matches[1][0]);
    });

$router->registerRoute(
    'profile\/(\d+)\/edit',
    'POST',
    function ($matches) {
        (new \Controller\ProfileController())->editProfileProcess($matches[1][0]);
    });
