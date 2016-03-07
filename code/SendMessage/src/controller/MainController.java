package controller;

import java.io.IOException;
import java.net.SocketException;
import javax.swing.UIManager;

import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import view.InterfaceSelectorView;
import view.MessageView;
import view.RootWindow;
import view.Viewable;

public class MainController {	
	private NetworkController networkController;
	private RootWindow rootWindow;

	public MainController() throws Exception{
		setSystemLookAndFeel();
		networkController = new NetworkController();
		RuntimeVariables.saveVariable(Variable.MAIN_CONTROLLER, this);
	}

	private void setSystemLookAndFeel() throws Exception {
		UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
	}

	public void run() throws SocketException {
		rootWindow = new RootWindow();
		interfaceOverview();
	}
	
	public void interfaceSelected() throws IOException{
		Viewable messageView = new MessageView(rootWindow, networkController);
		messageView.show();
	}

	public void interfaceOverview() throws SocketException {
		Viewable selectorView = new InterfaceSelectorView(rootWindow, networkController);
		selectorView.show();
	}


}
