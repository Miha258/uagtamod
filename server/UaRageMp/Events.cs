using GTANetworkAPI;

namespace UaRageMp.Core
{
    public class Events: Script
    {
        [ServerEvent(Event.PlayerConnected)]
        public void PlayerConnected(Player player)
        {
            player.SendChatMessage("welcome ~g~bro");
        }

        [ServerEvent(Event.PlayerSpawn)]
        public void PlayerSpawned(Player player)
        {
            player.Health = 77;
            player.Armor = 77;

            player.PlayAnimation("amb@code_human_wander_smoking@male@base", "static", 0);

           // var q = JsonConvert.SerializeObject(player);

            NAPI.Util.ConsoleOutput("~p~Hello World");
            //NAPI.Util.ConsoleOutput(q);

        }

        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStartMain()
        {
            NAPI.Util.ConsoleOutput("~p~Hello World");
        }
    }
}
