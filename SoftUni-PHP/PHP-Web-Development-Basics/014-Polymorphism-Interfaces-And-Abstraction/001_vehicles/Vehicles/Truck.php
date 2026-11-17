<?php

namespace Vehicles;

class Truck extends VehicleAbstract
{
    public const FUEL_MODIFIER = 1.6;
    protected const REFUEL_RATIO = 0.95;

    public function __construct(float $fuelQuantity, float $fuelConsumption, float $tankCap)
    {
        parent::__construct($fuelQuantity, $fuelConsumption, self::FUEL_MODIFIER, $tankCap);
    }
}
