# yet™️

Yet™️ another TODO app

## Let's talk requirements.

One of the first prompts was _Production Grade_. The definition of production grade is so variable and with the time limit I made sacrafices that would need attention before shipping.

For the most part this app is ready to use with only 1 bug that I know of. I am considering that _Production Enough™️_ for this assignment. Knowing that you are probably more interested in when I would consider this app ready for prod I took the liberty of writing out what should be done before launch.

I will be breif for the sake of brevity rather than over communication. In order of importance:

1. 🐞 Bug bash

   - There is one bug in particular that would block me from launching (and is the only bug as far as I am aware). There is seemingly a race condition when creating more than one category without refreshing.
   - It would be important to stress test this before any launch to make sure that is in fact the only bug, and that it is fixed.

2. 🧪 Testing

   - Without time and the intention, currently, of moving on from this project without further additions/maintenece I choose _NOT_ to spend my time on testing.
   - The app is small and reasonable trivial, so I would spend most if not all of my time writing integration tests to ensure the app functions as expected.

3. 💸 Tech debt

   - As with any app there are some small (relative to the size of the application) where I didn't follow preferred software architecture principles. Similarly with tests, if the intention was to keep working I would pay off this debt soon, since it's small and will eventually have a big impact to some of the more complex parts of the code.

4. 🧸 Jank

   - Since the intention of the exercise was, to some degree, speed the user experience of the application didn't have time to go through more than a single iteration. Becuase of this there are some janky interactions in the application that, given the time, I would like to clean up.
   - As an example: Switching between the category chooser and the task content. It isn't as quick as I'd like it and there are some actions that feel more intuative, like continually pressing `<Enter>` rather than `<Tab>`, that I would want to play with.

5. ✨ Features

   - As a result of the time and therefore fewer iterations on the product there are some features that I feel were initially missed or passed on for the sake of time.
   - Here is where I would spend more time to add to the depth of the product:

     1. Onboarding. There is no on boarding flow and the cues are probably too sublte to get good usage from a new customer.
     2. Integrations. I would like to add some integrations and make the product a hub connecting multiple todo style lists.
     3. Drag and Drop between categories. There is no way to move a to do item from one category to the other, drag and drop seems like a good place to start exploring that.
     4. SEO, Loggin, Landing page, etc. Marketing and distribution type things. No need to spend time here of the sake of this exercise but is absolutely worthy of some thought before a launch.

6. 🎙 User interviews

   - I put this one last because ideally it would have happened from the beginning, but with time constraints it wasn't really done. I realized to added a breif of _who_ the target is, but that is only a super minimal understanding and insuffienct in my mind to create something right the first time. Even with personal projects I spend time talking with potential customers and run some of my ideas by them, and I would have liked to do the same for this app. Similarly I would invite a few early users in to help tightly iterate on the first version before a true public launch.

I hope this gives you a better understanding of my standerds for _prodction_ applications, and if you have any questions around what I have written, that app as is, or things that I may have missed, I would love to hear for you!
