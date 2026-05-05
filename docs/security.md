---
title: Security
sidebar_label: Security
description: "Encryption technologies and security protocols supported by OpCon MFT, including SSL/TLS, SSH, PGP, ZIP, and CMS."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
---

# Security

## What is it?

The Security reference describes the connection-level and file-level encryption technologies supported by OpCon MFT.

- Use this when selecting the appropriate encryption protocol or cipher for a file transfer task
- Use this when verifying whether OpCon MFT supports a specific cipher, key algorithm, or HMAC required by a trading partner
- Use this when configuring PGP, ZIP, or CMS encryption for files that must be protected at rest or in transit

OpCon MFT provides two layers of security that can be used independently or together:

| Security layer | How it works | Technologies |
|---|---|---|
| **Connection-level** | Encrypts data while it travels between systems. The sending side encrypts automatically and the receiving side decrypts automatically. | SSL/TLS (for FTPS and HTTPS), SSH (for SFTP) |
| **File-level** | Encrypts the file itself, so it stays protected whether stored locally, at rest on a server, or during transfer. | PGP, ZIP (AES-256), CMS |

## SSL/TLS

SSL/TLS secures connections made over the FTPS and HTTPS protocols. TLS is the modern, more secure successor to SSL.

OpCon MFT supports the following protocol versions:

| Version | Notes |
|---|---|
| SSL 3.0 | Retained for compatibility with legacy systems |
| TLS 1.0 | Older version, widely supported |
| TLS 1.1 | Intermediate version |
| TLS 1.2 | Recommended — most secure version supported |

OpCon MFT's SSL/TLS implementation is based on OpenSSL 1.1.1e. For additional details, visit openssl.org.

### Perfect Forward Secrecy

Without Perfect Forward Secrecy (PFS), if an adversary compromises a server's private key, they can decrypt any previously recorded secure communications. PFS eliminates this risk by generating unique temporary session keys for each connection that cannot be recovered by an eavesdropper even if the server's private key is later compromised.

OpCon MFT supports PFS through a collection of DHE and ECDHE cipher suites.

<details>
<summary>View PFS-enabled ciphers</summary>

- DHE-RSA-AES128-GCM-SHA256
- DHE-RSA-AES128-SHA
- DHE-RSA-AES128-SHA256
- DHE-RSA-AES256-GCM-SHA384
- DHE-RSA-AES256-SHA
- DHE-RSA-AES256-SHA256
- DHE-RSA-CAMELLIA128-SHA
- DHE-RSA-CAMELLIA256-SHA
- DHE-RSA-SEED-SHA
- ECDHE-RSA-AES128-GCM-SHA256
- ECDHE-RSA-AES128-SHA
- ECDHE-RSA-AES128-SHA256
- ECDHE-RSA-AES256-GCM-SHA384
- ECDHE-RSA-AES256-SHA
- ECDHE-RSA-AES256-SHA384
- ECDHE-RSA-DES-CBC3-SHA
- ECDHE-RSA-RC4-SHA

</details>

### Supported HMACs

HMAC (hash-based message authentication code) algorithms verify that a message has not been tampered with in transit. A particular HMAC may only be available for certain ciphers, and vice versa.

Supported HMAC algorithms: MD5, SHA, SHA256, SHA384

### Full cipher list

OpCon MFT supports all 106 ciphers provided by OpenSSL 1.1.1e for use with TLS. Each cipher can be paired with a limited number of HMAC algorithms, for a total of 130 cipher + HMAC combinations.

Most users do not need to review this list. It is provided for security audits and trading partner compatibility verification.

<details>
<summary>View all 106 supported TLS ciphers</summary>

- ECDHE-RSA-AES256-GCM-SHA384
- ECDHE-ECDSA-AES256-GCM-SHA384
- ECDHE-RSA-AES256-SHA384
- ECDHE-ECDSA-AES256-SHA384
- ECDHE-RSA-AES256-SHA
- ECDHE-ECDSA-AES256-SHA
- SRP-DSS-AES-256-CBC-SHA
- SRP-RSA-AES-256-CBC-SHA
- SRP-AES-256-CBC-SHA
- DH-DSS-AES256-GCM-SHA384
- DHE-DSS-AES256-GCM-SHA384
- DH-RSA-AES256-GCM-SHA384
- DHE-RSA-AES256-GCM-SHA384
- DHE-RSA-AES256-SHA256
- DHE-DSS-AES256-SHA256
- DH-RSA-AES256-SHA256
- DH-DSS-AES256-SHA256
- DHE-RSA-AES256-SHA
- DHE-DSS-AES256-SHA
- DH-RSA-AES256-SHA
- DH-DSS-AES256-SHA
- DHE-RSA-CAMELLIA256-SHA
- DHE-DSS-CAMELLIA256-SHA
- DH-RSA-CAMELLIA256-SHA
- DH-DSS-CAMELLIA256-SHA
- AECDH-AES256-SHA
- ADH-AES256-GCM-SHA384
- ADH-AES256-SHA256
- ADH-AES256-SHA
- ADH-CAMELLIA256-SHA
- ECDH-RSA-AES256-GCM-SHA384
- ECDH-ECDSA-AES256-GCM-SHA384
- ECDH-RSA-AES256-SHA384
- ECDH-ECDSA-AES256-SHA384
- ECDH-RSA-AES256-SHA
- ECDH-ECDSA-AES256-SHA
- AES256-GCM-SHA384
- AES256-SHA256
- AES256-SHA
- CAMELLIA256-SHA
- PSK-AES256-CBC-SHA
- ECDHE-RSA-AES128-GCM-SHA256
- ECDHE-ECDSA-AES128-GCM-SHA256
- ECDHE-RSA-AES128-SHA256
- ECDHE-ECDSA-AES128-SHA256
- ECDHE-RSA-AES128-SHA
- ECDHE-ECDSA-AES128-SHA
- SRP-DSS-AES-128-CBC-SHA
- SRP-RSA-AES-128-CBC-SHA
- SRP-AES-128-CBC-SHA
- DH-DSS-AES128-GCM-SHA256
- DHE-DSS-AES128-GCM-SHA256
- DH-RSA-AES128-GCM-SHA256
- DHE-RSA-AES128-GCM-SHA256
- DHE-RSA-AES128-SHA256
- DHE-DSS-AES128-SHA256
- DH-RSA-AES128-SHA256
- DH-DSS-AES128-SHA256
- DHE-RSA-AES128-SHA
- DHE-DSS-AES128-SHA
- DH-RSA-AES128-SHA
- DH-DSS-AES128-SHA
- DHE-RSA-SEED-SHA
- DHE-DSS-SEED-SHA
- DH-RSA-SEED-SHA
- DH-DSS-SEED-SHA
- DHE-RSA-CAMELLIA128-SHA
- DHE-DSS-CAMELLIA128-SHA
- DH-RSA-CAMELLIA128-SHA
- DH-DSS-CAMELLIA128-SHA
- AECDH-AES128-SHA
- ADH-AES128-GCM-SHA256
- ADH-AES128-SHA256
- ADH-AES128-SHA
- ADH-SEED-SHA
- ADH-CAMELLIA128-SHA
- ECDH-RSA-AES128-GCM-SHA256
- ECDH-ECDSA-AES128-GCM-SHA256
- ECDH-RSA-AES128-SHA256
- ECDH-ECDSA-AES128-SHA256
- ECDH-RSA-AES128-SHA
- ECDH-ECDSA-AES128-SHA
- AES128-GCM-SHA256
- AES128-SHA256
- AES128-SHA
- SEED-SHA
- CAMELLIA128-SHA
- IDEA-CBC-SHA
- IDEA-CBC-MD5
- RC2-CBC-MD5
- PSK-AES128-CBC-SHA
- ECDHE-RSA-RC4-SHA
- ECDHE-ECDSA-RC4-SHA
- AECDH-RC4-SHA
- ADH-RC4-MD5
- ECDH-RSA-RC4-SHA
- ECDH-ECDSA-RC4-SHA
- RC4-SHA
- RC4-MD5
- RC4-MD5
- PSK-RC4-SHA
- ECDHE-RSA-DES-CBC3-SHA
- ECDHE-ECDSA-DES-CBC3-SHA
- SRP-DSS-3DES-EDE-CBC-SHA
- SRP-RSA-3DES-EDE-CBC-SHA
- SRP-3DES-EDE-CBC-SHA
- EDH-RSA-DES-CBC3-SHA
- EDH-DSS-DES-CBC3-SHA
- DH-RSA-DES-CBC3-SHA
- DH-DSS-DES-CBC3-SHA
- AECDH-DES-CBC3-SHA
- ADH-DES-CBC3-SHA
- ECDH-RSA-DES-CBC3-SHA
- ECDH-ECDSA-DES-CBC3-SHA
- DES-CBC3-SHA
- DES-CBC3-MD5
- PSK-3DES-EDE-CBC-SHA
- EDH-RSA-DES-CBC-SHA
- EDH-DSS-DES-CBC-SHA
- DH-RSA-DES-CBC-SHA
- DH-DSS-DES-CBC-SHA
- ADH-DES-CBC-SHA
- DES-CBC-SHA
- EXP-EDH-RSA-DES-CBC-SHA
- EXP-EDH-DSS-DES-CBC-SHA
- EXP-ADH-DES-CBC-SHA
- EXP-DES-CBC-SHA
- EXP-RC2-CBC-MD5
- EXP-ADH-RC4-MD5
- EXP-RC4-MD5

</details>

## SSH / SFTP

SFTP (SSH File Transfer Protocol) transfers files over an encrypted SSH (Secure Shell) session. When a connection is established, both sides negotiate which ciphers and algorithms to use from their shared supported sets.

<details>
<summary>View supported SSH algorithms</summary>

**Key-exchange methods**

- diffie-hellman-group1-sha1
- diffie-hellman-group14-sha1
- diffie-hellman-group-exchange-sha1
- diffie-hellman-group-exchange-sha256
- ecdh-sha2-nistp256
- ecdh-sha2-nistp384
- ecdh-sha2-nistp521

**Ciphers**

- aes128-ctr
- aes192-ctr
- aes256-ctr
- aes256-cbc
- rijndael-cbc<span>@</span>lysator.liu.se
- aes192-cbc
- aes128-cbc
- blowfish-cbc
- arcfour128
- arcfour
- cast128-cbc
- 3des-cbc

**HMACs**

- SHA1
- SHA1-96
- SHA2-256
- SHA2-512
- MD5
- MD5-96
- RIPEMD-160

</details>

## PGP

PGP (Pretty Good Privacy) encrypts individual files using a public/private key pair. The sender encrypts using the recipient's public key; only the recipient's private key can decrypt the file. This protects the file both at rest and during transfer, regardless of whether the connection itself is encrypted.

OpCon MFT supports PGP through the PGPENCRYPT and PGPDECRYPT commands and can generate its own PGP keys — no additional software is required.

**Default settings:** AES-128 cipher, ZIP compression, SHA-1 hash. In PGP 2.6 compatibility mode: IDEA cipher, MD5 hash.

<details>
<summary>View supported PGP algorithms</summary>

**Symmetric ciphers**

- AES (128-bit)
- AES192
- AES256
- IDEA
- CAST5
- Blowfish
- Twofish
- 3DES

**Key algorithms**

- RSA (1024-, 2048-, and 4096-bit)
- DSA (1024-, 2048-, and 4096-bit)
- Elgamal

**Hash methods**

- MD5
- SHA1
- RIPEMD160
- SHA 256-bit, 384-bit, 512-bit
- SHA-224

**Compression algorithms**

- Uncompressed
- ZIP
- ZLIB
- BZIP2

</details>

## ZIP

OpCon MFT supports password-protected encrypted ZIP files through the ZIP and UNZIP commands.

Two encryption ciphers are available:

| Cipher | Security | Compatibility |
|---|---|---|
| **PKZIP** (legacy) | Known to be insecure | Supported by most ZIP programs |
| **AES-256** | Military-grade, recommended | Supported by WinZip (2004+), WinRAR (2013+), and most commercial programs |

When strong security is required, use AES-256 or add a second layer of encryption — PGP for files at rest, or TLS for files in transit.

## CMS

CMS (Cryptographic Message Syntax) encrypts files using SSL/TLS certificates rather than PGP keys. OpCon MFT supports signed, encrypted, and signed+encrypted CMS envelopes through the CMSENCRYPT and CMSDECRYPT commands. Symmetric passphrase support is also available.

<details>
<summary>View supported CMS ciphers</summary>

- des3 (default)
- des
- seed
- rc2-40
- rc2-128
- rc2-64
- aes128
- aes192
- aes256
- camellia128
- camellia192
- camellia256

</details>

## Glossary

**CMS (Cryptographic Message Syntax)** — A standard for digitally signed and encrypted messages. OpCon MFT supports CMS envelopes through the CMSENCRYPT and CMSDECRYPT commands.

**HMAC (Hash-based Message Authentication Code)** — A mechanism for verifying the integrity and authenticity of a message using a cryptographic hash function combined with a secret key.

**Perfect Forward Secrecy (PFS)** — A property of certain cipher suites that generates unique session keys for each connection, ensuring that compromise of a server's private key does not expose previously recorded sessions.

**PGP (Pretty Good Privacy)** — A file-level encryption standard used to protect data at rest or in transit. OpCon MFT supports PGP encryption and decryption through the PGPENCRYPT and PGPDECRYPT commands.

**SFTP (SSH File Transfer Protocol)** — A file transfer protocol that operates over an SSH (Secure Shell) session, providing encrypted file transfer capability.

**SSL (Secure Sockets Layer)** — An older connection-level encryption protocol, now superseded by TLS. OpCon MFT retains support for SSL 3.0 for compatibility with legacy systems.

**TLS (Transport Layer Security)** — The modern replacement for SSL, used to encrypt connections made over FTPS and HTTPS protocols.

## FAQs

**What is the difference between connection-level security and file-level security?**

Connection-level security (SSL/TLS, SSH) encrypts data while it is in transit between systems. File-level security (PGP, ZIP, CMS) encrypts the file itself, so it remains protected whether it is stored locally, at rest on a server, or being transferred.

**Which encryption should be used for the highest security?**

For data in transit, use TLS 1.2 with a PFS-enabled cipher. For data at rest or when the remote server cannot automatically decrypt files, use PGP with AES-256 and the RSA or DSA key algorithm. For ZIP encryption, use AES-256 rather than the legacy PKZIP scheme.

**Can OpCon MFT generate its own PGP keys?**

Yes. OpCon MFT can generate PGP keys using either the RSA or DSA algorithm at 1024-, 2048-, or 4096-bit key lengths. No additional software is required.

**Related topics:**

- [Architecture](./architecture.md)
- [MFT Agent installation](./agent-installation.md)
- [Encryption Definitions](./agent-encryption-definitions.md)
