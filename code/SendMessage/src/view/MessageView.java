package view;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.GridLayout;
import java.io.IOException;
import java.net.SocketException;
import java.net.UnknownHostException;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import controller.NetworkController;
import view.listener.BackButtonPressed;
import view.partial.ReceiveMessagePartial;
import view.partial.SendMessagePartial;

public class MessageView implements Viewable {

	private RootWindow rootWindow;
	private NetworkController networkController;
	private JPanel rootPanel;

	public MessageView(RootWindow rootWindow, NetworkController networkController) throws IOException {
		this.rootWindow = rootWindow;
		this.networkController = networkController;
		networkController.startServer();
		initView();
	}

	private void initView() throws UnknownHostException, SocketException {
		rootPanel = new JPanel();
		rootPanel.setLayout(new BorderLayout());
		rootPanel.add(createIpAddressPanel(), BorderLayout.NORTH);
		rootPanel.add(createMessageViewPanel(), BorderLayout.CENTER);
		rootPanel.add(createBackButton(), BorderLayout.SOUTH);
	}	

	private Component createBackButton() {
		JButton btn = new JButton("Terug");
		btn.addActionListener(new BackButtonPressed());
		return btn;
	}

	private Component createMessageViewPanel() {
		JPanel panel = new JPanel();
		panel.setLayout(new GridLayout(1,2));
		panel.setBorder(BorderFactory.createTitledBorder("Stuur & Ontvang Berichten"));
		
		panel.add(new SendMessagePartial());
		panel.add(new ReceiveMessagePartial(networkController.getServer()));
		return panel;
	}

	private Component createIpAddressPanel() throws UnknownHostException, SocketException {
		JPanel panel = new JPanel();
		panel.setLayout(new BorderLayout());
		panel.setBorder(BorderFactory.createTitledBorder("Network Interface"));
		panel.add(new JLabel((String) RuntimeVariables.getVariable(Variable.INTERFACE_NAME)), BorderLayout.WEST);		
		panel.add(new JLabel(networkController.getInterfaceIpAddressByName((String) RuntimeVariables.getVariable(Variable.INTERFACE_NAME))), BorderLayout.EAST);
		return panel;
	}

	@Override
	public void show() {
		rootWindow.replaceRoot(rootPanel);
		rootWindow.show();
	}

}
