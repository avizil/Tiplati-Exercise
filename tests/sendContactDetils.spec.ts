import { test, expect, Page } from "@playwright/test";
import "dotenv/config";

const url: string = "https://qa-tipalti-assignment.tipalti-pg.com/index.html";
const firstName: string = process.env.FIRST_NAME!;
const lastName: string = process.env.LAST_NAME!;
const email: string = process.env.EMAIL!;
const uniqueDogMessageMap: Map<string, string> = new Map([
   ["Kika", "Hello Kika!"],
   ["Lychee", "Hello Lychee!"],
   ["Kimba", "Hello Kimba!"],
]);

/* 
    Due to lack of time, I compelted the tests but did not finish cleaning the code.
    The test cases are repetetive. 
    If I a bit more time I would export most of the test case's code into an external async function(page, dogName) that would take care of the test's logic.
*/

test("Kika test", async ({ page }) => {
   const dogName: string = "Kika";
   await page.goto(url);
   // Open menu
   await page.getByRole("link", { name: "Menu" }).click();
   await page.waitForSelector("div.inner");
   const path: string = "//nav//div[@class='inner']//li//a";
   const elements = page.locator("xpath=" + path);
   const count = await elements.count();
   const menuOptions: string[] = [];
   let linkToClick;
   for (let i = 0; i < count; i++) {
      console.log(await elements.nth(i).textContent());
      const elementText = await elements.nth(i).textContent();
      menuOptions.push((await elements.nth(i).textContent()) || "");
      if (dogName === elementText) linkToClick = await elements.nth(i);
   }

   await expect(menuOptions.includes(dogName)).toBeTruthy();

   await linkToClick.click();

   // Fill details
   await fillDetails(page, dogName);

   await page.getByRole("button", { name: "Send" }).click();
});

test("Lychee test", async ({ page }) => {
   const dogName: string = "Lychee";
   await page.goto(url);
   // Open menu
   await page.getByRole("link", { name: "Menu" }).click();
   await page.waitForSelector("div.inner");
   const path: string = "//nav//div[@class='inner']//li//a";

   const elements = page.locator("xpath=" + path);
   const count = await elements.count();
   const menuOptions: string[] = [];
   let linkToClick;
   for (let i = 0; i < count; i++) {
      console.log(await elements.nth(i).textContent());
      const elementText = await elements.nth(i).textContent();
      menuOptions.push((await elements.nth(i).textContent()) || "");
      if (dogName === elementText) linkToClick = await elements.nth(i);
   }

   await expect(menuOptions.includes(dogName)).toBeTruthy();

   await linkToClick.click();

   // Fill details
   await fillDetails(page, dogName);

   // Send
   await page.getByRole("button", { name: "Send" }).click();
});

test("Kimba Test", async ({ page }) => {
   const dogName: string = "Kimba";
   await page.goto(url);
   // Open menu
   await page.getByRole("link", { name: "Menu" }).click();
   await page.waitForSelector("div.inner");
   const path: string = "//nav//div[@class='inner']//li//a";

   const elements = page.locator("xpath=" + path);
   const count = await elements.count();
   const menuOptions: string[] = [];
   let linkToClick;
   for (let i = 0; i < count; i++) {
      console.log(await elements.nth(i).textContent());
      const elementText = await elements.nth(i).textContent();
      menuOptions.push((await elements.nth(i).textContent()) || "");
      if (dogName === elementText) linkToClick = await elements.nth(i);
   }

   await expect(menuOptions.includes(dogName)).toBeTruthy();

   await linkToClick.click();

   // Fill details
   await fillDetails(page, dogName);

   //    Send
   await page.getByRole("button", { name: "Send" }).click();
});

async function fillDetails(page: Page, dogName: string) {
   const uniqueDogMessage = uniqueDogMessageMap.get(dogName);
   await page.getByRole("textbox", { name: "Name" }).fill(firstName + " " + lastName);
   await page.getByRole("textbox", { name: "Email" }).fill(email);
   await page.getByRole("textbox", { name: "Message" }).fill(uniqueDogMessage || `Hello ${dogName}!`);
}
