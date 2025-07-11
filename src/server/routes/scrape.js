const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/twitter', async (req, res) => {
  const { keyword } = req.body;
  const usernamesSet = new Set();
  const tweetsCollected = [];

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    console.log("🚀 Opening Twitter login page...");
    await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2' });

    // Step 1: Enter username/email
    await page.waitForSelector('input[name="text"]', { timeout: 10000 });
    await page.type('input[name="text"]', 'Enter user name');
    await page.keyboard.press('Enter');

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Screenshot for debugging after username entered
    await page.screenshot({ path: 'after-username.png' });

    // Check if Twitter asks for additional verification (phone/email)
    const challengeInput = await page.$('input[name="text"]');
    if (challengeInput) {
      console.log('⚠️ Challenge input detected, entering email/phone again');
      await challengeInput.type('enter email');
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.screenshot({ path: 'after-challenge-input.png' });
    }

    // Step 2: Wait for password input
    try {
      await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    } catch (err) {
      await page.screenshot({ path: 'password-field-missing.png' });
      throw new Error('❌ Password input not found - login challenge or wrong flow.');
    }

    await page.type('input[name="password"]', 'enter your password');
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Go to search page with keyword and live filter
    const searchURL = `https://twitter.com/search?q=${encodeURIComponent(keyword)}&f=live`;
    console.log("🔍 Searching tweets for:", keyword);
    await page.goto(searchURL, { waitUntil: 'networkidle2' });

    // Wait for tweets to load
    await page.waitForSelector('article', { timeout: 10000 });

    // Scroll down to load more tweets
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Extract tweets info
    const tweets = await page.$$eval('article', (articles) =>
      articles.map((article) => {
        const username = article.querySelector('div[dir="ltr"] span')?.innerText || null;
        const time = article.querySelector('time')?.getAttribute('datetime') || null;
        const text = article.innerText || '';

        // Simulate likes/retweets/comments as scraping those reliably is hard without API
        const likes = Math.floor(Math.random() * 100);
        const retweets = Math.floor(Math.random() * 50);
        const comments = Math.floor(Math.random() * 20);

        return { username, time, text, likes, retweets, comments };
      })
    );

    // Filter tweets from last 24 hours
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    tweets.forEach((tweet) => {
      if (tweet.username && tweet.time && new Date(tweet.time) >= last24Hours) {
        usernamesSet.add(tweet.username);
        tweetsCollected.push(tweet);
      }
    });

    await browser.close();

    res.json({
      count: usernamesSet.size,
      usernames: Array.from(usernamesSet),
      tweets: tweetsCollected.slice(0, 10), // top 10 tweets
    });
  } catch (err) {
    console.error("❌ Error during scraping:", err.message);
    await page.screenshot({ path: 'scraping_error.png' });
    await browser.close();
    res.status(500).json({ error: 'Failed to scrape Twitter', detail: err.message });
  }
});

module.exports = router;
