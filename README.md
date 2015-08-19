# NavSync

NavSync is an easy to use jQuery plugin that does the heavylifting for syncing your navigation to your content. All it requires is a semantically built navigation menu and a couple of lines of code, easy as pie.

###Demo
Demo the buttery smoothness of NavSync at the live [http://www.ryanpark.co.uk/navsync](demo page!)

### Features
So far the following is what NavSync supports;
  - Synchronizing menus to the content that is currently on screen.
  - Custom Animation Time
  - Accounting for fixed headers
  - Buttery Smooth 60 FPS animation*


Below is what NavSync does **not** support, but is planned;
  -  Custom Easing
  -  Scroll to Anchor on Page Load

*With responsible use of CSS

# Getting Started
Loading NavSync - Yes, that's all it takes.
```
$(window).load(function() {
  $("nav").navSync();
});
```
Your HTML structure:
```
<nav>
  <a href="#anchor-1">First Link</a>
  <a href="#anchor-2">Second Link</a>
  <a href="#anchor-3">Third Link</a>
  <a href="/example/">Fourth Link</a>
</nav>

<section id="anchor-1">
  <p>I will be scrolled to!</o>
<section>

<section id="anchor-2">
  <p>I will be scrolled to!</o>
<section>

<section id="anchor-3">
  <p>I will be scrolled to!</o>
<section>

<section id="anchor-4">
  <p>I will not be scrolled to!</o>
<section>
```

Note that link number 4 is a link to an external page, links without an anchor will be ignored.

# Advanced Options
NavSync has a number of parameters to make use of, for example the ability to tweak with scrolling behaviour, speed of scrolling animations, and the name of the class applied to your header items. These are available to let you customize the behaviour of NavSync however you see fit.
### highlightClass
```
$("nav").navSync({hightlightClass : "highlight-menu-item"});
```
Changes the default class from "navsync-menu-highlight" to "highlight-menu-item". The class is removed once the item has been scrolled past, and reapplied if the user scrolls up.
### animationTime
```
$("nav").navSync({animationTime : 800});
```
Changes the default animation time for scrolling from 300ms to 800ms, generally scroll speeds of above a second are unwarranted. This should serve as a smell embellishment, not a super funky feature of your website.
### ignoreNavHeightHighlight
```
$("nav").navSync({ignoreNavHeightHighlight : true});
```
By default NavSync will take into account the height of the header when applying the highlight class, if you aren't using a fixed header or simply dislike this behaviour this will turn it off.
### ignoreNavHeightScroll
```
$("nav").navSync({ignoreNavHeightScroll: true});
```
By default NavSync will also take into account the height of the header when scrolling to a given anchor, this option can be disabled independently of the former option and is advised if that is the case.
### disableDynamicPosition
```
$("nav").navSync({disableDynamicPosition: false});
```
Enables dynamic position calculations on each frame, this is disabled by default for a **VERY** good reason. Only turn this on if you know what you're doing, or if you absolutely NEED positions calculated each scroll event. This will eat performance, especially on mobile devices.
