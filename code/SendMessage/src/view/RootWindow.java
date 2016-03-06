package view;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * Root window for all the applications subviews
 */
public class RootWindow implements Viewable{
	private JFrame window;
	
	public RootWindow(){
		window = new JFrame();
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setSize(800, 600);		
		ImageIcon icon = new ImageIcon(getClass().getResource("/icon.png").getPath());
		window.setIconImage(icon.getImage());
	}

	public JFrame getWindow() {
		return window;
	}

	@Override
	public void show() {
		window.setVisible(true);
	}
	
	/**
	 * Replaces the old root panel with the new one
	 * @param panel The new root panel
	 */
	public void replaceRoot(JPanel panel){
		window.setContentPane(panel);
	}
	
}
