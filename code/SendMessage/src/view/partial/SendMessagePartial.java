package view.partial;

import java.awt.BorderLayout;
import java.awt.GridLayout;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JTextArea;

import view.listener.ClearButtonClickListener;
import view.listener.SendMessageClickListener;

public class SendMessagePartial extends JPanel{

	private static final long serialVersionUID = 1L;
	
	public SendMessagePartial() {
		initView();
	}

	private void initView() {
		setLayout(new BorderLayout());
		JTextArea msgField = createMessagePanel();		
		JPanel btnPanel = createButtonPanel(msgField);		
		add(btnPanel, BorderLayout.SOUTH);
	}

	private JTextArea createMessagePanel() {
		JPanel msg = new JPanel();
		msg.setBorder(BorderFactory.createTitledBorder("Bericht Sturen"));
		msg.setLayout(new BorderLayout());
		JTextArea msgField = new JTextArea();
		msgField.setLineWrap(true);
		msg.add(msgField);
		add(msg);
		return msgField;
	}

	private JPanel createButtonPanel(JTextArea msgField) {
		JPanel btnPanel = new JPanel();
		btnPanel.setLayout(new GridLayout(1, 2));
		JButton btn = new JButton("Versturen");
		btn.addActionListener(new SendMessageClickListener(msgField));
		btnPanel.add(btn);
		JButton clearBtn = new JButton("Leeg maken");
		clearBtn.addActionListener(new ClearButtonClickListener(msgField));
		btnPanel.add(clearBtn);
		return btnPanel;
	}

}
