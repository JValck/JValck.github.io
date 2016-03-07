package application;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.swing.JOptionPane;

import controller.MainController;
import view.FullErrorMessageDialog;
import view.Viewable;

public class Launcher {
	public static void main(String[] args){
		try{
			MainController controller = new MainController();
			controller.run();
		}catch(Exception e){
			e.printStackTrace();
			showErrorMessageDialog(e);
		}
	}

	public static void showErrorMessageDialog(Exception e) {
		Object[] buttons = {"Sluiten", "Meer details"};		
		int n = JOptionPane.showOptionDialog(null,
				e.getMessage(),
				"Error",
				JOptionPane.YES_NO_OPTION,
				JOptionPane.ERROR_MESSAGE,
				null,     //do not use a custom Icon
				buttons,  //the titles of buttons
				buttons[0]); //default button title

		switch(n){
		case JOptionPane.NO_OPTION://Meer details
			showFullErrorMessage(e);
			break;
		default:
			System.exit(0);
		}
	}

	private static void showFullErrorMessage(Exception e) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);		
		Viewable fullErrorMessageDialog = new FullErrorMessageDialog(sw.toString());
		fullErrorMessageDialog.show();
	}
}
