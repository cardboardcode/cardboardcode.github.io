---
layout: post
title:  "How To Sign or Sign Off on Git Commits 🔏"
permalink: /HowToSignorSignOffOnGitCommits/
categories: git
---


This article provides **a short and sweet step-by-step guide** to set up and sign/sign off `git` **commits**. 

## **Why Sign\Sign Off on Git Commits?**
When helping out as an open-source git contributor, it lends a lot of credibility as a developer to always provide a way to contact you directly for codes you have written for large coding projects on GitHub.

Therefore, it is necessary to sign/signoff on your git commits in order to continue contributing to projects you feel are important and could benefit from your help.

## **What Is The Difference between Signing Off and Signing?**
**Signing Off** is the easier of the latter. It utilizes git features to automatically append the following phrase to every commit made:

> Signed-off-by: Your Name <youremail@yourorganizationdomain>

**Signing** attaches the **Verified** tag to your commit by checking that the commit was made on the workstation with the specific GPG key generated for that hardware. This form of check is comparatively more robust than the former since the slightest change to your profile in your journey as a developer will register you as a different individual entirely.

## **Set up and configure Git Client**

Run the following commands in your terminal:

```bash
#Set your GitHub Username
git config user.name "SURNAME NAME"
#Set your GitHub Email
git config user.email "youremail@yourorganizationdomain"
```

## **How To Sign Off Git Commit**

Use the following `git` command to sign off:

```bash
git commit --signoff --message 'This is my commit message'
#git commit -s -m "This is my commit message"
```

## **How To Sign Git Commit**

Please **skip Step 1 and 2** if you have already generated and added your GPG key.

1\. Generate your GPG key by following [the official documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)

2\. Add your GPG key to your GitHub account by following [the official documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) 

3\. Use the following `git` command to sign:

```bash
git commit -S -m "This is my commit message"
```

## **References**
1. [How To Sign Off](https://docs.pi-hole.net/guides/github/how-to-signoff/)
2. [Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
3. [Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
4. [Adding a GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) 