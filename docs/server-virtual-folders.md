---
title: Virtual Folders
sidebar_label: Virtual Folders
description: "How to create and use virtual folders on the OpCon MFT Server to map external directories and share them across user accounts."
tags:
  - Reference
  - Procedural
  - System Administrator
---

# Virtual Folders

## What is it?

Virtual Folders are directory mappings that make external file system locations visible to connected server users without placing those locations inside a user's home folder hierarchy.

- Use this when multiple server user accounts need access to a single shared physical directory
- Use this when giving users browser-based access to a network share or directory outside their home folder
- Virtual folders are defined in the MFT Server Console and apply to all users who have the virtual folder in their accessible path

Virtual Folders are non-existent folders that are nonetheless visible to connected users.  
A Virtual Folder may be mapped to a directory path on your file system that is located outside the hierarchical directory tree of a user's Home Folder.

## Creating Virtual Folders

Before creating a virtual folder, create the real folder that will be mapped to the virtual folder name.

Start the OpCon MFT Server Console, by Selecting the **Server Console** in the **OpConMFT n.nn** Application Menu.

Select the **VirtualFolders** Menu Item.

![Creating Virtual Folders](../static/img/opcon-mft-server-virtual-folders.png)

- Enter a name for the virtual folder in the **Virtual Folder Path** field.
- Browse to the created folder that will be used to manage the files.
- Manage the permissions available for the virtual folder by selecting / de-selecting the checkboxes.
- Select **Create** to create the virtual folder.


## Sharing Folders Between Accounts

Virtual Folders are commonly used to share a single physical directory with multiple user accounts. 

- Logon on to the MFT Server through the web browser.
- Select the created virtual folder.
- Select **Create Share**.
- Copy the generated URL and share it.

## Sharing Network Folders

Another common use of Virtual Folders is to give users access to network shares or other folders not otherwise available under the hierarchical directory tree of a user's Home Folder.

## FAQs

**Does the physical folder need to exist before creating a virtual folder?**

Yes. Create the real folder on the file system before defining the virtual folder in the MFT Server Console. The virtual folder maps to the physical path.

**Can virtual folders be shared publicly without requiring a login?**

Yes. After logging into the MFT Server through a web browser, select the virtual folder and select **Create Share** to generate a public URL. Copy the generated URL and distribute it to users who need access without an account.

**Related topics:**

- [MFT Server installation](./server-installation.md)
- [File Sharing](./server-file-sharing.md)

