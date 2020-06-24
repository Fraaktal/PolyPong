using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using PolyPongApp.Communication;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace PolyPongApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PolyGamePad : ContentPage
    {
        public PolyGamePad()
        {
            InitializeComponent();
        }

        private void OnBtnHaut_Released(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_StopMoving_Up", gameId, playerId);
        }

        private void OnBtnHaut_Pressed(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_Up", gameId, playerId);
        }

        private void OnBtnBas_Released(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_StopMoving_Down", gameId, playerId);
        }

        private void OnBtnBas_Pressed(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_Down", gameId, playerId);
        }
    }
}