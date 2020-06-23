using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using PolyPongApp.Communication;
using Xamarin.Forms;

namespace PolyPongApp
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
#if DEBUG
            UserNameEntry.Text = "test";
            PasswordEntry.Text = "pass";
            IpEntry.Text = "192.168.1.13";
            PortEntry.Text = "45457";
#endif

        }

        private void OnBtnConnection_Clicked(object sender, EventArgs e)
        {
            string login = UserNameEntry.Text;
            string pass = PasswordEntry.Text;
            string ip = IpEntry.Text;
            string port = PortEntry.Text;
            string id = IdEntry.Text;
            CommunicationManager.GetInstance().Build(ip,port);

            CommunicationManager.GetInstance().Connection.On<bool,string, int>("PlayerConnected", (isLogOk, gameId, idPlayer) =>
            {
                if (isLogOk)
                {
                    CommunicationManager.GetInstance().GameId = gameId;
                    CommunicationManager.GetInstance().PlayerId = idPlayer;
                    Navigation.PushAsync(new PolyGamePad());
                }
            });

            CommunicationManager.GetInstance().ConnectAndTryLog(login, pass, id);

        }
    }
}
