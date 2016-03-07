package network;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

import application.RuntimeVariables;
import application.RuntimeVariables.Variable;

public class Client {

	private Socket socket;
	private DataOutputStream dataOut;

	public void createSocket() throws UnknownHostException, IOException {
		socket = new Socket(InetAddress.getByName((String) RuntimeVariables.getVariable(Variable.RECEIVING_IP_ADDRESS)), 3333);
		dataOut = new DataOutputStream(socket.getOutputStream());
	}
	
	public void sendMessage(String message) throws IOException {
		dataOut.writeUTF(message);
		dataOut.flush();
	}

	public boolean openSocket() {		
		return socket != null && socket.isConnected();
	}
}
