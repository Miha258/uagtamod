using GTANetworkAPI;

namespace UAGTA.Vehilcles.ServerVehicles
{
    abstract class ServerVehicleManager: VehiclesPoint
    {
        public static void SetVehicleOnDefaultPosition(Vehicle vehicle, string playerData, string vehicleData)
        {
  
            Player driver = NAPI.Vehicle.GetVehicleDriver(vehicle.Handle) as Player;
            if (!(driver is null))
            {
                driver.WarpOutOfVehicle();
                driver.SetData<Vehicle>(playerData, null);
            }
            vehicle.Rotation = vehicle.GetExternalData<Vector3>(0);
            vehicle.Position = vehicle.GetExternalData<Vector3>(1);
            vehicle.EngineStatus = false;
            vehicle.Repair();
            vehicle.ResetData();
            vehicle.SetData<Player>(vehicleData, null);
        }
        virtual public void PlayerDeath(Player player, Player killer, uint reason)
        {
           
        }
        virtual public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            
        }
        virtual public void VehicleDestroyed(Vehicle vehicle)
        {
            
        }
        virtual public void PlayerSeatInVehicle(Player player, Vehicle vehicle, sbyte seatID)
        {

        }
    }
}
