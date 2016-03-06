package view;

import javax.swing.JFrame;
import javax.swing.JTextArea;

/**
 * Dialog for showing a full complete error message *
 */
public class FullErrorMessageDialog implements Viewable {

	private String message;
	private JFrame window;

	public FullErrorMessageDialog(String string) {
		this.message = string;
		createWindow();
	}

	private void createWindow() {
		window = new JFrame("Error");
		window.setResizable(false);
		window.setSize(800, 600);
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		JTextArea text = new JTextArea(message);
		text.setEditable(false);
		window.add(text);
		
	}

	@Override
	public void show() {
		window.setVisible(true);
	}

}
