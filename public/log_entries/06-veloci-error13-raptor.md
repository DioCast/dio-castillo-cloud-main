I thought the Terraform-asaurus Rex was the only danger in this cloud jungle. I built walls. I diverted stampedes. I felt safe. But in this **Mesozoic World**, you never see the real attack coming.

While I was watching the big, loud T-Rex, I was ambushed by a silent killer: `Exit Code 13`.

### The First Ambush (The Cowboy Phase)

It first struck during my second deployment. I was migrating code to the `dimarc-www-prod` project. I was being a "Cowboy"—no folder structure, no Group Admin permissions, just dragging and dropping files. The build pipeline crashed instantly.

![Raptor Pack Ambush](images/raptors.gif)
_The invisible service accounts realizing I forgot to give them permission to speak._

### The Second Ambush (The Architect Phase)

I thought I had learned my lesson. For the third deployment (to `dio-castillo-cloud`), I did everything right. I set up **Group Admin permissions**. I organized the code into `infra/website/api` folders. I was still in the raw Terraform jungle (not the easy Firebase Sanctuary).

But the **Veloci-error13-raptor** was waiting. It attacked again. The error was a masterclass in gaslighting: `Error: Failed to upload... exit status 13`.

### The Hunt

I tried to check the Cloud Build logs. **Access Denied.**
I tried to check the Cloud Function logs. **Access Denied.**

I stared at the screen, realizing I hadn't just made a mistake; I had been outsmarted. I was hunting the wrong target while the system attacked my permissions from the side.

> "Clever Girls."

I realized I was fighting an **Identity Crisis**. Even with Group Admins, my robots (Service Accounts) couldn't talk to each other. The Cloud Build robot couldn't read the new folder structure, and the Cloud Function robot couldn't write its own crash logs.

Worse, it was an **Evolutionary Mismatch**. My infrastructure was built on "Gen 1" fossils, but my code was trying to run as a modern Python 3.10 mammal. The two eras couldn't coexist.

### The Resolution: Outsmarting the Beast

I didn't fight with force. I outsmarted it.

1. **The Bait:** I stopped trying to force the modern runtime. I "de-evolved" my Python version back to 3.9 to match the ancient environment.
2. **The Trap:** I cleaned up the "stale" zip files in the temporary folders that were confusing the build process.
3. **The Taming:** I explicitly granted the `Service Account User` role to the build agent, effectively saying, "He's with me".

![Taming the Raptor](images/raptor.gif)
_Me finally getting the Service Accounts, Cloud Build, and Python Runtime to work together._

The deployment finished. The API came online. The visitor counter ticked up to 1. I survived the ambush.

---

### The Next Stage of the Journey

The backend brain is alive. But fighting dinosaurs in the dark is exhausting. I have a Resume in a bucket, a consultancy site in Firebase, and battle scars from the Terraform jungle.

It is time to step back from the raw infrastructure and create a central **hub** to catalogue these expeditions. I need to draw the map.

On the Horizon: **The Field Guide - Charting the Uncharted.**
