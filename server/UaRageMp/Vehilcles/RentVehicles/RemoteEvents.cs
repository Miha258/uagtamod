using GTANetworkAPI;
using System;

namespace UAGTA.Vehilcles.RentVehicles
{
    class RemoteEvents: Script
    {
        [RemoteEvent("playerClickedRentButton")]
        public void PlayerClickedRentButton(Player player, bool isAccepted, Vehicle rentedVehicle, int rentTime)
        {
            if (player.Vehicle is null)
            {
                player.SendChatMessage("Ви повинні бути в транспорті");
            }
            else if (isAccepted)
            {
                Console.WriteLine(rentTime);
                rentedVehicle.EngineStatus = true;
                player.SetData<Vehicle>("RentedVehicle", rentedVehicle);
                rentedVehicle.SetData<Player>("RentedBy", player);
                NAPI.Task.Run(() =>
                {
                    player.WarpOutOfVehicle();
                    SetRentedVehicleOnDefaultPosition(player, rentedVehicle);
                }, rentTime);
            }
            else if (!isAccepted)
            {
                rentedVehicle.EngineStatus = false;
                player.WarpOutOfVehicle();
            }
            player.TriggerEvent("activateVehicleRentMenue", false);
        }
        public static void SetRentedVehicleOnDefaultPosition(Player player, Vehicle vehicle)
        {
            Vehicle rentedVehicle = player.GetData<Vehicle>("RentedVehicle");
            if (!(rentedVehicle is null))
            {
                rentedVehicle.Rotation = vehicle.GetData<Vector3>("DefaultPosition");
                rentedVehicle.Position = vehicle.GetData<Vector3>("DefaultRotation");
                rentedVehicle.EngineStatus = false;
                rentedVehicle.Repair();

                rentedVehicle.SetData<Player>("RentedBy", null);
                player.SetData<Vehicle>("RentedVehicle", null);
            }
        }

    }
}
