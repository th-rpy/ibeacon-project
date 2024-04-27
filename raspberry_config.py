from dataclasses import dataclass


# Units are in meters;

@dataclass
class Coords:
    """
    Data class to store the coordinates of objects.

    Attributes:
        x_axis (float): The x-coordinate.
        y_axis (float): The y-coordinate.
    """
    x_axis: float
    y_axis: float


@dataclass
class IBeaconParams:
    """
    Data class to store iBeacon parameters used for distance calculations.

    Attributes:
        n (float): Environmental factor which affects signal propagation and attenuation.
        tx_power (int): Transmit power of the iBeacon at one-meter distance.
    """
    n: float
    tx_power: int


IBEACON_PARAMS = IBeaconParams(
    n=2.5,
    tx_power=-59
)

# Coord. Raspberry 1
R1_CONFIG = Coords(
    x_axis=1.5,
    y_axis=1.5
)

# Coord. Raspberry 2
R2_CONFIG = Coords(
    x_axis=-1.5,
    y_axis=-1.5
)

# Coord. Raspberry 3
R3_CONFIG = Coords(
    x_axis=-1.5,
    y_axis=1.5
)
