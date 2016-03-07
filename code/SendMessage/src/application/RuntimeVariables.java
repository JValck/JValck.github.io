package application;

import java.util.HashMap;
import java.util.Map;

public class RuntimeVariables {
	private static Map<Variable ,Object> variables = new HashMap<>();
	
	public enum Variable{
		INTERFACE_NAME, MAIN_CONTROLLER, NETWORK_CONTROLLER, RECEIVING_IP_ADDRESS, RECEIVED_MESSAGE;
	}
	
	public static void saveVariable(Variable variable, Object value) {
		variables.put(variable, value);
	}
	
	public static Object getVariable(Variable variable){
		return variables.get(variable);
	}
}
