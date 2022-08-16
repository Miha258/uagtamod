using GTANetworkAPI;
using System;
using System.Collections.Generic;
using UAGTA.Vehilcles.ServerVehicles;

namespace UAGTA.Jobs
{
    class RemoteEvents : Script
    {
        [RemoteEvent("StartJob")]
        public void StartJob(Player player)
        {
            var maleVariables = new int[2][] {
                new int[] { 6, 41, 181, 36, 51},
                new int[] { 0, 42, 181, 9, 51},
            };
            var femaleVariables = new int[2][] {
                new int[] { 0, 27, 219, 35, 52},
                new int[] { 0, 86, 219, 45, 52},
            };

            Random randClothes = new Random();
            Dictionary<int, int[]> clotheDict = new Dictionary<int, int[]>();

            if (player.Model == 1885233650)
            {
                int[] clothe = maleVariables[randClothes.Next(maleVariables.Length)];

                clotheDict.Add(3, new int[] { clothe[0], 0});
                clotheDict.Add(11, new int[] { clothe[1], 0 });
                clotheDict.Add(8, new int[] { clothe[2], 0 });
                clotheDict.Add(4, new int[] { clothe[3], clothe[3] == 9 ? randClothes.Next(maleVariables.Length) + 3 : 0});
                clotheDict.Add(6, new int[] { clothe[4], 0 });
            }
            else
            {
                int[] clothe = femaleVariables[randClothes.Next(maleVariables.Length)];
                
                clotheDict.Add(3, new int[] { clothe[0], 0 });
                clotheDict.Add(11, new int[] { clothe[1], 0 });
                clotheDict.Add(8, new int[] { clothe[2], 0 });
                clotheDict.Add(4, new int[] { clothe[3], clothe[3] == 45 ? randClothes.Next(maleVariables.Length) + 1 : 0 });
                clotheDict.Add(6, new int[] { clothe[4], 0 });
            }
            player.SetData<bool>("StartedJob", true);
            JobManager.SetJobClothe(player, clotheDict);
            player.TriggerEvent("sendDoneAlert", "Ви почали роботу.Тепер сядьте за навантажувач");
        }
        [RemoteEvent("EndJob")]
        public static void EndJob(Player player)
        {
            Vehicle jobVehicle = player.GetData<Vehicle>("JobVehicle");
            ServerVehicleManager.SetVehicleOnDefaultPosition(jobVehicle, "JobVehicle", "");
            player.SetData<bool>("StartedJob", false);
            player.TriggerEvent("sendDoneAlert", "Ви закінчили роботу");
        }
    }
}
