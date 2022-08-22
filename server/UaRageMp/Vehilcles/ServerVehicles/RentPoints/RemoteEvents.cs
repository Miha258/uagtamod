using GTANetworkAPI;


namespace UAGTA.Vehilcles.ServerVehicles.RentPoints
{
    class RemoteEvents: Script
    {
        static public int rentTime;

        [RemoteEvent("playerClickedRentButton")]
        public void PlayerClickedRentButton(Player player, bool isAccepted, Vehicle rentedVehicle)
        {
            if (player.Vehicle is null)
            {
                player.TriggerEvent("sendErrorAlert", "Ви повинні бути в транспорті");
            }
            else if (isAccepted)
            {
                rentedVehicle.EngineStatus = true;
                player.SetData<Vehicle>("RentedVehicle", rentedVehicle);
                rentedVehicle.SetData<Player>("RentedBy", player);
                player.TriggerEvent("sendDoneAlert", "Ви орендували транспортний засіб");
                NAPI.Task.Run(() =>
                {   
                    if (!(player.GetData<Vehicle>("RentedVehicle") is null) && !(rentedVehicle.GetData<Player>("RentedBy") is null))
                    {
                        player.TriggerEvent("sendWarningAlert", "Час оренди підходить до кінця.Залишилася: 1 xв");
                        NAPI.Task.Run(() =>
                        {
                            player.TriggerEvent("sendWarningAlert", "Час оренди вийшов");
                            ServerVehicleManager.SetVehicleOnDefaultPosition(rentedVehicle, "RentedVehicle", "RentedBy");
                        }, 60000);
                    }
                }, rentTime);
                            
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
