Building the HTML for this website was therapeutic. It’s just text. It can't hurt anyone. Deploying it to the cloud, however? That’s where the real monsters live.

### The "Petting Zoo" of Click-Ops

In the Google Cloud Console, launching a website feels safe. You navigate pleasant menus, click "Create Bucket," check a few boxes, and you’re live. We call this **"Click-Ops."**

It’s easy, but it’s fragile. It feels like managing a petting zoo. Sure, it's cute, but what happens when you need 500 identical petting zoos by tomorrow morning? You can't click that fast.

### Unleashing the T-Rex

To prove I’m ready for enterprise-scale cloud computing, I had to leave the petting zoo and learn Infrastructure as Code (IaC). Enter **Terraform**.

In my head, I call it the **Terraform-asaurus Rex**. Why? Because it is immensely powerful, slightly terrifying, and if you don't give it the exact right instructions, it will eat your entire production environment for lunch.

![Chrome Dino Run](images/dino.gif)
_Actual footage of me trying to run Terraform for the first time._

### Feeding Instructions for the Beast

You don't "click" a T-Rex into submission. You write code. My `main.tf` file is basically the feeding instructions for the dinosaur. It tells Google Cloud exactly what to spin up—no ambiguity allowed:

- **The Habitat:** Google Cloud Platform (us-west1).
- **The Nest:** A Storage Bucket named `dio-resume-website-2025`.
- **Gate Access:** Public read permissions (IAM policies).

### The "Hold Onto Your Butts" Moment

Wrestling with IAM permissions felt like trying to put a leash on the dinosaur. But then came the moment of truth. Typing `terraform apply` is the cloud engineer's equivalent of saying, _"Hold onto your butts."_

I hit enter. The terminal scrolled green text. The beast roared (silently). And suddenly... infrastructure existed. I didn't touch the browser once. It was terrifying magic.

### Why It Matters

Now, I don't fear a site crash. If this website gets wiped out by a meteor today, I don't have to remember which buttons I clicked. I just unleash the Terraform-asaurus Rex again, and it rebuilds my entire world in 30 seconds.

---

### The Next Stage of the Journey

But manually feeding a T-Rex is dangerous work!

On the Horizon: **Building a CI/CD pipeline—an automated feeding system—** so I can deploy updates from a safe distance without getting my hand bitten off.
