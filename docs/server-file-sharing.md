---
title: Server File Sharing
sidebar_label: File Sharing
description: "How to use the OpCon MFT Server web interface for file upload, download, and creating shared directory links."
tags:
  - Reference
  - Procedural
  - System Administrator
---

# Server File Sharing

## What is it?

Server File Sharing provides a browser-based interface for server users to view, download, and upload files, and to create publicly accessible shared directory links.

- Use this when a server user needs to upload or download files through a web browser
- Use this when creating a shareable link that allows external parties to access a directory without an account
- The HTTP or HTTPS port must be configured in the MFT Server before file sharing is accessible. HTTPS is recommended.

A User Directory page is only accessible to an individual user account after logging in from their web browser with their username and password. Here, you can view the entire directory structure accessible to that user account, download files, and upload files. 

Additionally, from this interface you can also generate links to special **shared** directories, or Shares, which do not require an account to access. Shares can have their permissions restricted using the appropriate options. For example:
- You can allow users to download but not upload or delete files. 
- An expiration date for the share can be set, after which the Share is no longer publicly accessible. 
- You can also delete or update a Share using the "Delete" / "Update" buttons on this page. 
- Only one Share can be created for a given User Directory.

To create, change, or delete shares, the user needs the **Share** permission.

To enable web file sharing, the HTTP or HTTPS port value must be set (see MFT Server Installation). HTTPS can be used and is recommended.

Once logged into the server using your browser, you manage the files associated with your user code, upload / download files or create a share.

![OpCon MFT Server File Sharing](../static/img/opcon-mft-server-server-file-sharing.png)

Files can be viewed by selecting the file, once selected the file is downloaded and can then be viewed in an appropriate tool on your system.
To upload files, select the **Choose Files** button which opens a file explorer on your system. Once the files have been selected select the
**Upload All** button to upload the selected files.

## Sharing a Directory
To share the directory, decide on the options (by selecting or clearing each option); if expiry is required, select the expiry option
and enter an expiry date. 

Select the **Update Share** button.

Select the **Copy** button to the right of the **Share URL** field. This value can then be sent to users so they can have access to the share directory.

## Managing Shares from the Server Console
Shares can also be managed from the **Shares** tab in the user's settings in the OpCon MFT Server Console. Use **Add**, **Edit**, and **Delete** to manage the user's shares, and **Copy URI** to copy the share link.

## FAQs

**How many shares can be created per user directory?**

Only one share can be created for a given user directory. To change share settings, select the **Update** button, or select **Delete** to remove the share.

**What permissions can be set on a share?**

Share permissions are controlled by options on the file sharing page. For example, downloads can be allowed while blocking uploads and deletes. An expiration date can also be set, after which the share is no longer publicly accessible.

**Related topics:**

- [MFT Server installation](./server-installation.md)
- [Virtual Folders](./server-virtual-folders.md)
