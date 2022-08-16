using GTANetworkAPI;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace UAGTA.Vehilcles.ServerVehicles
{
    abstract class VehiclesPoint
    {
        protected List<Vehicle> vehicles = new List<Vehicle>();
        protected Vector3[] positions;
        protected Vector3[] rotations;

        public void SpawRentVehicles(VehicleHash model, Vector3[] vehiclesPositions, Vector3[] vehiclesRotations, int color1, int color2)
        {
            this.positions = vehiclesPositions;
            this.rotations = vehiclesRotations;
            var vehiclesPositionsAndRotations = positions.Zip(rotations, (position, rotation) => new { Position = position, Rotation = rotation });
            Task.Run(async () =>
            {
                foreach (var vehicleData in vehiclesPositionsAndRotations)
                {
                    await Task.Delay(200);
                    NAPI.Task.Run(() =>
                    {
                        Vehicle rentVehicle = NAPI.Vehicle.CreateVehicle(model, vehicleData.Position, vehicleData.Rotation, color1, color2);
                        vehicles.Add(rentVehicle);
                        rentVehicle.SetExternalData<Vector3>(0, rentVehicle.Rotation);
                        rentVehicle.SetExternalData<Vector3>(1, rentVehicle.Position);
                    });
                }
            });
        }
    }
}
