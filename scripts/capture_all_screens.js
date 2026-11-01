import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const TARGET_DIR = '/Users/vajrasingh/Desktop/Mamta_App_UI_Screens';
const ENGLISH_DIR = path.join(TARGET_DIR, 'English_Screens');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}
if (!fs.existsSync(ENGLISH_DIR)) {
  fs.mkdirSync(ENGLISH_DIR, { recursive: true });
}

const SCREENS = [
  { num: 1, name: '01_Splash_Screen.jpg', nameEn: '01_Splash_Screen_EN.jpg' },
  { num: 2, name: '02_Language_Selection.jpg', nameEn: '02_Language_Selection_EN.jpg' },
  { num: 3, name: '03_Welcome_Onboarding.jpg', nameEn: '03_Welcome_Onboarding_EN.jpg' },
  { num: 4, name: '04_Consent_and_Privacy.jpg', nameEn: '04_Consent_and_Privacy_EN.jpg' },
  { num: 5, name: '05_Pregnancy_Registration.jpg', nameEn: '05_Pregnancy_Registration_EN.jpg' },
  { num: 6, name: '06_Home_Dashboard.jpg', nameEn: '06_Home_Dashboard_EN.jpg' },
  { num: 7, name: '07_Talk_to_Mamta_AI.jpg', nameEn: '07_Talk_to_Mamta_AI_EN.jpg' },
  { num: 8, name: '08_Pregnancy_By_Week.jpg', nameEn: '08_Pregnancy_By_Week_EN.jpg' },
  { num: 9, name: '09_Checkups_and_ANC.jpg', nameEn: '09_Checkups_and_ANC_EN.jpg' },
  { num: 10, name: '10_Voice_Recording.jpg', nameEn: '10_Voice_Recording_EN.jpg' },
  { num: 11, name: '11_Photo_Upload_Prescription.jpg', nameEn: '11_Photo_Upload_Prescription_EN.jpg' },
  { num: 12, name: '12_Symptoms_and_Triage.jpg', nameEn: '12_Symptoms_and_Triage_EN.jpg' },
  { num: 13, name: '13_Reminders_and_Alerts.jpg', nameEn: '13_Reminders_and_Alerts_EN.jpg' },
  { num: 14, name: '14_Family_Support_MIL.jpg', nameEn: '14_Family_Support_MIL_EN.jpg' },
  { num: 15, name: '15_Care_Timeline.jpg', nameEn: '15_Care_Timeline_EN.jpg' },
  { num: 16, name: '16_Get_Help_and_SOS.jpg', nameEn: '16_Get_Help_and_SOS_EN.jpg' },
  { num: 17, name: '17_Health_Records.jpg', nameEn: '17_Health_Records_EN.jpg' },
  { num: 18, name: '18_ASHA_Worker_Portal.jpg', nameEn: '18_ASHA_Worker_Portal_EN.jpg' },
  { num: 19, name: '19_Home_Remedy_AI_Verification.jpg', nameEn: '19_Home_Remedy_AI_Verification_EN.jpg' },
  { num: 20, name: '20_Mobile_OTP_Login.jpg', nameEn: '20_Mobile_OTP_Login_EN.jpg' },
  { num: 21, name: '21_Maternal_Health_Profile.jpg', nameEn: '21_Maternal_Health_Profile_EN.jpg' },
  { num: 22, name: '22_AI_Pallor_and_Vitals_Scan.jpg', nameEn: '22_AI_Pallor_and_Vitals_Scan_EN.jpg' },
  { num: 23, name: '23_Nutrition_and_Diet_Guide.jpg', nameEn: '23_Nutrition_and_Diet_Guide_EN.jpg' }
];

async function runCapture() {
  console.log('🚀 Starting Google Chrome Headless for UI Screenshot Export...');
  const port = 9229;
  const chromeProcess = exec(
    `"/Users/vajrasingh/Desktop/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --remote-debugging-port=${port} "http://localhost:5173/?screen=1&nospeech=1"`
  );

  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Get debug target
  const pageTarget = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find((p) => p.url && p.url.includes('5173'));
          if (page) resolve(page);
          else reject(new Error('No active page on 5173 found in CDP targets'));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });

  console.log('📱 Connected to CDP Page:', pageTarget.url);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  // 1. Set iPhone 15 Pro resolution with 2x Retina scale
  console.log('📐 Configuring Mobile Device Metrics (430 x 932 @ 2x)...');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 430,
    height: 932,
    deviceScaleFactor: 2,
    mobile: true
  });

  // 2. Capture Hindi Screens (Default)
  console.log('\n📸 --- CAPTURING HINDI APP SCREENS (1 to 23) ---');
  await sendCommand('Runtime.evaluate', {
    expression: `window.__setLanguage && window.__setLanguage('hi');`
  });
  await new Promise((r) => setTimeout(r, 400));

  for (const screen of SCREENS) {
    // Navigate
    await sendCommand('Runtime.evaluate', {
      expression: `window.__navigateTo && window.__navigateTo(${screen.num});`
    });

    // Wait for transition & render
    await new Promise((r) => setTimeout(r, 450));

    // Capture JPEG screenshot
    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 92
    });

    const filePath = path.join(TARGET_DIR, screen.name);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    const stats = fs.statSync(filePath);
    console.log(`✅ Saved Screen ${screen.num}: ${screen.name} (${Math.round(stats.size / 1024)} KB)`);
  }

  // 3. Capture English Screens
  console.log('\n📸 --- CAPTURING ENGLISH APP SCREENS (1 to 23) ---');
  await sendCommand('Runtime.evaluate', {
    expression: `window.__setLanguage && window.__setLanguage('en');`
  });
  await new Promise((r) => setTimeout(r, 400));

  for (const screen of SCREENS) {
    // Navigate
    await sendCommand('Runtime.evaluate', {
      expression: `window.__navigateTo && window.__navigateTo(${screen.num});`
    });

    // Wait for transition & render
    await new Promise((r) => setTimeout(r, 450));

    // Capture JPEG screenshot
    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 92
    });

    const filePath = path.join(ENGLISH_DIR, screen.nameEn);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    const stats = fs.statSync(filePath);
    console.log(`✅ Saved English Screen ${screen.num}: ${screen.nameEn} (${Math.round(stats.size / 1024)} KB)`);
  }

  ws.close();
  chromeProcess.kill();
  console.log(`\n🎉 ALL 23 SCREENS SUCCESSFULLY EXPORTED TO:\n📂 ${TARGET_DIR}`);
}

runCapture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
