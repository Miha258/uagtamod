using GTANetworkAPI;
using System.Collections.Generic;
using System;

namespace UAGTA.Jobs
{
    class JobManager : Script
    {
        static public void SetJobClothe(Player player, Dictionary<int, int[]> clothes)
        {
            foreach (var keyClothe in clothes) {
                player.SetClothes(keyClothe.Key, keyClothe.Value[0], keyClothe.Value[1]);
                player.SetExternalData<int>(keyClothe.Key, keyClothe.Value[0]);
            }
        }
        static public void RemoveJobClothe(Player player)
        {
            Console.WriteLine(player.GetAllData().GetEnumerator().Current);
        }
    }
}
