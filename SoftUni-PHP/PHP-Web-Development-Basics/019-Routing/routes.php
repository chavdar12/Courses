<?php

/** @var \Routing\RouterInterface $router */

$router->registerRoute('users\/register', 'GET', function () {
    (new \Controller\UsersController())->register();
});

$router->registerRoute('users\/login', 'GET', function () {
    (new \Controller\UsersController())->login();
});

$router->registerRoute('users\/profile', 'GET', function () {
    (new \Controller\UsersController())->profile();
});

$router->registerRoute('profile\/(\d+)\/edit', 'GET', function ($matches) {
    (new \Controller\UsersController())->editProfile($matches[1][0]);
});

$router->registerRoute('profile\/(\d+)\/edit', 'POST', function ($matches) {
    (new \Controller\UsersController())->editProfileProcess($matches[1][0]);
});

$router->registerRoute('questions\/ask', 'GET', function () {
    (new \Controller\QuestionsController())->ask();
});

$router->registerRoute('questions\/answer', 'GET', function () {
    (new \Controller\QuestionsController())->answer();
});

$router->registerRoute('answers\/(\d+)', 'GET', function ($matches) {
    (new \Controller\AnswersController())->get($matches[1][0]);
});
