package view.listener;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.JOptionPane;
import javax.swing.JTextArea;

import application.Launcher;
import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import controller.NetworkController;


public class SendMessageClickListener implements ActionListener {
	private JTextArea textToSendField;

	public SendMessageClickListener(JTextArea msgField) {
		this.textToSendField = msgField;
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		if(validIpAddressKnown()){
			try {
				((NetworkController) RuntimeVariables.getVariable(Variable.NETWORK_CONTROLLER)).sendMessage(textToSendField.getText());
			} catch (IOException e) {
				Launcher.showErrorMessageDialog(e);
				e.printStackTrace();
			}
		}
	}

	private boolean validIpAddressKnown() {
		boolean validIpAddress = true;
		while(RuntimeVariables.getVariable(Variable.RECEIVING_IP_ADDRESS) == null){
			validIpAddress = false;
			String address = JOptionPane.showInputDialog(null, "Er is nog geen geldig bestemmingsadres opgegeven voor deze poort.\n"
					+ "\nVul hieronder het IP-adres in van de bestemmeling.", "IP adres", JOptionPane.QUESTION_MESSAGE);
			if(address == null) return false;
			try {
				if(address!=null && ((NetworkController) RuntimeVariables.getVariable(Variable.NETWORK_CONTROLLER)).isReachable(address)){
					RuntimeVariables.saveVariable(Variable.RECEIVING_IP_ADDRESS, address);
					validIpAddress = true;
				}
			} catch (IOException | InterruptedException e) {
				Launcher.showErrorMessageDialog(e);
				e.printStackTrace();
			}			
		}
		return validIpAddress;
	}

}
