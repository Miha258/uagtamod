using GTANetworkAPI;

namespace UAGTA.Vehilcles.RentVehicles
{
    class Scooters: Script
    {
        private static RentVehicleManager scooters = new RentVehicleManager(300000);

        [ServerEvent(Event.ResourceStart)]
        public void SpawRentScooters()
        {
            Vector3[] positions = new Vector3[]{
                new Vector3(-1015.802, -2687.7576, 13.989204),
                new Vector3(-1014.7729, -2686.0876, 13.98893),
                new Vector3(-1013.8407, -2684.4902, 13.987699),
                new Vector3(-1012.90784, -2682.8591, 13.9853945),
                new Vector3(-1011.013, -2679.4111, 13.982077),
                new Vector3(-1011.9617, -2681.1428, 13.9831085),
                new Vector3(-1009.85223, -2677.41, 13.98207),
                new Vector3(-1009.0242, -2675.9746, 13.454687),
                new Vector3(-1008.13324, -2674.3457, 13.982828),
                new Vector3(-1010.802, -2690.9617, 13.989204),
                new Vector3(-1009.7729, -2689.0876, 13.98893),
                new Vector3(-1008.8407, -2687.4902, 13.987699),
                new Vector3(-1007.90784, -2685.8591, 13.9853945),
                new Vector3(-1006.95496, -2684.157, 13.9853945),
                new Vector3(-1005.98413, -2682.4023, 13.458046),
                new Vector3(-1004.89215, -2680.4075, 13.45763),
                new Vector3(-1004.12415, -2678.9753, 13.457595),
                new Vector3(-1003.2166, -2677.3218, 13.4579315)
            };
            Vector3[] rotations = new Vector3[] {
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60),
                new Vector3(0, 0, 60)
            };
            scooters.SpawRentVehicles(VehicleHash.Faggio3, positions, rotations, 0, 0);
        }
        [ServerEvent(Event.PlayerEnterVehicle)]
        public void PlayerSeatInRentedScooter(Player player, Vehicle vehicle, sbyte seatID)
        {
            scooters.PlayerSeatInRentedVehicle(player, vehicle, seatID, 200);
        }
        [ServerEvent(Event.PlayerDeath)]
        public void PlayerDeath(Player player, Player killer, uint reason)
        {
            scooters.PlayerDeath(player, killer, reason);
        }
        [ServerEvent(Event.PlayerDisconnected)]
        public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            scooters.PlayerQuit(player, type, reason);
        }
        [ServerEvent(Event.VehicleDeath)]
        public void ScooterDestroy(Vehicle vehicle)
        {
            scooters.RentVehicleDestroyed(vehicle);
        }
    } 
}
