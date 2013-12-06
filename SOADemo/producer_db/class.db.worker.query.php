<?php

/**
 * @project PHP DBQueryWorker Class
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
 * @subpackage WebServiceProducerDB
 */

/**
 * Builds the desired Health Monitorin XQUERY, performs its execution, and frees the result set memory
 * @static
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceProducerDB
 */
class DBQueryWorker
{
  /**
   * Attempts to free the memory associated with the executed query statement, and returned result set
   * @access private
   * @param reference &$stmt the statement whose memory should be freed
   * @return void
   */
  private static function DBFree(&$stmt)
  {
    if(!is_null($stmt))
    {
      db2_free_result($stmt);
      db2_free_stmt($stmt);
    }
  }

  /**
   * Executes the desired SQL query statement.
   * @access public
   * @param resource $connection the connection to the DB2 database
   * @param string the SQL statement to be prepared and executed
   * @return mixed (array of row results on success; {@link DBError} object on failure)
   */
  public static function DBQuery($connection, $sql)
  {
    //Prepare the desired SQL statement
    $stmt = db2_prepare($connection, $sql);
    $rows = array();

    if($stmt)
    {
      //Execute the desired SQL statement
      $result = db2_execute($stmt);

      //Fetch the Result Set Rows
      if($result)
      {
        while($row = db2_fetch_array($stmt))
          $rows[] = $row;
      }
      else
      {
        return new DBError(DBError::DB_QUERY_EXECUTION_ERROR_CD, DBError::DB_QUERY_EXECUTION_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
      }
    }
    else
    {
      return new DBError(DBError::DB_QUERY_PREPARE_ERROR_CD, DBError::DB_QUERY_PREPARE_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
    }

    //Free the statement and result memory
    self::DBFree($stmt);

    return $rows;
  }

  /**
   * Executes the desired XQUERY statement.
   * This should only be used on queries that return a single column, where each row of the column is a
   * standalone xml document (i.e. all are concatenated as a single XML document).
   * @access public
   * @param resource $connection the connection to the DB2 database
   * @param string $sql the XQUERY statement to be prepared and executed
   * @return mixed (string representation of XML document on success; {@link DBError} object on failure)
   */
  public static function DBXQuery($connection, $sql)
  {
    //Prepare desired XQUERY statement
    $stmt = db2_prepare($connection, $sql);
    $xml_string = '';

    if($stmt)
    {
      //Execute desired XQUERY statement
      $result = db2_execute($stmt);

      //Fetch the Resulting XML document (string)
      if($result)
      {
        while($row = db2_fetch_array($stmt))
          $xml_string .= $row[0];
      }
      else
      {
        return new DBError(DBError::DB_QUERY_EXECUTION_ERROR_CD, DBError::DB_QUERY_EXECUTION_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
      }
    }
    else
    {
      return new DBError(DBError::DB_QUERY_PREPARE_ERROR_CD, DBError::DB_QUERY_PREPARE_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
    }

    //Free the statement and result memory
    self::DBFree($stmt);

    return $xml_string;
  }

  /**
   * A helper function that selects the correct parameters with which to build a specific type of XQUERY.
   * For example, building a Health Report with only 'database' alerts will require all of the specific
   * parameters/functions listed in the specified array below.
   * @access private
   * @param string $object_type indicates the type of object to get query parameters for
   * @return mixed (array on success; empty string on failure)
   */
  private static function getByType($object_type)
  {
    $array = '';

    if($object_type == 'database')
    {
      $array = array('hig_fn' => "health_db_info('''''''',-1)",
               'det_fn' => "health_db_hi('''''''',-1)",
               'his_fn' => "health_db_hi_his('''''''',-1)",
               'obj_cd' => 'DB',
               'obj_nm' => 't.DB_NAME');
    }
    else if($object_type == 'instance')
    {
      $array = array('hig_fn' => "health_dbm_info(-1)",
               'det_fn' => "health_dbm_hi(-1)",
                 'his_fn' => "health_dbm_hi_his(-1)",
               'obj_cd' => 'DBM',
               'obj_nm' => 't.SERVER_INSTANCE_NAME');
    }
    else if($object_type == 'tablespace')
    {
      $array = array('hig_fn' => "health_tbs_info('''''''',-1)",
               'det_fn' => "health_tbs_hi('''''''',-1)",
               'his_fn' => "health_tbs_hi_his('''''''',-1)",
               'obj_cd' => 'TS',
               'obj_nm' => 't.TABLESPACE_NAME');
    }
    else if($object_type == 'container')
    {
      $array = array('hig_fn' => "health_cont_info('''''''',-1)",
               'det_fn' => "health_cont_hi('''''''',-1)",
               'his_fn' => "health_cont_hi_his('''''''',-1)",
               'obj_cd' => 'TSC',
               'obj_nm' => 't.CONTAINER_NAME');
    }

    return $array;
  }

  /**
   * Prepares and executes the GET_DBSIZE_INFO stored procedure (required prior to executing the desired XQUERY).
   * The information in the XQUERYs of this application rely on a cached value to be present, hence, this stored
   * procedure being executed guarantees that the subsequent queries will not fail.
   * @access public
   * @param resource $connection the connection to the specified DB2 database
   * @return mixed (true on success; {@link DBError} object on failure)
   */
  public static function DBQuerySize($connection)
  {
    //Prepares the Stored Procedure Call
    $stmt = db2_prepare($connection, 'CALL GET_DBSIZE_INFO(?,?,?,-1)');

    //Initializes the Output Parameters with the correct size/type required by the procedure
    $timestamp = str_pad('',50);
    $size = 0.0;
    $capacity = 0.0;

    if($stmt)
    {
      //Bind all Output Parameters
      db2_bind_param($stmt, 1, 'timestamp', DB2_PARAM_OUT);
      db2_bind_param($stmt, 2, 'size', DB2_PARAM_OUT);
      db2_bind_param($stmt, 3, 'capacity', DB2_PARAM_OUT);

      //Execute the stored procedure call
      if(!db2_execute($stmt))
      {
        return new DBError(DBError::DB_QUERY_EXECUTION_ERROR_CD, DBError::DB_QUERY_EXECUTION_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
      }
    }
    else
    {
      return new DBError(DBError::DB_QUERY_PREPARE_ERROR_CD, DBError::DB_QUERY_PREPARE_ERROR_MSG,
                   db2_stmt_error(), db2_stmt_errormsg());
    }

    return true;
  }

  /**
   * Builds the XQUERY statement to gather health indicator/alert information for a
   * specific type of object (database manager, database, tablespace container, or
   * tablespace).
   * @access public
   * @param string $db the name of the database for which health data will be gathered
   * @param string $lang the language code used to determine the description language
   * @param boolean $def the definition request flag to determine whether or not
   *                     to include the part of the XQUERY for gathering definitions
   * @param boolean $det the details request flag to determine whether or not to
   *                     include the part of the XQUERY for gathering health details
   * @param boolean $his the history request flag to determine whether or not to
   *                     include the part of the XQUERY for gathering health history data
   * @param string $object_type string the type of object to gather health data on
   *                                   (database|instance|container|tablespace)
   * @return string
   */
  public static function DBXQueryAssembleType($db, $lang, $def, $det, $his, $object_type)
  {
    //Gather the appropriate query/health UDF parameters based on object type
    $array = self::getByType($object_type);

    //Set the embedded error code to 'success' if the query succeeds
    $soa_error_code = DBError::DB_SUCCESS_ERROR_CD;

    //Set the embedded error message to 'success' if the query succeeds
    $soa_error_message = DBError::DB_SUCCESS_ERROR_MSG;

    //Get the timestamp at which the XQUERY was built by the Web Service Producer DB
    $timestamp = date('Y-m-d').'T'.date('h:i:s');

    //Exit if an invalid object type was used
    if($array == '')
      return $array;

    //Build the XQUERY statement as a PHP string (use escape sequences accordingly)
    $xsql = "
        VALUES(
          XMLSERIALIZE(
            XMLQUERY('
        let \$part1 := db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"info\",
                  INST_NAME
                )
              FROM SYSIBMADM.ENV_INST_INFO
              '')/text()
        let \$part2 := db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"state\",
                  ROLLED_UP_ALERT_STATE_DETAIL
                )
                FROM table ({$array['hig_fn']}) as t
                ORDER BY ROLLED_UP_ALERT_STATE DESC
                FETCH FIRST 1 ROWS ONLY
              '')/text()
        let \$part3 := db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"info\",
                  (sum(t1.pool_cur_size) + sum(t2.pool_cur_size))/1024.0/1024.0
                )
              FROM SYSIBMADM.SNAPAGENT_MEMORY_POOL as t1, SYSIBMADM.SNAPDB_MEMORY_POOL as t2
              '')/text()
        let \$part4 := db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"info\",
                  XMLATTRIBUTES
                  (
                    DB_SIZE/1024.0/1024.0 as \"database_size\",
                    DB_CAPACITY/1024.0/1024.0 as \"database_capacity\"
                  )
                )
              FROM SYSTOOLS.STMG_DBSIZE_INFO
              '')
        return <DB2Health_Report schemaVersion=\"1.0\" instance=\"{\$part1}\" database=\"$db\" highestAlertState=\"{\$part2}\" timestamp=\"$timestamp\">
          <InfoSet memory_usage=\"{round(\$part3)}\" database_size=\"{round(\$part4/@database_size)}\" database_capacity=\"{round(\$part4/@database_capacity)}\">
          {
            for \$a in db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"info\",
                  XMLATTRIBUTES
                  (
                    snapshot_timestamp as \"snapshot_timestamp\",
                    db_status as \"database_status\",
                    last_backup as \"last_backup\",
                    rows_read as \"rows_read\",
                    (rows_inserted + rows_updated) as \"rows_written\"
                  )
                )
              FROM TABLE(SNAP_GET_DB_V91(''''$db'''', -2)) AS DB
              '')
            return \$a/@*
          }
          {
            for \$a in db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"info\",
                  XMLATTRIBUTES
                  (
                    HOST_NAME as \"host_name\",
                    TOTAL_MEMORY as \"total_memory\"
                  )
                )
              FROM SYSIBMADM.ENV_SYS_INFO
              '')
            return \$a/@*
          }
          </InfoSet>
          <HIDefinitionSet>";

    //Append the health definition part of the XQUERY if requested
    if($def)
    {
      $xsql .= "
          {
            for \$def in
            db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"HIDefinition\",
                  XMLATTRIBUTES
                  (
                    t1.ID as \"hiIdentifier\",
                    t1.NAME as \"hiName\",
                    t1.SHORT_DESCRIPTION as \"hiShortDesc\",
                    t1.LONG_DESCRIPTION as \"hiLongDesc\",
                    t1.TYPE as \"hiType\",
                    t1.FORMULA as \"hiFormula\",
                    t1.UNIT as \"hiUnit\"
                  ),
                  XMLELEMENT
                  (
                    NAME \"HISettings\",
                    XMLATTRIBUTES
                    (
                      t2.SENSITIVITY as \"sensitivity\",
                      t2.EVALUATE as \"evaluate\",
                      t2.WARNING_THRESHOLD as \"warningThreshold\",
                      t2.ALARM_THRESHOLD as \"alarmThreshold\"
                    )
                  )
                )
              FROM table (health_get_ind_definition(''''$lang'''')) as t1,
              table (HEALTH_GET_ALERT_CFG(''''{$array['obj_cd']}'''', ''''G'''', '''''''', '''''''')) as t2
              WHERE t1.ID = t2.ID
            '')
            return \$def
          }";
    }

    $xsql .= "</HIDefinitionSet>
          <AlertSet>";

    //Append the health details part of the XQUERY if requested
    if($det)
    {
      $xsql .= "
          {
            for \$alert in
            db2-fn:sqlquery(''
              SELECT
                XMLELEMENT
                (
                  NAME \"HealthAlert\",
                  XMLATTRIBUTES
                  (
                    t.HI_ID as \"hiIdentifier\",
                    t.HI_ALERT_STATE_DETAIL as \"hiAlertState\",
                    t.HI_VALUE as \"hiValue\",
                    t.HI_TIMESTAMP as \"hiTimestamp\"
                  ),
                  XMLELEMENT
                  (
                    NAME \"DB2_Object\",
                    XMLATTRIBUTES
                    (
                      {$array['obj_nm']} as \"name\",
                      ''''{$array['obj_cd']}'''' as \"type\"
                      )
                    ),
                  XMLELEMENT
                  (
                    NAME \"HiFormulaValue\",
                      t.HI_FORMULA
                  ),
                  XMLELEMENT
                  (
                      NAME \"HiAdditionalInfo\",
                    t.HI_ADDITIONAL_INFO
                  )
                )
              FROM table ({$array['det_fn']}) as t
            '')
            return <HealthAlert>
              {\$alert/@*}
              {\$alert/*}
              <alertHistory>";

      //Append the health history part of the XQUERY if requested
      if($his)
      {
        $xsql .= "
              {
                for \$c in db2-fn:sqlquery(''
                  SELECT
                    XMLELEMENT
                    (
                      NAME \"alertHistoryData\",
                      XMLATTRIBUTES
                      (
                        t.HI_ID as \"hiIdentifier\",
                        {$array['obj_nm']} as \"object_name\",
                        t.HI_VALUE as \"hiValue\",
                        t.HI_TIMESTAMP as \"hiTimestamp\",
                        t.HI_ALERT_STATE_DETAIL as \"hiAlertState\",
                        t.HI_FORMULA as \"hiFormulaValue\"
                      )
                    )
                  FROM TABLE ({$array['his_fn']}) as t
                '')
                where \$c/@hiIdentifier = \$alert/@hiIdentifier and \$c/@object_name = \$alert/DB2_Object/@name
                return \$c
              }";
      }

      $xsql .= "      </alertHistory>
            </HealthAlert>
          }";

    }

    //Append the Embedded ErrorSet section to indicate success
    $xsql .=   "</AlertSet>
          <ErrorSet>
          <SOA_ERROR_CODE>$soa_error_code</SOA_ERROR_CODE>
          <SOA_ERROR_MESSAGE>$soa_error_message</SOA_ERROR_MESSAGE>
          </ErrorSet>
          </DB2Health_Report>
            ' RETURNING SEQUENCE) AS CLOB(2M)
            )
          )
        ";

    return $xsql;
  }

  /**
   * Builds the XQUERY statement to gather health indicator/alert information for ALL
   * object types (database manager, database, tablespace container, and tablespace).
   * @access public
   * @param string $db the name of the database for which health data will be gathered
   * @param string $lang the language code used to determine the description language
   * @param boolean $def the definition request flag to determine whether or not
   *                     to include the part of the XQUERY for gathering definitions
   * @param boolean $det the details request flag to determine whether or not to
   *                     include the part of the XQUERY for gathering health details
   * @param boolean $his the history request flag to determine whether or not to
   *                     include the part of the XQUERY for gathering health history data
   * @return string
   */
  public static function DBXQueryAssembleAll($db, $lang, $def, $det, $his)
  {
    //Set the embedded error code to 'success' if the query succeeds
    $soa_error_code = DBError::DB_SUCCESS_ERROR_CD;

    //Set the embedded error message to 'success' if the query succeeds
    $soa_error_message = DBError::DB_SUCCESS_ERROR_MSG;

    //Get the timestamp at which the XQUERY was built by the Web Service Producer DB
    $timestamp = date('Y-m-d').'T'.date('h:i:s');

    //Build the XQUERY statement as a PHP string (use escape sequences accordingly)
    $xsql = "
        VALUES(
          XMLSERIALIZE(
            XMLQUERY('
              let \$part1 := db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"info\",
                        INST_NAME
                      )
                    FROM SYSIBMADM.ENV_INST_INFO
                    '')/text()
                let \$part2 := db2-fn:sqlquery(''
                  SELECT
                    XMLELEMENT
                    (
                      NAME \"state\",
                      ROLLED_UP_ALERT_STATE_DETAIL
                    )
                  FROM

                    table(
                        SELECT DISTINCT ROLLED_UP_ALERT_STATE, ROLLED_UP_ALERT_STATE_DETAIL FROM table(health_db_info('''''''',-1)) as t UNION
                        SELECT DISTINCT ROLLED_UP_ALERT_STATE, ROLLED_UP_ALERT_STATE_DETAIL FROM table(health_cont_info('''''''',-1)) as t UNION
                        SELECT DISTINCT ROLLED_UP_ALERT_STATE, ROLLED_UP_ALERT_STATE_DETAIL FROM table(health_tbs_info('''''''',-1)) as t UNION
                        SELECT DISTINCT ROLLED_UP_ALERT_STATE, ROLLED_UP_ALERT_STATE_DETAIL FROM table(health_dbm_info(-1)) as t
                        ) as temp
                      ORDER BY temp.ROLLED_UP_ALERT_STATE DESC
                      FETCH FIRST 1 ROWS ONLY
                      '')/text()

              let \$part3 := db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"info\",
                        (sum(t1.pool_cur_size) + sum(t2.pool_cur_size))/1024.0/1024.0
                      )
                    FROM SYSIBMADM.SNAPAGENT_MEMORY_POOL as t1, SYSIBMADM.SNAPDB_MEMORY_POOL as t2
                    '')/text()
              let \$part4 := db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"info\",
                        XMLATTRIBUTES
                        (
                          DB_SIZE/1024.0/1024.0 as \"database_size\",
                          DB_CAPACITY/1024.0/1024.0 as \"database_capacity\"
                        )
                      )
                    FROM SYSTOOLS.STMG_DBSIZE_INFO
                    '')
              return <DB2Health_Report schemaVersion=\"1.0\" instance=\"{\$part1}\" database=\"$db\" highestAlertState=\"{\$part2}\" timestamp=\"$timestamp\">
                <InfoSet memory_usage=\"{round(\$part3)}\" database_size=\"{round(\$part4/@database_size)}\" database_capacity=\"{round(\$part4/@database_capacity)}\">
                {
                  for \$a in db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"info\",
                        XMLATTRIBUTES
                        (
                          snapshot_timestamp as \"snapshot_timestamp\",
                          db_status as \"database_status\",
                          last_backup as \"last_backup\",
                          rows_read as \"rows_read\",
                          (rows_inserted + rows_updated) as \"rows_written\"
                        )
                      )
                    FROM TABLE(SNAP_GET_DB_V91(''''$db'''', -2)) AS DB
                    '')
                  return \$a/@*
                }
                {
                  for \$a in db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"info\",
                        XMLATTRIBUTES
                        (
                          HOST_NAME as \"host_name\",
                          TOTAL_MEMORY as \"total_memory\"
                        )
                      )
                    FROM SYSIBMADM.ENV_SYS_INFO
                    '')
                  return \$a/@*
                }
                </InfoSet>
                <HIDefinitionSet>";

    //Append the health definition part of the XQUERY if requested
    if($def)
    {
      $xsql .= "
                {
                  for \$def in db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"HIDefinition\",
                        XMLATTRIBUTES
                        (
                          t1.ID as \"hiIdentifier\",
                          t1.NAME as \"hiName\",
                          t1.SHORT_DESCRIPTION as \"hiShortDesc\",
                          t1.LONG_DESCRIPTION as \"hiLongDesc\",
                          t1.TYPE as \"hiType\",
                          t1.FORMULA as \"hiFormula\",
                          t1.UNIT as \"hiUnit\"
                        ),
                        XMLELEMENT
                        (
                          NAME \"HISettings\",
                          XMLATTRIBUTES
                          (
                            t2.SENSITIVITY as \"sensitivity\",
                            t2.EVALUATE as \"evaluate\",
                            t2.ALARM_THRESHOLD as \"alarmThreshold\",
                            t2.WARNING_THRESHOLD as \"warningThreshold\"
                          )
                        )
                      )
                    FROM table (health_get_ind_definition(''''$lang'''')) as t1,
                    table(
                      SELECT ID, EVALUATE, SENSITIVITY, ALARM_THRESHOLD, WARNING_THRESHOLD FROM table(HEALTH_GET_ALERT_CFG(''''TS'''', ''''G'''', '''''''','''''''')) as t UNION
                      SELECT ID, EVALUATE, SENSITIVITY, ALARM_THRESHOLD, WARNING_THRESHOLD FROM table(HEALTH_GET_ALERT_CFG(''''TSC'''', ''''G'''', '''''''','''''''')) as t UNION
                      SELECT ID, EVALUATE, SENSITIVITY, ALARM_THRESHOLD, WARNING_THRESHOLD FROM table(HEALTH_GET_ALERT_CFG(''''DBM'''', ''''G'''', '''''''','''''''')) as t UNION
                      SELECT ID, EVALUATE, SENSITIVITY, ALARM_THRESHOLD, WARNING_THRESHOLD FROM table(HEALTH_GET_ALERT_CFG(''''DB'''', ''''G'''', '''''''','''''''')) as t
                    ) as t2
                    WHERE t1.ID = t2.ID
                  '')
                  return \$def
                }";
    }

    $xsql .= "
                </HIDefinitionSet>
                <AlertSet>";

    //Append the health details part of the XQUERY if requested
    if($det)
    {
      $xsql .= "
                {
                for \$alert in
                    db2-fn:sqlquery(''
                    SELECT
                      XMLELEMENT
                      (
                        NAME \"HealthAlert\",
                        XMLATTRIBUTES
                        (
                          temp.HI_ID as \"hiIdentifier\",
                          temp.HI_ALERT_STATE_DETAIL as \"hiAlertState\",
                          temp.HI_VALUE as \"hiValue\",
                          temp.HI_TIMESTAMP as \"hiTimestamp\"
                        ),
                        XMLELEMENT
                        (
                          NAME \"DB2_Object\",
                          XMLATTRIBUTES
                          (
                            temp.OBJECT_NAME as \"name\"
                          )
                        ),
                        XMLELEMENT
                        (
                          NAME \"HiFormulaValue\",
                          temp.HI_FORMULA
                        )
                      )
                    FROM
                    table(
                      SELECT HI_ID, DB_NAME as OBJECT_NAME, HI_ALERT_STATE_DETAIL,HI_VALUE,HI_TIMESTAMP,HI_FORMULA FROM table(health_db_hi('''''''',-1)) as t UNION
                      SELECT HI_ID, SERVER_INSTANCE_NAME as OBJECT_NAME, HI_ALERT_STATE_DETAIL,HI_VALUE,HI_TIMESTAMP,HI_FORMULA FROM table(health_dbm_hi(-1)) as t UNION
                      SELECT HI_ID, TABLESPACE_NAME as OBJECT_NAME, HI_ALERT_STATE_DETAIL,HI_VALUE,HI_TIMESTAMP,HI_FORMULA FROM table(health_tbs_hi('''''''',-1)) as t UNION
                      SELECT HI_ID, CONTAINER_NAME as OBJECT_NAME, HI_ALERT_STATE_DETAIL,HI_VALUE,HI_TIMESTAMP,HI_FORMULA FROM table(health_cont_hi('''''''',-1)) as t
                    ) as temp
                    '')
                  return <HealthAlert>
                    {\$alert/@*}
                    <DB2_Object name=\"{\$alert/DB2_Object/@name}\">
                    {
                      for \$k in db2-fn:sqlquery(''
                        SELECT
                          XMLELEMENT
                          (
                            NAME \"info\",
                            XMLATTRIBUTES
                            (
                              temp.ID as \"id\",
                              temp.OBJECTTYPE as \"type\"
                            )
                          )
                        FROM
                        table(
                          SELECT ID, OBJECTTYPE FROM table(HEALTH_GET_ALERT_CFG(''''DB'''', ''''G'''', '''''''', '''''''')) as t UNION
                          SELECT ID, OBJECTTYPE FROM table(HEALTH_GET_ALERT_CFG(''''DBM'''', ''''G'''', '''''''', '''''''')) as t UNION
                          SELECT ID, OBJECTTYPE FROM table(HEALTH_GET_ALERT_CFG(''''TS'''', ''''G'''', '''''''', '''''''')) as t UNION
                          SELECT ID, OBJECTTYPE FROM table(HEALTH_GET_ALERT_CFG(''''TSC'''', ''''G'''', '''''''', '''''''')) as t
                        ) as temp
                      '')
                      where \$k/@id = \$alert/@hiIdentifier
                      return \$k/@type
                    }
                    </DB2_Object>
                    {\$alert/HiFormulaValue}
                    <HiAdditionalInfo>
                    {
                      for \$d in
                        (
                        db2-fn:sqlquery(''
                        SELECT
                        XMLELEMENT
                        (
                          NAME \"info\",
                          XMLATTRIBUTES
                          (
                            t.HI_ID as \"id\",
                            t.TABLESPACE_NAME as \"obj_nm\"
                          ),
                          XMLELEMENT
                          (
                            NAME \"hiAdditionalInfo\",
                            t.HI_ADDITIONAL_INFO
                          )
                        )
                        FROM table(health_tbs_hi('''''''',-1)) as t
                        ''),
                        db2-fn:sqlquery(''
                        SELECT
                        XMLELEMENT
                        (
                          NAME \"info\",
                          XMLATTRIBUTES
                          (
                            t.HI_ID as \"id\",
                            t.CONTAINER_NAME as \"obj_nm\"
                          ),
                          XMLELEMENT
                          (
                            NAME \"hiAdditionalInfo\",
                            t.HI_ADDITIONAL_INFO
                          )
                        )
                        FROM table(health_cont_hi('''''''',-1)) as t
                        ''),
                        db2-fn:sqlquery(''
                        SELECT
                        XMLELEMENT
                        (
                          NAME \"info\",
                          XMLATTRIBUTES
                          (
                            t.HI_ID as \"id\",
                            t.DB_NAME as \"obj_nm\"
                          ),
                          XMLELEMENT
                          (
                            NAME \"hiAdditionalInfo\",
                            t.HI_ADDITIONAL_INFO
                          )
                        )
                        FROM table(health_db_hi('''''''',-1)) as t
                        ''),
                        db2-fn:sqlquery(''
                        SELECT
                        XMLELEMENT
                        (
                          NAME \"info\",
                          XMLATTRIBUTES
                          (
                            t.HI_ID as \"id\",
                            t.SERVER_INSTANCE_NAME as \"obj_nm\"
                          ),
                          XMLELEMENT
                          (
                            NAME \"hiAdditionalInfo\",
                            t.HI_ADDITIONAL_INFO
                          )
                        )
                        FROM table(health_dbm_hi(-1)) as t
                        '')
                        )
                      where \$d/@id = \$alert/@hiIdentifier and \$d/@obj_nm = \$alert/DB2_Object/@name
                      return \$d/hiAdditionalInfo/text()
                    }
                    </HiAdditionalInfo>
                    <alertHistory>";

      //Append the health history part of the XQUERY if requested
      if($his)
      {
        $xsql .= "
                    {
                      for \$c in db2-fn:sqlquery(''
                        SELECT
                          XMLELEMENT
                          (
                            NAME \"alertHistoryData\",
                            XMLATTRIBUTES
                            (
                              temp.HI_ID as \"hiIdentifier\",
                              temp.OBJECT_NAME as \"object_name\",
                              temp.HI_VALUE as \"hiValue\",
                              temp.HI_TIMESTAMP as \"hiTimestamp\",
                              temp.HI_ALERT_STATE_DETAIL as \"hiAlertState\",
                              temp.HI_FORMULA as \"hiFormulaValue\"
                            )
                          )
                        FROM
                        table(
                          SELECT HI_ID, DB_NAME as OBJECT_NAME, HI_VALUE, HI_TIMESTAMP, HI_ALERT_STATE_DETAIL, HI_FORMULA FROM table(health_db_hi_his('''''''',-1)) as t UNION
                          SELECT HI_ID, SERVER_INSTANCE_NAME as OBJECT_NAME, HI_VALUE, HI_TIMESTAMP, HI_ALERT_STATE_DETAIL, HI_FORMULA FROM table(health_dbm_hi_his(-1)) as t UNION
                          SELECT HI_ID, TABLESPACE_NAME as OBJECT_NAME, HI_VALUE, HI_TIMESTAMP, HI_ALERT_STATE_DETAIL, HI_FORMULA FROM table(health_tbs_hi_his('''''''',-1)) as t UNION
                          SELECT HI_ID, CONTAINER_NAME as OBJECT_NAME, HI_VALUE, HI_TIMESTAMP, HI_ALERT_STATE_DETAIL, HI_FORMULA FROM table(health_cont_hi_his('''''''',-1)) as t
                        ) as temp
                        '')
                      where \$c/@hiIdentifier = \$alert/@hiIdentifier and \$c/@object_name = \$alert/DB2_Object/@name
                      return \$c
                    }";
      }

      $xsql .= "
                    </alertHistory>
                    </HealthAlert>
                  }";
    }

    //Append the Embedded ErrorSet section to indicate success
    $xsql .= "
          </AlertSet>
          <ErrorSet>
          <SOA_ERROR_CODE>$soa_error_code</SOA_ERROR_CODE>
          <SOA_ERROR_MESSAGE>$soa_error_message</SOA_ERROR_MESSAGE>
          </ErrorSet>
          </DB2Health_Report>' RETURNING SEQUENCE) AS CLOB(2M)))
        ";

    return $xsql;
  }
}

?>