---
sidebar_label: 'FAQs'
hide_title: 'true'
---

# FAQs

## Storage

### What Data is stored?
    
Copies of all files transferred through OpConMFT are stored in archival folders for purposes of auditing and to enable job restart on failure.
        
These archival files are automatically removed according to the "Prune Old Data" field per `https://localhost:41100/Settings.aspx`. The default time is 1 year.
        
This can optionally be disabled entirely by toggling off the "Archive Files" option for MFT jobs, which was exposed in a recent version of OpCon.
        
### What Logs are stored?
    
We have general debug logs for each interpeter process run as well as logs for individual job runs.
        
Logs for job runs rotate out according to the Prune Old Data field in `https://localhost:41100/Settings.aspx`. The default time is 1 year.
        
Debug logs do not rotate out. This is not usually a concern, but when the Extra Debug Data checkbox is enabled these files can grow greatly in size and may need to be purged manually as needed. These can be found in `C:\Program Files\OpConMFT 3.13\ProgramData\debug` as well as `C:\Program Files\OpConMFT 3.13\UserData\USER_NAME\debug`. For the latter folder, this will only be relevant when running the Scheduler Service under a non-default user (default is SYSTEM).
        
The server has its own set of logs - one for each internal server (ftp/http and ftps separately). These are rotated out after a default of 4 days.
        
The size of logs _varies greatly_ depending on protocol and the specifics of individual file transfer job runs.
        
## What Performance benchmarks exist for OpCon MFT?

We do not currently have any official benchmarks for performance, though this is on our radar.
    
## File capabilities – Internal and External

#### The following Transfer protocols are supported by the OpConMFT Client:

- FTP
- FTPS 
- HTTP
- HTTPS
- WebDav (automatically enabled for HTTP and HTTPS sites if the server supports these extensions)
- SFTP
- Azure Blob Storage
- Amazon S3
    
#### The following Transfer protocols are supported by the OpConMFT Server:

- FTP
- FTPS 
- HTTP (+ WebDav)
- HTTPS (+ WebDav)
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

The defaults are listed above. As of 3.13.5 we have added fine-grained control over all of the above ciphers and algorithms for SFTP.
            
The following options are not enabled by default but can be selectively enabled as desired:

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
- **CMS**
    - We provide support for CMS internally but this has not been exposed at the OpCon level. This is data-at-rest encryption, similar to PGP, that uses SSL/TLS certificates instead of PGP keys.
- **FTPS**
    - See Non-FIPS ciphers for Server, above.
- **HTTPS**
    - See Non-FIPS ciphers for Server, above.
- **SFTP**
    - See SFTP cipers/algorithms for Server, above.
    - Like server, we offer fine-grained control of these options for each managed site.
            
- **SSH Keys** (available for use for client authentication and also server authentication over SFTP)
    - RSA (1024-bit, 2048-bit, 3072-bit, 4096-bit)
    - DSA (1024-bit, 2048-bit, 3072-bit, 4096-bit)
    - ECSDA (256-bit, 384-bit, 412-bit)
    

## Best Practice for build out of Servers in an Environment

- While the customer should choose a setup that works best for their environment, the following recommendations are considered Best Practice:
    
- Because OpConMFT merges both Client and Server products we recommend separate Production and Test servers 
    - One installation of OpConMFT for Production 
    - One installation of OpConMFT for Test 
- We **do not** support load-balancing of jobs across multiple OpConMFT installations.

