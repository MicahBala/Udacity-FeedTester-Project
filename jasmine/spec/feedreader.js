'use strict';
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it('are defined', () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it('has a url defined', () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      it('has a name defined', () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    describe('The menu', () => {
      let bodyElement = document.querySelector('body');
      let menuElement = document.querySelector('.menu-icon-link');
      let myBool;

      it('element is hidden by default', () => {
        // Check if body element contains the deafult class 'menu-hidden'
        myBool = bodyElement.classList.contains('menu-hidden');

        expect(myBool).toBe(true);
      });

      it('toggles visibility', () => {
        menuElement.click();
        expect(bodyElement.classList.contains('menu-hidden')).toBe(false);

        menuElement.click();
        expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', () => {
      beforeEach(done => {
        loadFeed(0, done);
      });

      it('has at least a single entry', () => {
        let feedEntry = document.querySelector('.feed .entry');
        expect(feedEntry.length > 0).toBe(true);
      });
    });

    describe('New Feed Selection', () => {
      let container = document.querySelector('.feed');
      let firstContent, secondContent;

      beforeEach(done => {
        loadFeed(0, () => {
          firstContent = container.innerHTML;

          loadFeed(1, () => {
            done();
          });
        });
      });

      it('content changes', () => {
        secondContent = container.innerHTML;
        expect(firstContent === secondContent).toBe(false);
      });
    });
  })()
);
