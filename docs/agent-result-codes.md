---
title: Task Result Codes
sidebar_label: Task Result Codes
description: "Reference for the numeric result codes that OpCon MFT Agent tasks and task steps return, grouped by category, with the meaning of each code."
tags:
  - Reference
  - Automation Engineer
  - System Administrator
  - Operations Staff
---

# Task Result Codes

## What is it?

Every OpCon MFT Agent task and every task step ends with a numeric result code. A result code of `0` means success. Any other value identifies a problem that the task or step reported.

- Use this when an OpCon MFT job fails and you need to know what the result code means
- Use this when you decide which failures a restart is likely to resolve

This page lists the result codes that apply to file transfer, compression, encryption, and endpoint access. The codes are sorted by category and then by number.

## How result codes work

The OpCon MFT Agent runs each step of a task in order. When a step finishes, the agent records the result code of that step. When a task starts and runs its steps, a step that returns a code other than `0` makes the agent stop the task and reports that code as the result of the task. The result of the failed step is the result of the task. OpCon then applies the failure criteria of the job to the result. For details, see [Failure criteria in OpCon](#failure-criteria-in-opcon).

Before the agent moves any files, it checks the configuration of each step. Problems such as an invalid step configuration or a path that is not valid can therefore appear before the first file is processed.

The job log shows the result code for the task and for each step. To view the log, see [Retrieving job information](./trouble-shooting.md#retrieving-job-information).

:::note
OpCon sets the on-error options of every step when it creates the task. You cannot change them in an OpCon MFT job. Every step reports its error and stops the task on a non-zero result, and the remaining steps do not run. Some codes, such as `1221`, are recorded for a file without failing the step. The notes in the tables describe these cases.
:::

A failed task restarts from the failed step. For details, see the [Task Definitions](./agent-task-definitions.md) FAQs.

## Results that are not step result codes

In the following cases, the result that OpCon receives does not come from a failed step.

| Case | Result in OpCon | Notes |
|---|---|---|
| The task does not start on the agent | The HTTP status code that the OpCon MFT Agent returned, or `1` if no status code is available | No step runs. OpCon does not apply the failure criteria of the job. |
| The run was canceled | `41` | |
| The agent's scheduler stopped during the run | `94` | |
| The agent could not create its main window | `170` | Contact support. |
| The agent's scheduler encountered an internal error while it ran the task | `-1` | |
| The task fails while it prepares to run, before any step starts | The result code of the setup error | Examples are an inaccessible working directory or a step definition that cannot be loaded. |

A step can also show a non-zero **Result** in the job log without failing. For details, see code `1221` in [File transfers](#file-transfers).

## Failure criteria in OpCon

The OpCon MFT Agent reports the result code of a task to OpCon. OpCon then decides whether the job finished successfully or failed by comparing the result code with the **Exit Codes** failure criteria on the job. Solution Manager requires at least one criterion for every OpCon MFT job.

A new OpCon MFT job starts with one criterion: an exit code that is not equal to `0` is a failure. By default, any result code other than `0` fails the job.

Each criterion contains the following values:

| Value | Description |
|---|---|
| Operator | How OpCon compares the result code with the value: equal to, not equal to, greater than, less than, greater than or equal to, less than or equal to, or a range |
| Value | A whole number to compare with the result code. A range also has an end value. |
| Result | **Fail** or **Finish OK** |
| Join | **and** or **or**, which combines a criterion with the next one |

To treat a result code as a normal finish, add the code to the criteria. For example, to finish the job normally when the **get** step finds no files, set the first criterion to equal to `0` with a result of **Finish OK**. Then add a second criterion that is joined with **or** and is equal to `1164`. The job finishes OK for `0` and `1164` and fails for every other result code.

:::note
Failure criteria change only how OpCon classifies the job. The agent still stops the task when a step returns a code other than `0`. In the previous example, the steps that follow the **get** step do not run.
:::

## Success

| Code | Description |
|---|---|
| `0` | The task or step completed successfully. No error occurred. |

## Task and step handling

These codes report problems with how the task or step is defined.

| Code | Description | Notes |
|---|---|---|
| `1100` | Invalid argument | A **get** or **put** step that uses a local endpoint returns this code when the **File Path** is an absolute path that is not within the endpoint path. A **get** step also returns this code when its source options conflict. The **Retain Source Files** and **Reprocess Files** fields are mutually exclusive. |
| `1120` | Registry values not found, or the step or its configuration is not valid | In an OpCon MFT task, the agent returns this code when it cannot find the step type or when the step configuration is not valid, such as a missing site, path, or rename pattern. |
| `1164` | No file found | A **get** step returns this code when no files that match the **File Filter** are found before the **Timeout** period ends. A **put** step to a remote endpoint returns this code when the file set is empty. See [Source](./agent-task-definitions.md#source). |
| `1165` | No default site defined | A **get** or **put** step returns this code when the selected endpoint is not a local endpoint or a remote endpoint. |

:::note
The generated step definition includes separate on-error options for code `1164`. These options start with `error1164_`. OpCon sets them to the same values as the other on-error options, so code `1164` also stops the task. For an example, see the example 271.ini step definition file in [Retrieving job information](./trouble-shooting.md#retrieving-job-information).
:::

## Files and directories

These codes report problems when the agent reads, writes, or locates files and directories on a local endpoint or in the working directory of the task.

| Code | Description | Notes |
|---|---|---|
| `1003` | Cannot open file | |
| `1011` | Wildcard characters are not allowed in the file name | |
| `1014` | Invalid file or path name | Confirm that the account that runs the OpCon MFT Agent can access the directory. |
| `1018` | File copy canceled | |
| `1020` | File could not be renamed | |
| `1021` | File could not be deleted | A **get** step from a remote endpoint returns this code when **Retain Source Files** is False and the source file still exists on the endpoint after the agent retrieves it. |
| `1022` | File could not be copied | |
| `1053` | No files found matching the wildcard pattern | The **compress**, **decompress**, **encrypt**, **decrypt**, and **name** steps, and a **put** step to a local endpoint, return this code when the file set they receive is empty. |
| `1055` | File not found | |
| `1062` | Relative paths are not allowed in the command | |
| `1063` | File write error | |
| `1069` | File read error | |
| `1074` | File auto-naming failed | |
| `1076` | No buffers available | |
| `1126` | File checksums did not match | The file integrity check failed. |
| `1127` | Requested file permission is not available | The agent cannot write to the file or directory. |
| `1128` | Requested file permission is not available | The agent cannot read the file or directory. |
| `1129` | Expected a file but found a directory | |
| `1130` | Cannot access the local directory | Confirm that the account that runs the OpCon MFT Agent can access the directory. |
| `1131` | Expected a directory but found a file | |
| `1167` | Cannot access or create the local folder or the directory on the server | |
| `1168` | Relative path names are not allowed here | |

## Remote endpoint connections

These codes report problems when the agent connects to, signs on to, or communicates with a remote endpoint.

| Code | Description | Notes |
|---|---|---|
| `1024` | A connection is already open | |
| `1025` | No connection is open | |
| `1030` | The connection time-out expired | |
| `1036` | The connection was already established | |
| `1038` | The connection was disconnected | |
| `1042` | The connection attempt was canceled | |
| `1057` | The connection dropped | |
| `1124` | The command is not supported with the current site type | |
| `1136` | The server was disconnected | |
| `1138` | The server response does not comply with the protocol | |
| `1139` | The operation timed out | |
| `1140` | Log on failed because of an incorrect protocol | The agent detected an FTP server. |
| `1141` | Log on failed because of an incorrect protocol | The agent detected an SFTP server. |
| `1149` | The connection is busy | |
| `1150` | The remote server refused the connection | |
| `1151` | No route to the server, or the DNS lookup failed | |
| `1152` | The connection to the site failed | |
| `1153` | An FTP connection is already established | |
| `1162` | Log on failed | The user name or password is missing or not valid. |
| `1163` | Cannot log on because the user name is missing | |
| `1169` | TLS certificate problem | Includes a problem with the host certificate or the key fingerprint. |
| `1175` | Authorization not found | |
| `1180` | An internal thread failed to start | |
| `1181` | The no-activity time-out expired during a file send or receive | |
| `1220` | The REST command is not supported by the site | |
| `1260` | The SSH or TLS components are not available | |
| `1261` | The TLS or SSL handshake failed | |
| `1400` | The TLS certificate was not found in the certificate store | |
| `1401` | The TLS certificate file does not match the required format | |
| `1800` | Could not parse the directory listing because the format is unexpected | |
| `1900` | Could not resolve the proxy address | |

## File transfers

These codes report problems while the agent sends or receives a file.

| Code | Description | Notes |
|---|---|---|
| `1046` | File read error. The agent canceled the transmission. | |
| `1050` | File transmission error | |
| `1054` | Transmission canceled | |
| `1058` | A receive operation is already in progress | The data channel is busy. |
| `1059` | The file receive operation failed | |
| `1077` | Receive canceled | |
| `1221` | The file on the server is newer | A **get** step from a remote endpoint handles codes `1221`, `1222`, `1226`, and `1227` as a changed-file condition. The agent records the code for the file in the job log, skips the file, and continues with the remaining files. The code does not fail the step. |
| `1222` | The file on the server is older | See code `1221`. |
| `1226` | The file on the server is larger | See code `1221`. |
| `1227` | The file on the server is smaller | See code `1221`. |

## Compression

These codes report problems in a **compress** or **decompress** step on zip files.

| Code | Description |
|---|---|
| `1255` | The zip component is missing |
| `1256` | Error updating or creating the zip file |
| `1257` | The zip file operation was canceled |
| `1258` | Zip file extraction error |
| `1259` | The zip file is empty |

:::note
The **decompress** step also handles `.gz`, `.z`, and `.bz2` files by running an external program. A failure in that case does not return codes `1255` through `1259`. This page does not list the codes for that case.
:::

## Encryption

These codes report problems in an **encrypt** or **decrypt** step. For information about keys, see [Encryption Definitions](./agent-encryption-definitions.md).

| Code | Description |
|---|---|
| `1270` | The PGP components are not available |
| `1271` | A user name, comment, or email address is required to identify the recipient of the encrypted file |
| `1272` | Cannot import PGP keys from this file |
| `1273` | The key file is not in a recognized format |
| `1274` | The key already exists in the keyring |
| `1275` | The PGP import operation failed |
| `1276` | The PGP keyring file cannot be created |
| `1277` | The PGP encryption operation failed or was canceled |
| `1278` | The PGP decryption operation failed or was canceled |
| `1279` | The PGP component failed to initialize |
| `1280` | The key does not exist in the keyring |
| `1281` | The passphrase is not present |
| `1282` | The external GnuPG command failed or was canceled |
| `1283` | The key specification is ambiguous because more than one key matches |
| `1284` | Cannot validate the signature |
| `1285` | The PGP export operation failed |
| `1287` | The signature file was modified |
| `1288` | The signature algorithm is not supported |
| `1289` | The file was signed with an unknown key |

## Licensing

| Code | Description |
|---|---|
| `2000` | The product is not licensed, or the license was removed |

## Codes not listed

The underlying file transfer engine defines additional result codes for features that OpCon MFT Agent task steps do not use. Examples are modem and dial-up connections, printing, and database queries. This page does not list those codes.

## FAQs

**What does a result code of 0 mean?**

The task or step completed successfully. An OpCon MFT job finishes successfully with a result code of `0`, which is the default setting of the failure criteria. For details, see [Failure criteria in OpCon](#failure-criteria-in-opcon) and [Failure Criteria](./agent-task-definitions.md#failure-criteria).

**Can I change which result codes OpCon treats as a failure?**

Yes. Change the **Exit Codes** failure criteria on the OpCon MFT job. For details, see [Failure criteria in OpCon](#failure-criteria-in-opcon).

**Why did my task fail with code 1164 when the files arrive later?**

A **get** step waits for matching files only for the number of minutes in the **Timeout** field. The default is 1 minute. If no matching file arrives before the time-out ends, the step returns `1164` and the remaining steps do not run. Increase the **Timeout** value so it covers the latest expected arrival time. Then restart the task.

If code `1164` comes from a **put** step to a remote endpoint, the file set that the step received is empty. Check the earlier steps instead of the **Timeout** value.

**Which step failed?**

The job log lists a **Result** value for the task and for each step. The result of the task is the code of the step that stopped the task. Look for that code in the step rows. A step can also show a non-zero **Result** for a file that did not fail the step, such as code `1221`. For an example, see [Retrieving job information](./trouble-shooting.md#retrieving-job-information).

## Glossary

**Result code** — The numeric value that a task or task step returns when it ends. A value of `0` means success. Any other value means failure.

**Failure criteria** — The rules on an OpCon job that compare the result code with values you define to decide whether the job fails or finishes OK.

**Step** — One operation in a task, such as **get**, **put**, **compress**, **decompress**, **encrypt**, **decrypt**, or **name**.

**Related topics:**

- [Task Definitions](./agent-task-definitions.md)
- [Endpoint Definitions](./agent-endpoint-definitions.md)
- [Encryption Definitions](./agent-encryption-definitions.md)
- [Troubleshooting](./trouble-shooting.md)
