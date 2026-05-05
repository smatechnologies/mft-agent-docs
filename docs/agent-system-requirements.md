---
title: MFT Agent system requirements
sidebar_label: System requirements
description: "Hardware and software requirements for installing the OpCon MFT Agent."
tags:
  - Reference
  - System Administrator
  - Installation
  - Getting Started
---

# MFT Agent system requirements

## What is it?

The MFT Agent system requirements define the minimum hardware and software needed to install and run the OpCon MFT Agent on a Windows server.

- Review these requirements before beginning any new installation or upgrade of the OpCon MFT Agent
- Use these requirements to plan server capacity when deploying multiple concurrent file transfer jobs

:::note
OpCon MFT **requires OpCon version 22.0 or greater**.
:::

:::note
Before starting an installation, **an updated OpCon license key including an OpConMFT Agent type must be obtained.** Failure to do this results in a license violation.
:::

## Hardware requirements

On the MFT Agent server, ensure the following minimum hardware requirements are met for each instance of the MFT Agent installed.

- **RAM:** 512 MB plus 50 MB per instance of `OpConMFT.exe`

:::note
Each actively running OpCon MFT script uses one instance of `OpConMFT.exe`.
:::

- **CPU:** Continuous recommends having 1 available CPU core for every 10 to 20 actively running instances of `OpConMFT.exe`, depending on the nature of the processes being automated.

:::note
Encryption and decryption may be more processor-intensive than other activities such as renaming files.
:::

- **DISK:** Continuous recommends a minimum of 2 GB of hard drive space to install the software and maintain a typical number of logs. Provision sufficient additional hard drive space for the files you intend to manage using the software.

## Software requirements

OpCon MFT is 64-bit software. The following requirements apply:

- Requires the 64-bit version of **Windows Server 2012 R2, 2016, or 2019 (including Core edition)**, or **Windows Desktop Editions 10 or 11**
- Requires **Microsoft .NET Framework 4.8**
- Requires **Visual Studio 2022 C++ Runtime**
- Requires **SQL Compact Edition 4.0 SP1**

:::note
The full installer includes all of these dependencies.
:::

:::note
The OpCon MFT installer does not itself require rebooting, but the dependencies installed on the initial install may require a restart.
:::

**Related topics:**

- [MFT Agent installation](./agent-installation.md)
- [MFT Server system requirements](./server-system-requirements.md)
