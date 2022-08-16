using GTANetworkAPI;

namespace UAGTA.Vehilcles.ServerVehicles.RentPoints
{
    class RentVehicleManager : ServerVehicleManager
    {
        private int _rentPrice;
        public RentVehicleManager(int rentTime, int rentPrice)
        {
            RemoteEvents.rentTime = rentTime;
            this._rentPrice = rentPrice;
        }
        override public void PlayerDeath(Player player, Player killer, uint reason)
        {
            Vehicle vehicle = player.GetData<Vehicle>("RentedVehicle");
            if (!(vehicle is null))
            {
                NAPI.Task.Run(() =>
                {
                    if (!player.Dead)
                    {
                        SetVehicleOnDefaultPosition(vehicle, "RentedVehicle", "RentedBy");
                    }
                }, 600000);
            }
        }
        override public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            Vehicle vehicle = player.GetData<Vehicle>("RentedVehicle");
            if (!(vehicle is null))
            {
                int intDisconnectType = (int)type;
                if (intDisconnectType.Equals(0))

                {
                    NAPI.Task.Run(() =>
                    {
                        if (!player.Exists)
                        {
                            SetVehicleOnDefaultPosition(vehicle, "RentedVehicle", "RentedBy");
                        }
                    }, 600000);
                }
            }
        }
        override public void VehicleDestroyed(Vehicle vehicle)
        {
            if (!(vehicle.GetData<Player>("RentedBy") is null))
            {
                Player player = vehicle.GetData<Player>("RentedBy");
                SetVehicleOnDefaultPosition(vehicle, "RentedVehicle", "RentedBy");
            }
        }
        override public void PlayerSeatInVehicle(Player player, Vehicle vehicle, sbyte seatID)
        {
            if (!(player.GetData<Vehicle>("RentedVehicle") is null))
            {
                Player rentedBy = vehicle.GetData<Player>("RentedBy");
                Vehicle rentedVehicle = player.GetData<Vehicle>("RentedVehicle");
                if (this.vehicles.Contains(vehicle) && rentedVehicle != vehicle)
                {
                    player.TriggerEvent("sendErrorAlert", "Ви не можете орeндувати більше одного транспорту");
                    player.WarpOutOfVehicle();
                }
                else if (rentedBy != player)
                {
                    player.TriggerEvent("sendErrorAlert", "Цей транспорт вже хтось орендує");
                    player.WarpOutOfVehicle();
                }
            }
            else if (this.vehicles.Contains(vehicle) && seatID.Equals((sbyte)VehicleSeat.Driver))
            {
                string rentVehicleName = vehicle.DisplayName;
                player.TriggerEvent("activateVehicleRentMenue", true, $"Ви бажаєте орендувати {rentVehicleName} за {this._rentPrice}$ ?", rentVehicleName);
            }
        }
    }
}
