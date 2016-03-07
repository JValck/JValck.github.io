package view.listener;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import application.Launcher;
import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import controller.MainController;

public class InterfaceButtonClickListener implements ActionListener {

	private String name;

	public InterfaceButtonClickListener(String name) {
		this.name = name;
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		RuntimeVariables.saveVariable(Variable.INTERFACE_NAME, name);
		try {
			((MainController)RuntimeVariables.getVariable(Variable.MAIN_CONTROLLER)).interfaceSelected();
		} catch (IOException e) {
			Launcher.showErrorMessageDialog(e);
			e.printStackTrace();
		}
	}

}
