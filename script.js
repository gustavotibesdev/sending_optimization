const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

(async () => {

  // User variables 
  const user = {}
  user.name = readlineSync.question("What is your username? ")
  user.password = readlineSync.question("What is your password? ")

  // Sending variables
  const send = {}
  send.recipient = readlineSync.question("Who is the recipient? ")
  send.content = readlineSync.question("Message content: ")
  send.amount = readlineSync.question("Number of messages: ")

  // Launch the browser 
  const browser = await puppeteer.launch({ headless: false });
  
  // Open a new blank page
  const page = await browser.newPage();
  
  // Navigate to instagram URL
  const url = 'https://www.instagram.com/'
  await page.goto(url);
  
  // Login 
  await page.locator('[name="username"]').fill(user.name)
  await page.locator('[name="password"]').fill(user.password)
  await page.locator('[type="submit"]').click()

  // Searching for recipient
  await page.locator('[aria-label="Pesquisa"]').click()
  await page.locator('[aria-label="Entrada da pesquisa"]').fill(send.recipient)
  await page.locator(`[alt="Foto do perfil de ${send.recipient}"]`).click()

  page.waitForNavigation()

  await page.locator('[class="x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x972fbf x10w94by x1qhh985 x14e42zd xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu x18d9i69 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n x18oe1m7 x1sy0etr xstzfhl x9f619 x1ypdohk x78zum5 x1f6kntn xwhw2v2 xl56j7k x17ydfre x1n2onr6 x2b8uid xlyipyv x87ps6o x14atkfc x5c86q x18br7mf x1i0vuye x6nl9eh x1a5l9x9 x7vuprf x1mg3h75 xn3w4p2 x106a9eq x1xnnf8n x1aavi5t x1h6iz8e xixcex4 xk4oym4 xl3ioum"]').click()

  // Sending messages
  for (let i = 0; i < send.amount; i++) {
    await page.locator('[aria-label="Mensagem"]').fill(send.content)
    await page.locator('[aria-label="Send"]').click()
  }

  // Close the browser
  await browser.close();

})();