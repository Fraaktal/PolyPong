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

        public void AskForGame(int idUser)
        {
            GameManager.GetInstance().GetExistingGameOrCreateIt(Context.ConnectionId, idUser);
        }

        public async Task PlayerConnectedToGame(string playerId, string GameId, bool isP2)
        {
            await Clients.Clients(playerId).SendAsync("CurrentPlayerConnected", playerId, GameId, isP2);
        }
        
        public async Task StartGame(string player1Id, string player2Id)
        {
            await Clients.Clients(player1Id, player2Id).SendAsync("StartGame");
        }
        
        public async Task Player1_Left(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player1_Left");
        }

        public async Task Player1_Right(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player1_Right");
        }

        public async Task Player1_StopMoving(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player1_StopMoving");
        }

        public async Task Player2_Left(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player2_Left");
        }

        public async Task Player2_Right(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player2_Right");
        }
        
        public async Task Player2_StopMoving(string player1ConnectionId, string player2ConnectionId)
        {
            await Clients.Clients(player1ConnectionId, player2ConnectionId).SendAsync("Player2_StopMoving");
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