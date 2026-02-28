import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "apple.jpg": "https://loremflickr.com/800/600/apple,fruit/all",
    "mosambi.jpg": "https://loremflickr.com/800/600/lime,fruit/all",
    "watermelon.jpg": "https://loremflickr.com/800/600/watermelon,fruit/all",
    "muskmelon.jpg": "https://loremflickr.com/800/600/melon,fruit/all"
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(name, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Success: {name}")
    except Exception as e:
        print(f"Error {name}: {e}")
