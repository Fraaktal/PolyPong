using System;
using MySql.Data.MySqlClient;

namespace PolyPongGameSite.Controller
{
    public class CUserController
    {
        private static CUserController _instance;

        private CUserController()
        {

        }

        public static CUserController GetInstance()
        {
            if (_instance == null)
            {
                _instance = new CUserController();
            }

            return _instance;
        }

        public bool TryLogUser(string login, string password, out int id)
        {
            MySqlConnection connection = GetDBConnection();
            bool result = false;
            id = -1;

            try
            {
                Console.WriteLine("Connecting to MySQL...");
                connection.Open();

                string sql = $"SELECT * FROM User WHERE email='{login}' AND password='{password}'";
                MySqlCommand cmd = new MySqlCommand(sql, connection);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.Read())
                {
                    id = rdr.GetInt32(0);
                    result = true;
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            connection.Close();

            return result;
        }

        public MySqlConnection GetDBConnection()
        {
            string host = "127.0.0.1";
            int port = 3306;
            string database = "polypong";
            string username = "root";
            string password = "pass";

            String connString = "Server=" + host + ";Database=" + database + ";port=" + port + ";User Id=" + username + ";password=" + password;

            return new MySqlConnection(connString);
        }

        public void RegisterScore(int p1Score, int p2Score)
        {
            
        }
    }
}
