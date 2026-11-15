<?php
// load ClassName from ClassName.php next to this file
spl_autoload_register(function (string $class) {
    $file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_file($file)) {
        require $file;
    }
});

class Main
{
    public function run()
    {
        $this->readData();
    }

    public function readData()
    {
        $name = readline();
        $age = intval(readline());

        $citizen = new Citizen($name, $age);
        echo $citizen;
    }
}

$main = new Main();
$main->run();