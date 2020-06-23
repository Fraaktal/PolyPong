using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Xamarin.Forms;
using Xamarin.Forms.Internals;

namespace PolyPongApp.Communication
{
    class CommunicationManager
    {
        private static CommunicationManager _instance;

        private CommunicationManager()
        {
            GameId = "";
        }

        public static CommunicationManager GetInstance()
        {
            if (_instance == null)
            {
                _instance = new CommunicationManager();
            }

            return _instance;
        }

        public HubConnection Connection { get; set; }

        public string GameId { get; set; }

        public int PlayerId { get; set; }

        public void Build(string ip, string port)
        {
            Connection = new HubConnectionBuilder().WithUrl($"http://{ip}:{port}/PolyHub").Build();
        }

        public async Task ConnectAndTryLog(string login, string password, string uniqueIdConnection)
        {
            try
            {
                await Connection.StartAsync();

                await Connection.InvokeAsync("User_Try_Log_From_App", login, password, uniqueIdConnection);
            }
            catch (Exception e)
            {
                Log.Warning("Error","Erreur lors de la connexion au serveur");
            }
        }

        public async Task Player_Send_Left(int idUser)
        {
            await Connection.InvokeAsync("Player_Left", idUser);
        }
        
        public async Task Player_Send_Right(int idUser)
        {
            await Connection.InvokeAsync("Player_Right", idUser);
        }
        
        public async Task Player_Send_StopMoving(int idUser)
        {
            await Connection.InvokeAsync("Player_StopMoving", idUser);
        }
    }
}
