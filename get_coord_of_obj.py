from raspberry_config import IBeaconParams


def calculate_distance(rssi: float, beacon_params: IBeaconParams) -> float:
    """
    Calculate the estimated distance from RSSI values based on the iBeacon parameters.

    Parameters:
        rssi (float): The received signal strength indicator.
        beacon_params (IBeaconParams): The iBeacon environmental parameters.

    Returns:
        float: Estimated distance.

    Raises:
        ValueError: If any input is not of the expected type or range.
    """
    if not isinstance(rssi, (int, float)):
        raise ValueError("RSSI must be a number (int or float).")

    if not isinstance(beacon_params, IBeaconParams):
        raise ValueError("beacon_params must be an instance of IBeaconParams.")

    if beacon_params.n <= 0:
        raise ValueError("Environmental factor 'n' must be greater than zero.")

    try:
        # Calculate distance using the RSSI value and iBeacon parameters.
        # Ref: https://iotandelectronics.wordpress.com/2016/10/07/how-to-calculate-distance-from-the-rssi-value-of-the-ble-beacon/
        distance = 10 ** ((beacon_params.tx_power - rssi) / (10 * beacon_params.n))
    except Exception as e:
        # Catch any other unforeseen exceptions and raise as ValueError.
        raise ValueError(f"Error calculating distance: {str(e)}")

    return distance
