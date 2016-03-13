package network;

import java.io.DataInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import application.Launcher;
import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import controller.NetworkController;
import domain.Observer;
import domain.Subject;

public class Server implements Subject{

	private Socket socket;
	private DataInputStream dataIn;
	private List<Observer> observers;
	private ServerSocket sSocket;

	public Server() {
		observers = new ArrayList<>();
	}

	public void createSocket(NetworkController networkController) throws UnknownHostException, IOException{
		String interfaceIp = networkController.getInterfaceIpAddressByName((String) RuntimeVariables.getVariable(Variable.INTERFACE_NAME));		
		sSocket = new ServerSocket(3333, 50, InetAddress.getByName(interfaceIp));

	}

	public void startServerThread(){
		Thread thread = new Thread() {			
			@Override
			public void run() {			
				try {
					socket = sSocket.accept();
					RuntimeVariables.saveVariable(Variable.RECEIVING_IP_ADDRESS, socket.getRemoteSocketAddress().toString());
					dataIn = new DataInputStream(socket.getInputStream());
				} catch (IOException e1) {
					Launcher.showErrorMessageDialog(e1);
					e1.printStackTrace();
				}		
				
				while(socket!= null && !socket.isClosed()){
					try {						
						RuntimeVariables.saveVariable(Variable.RECEIVED_MESSAGE, dataIn.readUTF());
					} catch (IOException e) {
						Launcher.showErrorMessageDialog(e);
						e.printStackTrace();
					}
					notifyObsevers();
				}
			}
		};
		thread.start();
	}

	@Override
	public void registerObserver(Observer observer) {
		observers.add(observer);
	}

	@Override
	public void removeObserver(Observer observer) {
		observers.remove(observer);
	}

	@Override
	public void notifyObsevers() {
		for(Observer observer: observers){
			observer.update();
		}
	}

	public boolean openSocket() {
		return socket != null;
	}

	public void closeSocket() throws IOException {
		socket.close();
		sSocket.close();
		socket = null;
		sSocket = null;
	}
}
