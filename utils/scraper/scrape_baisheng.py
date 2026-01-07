# -*- coding: utf-8 -*-
import os
import json
import time
import requests
import re
import hashlib
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

# === Configuration ===
BASE_URL = "https://www.baishengtrading.com"
LIST_URL = "https://www.baishengtrading.com/cpjj"
# Paths relative to this script (in utils/scraper/)
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "public", "data")
IMAGES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "public", "images", "products")
DATA_FILE = os.path.join(os.path.dirname(__file__), "scraped_data.json")

# Category Mapping
CATEGORY_MAP = {
    # English
    "Daily Necessities": "daily", "Daily Series": "daily", "Daily": "daily",
    "Home Series": "home", "Home": "home",
    "Furniture Series": "home", "Furniture": "home", # Merge Furniture > Home
    "Hardware Series": "hardware", "Hardware": "hardware", "Tools": "hardware", "Tool": "hardware",
    "Bags Series": "bags", "Bags": "bags", "Luggage and bags": "bags", "Luggage": "bags",
    
    # Chinese (Keep as fallback)
    "日用品系列": "daily", "日用品": "daily",
    "家居系列": "home", "家居品": "home",
    "家具系列": "home", "家具": "home",
    "五金系列": "hardware", "五金工具系列": "hardware", "五金工具": "hardware",    
    "箱包系列": "bags", "箱包收纳系列": "bags", "箱包": "bags"
}

class BaishengScraper:
    def __init__(self):
        self.data = self.load_data()
        self.ensure_dirs()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': BASE_URL + '/'
        }

    def ensure_dirs(self):
        if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)
        if not os.path.exists(IMAGES_DIR): os.makedirs(IMAGES_DIR)

    def load_data(self):
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return {}
        return {}

    def save_data(self):
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)

    def run(self):
        with sync_playwright() as p:
            print("Launching Browser...")
            browser = p.chromium.launch(headless=True)
            # Use real UA (verified fix for category breadcrumbs)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                viewport={'width': 1280, 'height': 800}
            )
            page = context.new_page()

            # PHASE 2: Extraction from Pre-crawled List
            print("Loading product URLs from product_urls.json...")
            try:
                # Use correct path
                url_path = os.path.join(os.path.dirname(__file__), 'product_urls.json')
                if not os.path.exists(url_path):
                    # Fallback to CWD check if running from root without package structure
                    url_path = 'utils/scraper/product_urls.json'
                
                with open(url_path, 'r', encoding='utf-8') as f:
                    all_product_links = json.load(f)
                print(f"Loaded {len(all_product_links)} URLs from {url_path}.")
                
                # Init Data for new links
                for link in all_product_links:
                    pid = link.split('/')[-1].replace('.html', '')
                    if pid not in self.data:
                        self.data[pid] = { "id": int(pid), "url": link, "status": "pending" }
                self.save_data()
                
            except Exception as e:
                print(f"Error loading product_urls.json: {e}")
                return

            # 2. Process Products
            pending = [pid for pid, info in self.data.items() if info.get('status') != 'completed']
            print(f"Pending products: {len(pending)}")

            for i, pid in enumerate(pending):
                print(f"[{i+1}/{len(pending)}] Processing Product {pid}...")
                try:
                    self.process_product_robust(page, pid, self.data[pid]['url'])
                    self.data[pid]['status'] = 'completed'
                    self.save_data()
                except Exception as e:
                    print(f"Error processing {pid}: {e}")
                    # try reset
                    try: page.goto("about:blank")
                    except: pass
                
                if i % 5 == 0: self.save_data() # Frequent save

            browser.close()
        
        print("Scraping Complete. Generating final JSON...")
        self.generate_final_json()

    def get_product_links(self, page, url):
        collected_links = set()
        print(f"  Accessing {url}...")
        try:
            page.goto(url, timeout=60000, wait_until='domcontentloaded')
            page.wait_for_selector("a[href*='/productinfo/']", timeout=30000)
        except Exception as e:
            print(f"List page load warning ({url}): {e}")
            return []

        # Iterate Pages
        page_num = 1
        while True:
            # 1. Scroll to bottom to trigger any loads
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(1)
            
            # 2. Collect Links
            current_links = page.evaluate("""() => {
                return Array.from(document.querySelectorAll("a[href*='/productinfo/']"))
                    .map(a => a.href)
            }""")
            new_count = 0
            for l in current_links:
                if l not in collected_links:
                    collected_links.add(l)
                    new_count += 1
            
            print(f"    Page {page_num}: Found {len(current_links)} links (New: {new_count}). Total: {len(collected_links)}")
            
            # 3. Find Next Button
            # Precise selector based on inspecting HTML: <a><span>Next</span><i>&gt;</i></a>
            next_btn = page.locator("a").filter(has=page.locator("span", has_text="Next")).last
            
            if next_btn.count() > 0 and next_btn.is_visible():
                print(f"    Clicking Next (Found buttons: {next_btn.count()})...")
                try:
                    next_btn.click()
                    time.sleep(5) # Wait longer for JS load
                    page_num += 1
                except Exception as e:
                    print(f"    Next button click failed: {e}")
                    break
            else:
                print("    No Next button found. End of list.")
                break
                
            if page_num > 15: # Safety break increased
                break
        
        return sorted(list(collected_links))

    def process_product_robust(self, page, pid, url):
        full_url = url if url.startswith('http') else BASE_URL + url
        print(f"Processing Product {pid}...")
        
        # Max retries for a single product
        for attempt in range(3):
            try:
                print(f"  Navigating: {full_url} (Attempt {attempt+1})")
                page.goto(full_url, timeout=60000, wait_until='domcontentloaded')
                
                # Check 404
                if "404" in page.title():
                    print("  404 Not Found")
                    self.data[pid]['status'] = 'failed'
                    self.save_data()
                    return

                # Wait for core element
                try:
                    page.wait_for_selector('.productSummaryBind_Style1', timeout=10000)
                except:
                    print("  Element wait timeout, maybe partial load...")

                # Scrape EN
                self.force_language(page, 'en')
                en_data = self.scrape_page_data_strict(page, 'en')
                
                # If EN title empty, retry immediately
                if not en_data['title']:
                    print("  Empty EN data, retrying...")
                    time.sleep(2)
                    continue
                
                # Download Images (from EN page)
                unique_images_rel_paths = self.download_images_strict(pid, en_data['images'])

                # Switch to ZH
                self.force_language(page, 'zh')
                zh_data = self.scrape_page_data_strict(page, 'zh')
                
                # Merge
                # 1. Title
                self.data[pid]['title'] = { "en": en_data['title'], "zh": zh_data['title'] }
                # 2. Short Desc = Intro
                self.data[pid]['shortDesc'] = { "en": en_data['intro'], "zh": zh_data['intro'] }
                # 3. Desc = Specs Body
                self.data[pid]['description'] = { "en": en_data.get('specs_body', ''), "zh": zh_data.get('specs_body', '') }
                # 4. Detail = Full
                self.data[pid]['detailDesc'] = { "en": en_data['desc'], "zh": zh_data['desc'] }
                # 5. Images (Use EN images usually)
                self.data[pid]['images'] = unique_images_rel_paths
                # 6. Category (Prefer EN per user instructions)
                cat_id = en_data.get('category')
                if not cat_id or cat_id == 'daily':
                     cat_id = zh_data.get('category', 'daily')
                
                # Verify it is a valid ID from our map values
                valid_ids = set(CATEGORY_MAP.values())
                if cat_id not in valid_ids: cat_id = 'daily'
                
                self.data[pid]['categoryId'] = cat_id

                self.data[pid]['status'] = 'completed'
                self.save_data()
                print(f"  Done {pid}: {len(unique_images_rel_paths)} images, EN/ZH text.")
                return # Success break

            except Exception as e:
                print(f"  Error processing {pid} (Attempt {attempt+1}): {e}")
                time.sleep(5)
        
        # If exhausted retries
        print(f"  Failed to process {pid} after 3 attempts.")
        self.data[pid]['status'] = 'failed'
        self.save_data()

    def force_language(self, page, lang):
        # lang: 'en' or 'zh'
        # Target: languageculture='en-US' or 'zh-CN'
        target_code = 'en-US' if lang == 'en' else 'zh-CN'
        print(f"  Switching to {lang}...")
        
        try:
            # Check if active
            # This site doesn't seem to mark active easily, so we just click.
            
            # Click strategy:
            # 1. Find the .w-language container
            # 2. Click it to open (if dropdown)
            # 3. Click the target link
            
            # Direct JS Click on the link (most robust from test_single.py)
            selector = f".w-language-link[languageculture='{target_code}']"
            
            # Sometimes inside a dropdown
            page.evaluate(f"""() => {{
                const el = document.querySelector("{selector}");
                if (el) el.click();
            }}""")
            
            time.sleep(1.5) # Wait for reload
            page.wait_for_load_state('domcontentloaded')
        except Exception as e:
            print(f"  Lang switch error: {e}")

    def scrape_page_data_strict(self, page, lang):
        # Strict Selectors
        data = { "title": "", "intro": "", "specs_body": "", "desc": "", "category": "", "images": [] }
        
        try:
            # Title
            if page.locator('h1').count() > 0:
                data['title'] = page.locator('h1').first.inner_text().strip()
                
            # Category (Iterate strict selector)
            data['category'] = 'daily' # Default
            cat_selector = '.w-crumbs-category'
            
            # Wait briefly?
            try: page.wait_for_selector(cat_selector, state='attached', timeout=2000)
            except: pass
            
            if page.locator(cat_selector).count() > 0:
                elements = page.locator(cat_selector).all()
                for el in elements:
                    txt = el.inner_text().strip()
                    if not txt or txt == 'ꄲ': continue
                    
                    # Direct Match
                    if txt in CATEGORY_MAP:
                        data['category'] = CATEGORY_MAP[txt]
                        break
                    
                    # Partial Match
                    for k, v in CATEGORY_MAP.items():
                        if k in txt: 
                            data['category'] = v
                            break # Found partial
                    
                    # If we found a category that isn't default 'daily' (unless daily is what matches), break?
                    # The map values are ids.
                    # Actually above logic sets data['category'] = id.
                    # We should check if we set it.
                    # But 'daily' is a valid id.
                    # So if we mapped it, we break.
                    if data['category'] != 'daily' or txt in CATEGORY_MAP or 'daily' in txt.lower():
                        break

            # Description (Strict .w-detail)
            desc_el = page.locator('.w-detail') # Verified selector
            if desc_el.count() > 0:
                full_text = desc_el.inner_text().strip()
                data['desc'] = full_text
                
            # Intro (Explicit Selectors from test_single.py)
            intro = ""
            intro_selectors = ['.productSummaryBind_Style1 .w-info', '.w-product-summary']
            for sel in intro_selectors:
                if page.locator(sel).count() > 0:
                    intro = page.locator(sel).first.inner_text().strip()
                    if intro: break
            data['intro'] = intro

            # Description (Strict .w-detail)
            desc_el = page.locator('.w-detail') # Verified selector
            if desc_el.count() > 0:
                full_text = desc_el.inner_text().strip()
                data['desc'] = full_text
                
                # Logic: Split for specs body
                lines = [l.strip() for l in full_text.split('\n') if l.strip()]
                specs_lines = []
                
                for l in lines:
                    if ':' in l or '：' in l:
                        specs_lines.append(l)
                
                data['specs_body'] = '\n'.join(specs_lines)
                
                # Fallback if intro was empty? 
                if not data['intro']:
                    # Try extracting from text before specs
                    intro_lines = []
                    for l in lines:
                        if ':' in l or '：' in l: break
                        intro_lines.append(l)
                    data['intro'] = '\n'.join(intro_lines)
            
            # Images (Strict Whitelist: Gallery + Detail)
            # Only scrape images if English (optimization), but this func is generic.
            # We only use images from English in main loop.
            img_urls = []
            
            # 1. Gallery (.w-bigimglist img) - High res
            # Note: The thumbnails might be .w-thumbitem-in, but big images are usually loaded or linked.
            # test_single confirmed .w-bigimglist img works for gallery
            
            # Actually, .w-bigimglist might need interaction (clicking thumbs).
            # But test_single said ".w-bigimglist img" found items.
            # Let's use the ones found in test_single.py
            
            # Verified Selectors from test_single.py:
            # ".w-bigimglist img"
            # ".w-detail img"
            
            target_selectors = ['.w-bigimglist img', '.w-detail img']
            
            for sel in target_selectors:
                if page.locator(sel).count() > 0:
                    els = page.locator(sel).all()
                    for el in els:
                        src = el.get_attribute('src') or el.get_attribute('data-src')
                        if src:
                            # Filter logic
                            clean_src = src.split('?')[0]
                            if clean_src.startswith('//'): clean_src = 'https:' + clean_src
                            
                            # Exclude rules
                            lower = clean_src.lower()
                            if 'blank.gif' in lower: continue
                            if 'icon' in lower: continue
                            if 'logo' in lower: continue
                            
                            if clean_src not in img_urls:
                                img_urls.append(clean_src)
                                
            data['images'] = img_urls
            
        except Exception as e:
            print(f"  Scrape {lang} error: {e}")
            
        return data

    def download_images_strict(self, pid, urls):
        # Downloads images, MD5 dedupes, returns list of local relative paths
        local_rel_paths = []
        md5_seen = set()
        
        save_dir = os.path.join(IMAGES_DIR, str(pid))
        if not os.path.exists(save_dir): os.makedirs(save_dir)
        
        # Sort URLs to keep order (Gallery first usually)
        
        count = 0
        for url in urls:
            try:
                # Dl
                r = requests.get(url, headers=self.headers, timeout=10)
                if r.status_code != 200: continue
                
                content = r.content
                
                # MD5 Check
                md5 = hashlib.md5(content).hexdigest()
                if md5 in md5_seen:
                    continue # Duplicate content
                md5_seen.add(md5)
                
                # Save
                ext = url.split('.')[-1].lower()
                if len(ext) > 4: ext = 'jpg'
                
                filename = f"{md5[:8]}.{ext}" # Use hash for unique filename or index? 
                # User likes clean files. Hash is safe for dedupe.
                # Or use clean index?
                # Index is prettier.
                # But we skip Dupes. So index might skip.
                # Let's use hash to be perfectly safe against same-content-diff-name.
                # Or just index incremented.
                
                filename = f"{count+1}.{ext}" # 1.jpg, 2.jpg...
                filepath = os.path.join(save_dir, filename)
                
                with open(filepath, 'wb') as f:
                    f.write(content)
                
                local_rel_paths.append(f"images/products/{pid}/{filename}")
                count += 1
                
            except Exception as e:
                print(f"    Img DL error {url}: {e}")
                
        return local_rel_paths

    def generate_final_json(self):
        # Convert scraped_data.json to products.json format
        products = []
        
        for pid, info in self.data.items():
            # Support both structure types (direct or nested in 'data')
            product_data = info.get('data', info)
            
            if info.get('status') == 'completed' or product_data.get('id'):
                # Safety check
                if 'id' not in product_data:
                     print(f"Skipping pid {pid}: No ID found in data.")
                     continue
                     
                p = {
                    "id": product_data['id'],
                    "categoryId": product_data.get('categoryId', 'daily'),
                    "images": product_data.get('images', []), 
                    "title": product_data.get('title', {}),
                    "shortDesc": product_data.get('shortDesc', {}),
                    "description": product_data.get('description', {}),
                    "detailDesc": product_data.get('detailDesc', {}),
                    "specs": [], 
                }
                if p['images']:
                    p['thumbnail'] = p['images'][0]
                products.append(p)
                
        final_data = {
            "version": "1.1.2-batch",
            "lastUpdate": time.strftime("%Y-%m-%d %H:%M:%S"),
            "products": products
        }
        
        # Override the public products.json directly?
        # User said "Download all".
        target_path = os.path.join(OUTPUT_DIR, "products.json")
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(final_data, f, ensure_ascii=False, indent=2)
        print(f"FINAL: Updated {target_path} with {len(products)} products.")

if __name__ == "__main__":
    scraper = BaishengScraper()
    scraper.run()
