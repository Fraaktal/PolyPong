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

        private void OnBtnLeft_Released(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_StopMoving", gameId, playerId);
        }

        private void OnBtnLeft_Pressed(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_Left", gameId, playerId);
        }

        private void OnBtnRight_Released(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_StopMoving", gameId, playerId);
        }

        private void OnBtnRight_Pressed(object sender, EventArgs e)
        {
            string gameId = CommunicationManager.GetInstance().GameId;
            int playerId = CommunicationManager.GetInstance().PlayerId;
            CommunicationManager.GetInstance().Connection.SendAsync("Player_Right", gameId, playerId);
        }
    }
}