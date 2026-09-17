In the cloud, web traffic isn't a gentle stream. It’s a stampede. Imagine a thousand primitive beasts running full speed down a narrow gorge. You need a **Global External Load Balancer** to catch them and **steer them into the right canyon**.

I call it "The Stampede Diverter." It is expensive. And because I am stubborn, I didn't just build one. I built three.

### The First Stampede: Twigs and Bushes (Denial)

When I saw the price tag ($18/mo), I balked. I decided to build a barrier out of **twigs and bushes** using GoDaddy **"Masked Forwarding."** It put a camouflage net over the URL so it looked like `resume.dio-castillo.cloud`.

![Dinosaur Stampede](images/stampede.gif)
_Actual footage of my "Masked Forwarding" strategy trying to handle direct links._

The stampede crashed right through it. When I tried to use anchor links (like `#post-03`), the camouflage hid the signposts. The navigation broke. I realized you can't stop a stampede with bushes.

### The Second Stampede: The Boulder Wall (Acceptance)

For the second attempt, I provisioned the real **Google Cloud Load Balancer**. It took 45 minutes just to roll the rocks into place (provision the SSL). It worked, but I watched my free trial credits ticking down like an hourglass, knowing I had to delete it quickly.

### The Third Stampede: The Fortress (Discipline)

The third time was about the landscape. I had built the wall in the wrong valley (wrong project structure). I had to tear it down and rebuild the **Stampede Diverter** a third time in its final, permanent canyon.

**The Lesson:** "Twigs" are cheap, but they break. "Boulders" are expensive, so you better place them on the right map coordinates the first time.

---

### The Next Stage of the Journey

The valley is secure. But while I was busy fortifying the perimeter, I didn't notice the danger lurking inside my own code.

It attacked me in the second valley. It tracked me to the third. And unlike the stampede, this one didn't want to trample the site—it wanted to erase it.

On the Horizon: **The Attack of the Veloci-error13-raptor**.
