# Container King

Manage Firefox's containers like sub-sessions.

## Extension context

Firefox allows users to create containers to keep stored cookies, history and bookmarks isolated from other containers. These behave like a separate sub-session within the global browsing session.

This macro aims to provide better usability when using the above container functionality and session restore. Firefox doesn't discriminate between containers on restart so it reopens all windows/tabs that were present during the last shutdown.  
This extension will automatically save and close all tabs within a container when requested. With a single click you'll be able to reopen them. This way you don't have to keep all windows/tabs open all the time just to make use of the automatic session restore feature.

## Usage scenario

Say you're starting off learning Rust. The first thing you do is create a new container for all Rust related documentation, example projects and forums.  
During the day you're a happy Rust programmer and live is good, but somewhere during the evening you're fed up and decide to play a computer game. You proceed with closing your browser so it would release that 2Gigs of RAM and not consume CPU-time in the background.

The problem occurs when you **need** your browser again for short sessions of googling or
checking your mail when there is some queue time!  
You start Firefox, automatic session restore kicks in, and BAM!. All 5 windows for a total of 80 tabs open because that was the state when you last closed Firefox. The 'short'
session is suddenly a longer one because you need to wait until the browser becomes snappy again.

Using this extension you wouldn't need to keep all tabs open all the time because it automatically records your container history and assists you by providing a natural browing experience!


## Extension requirements

- Firefox sidebar
- Automatically remembering closed tabs/tabs from closed windows.
- Button to restore the saved tabs for a specific container.

There is a lot of room for more features.  
For example allowing the user to set some 'active time' per container; Work - from 08:00 to 18:00. This would allow the extension to automatically store and close all 'Work' container tabs during automatic session restore.

## Extension debugging

1. Open firefox, browse to `about:debugging`
2. Enable Add-on debugging
3. Load temporary Add-on, browse to the manifest file.
4. Profit! Click 'debugging' after the extension has succesfully loaded.

## Links

- [Web-extension-API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
- [manifest.json info](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- [webextension guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)
- [web-extension examples](https://github.com/mdn/webextensions-examples)
- Brower action: Manually create a (sub)session and add/remove specific tabs. Supports firefox containers [tabsaver](https://github.com/Reeywhaar/tabsaver), we attempt to do this automatically and in a supportive way  
    ![screenshot](https://scontent.fbru1-1.fna.fbcdn.net/v/t1.15752-9/39401686_445645319252713_1519395876970168320_n.png?_nc_cat=0&oh=216656eae3f2f1d97c5852a1b4b40904&oe=5C084E97)
- Sidebar example met tab management [tabcenter-redux](https://github.com/eoger/tabcenter-redux),  
    ![screenshot](https://image.ibb.co/b3kbJK/afbeelding.png)
- tabgroups replacement, fancy ui [conex](https://github.com/kesselborn/cone)