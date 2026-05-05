---
title: Troubleshooting
sidebar_label: Troubleshooting
description: "Troubleshooting guide for the OpCon MFT ProxyAgent framework, SMANetCom communication, and OpCon database table references."
tags:
  - Reference
  - System Administrator
---

# Troubleshooting

## What is it?

The Troubleshooting reference covers log files, job inspection tools, and database table details used when diagnosing OpCon MFT issues.

- Use this when investigating why an OpCon MFT job failed to start or did not return a status
- Use this when reading the SMAApiAgentNetcom.log to trace communication between SMANetCom and the OpCon MFT Agent
- Use this when a support team member needs to understand OpCon database table entries related to OpCon MFT jobs

OpCon MFT communicates through the SMANetCom ProxyAgent framework — there is no traditional OpCon Agent involved. SMANetCom communicates directly with the OpCon MFT Agent service through Rest-API calls. Job status and job logs are retrieved directly from the OpCon MFT Agent; they are not stored within the ProxyAgent framework.

## How a job runs

When OpCon starts an OpCon MFT job, the following sequence occurs:

1. OpCon checks whether the OpCon MFT Agent is active (**UP**).
2. If the agent is active, OpCon sends a TX1 job start message to the SMAMftAgentProxy.
3. The SMAMftAgentProxy converts the message into steps and submits a job start request to the OpCon MFT Agent Rest-API.
4. If the RunId in the message is `0` or `null`, a new job is created. If the RunId is non-zero, the existing failed job is restarted from the failed step.
5. The OpCon MFT Agent returns a RunId, which is stored in the OpCon database for use if the job needs to be restarted.
6. The SMAMftAgentProxy monitors the running job and returns status updates to OpCon.
7. When the job completes successfully, the RunId is set to `0`.

## Retrieving job information

Job details and step logs can be viewed directly from the OpCon MFT Agent web server. This requires a local system account for the server where the OpCon MFT Agent is installed — not an OpCon user account.

![OpCon MFT Agent Details](../static/img/OpCon MFT-agent-details.png)

To view job information, complete the following steps:

1. In Solution Manager, select the associated OpCon MFT Agent details.
2. Select the **OpCon MFT Agent Settings** tab and then select **Agent Jobs**.
3. Enter the credentials for the OpCon MFT Agent web server in the pop-up window. The Endpoints page for the OpCon MFT Agent is displayed.
4. Select **JOBS** and then select the job group associated with the job (for example, **GENERAL**). A list of jobs is displayed.
5. Select the job. The job name consists of the group name and the OpCon job name minus any special characters (for example, department name `JMFT002-04` becomes `JMFT00204`).

![Agent Job Information](../static/img/agent-job-information-1.png)

Select the **Started** value to view step-by-step execution details, or select **Download Logs** to save the full log package.

![Agent Job Step Information](../static/img/agent-job-information-2.png)

The step information shows the job name, the OpCon MFT Agent jobId, and the result of each step for each file processed.

When **Download Logs** is selected, a message appears at the bottom of the screen. Select **Open** to view the information immediately, or **Save** to retain it for support purposes.

![Agent Job Logs](../static/img/agent-job-information-3.png)

The downloaded log package contains three files:

| File | Contents |
|---|---|
| **[Content_Type].xml** | Package metadata |
| **271.ini** | Generated job definition showing all step configurations (271 is the OpCon MFT Agent jobId) |
| **271_script.log** | Trace log for the task execution |

<details>
<summary>View example job log output</summary>

```
GroupName    : General
JobName      : JMFT00204
OpCon JobId  : 0000000312
MFT JobId    : 271
Start Time   : 03/01/2023 07:56:36
End Time     : 03/01/2023 07:56:56
Last Message : Completed successfully
Result       : 0
-----------------------------------
Job Step Information --------------
------------
Step Name   get
Result      0
Timestamp   03/01/2023 07:56:46
StepDetails RMA01?.dat geted to RMA010.dat
Source File RMA01?.dat
Target File C:\Program Files\Robo-FTP 3.13\ProgramData\FrameWork\data\General\JMFT00204\271\get\intermediate\RMA010.dat
------------
------------
Step Name   compress
Result      0
Timestamp   03/01/2023 07:56:47
StepDetails RMA010.dat compressed to RMA.zip
Source File C:\Program Files\Robo-FTP 3.13\ProgramData\FrameWork\data\General\JMFT00204\271\get\files\RMA010.dat
Target File RMA.zip
------------
------------
Step Name   encrypt
Result      0
Timestamp   03/01/2023 07:56:55
StepDetails RMA.zip encrypted to RMA.zip.pgp
Source File C:\Program Files\Robo-FTP 3.13\ProgramData\FrameWork\data\General\JMFT00204\271\compress\files\RMA.zip
Target File RMA.zip.pgp
------------
------------
Step Name   put
Result      0
Timestamp   03/01/2023 07:56:55
StepDetails RMA.zip.pgp puted to C:\TestData\output\RMA.zip.pgp
Source File C:\Program Files\Robo-FTP 3.13\ProgramData\FrameWork\data\General\JMFT00204\271\encrypt\files\RMA.zip.pgp
Target File C:\TestData\output\RMA.zip.pgp
------------
-----------------------------------
```

</details>

<details>
<summary>View example 271.ini step definition file</summary>

```
[getStepDetails]
;
step_kind=get
specification=RMA01?.dat
flat=False
archive_files=False
persistent_source=False
include_directories=False
preserve_paths=False
endpoint=SVR2
report_on_error=True
skip_email_on_error=True
continue_on_error=False
error1164_report_on_error=True
error1164_skip_email_on_error=True
error1164_continue_on_error=False

[compressStepDetails]
;
step_kind=compress
specification=*
target_file=RMA.zip
archive_files=False
report_on_error=True
skip_email_on_error=True
continue_on_error=False
error1164_report_on_error=True
error1164_skip_email_on_error=True
error1164_continue_on_error=False

[encryptStepDetails]
;
step_kind=encrypt
specification=*
archive_files=False
report_on_error=True
skip_email_on_error=True
continue_on_error=False
error1164_report_on_error=True
error1164_skip_email_on_error=True
error1164_continue_on_error=False
key=SAT-312 (Test Key) <bvanhinsbergen@smatechnologies.com>
cipher=AES
signing_key=SAT-312 (Test Key) <bvanhinsbergen@smatechnologies.com>

[putStepDetails]
;
step_kind=put
specification=*
flat=False
archive_files=False
persistent_source=False
include_directories=False
preserve_paths=True
overwrite=True
endpoint=SVR1
report_on_error=True
skip_email_on_error=True
continue_on_error=False
error1164_report_on_error=True
error1164_skip_email_on_error=True
error1164_continue_on_error=False
```

</details>

## Log files

The **SMAApiAgentNetcom.log** file records all communication between the AgentProxy framework and the OpCon MFT Agent. Check this log first when a job fails to start or an agent goes to a down state. The file is written by the SMANetCom module and is located in the SMANetCom log directory within the OpCon installation.

Key things to look for in the log:

- `UpdateAgentStatus` lines confirm whether the agent is being seen as Up or Down
- `TX4Service(UpdateSam)` lines confirm the agent responded to the availability check
- `ApiAgentJobService(SendTx1)` lines show the job start request being submitted
- `Tx12Service(StartJob)` confirms the TX1 was dispatched to the agent

<details>
<summary>View example SMAApiAgentNetcom.log output</summary>

```
08/02/2023 08:08:54.434    ApiAgentSqlConfigService(UpdateAgentStatus):Update network status to Up for LocalMft.
08/02/2023 08:08:55.230    Proxy (InitialStatus): TX4 status received for OpConMft agent MFT001
08/02/2023 08:08:55.230    TX4Service(UpdateSam): In the callback for MFT001; True.
08/02/2023 08:08:55.230    ApiAgentSqlConfigService(UpdateAgentStatus):Update network status to Up for MFT001.
08/02/2023 08:08:55.230    TX4Service(UpdateSam): Message sent to SAM by MFT001: MFT001                                                          00050+000000000:0000:         OpConMFT 3.13    080855N<D></D>
08/02/2023 08:08:55.688    ApiAgentJobService(SendTx1): Request: MachineName = MFT002; JobId = JMFT00101        0000000400; Fields = FC = 1, S = 1, V = 20230113; FC = 2, S = 1, V = SCHMFT; ...
08/02/2023 08:08:55.688    Tx12Service(StartJob): Task to send TX1 started for MFT002
08/02/2023 08:08:55.689    Proxy (StartJob): Sending TX1 to OpConMft agent MFT002
08/02/2023 08:08:55.794    Proxy (InitialStatus): TX4 status received for OpConMft agent MFT002
08/02/2023 08:08:55.794    TX4Service(UpdateSam): In the callback for MFT002; True.
08/02/2023 08:08:55.795    ApiAgentSqlConfigService(UpdateAgentStatus):Update network status to Up for MFT002.
```

</details>

## Internal components reference

This section describes the internal software modules involved in OpCon MFT job processing. This information is primarily useful for support escalations and advanced diagnostics.

<details>
<summary>View internal component details</summary>

### SMAApiClient Module

The SMAApiClient module provides a generic Rest-API capability that forms the basis of all requests passed between the ProxyAgent framework and the OpCon MFT Agent.

### SMAApiClientModels Module

The SMAApiClientModels module provides generic definitions for establishing Rest-API connections as well as specific libraries to support Rest-API requests to the OpCon MFT Agent. It also includes the routines that generate the various steps from the OpCon task definitions which are passed to the OpCon MFT Agent.

### SMANetCom AgentProxy Framework

The AgentProxy framework is part of SMANetCom and is responsible for passing requests to the associated AgentProxy.

SMANetCom retrieves TX1 and TX2 messages from the MSGS_TO_SAM table and checks whether these messages are for AgentProxies. If they are, the AgentProxy framework delivers the messages to the associated AgentProxy. Returned messages are placed in the MSGS_TO_SAM table by the AgentProxy framework.

During startup, the AgentProxy framework extracts the agent configuration from the OpCon database, creates a Rest-API client, and spawns the SMAMftAgentProxy. It then generates TX4 messages and submits these to the spawned AgentProxy. TXH heartbeat messages are also generated on a timed basis to confirm agent availability.

### SMAMftAgentProxy

The SMAMftAgentProxy receives TX messages from SMANetCom and transforms them into Rest-API requests for the OpCon MFT Agent:

| Message | Rest-API call | Purpose |
|---|---|---|
| %%TX1 | `/api/job/start/{groupName}.{jobName}/withtag/{tagName}` | Start or restart a job |
| %%TX2 | `/api/run/status/{RunId}` | Get job status |
| %%TX4 | `api/agent/info` | Check agent availability on startup |
| %%TXH | `api/agent/info` | Periodic heartbeat check |

Supported job steps: get, put, name, compress, decompress, encrypt, decrypt.

### SMALSAMDataRetriever

The SMALSAMDataRetriever retrieves job logs from the OpCon MFT Agent on demand. When a job starts, a JORS entry is written to the SMASTER_AUX table in the format `OpCon MFT,MFT001,JMFT00101_0000000050`, where:

- **OpCon MFT** is the job type
- **MFT001** is the OpCon MFT Agent name
- **JMFT00101_0000000050** is the OpCon JobID (the numeric portion is used to look up the associated OpCon MFT Agent jobId)

</details>

## Database table reference

This section is intended for support personnel who need to inspect OpCon database tables related to OpCon MFT jobs.

<details>
<summary>View database table details</summary>

### MACH Table

The OpCon MFT Agent uses a port number greater than 50000. Because the MACH table field has a maximum value of 32000, the port is stored as a negative number and converted back to the correct value at runtime (for example, port 50405 is stored as -15131). This is expected behavior.

### LSAMTYPES Table

The OpCon MFT Agent is registered in the LSAMTYPES table as **LSAMTYPEID** 25 with **LSAMTYPDESC** OpCon MFT.

### LSAMTYPES_AUX Table

For JORS (job log retrieval) to work, the following two entries must be present:

| LSAMTYPEID | LAFC | LASEQNO | LAVALUE |
|---|---|---|---|
| 25 | 62 | 1 | True |
| 25 | 120 | 1 | True |

### JMASTER_AUX Table

During job definition, the **Department** name is saved as the job group name with special characters removed, stored in field code 25002.

Field codes 25018 and 25019 are HTML-encoded — spaces and @ signs are not visible in the database but are visible in the user interface. These fields are decoded at execution time.

### SMASTER_AUX Table

Field codes 25018 and 25019 are HTML-encoded (same as JMASTER_AUX).

During execution, the JORS indicator is stored in field code 62, and the OpCon Agent jobId is stored in field code 25001. If the job completes successfully, field code 25001 is set to `0`; otherwise it retains the jobId for use when restarting the failed task.

</details>

## FAQs

**Where are job logs stored?**

Job logs are not stored within the ProxyAgent framework. They are retrieved on demand from the OpCon MFT Agent through the Rest-API. Use the **Agent Jobs** option in Solution Manager to access them, or check the SMALSAMDataRetriever via the JORS entry in the SMASTER_AUX table.

**Where is the SMAApiAgentNetcom.log located?**

The file is written by the SMANetCom module and is located in the SMANetCom log directory within the OpCon installation directory.

**What does it mean when the OpCon MFT Agent port number appears as a negative value in the MACH table?**

Port numbers above 32000 exceed the maximum value the MACH table field can store. The OpCon software saves the port as a negative number and converts it back to the correct value before use. This is expected behavior and does not indicate a configuration error.

**Related topics:**

- [Architecture](./architecture.md)
- [MFT Agent installation](./agent-installation.md)
- [FAQs](./faqs.md)
