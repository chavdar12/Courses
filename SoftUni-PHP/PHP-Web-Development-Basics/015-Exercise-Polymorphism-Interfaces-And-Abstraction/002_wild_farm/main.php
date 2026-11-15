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
    public const INPUT_END_COMMAND = "End";

    public function run()
    {
        $this->readData();
    }

    public function readData()
    {
        $input = readline();

        while ($input !== self::INPUT_END_COMMAND) {
            $animalData = explode(" ", $input);
            $animal = AnimalFactory::create($animalData);
            $foodData = explode(" ", readline());
            $foodType = $foodData[0];
            $foodQty = intval($foodData[1]);
            $food = FoodFactory::create($foodType, $foodQty);

            $animal->makeSound();
            try {
                $animal->eat($food);
            } catch (Exception $e) {
                echo $e->getMessage() . PHP_EOL;
            }
            echo $animal . PHP_EOL;
            $input = readline();
        }

    }
}

$main = new Main();
$main->run();
