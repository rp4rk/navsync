# NavSync

NavSync is an easy to use jQuery plugin that does the heavylifting for syncing your navigation to your content. All it requires is a semantically built navigation menu and a couple of lines of code, easy as pie.

###Demo
Demo the buttery smoothness of NavSync at the live [demo page!](http://www.ryanpark.co.uk/navsync)

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
```javascript
$(window).load(function() {
  $("nav").navSync();
});
```
Your HTML structure:
```html
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
```javascript
$("nav").navSync({hightlightClass : "highlight-menu-item"});
```
Changes the default class from "navsync-menu-highlight" to "highlight-menu-item". The class is removed once the item has been scrolled past, and reapplied if the user scrolls up.
### animationTime
```javascript
$("nav").navSync({animationTime : 800});
```
Changes the default animation time for scrolling from 300ms to 800ms, generally scroll speeds of above a second are unwarranted. This should serve as a smell embellishment, not a super funky feature of your website.
### ignoreNavHeightScroll
```javascript
$("nav").navSync({ignoreNavHeightScroll: true});
```
By default NavSync will also take into account the height of the header when scrolling to a given anchor, this option can be disabled independently of the former option and is advised if that is the case.

### Performance Tips
Some CSS properties will severely affect draw performance, there are a few fixes to these however styling responsibly will always give the best framerate.

#### Shadows
Dynamically generated shadows for effects such as CSS box-shadow and text-shadow will redraw each frame, and can severely effect framerate.

#### Filters
Some popular effects involve blurring images or otherwise filtering depending on where the user scrolls to, these effects are also very expensive.

#### Position Changes
Anything that changes the position of an element will significantly effect framerate, there are two workarounds. Either prerendering your CSS animation, or using the translate transform instead. See the performance difference between using effects like [top/left/right/bottom](http://codepen.io/paulirish/full/nkwKs) and [translate](http://codepen.io/paulirish/full/LsxyF).

### Performance Fixes
If you have an effect which you feel is essential and worth a hit in performance, it can sometimes be compensated for by forcing hardware acceleration. To do this, use the the following css:
```css
transform: translateZ(0)
```

Note this cannot be used many times, and doing so will again result in poor performance.
