using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Xamarin.Forms.Internals;

namespace PolyPongApp.Communication
{
    class CommunicationManager
    {
        private static CommunicationManager _instance;

        private CommunicationManager()
        {
            //A voir pour le tester
            Connection = new HubConnectionBuilder().WithUrl("http://vps805844.ovh.net/" + "/PolyHub").Build();
            ListenControlEvent();
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

        public async Task Connect()
        {
            try
            {
                await Connection.StartAsync();
            }
            catch (Exception e)
            {
                Log.Warning("Error","Erreur lors de la connexion au serveur");
            }
        }

        public void ListenControlEvent()
        {
            Connection.On("PlayerConnected", () =>
            {
                
            });
            
            Connection.On("PlayerWrongLogin", () =>
            {
                //do something on your UI maybe?
            });
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
