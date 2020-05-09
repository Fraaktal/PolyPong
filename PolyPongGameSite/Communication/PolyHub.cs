using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace PolyPongGameSite.Communication
{
    public class PolyHub : Hub
    {
        public async Task Player_Left(int idPlayer, int idParty)
        {
            await Clients.All.SendAsync("Player_Left", idPlayer, idParty);
        }

        public async Task Player_Right(int idPlayer, int idParty)
        {
            await Clients.All.SendAsync("Player_Right", idPlayer, idParty);
        }

        public async Task Player_StopMoving(int idPlayer, int idParty)
        {
            await Clients.All.SendAsync("Player_StopMoving", idParty);
        }

        public async Task EndGame(int p1Id, int p2Id, int p1Score, int p2Score, int idParty)
        {
            //Enregistrer le résultat en base pour chacun des joueurs
        }
    }
}