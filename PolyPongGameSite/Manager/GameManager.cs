using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PolyPongGameSite.Business;

namespace PolyPongGameSite.Manager
{
    public class GameManager
    {
        private static GameManager _instance;

        private GameManager()
        {
            Games = new List<Game>();
        }

        public static GameManager GetInstance()
        {
            if (_instance == null)
            {
                _instance = new GameManager();
            }

            return _instance;
        }

        public List<Game> Games { get; set; }


        public Game GetExistingGameOrCreateIt(string idConnectionPlayer)
        {
            Game res = null;
            string id = TryJoinGame(idConnectionPlayer);

            if (id == null && Games.Count < 10)
            {
                res = new Game(idConnectionPlayer);
                Games.Add(res);
            }

            return res;
        }

        private string TryJoinGame(string idConnectionPlayer)
        {
            foreach (var game in Games)
            {
                if (game.Player1ConnectionId == idConnectionPlayer || game.Player2ConnectionId == idConnectionPlayer)
                {
                    return game.GameId;
                }
                if (game.Player2ConnectionId == null && game.Player1ConnectionId != idConnectionPlayer)
                {
                    game.JoinPlayer(idConnectionPlayer);
                    return game.GameId;
                }
            }

            return null;
        }

        public bool FindGameWithPlayerIdIfExist(int id, string uniqueIdConnection, out string connectionId, out string gameId)
        {
            connectionId = "";
            gameId = "";

            foreach (var game in Games)
            {
                if (game.Player1uniqueIdConnection == uniqueIdConnection)
                {
                    game.Player1ControllerJoined(id);
                    connectionId = game.Player1ConnectionId;
                    gameId = game.GameId;
                    return true;
                }
                
                if (game.Player2uniqueIdConnection == uniqueIdConnection)
                {
                    game.Player2ControllerJoined(id);
                    connectionId = game.Player2ConnectionId;
                    gameId = game.GameId;
                    return true;
                }
            }

            return false;
        }

        public Game GetGameById(string gameId)
        {
            return Games.FirstOrDefault(g => g.GameId == gameId);
        }
    }
}
