using GTANetworkAPI;
using System.Threading.Tasks;

namespace UAGTA.Vehilcles.RentVehicles
{
    class RentVehicleManager: RentPoint
    {
        public RentVehicleManager(int _rentTime): base(_rentTime) { }

        public void PlayerDeath(Player player, Player killer, uint reason)
        {
            Vehicle vehicle = player.GetData<Vehicle>("RentedVehicle");
            if (!(vehicle is null))
            {
                NAPI.Task.Run(() =>
                {
                    if (!player.Dead)
                    {
                        RemoteEvents.SetRentedVehicleOnDefaultPosition(player, vehicle);
                    }
                }, 5000); //60000
            }
        }
        public void PlayerQuit(Player player, DisconnectionType type, string reason)
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
                            RemoteEvents.SetRentedVehicleOnDefaultPosition(player, vehicle);
                        }
                    }, 600000);
                }
            }
        }
        public void RentVehicleDestroyed(Vehicle vehicle)
        {
            if (vehicle.HasData("RentedBy"))
            {
                Player player = vehicle.GetData<Player>("RentedBy");
                RemoteEvents.SetRentedVehicleOnDefaultPosition(player, vehicle);
            }
        }
    }
}
