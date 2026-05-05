---
title: MFT Server
sidebar_label: MFT Server
description: "Overview of the OpCon MFT Server component, including capabilities, supported protocols, and links to configuration topics."
tags:
  - Conceptual
  - System Administrator
  - Getting Started
---

# MFT Server

## What is it?

The OpCon MFT Server is an additional component of the OpCon MFT Agent that provides full FTP/SFTP/HTTP server functionality. It allows external parties to deposit and retrieve files, and forwards file system events to OpCon through the CloudEvents webhook for trigger-based automation.

- Use this when you need to receive incoming files from trading partners over FTP, FTPS, SFTP, or HTTPS
- Use this when you need to trigger OpCon jobs automatically when files arrive, are moved, or are deleted on the server
- The OpCon MFT Server requires the OpCon MFT Agent to be installed and authenticated before it can be configured

The OpCon MFT Server is installed automatically as part of the OpCon MFT Agent installation.

## Supported protocols

- FTP
- FTPS (FTP + TLS)
- SFTP (SSH File Transfer Protocol)
- HTTP (+ WebDAV)
- HTTPS (+ WebDAV)

## How it works

Server users are defined directly within the MFT Server and can deposit or retrieve files using any supported protocol. The server forwards trigger events (such as file upload, download, delete, and move) to the OpCon CloudEvents webhook, where trigger filters map those events to OpCon actions.

Virtual folders allow physical directories outside a user's home folder — including network shares — to be made accessible to server users without restructuring the file system.

## In this section

| Page | Description |
|---|---|
| [System Requirements](./server-system-requirements.md) | Minimum hardware and software requirements for installing the OpCon MFT Server |
| [Installation](./server-installation.md) | How to register the webhook, start the server, and define server users |
| [Triggers](./server-triggers.md) | How to configure CloudEvents trigger filters and map file events to OpCon actions |
| [File Sharing](./server-file-sharing.md) | How server users upload, download, and share directories through a web browser |
| [Virtual Folders](./server-virtual-folders.md) | How to map external directories and network shares as virtual folders for server users |

**Related topics:**

- [MFT Agent](./agent-overview.md)
- [Overview](./overview.md)
- [Architecture](./architecture.md)
