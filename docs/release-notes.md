---
title: Release notes
sidebar_label: Release notes
description: "Release notes for OpCon MFT, including new features, improvements, and bug fixes by version."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
  - Getting Started
---

# OpCon MFT release notes

## OpCon MFT 3.13.9

**Released:** February 2026

OpCon MFT 3.13.9 includes improvements to PGP key generation and several bug fixes for JORS output, WebUI PGP key management, and the PGPENCRYPT command.

## New features

### PGP keys

- **Added a preferred PGP key hash algorithm field to PGP key generation.** You can now specify a preferred hash algorithm when generating PGP keys.
- **Added a preferred symmetric cipher algorithm option to PGP key generation in the Desktop Configurator.** You can now specify a preferred symmetric cipher algorithm when generating PGP keys from the Desktop Configurator.

## Bug fixes

### PGP

- **Improved error messages for PGPDECRYPT failures.** Errors now display a more helpful description when an unexpected packet error occurs during decryption.
- **Fixed an issue where the PGPENCRYPT command could stall when user keyring files did not exist.** The command now handles missing keyring files without stalling.
- **Fixed an issue where saving the password for a PGP key after import failed with an exception in the web UI.** Passwords for associated PGP keys are now saved correctly after import.

### Jobs

- **Fixed an issue where job output retrieved through JORS returned an Internal Server Error when using a SQL Server backend.** JORS output is now returned correctly for all supported database backends.
- **Fixed an issue where JORS output displayed incorrect timestamps for file tracking steps.** File tracking steps now display the correct time in JORS output.

### Web UI

- **Fixed non-functional links on the Error Reconciliation page.** All links on the Error Reconciliation page now work correctly.
- **Removed the prompt to import cross-product settings from Robo-FTP and Robo-FTP Server.** OpCon MFT no longer prompts users to import settings from Robo-FTP or Robo-FTP Server.

---

## OpCon MFT 3.13.8

**Released:** August 2025

OpCon MFT 3.13.8 includes improvements to PGP key management in the web UI and several bug fixes for SFTP, FTP, and WebUI display issues.

## New features

### PGP keys

- **Added an expiration date column to the PGP Keys page in the web UI.** The PGP Keys page now displays the expiration date for each key, along with key fingerprints and sub-key fingerprints in the key details dialog.
- **Added validation to prevent creating PGP keys with an expiration date set in the past.** The web UI now enforces that PGP key expiration dates must be set in the future.

## Improvements

### PGP keys

- **Removed the Load Defaults button from web UI pages where it was not applicable.** The Load Defaults button is no longer displayed on pages where it served no function.

### Logging

- **Reduced extraneous coroutine trace log lines from default log level output.** Default logging is less verbose, making logs easier to review.
- **Licensing subsystem logging can now be selectively increased with extra debug data logging disabled.** Administrators can increase licensing log detail without enabling full debug data logging.

### Web UI

- **Updated the web UI to display consistent local time and date throughout.** All date and time values in the web UI now use the same local time format.
- **Improved the error message displayed when site tests fail due to a missing OpCon connection.** The error message now provides a more helpful description of the connection failure.
- **Updated empty record pages to display an explicit "No records to display." message instead of a blank page.** Pages with no records now display a clear message rather than an empty table.
- **Updated the PGP Key export dialog to display the filename of the downloaded key.** The export dialog now shows the filename so you can confirm which file was downloaded.
- **Updated required fields on the PGP Keys page to be clearly marked.** Required fields on the Create PGP Key dialog are now visually indicated.
- **Updated the calendar on the PGP Key expiration date field to close after a date is selected.** The date picker calendar now closes automatically after selecting an expiration date.

### SFTP and SSH keys

- **Removed associated passwords when deleting SSH keys.** Deleting an SSH key from the Desktop Configurator or web UI now also removes the associated passphrase.

## Bug fixes

### PGP keys

- **Fixed an issue where duplicate PGP keys could be created by selecting the OK button multiple times.** The web UI now prevents duplicate PGP keys from being created by multiple rapid submissions.
- **Fixed an issue where closing and reopening the Create PGP Key dialog retained settings from a previously canceled attempt.** The Create PGP Key dialog now resets correctly when reopened.
- **Fixed an issue where the PGP passphrase was not preserved when a key was generated from the web UI.** PGP passphrases are now saved correctly when keys are generated through the web UI.
- **Fixed an issue where the PGP key expiration date was always set to one day ahead of the selected date.** PGP key expiration dates are now saved as configured.

### Web UI

- **Fixed an issue where the SFTP and FTP checkboxes on the Users page could fail to display correctly.** Checkboxes now display the correct state in the web UI Server Console and Desktop Configurator.

### Licensing

- **Fixed an issue where the offline activation dialog did not allow saving license activation files on Windows Server Core and similar desktop-less platforms.** License activation files can now be saved on all supported Windows platforms.

### Outgoing email

- **Removed the automatic configuration tool from the web UI Outgoing Email test dialog.** The automatic configuration tool has been removed from the test dialog.

### Robo-FTP

- **Added support for UNIX and MAC-style line endings (single CR or single LF) in Robo-FTP scripts.** Robo-FTP scripts now support UNIX and MAC line endings in addition to CR+LF.

---

## OpCon MFT 3.13.7

**Released:** June 2025

OpCon MFT 3.13.7 includes new SSH key capabilities, REST API improvements, and several bug fixes for SFTP, decompression, and WebUI.

## New features

### SFTP sites

- **Added a "Quote on Logon" field to managed site definitions.** You can now specify an arbitrary FTP protocol-level command to execute immediately after authentication for each managed site.
- **Added a prompt to confirm credentials when authentication fails during SFTP site testing in the web UI.** The web UI now prompts you to verify credentials when a test connection fails due to an authentication error.
- **Improved logging of the SFTP authentication process.** SFTP authentication activity is now logged in more detail.

### Web UI

- **Updated the SSH Key export dialog to more clearly convey the available export options.** The export dialog now provides clearer descriptions of each export format.

## Bug fixes

### SSH keys

- **Fixed an issue where generated Ed25519 SSH keys were invalid.** Ed25519 keys generated by OpCon MFT are now valid and importable by other systems.
- **Fixed an issue where valid Ed25519 SSH keys could not be imported.** Ed25519 keys from external sources can now be imported correctly.
- **Fixed an issue where associated passwords were not deleted when SSH keys were deleted from the web UI.** Deleting an SSH key now also removes the associated passphrase.

### REST API

- **Fixed an issue where the `/api/job/status/GROUP.JOB` call failed when the job was not currently running.** The status endpoint now returns the correct response for jobs that are not actively running.
- **Fixed an issue where the `/api/job/create/GROUP.JOB` call returned a 500 error instead of a 409 conflict when the job already existed.** The endpoint now returns a proper conflict response.
- **Fixed an issue where the `/api/job/create/GROUP.JOB` call returned a 500 error instead of a 400 error with a message when job data was incorrectly formatted.** The endpoint now returns a proper validation error response.
- **Fixed an issue where the `/api/job/start` call returned a 500 error instead of a proper 409 conflict.** The endpoint now returns a proper conflict response.
- **Fixed an issue where GET and POST data formats for `/api/job/config/GROUP.JOB` did not match.** The GET and POST formats are now consistent.
- **Fixed an issue where the `/api/site/config` call returned a 500 error instead of a 400 error with a message when job data was misformatted.** The endpoint now returns a proper validation error response.

### Decompression

- **Fixed an issue where the default empty mask field in a decompress step was not interpreted as all files.** An empty mask in a decompress step now correctly matches all files.
- **Fixed an issue where the decompress step could crash when processing certain PKZIP files produced by Windows 11.** The decompress step now handles these file types correctly.

### SFTP sites

- **Fixed an issue where SSH partial authentication (key and password both required) failed when connecting to SFTP sites.** SFTP connections requiring both key and password authentication now succeed.

### Web UI

- **Fixed an issue where path endpoints could be tested with blank or missing paths.** The test button now requires a valid path before running a site test.
- **Fixed an issue where the Debug Data Settings dialog did not commit changes when closed.** Settings are now saved when the dialog is closed.

### Webhooks

- **Fixed an issue where undecryptable webhook configurations could prevent MFT jobs from running.** Webhook configurations are now validated and handled without blocking job execution.

---

## OpCon MFT 3.13.6

**Released:** March 2025

OpCon MFT 3.13.6 includes new SSH key types for SFTP sites and several bug fixes for site configuration and TLS certificates.

## New features

### SSH keys

- **Added support for generating ECDSA and ED25519 keys from the SSH Keys page in the web UI.** You can now generate ECDSA and ED25519 key types directly from the web UI SSH Keys page.

## Bug fixes

### SFTP sites

- **Fixed an issue where selecting Deny in the Accept Fingerprint dialog when testing an SFTP site for the first time resulted in the fingerprint being saved.** Selecting Deny now correctly discards the fingerprint.
- **Fixed an issue where non-default encrypted SSH keys could not be used to connect to SFTP sites.** All supported encrypted SSH key formats can now be used for SFTP authentication.

### TLS certificates

- **Fixed an issue with managing TLS certificates in the Desktop UI.** Certificate management operations (delete and select) now work correctly.

### Web UI

- **Fixed an issue where the managed site password was displayed for the wrong site.** Passwords are now displayed for the correct managed site.

### FTPS

- **Added an optional feature to enforce unidirectional shutdown of the TLS data channel for FTPS managed sites.** This option is available for FTPS managed sites where the remote server requires unidirectional TLS shutdown.

---

## OpCon MFT 3.13.5

**Released:** October 2024

OpCon MFT 3.13.5 includes new platform support, file upload limits, and numerous web UI and configuration fixes.

## New features

### Protocols

- **Added support for FTP and SFTP connections to IBM i and z/OS platforms.** OpCon MFT now supports connecting to IBM i and z/OS systems over FTP and SFTP (put operations).

### File server

- **Added the ability to limit file uploads to a maximum size.** You can now configure a maximum file size for uploads to the OpCon MFT Server.
- **Updated the browser authentication form for the file server to be brandable and stylable.** When logging into the file server from a browser, authentication is now presented through a customizable form instead of a browser popup.
- **Updated TLS certificate and FTP Server pages with full certificate management.** The web UI now supports creating, importing, viewing, deleting, and exporting TLS certificates, including the option to add intermediate certificates.

## Improvements

### Azure Blob Storage

- **Added the Amazon Web Services S3 server type back to the Configurator managed sites add dialog.** The AWS S3 option is available again when adding a new managed site.

### SFTP

- **Updated managed sites to honor advanced SSH method settings.** Advanced SSH method configuration is now respected when connecting via managed sites.

## Bug fixes

### Groups

- **Fixed an issue where OpCon MFT did not recognize group settings.** Group settings are now applied correctly during job processing.

### Azure Blob Storage

- **Fixed an issue where downloading a file from Azure Blob Storage failed.** File downloads from Azure Blob Storage now complete correctly.
- **Fixed an issue where configuring Azure Blob Storage sites in the web UI failed.** Azure Blob Storage site configuration now saves correctly.
- **Fixed an issue where adding a site with an account key for Azure Blob Storage failed.** Sites using Azure account key authentication can now be added and saved correctly.

### Web UI

- **Fixed an issue where the Reconciliation page was removed from the WebUI-Jobs section and could not be accessed directly.** The Reconciliation page link has been corrected.
- **Fixed an issue where saving logging settings required a save button that was missing.** A save button has been added to the logging settings page.
- **Fixed an issue where the site test button did not save all settings before testing.** All settings are now saved before running a site test.
- **Fixed an issue where a fake path was displayed when importing an SSH key.** The correct file path is now displayed during SSH key import.
- **Fixed an issue where TLS certificate details could not be viewed in the web UI.** TLS certificate details are now displayed correctly.
- **Fixed an issue where debug files could not be deleted from the Debug Data settings page.** Debug file deletion now works correctly.

### SSH keys

- **Fixed issues with SSH key page actions including import, create, and key pair export.** SSH key management operations now function correctly.

### Path endpoints

- **Fixed an issue where path endpoints with credentials silently failed when used.** Path endpoints with credentials now work correctly during job execution.

### Installation

- **Fixed an issue where the upgrade installer did not use the existing installation directory.** The upgrade installer now correctly uses the previously configured installation path.

### Algorithms

- **Fixed an issue with the algorithms list in ciphers.** The available cipher list now displays correctly.

### Managed site SSH keys

- **Fixed an issue where the SSH key name setting was stored inconsistently and could break settings loading in the web UI.** SSH key name settings are now stored and loaded consistently.

---

## OpCon MFT 3.13.4

**Released:** July 2024

OpCon MFT 3.13.4 introduces web UI server management, persistent event storage, FIPS mode configuration, and numerous security and reliability improvements.

## New features

### Web UI server management

- **Added a Server Users page to the web UI.** You can now configure server users directly from the web UI, implementing the same functionality available in the Desktop Server Console.
- **Added a Server Logging page to the web UI.** Server logging settings are now configurable from the web UI.
- **Added a General tab to the Server Console Users page in the web UI.** The General tab provides access to core user settings.
- **Added a Shares tab to the Server Console Users page in the web UI.** The Shares tab allows configuration of file sharing settings for each user.
- **Added a delete user button to the Server Users page in the web UI.** Users can now be deleted directly from the web UI.
- **Added an email field to user account settings.** An email address can now be associated with each server user account.

### Event storage

- **Added persistent on-disk storage for MFT Agent event data.** Events now fire (possibly late) even if OpCon or the MFT Agent are temporarily unavailable, preventing event loss during outages.

### Security and compliance

- **Added FIPS mode configuration.** FIPS mode is now configurable and defaults to the Windows FIPS mode setting.
- **Added strict key exchange enforcement to mitigate potential SFTP downgrade attacks (CVE-2023-48795).** OpCon MFT now implements strict kex to reduce the risk of protocol downgrade attacks.
- **Added systematic return value checking for MD functions to address low-memory key weakness (CVE-2023-6918).** MD function return values are now checked to prevent use of weak keys in low-memory conditions.
- **Mitigated CVE-2023-21893.**
- **Updated SSH host key fingerprints to use SHA256 instead of MD5.** SSH host key fingerprints now use the stronger SHA256 hash algorithm.
- **Updated the process for checking stored SSH fingerprints.** Pre-existing MD5 fingerprints are handled and upgraded to SHA256 where possible.
- **Updated MFT Server user passwords to use salted SHA256 hashes instead of unsalted SHA1 hashes.** Password storage is now more secure.
- **Added password length and complexity requirements to the MFT Server.** Administrators can now enforce password complexity rules for server users.

### File management

- **Added create directory and delete buttons for basic file management in directories served over HTTP.** Directories served over HTTP now support rudimentary file management from the browser.

### CloudEvents

- **Added CloudEvents support for MFT Agent client-side activity.** The MFT Agent now fires CloudEvents for client-side file transfer activity when the webhook is licensed and configured.

### WebUI port

- **Updated the web UI port to default to port 41100 with HTTPS enabled on new installs.** New installations now use HTTPS on port 41100 by default.

### SFTP

- **Added support for redownloading already-processed files.** Get, pull, and monitor steps can now be configured to redownload files that have already been processed.
- **Improved performance for SFTP client file transfers.**

## Improvements

### SMTP

- **Added the ability to disable SMTP authentication.** Single sign-on authentication is no longer attempted when SMTP authentication is disabled.

### Path endpoints

- **Added username and password support for path endpoints.** Path endpoints can now be configured with credentials for environments where Windows single sign-on is not available.

## Bug fixes

### SSH keys

- **Fixed an issue where exporting an SSH public key did not work from the web UI.** SSH public key export now functions correctly.
- **Fixed an issue where importing SSH-1 format keys failed.** SSH-1 format keys can now be imported.
- **Fixed an issue where SSH key selection was not enabled when adding a new SFTP site in the web UI.** SSH key selection is now available when configuring a new SFTP site.

### Groups

- **Fixed an issue where job groups could not be deleted from the Scheduler Group Settings tab.** Job group deletion now works correctly.

### Virtual directories

- **Fixed an issue where a user could delete files from a virtual directory with only upload, list, and post permissions.** File deletion from virtual directories now requires the correct permissions.
- **Fixed an issue where a share folder expiration date was set to a random value when not explicitly configured.** Expiration dates are now unset by default unless explicitly specified.

### Web UI

- **Fixed an issue where ProgramData and UserData directory fields could be directly edited from the Configuration Data page.** These fields are now read-only in the web UI.
- **Fixed an issue where files with Unicode characters in their name could not be downloaded from the server web UI.** Unicode filenames are now handled correctly.
- **Fixed an issue where the debug log export included HTML content at the end of the downloaded ZIP file.** The debug export ZIP no longer contains extraneous HTML content.

### FTP

- **Fixed an issue where FTPLIST returned $ERROR_SERVER_IS_FTP when connecting to an FTP server as HTTP.** The correct error is now returned.
- **Fixed an issue where SFTP connections failed for connections that only accepted keyboard-interactive authentication.** Keyboard-interactive SFTP authentication now works correctly.
- **Fixed an issue where the FTPLOGON command was missing TLSv1.3 values from /minversion and /maxversion options.** TLSv1.3 is now supported in the version range options.

### Logging

- **Fixed an issue where log rotation stopped working when set to rotate every N megabytes.** Log rotation by size now functions correctly.
- **Fixed an issue where the Configurator showed an error when uninstalling and reinstalling the Scheduler Service.** The reinstall process no longer produces an error.

### File sharing

- **Fixed an issue where a corrupted share configuration element could crash the MFT Server when listing a directory.** The server now handles corrupted share configurations without crashing.

### CloudEvents

- **Fixed an issue where CloudEvents were being dropped or corrupted.** CloudEvents are now delivered reliably.

### Documentation

- **Updated `%uploadfiles` and `%downloadfiles` array documentation.** The documentation for these variables now reflects the correct behavior.

---

## OpCon MFT 3.13.3

**Released:** October 2023

OpCon MFT 3.13.3 includes new server management capabilities and numerous WebUI and stability fixes.

## New features

### Jobs

- **Added support for two jobs with the same name running simultaneously.** OpCon MFT now supports concurrent execution of jobs that share the same name.

### Server management

- **Added a list of currently logged-in users visible from the server web UI.** Administrators can now see which users are currently connected to the server.
- **Added a Disconnect button on the server web UI to remove logged-in users.** Administrators can now disconnect active users from the server web UI.
- **Added a Virtual Folders tab to the Users page of the Server Console web UI.** Virtual folder assignments can now be managed from the Users page.

### Managed sites

- **Updated FTP server types that use explicit mode to be labeled as such.** Explicit mode server types are now clearly identified on the Managed Sites page.
- **Removed the automatic site configuration option from the Managed Sites web UI page.** The automatic configuration option is no longer available.

### Logging

- **Separated debug logging for the web UI and the Scheduler into separate log files.** The web UI now logs to `NewUI.log` and the Scheduler logs to `Scheduler.log`, enabling independent log rotation.

## Improvements

### Managed sites

- **Updated the managed site test to differentiate between various errors on a failed connection.** The test dialog now displays more specific error information when a connection fails.
- **Improved the successful site test page to display a site listing.** A successful site test now shows the directory listing for the connected site.

### Error messages

- **Updated the message displayed when files cannot be processed because no size or date change was detected.** The message now accurately describes the condition instead of showing a misleading "file not found" error.

### Server startup

- **Updated the MFT Server to wait for OpCon to come up before requiring an active connection.** The OpCon Rest API is no longer required to be reachable when the MFT service starts.

### Server communication

- **Updated the listener error message to indicate that communication with OpCon failed when a listener cannot start.** The error message is now more descriptive.

## Bug fixes

### WebUI

- **Fixed an issue where some modal dialogs were abnormally wide and not visually distinct from the background.** Modal dialogs now display at the correct size and with proper visual separation.
- **Fixed an issue where the incorrect dialog title indicated a managed site test failure when the test actually succeeded.** The dialog title now accurately reflects the test result.
- **Fixed an issue where the confirmation dialog for deleting a managed site did not offer a cancel option.** The delete confirmation dialog now includes a cancel button.
- **Fixed an issue where proxy settings could not be enabled on the Managed Sites page.** The Proxy Settings toggle now functions correctly.
- **Fixed an issue where keys could not be exported from the PGP Keys page.** PGP key export now works correctly.
- **Fixed an issue where a saved passphrase could not be viewed on the PGP Keys page.** Saved passphrases can now be viewed.
- **Fixed an issue where the TLS Mode list on the Outbound Email page was blank.** The TLS Mode list now displays the available options.
- **Fixed an issue where the Delete button on the Outbound Email page did not delete the selected item.** The delete action now functions correctly.
- **Fixed an issue where Password and Verification fields were missing from the Outbound Email page.** Both fields are now available.
- **Fixed an issue where the TLS Certificate page displayed doubled column values and headers after importing a certificate.** Column values and headers are now displayed correctly after import.
- **Fixed an issue where TLS certificates could not be exported from the web UI.** Certificate export now works correctly.

### TLS

- **Fixed an issue where TLS version limitations set in the web UI did not appear in the Desktop Configurator.** TLS version settings are now synchronized between the web UI and Desktop Configurator.

### Azure Blob Storage

- **Fixed an issue where a custom connection string for Azure Blob Storage was ignored.** Custom connection strings are now applied correctly when connecting to Azure Blob Storage.

### Stability

- **Fixed intermittent TLS initialization errors when connecting to non-TLS services and an intermittent server crash on logoff.** These stability issues have been resolved.
- **Fixed an issue where MFT Agent jobs could report failure under high load even when they succeeded.** Job status reporting is now reliable under high load, and this error no longer prevents acquiring job logs.
- **Fixed a rare crash during file uploads.** An edge case that could cause a crash during upload has been resolved.
- **Fixed an issue where a corrupted share configuration element could crash the MFT Server when listing a directory.** The server now handles corrupted share configurations without crashing.

### PGP keys

- **Fixed an issue where PGP secret keys could not be deleted from the web UI.** PGP secret key deletion now works correctly.

### Groups

- **Fixed an issue where deleting a group in the Desktop Configurator failed.** Group deletion now works correctly.

### Server console

- **Fixed an issue where listing output styling did not work correctly due to missing closing tags.** Listing output now renders correctly.
- **Fixed an issue where disconnecting a user on the information page failed.** User disconnection now works correctly.

---

## OpCon MFT 3.13.2

**Released:** June 2023

OpCon MFT 3.13.2 includes unauthenticated user access restrictions and numerous WebUI and connectivity fixes.

## New features

### Access control

- **Added restriction of buttons and sub-menu options for unauthenticated users.** Users without administrator access no longer see active controls, and a warning message is displayed.

### Installer

- **Removed the no-longer-supported Microsoft SQL Server CE component from the MFT Agent installer.** The installer no longer includes SQL Server CE.

## Bug fixes

### SFTP and FTP

- **Fixed an issue where SFTP connections failed for connections that only accepted keyboard-interactive authentication.** Keyboard-interactive SFTP authentication now works correctly.
- **Fixed an issue where FTP and SFTP protocol checkboxes were not updated in the Server Console user list when the supported protocol changed.** Protocol checkboxes now reflect the current configuration.
- **Fixed an issue where FTP disconnects occurred on upload with WinSCP.** FTP upload sessions using WinSCP no longer disconnect unexpectedly.

### TLS certificates

- **Fixed an issue with TLS certificate deletion in the web UI.** TLS certificate deletion now works correctly.
- **Fixed an issue where TLS certificate column values and headers displayed doubled-up text after import.** Column headers and values are now displayed correctly after import.
- **Fixed an issue where TLS certificates could not be exported.** Certificate export now functions correctly.
- **Fixed an issue with the TLS Client Certificate toggle on site editing.** The TLS Client Cert toggle now functions correctly.

### PGP

- **Fixed an issue where the PGP key passphrase was not saved correctly by the web UI.** PGP key passphrases are now saved correctly.
- **Fixed an issue where keys could not be exported from the PGP Keys page.** PGP key export now works correctly.
- **Fixed an issue where a saved passphrase could not be viewed on the PGP Keys page.** Saved passphrases can now be viewed.

### Outbound email

- **Fixed an issue where the TLS Mode list on the Outbound Email page was blank.** The TLS Mode list now displays the correct options.
- **Fixed an issue where CC and BCC fields were incorrectly required on the Outbound Email page.** CC and BCC are now optional.
- **Fixed an issue with SMTP application crashes.** SMTP configuration no longer causes application crashes.
- **Fixed an issue where the Delete button on the Outbound Email page did not delete the selected item.** Delete now functions correctly.
- **Fixed an issue where Password and Verification fields were missing from the Outbound Email page.** Both fields are now available.

### Managed sites

- **Fixed an issue where the confirmation dialog for deleting a managed site did not offer a cancel option.** The delete confirmation dialog now includes a cancel button.
- **Fixed an issue where the proxy settings toggle could not be enabled.** The Proxy Settings toggle now functions correctly.
- **Fixed an issue where the HTTP/HTTPS Transfer Type list was not working.** The Transfer Type list now displays the correct options.
- **Fixed an issue where the managed site test showed a success title when the test actually failed.** The result dialog title now accurately reflects the outcome.
- **Fixed an issue where the managed site test displayed a site listing on success.** Successful tests now show the site listing as expected.

### Web UI

- **Fixed an issue with the Configuration Data browse directory function.** Directory browsing on the Configuration Data page now works correctly.
- **Fixed an issue with the Configuration Data page buttons.** All buttons on the Configuration Data page now function correctly.
- **Fixed an issue with the Debug Data pages.** Debug data pages now load and display correctly.
- **Fixed an issue with test buttons not verifying inputs.** Test buttons now validate required fields before running.
- **Fixed an issue where SFTP and FTP checkboxes on the Server Console Users page could fail to display correctly.** Protocol checkboxes now display the correct state.

### Windows compatibility

- **Fixed an issue where the MFT Server could not send events on Windows builds lower than build 1903.** Event sending now works on all supported Windows Server versions.

### Virtual folders

- **Fixed an issue where virtual folders were not appearing for users.** Virtual folder assignments now display correctly for all users.
