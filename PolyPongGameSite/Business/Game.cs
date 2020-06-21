using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using PolyPongGameSite.Controller;

namespace PolyPongGameSite.Business
{
    public class Game
    {
        public Game(string connectionIdP1, int idP1)
        {
            GameConnection = new HubConnectionBuilder().WithUrl("http://vps805844.ovh.net:50322/GameHub").Build();
#if DEBUG
            GameConnection = new HubConnectionBuilder().WithUrl("http://localhost:50322/GameHub").Build();
#endif
            Player1ConnectionId = connectionIdP1;
            Player1Id = idP1;

            Connect();

            ListenControllerEvent();


            GameConnection.InvokeAsync("PlayerConnectedToGame", Player1ConnectionId, GameId, false);
        }

        public string GameId
        {
            get { return GameConnection?.ConnectionId; }
        }

        private async void Connect()
        {
            try
            {
                await GameConnection.StartAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        private void ListenControllerEvent()
        {
            GameConnection.On<int, int>("EndGame", RegisterScore);
        }

        private void RegisterScore(int p1Score, int p2Score)
        {
            //TODO demander a marine de passer en param du site l'id de luser
            //TODO de mon coté il faudra récup cet id coté serveur et attendre que l'user se co avec son tel des deux coté avant de lancer la partie
            //TODO coté client on affichera un écran demandant de se connecter avec le tel s'il est pas connecté, pusi un ecran d'attente si l'autre est pas co
            //TODO puis le jeu.
            CUserController.GetInstance().RegisterScore(p1Score, p2Score);
        }

        public HubConnection GameConnection { get; set; }
        
        public string Player1ConnectionId { get; set; }

        public string Player2ConnectionId { get; set; }

        public int Player1Id { get; set; }

        public int Player2Id { get; set; }

        public int Player1Score { get; set; }

        public int Player2Score { get; set; }

        public void JoinPlayer(string idCP2, int idP2)
        {
            Player2ConnectionId = idCP2;
            Player2Id = idP2;

            GameConnection.InvokeAsync("PlayerConnectedToGame", Player2ConnectionId, GameId, true);
            GameConnection.InvokeAsync("StartGame", Player1ConnectionId, Player2ConnectionId);
        }
    }
}
