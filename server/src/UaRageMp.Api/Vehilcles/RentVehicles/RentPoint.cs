using GTANetworkAPI;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;


namespace UAGTA.Vehilcles.RentVehicles
{
    class RentPoint
    {
        protected Dictionary<int, Vector3[]> vehicles = new Dictionary<int, Vector3[]>();

        public void SpawRentVehicles(VehicleHash model, Vector3[] positions, Vector3[] rotations, int color1, int color2)
        {   
            var vehiclesPositionsAndRotations = positions.Zip(rotations, (position, rotation) => new { Position = position, Rotation = rotation });
            Task.Run(async () =>
            {

                foreach (var pr in vehiclesPositionsAndRotations)
                {
                    await Task.Delay(200);
                    NAPI.Task.Run(() =>
                    {
                        Vehicle rentVehicle = NAPI.Vehicle.CreateVehicle(model, pr.Position, pr.Rotation, color1, color2);
                        this.vehicles.Add(rentVehicle.HashCode, new Vector3[2] { pr.Position, pr.Rotation });
                    });
                }
            });
        }
        public void PlayerSeatInRentedVehicle(Player player, Vehicle vehicle, sbyte seatID, short rentPrice)
        {
            if (player.HasData("RentedVehicle"))
            {
                Player rentedBy = vehicle.GetData<Player>("RentedBy");
                Vehicle rentedVehicle = player.GetData<Vehicle>("RentedVehicle");
                if (this.vehicles.ContainsKey(vehicle.HashCode) && rentedVehicle != vehicle)
                {
                    player.SendChatMessage("Ви не можете орeндувати більше одного транспорту");
                    player.WarpOutOfVehicle();
                }
                else if (rentedBy != player)
                {
                    player.SendChatMessage("Цей транспорт вже хтось орендує");
                    player.WarpOutOfVehicle();
                }
            }
            else if (this.vehicles.ContainsKey(vehicle.HashCode) && seatID.Equals((sbyte)VehicleSeat.Driver))
            {
                string rentVehicleName = vehicle.DisplayName;
                player.TriggerEvent("activateVehicleRentMenue", true, $"Ви бажаєте орендувати {rentVehicleName} за {rentPrice}$ ?", rentVehicleName);
            }
        }
    }
}
