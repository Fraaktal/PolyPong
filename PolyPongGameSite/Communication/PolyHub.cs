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

        public async Task AskForGame()
        {
            GameManager.GetInstance().GetExistingGameOrCreateIt(Context.ConnectionId);
        }

        public async Task ConnectAndDisplayWaitingConnexionScreen(string playerId, string GameId, string uniqueIdToDisplay, bool isP2)
        {
            await Clients.Clients(playerId).SendAsync("ConnectAndDisplayWaitingConnexionScreen", playerId, GameId, uniqueIdToDisplay, isP2);
        }
        
        public async Task StartGame(string player1Id, string player2Id)
        {
            await Clients.Clients(player1Id, player2Id).SendAsync("StartGame");
        }
        
        public async Task Player_Up(string gameId, int idUser)
        {
            Game game = GameManager.GetInstance().GetGameById(gameId);
            if (game != null)
            {
                await Clients.Clients(game.Player1ConnectionId, game.Player2ConnectionId)
                    .SendAsync("Player_Up", game.IsIdP1Id(idUser));
            }
        }

        public async Task Player_Down(string gameId, int idUser)
        {
            Game game = GameManager.GetInstance().GetGameById(gameId);
            if (game != null)
            {
                await Clients.Clients(game.Player1ConnectionId, game.Player2ConnectionId)
                    .SendAsync("Player_Down", game.IsIdP1Id(idUser));
            }

        }

        public async Task Player_StopMoving_Down(string gameId, int idUser)
        {
            Game game = GameManager.GetInstance().GetGameById(gameId);
            if (game != null)
            {
                await Clients.Clients(game.Player1ConnectionId, game.Player2ConnectionId)
                    .SendAsync("Player_StopMoving_Down", game.IsIdP1Id(idUser));
            }
        }
        
        public async Task Player_StopMoving_Up(string gameId, int idUser)
        {
            Game game = GameManager.GetInstance().GetGameById(gameId);
            if (game != null)
            {
                await Clients.Clients(game.Player1ConnectionId, game.Player2ConnectionId)
                    .SendAsync("Player_StopMoving_Up", game.IsIdP1Id(idUser));
            }
        }

        public async Task EndGame(int p1Score, int p2Score, string idParty)
        {
            await Clients.Clients(idParty).SendAsync("EndGame", p1Score, p2Score);
        }

        //Partie App

        public async Task User_Try_Log_From_App(string log, string pass, string uniqueIdConnection)
        {
            //TODO encrypt
            bool res = false;
            string sender = Context.ConnectionId;
            string gameId = "";

            bool isLogOk = CUserController.GetInstance().TryLogUser(log,pass, out int id);

            if (isLogOk)
            {
                res = GameManager.GetInstance().FindGameWithPlayerIdIfExist(id, uniqueIdConnection, out string connectionId, out gameId);

                if (res)
                {
                    await Clients.Clients(connectionId).SendAsync("AppConnected");
                }
            }


            await Clients.Clients(sender).SendAsync("PlayerConnected", isLogOk && res, gameId, id);
        }
    }
}