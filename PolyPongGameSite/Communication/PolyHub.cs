using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace PolyPongGameSite.Communication
{
    public class PolyHub : Hub
    {
        public async Task Player1_Left(int idParty)
        {
            await Clients.All.SendAsync("Player1_Left", idParty);
        }

        public async Task Player1_Right(int idParty)
        {
            await Clients.All.SendAsync("Player1_Right", idParty);
        }

        public async Task Player2_Left(int idParty)
        {
            await Clients.All.SendAsync("Player2_Left", idParty);
        }

        public async Task Player2_Right(int idParty)
        {
            await Clients.All.SendAsync("Player2_Right", idParty);
        }

        public async Task Player1_StopMoving(int idParty)
        {
            await Clients.All.SendAsync("Player1_StopMoving", idParty);
        }

        public async Task Player2_StopMoving(int idParty)
        {
            await Clients.All.SendAsync("Player2_StopMoving",idParty);
        }

        public async Task EndGame(int p1Id, int p2Id, int p1Score, int p2Score, int idParty)
        {
            //Enregistrer le résultat en base pour chacun des joueurs
        }
    }
}