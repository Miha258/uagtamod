using GTANetworkAPI;

namespace UAGTA.Vehilcles.RentVehicles
{
    class RemoteEvents: Script
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
            }
            else if (!isAccepted)
            {
                rentedVehicle.EngineStatus = false;
                player.WarpOutOfVehicle();
            }
            player.TriggerEvent("activateVehicleRentMenue", false);
        }
    }
}
