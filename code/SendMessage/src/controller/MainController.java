package controller;

import java.net.SocketException;

import javax.swing.UIManager;

import view.InterfaceSelectorView;
import view.RootWindow;
import view.Viewable;

public class MainController {	
	private NetworkController networkController;

	public MainController() throws Exception{
		setSystemLookAndFeel();
		networkController = new NetworkController();
	}

	private void setSystemLookAndFeel() throws Exception {
		UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
	}

	public void run() throws SocketException {
		RootWindow rootWindow = new RootWindow();
		Viewable selectorView = new InterfaceSelectorView(rootWindow, networkController);
		selectorView.show();
	}


}
