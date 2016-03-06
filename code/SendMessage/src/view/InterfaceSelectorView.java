package view;

import java.awt.BorderLayout;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.NetworkController;

public class InterfaceSelectorView implements Viewable {

	private RootWindow window;
	private NetworkController networkController;
	private JPanel rootPanel;

	public InterfaceSelectorView(RootWindow rootWindow, NetworkController networkController) throws SocketException {
		this.window = rootWindow;
		this.networkController = networkController;
		initSelectionView();
	}

	private void initSelectionView() throws SocketException {
		rootPanel = new JPanel();
		rootPanel.setLayout(new BorderLayout());		
		createNetwokPanel();
		createSelectionPanel();
		
	}

	private void createSelectionPanel() {
		JPanel selectionPanel = new JPanel();
		selectionPanel.setLayout(new BoxLayout(selectionPanel, BoxLayout.Y_AXIS));
		selectionPanel.setBorder(BorderFactory.createTitledBorder("Adapter"));
		for(NetworkInterface iface:networkController.getInterfacesWithAddress()){
			StringBuilder builder = new StringBuilder("<html>");
			builder.append(iface.getDisplayName()).append("<br />");
			builder.append(iface.getName()).append("<br/>");
			for(InetAddress address: Collections.list(iface.getInetAddresses())){
				builder.append(address).append(", ");
			}
			builder.append("</html>");
			JButton btn = new JButton(builder.toString());
			selectionPanel.add(btn);
		}		
		rootPanel.add(selectionPanel, BorderLayout.CENTER);
	}

	private void createNetwokPanel() throws SocketException {
		JPanel networkPanel = new JPanel();
		networkPanel.setBorder(BorderFactory.createTitledBorder("Netwerk Info"));
		JLabel interfacesLabel = new JLabel("Netwerk interfaces: "+ networkController.getNetworkInterfaceCount());
		networkPanel.add(interfacesLabel);
		rootPanel.add(networkPanel, BorderLayout.NORTH);
	}

	@Override
	public void show() {
		window.replaceRoot(rootPanel);
		window.show();
	}

}
