<?php

namespace Vehicles;

abstract class VehicleAbstract implements VehicleInterface
{
    // share of the poured fuel that stays in the tank
    protected const REFUEL_RATIO = 1.0;

    private float $fuelQuantity;
    private float $fuelConsumption;
    private float $airConditionerConsumption;
    private float $tankCap;

    public function __construct(float $fuelQuantity, float $fuelConsumption, float $airConditionerConsumption, float $tankCap)
    {
        $this->fuelQuantity = $fuelQuantity <= $tankCap ? $fuelQuantity : 0;
        $this->fuelConsumption = $fuelConsumption;
        $this->airConditionerConsumption = $airConditionerConsumption;
        $this->tankCap = $tankCap;
    }

    public function drive(float $distance): string
    {
        return $this->travel($distance, $this->fuelConsumption + $this->airConditionerConsumption);
    }

    public function driveempty(float $distance): string
    {
        return $this->travel($distance, $this->fuelConsumption);
    }

    private function travel(float $distance, float $litresPerKm): string
    {
        $needed = $distance * $litresPerKm;
        if ($needed > $this->fuelQuantity) {
            return "{$this->name()} needs refueling";
        }

        $this->fuelQuantity -= $needed;
        return "{$this->name()} travelled $distance km";
    }

    public function refuel(float $litres): void
    {
        if ($litres <= 0) {
            throw new \InvalidArgumentException("Fuel must be a positive number");
        }
        if ($this->fuelQuantity + $litres > $this->tankCap) {
            throw new \InvalidArgumentException("Cannot fit $litres fuel in the tank");
        }

        $this->fuelQuantity += $litres * static::REFUEL_RATIO;
    }

    private function name(): string
    {
        return (new \ReflectionClass($this))->getShortName();
    }

    public function __toString(): string
    {
        return $this->name() . ": " . number_format($this->fuelQuantity, 2, '.', '');
    }
}
