<?php

/**
 * @project PHP Web Service Producer Functions
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
 * @subpackage WebServiceProducer
 */

/**
 * Defines/Implements all exposed DB2 Health Monitoring Web Service functions
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceProducer
 */


/**
 * Web Service Function to obtain all Database Health Indicators/Alerts with History as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DB_HISTORY_INFO($username, $password, $database, $port, $language, $defset)
{	
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,true,$language, 'database'));
	return $text;
}


/**
 * Web Service Function to obtain the most severe Database Health Indicator/Alert level as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DB_HIGHEST_INFO($username, $password, $database, $port, $language, $defset)
{	
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,false,false,$language, 'database'));
	return $text;
}


/**
 * Web Service Function to obtain all Database Health Indicators/Alerts without history as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DB_DETAILED_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,false,$language, 'database'));
	return $text;
}


/**
 * Web Service Function to obtain all Database Manager Health Indicators/Alerts with History as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DBM_HISTORY_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,true,$language, 'instance'));
	return $text;
}


/**
 * Web Service Function to obtain the most severe Database Manager Health Indicator/Alert level as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DBM_HIGHEST_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,false,false,$language, 'instance'));
	return $text;	
}


/**
 * Web Service Function to obtain all Database Manager Health Indicators/Alerts without history as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_DBM_DETAILED_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,false,$language, 'instance'));
	return $text;
}


/**
 * Web Service Function to obtain all Tablespace Container Health Indicators/Alerts with History as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_CONT_HISTORY_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,true,$language, 'container'));
	return $text;
}


/**
 * Web Service Function to obtain the most severe Tablespace Container Health Indicator/Alert level as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_CONT_HIGHEST_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,false,false,$language, 'container'));
	return $text;
}


/**
 * Web Service Function to obtain all Tablespace Container Health Indicators/Alerts without history as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_CONT_DETAILED_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,false,$language, 'container'));
	return $text;	
}


/**
 * Web Service Function to obtain all Tablespace Health Indicators/Alerts with History as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_TBS_HISTORY_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,true,$language, 'tablespace'));
	return $text;
}


/**
 * Web Service Function to obtain the most severe Tablespace Health Indicator/Alert level as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_TBS_HIGHEST_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,false,false,$language, 'tablespace'));
	return $text;
}


/**
 * Web Service Function to obtain all Tablespace Health Indicators/Alerts without history as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_TBS_DETAILED_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,false,$language, 'tablespace'));
	return $text;	
}


/**
 * Web Service Function to obtain ALL health Indicators/Alerts with History as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_ALL_HISTORY_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,true,$language, 'all'));
	return $text;
}


/**
 * Web Service Function to obtain ALL Health Indicators/Alerts without history as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_ALL_DETAILED_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,true,false,$language, 'all'));
	return $text;	
}


/**
 * Web Service Function to obtain the most severe Health Indicator/Alert level as XML
 * @param string $username the username used to connect to the DB2 database
 * @param string $password the password that corresponds to the above username
 * @param string $database the name of the database to from which health data will be obtained
 * @param string $port the number of the port under which the database resides
 * @param string $language the language code used to determine the description language
 * @param boolean $defset the definition request flag used to determine whether or not
 *                        to append health definitions
 * @return string
 */
function GET_ALL_HIGHEST_INFO($username, $password, $database, $port, $language, $defset)
{
	$text = array('DB2Health_Report' => DBRender::DBReport($username,$password,$database,$port,$defset,false,false,$language, 'all'));
	return $text;	
}

?>