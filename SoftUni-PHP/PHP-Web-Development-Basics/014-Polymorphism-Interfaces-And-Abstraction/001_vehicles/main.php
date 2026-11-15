<?php
// load Namespace\ClassName from Namespace/ClassName.php next to this file
spl_autoload_register(function (string $class) {
    $file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_file($file)) {
        require $file;
    }
});

$factory = new Factories\VehicleFactory();
$vehicles = [];
for ($i = 0; $i < 3; $i++) {
    [$type, $fuel, $consumption, $tankCap] = explode(' ', readline());
    $vehicles[$type] = $factory->create($type, $fuel, $consumption, $tankCap);
}

$commandsCount = intval(readline());
for ($i = 0; $i < $commandsCount; $i++) {
    [$command, $type, $value] = explode(' ', readline());
    $vehicle = $vehicles[$type];

    try {
        switch ($command) {
            case 'Drive':
                echo $vehicle->drive($value) . PHP_EOL;
                break;
            case 'DriveEmpty':
                echo $vehicle->driveempty($value) . PHP_EOL;
                break;
            case 'Refuel':
                $vehicle->refuel($value);
                break;
        }
    } catch (InvalidArgumentException $e) {
        echo $e->getMessage() . PHP_EOL;
    }
}

echo implode(PHP_EOL, $vehicles);
