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
        public Game(string connectionIdP1)
        {
            GameConnection = new HubConnectionBuilder().WithUrl("http://192.168.1.13:45455/PolyHub").Build();
            Player1ConnectionId = connectionIdP1;
            Player1uniqueIdConnection = RandomString(5);

            Console.WriteLine(Player1Id);
            Connect();

            Player1Id = -1;
            Player2Id = -1;
            
            ListenControllerEvent();
        }

        public string Player1ConnectionId { get; set; }

        public string Player2ConnectionId { get; set; }

        public int Player1Id { get; set; }

        public int Player2Id { get; set; }

        public string Player1uniqueIdConnection { get; set; }

        public string Player2uniqueIdConnection { get; set; }

        public int Player1Score { get; set; }

        public int Player2Score { get; set; }

        public string GameId
        {
            get { return GameConnection?.ConnectionId; }
        }

        private async void Connect()
        {
            try
            {
                await GameConnection.StartAsync();

                await GameConnection.InvokeAsync("ConnectAndDisplayWaitingConnexionScreen", Player1ConnectionId, GameId, Player1uniqueIdConnection, false);
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
            //TODO de mon coté il faudra attendre que l'user se co avec son tel des deux coté avant de lancer la partie
            //TODO coté client on affichera un écran demandant de se connecter avec le tel s'il est pas connecté, pusi un ecran d'attente si l'autre est pas co
            //TODO puis le jeu.
            CUserController.GetInstance().RegisterScore(p1Score, p2Score);
        }

        public HubConnection GameConnection { get; set; }

        public void JoinPlayer(string idCP2)
        {
            Player2ConnectionId = idCP2;
            Player2uniqueIdConnection = RandomString(5);
            
            GameConnection.InvokeAsync("ConnectAndDisplayWaitingConnexionScreen", Player2ConnectionId, GameId, Player2uniqueIdConnection, true);
        }

        public void Player1ControllerJoined(int id)
        {
            Player1Id = id;

            if (Player2Id != -1)
            {
                GameConnection.InvokeAsync("StartGame", Player1ConnectionId, Player2ConnectionId, Player1Id, Player2Id);
            }
        }

        public void Player2ControllerJoined(int id)
        {
            Player2Id = id;

            if (Player1Id != -1)
            {
                GameConnection.InvokeAsync("StartGame", Player1ConnectionId, Player2ConnectionId, Player1Id, Player2Id);
            }
        }

        private string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public bool IsIdP1Id(int id)
        {
            if (Player1Id == id)
            {
                return true;
            }

            return false;
        }
    }
}
