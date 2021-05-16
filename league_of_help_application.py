import requests
import tkinter as tk


class Application(tk.Frame):
    def __init__(self, master: tk.Tk = None):
        super().__init__(master)
        self.master = master
        self.reading = False

        self.grid()
        self.create_widgets()

    def create_widgets(self):
        self.start_button = tk.Button(self, text='Start', command=self.start, fg='red', bg='lightgray')
        self.stop_button = tk.Button(self, text='Stop', command=self.stop, fg='blue', bg='lightgray')

        self.start_button.grid(row=0, column=0)
        self.stop_button.grid(row=0, column=1)

    def stop(self):
        if self.reading:
            self.reading = False
            print([champion['championName']
                  for champion in self.data['allPlayers']])
            print('Successfully stopped reading live client data.')
        else:
            print('Already not reading live client data.')

    def start(self):
        if not self.reading:
            self.reading = True
            print('Successfully started reading live client data.')
            self.read_live_client_data()
        else:
            print('Already reading live client data.')

    def read_live_client_data(self):
        if self.reading:
            try:
                self.data = requests.get('https://localhost:2999/liveclientdata/allgamedata', verify=False).json()
                self.update()
            except Exception as e:
                print('Unable to read data from the live client:', e)
                for widget in self.master.winfo_children()[2:]:
                    widget.destroy()

        # After 5000 mili-seconds (5 sec) restart this function (loop).
        try:
            self.after(
                5000 - int(round(self.data['gameData']['gameTime'] - int(self.data['gameData']['gameTime']), 3) * 1000),
                self.read_live_client_data
            )
        except:
            self.after(5000, self.read_live_client_data)

    def update(self):
        # Update every widget else create them
        if len(self.master.winfo_children()[2:]) > 1:
            for index, champion in enumerate(self.champions_list):
                print('update', champion)
                champion['text'] = f"{self.data['allPlayers'][index]['championName']} ({self.data['allPlayers'][index]['summonerName']})"
                champion['fg'] = 'blue' if self.data['allPlayers'][index]['team'] == 'ORDER' else 'red'
        else:
            self.champions_list = [
                tk.Button(text=f"{champion['championName']}")
                for champion in [champion for champion in self.data['allPlayers']]
            ]
            for index, champion in enumerate(self.champions_list):
                champion.grid(row=index + 2, column=0)

        # Update the appearance
        self.master.update_idletasks()


root = tk.Tk()
app = Application(master=root)
app.mainloop()
