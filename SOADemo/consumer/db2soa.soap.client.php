<?php

/**
 * @project PHP Web Service Consumer
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
 * Acts as the Web Service Consumer 
 */

require_once('./db2soa.soap.client.header.php');   /** Web Service Consumer Header */
require_once('./class.client.error.php');		   /** Web Service Consumer Error Class */
require_once('./class.client.validator.php');	   /** Web Service Consumer Validator Class */

/**
 * Stores the database name HTML control name
 * @global string $database_name_ctrl_nm
 */
$database_name_ctrl_nm = '';

/**
 * Stores the database port HTML control name
 * @global string $database_port_ctrl_nm
 */
$database_port_ctrl_nm = '';

/**
 * Stores the database username HTML control name
 * @global string $database_username_ctrl_nm
 */
$database_username_ctrl_nm = '';

/**
 * Stores the database password HTML control name
 * @global string $database_password_ctrl_nm
 */
$database_password_ctrl_nm = '';

/**
 * Stores the database language HTML control name
 * @global string $database_language_ctrl_nm
 */
$database_language_ctrl_nm = '';

/**
 * Stores the web service function name HTML control name
 * @global string $database_function_ctrl_nm
 */
$database_function_ctrl_nm = '';

/**
 * Stores URL pointing to the Web Service WSDL document
 * @global string $wsdl_server_url
 */
$wsdl_server_url = '';

/**
 * Stores the SOAP client for web service consumption
 * @global object $health_monitor_client
 */
$health_monitor_client = null;

/**
 * Stores the health definition request flag
 * @global boolean $defset
 */
$defset = '';

/**
 * Stores the logout request flag
 * @global boolean $logout
 */
$logout = '';

/**
 * Stores the initial output array received from the Web Service Producer
 * @global array $output
 */
$output = '';

/**
 * Stores final XML output string that will be sent to the Web Service Consumer GUI
 * @global string $filtered
 */
$filtered = '';

/**
 * Stores the result at each step of validation process (i.e. results, or {@link ClientError})
 * @global mixed $result
 */
$result = ClientValidator::ValidateXMLConfig($CONFIG_XML); /* Validate XML Config file */


if(!$result instanceof ClientError)
{
	//Obtain the HTML control names, and WSDL URL that was parsed from the XML Config file
	$database_username_ctrl_nm = $result['username'];
	$database_password_ctrl_nm = $result['password'];
	$database_port_ctrl_nm = $result['port'];
	$database_name_ctrl_nm = $result['database'];
	$database_language_ctrl_nm = $result['language'];
	$database_function_ctrl_nm = $result['function'];
	$wsdl_server_url = $result['wsdl_url'];
	
	//Begin the end user's session
	session_start();
	
	/* 
	 * Process Web Service Consumer GUI requests as follows:
	 * Case 1: - No session exists, but login data has been submitted
	 *         - Register all data and Redirect to main console page
	 * Case 2: - No session exists, no data exists
	 *         - Redirect to login page
	 * Case 3: - Session exists
	 *         - Perform validation, and process Web Service request
	 * Case 4: - An error has occurred
	 */	
	if(!isset($_SESSION['database']) && isset($_POST[$database_name_ctrl_nm]) &&
	   !isset($_SESSION['port']) && isset($_POST[$database_port_ctrl_nm]) &&
	   !isset($_SESSION['username']) && isset($_POST[$database_username_ctrl_nm]) &&
	   !isset($_SESSION['password']) && isset($_POST[$database_password_ctrl_nm]) &&
	   !isset($_SESSION['language']) && isset($_POST[$database_language_ctrl_nm]) &&
	   !isset($_SESSION['function']) && isset($_POST[$database_function_ctrl_nm]))
	{
		//Obtain and stores all login information from the HTML form submission
		$_SESSION['database'] = $_POST[$database_name_ctrl_nm];
		$_SESSION['port'] = $_POST[$database_port_ctrl_nm];
		$_SESSION['username'] = $_POST[$database_username_ctrl_nm];
		$_SESSION['password'] = $_POST[$database_password_ctrl_nm];
		$_SESSION['language'] = $_POST[$database_language_ctrl_nm];
		$_SESSION['function'] = $_POST[$database_function_ctrl_nm];
		
		//Redirect the user to the main console page
		header('Location: '.$MAIN_PAGE_URL);		
	}//Case 1
	else if(!isset($_SESSION['database']) && !isset($_SESSION['port']) &&
	   		!isset($_SESSION['username']) && !isset($_SESSION['password']) &&
	   		!isset($_SESSION['language']) && !isset($_SESSION['function']))
	{
		//Destroy the leftover, empty session - IE6 refresh bug/dual event call
		session_destroy();
		
		//Redirect the user to the login page
		header('Location: '.$LOGIN_PAGE_URL);
	}//Case 2
	else if(isset($_SESSION['database']) && isset($_SESSION['port']) &&
			isset($_SESSION['username']) && isset($_SESSION['password']) &&
			isset($_SESSION['language']) && isset($_SESSION['function']))
	{

		//Create the Web Service Consumer SOAP client for SOAP communication		
		try
		{
			$health_monitor_client = new SoapClient($wsdl_server_url, array('exceptions' => 0));					
		}
		catch(SoapFault $exception)
		{
			$health_monitor_client = NULL;
		}
				
		if($health_monitor_client == NULL)
		{
			$result = new ClientError(ClientError::CLIENT_CREATE_ERROR_CD, ClientError::CLIENT_CREATE_ERROR_MSG);
		}//Check for errors
		else
		{	
			//Validate all database related parameters
			$result = ClientValidator::ValidateDBParam($_SESSION['username'], $_SESSION['password'], $_SESSION['database'],
													   $_SESSION['port'], $_SESSION['language']);
			
			if(!($result instanceof ClientError))
			{
				//Validate all URL parameters
				$defset = strtok($_SERVER['QUERY_STRING'], $QUERY_PARAM_DELIMITER);
				$logout = strtok($QUERY_PARAM_DELIMITER);	
				$result = ClientValidator::ValidateURLParam($_SESSION['function'], $defset, $logout);	
				
				if($logout == 'true')
				{
					if(isset($_COOKIE[session_name()]))
						setcookie(session_name(), '', time() - 42000, '/');
						
					session_destroy();
					header('Location: '.$LOGIN_PAGE_URL);
				}//Perform Logout: Destroy cookie and session, then redirect to login page
			}//Process if successful
		
			if(!($result instanceof ClientError) && $logout != 'true')
			{	
				//Call the desired Web Service Producer function
				$output = $health_monitor_client->__soapCall($_SESSION['function'],
												 			 	 array('username' => $_SESSION['username'],
												   				       'password' => $_SESSION['password'],
									   					 		       'database' => $_SESSION['database'],
									   		 					           'port' => $_SESSION['port'],
									   		 					       'language' => $_SESSION['language'],
									 						   	         'defset' => $defset));	 
									 						   	      		 						       
				if(is_soap_fault($output))
				{					
					$result = new ClientError(ClientError::CLIENT_SOAP_ERROR_CD, ClientError::CLIENT_SOAP_ERROR_MSG);	
				}//Check for SOAP faults
				else
				{					
					$filtered = str_replace('&#xA;',' ', $output->DB2Health_Report);
					$result = ClientValidator::ValidateXMLParam($filtered);						
				}//Validate Web Service Producer output
			}
		}
	}//Case 3
	else
	{
		$result = new ClientError(ClientError::CLIENT_UNKNOWN_ERROR_CD, ClientError::CLIENT_UNKNOWN_ERROR_MSG);
	}//Case 4
}

//Check for errors and log to file (if any)
if($result instanceof ClientError)
{
	$filtered = $result->__toString();
	$result->logError($filtered);
	
	//ClientError had occurred - Logout without Redirect
	if(isset($_COOKIE[session_name()]))
		setcookie(session_name(), '', time() - 42000, '/');
						
	session_destroy();	
}

//Output the XML result (error or otherwise)
header('Content-Type: text/xml');
echo $filtered;

?>