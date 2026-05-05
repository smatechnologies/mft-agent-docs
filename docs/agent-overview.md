---
title: MFT Agent
sidebar_label: MFT Agent
description: "Overview of the OpCon MFT Agent component, including capabilities, supported protocols, and links to configuration topics."
tags:
  - Conceptual
  - System Administrator
  - Automation Engineer
  - Getting Started
---

# MFT Agent

## What is it?

The OpCon MFT Agent is the client component of OpCon MFT that performs B2B file transfers. It is installed on a Windows server and communicates with OpCon through the ProxyAgent, executing file transfer tasks defined as OpCon jobs.

- Use this when you need to automate the transfer of files between internal systems, trading partners, or cloud storage
- Use this when you need compression, encryption, or file renaming as part of a scheduled file transfer job
- The OpCon MFT Agent must be installed and authenticated with OpCon before file transfer jobs can run

The OpCon MFT Agent supports submission and retrieval of data files between systems using a wide range of protocols, with optional compression and encryption.

## Supported protocols

- FTP
- FTPS (FTP + TLS)
- SFTP (SSH File Transfer Protocol)
- HTTP / HTTPS
- WebDAV
- Azure Blob Storage
- Amazon S3

## How it works

File transfers are performed between endpoints. An endpoint is either a local path on the agent server or a remote site with defined connection settings.

A task consists of multiple steps executed in a specific order: retrieving a file set from the source endpoint, optionally compressing or encrypting the files, and placing them at the destination endpoint. Each completed step is persisted so that if a step fails and the task is restarted, it resumes from the failed step.

## In this section

| Page | Description |
|---|---|
| [System Requirements](./agent-system-requirements.md) | Minimum hardware and software requirements for installing the OpCon MFT Agent |
| [Installation](./agent-installation.md) | How to install, configure, and authenticate the OpCon MFT Agent with OpCon |
| [Endpoint Definitions](./agent-endpoint-definitions.md) | How to define local path endpoints and remote site endpoints |
| [Encryption Definitions](./agent-encryption-definitions.md) | How to configure PGP keys, TLS certificates, and SSH keys |
| [Group Definitions](./agent-group-definitions.md) | How to configure job group attributes including data retention and error notifications |
| [Task Definitions](./agent-task-definitions.md) | How to define file transfer tasks with source, destination, compression, and encryption steps |

**Related topics:**

- [MFT Server](./server-overview.md)
- [Overview](./overview.md)
- [Architecture](./architecture.md)
