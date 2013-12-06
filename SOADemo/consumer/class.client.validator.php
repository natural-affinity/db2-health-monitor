<?php

/**
 * @project PHP ClientValidator Class
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
 * A static class designed specifically for the Web Service Consumer package to perform validation.
 * Stores a set of regular expressions and paths to XML schemas in order to validate data from both
 * the Web Service Consumer GUI and the Web Service Producer.
 * @static
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceConsumer
 */
class ClientValidator
{
  /**
   * A regular expression used to scan for specific HTML tags embedded within an XML document
   * @var string
   */
  const REGEX_HTML_TAGS = '/&lt;(a|script|frame|iframe|img|object|input|form|link|style)/';

  /**
   * A regular expression used to scan the name of Web Service Producer function requested
   * @var string
   */
  const REGEX_URL_FUNCTION_PARAMETER = '/^GET_(DB|DBM|CONT|TBS|ALL)_(HISTORY|HIGHEST|DETAILED)_INFO$/';

  /**
   * A regular expression used to scan the definition request flag for boolean values
   * @var string
   */
  const REGEX_URL_DEFSET_PARAMETER = '/^(true|false)$/';

  /**
   * A regular expression used to check if a logout has been requested
   * @var string
   */
   const REGEX_URL_LOGOUT_PARAMETER = '/^(true|false)$/';

  /**
   * A regular expression used to scan database parameters for invalid/too many characters
   * @var string
   */
  const REGEX_DATABASE_PARAMETER = '/^[a-zA-Z0-9_]{0,30}$/';

  /**
   * A regular expression used to scan the database port number for invalid/too many characters
   * @var string
   */
  const REGEX_PORT_PARAMETER = '/^[0-9]{0,5}$/';

  /**
   * A regular expression used to scan for the allowable language code format
   * @var string
   */
  const REGEX_LANGUAGE_CODE = '/^[a-zA-Z]{2}_[a-zA-Z]{2}$/';

  /**
   * The number of nested elements that are allowed in a valid XML payload from the Web Service Producer
   * @var string
   */
  const XML_LEVEL_NESTING_MAX = 6;

  /**
   * The maximum size (in characters - approx 1-2bytes each: 2-4MB) of a valid XML payload from the Web Service Producer
   * @var string
   */
  const XML_PAYLOAD_SIZE_MAX = 4194304;

  /**
   * The path and name of the XML Schema (XSD) which is used to verify the XML payload from the Web Service Producer
   * @var string
   */
  const XML_SCHEMA = '../schema/DB2Health_v0_8.xsd';

  /**
   * The path and name of the XML Schema (XSD) which is used to verify the Web Service Consumer XML configuration file
   * @var string
   */
  const CONFIG_XML_SCHEMA = '../schema/Config_v0_1.xsd';

  /**
   * A static method used to scan all input parameters that will be sent to the Web Service Producer and
   * Web Service Producer DB.
   * @access public
   * @param string $username The username that will be sent to the Web Service Producer/DB packages to access the database
   * @param string $password The password that corresponds to the above username
   * @param string $db The name of the database for which Health Monitoring data will be retrieved
   * @param string $port The database port number
   * @param string $language The language code used to determine the language in which Health Monitoring descriptions are retrieved
   * @return mixed (true on success; {@link ClientError} object on failure)
   */
  public static function ValidateDBParam($username, $password, $db, $port, $language)
  {
    //Database Username Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $username))
      return new ClientError(ClientError::DB_USERNAME_PARAM_ERROR_CD, ClientError::DB_USERNAME_PARAM_ERROR_MSG);

    //Database Password Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $password))
      return new ClientError(ClientError::DB_PASSWORD_PARAM_ERROR_CD, ClientError::DB_PASSWORD_PARAM_ERROR_MSG);

    //Database Name Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $db))
      return new ClientError(ClientError::DB_DATABASE_PARAM_ERROR_CD, ClientError::DB_DATABASE_PARAM_ERROR_MSG);

    //Database Port Number Validation
    if(!preg_match(self::REGEX_PORT_PARAMETER, $port))
      return new ClientError(ClientError::DB_PORT_PARAM_ERROR_CD, ClientError::DB_PORT_PARAM_ERROR_MSG);

    //Database Language Code Validation
    if(!preg_match(self::REGEX_LANGUAGE_CODE, $language))
      return new ClientError(ClientError::DB_LANGUAGE_PARAM_ERROR_CD, ClientError::DB_LANGUAGE_PARAM_ERROR_MSG);

    return true;
  }

  /**
   * A static method used to scan additional parameters related to web service acess.  These include the name
   * of the web service function which will be called, the Health Monitor Defintion request flag, and if a
   * logout has been requested.
   * @access public
   * @param string $function_nm The name of the web service function from which data will be requested
   * @param boolean $defset A boolean flag indicating whether Health Definitions should be retrieved or not
   * @param boolean $is_logout A boolean flag indicating whether the user should be logged out or not
   * @return mixed (true on success; {@link ClientError} object on failure)
   */
  public static function ValidateURLParam($function_nm, $defset, $is_logout)
  {
    //Function Name Validation
    if(!preg_match(self::REGEX_URL_FUNCTION_PARAMETER, $function_nm))
      return new ClientError(ClientError::CLIENT_FUNCTION_ERROR_CD, ClientError::CLIENT_FUNCTION_ERROR_MSG);

    //Definition Flag Validation
    if(!preg_match(self::REGEX_URL_DEFSET_PARAMETER, $defset))
      return new ClientError(ClientError::CLIENT_DEFSET_ERROR_CD, ClientError::CLIENT_DEFSET_ERROR_MSG);

    //Action Type Validation
    if(!preg_match(self::REGEX_URL_LOGOUT_PARAMETER, $is_logout))
      return new ClientError(ClientError::CLIENT_LOGOUT_ERROR_CD, ClientError::CLIENT_LOGOUT_ERROR_MSG);

    return true;
  }

  /**
   * A static method used to scan the XML payload received from the Web Service Producer.  This method scans
   * the XML for the following conditions: size, embedded HTML tags (including script), levels of element
   * nesting, well-formedness, and against an XML Schema.
   * @access public
   * @param string $xml_string A string representation of the XML document
   * @return mixed (true on success; {@link ClientError} object on failure)
   */
  public static function ValidateXMLParam($xml_string)
  {
    $length = strlen($xml_string);
    $level_count = 0;

    //XML Payload Size Validation
    if($length > self::XML_PAYLOAD_SIZE_MAX)
      return new ClientError(ClientError::SERVICE_OUTPUT_ERROR_CD, ClientError::SERVICE_OUTPUT_ERROR_MSG);

    //XML Payload Embedded HTML Tag Validation
    if(preg_match(self::REGEX_HTML_TAGS, $xml_string))
      return new ClientError(ClientError::SERVICE_OUTPUT_ERROR_CD, ClientError::SERVICE_OUTPUT_ERROR_MSG);

    //XML Payload Nesting Validation
    for($i = 0; $i < $length; $i++)
    {
      if((($i + 1) < $length) && $xml_string[$i] == '/' && $xml_string[$i+1] == '>')
      {
        $level_count--;
      }
      else if((($i + 1) < $length) && ($xml_string[$i] == '<' && $xml_string[$i+1] == '/'))
      {
        $level_count--;
      }
      else if($xml_string[$i] == '<')
      {
        $level_count++;
      }

      if($level_count > self::XML_LEVEL_NESTING_MAX)
        return new ClientError(ClientError::SERVICE_OUTPUT_ERROR_CD, ClientError::SERVICE_OUTPUT_ERROR_MSG);
    }

    $doc = new DOMDocument('1.0');

    //XML Payload Well-formedness Validation
    if(!($doc->loadXML($xml_string)))
      return new ClientError(ClientError::SERVICE_OUTPUT_ERROR_CD, ClientError::SERVICE_OUTPUT_ERROR_MSG);

    //XML Payload Schema Validation
    if(!($doc->schemaValidate(self::XML_SCHEMA)))
      return new ClientError(ClientError::SERVICE_OUTPUT_ERROR_CD, ClientError::SERVICE_OUTPUT_ERROR_MSG);

    return true;
  }

  /**
   * A static method used to validate the Web Service Consumer XML configuration file (config.xml).  This method
   * scans the XML document for the following conditions: well-formedness, and against an XML Schema.
   * @access public
   * @param string $filename The name of the file from which the configuration will be processed.
   * @return mixed (array('username' => '', 'password' => '', 'instance' => '',
   *                      'database' => '', 'language' => '', 'function' => '',
   *                'wsdl_url' => '') on success; {@link ClientError} on failure)
   */
  public static function ValidateXMLConfig($filename)
  {
    $params = array('username' => '', 'password' => '', 'port' => '',
              'database' => '', 'language' => '', 'function' => '',
              'wsdl_url' => '');

    $doc = new DOMDocument('1.0');

    //XML Configuration File Well-formedness Validation
    if(!$doc->load($filename))
      return new ClientError(ClientError::CLIENT_CONFIG_ERROR_CD, ClientError::CLIENT_CONFIG_ERROR_MSG);

    //XML Configuration File Schema Validation
    if(!$doc->schemaValidate(self::CONFIG_XML_SCHEMA))
      return new ClientError(ClientError::CLIENT_CONFIG_ERROR_CD, ClientError::CLIENT_CONFIG_ERROR_MSG);

    //XML Configuration File Parameter Extraction
    $params['username'] = $doc->getElementsByTagName('username_ctrl_nm')->item(0)->nodeValue;
    $params['password'] = $doc->getElementsByTagName('password_ctrl_nm')->item(0)->nodeValue;
    $params['port'] = $doc->getElementsByTagName('port_ctrl_nm')->item(0)->nodeValue;
    $params['database'] = $doc->getElementsByTagName('database_ctrl_nm')->item(0)->nodeValue;
    $params['language'] = $doc->getElementsByTagName('language_ctrl_nm')->item(0)->nodeValue;
    $params['function'] = $doc->getElementsByTagName('function_ctrl_nm')->item(0)->nodeValue;
    $params['wsdl_url'] = $doc->getElementsByTagName('wsdl_url')->item(0)->nodeValue;

    return $params;
  }
}

?>