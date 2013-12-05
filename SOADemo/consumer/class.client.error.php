<?php

/**
 * @project PHP ClientError Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (Zend Studio)
 * @browser IE6, IE7, Firefox 1.5, Firefox 2
 * @disclaimer
 *          Any references or links in this document to non-IBM Web sites are provided for convenience 
 *          only and do not in any manner serve as an endorsement of those non-IBM Web sites or their 
 *          owners. The materials at the non-IBM Web sites are not owned or licensed by IBM and use of 
 *          those non-IBM Web sites is at your own risk. IBM makes no representations, warranties, or 
 *          other commitments whatsoever about any non-IBM Web sites or third-party resources that may 
 *          be referenced, accessible from, or linked from this document. In addition, IBM is not a 
 *          party to or responsible for any transactions you may enter into with third parties, even if 
 *          you learn of such parties (or use a link to such parties) from this document. You are 
 *          responsible for compliance with any license terms or other obligations for use of the 
 *          non-IBM Web sites in respect of your use of those non-IBM Web sites. You acknowledge and 
 *          agree that IBM is not responsible for the availability of such external sites or resources, 
 *          and is not responsible or liable for any content, services, products, or other materials on 
 *          or available from those sites or resources. 
 * @disclaimer
 *          (c) Copyright IBM Corp. 2007 All rights reserved. 
 *			
 *          The following sample of source code ("Sample") is owned by International Business Machines 
 *          Corporation or one of its subsidiaries ("IBM") and is copyrighted and licensed, not sold. 
 *			
 *          The Sample is not part of any standard IBM product. You may use, copy, modify, and distribute 
 *          the Sample in any form without payment to IBM, for the purpose of assisting you in the 
 *          development of your applications.
 *			
 *          The Sample code is provided to you on an "AS IS" basis, without warranty of any kind. 
 *
 *          IBM HEREBY EXPRESSLY DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT 
 *          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. 
 *           
 *          Some jurisdictions do not allow for the exclusion or limitation of implied warranties, so the 
 *          above limitations or exclusions may not apply to you. IBM shall not be liable for any damages 
 *          you suffer as a result of using, copying, modifying or distributing the Sample, even if IBM 
 *          has been advised of the possibility of such damages.   
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceConsumer
 */

/**
 * A compact representation of an error that occurs in the Web Service Consumer package.
 * Stores a set of constants that represent the possible error codes/messages that could arise.
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceConsumer
 */ 
class ClientError
{
	/**
	 * Stores the SOA_ERROR_CODE (Application Specific)
	 * @access private
	 * @var integer
	 */
	private $m_client_error_code;
	
	/**
	 * Stores the SOA_ERROR_MESSAGE (Application Specific)
	 * @access private
	 * @var string
	 */
	private $m_client_error_message;
	
	/**
	 * Stores the Timestamp representing when the error occurred
	 * @access private
	 * @var string
	 */
	private $m_timestamp;
	
	/** 
	 * The error code for invalid characters contained in a username
	 * @var integer
	 */
	const DB_USERNAME_PARAM_ERROR_CD = 100;
	
	/**
	 * The error code for the invalid characters contained in a password
	 * @var integer
	 */
	const DB_PASSWORD_PARAM_ERROR_CD = 101;
	
	/**
	 * The error code for the invalid characters contained in a database name
	 * @var integer
	 */
	const DB_DATABASE_PARAM_ERROR_CD = 102;
	
	/**
	 * The error code for the invalid characters contained in a port number
	 * @var integer
	 */
	const DB_PORT_PARAM_ERROR_CD = 103;
	
	/**
	 * The error code for the invalid characters contained in a language code
	 * @var integer
	 */	
	const DB_LANGUAGE_PARAM_ERROR_CD = 104;
	
	/**
	 * The error code for not being able to create a nuSOAP client
	 * @var integer
	 */
	const CLIENT_CREATE_ERROR_CD = 105;
	
	/**
	 * The error code for calling an invalid web service function
	 * @var integer
	 */
	const CLIENT_FUNCTION_ERROR_CD = 106;
	
	/**
	 * The error code for using an invalid definition request flag
	 * @var integer
	 */
	const CLIENT_DEFSET_ERROR_CD = 107;
	
	/**
	 * The error code for indicating a soap fault has occurred
	 * @var integer
	 */
	const CLIENT_SOAP_ERROR_CD = 108;
	
	/**
	 * The error code for indicating an unknown error has occurred
	 * @var integer
	 */
	const CLIENT_UNKNOWN_ERROR_CD = 109;
	
	/**
	 * The error code for indicating that invalid XML data was received
	 * @var integer
	 */
	const SERVICE_OUTPUT_ERROR_CD = 110;
	
	/**
	 * The error code for indicating that the XML configuration file is invalid
	 * @var integer
	 */
	const CLIENT_CONFIG_ERROR_CD = 111;
	
	/**
	 * The error code for indicated that the logout URL parameter was invalid
	 * @var integer
	 */
	 const CLIENT_LOGOUT_ERROR_CD = 112;
	
	/**
	 * The error message corresponding to DB_USERNAME_PARAM_ERROR_CD
	 * @see DB_USERNAME_PARAM_ERROR_CD
	 * @var string
	 */	
	const DB_USERNAME_PARAM_ERROR_MSG = 'Invalid Username Input Detected; Please check the entered username';
	
	/**
	 * The error message corresponding to DB_PASSWORD_PARAM_ERROR_CD
	 * @see DB_PASSWORD_PARAM_ERROR_CD
	 * @var string
	 */
	const DB_PASSWORD_PARAM_ERROR_MSG = 'Invalid Password Input Detected; Please check the entered password';
	
	/**
	 * The error message corresponding to DB_DATABASE_PARAM_ERROR_CD
	 * @see DB_DATABASE_PARAM_ERROR_CD
	 * @var string
	 */
	const DB_DATABASE_PARAM_ERROR_MSG = 'Invalid Database Name Input Detected; Please check the entered database name';
	
	/**
	 * The error message corresponding to DB_PORT_PARAM_ERROR_CD
	 * @see DB_PORT_PARAM_ERROR_CD
	 * @var string
	 */
	const DB_PORT_PARAM_ERROR_MSG = 'Invalid Port Number Input Detected; Please check the entered port number';
	
	/**
	 * The error message corresponding to DB_LANGUAGE_PARAM_ERROR_CD
	 * @see DB_LANGUAGE_PARAM_ERROR_CD
	 * @var string
	 */
	const DB_LANGUAGE_PARAM_ERROR_MSG = 'Invalid Language Code Input Detected; Please check the entered language code';	
	
	/**
	 * The error message corresponding to CLIENT_CREATE_ERROR_CD
	 * @see CLIENT_CREATE_ERROR_CD
	 * @var string
	 */
	const CLIENT_CREATE_ERROR_MSG = 'Could Not Create SOAP Client for Web Service Communication; Please contact your local system administrator';
	
	/**
	 * The error message corresponding to CLIENT_FUNCTION_ERROR_CD
	 * @see CLIENT_FUNCTION_ERROR_CD
	 * @var string
	 */
	const CLIENT_FUNCTION_ERROR_MSG = 'Invalid Web Service Function Request; Please contact your local system administrator';
	
	/**
	 * The error message corresponding to CLIENT_DEFSET_ERROR_CD
	 * @see CLIENT_DEFSET_ERROR_CD
	 * @var string
	 */
	const CLIENT_DEFSET_ERROR_MSG = 'Invalid Web Service Definition Request; Please contact your local system administrator';
	
	/**
	 * The error message corresponding to CLIENT_SOAP_ERROR_CD
	 * @see CLIENT_SOAP_ERROR_CD
	 * @var string
	 */
	const CLIENT_SOAP_ERROR_MSG = 'Could Not Communicate with requested Web Service Function; The service may be down or experiencing difficulties';
	
	/**
	 * The error message corresponding to CLIENT_UNKNOWN_ERROR_CD
	 * @see CLIENT_UNKNOWN_ERROR_CD
	 * @var string
	 */
	const CLIENT_UNKNOWN_ERROR_MSG = 'An Unknown Error Has Occurred; Please contact your local system administrator';
	
	/**
	 * The error message corresponding to SERVICE_OUTPUT_ERROR_CD
	 * @see SERVICE_OUTPUT_ERROR_CD
	 * @var string
	 */
	const SERVICE_OUTPUT_ERROR_MSG = 'Invalid Web Service Output XML Received; Please contact your local system administrator';
	
	/**
	 * The error message corresponding to CLIENT_CONFIG_ERROR_CD
	 * @see CLIENT_CONFIG_ERROR_CD
	 * @var string
	 */
	const CLIENT_CONFIG_ERROR_MSG = 'Invalid Web Service Consumer Configuration; Please contact your local system administrator';	
	
	/**
	 * The error message corresponding to CLIENT_LOGOUT_ERROR_CD
	 * @see CLIENT_LOGOUT_ERROR_CD
	 * @var string
	 */
	 const CLIENT_LOGOUT_ERROR_MSG = 'Invalid Logout Request; Please contact your local system administrator';
	
	/**
	 * A prefix attached in front of each error code to distinguish it from server errors with the same number
	 * @var string
	 */
	const CLIENT_ERROR_PREFIX = 'CLIENT - ';	
	
	/**
	 * The name and relative path of the Web Service Consumer error log
	 * @var string
	 */
	const CLIENT_ERROR_LOG_FILE_NM = './client_error.log';
	
	/**
	 * ClientError Constructor.
	 * Sets up {@link $m_client_error_code}.
	 * Sets up {@link $m_client_error_message}.
	 * Sets up {@link $m_timestamp}.
	 * @param integer $client_error_code The SOA application error code for the Web Service Consumer
	 * @param string $client_error_message The SOA application error message for the Web Service Consumer
	 * @return void
	 */
	public function __construct($client_error_code, $client_error_message)
	{
		$this->m_client_error_code = $client_error_code;
		$this->m_client_error_message = $client_error_message;
		$this->m_timestamp = date('Y-m-d').'T'.date('h:i:s');
	}
	
	/**
	 * Frees any memory associated with the ClientError Object
	 */
	public function __destruct()
	{
	}
	
	/**
	 * Returns the SOA application error code
	 * @see $m_client_error_code
	 * @return integer
	 */
	public function getClientCode()
	{
		return $this->m_client_error_code;
	}
	
	/**
	 * Returns the SOA application error message
	 * @see $m_client_error_message
	 * @return string
	 */
	public function getClientMessage()
	{
		return $this->m_client_error_message;
	}
	
	/**
	 * Returns the timestamp representing the time at which the error occurred 
	 * @see $m_timestamp
	 * @return string
	 */
	public function getTimestamp()
	{
		return $this->m_timestamp;	
	}
	
	/**
	 * Returns an XML string representation of the ClientError Object (conforms to WSDL/XSD)
	 * Appends the appropriate error code prefix to the code while assembling the string 
	 * @see CLIENT_ERROR_PREFIX
	 * @return string
	 */
	public function __toString()
	{		
		$error = '<DB2Health_Report schemaVersion="1.0" highestAlertState="unknown" ';
		$error .= 'timestamp="'.$this->m_timestamp.'">';
		$error .= '<InfoSet /><HIDefinitionSet /><AlertSet />';
		$error .= '<ErrorSet>';
		$error .= '<SOA_ERROR_CODE>'.self::CLIENT_ERROR_PREFIX.$this->m_client_error_code.'</SOA_ERROR_CODE>';
		$error .= '<SOA_ERROR_MESSAGE>'.$this->m_client_error_message.'</SOA_ERROR_MESSAGE>';	
		$error .= '</ErrorSet>';
		$error .= '</DB2Health_Report>';
		
		return $error;
	}
	
	/**
	 * Logs the string representation of the ClientError Object to disk 
	 * @see CLIENT_ERROR_LOG_FILE_NM
	 * @param string $error Any string representation of the error
	 * @return void
	 */
	public function logError($error)
	{
		error_log($error."\r\n", 3, self::CLIENT_ERROR_LOG_FILE_NM);
	}
}

?>