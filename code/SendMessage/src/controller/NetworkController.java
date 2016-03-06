package controller;

import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.List;

import network.NetworkInterfaces;

public class NetworkController {	
	private NetworkInterfaces networkInterfaces;

	public NetworkController() throws SocketException{
		networkInterfaces = new NetworkInterfaces();
	}

	public String getIpAddress() {
		return "0.0.0.0";
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
	
	
}
