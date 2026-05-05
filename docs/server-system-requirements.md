---
title: MFT Server system requirements
sidebar_label: System requirements
description: "Hardware and software requirements for installing the OpCon MFT Server."
tags:
  - Reference
  - System Administrator
  - Installation
  - Getting Started
---

# MFT Server system requirements

## What is it?

The MFT Server system requirements define the minimum hardware and software needed to install and run the OpCon MFT Server on a Windows server.

- Review these requirements before beginning any new installation or upgrade of the OpCon MFT Server
- Use these requirements to plan server capacity when deploying the MFT Server for multiple concurrent users

:::note
OpCon MFT Server **requires OpCon version 22.4 or greater**.
:::

:::note
OpCon MFT Server **requires OpCon MFT version 3.13.1 or greater**.
:::

:::note
Before starting an installation, **an updated OpCon license key including the OpConMFT Server must be obtained.** Failure to do this results in a license violation.
:::

## Hardware requirements

On the MFT Server, ensure the following minimum hardware requirements are met for each instance installed.

- **RAM:** 40 MB for every 100 concurrent users
- **CPU:** Continuous recommends having 1 available CPU core for every 1,250 concurrent users
- **DISK:** Continuous recommends a minimum of 2 GB of hard drive space to install the software and maintain a typical number of logs. Provision sufficient additional hard drive space for the files you intend to manage using the software.

## Software requirements

OpCon MFT Server is 64-bit software. The following requirements apply:

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

- [MFT Server installation](./server-installation.md)
- [MFT Agent system requirements](./agent-system-requirements.md)
