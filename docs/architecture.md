---
title: Architecture
sidebar_label: Architecture
description: "Technical architecture of the OpCon MFT integration, including SMANetCom, ProxyAgent, message types, and the CloudEvents webhook."
tags:
  - Reference
  - System Administrator
---

# Architecture

## What is it?

The Architecture reference describes how the OpCon MFT Agent integrates with OpCon and how the OpCon MFT Server forwards trigger events to the OpCon CloudEvents webhook.

- Use this when troubleshooting communication issues between OpCon and the OpCon MFT Agent
- Use this when understanding how OpCon messages map to OpCon MFT Rest-API calls
- Use this when understanding how the OpCon MFT Server submits trigger events to CloudEvents

OpCon MFT integrates with OpCon through a Rest-API connection rather than a traditional agent. SMANetCom communicates directly with the OpCon MFT Agent service, and the AgentProxy translates between OpCon's internal message format and the OpCon MFT Agent's Rest-API.

The OpCon MFT Server is an additional component of the OpCon MFT Agent.

![Architecture Overview](../static/img/architecture-overview.png)

## How OpCon MFT connects to OpCon

Each component in the OpCon MFT architecture has a specific role:

**OpCon** manages scheduling and communication:

- Stores the task definition as an OpConMFT job type
- Routes requests to the OpCon MFT Agent Rest-API
- Manages communication through SMANetCom
- Retrieves job logs from the OpCon MFT Agent through the JORS environment

**Solution Manager** provides the user interface:

- Master Job and Daily Job UI for defining and managing OpConMFT job types
- Endpoints UI for defining and managing endpoints in the OpCon MFT Agent
- Encryption Key UI for defining encryption information in the OpCon MFT Agent

**OpCon MFT Agent** performs the work:

- Stores endpoint and encryption definitions
- Runs tasks submitted by OpCon
- Accepts webhook registration requests from OpCon for the OpCon MFT Server

## How jobs run

When OpCon needs to start, monitor, or check on an OpCon MFT job, SMANetCom sends a message to the AgentProxy. The AgentProxy translates that message into a Rest-API call to the OpCon MFT Agent.

| Message | When it's sent | What it does |
|---|---|---|
| **TX1** | When OpCon starts a job | Starts a new job, or restarts a failed one from the failed step |
| **TX2** | While a job is running | Requests the current job status |
| **TX4** | When SMANetCom starts | Checks whether the OpCon MFT Agent is available |
| **TXH** | On a timed interval | Heartbeat check to confirm the agent is still available |

A task in OpCon MFT is identified by a `GROUPNAME.JOBNAME` value. The Department name of the OpCon task becomes the group name, and the OpCon job name becomes the job name. Special characters are removed from both.

Each time a task starts, OpCon MFT generates a unique run ID (RunId). If a task fails and is restarted, the same RunId is used so that execution resumes from the failed step rather than starting over.

<details>
<summary>View TX message technical details</summary>

### TX1 — Start or restart a job

The AgentProxy receives a TX1 message from SMANetCom and checks whether the RunId (field code 25001) is `0`.

**New task (RunId = 0):** The AgentProxy calls `/api/job/start/{groupName}.{correctedJobName}/withtag/{tagName}` (POST), where `tagName` is the integer portion of the OpCon unique jobId. The response returns the OpCon MFT Agent jobId. The running status, Agent jobId, and JORS file identifier are returned to SMANetCom and stored in the SMASTER_AUX table.

The AgentProxy then monitors the task by first calling `/api/run/bytag/{tagName}` (GET) to retrieve the MFT Agent jobId, then polling `/api/run/status/{runid}` (GET) for status. While active, the `last_message` field value is returned to OpCon. On success, a jobId of `0` is returned along with the completion code. On failure, only the completion code is returned.

**Restart task (RunId ≠ 0):** The AgentProxy calls `/api/job/restart/{job.runId}/withtag/{tagName}` (POST). Monitoring behavior is identical to a new task.

### TX2 — Get job status

The AgentProxy calls `/api/run/status/{runid}` (GET). If the task is found, its status is returned to SMANetCom and OpCon. If not found, a not-found message is returned.

### TX4 — Agent availability check (startup)

The AgentProxy calls `api/agent/info` (GET). A successful response sets the agent to an **available** state in OpCon. An exception sets it to a **down** state. The agent version is also returned and stored in the MACHS_AUX table.

### TXH — Heartbeat check

The AgentProxy calls `api/agent/info` (GET) on a timed basis. The same available/down logic applies as for TX4.

</details>

## Job logs

When a job starts, OpCon stores a JORS entry in the SMASTER_AUX table. When job logs are requested, the SMALSAMDataRetriever reads this entry and connects to the OpCon MFT Agent to retrieve the task status and step-by-step details.

Job logs are retrieved on demand — they are not stored within OpCon. See [Troubleshooting](./trouble-shooting.md) for instructions on viewing job logs from Solution Manager.

<details>
<summary>View JORS technical details</summary>

The JORS entry includes the OpCon MFT Agent name and the integer portion of the OpCon jobId. The SMALSAMDataRetriever:

1. Extracts agent connection details from the OpCon database.
2. Calls `/api/run/bytag/{tagName}` (GET) to retrieve the MFT Agent jobId.
3. Calls `/api/run/status/{runid}` (GET) to retrieve task status.
4. Calls `/api/run/bytag/{tagName}` (GET) again to retrieve step-level details.

</details>

## Triggers and events

When a file event occurs on the OpCon MFT Server (such as a file upload or deletion), the server automatically posts a trigger to the OpCon webhook. The webhook forwards the event to CloudEvents for processing.

**Trigger events posted by the OpCon MFT Server:**

- MFT Server Logon / Logoff
- MFT Server Upload / Download
- MFT Server Start
- MFT Server Copy File
- MFT Server Move File / Move Directory
- MFT Server Delete File / Delete Directory

**Webhook authentication:** Applications that submit trigger events receive a token from OpCon. Every trigger event must include a valid token — events without one are ignored.

**CloudEvents processing:** CloudEvents receives trigger events and applies Trigger Filters to match incoming messages against defined criteria (source, type, and time). Each match triggers a configured OpCon event. Standard property definitions allow file information to be injected into those events.

## Internal components reference

This section describes the internal software libraries used by the AgentProxy and SMALSAMDataRetriever. This information is primarily useful for support escalations and advanced diagnostics.

<details>
<summary>View internal component details</summary>

### SMANetCom

SMANetCom retrieves TX1 and TX2 messages from the MSGS_TO_NETCOM table, checks the LSAMTYPEID of each message, and places Rest-API agent messages on the appropriate queue for the target ProxyAgent. The ProxyAgent processes messages and returns responses, which are placed in the MSGS_TO_SAM table.

During startup, if a Rest-API agent is detected (LSAMTYPEID of 90 or greater), SMANetCom retrieves agent configuration from the database (address, port, token), starts the AgentProxy, and sends an initial TX4 message. TXH heartbeat messages are generated on a timed basis during normal operations.

### Rest-API Client Library

Provides generalized Rest-API methods (GET, POST, PUT) including authentication. Used by both the AgentProxy and SMALSAMDataRetriever to submit requests to the OpCon MFT Agent.

### Rest-API Model Library

Provides generalized models for the Rest-API Client Library, plus an OpCon MFT-specific module that converts TX1 task definition data into the JSON format required by the `/api/job/start` endpoint.

### MFT Model Library

Provides the model definitions used by the OpCon MFT Agent Rest-API. Used by both the AgentProxy and SMALSAMDataRetriever when submitting requests to the agent.

</details>

## Glossary

**AgentProxy** — The ProxyAgent module (SMAMftAgentProxy) that translates SMANetCom TX messages into OpCon MFT Agent Rest-API calls.

**CloudEvents** — An OpCon feature that receives trigger events from a webhook and maps them to OpCon events through configurable Trigger Filters.

**JORS (Job Output Retrieval System)** — The OpCon mechanism for retrieving job logs. The SMALSAMDataRetriever retrieves job logs from the OpCon MFT Agent via Rest-API.

**LSAMTYPEID** — A numeric identifier that specifies the agent type. OpCon MFT uses LSAMTYPEID 25; values of 90 or greater indicate a Rest-API agent.

**SMANetCom** — The OpCon network communication module that routes TX messages between OpCon and agents. Enhanced to support direct Rest-API communication through the ProxyAgent framework.

**TX Message** — A protocol message exchanged between SMANetCom and an agent. TX1 starts a job, TX2 requests job status, TX4 checks agent availability on startup, and TXH is a periodic heartbeat.

**Related topics:**

- [Overview](./overview.md)
- [MFT Agent installation](./agent-installation.md)
- [Troubleshooting](./trouble-shooting.md)
