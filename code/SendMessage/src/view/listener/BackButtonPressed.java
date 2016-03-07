package view.listener;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.SocketException;

import application.Launcher;
import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import controller.MainController;

public class BackButtonPressed implements ActionListener {

	@Override
	public void actionPerformed(ActionEvent arg0) {
		try {
			((MainController) RuntimeVariables.getVariable(Variable.MAIN_CONTROLLER)).interfaceOverview();
		} catch (SocketException e) {
			Launcher.showErrorMessageDialog(e);
			e.printStackTrace();
		}
	}

}
