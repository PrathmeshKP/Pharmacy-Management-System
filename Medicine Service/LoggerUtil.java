package com.pharma.medicine.logging;

import org.slf4j.Logger; import org.slf4j.LoggerFactory;

public class LoggerUtil {
	private LoggerUtil() {}

	public static Logger getLogger(Class<?> clazz) {
	    return LoggerFactory.getLogger(clazz);
	}

}