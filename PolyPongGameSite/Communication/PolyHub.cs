using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PolyPongGameSite.Business;
using PolyPongGameSite.Controller;
using PolyPongGameSite.Manager;

namespace PolyPongGameSite.Communication
{
    public class PolyHub : Hub
    {
        //Partie Jeu

        public async Task AskForGame(string idUserS)
        {
            GameManager.GetInstance().GetExistingGameOrCreateIt(Context.ConnectionId, idUserS);
        }

        public async Task PlayerConnectedToGame(string playerId, string GameId, bool isP2)
        {
            await Clients.Clients(playerId).SendAsync("CurrentPlayerConnected", playerId, GameId, isP2);
        }
        
        public async Task StartGame(string player1Id, string player2Id)
        {
            await Clients.Clients(player1Id, player2Id).SendAsync("StartGame");
        }
        
        public async Task Player_Left(string player1ConnectionId, string player2ConnectionId, bool isP1)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player_Left", isP1);
        }

        public async Task Player_Right(string player1ConnectionId, string player2ConnectionId, bool isP1)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player_Right", isP1);
        }

        public async Task Player_StopMoving(string player1ConnectionId, string player2ConnectionId, bool isP1)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player_StopMoving", isP1);
        }

        public async Task EndGame(int p1Score, int p2Score, string idParty)
        {
            await Clients.Clients(idParty).SendAsync("EndGame", p1Score, p2Score);
        }

        //Partie App

        public async Task AskForLog(string log, string pass)
        {
            //TODO encrypt

            string sender = Context.ConnectionId;

            bool isLogOk = CUserController.GetInstance().TryLogUser(log,pass);

            await Clients.Clients(sender).SendAsync("Connexion", isLogOk);
        }
    }
}