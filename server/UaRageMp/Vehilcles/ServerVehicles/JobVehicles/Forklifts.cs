using GTANetworkAPI;

namespace UAGTA.Vehilcles.ServerVehicles.JobVehicles
{
    class Forkilifts : Script
    {
        private static JobVehicleManager forklifts = new JobVehicleManager();

        [ServerEvent(Event.ResourceStart)]
        public void SpawRentScooters()
        {
            Vector3[] positions = new Vector3[]{
                new Vector3(-392.56165,-2756.0024,6.0003824),
                new Vector3(-395.45663,-2756.0312,6.0003858),
                new Vector3(-398.1869,-2756.0503,6.0003858),
                new Vector3(-400.8291,-2756.07,6.0003858),
                new Vector3(-403.60223,-2756.0906,6.0003858),
                new Vector3(-406.50137,-2756.0325,6.0002193),
                new Vector3(-408.69254,-2755.9932,6.0003834),
                new Vector3(-410.84897,-2755.8972,6.0003858),
                new Vector3(-412.9725,-2755.9866,6.0003877),
                new Vector3(-414.95395,-2755.9102,6.0003877)
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
                new Vector3(0, 0, 60)
            };
            forklifts.SpawRentVehicles(VehicleHash.Forklift, positions, rotations, 0, 0);
        }
        [ServerEvent(Event.PlayerEnterVehicle)]
        public void PlayerSeatInForklift(Player player, Vehicle vehicle, sbyte seatID)
        {
            forklifts.PlayerSeatInVehicle(player, vehicle, seatID);
        }
        [ServerEvent(Event.PlayerDeath)]
        public void PlayerDeath(Player player, Player killer, uint reason)
        {
            forklifts.PlayerDeath(player, killer, reason);
        }
        [ServerEvent(Event.PlayerDisconnected)]
        public void PlayerQuit(Player player, DisconnectionType type, string reason)
        {
            forklifts.PlayerQuit(player, type, reason);
        }
        [ServerEvent(Event.VehicleDeath)]
        public void ScooterDestroy(Vehicle vehicle)
        {
            forklifts.VehicleDestroyed(vehicle);
        }
    }
}
