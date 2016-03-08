package controller;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.List;

import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import network.Client;
import network.NetworkInterfaces;
import network.Server;

public class NetworkController {	
	private NetworkInterfaces networkInterfaces;
	private Client client;
	private Server server;

	public NetworkController() throws SocketException{
		networkInterfaces = new NetworkInterfaces();
		RuntimeVariables.saveVariable(Variable.NETWORK_CONTROLLER, this);
		client = new Client();
		server = new Server();
	}

	public String getIpAddress() throws UnknownHostException {
		return InetAddress.getLocalHost().getHostAddress();
	}
	
	/**
	 * Determines the amount of connected network interfaces
	 * @return The amount  of connected network interfaces 
	 * @throws SocketException
	 */
	public int getNetworkInterfaceCount() throws SocketException {
		return networkInterfaces.getNetworkInterfaceCount();
	}

	public List<NetworkInterface> getInterfacesWithAddress() {
		return networkInterfaces.getInterfacesWithAddress();
	}
	
	public NetworkInterface getInterfaceByName(String name) throws SocketException{
		return networkInterfaces.getInterfaceWithAddressByName(name);
	}

	public boolean isReachable(String address) throws UnknownHostException, IOException {
		return networkInterfaces.isReachable(address);		
	}

	public void sendMessage(String text) throws UnknownHostException, IOException {
		if(!client.openSocket()){
			client.createSocket();
		}
		client.sendMessage(text);
	}

	public void startServer() throws UnknownHostException, IOException {
		if(!server.openSocket()){
			server.createSocket(this);
		}
		server.startServerThread();
	}

	public String getInterfaceIpAddressByName(String name) throws SocketException {
		NetworkInterface iface = getInterfaceByName(name);		
		return Collections.list(iface.getInetAddresses()).get(0).getHostAddress();
	}
	
	public Server getServer(){
		return server;
	}
}
