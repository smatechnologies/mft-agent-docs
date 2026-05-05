---
title: FAQs
sidebar_label: FAQs
description: "Frequently asked questions about OpCon MFT storage, file transfer protocols, security configurations, and deployment best practices."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
---

# FAQs

## Storage

### What data is stored?

Copies of all files transferred through OpCon MFT are stored in archival folders for purposes of auditing and to enable job restart on failure.

These archival files are automatically removed according to the **Prune Old Data** field in the OpCon MFT settings (accessible at `https://localhost:41100/Settings.aspx`). The default retention period is 1 year.

Archiving can be disabled entirely by toggling off the **Archive Files** option for MFT jobs in OpCon.

### What logs are stored?

OpCon MFT maintains general debug logs for each interpreter process run as well as logs for individual job runs.

Logs for job runs rotate out according to the **Prune Old Data** field in the OpCon MFT settings. The default retention period is 1 year.

Debug logs do not rotate out. This is generally not a concern, but when the **Extra Debug Data** checkbox is enabled, these files can grow significantly and may need to be purged manually. Debug logs are located in `C:\Program Files\OpConMFT 3.13\ProgramData\debug` and `C:\Program Files\OpConMFT 3.13\UserData\USER_NAME\debug`. The latter folder is only relevant when running the Scheduler Service under a non-default user (default is SYSTEM).

The server maintains its own set of logs — one for each internal server (FTP/HTTP and FTPS separately). These are rotated out after a default of 4 days.

The size of logs varies depending on the protocol used and the specifics of individual file transfer job runs.

## File capabilities

### What transfer protocols are supported by the OpCon MFT Client?

- FTP
- FTPS
- HTTP
- HTTPS
- WebDAV (automatically enabled for HTTP and HTTPS sites if the server supports these extensions)
- SFTP
- Azure Blob Storage
- Amazon S3

### What transfer protocols are supported by the OpCon MFT Server?

- FTP
- FTPS
- HTTP (+ WebDAV)
- HTTPS (+ WebDAV)
- SFTP

## Security

### Server

#### FTPS

```
FIPS mode on:
    |   TLSv1.2: 
    |     ciphers: 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_RSA_WITH_AES_256_GCM_SHA384 
```
```
FIPS mode off:
    |   TLSv1.2: 
    |     ciphers: 
    |       TLS_DHE_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_DHE_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_128_CCM 
    |       TLS_DHE_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_CCM 
    |       TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_DHE_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_DHE_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA 
    |       TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA 
    |       TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256 
    |       TLS_DHE_RSA_WITH_SEED_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_ECDHE_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_ECDHE_RSA_WITH_CAMELLIA_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 
    |       TLS_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_RSA_WITH_AES_128_CCM 
    |       TLS_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_RSA_WITH_AES_256_CCM 
    |       TLS_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_RSA_WITH_CAMELLIA_128_CBC_SHA 
    |       TLS_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_RSA_WITH_CAMELLIA_256_CBC_SHA 
    |       TLS_RSA_WITH_CAMELLIA_256_CBC_SHA256 
    |       TLS_RSA_WITH_SEED_CBC_SHA 
```

#### HTTPS

```
FIPS mode on:
    |   TLSv1.2: 
    |     ciphers: 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_RSA_WITH_AES_256_GCM_SHA384 
```
```
FIPS mode off:
    |   TLSv1.2: 
    |     ciphers: 
    |       TLS_DHE_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_DHE_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_128_CCM 
    |       TLS_DHE_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_AES_256_CCM 
    |       TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_DHE_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_DHE_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA 
    |       TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA 
    |       TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA256 
    |       TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256 
    |       TLS_DHE_RSA_WITH_SEED_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_ECDHE_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_ECDHE_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_ECDHE_RSA_WITH_CAMELLIA_256_CBC_SHA384 
    |       TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 
    |       TLS_RSA_WITH_AES_128_CBC_SHA 
    |       TLS_RSA_WITH_AES_128_CBC_SHA256 
    |       TLS_RSA_WITH_AES_128_CCM 
    |       TLS_RSA_WITH_AES_128_GCM_SHA256 
    |       TLS_RSA_WITH_AES_256_CBC_SHA 
    |       TLS_RSA_WITH_AES_256_CBC_SHA256 
    |       TLS_RSA_WITH_AES_256_CCM 
    |       TLS_RSA_WITH_AES_256_GCM_SHA384 
    |       TLS_RSA_WITH_ARIA_128_GCM_SHA256 
    |       TLS_RSA_WITH_ARIA_256_GCM_SHA384 
    |       TLS_RSA_WITH_CAMELLIA_128_CBC_SHA 
    |       TLS_RSA_WITH_CAMELLIA_128_CBC_SHA256 
    |       TLS_RSA_WITH_CAMELLIA_256_CBC_SHA 
    |       TLS_RSA_WITH_CAMELLIA_256_CBC_SHA256 
    |       TLS_RSA_WITH_SEED_CBC_SHA 
```

#### SFTP

```    
    | ssh2-enum-algos: 
    |   kex_algorithms: (8)
    |       ecdh-sha2-nistp256
    |       ecdh-sha2-nistp384
    |       ecdh-sha2-nistp521
    |       diffie-hellman-group18-sha512
    |       diffie-hellman-group16-sha512
    |       diffie-hellman-group-exchange-sha256
    |       diffie-hellman-group14-sha1
    |       diffie-hellman-group1-sha1
    |   server_host_key_algorithms: (4)
    |       ecdsa-sha2-nistp384
    |       rsa-sha2-512
    |       rsa-sha2-256
    |       ssh-rsa
    |   encryption_algorithms: (11)
    |       chacha20-poly1305@openssh.com
    |       aes128-gcm@openssh.com
    |       aes256-gcm@openssh.com
    |       aes128-ctr
    |       aes192-ctr
    |       aes256-ctr
    |       aes128-cbc
    |       aes192-cbc
    |       aes256-cbc
    |       blowfish-cbc
    |       3des-cbc
    |   mac_algorithms: (4)
    |       hmac-sha2-256
    |       hmac-sha2-512
    |       hmac-sha1
    |       hmac-md5
```

The defaults are listed above. As of version 3.13.5, fine-grained control over all of the above ciphers and algorithms for SFTP is available.

The following options are not enabled by default but can be selectively enabled:

```            
kex_algorithms:
    diffie-hellman-group-exchange-sha1
    diffie-hellman-group14-sha1
    diffie-hellman-group1-sha1
                    
server_host_key_algorithms:
    sk-ssh-ed25519-cert-v01@openssh.com
    ssh-rsa-cert-v01@openssh.com
    ssh-dss-cert-v01@openssh.com
    ssh-rsa
    ssh-dss
                    
encryption_algorithms:
    aes256-cbc
    aes192-cbc
    aes128-cbc
    blowfish-cbc
    3des-cbc

mac_algorithms:
    hmac_sha1-etm@openssh.com
    hmac-sha1
    hmac-md5
```

### Client

- **PGP** (data-at-rest encryption)
  - RSA (1024-bit, 2048-bit, 4096-bit)
  - DSA/DSS (1024-bit, 2048-bit, 4096-bit)
- **CMS** — OpCon MFT supports CMS internally. This is data-at-rest encryption, similar to PGP, that uses SSL/TLS certificates instead of PGP keys.
- **FTPS** — See Non-FIPS ciphers for Server, above.
- **HTTPS** — See Non-FIPS ciphers for Server, above.
- **SFTP** — See SFTP ciphers/algorithms for Server, above. Fine-grained control of these options is available for each managed site.
- **SSH Keys** (available for client authentication and server authentication over SFTP)
  - RSA (1024-bit, 2048-bit, 3072-bit, 4096-bit)
  - DSA (1024-bit, 2048-bit, 3072-bit, 4096-bit)
  - ECDSA (256-bit, 384-bit, 412-bit)

## Best practices for server deployment

While the deployment setup should be chosen based on each environment's needs, the following are considered best practices:

- Because OpCon MFT merges both client and server products, Continuous recommends separate Production and Test servers:
  - One installation of OpCon MFT for Production
  - One installation of OpCon MFT for Test
- Load-balancing of jobs across multiple OpCon MFT installations is not supported.

**Related topics:**

- [Security](./security.md)
- [MFT Agent installation](./agent-installation.md)
- [MFT Server installation](./server-installation.md)
- [Troubleshooting](./trouble-shooting.md)
