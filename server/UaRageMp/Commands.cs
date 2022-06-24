using GTANetworkAPI;

namespace RageMp.Vh
{
    public class Commands: Script
    {
        [Command("veh", "spawn new car", Alias = "vehicle")]
        public void CreateNewVehicle(Player player, string carName, int color1, int color2)
        {
            var hash = NAPI.Util.GetHashKey(carName);

            if (hash <= 0)
                player.SendChatMessage("~r~not found");
            else
            {
                var car = NAPI.Vehicle.CreateVehicle(hash, player.Position, player.Heading, color1, color2);

                car.NumberPlate = "VH CAR";

                player.Health = 77;
                player.Armor = 77;

                player.SetIntoVehicle(car, (int)VehicleSeat.Driver);
            }
            
        }
    }
}
