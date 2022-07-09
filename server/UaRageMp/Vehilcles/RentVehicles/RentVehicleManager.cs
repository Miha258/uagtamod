using GTANetworkAPI;


namespace UAGTA.Vehilcles.RentVehicles
{
    class RentVehicleManager: RentPoint
    {
        [RemoteEvent("playerClickedRentButton")]
        public void PlayerClickedRentButton(Player player, bool isAccepted, Vehicle rentedVehicle)
        {
 
            if (player.Vehicle is null)
            {
                player.SendChatMessage("Ви повинні бути в транспорті");
            }
            else if (isAccepted)
            {
                rentedVehicle.EngineStatus = true;
                player.SetData<Vehicle>("RentedVehicle", rentedVehicle);
                rentedVehicle.SetData<Player>("RentedBy", player);
                NAPI.Task.Run(() =>
                {
                    this._SetRentedVehicleOnDefaultPosition(player);
                }, 300000);
            }
            else if (!isAccepted)
            {
                rentedVehicle.EngineStatus = false;
                player.WarpOutOfVehicle();
            }
            player.TriggerEvent("activateVehicleRentMenue", false);
        }
        private void _SetRentedVehicleOnDefaultPosition(Player player)
        {
            Vehicle rentedVehicle = player.GetData<Vehicle>("RentedVehicle");
            if (!(rentedVehicle is null))
            {
                int rentedVehicleHash = rentedVehicle.HashCode;
                this.vehicles.TryGetValue(rentedVehicleHash, out Vector3[] scooterRotationAndPosition);
                rentedVehicle.Rotation = scooterRotationAndPosition[1];
                rentedVehicle.Position = new Vector3(scooterRotationAndPosition[0].X, scooterRotationAndPosition[0].Y, scooterRotationAndPosition[0].Z - 0.05);
                rentedVehicle.EngineStatus = false;
                rentedVehicle.Repair();
                rentedVehicle.SetData<Player>("RentedBy", null);
                player.SetData<Vehicle>("RentedVehicle", null);
            }
        }
        public void PlayerDeath(Player player, Player killer, uint reason)
        {
            NAPI.Task.Run(() =>
            {
                if (!player.Dead) 
                { 
                    this._SetRentedVehicleOnDefaultPosition(player);
                }
            }, 300000);
        }
        public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            int intType = (int)type;
            if (intType.Equals(0))
            {
                NAPI.Task.Run(() =>
                {
                    if (!player.Exists)
                    {
                        this._SetRentedVehicleOnDefaultPosition(player);
                    }
                }, 600000);
            } 
        }
        public void RentVehicleDestroyed(Vehicle vehicle)
        {
            if (vehicle.HasData("RentedBy"))
            {
                Player player = vehicle.GetData<Player>("RentedBy");
                this._SetRentedVehicleOnDefaultPosition(player);
            }
        }
    }
}
