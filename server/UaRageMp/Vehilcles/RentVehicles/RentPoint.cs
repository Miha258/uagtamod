using GTANetworkAPI;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace UAGTA.Vehilcles.RentVehicles
{
    abstract class RentPoint
    {
        private List<int> vehicles = new List<int>();
        private int _rentTime; //Miliseconds
        
        public RentPoint(int _rentTime) {
            this._rentTime = _rentTime;
        }

        public void SpawRentVehicles(VehicleHash model, Vector3[] positions, Vector3[] rotations, int color1, int color2)
        {   
            var vehiclesPositionsAndRotations = positions.Zip(rotations, (position, rotation) => new { Position = position, Rotation = rotation });
            Task.Run(async () =>
            {
                foreach (var vehicleData in vehiclesPositionsAndRotations)
                {
                    await Task.Delay(200);
                    NAPI.Task.Run(() =>
                    {
                        Vehicle rentVehicle = NAPI.Vehicle.CreateVehicle(model, vehicleData.Position, vehicleData.Rotation, color1, color2);
                        rentVehicle.SetData<Vector3>("DefaultPosition", vehicleData.Position);
                        rentVehicle.SetData<Vector3>("DefaultRotation", vehicleData.Rotation);
                        this.vehicles.Add(rentVehicle.HashCode);
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
                if (this.vehicles.Contains(vehicle.HashCode) && rentedVehicle != vehicle)
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
            else if (this.vehicles.Contains(vehicle.HashCode) && seatID.Equals((sbyte)VehicleSeat.Driver))
            {
                string rentVehicleName = vehicle.DisplayName;
                Console.WriteLine(this._rentTime);
                player.TriggerEvent("activateVehicleRentMenue", true, $"Ви бажаєте орендувати {rentVehicleName} за {rentPrice}$ ?", rentVehicleName, this._rentTime);
            }
        }
    }
}
