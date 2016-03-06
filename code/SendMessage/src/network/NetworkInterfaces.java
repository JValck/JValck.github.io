package network;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

public class NetworkInterfaces {
	private Enumeration<NetworkInterface> netInterfaces;
	private int numberOfInterfaces;
	private List<NetworkInterface> interfacesWithAddress;
	
	public NetworkInterfaces() throws SocketException{
		interfacesWithAddress = new ArrayList<>();
		netInterfaces = NetworkInterface.getNetworkInterfaces();
	}
	
	/**
	 * Determines the amount of network connected interfaces
	 * @return The amount  of connected network interfaces 
	 * @throws SocketException
	 */
	public int getNetworkInterfaceCount() throws SocketException {
		while(numberOfInterfaces == 0 || netInterfaces.hasMoreElements()){//only perform if not yet determined
			NetworkInterface current = netInterfaces.nextElement();
			ArrayList<InetAddress> addresses = Collections.list(current.getInetAddresses());
			if(addresses.size() > 0){
				numberOfInterfaces++;
				interfacesWithAddress.add(current);
			}
		}
		return numberOfInterfaces;
	}

	public List<NetworkInterface> getInterfacesWithAddress() {
		return interfacesWithAddress;
	}	
	
}
