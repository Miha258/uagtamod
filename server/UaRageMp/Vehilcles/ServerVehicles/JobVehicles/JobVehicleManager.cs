using GTANetworkAPI;

namespace UAGTA.Vehilcles.ServerVehicles.JobVehicles
{
    class JobVehicleManager : ServerVehicleManager
    {
        override public void PlayerDeath(Player player, Player killer, uint reason)
        {
            Vehicle vehicle = player.GetData<Vehicle>("JobVehicle");
            if (!(vehicle is null))
            {
                NAPI.Task.Run(() =>
                {
                    if (!player.Dead)
                    {
                        Jobs.RemoteEvents.EndJob(player);
                    }
                }, 60000);
            }
        }
        override public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            Vehicle vehicle = player.GetData<Vehicle>("JobVehicle");
            if (!(vehicle is null))
            {
                int intDisconnectType = (int)type;
                if (intDisconnectType.Equals(0))
                {
                    Jobs.RemoteEvents.EndJob(player);
                }
            }
        }
        override public void VehicleDestroyed(Vehicle vehicle)
        {
            if (!(vehicle.GetExternalData<Vector3>(1) is null))
            {
                Player driver = NAPI.Vehicle.GetVehicleDriver(vehicle.Handle) as Player;
                Jobs.JobManager.RemoveJobClothe(driver);
                Jobs.RemoteEvents.EndJob(driver);
            }
        }
        override public void PlayerSeatInVehicle(Player player, Vehicle vehicle, sbyte seatID)
        {
            if (!player.GetData<bool>("StartedJob")) {
                player.TriggerEvent("sendErrorAlert", "Ви не почали роботу");
                player.WarpOutOfVehicle();
            }
            else {
                Vehicle jobVehicle = player.GetData<Vehicle>("JobVehicle");
                if (this.vehicles.Contains(jobVehicle) && jobVehicle != vehicle)
                {
                    player.TriggerEvent("sendErrorAlert", "Ви вже обрали робочий транспорт");
                    player.WarpOutOfVehicle();
                }

                else if (this.vehicles.Contains(vehicle) && seatID.Equals((sbyte)VehicleSeat.Driver) && player.GetData<Vehicle>("JobVehicle") is null)
                {
                    player.TriggerEvent("sendDoneAlert", "Ви обрали робочий транспорт");
                    player.SetData<Vehicle>("JobVehicle", vehicle);
                }
            }
        }
        public void PlayerExitFromVehicle(Player player)
        {
            if (player.GetData<bool>("StartedJob"))
            {
                NAPI.Task.Run(() =>
                {
                    Vehicle jobVehicle = player.GetData<Vehicle>("JobVehicle");
                    if ((jobVehicle is null || player.Vehicle != jobVehicle))
                    {
                        Jobs.RemoteEvents.EndJob(player);
                    }
                }, 300000);
            }
        }
    }
}
