package view.partial;

import java.awt.BorderLayout;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import application.RuntimeVariables;
import application.RuntimeVariables.Variable;
import domain.Observer;

public class ReceiveMessagePartial extends JPanel implements Observer{

	private static final long serialVersionUID = 1L;
	private JTextArea textArea;
	private StringBuilder messageBuilder;
	
	public ReceiveMessagePartial(){
		this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		initView();
	}

	private void initView() {
		JPanel panel = new JPanel();
		panel.setLayout(new BorderLayout());
		panel.setBorder(BorderFactory.createTitledBorder("Ontvangen Berichten"));	
		textArea = new JTextArea("Wachten op eerste bericht...");
		JScrollPane scroll = new JScrollPane (textArea, 
				   JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
				   JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		panel.add(scroll);
		messageBuilder = new StringBuilder();
		add(panel);
	}

	@Override
	public void update() {
		messageBuilder.append(RuntimeVariables.getVariable(Variable.RECEIVED_MESSAGE));
	}

}
