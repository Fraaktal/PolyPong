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


        public Game GetExistingGameOrCreateIt(string idConnectionPlayer, int idPlayer)
        {
            Game res = null;
            string id = TryJoinGame(idConnectionPlayer, idPlayer);

            if (id == null && Games.Count < 10)
            {
                res = new Game(idConnectionPlayer, idPlayer);
                Games.Add(res);
            }

            return res;
        }

        private string TryJoinGame(string idConnectionPlayer, int idPlayer)
        {
            foreach (var game in Games)
            {
                if (game.Player1ConnectionId == idConnectionPlayer || game.Player2ConnectionId == idConnectionPlayer)
                {
                    return game.GameId;
                }
                if (game.Player2ConnectionId == null && game.Player1ConnectionId != idConnectionPlayer)
                {
                    game.JoinPlayer(idConnectionPlayer,idPlayer);
                    return game.GameId;
                }
            }

            return null;
        }
    }
}
