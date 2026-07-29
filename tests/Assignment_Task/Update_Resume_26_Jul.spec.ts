import {test,expect} from '@playwright/test';
import * as path from 'path';

test('Basic web test-verify the resume update functionality',async({page})=>{
    await page.goto('https://www.naukri.com/');
    const alertWindow = page.frameLocator('iframe[title="Sign in with Google Dialogue"]').locator('div#close svg');
   if(alertWindow){
    await alertWindow.first().click();
   }
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email ID / Username' }).click();
    await page.getByRole('textbox', { name: 'Email ID / Username' }).fill('sanjeet.kumar.dm41@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Program@77');
    await page.locator("//button[@type='submit' and @class='btn-primary loginButton']").click();
     await page.waitForURL('**/mnjuser/homepage**');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'View profile'}).click({force:true});
    await page.waitForURL('**/mnjuser/profile**');
    const filePath = path.join("C:\\Users\\com\\Desktop\\Job Searh\\Resume\\June\\Resume\\2\\7", 'Sanjeet-kumar-resume.pdf');
    const fileInput = page.locator('input#attachCV');
    fileInput.setInputFiles(filePath);
   
//    const successMessage = page.locator('.toast, .msgHeader, .status-msg')
//     .or(page.getByText(/Resume has been successfully uploaded|uploaded successfully/i));

  //await expect(successMessage).toBeVisible({ timeout: 15000 });

});

test('Basic web test-verify the resume download functionality',async({page})=>{
  await page.goto('https://www.naukri.com/');
   const alertWindow = page.frameLocator('iframe[title="Sign in with Google Dialogue"]').locator('div#close svg');
   if(alertWindow){
    await alertWindow.first().click();
   }
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email ID / Username' }).click();
    await page.getByRole('textbox', { name: 'Email ID / Username' }).fill('sanjeet.kumar.dm41@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Program@77');
    await page.locator("//button[@type='submit' and @class='btn-primary loginButton']").click();
    await page.waitForURL('**/mnjuser/homepage**');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'View profile'}).click();
    await page.waitForURL('**/mnjuser/profile**');
    const downloadPromise = page.waitForEvent('download');
    await page.getByTitle('Click here to download your resume').click();
    const download = await downloadPromise;
    const downloadPath = await download.path();
    console.log('Downloaded file path:', downloadPath);
    download.saveAs('C:\\Users\\com\\Downloads\\MyResume\\Downloaded_Resume.pdf');
  
});