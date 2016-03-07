package view.listener;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JTextArea;

public class ClearButtonClickListener implements ActionListener {

	private JTextArea msgField;

	public ClearButtonClickListener(JTextArea msgField) {
		this.msgField = msgField;
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		msgField.setText("");
	}

}
